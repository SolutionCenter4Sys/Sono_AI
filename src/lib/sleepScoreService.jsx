/**
 * Serviço Sleep Score — ferramenta clínica que o MÉDICO ativa como parte do
 * tratamento. Quando ativo, o paciente acompanha a higiene do sono diária por
 * um score 0-100 (sem ranking, sem competição — cuidado com obsessividade).
 *
 * Estado de ativação por persona, com override em runtime (o médico ativa no
 * portal e o paciente passa a ver). Default: ativo para quem já está em
 * tratamento (tem laudo), convite para os demais.
 */
import { createContext, useContext, useMemo, useState, useCallback } from 'react';

const SleepScoreServiceContext = createContext(null);

/** Ativação padrão: quem já tem laudo está em tratamento → médico já ativou. */
function defaultActiveFor(persona) {
  if (!persona) return false;
  if (typeof persona.sleepScoreActive === 'boolean') return persona.sleepScoreActive;
  return !!persona.laudo;
}

/** Resolve estado de ativação combinando override de runtime + default da persona. */
export function resolveActive(overrides, personaId, persona) {
  const override = overrides[personaId];
  return override ? override.active : defaultActiveFor(persona);
}

/**
 * Higiene do sono — score 0-100 derivado de hábitos, NÃO de gamificação
 * competitiva. Fatores: tempo de tela antes de dormir, regularidade de
 * horário, distância do dispositivo da cama, cafeína à tarde.
 */
export const HYGIENE_MOCK = {
  score: 74,
  weekDelta: 6,
  factors: [
    {
      key: 'screen',
      label: 'Tempo de tela antes de dormir',
      value: '38 min',
      detail: 'Abaixo de 1h ajuda a adormecer mais rápido',
      state: 'warn',
    },
    {
      key: 'schedule',
      label: 'Regularidade de horário',
      value: 'Boa',
      detail: 'Dormiu e acordou em janelas parecidas em 6 de 7 noites',
      state: 'ok',
    },
    {
      key: 'distance',
      label: 'Dispositivo longe da cama',
      value: '5 de 7 noites',
      detail: 'Carregar o celular fora do quarto reduz interrupções',
      state: 'ok',
    },
    {
      key: 'caffeine',
      label: 'Cafeína após as 14h',
      value: '2 dias',
      detail: 'Evitar cafeína à tarde melhora o sono profundo',
      state: 'warn',
    },
  ],
  /** Comparativo encorajador por faixa etária — sem leaderboard, sem competição. */
  comparison: {
    betterThanPercent: 68,
    ageBand: '35-44 anos',
    message: 'Sua rotina de sono está acima da média da sua faixa etária esta semana.',
  },
  /** Hábitos em andamento (ex-"desafios") — sem pontos, sem níveis. */
  habits: [
    {
      key: 'sleep8',
      title: 'Dormir 8h por 5 noites',
      progress: '3 de 5 noites',
      percent: 60,
      color: 'menta',
    },
    {
      key: 'caffeine',
      title: 'Sem cafeína após 14h por 7 dias',
      progress: '3 de 7 dias',
      percent: 42,
      color: 'risk-moderate',
    },
    {
      key: 'cpap',
      title: 'Usar CPAP > 4h por noite',
      progress: '11 de 14 noites',
      percent: 78,
      color: 'laranja',
    },
  ],
};

export function SleepScoreServiceProvider({ children }) {
  // Override de ativação em runtime: { [personaId]: boolean }
  const [overrides, setOverrides] = useState({});

  const activate = useCallback((personaId, by = 'Equipe médica AFIP') => {
    setOverrides((o) => ({ ...o, [personaId]: { active: true, by, at: 'agora' } }));
  }, []);

  const deactivate = useCallback((personaId) => {
    setOverrides((o) => ({ ...o, [personaId]: { active: false } }));
  }, []);

  const value = useMemo(
    () => ({ overrides, activate, deactivate }),
    [overrides, activate, deactivate],
  );

  return (
    <SleepScoreServiceContext.Provider value={value}>
      {children}
    </SleepScoreServiceContext.Provider>
  );
}

/**
 * Estado do serviço para uma persona.
 * @returns {{ active, activatedBy, activate, deactivate, hygiene }}
 */
export function useSleepScoreService(persona) {
  const ctx = useContext(SleepScoreServiceContext);
  if (!ctx) throw new Error('useSleepScoreService() precisa de <SleepScoreServiceProvider>');

  const personaId = persona?.id ?? persona?.personaId ?? '__default__';
  const override = ctx.overrides[personaId];
  const active = override ? override.active : defaultActiveFor(persona);
  const activatedBy = override?.active ? override.by : (active ? 'Equipe médica AFIP' : null);

  return {
    active,
    activatedBy,
    activate: (by) => ctx.activate(personaId, by),
    deactivate: () => ctx.deactivate(personaId),
    hygiene: HYGIENE_MOCK,
  };
}

/**
 * Hook de administração (portal médico) — ativa/desativa o serviço por paciente
 * arbitrário (personaId), independente da persona ativa na sessão.
 */
export function useSleepScoreAdmin() {
  const ctx = useContext(SleepScoreServiceContext);
  if (!ctx) throw new Error('useSleepScoreAdmin() precisa de <SleepScoreServiceProvider>');
  return {
    isActive: (persona) => resolveActive(ctx.overrides, persona?.id ?? '__none__', persona),
    activate: ctx.activate,
    deactivate: ctx.deactivate,
  };
}
