import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Watch, Loader2 } from 'lucide-react';
import TextLink from '@/components/primitives/TextLink.jsx';

const STEPS = [
  'Descobrindo serviços do dispositivo',
  'Negociando handshake seguro',
  'Solicitando permissões de leitura',
];

export default function ConnectingScreen() {
  const navigate = useNavigate();
  const [active, setActive] = useState(1);

  useEffect(() => {
    const t1 = setTimeout(() => setActive(2), 1200);
    const t2 = setTimeout(() => setActive(3), 2400);
    const t3 = setTimeout(() => navigate('/pairing/success'), 3400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [navigate]);

  return (
    <div className="flex h-full flex-col">
      <header className="px-6 pt-5 text-center">
        <span className="text-[13px] font-semibold uppercase tracking-kicker text-baunilha/70">
          Galaxy Watch 6
        </span>
      </header>

      <div className="flex flex-1 flex-col items-center px-6 pt-8">
        {/* Spinning ring around watch */}
        <div className="relative grid h-[210px] w-[210px] place-items-center">
          <span className="absolute h-full w-full rounded-full border-[6px] border-surface-2/50" />
          <motion.span
            className="absolute h-full w-full rounded-full border-[6px] border-transparent"
            style={{ borderTopColor: 'hsl(var(--laranja))', borderRightColor: 'hsl(var(--laranja))' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          />
          <span
            className="grid h-[120px] w-[120px] place-items-center rounded-[28px]"
            style={{
              background:
                'radial-gradient(circle, hsl(var(--laranja) / 0.18) 0%, transparent 70%)',
            }}
          >
            <Watch size={56} strokeWidth={1.4} className="text-baunilha/85" />
          </span>
        </div>

        <h1 className="mt-7 text-[24px] font-bold leading-tight tracking-tight">
          Conectando ao seu watch
        </h1>
        <p className="mt-2 text-center text-[14px] text-baunilha/65">
          Confirme o pop-up no seu relógio se aparecer.
        </p>

        {/* Checklist */}
        <ul className="mt-6 w-full space-y-3.5 rounded-card-lg bg-surface p-5">
          {STEPS.map((label, i) => {
            const idx = i + 1;
            const done = idx < active;
            const running = idx === active;
            return (
              <li key={label} className="flex items-center gap-3">
                <span className="grid h-5 w-5 flex-none place-items-center rounded-full">
                  {done ? (
                    <span
                      className="grid h-5 w-5 place-items-center rounded-full"
                      style={{ backgroundColor: 'hsl(var(--risk-low) / 0.22)' }}
                    >
                      <Check size={12} strokeWidth={3} className="text-risk-low" />
                    </span>
                  ) : running ? (
                    <Loader2 size={16} className="animate-spin text-laranja" />
                  ) : (
                    <span className="h-3.5 w-3.5 rounded-full border border-baunilha/30" />
                  )}
                </span>
                <span
                  className={`text-[14px] ${
                    idx <= active ? 'font-semibold text-text-primary' : 'text-baunilha/55'
                  }`}
                >
                  {label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex justify-center px-6 pb-6 pt-3">
        <TextLink onClick={() => navigate(-1)}>Cancelar</TextLink>
      </div>
    </div>
  );
}
