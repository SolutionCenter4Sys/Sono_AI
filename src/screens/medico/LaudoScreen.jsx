import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Check } from 'lucide-react';

/**
 * Laudos por paciente (pós-PSG). Diagnóstico/CID são legítimos aqui — há exame
 * real e o médico assina. Fallback: João Silva.
 */
const LAUDOS = {
  'joao-c': {
    name: 'João Carvalho', date: '10 Jun', number: 'AFIP-PSG-2026-04418',
    diagnosis: 'Apneia Obstrutiva do Sono — moderada', cid: 'CID-10 · G47.33', tone: 'risk-moderate',
  },
  'roberto-s': {
    name: 'Roberto Santos', date: '11 Jun', number: 'AFIP-PSG-2026-04420',
    diagnosis: 'Apneia Obstrutiva do Sono — grave', cid: 'CID-10 · G47.33', tone: 'risk-high',
  },
  'maria-f': {
    name: 'Maria Ferreira', date: '10 Jun', number: 'AFIP-PSG-2026-04419',
    diagnosis: 'Apneia Obstrutiva do Sono — leve', cid: 'CID-10 · G47.33', tone: 'risk-low',
  },
  'helena-r': {
    name: 'Helena Ramos', date: '09 Jun', number: 'AFIP-PSG-2026-04415',
    diagnosis: 'Insônia crônica', cid: 'CID-10 · F51.0', tone: 'risk-moderate',
  },
};

const DEFAULT_LAUDO = {
  name: 'João Silva', date: '12 Jun', number: 'AFIP-PSG-2026-04421',
  diagnosis: 'Apneia Obstrutiva do Sono — moderada', cid: 'CID-10 · G47.33', tone: 'risk-moderate',
};

const SIGNALS = [
  { label: 'EEG', color: 'laranja' },
  { label: 'EOG', color: 'menta' },
  { label: 'EMG', color: 'risk-low' },
  { label: 'ECG', color: 'sun-moon' },
  { label: 'SpO₂', color: 'risk-moderate' },
];

const LEGEND = [
  { label: 'Wake', tone: 'laranja' },
  { label: 'N1', tone: 'menta' },
  { label: 'N2', tone: 'risk-low' },
  { label: 'N3', tone: 'baunilha' },
  { label: 'REM', tone: 'sun-moon' },
];

const SUGGESTIONS = [
  { text: 'Estágios de sono estagiados automaticamente', tone: 'risk-low', action: 'Revisar' },
  { text: 'Eventos de apneia: 142 detectados (IAH 18.2)', tone: 'risk-moderate', action: 'Revisar' },
  { text: 'Dessaturações SpO₂ < 90%: 28 episódios', tone: 'risk-low', action: 'Revisar' },
  { text: 'Possíveis micro-despertares: revisar manualmente', tone: 'risk-moderate', action: 'Editar' },
];

const CONDUTAS = [
  'Iniciar CPAP titulado',
  'Retorno em 3 meses',
  'Avaliar comorbidades cardiovasculares',
  'Orientações de higiene do sono',
];

const SIGN_CHECKS = [
  'Validei estagiamento da IA',
  'Revisei eventos respiratórios',
  'Concordo com diagnóstico final',
];

export default function LaudoScreen() {
  const navigate = useNavigate();
  const { patientId } = useParams();
  const laudo = LAUDOS[patientId] ?? DEFAULT_LAUDO;
  const [checks, setChecks] = useState([true, true, true]);
  const toggle = (i) => setChecks((c) => c.map((v, idx) => (idx === i ? !v : v)));

  return (
    <div className="min-h-dvh">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5">
        <div>
          <h1 className="text-[22px] font-bold text-text-primary">Laudo: {laudo.name}</h1>
          <p className="text-xs text-baunilha/70">PSG · {laudo.date} · {laudo.number}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-pill bg-menta/20 px-4 py-2 text-xs font-semibold text-menta">
            ● Em revisão
          </span>
          <button
            type="button"
            onClick={() => navigate('/medico/dashboard')}
            className="rounded-button bg-surface-2 px-4 py-2.5 text-xs font-semibold text-text-primary"
          >
            ← Voltar à fila
          </button>
        </div>
      </header>

      <div className="grid grid-cols-[1fr_400px] gap-4 px-8 pb-8">
        {/* LEFT */}
        <div className="space-y-4">
          {/* Hipnograma */}
          <section className="rounded-card-lg bg-surface p-6">
            <span className="text-xs font-semibold uppercase tracking-kicker text-menta">
              Traçado EDF (hipnograma)
            </span>
            <div className="mt-4 rounded-card bg-marinho-deep p-4">
              <div className="space-y-3">
                {SIGNALS.map((s) => (
                  <div key={s.label} className="flex items-center gap-3">
                    <span className="w-9 shrink-0 text-[11px] font-semibold text-baunilha/70">
                      {s.label}
                    </span>
                    <Wave color={s.color} />
                  </div>
                ))}
              </div>
              <div className="mt-3 flex justify-between pl-12 text-[10px] text-baunilha/50">
                {['22:00', '23:00', '00:00', '01:00', '02:00', '03:00', '04:00', '05:00'].map(
                  (t) => (
                    <span key={t}>{t}</span>
                  )
                )}
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-4">
              {LEGEND.map((l) => (
                <span key={l.label} className="flex items-center gap-1.5 text-xs text-text-primary">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: `hsl(var(--${l.tone}))` }}
                  />
                  {l.label}
                </span>
              ))}
            </div>
          </section>

          {/* IA suggestions */}
          <section className="rounded-card-lg bg-surface p-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-kicker text-menta">
                Sugestões da IA
              </span>
              <span className="rounded-pill bg-sun-moon/20 px-3 py-1 text-[10px] font-bold uppercase tracking-kicker text-sun-moon">
                IA · 94% confiança
              </span>
            </div>
            <div className="mt-3 space-y-2.5">
              {SUGGESTIONS.map((s) => (
                <div
                  key={s.text}
                  className="flex items-center gap-3 rounded-card bg-surface-2 px-4 py-3"
                >
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: `hsl(var(--${s.tone}))` }}
                  />
                  <span className="flex-1 text-sm text-text-primary">{s.text}</span>
                  <span
                    className="rounded-pill px-3 py-1.5 text-xs font-semibold"
                    style={{
                      backgroundColor:
                        s.action === 'Editar'
                          ? 'hsl(var(--risk-moderate) / 0.85)'
                          : 'hsl(var(--menta) / 0.85)',
                      color: 'hsl(var(--marinho-deep))',
                    }}
                  >
                    {s.action}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT */}
        <div className="space-y-4">
          {/* Final diagnosis */}
          <section className="rounded-card-lg bg-surface p-6">
            <span className="text-xs font-semibold uppercase tracking-kicker text-laranja">
              Diagnóstico final
            </span>
            <h2 className="mt-3 text-xl font-bold leading-tight text-text-primary">
              {laudo.diagnosis}
            </h2>
            <span
              className="mt-3 inline-flex rounded-pill px-3 py-1.5 text-xs font-bold"
              style={{
                backgroundColor: `hsl(var(--${laudo.tone}) / 0.85)`,
                color: 'hsl(var(--marinho-deep))',
              }}
            >
              {laudo.cid}
            </span>
            <p className="mt-4 text-xs font-semibold uppercase tracking-kicker text-baunilha/50">
              Condutas:
            </p>
            <div className="mt-2 rounded-card bg-surface-2 p-4">
              <ol className="space-y-1.5 text-sm text-text-primary">
                {CONDUTAS.map((c, i) => (
                  <li key={c}>
                    {i + 1}. {c}
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* FHIR signature */}
          <section className="rounded-card-lg bg-surface p-6">
            <span className="text-xs font-semibold uppercase tracking-kicker text-menta">
              Assinatura FHIR R4
            </span>
            <div className="mt-3 space-y-2.5">
              {SIGN_CHECKS.map((c, i) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => toggle(i)}
                  className="flex w-full items-center gap-2.5 text-left"
                >
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md ${
                      checks[i] ? 'bg-risk-low text-marinho-deep' : 'bg-surface-2'
                    }`}
                  >
                    {checks[i] && <Check size={13} />}
                  </span>
                  <span className="text-sm text-text-primary">{c}</span>
                </button>
              ))}
            </div>
            <p className="mt-3 flex items-center gap-1.5 text-xs text-menta">
              🔒 Certificado A3 detectado
            </p>
            <button
              type="button"
              onClick={() => navigate('/medico/dashboard')}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-button bg-laranja px-6 py-3.5 text-sm font-semibold text-text-on-brand shadow-cta"
            >
              ✒ Assinar e liberar laudo
            </button>
          </section>

          {/* Versions */}
          <section className="rounded-card-lg bg-surface p-5">
            <span className="text-xs font-semibold uppercase tracking-kicker text-baunilha/50">
              Versões
            </span>
            <div className="mt-2 space-y-1 text-xs">
              <p className="text-text-primary">v1 IA · 12 Jun 02:47</p>
              <p className="text-menta">v2 Revisado · agora</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function Wave({ color }) {
  // Decorative EDF-style signal line
  const points = Array.from({ length: 60 }, (_, i) => {
    const x = (i / 59) * 100;
    const y = 50 + Math.sin(i * 0.8) * 22 + Math.sin(i * 0.27) * 10;
    return `${x},${y}`;
  }).join(' ');
  return (
    <div className="h-7 flex-1">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
        <polyline
          points={points}
          fill="none"
          stroke={`hsl(var(--${color}))`}
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
