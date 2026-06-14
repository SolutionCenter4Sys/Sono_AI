import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';
import ProgressRing from '@/components/primitives/ProgressRing.jsx';
import TextLink from '@/components/primitives/TextLink.jsx';
import { useSleepState } from '@/state/SleepStateContext.jsx';

const SOURCES = [
  { key: 'session', label: 'Sessão de sono', hint: 'Duração, fases e horários' },
  {
    key: 'heart-rate',
    label: 'Frequência cardíaca',
    hint: 'Mín / méd / máx noturna',
  },
  {
    key: 'spo2',
    label: 'Saturação de O₂ (SpO₂)',
    hint: 'Eventos de dessaturação < 90%',
  },
];

function stateFor(currentStep, percent, sourceKey) {
  const order = ['session', 'heart-rate', 'spo2'];
  const currentIdx = order.indexOf(currentStep);
  const sourceIdx = order.indexOf(sourceKey);
  if (sourceIdx < currentIdx) return 'done';
  if (sourceIdx === currentIdx) return percent >= 100 ? 'done' : 'loading';
  return 'pending';
}

export default function LoadingScreen() {
  const navigate = useNavigate();
  const { loadingProgress, runLoading, abortLoading } = useSleepState();
  const { step, percent } = loadingProgress;

  useEffect(() => {
    runLoading((session) => {
      navigate(session ? '/app/questionnaire' : '/app/error/sessionNotFound');
    });
    return () => abortLoading();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cancelLoading = () => {
    abortLoading();
    navigate('/app/home');
  };

  const currentLabel =
    step === 'session'
      ? 'Lendo sua última noite'
      : step === 'heart-rate'
        ? 'Lendo sua frequência cardíaca'
        : 'Lendo sua saturação de O₂';

  return (
    <div className="flex h-full flex-col">
      {/* Compact header */}
      <header className="flex items-center gap-2 px-6 pt-4 pb-2">
        <span className="block h-2 w-2 rounded-full bg-laranja" />
        <span className="text-sm font-bold tracking-tight text-text-primary/90">
          Instituto do Sono
        </span>
      </header>

      {/* Ring + step */}
      <section className="flex flex-col items-center px-8 pt-10 pb-2">
        <ProgressRing percent={percent} size={180} strokeWidth={8}>
          <div className="flex items-baseline gap-0.5">
            <span className="text-5xl font-bold tracking-tight">
              {Math.round(percent)}
            </span>
            <span className="text-base font-semibold text-baunilha/70">%</span>
          </div>
        </ProgressRing>

        <div className="mt-6 flex flex-col items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
            Etapa{' '}
            {step === 'session' ? '1' : step === 'heart-rate' ? '2' : '3'} de 3
          </span>
          <h1 className="text-[22px] font-semibold tracking-tight text-center">
            {currentLabel}
          </h1>
          <p className="text-center text-[13px] leading-[1.5] text-baunilha/55">
            Buscando dados do Galaxy Watch via Health Connect
          </p>
        </div>
      </section>

      {/* Data sources card */}
      <div className="px-6 pt-6">
        <div className="rounded-card bg-surface p-5">
          <h2 className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/50 mb-4">
            Dados que estamos lendo
          </h2>
          <ul className="flex flex-col">
            {SOURCES.map((s, i) => {
              const st = stateFor(step, percent, s.key);
              return (
                <li key={s.key}>
                  <DataRow source={s} state={st} />
                  {i < SOURCES.length - 1 ? (
                    <hr className="my-3 border-surface-2/60" />
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="flex-1" />

      <div className="flex items-center justify-center pb-6">
        <TextLink onClick={cancelLoading}>Cancelar</TextLink>
      </div>
    </div>
  );
}

function DataRow({ source, state }) {
  const tokens = {
    done: {
      bg: 'risk-low',
      text: 'risk-low',
      icon: <Check size={14} strokeWidth={3} />,
      trail: 'OK',
    },
    loading: {
      bg: 'laranja',
      text: 'laranja',
      icon: <Loader2 size={14} className="animate-spin" strokeWidth={3} />,
      trail: '...',
    },
    pending: {
      bg: 'surface-2',
      text: 'baunilha',
      icon: '○',
      trail: 'AGUARDE',
    },
  };
  const t = tokens[state];

  return (
    <div className="flex items-center gap-3.5">
      <motion.span
        className="grid h-7 w-7 place-items-center rounded-full overflow-hidden"
        animate={{
          backgroundColor:
            state === 'pending'
              ? 'hsl(240 19% 26%)'
              : state === 'loading'
                ? 'hsl(16 100% 54% / 0.18)'
                : 'hsl(148 58% 44% / 0.18)',
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        aria-hidden
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={state}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 22 }}
            style={{
              color:
                state === 'done'
                  ? 'hsl(var(--risk-low))'
                  : state === 'loading'
                    ? 'hsl(var(--laranja))'
                    : 'hsl(var(--baunilha) / 0.4)',
              display: 'inline-flex',
            }}
          >
            {typeof t.icon === 'string' ? (
              <span className="text-sm">{t.icon}</span>
            ) : (
              t.icon
            )}
          </motion.span>
        </AnimatePresence>
      </motion.span>
      <div className="flex-1 min-w-0">
        <motion.p
          className="text-sm font-semibold"
          animate={{
            color: `hsl(var(--text-primary) / ${state === 'pending' ? 0.5 : 0.95})`,
          }}
          transition={{ duration: 0.2 }}
        >
          {source.label}
        </motion.p>
        <p className="text-xs text-baunilha/50">{source.hint}</p>
      </div>
      <AnimatePresence mode="wait">
        <motion.span
          key={state}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18 }}
          className="text-[11px] font-semibold tracking-kicker"
          style={{
            color:
              state === 'done'
                ? 'hsl(var(--risk-low))'
                : state === 'loading'
                  ? 'hsl(var(--laranja))'
                  : 'hsl(var(--baunilha) / 0.4)',
          }}
        >
          {t.trail}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
