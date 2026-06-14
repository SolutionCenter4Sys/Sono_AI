import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

/**
 * 06.2 Epworth (ESS) — sonolência diurna.
 * Figma 59:62.
 */
const SCALE = [
  { v: 0, label: '0 Nenhuma', color: 'baunilha' },
  { v: 1, label: '1 Leve', color: 'menta' },
  { v: 2, label: '2 Moderada', color: 'risk-moderate' },
  { v: 3, label: '3 Alta', color: 'risk-high' },
];

const QUESTIONS = [
  { q: '1. Sentado, lendo um livro', answer: 2 },
  { q: '2. Assistindo TV', answer: 1 },
  { q: '3. Sentado parado em local público', answer: 2 },
  { q: '4. Como passageiro de carro por 1h sem parar', answer: 0 },
];

export default function EpworthScreen() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState(
    QUESTIONS.reduce((acc, item, i) => ({ ...acc, [i]: item.answer }), {})
  );

  return (
    <div className="flex h-full flex-col">
      <TopBarProgress navigate={navigate} step={1} />

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <p className="text-[11px] font-semibold uppercase tracking-kicker text-menta">
          ESS · Epworth
        </p>
        <h1 className="mt-1.5 text-[24px] font-bold leading-tight">
          Como você avalia sua sonolência?
        </h1>
        <p className="mt-2 text-[13px] text-baunilha/65">
          Em cada situação, quão provável é cochilar ou dormir?
        </p>

        {/* Escala */}
        <section className="mt-4 rounded-card bg-surface p-4">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
            Escala
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {SCALE.map((s) => (
              <span
                key={s.v}
                className="rounded-pill border px-3 py-1.5 text-[11px] font-semibold"
                style={{
                  backgroundColor: `hsl(var(--${s.color}) / 0.16)`,
                  borderColor: `hsl(var(--${s.color}) / 0.4)`,
                  color: `hsl(var(--${s.color}))`,
                }}
              >
                {s.label}
              </span>
            ))}
          </div>
        </section>

        {/* Questions */}
        <div className="mt-4 flex flex-col gap-3">
          {QUESTIONS.map((item, i) => (
            <div key={i} className="rounded-card bg-surface p-4">
              <p className="text-[15px] font-semibold text-text-primary/95">{item.q}</p>
              <div className="mt-3 flex items-start justify-between">
                {[0, 1, 2, 3].map((val) => {
                  const selected = answers[i] === val;
                  return (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setAnswers((a) => ({ ...a, [i]: val }))}
                      className="flex flex-col items-center gap-1.5"
                    >
                      <span
                        className="h-8 w-8 rounded-full"
                        style={{
                          backgroundColor: selected ? 'hsl(var(--laranja))' : 'hsl(var(--surface-2))',
                        }}
                      />
                      <span className="text-[11px] text-baunilha/55">{val}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-3 text-center text-[11px] text-baunilha/45">
          + 4 perguntas adicionais (compactadas neste mockup)
        </p>

        {/* Parcial */}
        <section className="mt-4 rounded-card bg-surface p-5">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
            Parcial
          </p>
          <p className="mt-1 text-[28px] font-bold text-menta">9 / 24 pontos</p>
        </section>
      </div>

      <footer className="px-6 pb-5 pt-3">
        <button
          type="button"
          onClick={() => navigate('/triagem/stop-bang')}
          className="flex w-full items-center justify-center gap-2 rounded-button bg-laranja py-3.5 text-base font-semibold text-text-on-brand shadow-cta"
        >
          Próximo: STOP-BANG <span>→</span>
        </button>
      </footer>
    </div>
  );
}

function TopBarProgress({ navigate, step }) {
  const percent = (step / 4) * 100;
  return (
    <div>
      <header className="flex items-center justify-between px-4 pt-4 pb-2">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Voltar"
          className="grid h-10 w-10 place-items-center rounded-full bg-surface-2/60 text-text-primary/90 transition hover:bg-surface-2"
        >
          <ChevronLeft size={20} strokeWidth={2.4} />
        </button>
        <span className="text-[12px] font-semibold uppercase tracking-kicker text-baunilha/70">
          Questionário {step} de 4
        </span>
        <span className="h-10 w-10" aria-hidden />
      </header>
      <div className="px-6 pb-4 pt-1">
        <div className="h-1.5 w-full overflow-hidden rounded-pill bg-surface-2">
          <div className="h-full rounded-pill bg-laranja" style={{ width: `${percent}%` }} />
        </div>
      </div>
    </div>
  );
}
