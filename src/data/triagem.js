/**
 * Triagem direcionada por queixa.
 *
 * Em vez de aplicar sempre os 4 instrumentos, a triagem seleciona apenas os
 * questionários úteis à(s) queixa(s) do paciente (feedback Dr. Gustavo). A
 * queixa é multi-seleção (uma pessoa pode ter mais de um problema de sono);
 * o plano é a união ordenada dos instrumentos das queixas escolhidas.
 *
 * Chaves de COMPLAINT_INSTRUMENTS = valores de SLEEP_COMPLAINTS
 * (src/data/mockRepository.js).
 */

export const INSTRUMENTS = [
  {
    id: 'epworth',
    route: '/triagem/epworth',
    title: 'Epworth (ESS)',
    shortLabel: 'Epworth',
    hint: '8 perguntas · sonolência diurna',
    color: 'menta',
  },
  {
    id: 'stopbang',
    route: '/triagem/stop-bang',
    title: 'STOP-BANG',
    shortLabel: 'STOP-BANG',
    hint: '8 perguntas SIM/NÃO · indícios de apneia',
    color: 'laranja',
  },
  {
    id: 'isi',
    route: '/triagem/isi',
    title: 'ISI',
    shortLabel: 'ISI',
    hint: '7 perguntas · severidade da insônia',
    color: 'risk-moderate',
  },
  {
    id: 'pittsburgh',
    route: '/triagem/pittsburgh',
    title: 'Pittsburgh (PSQI)',
    shortLabel: 'Pittsburgh',
    hint: 'qualidade subjetiva geral',
    color: 'baunilha',
  },
];

const ORDER = INSTRUMENTS.map((i) => i.id);
const BY_ID = Object.fromEntries(INSTRUMENTS.map((i) => [i.id, i]));

export function instrumentById(id) {
  return BY_ID[id];
}

/** Queixa → instrumentos recomendados. */
export const COMPLAINT_INSTRUMENTS = {
  snoring: ['stopbang', 'epworth'],
  'daytime-sleepiness': ['epworth', 'stopbang'],
  tired: ['stopbang', 'epworth', 'pittsburgh'],
  latency: ['isi', 'pittsburgh'],
  fragmented: ['isi', 'stopbang', 'pittsburgh'],
  none: ['pittsburgh'],
};

/** União ordenada (pela ordem canônica) dos instrumentos das queixas. */
export function instrumentsFor(complaints) {
  const list = Array.isArray(complaints)
    ? complaints
    : complaints
      ? [complaints]
      : [];
  const set = new Set();
  list.forEach((c) => (COMPLAINT_INSTRUMENTS[c] || []).forEach((id) => set.add(id)));
  if (set.size === 0) ORDER.forEach((id) => set.add(id)); // fallback: todos
  return ORDER.filter((id) => set.has(id));
}

/**
 * Plano efetivo para uma tela de instrumento. Se a tela foi acessada direto
 * (sem queixa no contexto, ou queixa que não inclui este instrumento), cai no
 * conjunto completo para a navegação não "pular" a tela atual.
 */
export function resolvePlan(complaints, currentId) {
  const plan = instrumentsFor(complaints);
  if (currentId && !plan.includes(currentId)) return [...ORDER];
  return plan;
}

/** Próximo passo do plano após currentId — ou a tela de score. */
export function nextStep(ids, currentId) {
  const list = ids && ids.length ? ids : ORDER;
  const nextId = list[list.indexOf(currentId) + 1];
  if (!nextId) return { route: '/triagem/score', label: 'Ver resultado consolidado' };
  return { route: BY_ID[nextId].route, label: `Próximo: ${BY_ID[nextId].shortLabel}` };
}
