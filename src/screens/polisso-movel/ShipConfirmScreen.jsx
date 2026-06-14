import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Check } from 'lucide-react';
import PrimaryButton from '@/components/primitives/PrimaryButton.jsx';
import TextLink from '@/components/primitives/TextLink.jsx';

/**
 * 05.2 Confirmação do envio — endereço + janela de entrega + kit.
 * Figma 48:46.
 */
const WINDOWS = [
  { id: 'manha', label: 'Manhã', range: '8h–12h' },
  { id: 'tarde', label: 'Tarde', range: '12h–18h' },
  { id: 'noite', label: 'Noite', range: '18h–22h' },
];

const KIT = [
  'Sensor cardio peito (1)',
  'Oxímetro de dedo (1)',
  'Cinta abdominal (1)',
  'Cabo dados USB-C (1)',
];

export default function ShipConfirmScreen() {
  const navigate = useNavigate();
  const [window, setWindow] = useState('tarde');

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
          Envio do kit
        </span>
        <span className="h-10 w-10" aria-hidden />
      </header>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <p className="text-[11px] font-semibold uppercase tracking-kicker text-menta">
          Etapa 1 de 5
        </p>
        <h1 className="mt-1.5 text-[26px] font-bold leading-tight">Confirme seu endereço</h1>
        <p className="mt-2 text-[14px] leading-[1.5] text-baunilha/65">
          Vamos enviar o kit completo para o endereço abaixo.
        </p>

        {/* Endereço */}
        <section className="mt-5 rounded-card bg-surface p-5">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
            Endereço de entrega
          </p>
          <p className="mt-2 text-[18px] font-bold">Rua das Magnólias, 442</p>
          <p className="mt-1 text-[13px] text-baunilha/65">
            Apto 122 · Vila Madalena · São Paulo · 05435-040
          </p>
          <div className="mt-3 flex justify-end">
            <TextLink onClick={() => {}}>Editar</TextLink>
          </div>
        </section>

        {/* Janela de entrega */}
        <section className="mt-4 rounded-card bg-surface p-4">
          <p className="px-1 pt-1 text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
            Janela de entrega
          </p>
          <div className="mt-3 flex flex-col gap-2.5">
            {WINDOWS.map((opt) => {
              const selected = window === opt.id;
              return (
                <motion.button
                  key={opt.id}
                  type="button"
                  onClick={() => setWindow(opt.id)}
                  whileTap={{ scale: 0.99 }}
                  className="flex w-full items-center justify-between rounded-[14px] border px-4 py-3.5 text-left"
                  style={{
                    backgroundColor: selected ? 'hsl(var(--laranja) / 0.14)' : 'hsl(var(--surface-2) / 0.45)',
                    borderColor: selected ? 'hsl(var(--laranja))' : 'transparent',
                    borderWidth: selected ? 1.5 : 1,
                  }}
                  aria-pressed={selected}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className="grid h-6 w-6 place-items-center rounded-full"
                      style={{
                        backgroundColor: selected ? 'hsl(var(--laranja))' : 'transparent',
                        border: selected ? 'none' : '1.5px solid hsl(var(--baunilha) / 0.4)',
                      }}
                    >
                      {selected ? <Check size={14} className="text-text-on-brand" strokeWidth={3} /> : null}
                    </span>
                    <span className="text-[15px] font-semibold text-text-primary/95">{opt.label}</span>
                  </span>
                  <span className="text-[13px] text-baunilha/60">{opt.range}</span>
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* Resumo do kit */}
        <section className="mt-4 rounded-card bg-surface p-5">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
            Resumo do kit
          </p>
          <ul className="mt-3 flex flex-col gap-2.5">
            {KIT.map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <Check size={15} className="text-menta" strokeWidth={3} />
                <span className="text-[14px] text-text-primary/90">{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <footer className="flex flex-col items-center gap-3 px-6 pb-5 pt-3">
        <PrimaryButton leadingIcon="↗" onClick={() => navigate('/polisso-movel/tracking')}>
          Confirmar envio
        </PrimaryButton>
        <TextLink onClick={() => navigate(-1)}>Cancelar</TextLink>
      </footer>
    </div>
  );
}
