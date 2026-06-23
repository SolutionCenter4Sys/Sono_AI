import { useSearchParams } from 'react-router-dom';
import { useUseCase } from '@/lib/useCaseContext.jsx';

/**
 * Paciente novo sem histórico — acionado via:
 *  - URL legada `?profile=novo` (demo / QA do passado)
 *  - Persona "ana" (scenario === 'saudavel') — sem `nights` nem `score`
 *
 * Mantido para back-compat com SleepCoinsScreen / NightsHistoryScreen.
 * Em telas novas, prefira `useUseCase()` direto.
 */
export function useNewPatientProfile() {
  const [searchParams] = useSearchParams();
  const fromLegacy = searchParams.get('profile') === 'novo';
  const { persona } = useUseCase();
  const fromPersona = persona?.scenario === 'saudavel';
  return fromLegacy || fromPersona;
}
