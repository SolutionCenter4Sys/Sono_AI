import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';

const SCORES = [
  { label: 'ESS', value: '9 / 24', tag: 'Sonolência leve', tone: 'menta' },
  { label: 'STOP-BANG', value: '5 / 8', tag: 'Alto risco AOS', tone: 'laranja' },
  { label: 'ISI', value: '11 / 28', tag: 'Insônia moderada', tone: 'risk-moderate' },
  { label: 'PSQI', value: 'Razoável', tag: 'Subjetivo', tone: 'sun-moon' },
];

const FINDINGS = [
  'Ronco alto reportado (STOP-BANG S=1)',
  'Sonolência diurna em atividades sedentárias',
  'Insônia de manutenção em metade das noites',
  'Histórico familiar de AOS',
];

const PATIENT = [
  ['Idade', '42 anos'],
  ['IMC', '27.3 (sobrepeso)'],
  ['Convênio', 'Bradesco Saúde'],
  ['Cidade', 'São Paulo, SP'],
];

const CID = [
  { code: 'G47.33 — AOS', active: true },
  { code: 'G47.0', active: false },
  { code: 'G47.8', active: false },
];

const ENCAMINHA = [
  'Polissonografia presencial',
  'Polissonografia móvel (kit em casa)',
  'Não encaminhar (apenas orientações)',
];

export default function TriagemReviewScreen() {
  const navigate = useNavigate();
  const [encaminha, setEncaminha] = useState('Polissonografia presencial');

  return (
    <div className="min-h-dvh">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5">
        <div>
          <h1 className="text-[22px] font-bold text-text-primary">Triagem do paciente</h1>
          <p className="text-xs text-baunilha/70">João Silva · 42 anos · há 5 minutos</p>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="rounded-pill bg-risk-moderate/20 px-3 py-2 text-xs font-semibold text-risk-moderate">
            🔔 12 pendentes
          </span>
          <button
            type="button"
            className="rounded-button bg-surface-2 px-4 py-2.5 text-xs font-semibold text-text-primary"
          >
            Buscar
          </button>
        </div>
      </header>

      <div className="grid grid-cols-[1fr_400px] gap-4 px-8 pb-8">
        {/* LEFT 60% */}
        <div className="space-y-4">
          {/* Scores */}
          <section className="rounded-card-lg bg-surface p-5">
            <Label className="text-menta">Scores de triagem</Label>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {SCORES.map((s) => (
                <div key={s.label} className="rounded-card bg-surface-2 p-3.5">
                  <span className="text-xs font-semibold uppercase tracking-kicker text-baunilha/70">
                    {s.label}
                  </span>
                  <p className="mt-1 text-[28px] font-bold leading-none text-text-primary">
                    {s.value}
                  </p>
                  <span
                    className="mt-2 inline-flex rounded-pill px-2 py-1 text-[10px] font-bold"
                    style={{
                      backgroundColor: `hsl(var(--${s.tone}) / 0.18)`,
                      color: `hsl(var(--${s.tone}))`,
                    }}
                  >
                    {s.tag}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Findings */}
          <section className="rounded-card-lg bg-surface p-5">
            <Label className="text-risk-moderate">Achados relevantes</Label>
            <div className="mt-3 space-y-3">
              {FINDINGS.map((f) => (
                <div key={f} className="flex items-center gap-2.5">
                  <span className="text-lg font-bold text-laranja">›</span>
                  <span className="text-sm font-medium text-text-primary">{f}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Patient data */}
          <section className="rounded-card-lg bg-surface p-5">
            <Label>Dados do paciente</Label>
            <div className="mt-3 space-y-2.5">
              {PATIENT.map(([k, v]) => (
                <div key={k} className="flex items-center justify-between">
                  <span className="text-xs font-medium text-baunilha/70">{k}</span>
                  <span className="text-sm font-semibold text-text-primary">{v}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT 40% */}
        <div className="space-y-4">
          {/* Medical decision */}
          <section className="rounded-card-lg bg-marinho p-5">
            <Label className="text-sun-moon">Decisão médica</Label>
            <p className="mt-3 text-sm font-semibold text-text-primary">CID-10 sugerido pela IA</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {CID.map((c) => (
                <span
                  key={c.code}
                  className={`rounded-pill px-3 py-2 text-xs font-medium ${
                    c.active
                      ? 'bg-laranja font-semibold text-text-on-brand'
                      : 'bg-surface-2 text-text-primary'
                  }`}
                >
                  {c.code}
                </span>
              ))}
            </div>
            <div className="my-3 h-px w-full bg-surface-2" />
            <Label>Justificativa clínica</Label>
            <div className="mt-2 rounded-button bg-surface p-3 text-xs leading-relaxed text-text-primary">
              Paciente com sintomas compatíveis com AOS moderada. STOP-BANG &gt; 4 e queixas de
              sonolência diurna recorrentes. Indico polissonografia para confirmação...
            </div>
          </section>

          {/* Encaminhamento */}
          <section className="rounded-card-lg bg-surface p-5">
            <Label className="text-menta">Encaminhamento</Label>
            <div className="mt-3 space-y-2.5">
              {ENCAMINHA.map((e) => {
                const active = e === encaminha;
                return (
                  <button
                    key={e}
                    type="button"
                    onClick={() => setEncaminha(e)}
                    className={`flex w-full items-center gap-2.5 rounded-button px-3.5 py-3 text-left text-xs font-medium transition-colors ${
                      active
                        ? 'bg-laranja font-semibold text-text-on-brand'
                        : 'bg-surface-2 text-text-primary'
                    }`}
                  >
                    <span
                      className={`h-3.5 w-3.5 shrink-0 rounded-full ${
                        active ? 'bg-text-on-brand' : 'border border-baunilha/50'
                      }`}
                    />
                    {e}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Actions */}
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-card bg-surface-2 px-6 py-3.5 text-sm font-semibold text-text-primary"
            >
              Descartar
            </button>
            <button
              type="button"
              onClick={() => navigate('/medico/agenda')}
              className="flex flex-1 items-center justify-center gap-2 rounded-card bg-laranja px-6 py-3.5 text-sm font-semibold text-text-on-brand shadow-cta"
            >
              <Check size={16} /> Confirmar e encaminhar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Label({ children, className = '' }) {
  return (
    <span
      className={`text-xs font-semibold uppercase tracking-kicker text-baunilha/50 ${className}`}
    >
      {children}
    </span>
  );
}
