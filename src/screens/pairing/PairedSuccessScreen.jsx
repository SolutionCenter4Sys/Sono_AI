import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Watch, Sparkles } from 'lucide-react';
import PrimaryButton from '@/components/primitives/PrimaryButton.jsx';
import TextLink from '@/components/primitives/TextLink.jsx';

export default function PairedSuccessScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto px-6 pt-12">
        {/* Success badge */}
        <div className="flex justify-center">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid h-[150px] w-[150px] place-items-center rounded-full"
            style={{
              border: '4px solid hsl(var(--risk-low) / 0.45)',
              background:
                'radial-gradient(circle, hsl(var(--risk-low) / 0.22) 0%, hsl(var(--risk-low) / 0.05) 70%, transparent 100%)',
            }}
          >
            <Check size={72} strokeWidth={2.5} className="text-risk-low" />
          </motion.div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-[12px] font-semibold uppercase tracking-kicker text-risk-low">
            Conectado
          </p>
          <h1 className="mt-1.5 text-[30px] font-bold leading-[1.12] tracking-tight">
            Pronto pra rodar
          </h1>
          <p className="mx-auto mt-3 max-w-[320px] text-[15px] leading-[1.45] text-baunilha/70">
            Seu wearable está vinculado ao Instituto do Sono.
          </p>
        </div>

        {/* Device card */}
        <div className="mt-7 rounded-card-lg bg-surface p-5">
          <div className="flex items-center gap-3.5">
            <span className="grid h-11 w-11 flex-none place-items-center rounded-card bg-surface-2/70 text-baunilha">
              <Watch size={22} strokeWidth={1.8} />
            </span>
            <div>
              <p className="text-[15px] font-bold text-text-primary">Galaxy Watch 6</p>
              <p className="text-[12px] text-baunilha/60">Watch6 Classic 47mm · 87% bateria</p>
            </div>
          </div>
          <hr className="my-4 border-surface-2/60" />
          <div className="flex items-center justify-between text-[13px]">
            <span className="text-baunilha/60">Última sincronização</span>
            <span className="font-semibold text-menta">Agora · 6h 12min disponível</span>
          </div>
        </div>

        {/* Hint */}
        <div
          className="mt-3.5 flex items-center gap-2.5 rounded-card border px-4 py-3.5"
          style={{
            backgroundColor: 'hsl(var(--laranja) / 0.08)',
            borderColor: 'hsl(var(--laranja) / 0.30)',
          }}
        >
          <Sparkles size={16} className="flex-none text-laranja" />
          <span className="text-[13px] font-medium text-text-primary/90">
            Sua última noite já está disponível
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 px-6 pb-6 pt-3">
        <PrimaryButton trailingIcon="→" onClick={() => navigate('/app/loading')}>
          Analisar minha noite
        </PrimaryButton>
        <TextLink onClick={() => navigate('/inicio')}>Ir para o início</TextLink>
      </div>
    </div>
  );
}
