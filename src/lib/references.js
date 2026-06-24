/**
 * Referências científicas dos instrumentos e parâmetros usados na triagem.
 * Exibidas em rodapé (componente SourceNote) e na tela de Metodologia.
 * Feedback Dr. Gustavo: todo dado numérico deve ter referência.
 */

export const REFERENCES = {
  epworth:
    'Johns MW. A new method for measuring daytime sleepiness: the Epworth Sleepiness Scale. Sleep. 1991.',
  stopbang:
    'Chung F, et al. STOP-BANG questionnaire to screen for obstructive sleep apnea. Anesthesiology. 2008.',
  isi: 'Morin CM, et al. The Insomnia Severity Index (ISI). Sleep. 2011.',
  psqi: 'Buysse DJ, et al. The Pittsburgh Sleep Quality Index (PSQI). Psychiatry Res. 1989.',
  colekripke:
    'Cole RJ, et al. Automatic sleep/wake identification from wrist actigraphy. Sleep. 1992.',
  odi: 'AASM Manual for the Scoring of Sleep and Associated Events — índice de dessaturação (ODI), SpO₂.',
  duration:
    'Recomendação de duração do sono (adultos 7–9h): AASM & National Sleep Foundation.',
};

/** Conjuntos por contexto de tela. */
export const REF_TRIAGEM = [
  REFERENCES.epworth,
  REFERENCES.stopbang,
  REFERENCES.isi,
  REFERENCES.psqi,
];
export const REF_WEARABLE = [REFERENCES.colekripke, REFERENCES.odi];
export const REF_DURATION = [REFERENCES.duration];

/** Lista completa, para a tela de Metodologia. */
export const REF_ALL = [
  REFERENCES.epworth,
  REFERENCES.stopbang,
  REFERENCES.isi,
  REFERENCES.psqi,
  REFERENCES.colekripke,
  REFERENCES.odi,
  REFERENCES.duration,
];
