/**
 * Personas do protótipo — 6 casos de uso com dados clínicos coerentes.
 *
 * Cada persona define o "cenário" da Home + datasets coerentes para Sleep Score,
 * histórico, acompanhamento e laudo. Consumido via `useUseCase()` (ver
 * src/lib/useCaseContext.jsx).
 *
 * Convenção de scenarios:
 *  - 'sintomas'      → paciente com queixas, ainda investigando (alerta pré-diag)
 *  - 'exame'         → em jornada de exame (PSG em andamento ou recém-laudada)
 *  - 'cpap'          → em terapia há ≥30 dias (foco em aderência e Sleep Score)
 *  - 'saudavel'      → sem queixas, recém-pareou wearable (empty states)
 *  - 'antecipacao'   → diagnosticado, sistema antecipou retorno por piora (ADR-028)
 *  - 'doctor'        → perfil profissional (Portal Médico — desktop)
 *
 * Para adicionar persona: replicar o shape abaixo no objeto PERSONAS e expor o
 * id no DashboardHome (USE_CASES). Campos opcionais → null = não mostra o card.
 */

import { GEO_PERSONAS } from './personasGeo.js';

const noites30 = (gen) => Array.from({ length: 30 }, (_, i) => gen(i));

const CORE_PERSONAS = {
  // ============== JOÃO — sintomas / pré-investigação ==============
  joao: {
    id: 'joao',
    role: 'patient',
    scenario: 'sintomas',

    firstName: 'João',
    lastName: 'Silva',
    fullName: 'João Silva',
    age: 38,
    initials: 'JS',
    occupation: 'Executivo',

    device: { name: 'Galaxy Watch 6', model: 'SM-R930', brand: 'Samsung', state: 'connected', battery: 64, lastSyncMinutesAgo: 14, pairedSinceDays: 12 },

    lastNight: {
      date: '15/06',
      score: 58,
      ahi: 22,
      spo2Min: 87,
      duration: '6h 12',
      hrAvg: 72,
      quality: 'Atenção',
    },

    nights: noites30((i) => ({
      day: i + 1,
      sleep: 54 + (i % 8),
      ahi: 22 + (i % 6) - 3,
      hrAvg: 71 + (i % 4),
      spo2Min: 86 + (i % 5),
      duration: 5.8 + (i % 3) * 0.3,
    })),

    score: {
      points: 320,
      level: 'Bronze',
      nextLevelAt: 500,
      weekDelta: -8,
      activeChallenge: { id: 'sem-cafeina', name: 'Sem cafeína após 16h', progress: 3, target: 7 },
    },

    triagem: {
      ess: 14,        // sonolência diurna excessiva
      stopBang: 5,    // risco alto AOS
      isi: 11,        // insônia moderada
      psqi: 9,        // qualidade ruim
      completed: true,
    },

    exam: null,
    laudo: null,
    followUp: null,

    preDiag: {
      show: true,
      severity: 'moderate',
      label: 'Seu sono merece atenção',
      signals: [
        { label: 'SpO₂ mínima', value: '87%', state: 'warn' },
        { label: 'FC noturna', value: '+8 bpm', state: 'warn' },
        { label: 'Duração média', value: '6h 12', state: 'ok' },
      ],
    },
  },

  // ============== MARIA — em jornada de exame ==============
  maria: {
    id: 'maria',
    role: 'patient',
    scenario: 'exame',

    firstName: 'Maria',
    lastName: 'Santos',
    fullName: 'Maria Santos',
    age: 52,
    initials: 'MS',
    occupation: 'Professora · HAS controlada',

    device: { name: 'Galaxy Watch 6', model: 'SM-R930', brand: 'Samsung', state: 'connected', battery: 91, lastSyncMinutesAgo: 3, pairedSinceDays: 28 },

    lastNight: {
      date: '15/06',
      score: 62,
      ahi: 18.4,
      spo2Min: 84,
      duration: '7h 38',
      hrAvg: 68,
      quality: 'OK',
    },

    nights: noites30((i) => ({
      day: i + 1,
      sleep: 60 + (i % 10),
      ahi: 18 + (i % 4) - 1,
      hrAvg: 67 + (i % 3),
      spo2Min: 84 + (i % 4),
      duration: 7.0 + (i % 2) * 0.4,
    })),

    score: null,         // ainda não engajou na gamificação
    triagem: { ess: 12, stopBang: 4, isi: 8, psqi: 7, completed: true },

    // Polissonografia em andamento (2/7 noites)
    exam: {
      state: 'in_progress',
      currentNight: 2,
      totalNights: 7,
      startDate: '14/06',
      expectedReturnDate: '21/06',
      technician: { name: 'Téc. Sandra L.', phone: '11 99999-0000' },
      kit: { model: 'AFIP-PSG-Mini v3', battery: 78, signal: 'forte' },
    },

    laudo: null,
    followUp: null,
    preDiag: null,
  },

  // ============== CARLOS — em terapia CPAP (D+120) ==============
  carlos: {
    id: 'carlos',
    role: 'patient',
    scenario: 'cpap',

    firstName: 'Carlos',
    lastName: 'Ribeiro',
    fullName: 'Carlos Ribeiro',
    age: 45,
    initials: 'CR',
    occupation: 'Gerente comercial · AOS moderada',

    device: { name: 'Galaxy Watch 6', model: 'SM-R930', brand: 'Samsung', state: 'connected', battery: 82, lastSyncMinutesAgo: 8, pairedSinceDays: 145 },

    lastNight: {
      date: '15/06',
      score: 78,
      ahi: 6,
      spo2Min: 93,
      duration: '7h 04',
      hrAvg: 62,
      quality: 'Boa',
      cpapHours: 6.4,
    },

    nights: noites30((i) => ({
      day: i + 1,
      sleep: 72 + (i % 10),
      ahi: 7 + (i % 5) - 1,
      hrAvg: 62 + (i % 3),
      spo2Min: 92 + (i % 3),
      duration: 7.0 + (i % 2) * 0.3,
      cpapHours: 6.0 + (i % 3) * 0.4,
    })),

    score: {
      points: 580,
      level: 'Prata',
      nextLevelAt: 800,
      weekDelta: 12,
      activeChallenge: { id: 'cpap-aderencia', name: 'Aderência CPAP ≥6h', progress: 6, target: 7 },
    },

    triagem: { ess: 8, stopBang: 5, isi: 7, psqi: 6, completed: true },

    exam: {
      state: 'signed',
      currentNight: 7,
      totalNights: 7,
      startDate: '11/02',
    },

    laudo: {
      number: 'AFIP-LAU-2026-08203',
      iah: 22.3,
      severity: 'moderate',
      cid: 'CID-10 G47.33',
      signedAt: '17/02/2026 · 14:08',
      signedBy: { name: 'Dr. Marcos Rocha', crm: 'CRM 117892-SP', rqe: 'RQE 28156' },
      diagnosis: 'Apneia Obstrutiva — moderada',
      metrics: { iah: 22.3, spo2Min: 82, efficiency: 76, duration: '7h 12' },
    },

    followUp: {
      diagnosisDate: '17/02',
      daysSinceDiagnosis: 120,
      cpapAdherenceAvg: 85,
      cpapHoursAvg: 5.8,
      completed: [
        { id: 'r-d30', type: 'D+30', date: '17/03', status: 'done', snapshot: { ahi: 8, cpapAdherence: 92 } },
        { id: 'r-d90', type: 'D+90', date: '17/05', status: 'done', snapshot: { ahi: 12, cpapAdherence: 85 } },
      ],
      next: { id: 'r-d180', type: 'D+180', date: '18/08', anticipated: false, status: 'scheduled' },
    },

    preDiag: null,
  },

  // ============== ANA — saudável, recém-pareou (empty states) ==============
  ana: {
    id: 'ana',
    role: 'patient',
    scenario: 'saudavel',

    firstName: 'Ana',
    lastName: 'Lima',
    fullName: 'Ana Lima',
    age: 29,
    initials: 'AL',
    occupation: 'Designer · sem queixas de sono',

    device: { name: 'Galaxy Watch 6', model: 'SM-R930', brand: 'Samsung', state: 'connected', battery: 71, lastSyncMinutesAgo: 22, pairedSinceDays: 3 },

    // Apenas 1 noite registrada
    lastNight: {
      date: '15/06',
      score: 84,
      ahi: 2,
      spo2Min: 95,
      duration: '7h 22',
      hrAvg: 58,
      quality: 'Boa',
    },

    nights: [],          // sem histórico ainda
    score: null,         // empty state em /score
    triagem: null,       // não fez ainda

    exam: null,
    laudo: null,
    followUp: null,
    preDiag: null,
  },

  // ============== ROBERTO — antecipação clínica (ADR-028) ==============
  roberto: {
    id: 'roberto',
    role: 'patient',
    scenario: 'antecipacao',

    firstName: 'Roberto',
    lastName: 'Martins',
    fullName: 'Roberto Martins',
    age: 60,
    initials: 'RM',
    occupation: 'Aposentado · AOS grave',

    device: { name: 'Galaxy Watch 6', model: 'SM-R930', brand: 'Samsung', state: 'connected', battery: 58, lastSyncMinutesAgo: 6, pairedSinceDays: 178 },

    lastNight: {
      date: '15/06',
      score: 54,
      ahi: 18,
      spo2Min: 82,
      duration: '5h 48',
      hrAvg: 74,
      quality: 'Atenção',
      cpapHours: 3.2,
    },

    nights: noites30((i) => ({
      day: i + 1,
      // Tendência de piora nos últimos 14 dias (ADR-028)
      sleep: i < 16 ? 76 - i * 0.5 : 60 - (i - 16) * 0.8,
      ahi: i < 16 ? 8 + (i % 3) : 14 + (i - 16) * 0.4,
      hrAvg: 68 + (i % 4),
      spo2Min: i < 16 ? 92 + (i % 3) : 86 - (i - 16) * 0.3,
      duration: i < 16 ? 7.0 : 6.0 - (i - 16) * 0.1,
      cpapHours: i < 16 ? 6.0 : 4.0,
    })),

    score: {
      points: 410,
      level: 'Bronze',
      nextLevelAt: 500,
      weekDelta: -14,
      activeChallenge: null,
    },

    triagem: { ess: 16, stopBang: 7, isi: 14, psqi: 12, completed: true },

    exam: {
      state: 'signed',
      currentNight: 7,
      totalNights: 7,
      startDate: '15/01',
    },

    laudo: {
      number: 'AFIP-LAU-2026-07418',
      iah: 38.2,
      severity: 'severe',
      cid: 'CID-10 G47.33',
      signedAt: '17/01/2026 · 16:32',
      signedBy: { name: 'Dr. Marcos Rocha', crm: 'CRM 117892-SP', rqe: 'RQE 28156' },
      diagnosis: 'Apneia Obstrutiva — grave',
      metrics: { iah: 38.2, spo2Min: 78, efficiency: 68, duration: '6h 48' },
    },

    followUp: {
      diagnosisDate: '17/01',
      daysSinceDiagnosis: 150,
      cpapAdherenceAvg: 62,   // < 70% — gatilho clínico
      cpapHoursAvg: 4.1,
      completed: [
        { id: 'r-d30', type: 'D+30', date: '17/02', status: 'done', snapshot: { ahi: 9, cpapAdherence: 91 } },
        { id: 'r-d90', type: 'D+90', date: '17/04', status: 'done', snapshot: { ahi: 13, cpapAdherence: 78 } },
      ],
      next: {
        id: 'r-d150',
        type: 'D+150',
        date: '04/07',
        anticipated: true,
        anticipatedReason: 'Aderência <70% por 14 dias + AHI subiu de 13→18 em 7 noites',
        status: 'scheduled',
      },
    },

    preDiag: null,
  },

  // ============== DRA. MARCELA — médica (perfil profissional) ==============
  marcela: {
    id: 'marcela',
    role: 'doctor',
    scenario: 'doctor',

    firstName: 'Marcela',
    lastName: 'Andrade',
    fullName: 'Dra. Marcela Andrade',
    age: 41,
    initials: 'DM',
    occupation: 'Médica do Sono · Especialista AFIP',
    crm: 'CRM 142890-SP',
    rqe: 'RQE 31245',
    cnes: 'CNES 7811223',
    specialty: 'Medicina do Sono',

    device: null, lastNight: null, nights: [], score: null, triagem: null,
    exam: null, laudo: null, followUp: null, preDiag: null,

    doctor: {
      todayConsultations: 7,
      pendingLaudos: 3,
      upcomingReturns: 5,
      kpis: {
        patientsThisMonth: 142,
        avgAdherence: 78,
        antecipatedReturns: 4,
      },
    },
  },
};

export const PERSONAS = { ...CORE_PERSONAS, ...GEO_PERSONAS };

/** Persona default quando nenhum `?uc=` está presente — equivale à "Maria + AFIP exam". */
export const DEFAULT_PERSONA_ID = 'maria';

export function getPersona(id) {
  return PERSONAS[id] ?? PERSONAS[DEFAULT_PERSONA_ID];
}

export const PERSONA_IDS = Object.keys(PERSONAS);
