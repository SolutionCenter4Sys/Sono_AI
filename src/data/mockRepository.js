/**
 * Mock do SleepRepository (Android).
 * Simula latência de leitura via Health Connect e retorna o caso de apneia moderada
 * conforme BACKLOG WEB-EP-04 (dados clinicamente convincentes para Demo Day).
 *
 * Quando virar produto real, este arquivo é substituído por um service que
 * consome a Health Connect API — interface preservada.
 */

/** Caso de apneia moderada (Demo). */
const MODERATE_APNEA_SESSION = Object.freeze({
  id: 'mock-session-2026-06-10',
  startTime: '2026-06-10T23:32:00-03:00',
  endTime: '2026-06-11T06:44:00-03:00',

  // Duração e qualidade
  totalSleepMinutes: 372,    // 6h 12min
  efficiency: 78,             // % do tempo na cama de fato dormindo
  fragmentation: 5,           // micro-despertares por hora

  // SpO₂
  spo2Min: 87,                // mínima registrada
  spo2Avg: 94,
  spo2EventsBelow90: 3,       // contagem de quedas

  // Frequência cardíaca noturna
  heartRateAvg: 68,
  heartRateMin: 52,
  heartRateMax: 92,

  // Origem
  source: 'Samsung Galaxy Watch 6',
  isMock: true,
});

/** Sleep para simular latência de rede. */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Lê a última sessão de sono. Reporta progresso por etapa via onProgress.
 *
 * @param {object} options
 * @param {(step: 'session' | 'heart-rate' | 'spo2', progressPercent: number) => void} options.onProgress
 * @returns {Promise<typeof MODERATE_APNEA_SESSION>}
 */
export async function fetchLastNightSleep({ onProgress } = {}) {
  // 1. Sessão de sono — 600ms
  await delay(600);
  onProgress?.('session', 33);

  // 2. FC — 600ms
  await delay(600);
  onProgress?.('heart-rate', 66);

  // 3. SpO₂ — 600ms
  await delay(600);
  onProgress?.('spo2', 100);

  return { ...MODERATE_APNEA_SESSION };
}

/** Acesso síncrono ao mock (útil para Modo Demo direto). */
export function getMockSessionSync() {
  return { ...MODERATE_APNEA_SESSION };
}

/** Opções da pergunta principal do questionário. */
export const SLEEP_COMPLAINTS = Object.freeze([
  {
    value: 'snoring',
    label: 'Ronco alto / pausas na respiração',
    hint: 'Possível indicador de apneia',
  },
  {
    value: 'tired',
    label: 'Acordo cansado, sem energia',
    hint: 'Sono não restaurador',
  },
  {
    value: 'latency',
    label: 'Demoro muito para pegar no sono',
    hint: 'Latência > 30 min',
  },
  {
    value: 'fragmented',
    label: 'Acordo várias vezes na noite',
    hint: 'Sono fragmentado',
  },
  {
    value: 'daytime-sleepiness',
    label: 'Sonolência durante o dia',
    hint: 'Cochilos involuntários',
  },
  {
    value: 'none',
    label: 'Nenhuma queixa',
    hint: 'Quero só monitorar',
  },
]);
