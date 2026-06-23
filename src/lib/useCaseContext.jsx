/**
 * Context global de "caso de uso" — persona ativa do protótipo.
 *
 * Fonte da verdade: query param `?uc=<persona_id>` na URL.
 * Persistência: sessionStorage (sobrevive F5/navegação).
 * Default: PERSONAS[DEFAULT_PERSONA_ID] quando nenhuma persona explícita.
 *
 * Uso típico:
 *   const { persona, scenario, isDoctor, setUseCase } = useUseCase();
 *
 * Para mudar a persona programaticamente:
 *   setUseCase('carlos')   // atualiza URL + storage + estado
 *
 * Para preservar `?uc=` em navegações, use o componente `<PersistLink>`
 * em vez do `<Link>` puro do react-router.
 */
import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { PERSONAS, DEFAULT_PERSONA_ID, getPersona } from '@/data/personasMock.js';

const STORAGE_KEY = 'sono-ai.uc';

const UseCaseContext = createContext(null);

function readStored() {
  try {
    const v = sessionStorage.getItem(STORAGE_KEY);
    return v && PERSONAS[v] ? v : null;
  } catch {
    return null;
  }
}

function writeStored(id) {
  try {
    if (id) sessionStorage.setItem(STORAGE_KEY, id);
    else sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* sessionStorage indisponível — ignora silenciosamente */
  }
}

export function UseCaseProvider({ children }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const urlUc = searchParams.get('uc');
  const [personaId, setPersonaId] = useState(() => {
    if (urlUc && PERSONAS[urlUc]) return urlUc;
    return readStored() ?? DEFAULT_PERSONA_ID;
  });

  // Sync: URL → state (quando navega entre telas com ?uc=)
  useEffect(() => {
    if (urlUc && PERSONAS[urlUc] && urlUc !== personaId) {
      setPersonaId(urlUc);
      writeStored(urlUc);
    }
  }, [urlUc, personaId]);

  // Persistência: state → sessionStorage
  useEffect(() => {
    writeStored(personaId);
  }, [personaId]);

  const setUseCase = useCallback(
    (id) => {
      const valid = PERSONAS[id] ? id : DEFAULT_PERSONA_ID;
      setPersonaId(valid);
      writeStored(valid);
      // Atualiza a URL preservando path atual
      const next = new URLSearchParams(location.search);
      next.set('uc', valid);
      navigate({ pathname: location.pathname, search: `?${next.toString()}` }, { replace: true });
    },
    [navigate, location.pathname, location.search],
  );

  const clearUseCase = useCallback(() => {
    setPersonaId(DEFAULT_PERSONA_ID);
    writeStored(null);
    const next = new URLSearchParams(location.search);
    next.delete('uc');
    const search = next.toString();
    navigate({ pathname: location.pathname, search: search ? `?${search}` : '' }, { replace: true });
  }, [navigate, location.pathname, location.search]);

  const value = useMemo(() => {
    const persona = getPersona(personaId);
    return {
      personaId,
      persona,
      scenario: persona.scenario,
      role: persona.role,
      isDoctor: persona.role === 'doctor',
      setUseCase,
      clearUseCase,
    };
  }, [personaId, setUseCase, clearUseCase]);

  return <UseCaseContext.Provider value={value}>{children}</UseCaseContext.Provider>;
}

/**
 * Hook principal de consumo.
 * @returns {{ personaId, persona, scenario, role, isDoctor, setUseCase, clearUseCase }}
 */
export function useUseCase() {
  const ctx = useContext(UseCaseContext);
  if (!ctx) {
    throw new Error('useUseCase() precisa estar dentro de <UseCaseProvider>');
  }
  return ctx;
}
