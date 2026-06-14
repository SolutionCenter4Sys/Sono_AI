import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Watch } from 'lucide-react';
import TextLink from '@/components/primitives/TextLink.jsx';

export default function SearchingScreen() {
  const navigate = useNavigate();

  // Avança automaticamente após "encontrar" dispositivos (demo).
  useEffect(() => {
    const t = setTimeout(() => navigate('/pairing/devices'), 2600);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center gap-3 px-6 pt-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Voltar"
          className="grid h-10 w-10 place-items-center rounded-full bg-surface-2/60 text-text-primary/90 transition hover:bg-surface-2"
        >
          <ChevronLeft size={20} strokeWidth={2.4} />
        </button>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        <p className="text-[12px] font-semibold uppercase tracking-kicker text-menta">
          Procurando bluetooth
        </p>
        <h1 className="mt-2 text-[26px] font-bold leading-[1.15] tracking-tight">
          Procurando seu Galaxy Watch
        </h1>

        {/* Radar */}
        <div className="relative my-12 grid h-[230px] w-[230px] place-items-center">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="absolute rounded-full border border-laranja/30"
              style={{ width: 230, height: 230 }}
              initial={{ scale: 0.4, opacity: 0.7 }}
              animate={{ scale: 1, opacity: 0 }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                delay: i * 0.7,
                ease: 'easeOut',
              }}
            />
          ))}
          <span className="absolute h-[150px] w-[150px] rounded-full border border-surface-2/50" />
          <span className="absolute h-[230px] w-[230px] rounded-full border border-surface-2/40" />
          <motion.span
            className="relative grid h-16 w-16 place-items-center rounded-full bg-laranja shadow-cta"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Watch size={28} strokeWidth={2} className="text-text-on-brand" />
          </motion.span>
        </div>

        <p className="text-[14px] text-baunilha/65">3 dispositivos encontrados</p>
        <p className="mt-1 text-[13px] text-baunilha/45">
          Mantenha seu wearable a menos de 5m
        </p>
      </div>

      <div className="flex justify-center px-6 pb-6 pt-3">
        <TextLink onClick={() => navigate(-1)}>Cancelar busca</TextLink>
      </div>
    </div>
  );
}
