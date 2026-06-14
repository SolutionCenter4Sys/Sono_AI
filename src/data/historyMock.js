/**
 * Histórico mockado das últimas 30 noites (ADR-021 · WEB-EP-09-FT-03).
 *
 * Representa um paciente com apneia moderada (AHI ~18-26 na maioria das noites),
 * em terapia CPAP recente: qualidade do sono e SpO2 mostram tendência leve de
 * melhora; FC noturna oscila com cafeína; AHI ainda no patamar moderado.
 *
 * Convenção: índice 0 = mais antigo, índice 29 = hoje.
 */

// 30 noites · valores plausíveis para a persona (mock determinístico).
export const NIGHTS = [
  // sleep: 0-100 · ahi: AHI (eventos/hora) · hrAvg: bpm · spo2Min: %
  { sleep: 54, ahi: 23, hrAvg: 72, spo2Min: 86, duration: 5.8 },
  { sleep: 58, ahi: 21, hrAvg: 70, spo2Min: 87, duration: 6.2 },
  { sleep: 49, ahi: 26, hrAvg: 74, spo2Min: 85, duration: 5.5 },
  { sleep: 62, ahi: 19, hrAvg: 68, spo2Min: 88, duration: 6.5 },
  { sleep: 55, ahi: 24, hrAvg: 71, spo2Min: 86, duration: 6.0 },
  { sleep: 60, ahi: 22, hrAvg: 69, spo2Min: 87, duration: 6.3 },
  { sleep: 38, ahi: 31, hrAvg: 78, spo2Min: 83, duration: 4.9 }, // pior noite (4 dias atrás na visão original)
  { sleep: 56, ahi: 23, hrAvg: 72, spo2Min: 86, duration: 6.0 },
  { sleep: 64, ahi: 18, hrAvg: 67, spo2Min: 89, duration: 6.7 },
  { sleep: 59, ahi: 20, hrAvg: 70, spo2Min: 88, duration: 6.4 },
  { sleep: 52, ahi: 25, hrAvg: 73, spo2Min: 85, duration: 5.7 },
  { sleep: 67, ahi: 17, hrAvg: 66, spo2Min: 90, duration: 6.8 },
  { sleep: 61, ahi: 19, hrAvg: 68, spo2Min: 88, duration: 6.5 },
  { sleep: 57, ahi: 21, hrAvg: 70, spo2Min: 87, duration: 6.2 },
  { sleep: 70, ahi: 16, hrAvg: 65, spo2Min: 90, duration: 7.0 },
  { sleep: 65, ahi: 18, hrAvg: 67, spo2Min: 89, duration: 6.7 },
  { sleep: 89, ahi: 12, hrAvg: 62, spo2Min: 92, duration: 7.4 }, // melhor noite
  { sleep: 71, ahi: 16, hrAvg: 65, spo2Min: 90, duration: 7.1 },
  { sleep: 63, ahi: 19, hrAvg: 68, spo2Min: 89, duration: 6.6 },
  { sleep: 68, ahi: 17, hrAvg: 66, spo2Min: 90, duration: 6.9 },
  { sleep: 60, ahi: 20, hrAvg: 69, spo2Min: 88, duration: 6.4 },
  { sleep: 72, ahi: 15, hrAvg: 64, spo2Min: 91, duration: 7.0 },
  { sleep: 66, ahi: 18, hrAvg: 67, spo2Min: 90, duration: 6.7 },
  { sleep: 58, ahi: 21, hrAvg: 70, spo2Min: 88, duration: 6.3 },
  { sleep: 74, ahi: 14, hrAvg: 64, spo2Min: 91, duration: 7.1 },
  { sleep: 69, ahi: 16, hrAvg: 65, spo2Min: 90, duration: 6.8 },
  { sleep: 62, ahi: 19, hrAvg: 68, spo2Min: 89, duration: 6.5 },
  { sleep: 65, ahi: 18, hrAvg: 67, spo2Min: 90, duration: 6.7 },
  { sleep: 71, ahi: 15, hrAvg: 65, spo2Min: 91, duration: 6.9 },
  { sleep: 67, ahi: 17, hrAvg: 66, spo2Min: 90, duration: 6.8 }, // "hoje"
];

// Bandas de severidade da apneia (AHI) — limiares clínicos
export const APNEA_BANDS = [
  { label: 'Normal', max: 5, color: 'risk-low' },
  { label: 'Leve', max: 15, color: 'risk-moderate' },
  { label: 'Moderada', max: 30, color: 'risk-high' },
  { label: 'Grave', max: 60, color: 'risk-critical' },
];

export function classifyAhi(ahi) {
  for (const band of APNEA_BANDS) if (ahi <= band.max) return band;
  return APNEA_BANDS[APNEA_BANDS.length - 1];
}

// Histórico de desafios (gamificação) — concluídos, em curso, abandonados.
export const CHALLENGE_HISTORY = [
  {
    id: 'cpap-14',
    title: 'Usar CPAP > 4h em 14 noites',
    icon: 'wind',
    color: 'laranja',
    status: 'in_progress',
    percent: 78,
    period: '01-13 jun',
    reward: '+500',
  },
  {
    id: 'cafeina-7',
    title: 'Sem cafeína após 14h por 7 dias',
    icon: 'moon',
    color: 'risk-moderate',
    status: 'in_progress',
    percent: 42,
    period: '08-14 jun',
    reward: '+200',
  },
  {
    id: 'dormir-8h',
    title: 'Dormir 8h por 5 noites seguidas',
    icon: 'check',
    color: 'menta',
    status: 'in_progress',
    percent: 60,
    period: '09-13 jun',
    reward: '+150',
  },
  {
    id: 'sequencia-7',
    title: '7 noites consecutivas com score > 60',
    icon: 'check',
    color: 'menta',
    status: 'done',
    percent: 100,
    period: '20-26 mai',
    reward: '+300',
  },
  {
    id: 'sem-tela-30min',
    title: 'Sem telas 30min antes de dormir',
    icon: 'moon',
    color: 'menta',
    status: 'done',
    percent: 100,
    period: '15-21 mai',
    reward: '+120',
  },
  {
    id: 'agua-2l',
    title: 'Beber 2L de água por 10 dias',
    icon: 'check',
    color: 'baunilha',
    status: 'abandoned',
    percent: 30,
    period: '05-14 mai',
    reward: '+100',
  },
];

// Metadados por métrica para alimentar a UI
export const METRIC_META = {
  sleep: {
    key: 'sleep',
    label: 'Sono',
    unit: '',
    scale: { min: 0, max: 100 },
    suffix: '/100',
    chart: 'bar', // gráfico de barras (qualidade discreta por noite)
    higherIsBetter: true,
    decimals: 0,
  },
  ahi: {
    key: 'ahi',
    label: 'Apneia',
    unit: 'AHI',
    scale: { min: 0, max: 35 },
    suffix: ' AHI',
    chart: 'line', // linha com bandas de severidade
    higherIsBetter: false,
    decimals: 0,
  },
  hrAvg: {
    key: 'hrAvg',
    label: 'FC noturna',
    unit: 'bpm',
    scale: { min: 55, max: 80 },
    suffix: ' bpm',
    chart: 'line',
    higherIsBetter: false,
    baseline: 59, // referência do paciente
    decimals: 0,
  },
  spo2Min: {
    key: 'spo2Min',
    label: 'SpO₂ mín.',
    unit: '%',
    scale: { min: 80, max: 100 },
    suffix: '%',
    chart: 'line',
    higherIsBetter: true,
    threshold: 90, // limiar clínico
    decimals: 0,
  },
};

/**
 * Recorta a série da métrica em [start, end] (índices exclusivos no fim).
 * Retorna pares { value, dayIndex } para preservar o índice original (para labels).
 */
export function sliceSeries(metricKey, start, end) {
  return NIGHTS.slice(start, end).map((n, i) => ({
    value: n[metricKey],
    dayIndex: start + i,
  }));
}

/** Média de uma fatia da série (ignora null/undefined). */
export function avg(series) {
  const vals = series.map((p) => p.value).filter((v) => v != null);
  if (!vals.length) return 0;
  return vals.reduce((a, b) => a + b, 0) / vals.length;
}

/** Label de dia relativo a "hoje" (índice 29). Ex.: dayIndex 29 → "Hoje", 28 → "Ontem", 27 → "2d". */
export function dayLabel(dayIndex) {
  const offset = NIGHTS.length - 1 - dayIndex;
  if (offset === 0) return 'Hoje';
  if (offset === 1) return 'Ontem';
  return `${offset}d`;
}
