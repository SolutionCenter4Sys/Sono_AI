/**
 * Posicionamento regulatório do Sono AI (web).
 *
 * O app de paciente NÃO afirma diagnóstico, NÃO emite laudo, NÃO usa "risco".
 * Faz triagem assistida com algoritmo calibrado contra o padrão AFIP/Instituto do Sono
 * e devolve um PERFIL amigável de atenção.
 *
 * Diagnóstico/laudo permanecem APENAS no fluxo pós-polissonografia (PSG real + médico):
 * telas de exame/laudo e portal médico.
 */

/** Perfis de atenção — do mais tranquilo ao que mais incomoda. */
export const ATTENTION_PROFILE = {
  low: { key: 'low', label: 'PERFIL TRANQUILO', short: 'Tranquilo', token: 'risk-low' },
  moderate: { key: 'moderate', label: 'MERECE ATENÇÃO', short: 'Merece atenção', token: 'risk-moderate' },
  high: { key: 'high', label: 'ALGO INCOMODA', short: 'Algo incomoda', token: 'risk-high' },
  // Mantido para compat com o nível 'critical' do score, sem afirmar gravidade clínica.
  critical: { key: 'critical', label: 'ALGO INCOMODA', short: 'Algo incomoda', token: 'risk-critical' },
  // Perfil intermediário leve usado em telas de acompanhamento.
  observe: { key: 'observe', label: 'VALE OBSERVAR', short: 'Vale observar', token: 'menta' },
};

export function profileFor(level) {
  return ATTENTION_PROFILE[level] ?? ATTENTION_PROFILE.moderate;
}

/** Disclaimers padronizados. */
export const DISCLAIMER = {
  short: 'Triagem assistida. Não é diagnóstico médico.',
  inline:
    'Isto é uma triagem assistida pelos dados do seu relógio — não um diagnóstico. ' +
    'O diagnóstico vem de um médico, após consulta e exame.',
  footer: 'Resultado indicativo · não substitui avaliação médica.',
};

/** Orientação textual por perfil (substitui buildRecommendation clínica). */
export function guidanceFor(level) {
  switch (level) {
    case 'low':
      return {
        title: 'Continue acompanhando seu sono',
        body: 'Os indícios desta noite estão dentro de uma faixa tranquila. Manter o uso noturno do relógio ajuda a perceber mudanças cedo.',
      };
    case 'moderate':
      return {
        title: 'Considere conversar com um especialista',
        body: 'Esta triagem identificou sinais que merecem atenção. Um médico do sono pode avaliar e orientar os próximos passos. Esta é uma triagem, não um diagnóstico.',
      };
    case 'high':
    case 'critical':
      return {
        title: 'Procure um especialista do sono',
        body: 'Esta triagem identificou sinais persistentes que sugerem buscar avaliação especializada. Lembrando: este resultado é uma indicação, não um diagnóstico clínico.',
      };
    default:
      return null;
  }
}
