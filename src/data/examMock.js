/**
 * Estado mockado do exame de polissonografia domiciliar (ADR-025 · WEB-EP-08-FT-04).
 *
 * Persona: paciente em curso, na noite 2 de uma janela de 7. Já tem 1 noite
 * concluída com AHI moderado (22), o que vai compondo o pré-resultado.
 */

export const EXAM = {
  // 'idle' | 'in_progress' | 'returning' | 'analyzing' | 'reviewing' | 'signed'
  state: 'signed',
  currentNight: 2,
  totalNights: 7,
  startDate: '11/06',
  expectedReturnDate: '18/06',
  technician: { name: 'Camila Ribeiro', phone: '+55 11 98765-4321' },
  kit: {
    model: 'AFIP PSG Home Kit · v2',
    battery: 64,
    signal: 'good', // 'good' | 'weak' | 'lost'
  },
};

/** Noites do exame — concluídas têm métricas; atual e futuras só status. */
export const NIGHTS = [
  {
    number: 1,
    date: '11/06',
    status: 'completed',
    ahi: 22,
    spo2Min: 88,
    duration: '6h 18',
    quality: 'OK',
  },
  {
    number: 2,
    date: '12/06',
    status: 'in_progress',
  },
  { number: 3, date: '13/06', status: 'pending' },
  { number: 4, date: '14/06', status: 'pending' },
  { number: 5, date: '15/06', status: 'pending' },
  { number: 6, date: '16/06', status: 'pending' },
  { number: 7, date: '17/06', status: 'pending' },
];

/** Pré-resultado consolidado — formado a partir das noites concluídas. */
export const PRELIMINARY = {
  ahiAvg: 22,
  classification: 'Apneia obstrutiva moderada',
  classificationColor: 'risk-high',
  // % de dados coletados (noites concluídas + parcial da atual)
  coveragePct: 21,
  note: 'Estimativa preliminar baseada na 1ª noite concluída. Acurácia aumenta a cada noite.',
};

/** Helpers de display */
export function progressPct(currentNight, totalNights) {
  return Math.round(((currentNight - 1) / totalNights) * 100);
}

export function nightsCompleted(nights) {
  return nights.filter((n) => n.status === 'completed').length;
}

export function signalMeta(signal) {
  switch (signal) {
    case 'good':
      return { label: 'Sinal forte', color: 'menta' };
    case 'weak':
      return { label: 'Sinal fraco', color: 'risk-moderate' };
    case 'lost':
    default:
      return { label: 'Sem sinal', color: 'risk-high' };
  }
}

/* ------------------------------------------------ Laudo (ADR-026) */

export const LAUDO = {
  number: 'AFIP-LAU-2026-08714',
  signedAt: '13/06/2026 · 11:42',
  signedBy: {
    name: 'Dr. Marcos Rocha',
    initials: 'MR',
    crm: 'CRM 117892-SP',
    rqe: 'RQE 28156',
    title: 'Médico do sono',
  },
  validatedBy: 'Instituto do Sono (AFIP)',
  standard: 'FHIR R4',
  diagnosis: {
    label: 'Apneia Obstrutiva do Sono — moderada',
    cid: 'CID-10 G47.33',
    severity: 'moderate', // low | moderate | high | critical
  },
  metrics: {
    iah: 18.2, // eventos/hora
    spo2Min: 84, // %
    efficiency: 78, // %
    duration: '7h 38',
  },
};

/** Mapeamento card pós-exame na Home (ADR-026). */
export const POST_EXAM_META = {
  analyzing: {
    kicker: 'Análise por IA',
    title: 'IA analisando seu exame',
    subtitle: 'Estagiamento e detecção de eventos respiratórios',
    badge: 'EM CURSO',
    color: 'menta',
    route: '/exame/em-laudo-ia',
    cta: 'Acompanhar análise',
  },
  reviewing: {
    kicker: 'Pré-laudo',
    title: 'Pré-laudo com Dr. Marcos Rocha',
    subtitle: 'Revisão médica antes da assinatura',
    badge: 'EM REVISÃO',
    color: 'sun-moon',
    route: '/exame/em-revisao-medica',
    cta: 'Ver pré-laudo',
  },
  signed: {
    kicker: 'Laudo pronto',
    title: 'Seu laudo foi assinado',
    subtitle: 'Dr. Marcos Rocha · 13/06 · validado pelo Instituto',
    badge: 'NOVO',
    color: 'laranja',
    route: '/exame/resultado',
    cta: 'Ver laudo completo',
  },
};

/** Hipnograma simplificado — 8 segmentos cobrindo a noite. */
export const HYPNOGRAM = [
  { stage: 'Wake', start: 0, end: 5 },
  { stage: 'N1', start: 5, end: 10 },
  { stage: 'N2', start: 10, end: 32 },
  { stage: 'N3', start: 32, end: 48 },
  { stage: 'REM', start: 48, end: 60 },
  { stage: 'N2', start: 60, end: 80 },
  { stage: 'REM', start: 80, end: 92 },
  { stage: 'Wake', start: 92, end: 100 },
];

export const STAGE_META = {
  Wake: { y: 0, color: 'risk-moderate', label: 'Acordado' },
  REM: { y: 1, color: 'sun-moon', label: 'REM' },
  N1: { y: 2, color: 'baunilha', label: 'N1' },
  N2: { y: 3, color: 'menta', label: 'N2' },
  N3: { y: 4, color: 'laranja', label: 'N3 (profundo)' },
};

/** Curva SpO₂ ao longo da noite — 16 pontos, queda visível na 2ª metade. */
export const SPO2_CURVE = [96, 95, 96, 95, 94, 93, 92, 91, 88, 86, 84, 86, 88, 90, 92, 94];

/** Bandas de severidade IAH (eventos/hora). */
export const IAH_BANDS = [
  { label: 'Normal', max: 5, color: 'risk-low' },
  { label: 'Leve', max: 14, color: 'menta' },
  { label: 'Moderada', max: 29, color: 'risk-moderate' },
  { label: 'Grave', max: 60, color: 'risk-high' },
];

/* ------------------------------------------------ Kit PSG (ADR-027) */

/** 8 canais clínicos coletados pelo kit, com status ativo/sem leitura. */
export const KIT_CHANNELS = [
  { key: 'hr',      label: 'Frequência cardíaca', icon: 'heart',        unit: 'bpm',  active: true },
  { key: 'spo2',    label: 'SpO₂',                icon: 'droplet',      unit: '%',    active: true },
  { key: 'flow',    label: 'Fluxo aéreo',         icon: 'wind',         unit: 'L/min', active: true },
  { key: 'effort',  label: 'Esforço respiratório', icon: 'activity',     unit: '',     active: true },
  { key: 'pos',     label: 'Posição corporal',    icon: 'rotate-3d',    unit: '',     active: true },
  { key: 'snore',   label: 'Ronco',               icon: 'mic',          unit: 'ev/h', active: true },
  { key: 'move',    label: 'Movimento',           icon: 'move',         unit: '',     active: true },
  { key: 'temp',    label: 'Temperatura corporal', icon: 'thermometer', unit: '°C',   active: false },
];

/** Sensores físicos e onde vão no corpo (para o diagrama esquemático). */
export const KIT_SENSORS = [
  {
    key: 'nasal',
    label: 'Cânula nasal',
    hint: 'mede fluxo aéreo + ronco',
    // posição no SVG (0-100% em x/y do contorno do corpo)
    x: 50,
    y: 18,
    color: 'menta',
  },
  {
    key: 'chest',
    label: 'Faixa torácica',
    hint: 'esforço respiratório do tórax',
    x: 50,
    y: 38,
    color: 'laranja',
  },
  {
    key: 'central',
    label: 'Módulo central',
    hint: 'recebe sinais e transmite ao app',
    x: 50,
    y: 50,
    color: 'sun-moon',
  },
  {
    key: 'finger',
    label: 'Oxímetro no dedo',
    hint: 'SpO₂ e frequência cardíaca',
    x: 76,
    y: 62,
    color: 'risk-moderate',
  },
];

/** Texto-base educacional (recebido da equipe clínica). */
export const EDUCATIONAL = [
  {
    key: 'iah',
    title: 'Índice de Apneia e Hipopneia (IAH)',
    body: 'Número de pausas respiratórias por hora. Leve: 5-14 · Moderado: 15-29 · Grave: ≥30.',
  },
  {
    key: 'efficiency',
    title: 'Eficiência do sono',
    body: 'Tempo que você efetivamente dormiu em relação ao tempo na cama. Ideal: ≥ 85%.',
  },
  {
    key: 'phases',
    title: 'Fases do sono',
    body: 'Transição entre sono leve (N1·N2), profundo reparador (N3) e REM (memória e emoção).',
  },
  {
    key: 'spo2',
    title: 'Saturação de oxigênio (SpO₂)',
    body: 'Quedas abaixo de 90% durante a noite indicam eventos clínicos significativos.',
  },
];
