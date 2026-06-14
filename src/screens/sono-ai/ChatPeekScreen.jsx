import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, X, Sparkles, ArrowUp } from 'lucide-react';

const SUGGESTIONS = [
  'Por que minha SpO₂ caiu hoje?',
  'Como reduzir ronco esta semana?',
  'Quando devo procurar especialista?',
];

export default function ChatPeekScreen() {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      {/* Dimmed result backdrop */}
      <div className="flex-1 opacity-40">
        <header className="flex items-center justify-between px-4 pt-4 pb-2">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-surface-2/60 text-text-primary/90">
            <ChevronLeft size={20} strokeWidth={2.4} />
          </span>
          <span className="text-[13px] font-semibold uppercase tracking-kicker text-baunilha/60">
            Resultado
          </span>
          <span className="h-10 w-10" />
        </header>
        <div className="px-5 pt-4">
          <section className="rounded-card-lg bg-surface p-6 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
              Qualidade do sono
            </p>
            <p className="mt-2 text-[72px] font-bold leading-none tracking-tighter">62</p>
            <p className="mt-2 text-[13px] text-baunilha/55">de 100</p>
          </section>
        </div>
      </div>

      {/* Scrim */}
      <div className="absolute inset-0 bg-marinho-deep/40" />

      {/* Bottom sheet */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 bottom-0 rounded-t-[28px] bg-surface px-5 pb-6 pt-3 shadow-2xl"
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-pill bg-surface-2" />

        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-menta">
              <Sparkles size={20} className="text-marinho-deep" />
            </span>
            <div>
              <p className="text-[16px] font-bold text-text-primary">Sono AI</p>
              <p className="text-[12px] text-baunilha/55">Assistente · ativo</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Fechar"
            className="grid h-8 w-8 place-items-center rounded-full bg-surface-2/60 text-baunilha/80 transition hover:bg-surface-2"
          >
            <X size={16} strokeWidth={2.4} />
          </button>
        </div>

        <p className="mt-4 text-[15px] font-medium text-text-primary">
          Olá, João! Posso te ajudar com o que viu hoje?
        </p>

        <p className="mt-4 text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
          Tente perguntar:
        </p>
        <div className="mt-2.5 space-y-2.5">
          {SUGGESTIONS.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => navigate('/sono-ai/full')}
              className="w-full rounded-card bg-surface-2/60 px-4 py-3 text-left text-[14px] text-text-primary/90 transition hover:bg-surface-2"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="mt-4 flex items-center gap-2.5 rounded-pill bg-surface-2/60 px-4 py-2">
          <span className="flex-1 text-[14px] text-baunilha/50">Digite sua pergunta...</span>
          <button
            type="button"
            onClick={() => navigate('/sono-ai/full')}
            aria-label="Enviar"
            className="grid h-9 w-9 flex-none place-items-center rounded-full bg-laranja text-text-on-brand"
          >
            <ArrowUp size={18} strokeWidth={2.4} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
