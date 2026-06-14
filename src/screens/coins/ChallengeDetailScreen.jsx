import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Moon } from 'lucide-react';
import TextLink from '@/components/primitives/TextLink.jsx';

/**
 * 08.2 Challenge detail — "Sem cafeína após 14h".
 * Figma 44:2.
 */
const WEEK = [
  { label: 'Seg', state: 'done' },
  { label: 'Ter', state: 'done' },
  { label: 'Qua', state: 'done' },
  { label: 'Qui', state: 'today' },
  { label: 'Sex', state: 'empty' },
  { label: 'Sáb', state: 'empty' },
  { label: 'Dom', state: 'empty' },
];

const REASONS = [
  'Cafeína bloqueia adenosina, atrasando o início do sono',
  'Meia-vida da cafeína é ~5h — uma xícara às 14h ainda age na hora de dormir',
  'FC noturna cai mais cedo sem cafeína na corrente',
  'Sono REM tende a ser mais consistente',
];

export default function ChallengeDetailScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center justify-between px-4 pt-4 pb-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Voltar"
          className="grid h-10 w-10 place-items-center rounded-full bg-surface-2/60 text-text-primary/90 transition hover:bg-surface-2"
        >
          <ChevronLeft size={20} strokeWidth={2.4} />
        </button>
        <span className="text-[12px] font-semibold uppercase tracking-kicker text-baunilha/70">
          Desafio ativo
        </span>
        <span className="h-10 w-10" aria-hidden />
      </header>

      <div className="flex-1 overflow-y-auto px-5 pb-6">
        {/* Header card */}
        <section className="flex items-center gap-3.5 rounded-card bg-surface p-4">
          <span
            className="grid h-12 w-12 shrink-0 place-items-center rounded-xl"
            style={{ backgroundColor: 'hsl(var(--sun-moon) / 0.18)' }}
          >
            <Moon size={22} className="text-sun-moon" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[16px] font-bold leading-snug">Sem cafeína após 14h</p>
            <p className="mt-0.5 text-[13px] text-baunilha/60">Hábito que reduz FC noturna</p>
          </div>
          <span className="shrink-0 rounded-pill bg-surface-2/80 px-3 py-1.5 text-[12px] font-semibold text-baunilha/85">
            +200 pts
          </span>
        </section>

        {/* Por que esse desafio */}
        <section className="mt-4 rounded-card border border-surface-2/40 bg-surface p-5">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-laranja">
            Por que esse desafio
          </p>
          <ul className="mt-3 flex flex-col gap-3">
            {REASONS.map((reason) => (
              <li key={reason} className="flex gap-2.5">
                <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-menta" />
                <span className="text-[13px] leading-[1.45] text-text-primary/90">{reason}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Progresso */}
        <section className="mt-4 rounded-card bg-surface p-5">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-menta">
            Seu progresso
          </p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-[16px] font-bold">3 de 7 dias</span>
            <span className="text-[16px] font-bold text-menta">42%</span>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-pill bg-surface-2">
            <div className="h-full rounded-pill bg-menta" style={{ width: '42%' }} />
          </div>

          <div className="mt-5 flex items-start justify-between">
            {WEEK.map((day) => (
              <div key={day.label} className="flex flex-col items-center gap-1.5">
                {day.state === 'done' ? (
                  <span className="h-9 w-9 rounded-full bg-menta" />
                ) : day.state === 'today' ? (
                  <span className="h-9 w-9 rounded-full bg-laranja" />
                ) : (
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-surface-2">
                    <span className="h-2 w-2 rounded-full bg-surface-2" />
                  </span>
                )}
                <span className="text-[11px] text-baunilha/55">{day.label}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer className="flex flex-col items-center gap-3 px-5 pb-5 pt-3">
        <button
          type="button"
          onClick={() => navigate('/score')}
          className="w-full rounded-button py-3.5 text-base font-semibold text-marinho-deep"
          style={{ backgroundColor: 'hsl(var(--menta))' }}
        >
          Marcar hoje como completo
        </button>
        <TextLink onClick={() => navigate('/score')}>Pausar este desafio</TextLink>
      </footer>
    </div>
  );
}
