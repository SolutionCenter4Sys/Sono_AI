import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import PrimaryButton from '@/components/primitives/PrimaryButton.jsx';
import TextLink from '@/components/primitives/TextLink.jsx';
import { useSleepState } from '@/state/SleepStateContext.jsx';
import { SLEEP_COMPLAINTS } from '@/data/mockRepository.js';
import { cn } from '@/lib/utils.js';

export default function QuestionnaireScreen() {
  const navigate = useNavigate();
  const { submitQuestionnaire } = useSleepState();
  const [complaint, setComplaint] = useState(null);

  // Para o protótipo é uma pergunta. O backlog prevê até 9.
  const currentIndex = 0;
  const totalQuestions = 9;
  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;

  const handleContinue = () => {
    if (!complaint) return;
    submitQuestionnaire({ complaint, history: [] });
    navigate('/app/result');
  };

  const handleSkip = () => {
    submitQuestionnaire(null);
    navigate('/app/result');
  };

  const reset = () => navigate('/app/home');

  return (
    <div className="flex h-full flex-col">
      {/* Top bar */}
      <header className="flex items-center justify-between px-4 pt-4 pb-2">
        <button
          type="button"
          onClick={reset}
          aria-label="Voltar"
          className="grid h-10 w-10 place-items-center rounded-full bg-surface-2/60 text-text-primary/90 transition hover:bg-surface-2"
        >
          <ChevronLeft size={20} strokeWidth={2.4} />
        </button>
        <span className="text-[12px] font-semibold uppercase tracking-kicker text-baunilha/60">
          Pergunta {currentIndex + 1} de {totalQuestions}
        </span>
        <span className="h-10 w-10" aria-hidden />
      </header>

      {/* Progress bar */}
      <div className="px-6 pt-2 pb-6">
        <div className="h-1.5 w-full overflow-hidden rounded-pill bg-surface-2">
          <div
            className="h-full rounded-pill bg-laranja transition-[width] duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <section className="px-6">
        <p className="text-[11px] font-semibold uppercase tracking-kicker text-menta/85">
          Queixa principal
        </p>
        <h1 className="mt-3 text-[24px] font-bold leading-[1.25] tracking-tight">
          O que mais te incomoda no seu sono hoje?
        </h1>
        <p className="mt-3 text-[13px] leading-[1.45] text-baunilha/55">
          Escolha a alternativa que mais se aproxima.
        </p>
      </section>

      {/* Options */}
      <ul className="flex flex-col gap-2.5 px-6 pt-5">
        {SLEEP_COMPLAINTS.map((opt) => (
          <li key={opt.value}>
            <OptionCard
              option={opt}
              selected={complaint === opt.value}
              onSelect={() => setComplaint(opt.value)}
            />
          </li>
        ))}
      </ul>

      <div className="flex-1" />

      {/* Footer */}
      <div className="flex flex-col items-center gap-3 px-6 pt-3 pb-6">
        <PrimaryButton
          trailingIcon="→"
          disabled={!complaint}
          onClick={handleContinue}
        >
          Continuar
        </PrimaryButton>
        <TextLink onClick={handleSkip}>Pular questionário</TextLink>
      </div>
    </div>
  );
}

function OptionCard({ option, selected, onSelect }) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      className={cn(
        'w-full rounded-[14px] border p-4 text-left',
        'flex items-center gap-3.5',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-laranja'
      )}
      animate={{
        backgroundColor: selected
          ? 'hsl(16 100% 54% / 0.14)'
          : 'hsl(var(--surface))',
        borderColor: selected
          ? 'hsl(16 100% 54%)'
          : 'hsl(var(--surface-2) / 0.6)',
      }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      style={{ borderWidth: selected ? 1.5 : 1 }}
      whileTap={{ scale: 0.985 }}
      aria-pressed={selected}
    >
      <span
        className="grid h-[22px] w-[22px] place-items-center rounded-full overflow-hidden"
        style={{
          backgroundColor: selected ? 'hsl(var(--laranja))' : 'transparent',
          border: selected ? 'none' : '1.5px solid hsl(var(--baunilha) / 0.4)',
          transition: 'background-color 180ms ease-out',
        }}
        aria-hidden
      >
        <AnimatePresence>
          {selected ? (
            <motion.span
              key="check"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 18 }}
              className="text-[12px] font-bold text-text-on-brand leading-none"
            >
              ✓
            </motion.span>
          ) : null}
        </AnimatePresence>
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-[15px] font-semibold text-text-primary/95">
          {option.label}
        </span>
        <span className="block text-[12px] leading-[1.45] text-baunilha/55">
          {option.hint}
        </span>
      </span>
    </motion.button>
  );
}
