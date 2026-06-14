import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

/**
 * 06.4 ISI — severidade da insônia.
 * Figma 59:248.
 */
const OPTIONS = [
  { v: 0, label: '0 Nenh', color: 'baunilha' },
  { v: 1, label: '1 Leve', color: 'menta' },
  { v: 2, label: '2 Mod', color: 'risk-moderate' },
  { v: 3, label: '3 Grave', color: 'risk-high' },
  { v: 4, label: '4 M.Gr', color: 'risk-critical' },
];

const QUESTIONS = [
  { q: '1. Dificuldade para iniciar o sono', answer: 2 },
  { q: '2. Acordar várias vezes durante a noite', answer: 3 },
  { q: '3. Acordar muito cedo e não voltar a dormir', answer: 1 },
];

export default function IsiScreen() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState(
    QUESTIONS.reduce((acc, item, i) => ({ ...acc, [i]: item.answer }), {})
  );

  return (
    <div className="flex h-full flex-col">
      <TopBarProgress navigate={navigate} step={3} />

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <p className="text-[11px] font-semibold uppercase tracking-kicker text-menta">
          ISI · Insônia
        </p>
        <h1 className="mt-1.5 text-[24px] font-bold leading-tight">
          Severidade da insônia (últimas 2 semanas)
        </h1>

        <div className="mt-4 flex flex-col gap-3">
          {QUESTIONS.map((item, i) => (
            <div key={i} className="rounded-card bg-surface p-4">
              <p className="text-[15px] font-semibold text-text-primary/95">{item.q}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {OPTIONS.map((opt) => {
                  const selected = answers[i] === opt.v;
                  return (
                    <button
                      key={opt.v}
                      type="button"
                      onClick={() => setAnswers((a) => ({ ...a, [i]: opt.v }))}
                      className="rounded-pill border px-3 py-1.5 text-[11px] font-semibold"
                      style={{
                        backgroundColor: selected
                          ? `hsl(var(--${opt.color}) / 0.18)`
                          : 'transparent',
                        borderColor: selected
                          ? `hsl(var(--${opt.color}))`
                          : 'hsl(var(--surface-2))',
                        color: selected ? `hsl(var(--${opt.color}))` : 'hsl(var(--baunilha) / 0.5)',
                      }}
                      aria-pressed={selected}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-3 text-center text-[11px] text-baunilha/45">
          + 4 perguntas adicionais compactadas
        </p>

        {/* Parcial */}
        <section className="mt-4 rounded-card bg-surface p-5">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
            Parcial
          </p>
          <p className="mt-1 text-[28px] font-bold text-risk-moderate">11 / 28 pontos</p>
          <p className="text-[12px] text-baunilha/60">Insônia moderada</p>
        </section>
      </div>

      <footer className="px-6 pb-5 pt-3">
        <button
          type="button"
          onClick={() => navigate('/triagem/pittsburgh')}
          className="flex w-full items-center justify-center gap-2 rounded-button bg-laranja py-3.5 text-base font-semibold text-text-on-brand shadow-cta"
        >
          Próximo: Pittsburgh <span>→</span>
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
