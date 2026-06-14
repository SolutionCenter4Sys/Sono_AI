import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

/**
 * 06.5 Pittsburgh (PSQI) — qualidade subjetiva.
 * Figma 59:315.
 */
const RATINGS = [
  { emoji: '😴', label: 'Muito ruim' },
  { emoji: '🙁', label: 'Ruim' },
  { emoji: '😐', label: 'Razoável' },
  { emoji: '🙂', label: 'Boa' },
  { emoji: '😊', label: 'M. boa' },
];

const FIELDS = [
  { q: 'Quanto tempo demorou para pegar no sono ontem?', value: '35 min' },
  { q: 'Quantas horas dormiu?', value: '6h 12min', tint: 'menta' },
  { q: 'Qualidade do sono em geral?', value: 'Razoável', tint: 'sun-moon' },
];

export default function PittsburghScreen() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(2);

  return (
    <div className="flex h-full flex-col">
      <TopBarProgress navigate={navigate} step={4} />

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <p className="text-[11px] font-semibold uppercase tracking-kicker text-menta">
          PSQI · Qualidade subjetiva
        </p>
        <h1 className="mt-1.5 text-[24px] font-bold leading-tight">
          Como você descreveria seu sono no último mês?
        </h1>

        {/* Emoji rating */}
        <section className="mt-4 rounded-card bg-surface p-5">
          <p className="text-center text-[12px] font-semibold text-baunilha/75">
            Sua avaliação geral
          </p>
          <div className="mt-4 flex items-stretch justify-between gap-2">
            {RATINGS.map((r, i) => {
              const selected = rating === i;
              return (
                <button
                  key={r.label}
                  type="button"
                  onClick={() => setRating(i)}
                  className="flex flex-1 flex-col items-center gap-1.5 rounded-xl py-2"
                  style={{
                    backgroundColor: selected ? 'hsl(var(--sun-moon) / 0.16)' : 'hsl(var(--surface-2) / 0.5)',
                    border: selected
                      ? '1.5px solid hsl(var(--sun-moon) / 0.6)'
                      : '1.5px solid transparent',
                  }}
                  aria-pressed={selected}
                >
                  <span className="text-2xl">{r.emoji}</span>
                  <span className="text-[10px] text-baunilha/65">{r.label}</span>
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-center text-[16px] font-bold text-sun-moon">
            {RATINGS[rating].label}
          </p>
        </section>

        {/* Fields */}
        <div className="mt-4 flex flex-col gap-3">
          {FIELDS.map((f) => (
            <div
              key={f.q}
              className="flex items-center justify-between gap-3 rounded-card bg-surface p-4"
            >
              <p className="min-w-0 flex-1 text-[14px] font-medium text-text-primary/90">{f.q}</p>
              <span
                className="shrink-0 rounded-pill px-3 py-1.5 text-[12px] font-semibold"
                style={{
                  backgroundColor: f.tint
                    ? `hsl(var(--${f.tint}) / 0.16)`
                    : 'hsl(var(--surface-2) / 0.8)',
                  color: f.tint ? `hsl(var(--${f.tint}))` : 'hsl(var(--baunilha))',
                }}
              >
                {f.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <footer className="px-6 pb-5 pt-3">
        <button
          type="button"
          onClick={() => navigate('/triagem/score')}
          className="flex w-full items-center justify-center gap-2 rounded-button bg-laranja py-3.5 text-base font-semibold text-text-on-brand shadow-cta"
        >
          Ver resultado consolidado <span>→</span>
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
