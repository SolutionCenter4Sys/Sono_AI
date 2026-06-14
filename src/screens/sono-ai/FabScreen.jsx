import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Sparkles } from 'lucide-react';

export default function FabScreen() {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-full flex-col">
      {/* Top bar */}
      <header className="flex items-center justify-between px-4 pt-4 pb-2">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Voltar"
          className="grid h-10 w-10 place-items-center rounded-full bg-surface-2/60 text-text-primary/90 transition hover:bg-surface-2"
        >
          <ChevronLeft size={20} strokeWidth={2.4} />
        </button>
        <span className="text-[13px] font-semibold uppercase tracking-kicker text-baunilha/60">
          Resultado
        </span>
        <span className="h-10 w-10" />
      </header>

      <div className="px-5 pt-4 space-y-4">
        {/* Quality card */}
        <section className="rounded-card-lg bg-surface p-6 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
            Qualidade do sono
          </p>
          <p className="mt-2 text-[72px] font-bold leading-none tracking-tighter">62</p>
          <p className="mt-2 text-[13px] text-baunilha/55">de 100</p>
        </section>

        {/* Risks */}
        <section className="rounded-card bg-surface p-5 space-y-4">
          <RiskRow label="Apneia" value={58} color="laranja" />
          <RiskRow label="Insônia" value={32} color="menta" />
        </section>

        {/* Recommendation */}
        <section
          className="rounded-card border p-5"
          style={{
            backgroundColor: 'hsl(var(--risk-moderate) / 0.10)',
            borderColor: 'hsl(var(--risk-moderate) / 0.35)',
          }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-risk-moderate">
            Recomendação
          </p>
          <h3 className="mt-2 text-[20px] font-bold leading-[1.25]">
            Procure um especialista
          </h3>
        </section>
      </div>

      {/* Floating Sono AI FAB */}
      <motion.button
        type="button"
        onClick={() => navigate('/sono-ai/peek')}
        aria-label="Abrir Sono AI"
        className="absolute bottom-7 right-6 grid h-16 w-16 place-items-center rounded-full bg-menta shadow-lg"
        style={{ boxShadow: '0 0 32px hsl(var(--menta) / 0.45)' }}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Sparkles size={26} strokeWidth={2} className="text-marinho-deep" />
      </motion.button>
    </div>
  );
}

function RiskRow({ label, value, color }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-[14px]">
        <span className="font-medium text-text-primary">{label}</span>
        <span className="font-semibold text-text-primary">{value}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-pill bg-surface-2/60">
        <div
          className="h-full rounded-pill"
          style={{ width: `${value}%`, backgroundColor: `hsl(var(--${color}))` }}
        />
      </div>
    </div>
  );
}
