import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  fetchLastNightSleep,
  getMockSessionSync,
} from '@/data/mockRepository.js';
import { computeDiagnosticScore } from '@/data/score.js';

/**
 * Contexto de DADOS da sessão de sono.
 *
 * Após ADR-012 (react-router), a navegação saiu deste contexto e passou a ser
 * por rota. Aqui ficam só os dados que persistem entre telas do Core Flow:
 * - session: leitura mock do wearable
 * - score: resultado do cálculo
 * - questionnaire: respostas da triagem rápida
 * - isDemo: se entrou via "Modo demo"
 *
 * Telas acessadas diretamente (via dashboard/debug) geram mock sob demanda
 * com `ensureResult()`, então nenhuma tela do Core Flow renderiza vazia.
 */

const SleepStateContext = createContext(null);

export function SleepStateProvider({ children }) {
  const [session, setSession] = useState(null);
  const [score, setScore] = useState(null);
  const [questionnaire, setQuestionnaire] = useState(null);
  const [isDemo, setIsDemo] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState({
    step: 'session',
    percent: 0,
  });
  const loadingAbortRef = useRef({ aborted: false });

  /**
   * Roda a leitura mock do wearable, reportando progresso.
   * Chama onDone(session) ao concluir. Não navega — a screen decide.
   */
  const runLoading = useCallback(async (onDone) => {
    loadingAbortRef.current = { aborted: false };
    const ticket = loadingAbortRef.current;
    setLoadingProgress({ step: 'session', percent: 0 });
    try {
      const result = await fetchLastNightSleep({
        onProgress: (step, percent) => {
          if (ticket.aborted) return;
          setLoadingProgress({ step, percent });
        },
      });
      if (ticket.aborted) return;
      setSession(result);
      setIsDemo(false);
      onDone?.(result);
    } catch {
      if (!ticket.aborted) onDone?.(null);
    }
  }, []);

  const abortLoading = useCallback(() => {
    loadingAbortRef.current.aborted = true;
  }, []);

  /** Modo demo: popula session + score mock direto. */
  const prepareDemo = useCallback(() => {
    const s = getMockSessionSync();
    const sc = computeDiagnosticScore(s, null);
    setSession(s);
    setScore(sc);
    setQuestionnaire(null);
    setIsDemo(true);
    return { session: s, score: sc };
  }, []);

  /** Conclui o questionário e computa o score a partir da session atual. */
  const submitQuestionnaire = useCallback(
    (answers) => {
      const s = session ?? getMockSessionSync();
      const sc = computeDiagnosticScore(s, answers);
      setSession(s);
      setQuestionnaire(answers);
      setScore(sc);
      setIsDemo(s.isMock === true);
      return sc;
    },
    [session]
  );

  /**
   * Garante que há um resultado para exibir. Usado pelo ResultScreen quando
   * acessado diretamente (sem ter passado pelo fluxo). Gera mock se necessário.
   *
   * FUNÇÃO PURA — não chama setState (era invocada via useMemo durante o render,
   * o que disparava "setState durante render"). Apenas computa e retorna.
   */
  const ensureResult = useCallback(() => {
    if (score && session) return { session, score, isDemo };
    const s = getMockSessionSync();
    const sc = computeDiagnosticScore(s, questionnaire);
    return { session: s, score: sc, isDemo: true };
  }, [score, session, isDemo, questionnaire]);

  /** Limpa tudo (voltar ao início). */
  const reset = useCallback(() => {
    loadingAbortRef.current.aborted = true;
    setSession(null);
    setScore(null);
    setQuestionnaire(null);
    setIsDemo(false);
    setLoadingProgress({ step: 'session', percent: 0 });
  }, []);

  const value = useMemo(
    () => ({
      session,
      score,
      questionnaire,
      isDemo,
      loadingProgress,
      runLoading,
      abortLoading,
      prepareDemo,
      submitQuestionnaire,
      ensureResult,
      reset,
    }),
    [
      session,
      score,
      questionnaire,
      isDemo,
      loadingProgress,
      runLoading,
      abortLoading,
      prepareDemo,
      submitQuestionnaire,
      ensureResult,
      reset,
    ]
  );

  return (
    <SleepStateContext.Provider value={value}>
      {children}
    </SleepStateContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSleepState() {
  const ctx = useContext(SleepStateContext);
  if (!ctx) {
    throw new Error('useSleepState must be used inside <SleepStateProvider>');
  }
  return ctx;
}
