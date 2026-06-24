import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useSleepState } from '@/state/SleepStateContext.jsx';
import { resolvePlan, nextStep } from '@/data/triagem.js';

/**
 * 06.3 STOP-BANG — risco de apneia (SIM/NÃO).
 * Figma 59:163.
 */
const ITEMS = [
  { key: 'S', q: 'Ronca alto? (audível com porta fechada)', answer: true },
  { key: 'T', q: 'Cansaço durante o dia?', answer: true },
  { key: 'O', q: 'Observou pausas na respiração?', answer: false },
  { key: 'P', q: 'Pressão alta?', answer: false },
  { key: 'B', q: 'IMC > 35?', answer: false },
  { key: 'A', q: 'Idade > 50?', answer: true },
  { key: 'N', q: 'Circunferência pescoço > 40cm?', answer: true },
  { key: 'G', q: 'Sexo masculino?', answer: true },
];

export default function StopBangScreen() {
  const navigate = useNavigate();
  const { questionnaire } = useSleepState();
  const ids = resolvePlan(questionnaire?.complaints, 'stopbang');
  const next = nextStep(ids, 'stopbang');
  const [answers, setAnswers] = useState(
    ITEMS.reduce((acc, item, i) => ({ ...acc, [i]: item.answer }), {})
  );

  return (
    <div className="flex h-full flex-col">
      <TopBarProgress navigate={navigate} step={ids.indexOf('stopbang') + 1} total={ids.length} />

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <p className="text-[11px] font-semibold uppercase tracking-kicker text-laranja">
          STOP-BANG · Apneia
        </p>
        <h1 className="mt-1.5 text-[24px] font-bold leading-tight">
          Triagem de indícios de apneia
        </h1>
        <p className="mt-2 text-[13px] text-baunilha/65">
          Responda SIM ou NÃO. Cada SIM aumenta a pontuação.
        </p>

        <div className="mt-4 flex flex-col gap-2.5">
          {ITEMS.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-3 rounded-card bg-surface p-4"
            >
              <p className="min-w-0 flex-1 text-[14px] font-medium text-text-primary/90">
                <span className="font-bold">{item.key}</span> · {item.q}
              </p>
              <div className="flex shrink-0 gap-2">
                <YesNo
                  active={answers[i] === true}
                  variant="yes"
                  onClick={() => setAnswers((a) => ({ ...a, [i]: true }))}
                />
                <YesNo
                  active={answers[i] === false}
                  variant="no"
                  onClick={() => setAnswers((a) => ({ ...a, [i]: false }))}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Parcial */}
        <section className="mt-4 rounded-card bg-surface p-5">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
            Parcial
          </p>
          <p className="mt-1 text-[28px] font-bold text-laranja">5 / 8 pontos</p>
          <p className="text-[12px] text-baunilha/60">Vários indícios de apneia</p>
        </section>
      </div>

      <footer className="px-6 pb-5 pt-3">
        <button
          type="button"
          onClick={() => navigate(next.route)}
          className="flex w-full items-center justify-center gap-2 rounded-button bg-laranja py-3.5 text-base font-semibold text-text-on-brand shadow-cta"
        >
          {next.label} <span>→</span>
        </button>
      </footer>
    </div>
  );
}

function YesNo({ active, variant, onClick }) {
  const isYes = variant === 'yes';
  const color = isYes ? 'laranja' : 'menta';
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-pill border px-4 py-1.5 text-[12px] font-bold tracking-kicker"
      style={{
        backgroundColor: active ? `hsl(var(--${color}) / 0.18)` : 'transparent',
        borderColor: active ? `hsl(var(--${color}))` : 'hsl(var(--surface-2))',
        color: active ? `hsl(var(--${color}))` : 'hsl(var(--baunilha) / 0.5)',
      }}
      aria-pressed={active}
    >
      {isYes ? 'SIM' : 'NÃO'}
    </button>
  );
}

function TopBarProgress({ navigate, step, total }) {
  const percent = (step / total) * 100;
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
          Questionário {step} de {total}
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
