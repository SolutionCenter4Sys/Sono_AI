/**
 * Mock de acompanhamento pós-laudo (ADR-028 · WEB-EP-09-FT-05).
 *
 * Cenário rico: paciente diagnosticado em 14/02 (~120 dias atrás),
 * fez D+30 com excelente aderência, mas D+90 mostrou deterioração leve
 * (aderência caiu, AHI subiu). Sistema antecipou o próximo retorno para
 * D+150 (antes do programado D+180) baseado em dados do wearable.
 *
 * Conta uma história clínica completa em poucos objetos.
 */

// Hoje (mock): 14/06/2026 — 120 dias após o laudo
export const LAUDO_DATE = '2026-02-14';
export const TODAY = '2026-06-14';

/** Dados de aderência ao tratamento (resumo atual). */
export const ADHERENCE = {
  cpapHoursAvg7d: 5.2,      // alvo clínico: ≥ 4h/noite
  cpapNightsUsed30d: 23,    // de 30 — 77%
  cpapAdherencePct: 77,     // % nas últimas 30 noites
  habits: {
    weightChangeKg: -2.1,   // perdeu 2.1 kg desde diagnóstico
    exerciseMinAvg: 25,     // min/dia
    sleepHygieneScore: 6.8, // 0-10
  },
};

/** Retornos no calendário do paciente. */
export const RETURNS = [
  {
    id: 'r-d30',
    type: 'D+30',
    plannedDate: '2026-03-16',
    actualDate: '2026-03-16',
    status: 'done',
    triggeredBy: 'temporal',
    doctor: 'Dr. Marcos Rocha',
    snapshot: {
      ahi: 8,
      cpapAdherence: 92,
      cpapHoursAvg: 6.4,
      spo2Min: 91,
      sleepScore: 78,
      symptoms: 'Sem queixas relevantes. Refere mais energia ao acordar.',
    },
    decisions: [
      'Manter pressão CPAP em 9 cmH₂O',
      'Continuar acompanhamento clínico',
      'Próximo retorno em 60 dias (D+90)',
    ],
  },
  {
    id: 'r-d90',
    type: 'D+90',
    plannedDate: '2026-05-15',
    actualDate: '2026-05-15',
    status: 'done',
    triggeredBy: 'temporal',
    doctor: 'Dr. Marcos Rocha',
    snapshot: {
      ahi: 12,                 // subiu vs D+30
      cpapAdherence: 85,       // caiu 7 pontos
      cpapHoursAvg: 5.8,
      spo2Min: 89,
      sleepScore: 65,          // caiu 13 pontos
      symptoms: 'Refere ronco residual algumas noites. Mais sonolência diurna.',
    },
    decisions: [
      'Aumentar pressão CPAP para 11 cmH₂O',
      'Investigar congestão nasal (encaminhar otorrino)',
      'Reforçar higiene do sono',
    ],
  },
  {
    id: 'r-d150',
    type: 'D+150 (antecipado)',
    plannedDate: '2026-07-04',  // 20 dias a partir de hoje
    actualDate: null,
    status: 'scheduled',         // o "PRÓXIMO RETORNO" em destaque
    triggeredBy: 'clinical',
    triggerReason: 'Sleep Score caiu 9 pontos nos últimos 7 dias e AHI parcial voltou a subir (média 14 nas últimas 4 noites). Antecipamos do D+180 programado.',
    triggerData: {
      sleepScoreDelta: -9,
      sleepScoreWindow: '7 dias',
      ahiAvgRecent: 14,
      ahiAvgPrior: 9,
    },
    doctor: 'Dr. Marcos Rocha',
    preConsult: {
      compareTo: 'r-d90',
      symptomQuestions: [
        { q: 'Como tem sido seu sono comparado ao último retorno?', preselected: 'um pouco pior' },
        { q: 'Acorda sentindo descansado?', preselected: 'às vezes' },
        { q: 'Tem usado o CPAP toda noite?', preselected: 'algumas noites pulei' },
        { q: 'Notou ronco residual?', preselected: 'sim, algumas vezes por semana' },
      ],
    },
  },
  {
    id: 'r-d180',
    type: 'D+180',
    plannedDate: '2026-08-13',
    actualDate: null,
    status: 'pending',
    triggeredBy: 'temporal',
    doctor: 'Dr. Marcos Rocha',
  },
  {
    id: 'r-d365',
    type: 'D+365 (anual)',
    plannedDate: '2027-02-14',
    actualDate: null,
    status: 'pending',
    triggeredBy: 'temporal',
    doctor: 'Dr. Marcos Rocha',
  },
];

/** Helper: encontra o próximo retorno agendado. */
export function nextReturn() {
  return RETURNS.find((r) => r.status === 'scheduled') || null;
}

/** Helper: lista retornos passados (concluídos). */
export function pastReturns() {
  return RETURNS.filter((r) => r.status === 'done');
}

/** Helper: lista retornos futuros (pending). */
export function futureReturns() {
  return RETURNS.filter((r) => r.status === 'pending');
}

/** Helper: dias entre hoje e uma data ISO. */
export function daysUntil(isoDate) {
  const today = new Date(TODAY);
  const target = new Date(isoDate);
  const diffMs = target - today;
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

/** Helper: encontra um retorno por id. */
export function findReturn(id) {
  return RETURNS.find((r) => r.id === id) || null;
}

/** Helper: encontra o retorno anterior a um dado retorno (para comparativo). */
export function previousReturn(currentId) {
  const idx = RETURNS.findIndex((r) => r.id === currentId);
  if (idx <= 0) return null;
  for (let i = idx - 1; i >= 0; i--) {
    if (RETURNS[i].status === 'done') return RETURNS[i];
  }
  return null;
}

/** Helper: formato brasileiro de data. */
export function fmtBR(isoDate) {
  if (!isoDate) return '—';
  const [y, m, d] = isoDate.split('-');
  return `${d}/${m}/${y}`;
}

/** Helper: badge meta de cada retorno. */
export function returnMeta(r) {
  if (r.status === 'done') return { label: 'CONCLUÍDO', color: 'menta' };
  if (r.status === 'scheduled') {
    return r.triggeredBy === 'clinical'
      ? { label: 'ANTECIPADO', color: 'laranja' }
      : { label: 'PROGRAMADO', color: 'menta' };
  }
  return { label: 'PENDENTE', color: 'baunilha' };
}

/** Mock da agenda do médico — retornos do dia. */
export const DOCTOR_TODAY_RETURNS = [
  {
    time: '08:30',
    patient: { name: 'João Silva', id: 'P-04421' },
    returnRef: 'r-d150',
    badge: 'ANTECIPADO',
    badgeColor: 'laranja',
    preview: 'Sleep Score ↓9 em 7d, AHI ↑ (9→14)',
  },
  {
    time: '09:00',
    patient: { name: 'Ana Costa', id: 'P-04519' },
    returnRef: null,
    badge: 'D+30',
    badgeColor: 'menta',
    preview: 'Aderência CPAP 94%, AHI 6',
  },
  {
    time: '10:00',
    patient: { name: 'Carlos Pereira', id: 'P-04604' },
    returnRef: null,
    badge: 'D+90',
    badgeColor: 'menta',
    preview: 'Aderência 88%, AHI 10',
  },
  {
    time: '11:30',
    patient: { name: 'Mariana Souza', id: 'P-04701' },
    returnRef: null,
    badge: 'ANTECIPADO',
    badgeColor: 'laranja',
    preview: 'Aderência caiu para 62% nas últimas 2 semanas',
  },
  {
    time: '14:00',
    patient: { name: 'Roberto Lima', id: 'P-04802' },
    returnRef: null,
    badge: 'D+180',
    badgeColor: 'menta',
    preview: 'Manutenção, sem queixas',
  },
];
