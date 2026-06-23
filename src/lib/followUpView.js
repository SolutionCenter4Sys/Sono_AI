import {
  RETURNS as MOCK_RETURNS,
  ADHERENCE as MOCK_ADHERENCE,
  LAUDO_DATE as MOCK_LAUDO_DATE,
} from '@/data/followUpMock.js';

const TODAY = '2026-06-15';
const YEAR = TODAY.slice(0, 4);

/**
 * Converte 'DD/MM' (mock interno da persona) em ISO 'YYYY-MM-DD'.
 * Assume ano corrente do TODAY (2026) — válido para o protótipo.
 */
function ddmmToIso(ddmm) {
  if (!ddmm || !ddmm.includes('/')) return ddmm;
  const [d, m] = ddmm.split('/');
  return `${YEAR}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
}

const DEFAULT_DOCTOR = 'Dra. Marcela Andrade';

/**
 * Constrói uma view do acompanhamento (returns + adherence + datas) a partir
 * da persona ativa. Quando a persona não tem followUp próprio (caso das 6
 * personas core que herdam o cenário Carlos pré-Fase G), faz fallback para o
 * mock global `followUpMock.RETURNS`/`ADHERENCE`.
 *
 * Shape de saída intencionalmente compatível com o mock antigo para que a
 * tela consuma sem distinção.
 */
export function buildPersonaFollowUpView(persona) {
  const f = persona?.followUp;
  if (!f) {
    return {
      returns: MOCK_RETURNS,
      adherence: MOCK_ADHERENCE,
      laudoDate: MOCK_LAUDO_DATE,
      today: TODAY,
      source: 'mock',
    };
  }

  const doctor = persona?.telemedicine?.doctorAtPartner?.name ?? DEFAULT_DOCTOR;

  const completed = (f.completed || []).map((c) => ({
    id: c.id,
    type: c.type,
    plannedDate: ddmmToIso(c.date),
    actualDate: ddmmToIso(c.date),
    status: 'done',
    triggeredBy: 'temporal',
    doctor,
    snapshot: {
      ahi: c.snapshot?.ahi,
      cpapAdherence: c.snapshot?.cpapAdherence,
      cpapHoursAvg: c.snapshot?.cpapHoursAvg ?? f.cpapHoursAvg,
      spo2Min: c.snapshot?.spo2Min ?? null,
      sleepScore: c.snapshot?.sleepScore ?? null,
      symptoms: c.snapshot?.symptoms ?? 'Resumo da consulta registrado em prontuário.',
    },
    decisions: c.decisions ?? [
      'Manter conduta atual',
      `Próximo retorno em ${c.type === 'D+30' ? '60' : '90'} dias`,
    ],
  }));

  let next = null;
  if (f.next) {
    next = {
      id: f.next.id,
      type: f.next.type,
      plannedDate: ddmmToIso(f.next.date),
      actualDate: null,
      status: 'scheduled',
      triggeredBy: f.next.anticipated ? 'clinical' : 'temporal',
      doctor,
      triggerReason: f.next.anticipatedReason ?? null,
      preConsult: f.next.anticipated
        ? {
            compareTo: completed[completed.length - 1]?.id,
            symptomQuestions: [
              { q: 'Como tem sido seu sono comparado ao último retorno?', preselected: 'um pouco pior' },
              { q: 'Acorda sentindo descansado?', preselected: 'às vezes' },
              { q: 'Tem usado o CPAP toda noite?', preselected: 'algumas noites pulei' },
              { q: 'Notou ronco residual?', preselected: 'sim, algumas vezes por semana' },
            ],
          }
        : null,
    };
  }

  const returns = [...completed, ...(next ? [next] : [])];

  const adherence = {
    cpapHoursAvg7d: f.cpapHoursAvg ?? MOCK_ADHERENCE.cpapHoursAvg7d,
    cpapAdherencePct: f.cpapAdherenceAvg ?? MOCK_ADHERENCE.cpapAdherencePct,
    cpapNightsUsed30d: Math.round((f.cpapAdherenceAvg ?? MOCK_ADHERENCE.cpapAdherencePct) * 0.3),
    habits: MOCK_ADHERENCE.habits,
  };

  return {
    returns,
    adherence,
    laudoDate: ddmmToIso(f.diagnosisDate) || MOCK_LAUDO_DATE,
    today: TODAY,
    source: 'persona',
  };
}

/* ----- Helpers puros — reutilizam o mesmo shape ----- */

export function nextReturn(view) {
  return view.returns.find((r) => r.status === 'scheduled') || null;
}
export function pastReturns(view) {
  return view.returns.filter((r) => r.status === 'done');
}
export function findReturn(view, id) {
  return view.returns.find((r) => r.id === id) || null;
}
export function previousReturn(view, currentId) {
  const idx = view.returns.findIndex((r) => r.id === currentId);
  if (idx <= 0) return null;
  for (let i = idx - 1; i >= 0; i--) {
    if (view.returns[i].status === 'done') return view.returns[i];
  }
  return null;
}
export function daysUntil(view, isoDate) {
  const today = new Date(view.today);
  const target = new Date(isoDate);
  return Math.ceil((target - today) / 86400000);
}
