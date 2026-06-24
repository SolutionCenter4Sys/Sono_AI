/**
 * Port do ComputeDiagnosticScoreUseCase.kt (Android).
 * Heurística da PoC — não é o modelo final v2 com ML treinado.
 *
 * Atende WEB-EP-03-FT-05-* (Result) com regras de:
 *   - WEB-EP-02 / EP-03-FT-01 do BACKLOG (apneia e insônia)
 */

const RISK_LEVELS = ['low', 'moderate', 'high', 'critical'];

/** SpO₂ events × peso + bonus por mínima crítica. Clamped em [0, 100]. */
export function computeApnea(session) {
  let score = 0;
  const events = session.spo2EventsBelow90 ?? 0;
  score += Math.min(events * 11, 40);
  if (session.spo2Min != null && session.spo2Min < 88) score += 25;
  if (session.spo2Min != null && session.spo2Min < 85) score += 10;
  return clamp(Math.round(score));
}

/** Sono curto + eficiência baixa + fragmentação + histórico. Clamped em [0, 100]. */
export function computeInsomnia(session, questionnaire) {
  let score = 0;
  const sleepMin = session.totalSleepMinutes ?? 0;
  if (sleepMin < 240) score += 40;
  else if (sleepMin < 360) score += 10;

  const eff = session.efficiency ?? 100;
  if (eff < 70) score += 30;
  else if (eff < 80) score += 17;

  score += Math.min((session.fragmentation ?? 0) * 3, 20);

  if (questionnaire?.history?.includes('insomnia')) score += 20;
  return clamp(Math.round(score));
}

/** Qualidade subjetiva 0-100 (alto = bom). Compõe apneia + insônia. */
export function computeQuality(apnea, insomnia) {
  return clamp(Math.round(100 - apnea * 0.5 - insomnia * 0.28));
}

export function computeRisk(apnea, insomnia) {
  // Thresholds calibrados para refletir a graduação clínica usada na PoC:
  // 30-64 = moderado (intervenção recomendada), 65-84 = alto (avaliação prioritária),
  // 85+ = crítico (urgência), abaixo de 30 = baixo (monitoramento contínuo).
  const max = Math.max(apnea, insomnia);
  if (max >= 85) return 'critical';
  if (max >= 65) return 'high';
  if (max >= 30) return 'moderate';
  return 'low';
}

/** Bullets em linguagem leiga, ordenados por relevância. Até 5. */
export function buildFindings(session, questionnaire) {
  const findings = [];

  if ((session.spo2EventsBelow90 ?? 0) > 0) {
    findings.push(
      `${session.spo2EventsBelow90} ${
        session.spo2EventsBelow90 === 1 ? 'queda' : 'quedas'
      } de SpO₂ abaixo de 90% durante a noite — mínima de ${session.spo2Min}%`
    );
  }

  const complaints = Array.isArray(questionnaire?.complaints)
    ? questionnaire.complaints
    : questionnaire?.complaint
      ? [questionnaire.complaint]
      : [];
  if (complaints.includes('snoring')) {
    findings.push('Ronco alto reportado no questionário');
  }
  if (complaints.includes('tired')) {
    findings.push('Sensação de cansaço ao acordar relatada no questionário');
  }
  if (complaints.includes('daytime-sleepiness')) {
    findings.push('Sonolência diurna relatada no questionário');
  }
  if (complaints.includes('latency')) {
    findings.push('Dificuldade para iniciar o sono relatada no questionário');
  }
  if (complaints.includes('fragmented')) {
    findings.push('Despertares noturnos frequentes relatados no questionário');
  }

  if ((session.efficiency ?? 100) < 85 && (session.fragmentation ?? 0) > 3) {
    findings.push('Sono fragmentado: eficiência reduzida');
  }

  const sleepMin = session.totalSleepMinutes ?? 0;
  if (sleepMin < 240) {
    findings.push('Duração muito curta — abaixo de 4h');
  } else if (sleepMin < 420) {
    const hours = Math.floor(sleepMin / 60);
    const mins = sleepMin % 60;
    findings.push(
      `Duração próxima do limite recomendado (${hours}h ${String(mins).padStart(2, '0')}min)`
    );
  }

  if (session.heartRateAvg != null && session.heartRateAvg > 75) {
    findings.push(`FC noturna elevada (${session.heartRateAvg} bpm em média)`);
  }

  return findings.slice(0, 5);
}

/**
 * Orientação textual conforme perfil de atenção.
 * Posicionamento: triagem assistida, sem afirmar diagnóstico/condição.
 */
export function buildRecommendation(risk) {
  switch (risk) {
    case 'low':
      return {
        title: 'Continue acompanhando seu sono',
        body: 'Os indícios desta noite estão dentro de uma faixa tranquila. Manter o uso noturno do relógio ajuda a perceber mudanças cedo.',
      };
    case 'moderate':
      return {
        title: 'Considere conversar com um especialista',
        body: 'Esta triagem identificou sinais que merecem atenção. Um médico do sono pode avaliar seus dados e orientar os próximos passos. Esta é uma triagem, não um diagnóstico.',
      };
    case 'high':
      return {
        title: 'Procure um especialista do sono',
        body: 'Esta triagem encontrou indícios que valem investigação. O Instituto do Sono (AFIP) pode conduzir a avaliação. Este resultado é indicativo, não um diagnóstico.',
      };
    case 'critical':
      return {
        title: 'Vale buscar avaliação especializada em breve',
        body: 'Esta triagem identificou sinais persistentes. Procure o Instituto do Sono (AFIP) ou um serviço médico para uma avaliação detalhada. Este resultado é indicativo, não um diagnóstico.',
      };
    default:
      return null;
  }
}

/** Computa todos os scores e textos para uma sessão + questionário. */
export function computeDiagnosticScore(session, questionnaire = null) {
  const apnea = computeApnea(session);
  const insomnia = computeInsomnia(session, questionnaire);
  const quality = computeQuality(apnea, insomnia);
  const risk = computeRisk(apnea, insomnia);
  return {
    apnea,
    insomnia,
    quality,
    risk,
    riskIndex: RISK_LEVELS.indexOf(risk),
    findings: buildFindings(session, questionnaire),
    recommendation: buildRecommendation(risk),
  };
}

function clamp(v) {
  return Math.max(0, Math.min(100, v));
}
