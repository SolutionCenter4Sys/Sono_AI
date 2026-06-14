import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, Star } from 'lucide-react';
import PrimaryButton from '@/components/primitives/PrimaryButton.jsx';
import TextLink from '@/components/primitives/TextLink.jsx';

/**
 * 05.5 Agendamento de orientação técnica — escolha de horário.
 * Figma 48:217.
 */
const SLOTS = [
  { id: '20:00', day: 'Hoje', status: 'disponivel' },
  { id: '20:30', day: 'Hoje', status: 'disponivel' },
  { id: '21:00', day: 'Hoje', status: 'disponivel' },
  { id: '21:30', day: 'Hoje', status: 'ocupado' },
];

export default function ScheduleOrientationScreen() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('20:30');

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
          Orientação técnica
        </span>
        <span className="h-10 w-10" aria-hidden />
      </header>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <p className="text-[11px] font-semibold uppercase tracking-kicker text-menta">
          Técnico AFIP disponível hoje
        </p>
        <h1 className="mt-1.5 text-[26px] font-bold leading-tight">Escolha um horário</h1>
        <p className="mt-2 text-[14px] leading-[1.5] text-baunilha/65">
          Videochamada de 15 minutos com técnico para te ensinar a usar o kit. Hoje à noite,
          antes do seu sono normal.
        </p>

        {/* Slots */}
        <div className="mt-5 flex flex-col gap-2.5">
          {SLOTS.map((slot) => {
            const busy = slot.status === 'ocupado';
            const isSelected = selected === slot.id;
            return (
              <motion.button
                key={slot.id}
                type="button"
                disabled={busy}
                onClick={() => setSelected(slot.id)}
                whileTap={busy ? undefined : { scale: 0.99 }}
                className="flex w-full items-center gap-3 rounded-[14px] border p-4 text-left disabled:cursor-not-allowed"
                style={{
                  backgroundColor: isSelected ? 'hsl(var(--laranja) / 0.14)' : 'hsl(var(--surface))',
                  borderColor: isSelected ? 'hsl(var(--laranja))' : 'transparent',
                  borderWidth: isSelected ? 1.5 : 1,
                  opacity: busy ? 0.7 : 1,
                }}
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-surface-2/80">
                  <Clock size={16} className="text-baunilha/70" />
                </span>
                <span className="flex-1">
                  <span className="block text-[18px] font-bold leading-none">{slot.id}</span>
                  <span className="mt-1 block text-[12px] text-baunilha/55">{slot.day}</span>
                </span>
                <span
                  className="rounded-pill px-2.5 py-1 text-[10px] font-bold tracking-kicker"
                  style={{
                    backgroundColor: busy ? 'hsl(var(--risk-high) / 0.16)' : 'hsl(var(--menta) / 0.16)',
                    color: busy ? 'hsl(var(--risk-high))' : 'hsl(var(--menta))',
                  }}
                >
                  {busy ? 'OCUPADO' : 'DISPONÍVEL'}
                </span>
                <ChevronRight size={18} className="shrink-0 text-baunilha/40" />
              </motion.button>
            );
          })}
        </div>

        {/* Técnico responsável */}
        <section className="mt-4 rounded-card bg-surface p-5">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
            Técnico responsável
          </p>
          <div className="mt-3 flex items-center gap-3">
            <span
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-[13px] font-bold text-marinho-deep"
              style={{ backgroundColor: 'hsl(var(--menta))' }}
            >
              MC
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-bold">Marcos Carvalho</p>
              <p className="text-[12px] text-baunilha/60">Técnico polissonografia · 8 anos</p>
            </div>
            <span className="flex shrink-0 items-center gap-1 rounded-pill bg-surface-2/80 px-2.5 py-1.5 text-[12px] font-semibold text-baunilha/85">
              <Star size={12} className="text-sun-moon" fill="hsl(var(--sun-moon))" />
              4.8
            </span>
          </div>
        </section>
      </div>

      <footer className="flex flex-col items-center gap-3 px-6 pb-5 pt-3">
        <PrimaryButton
          leadingIcon="→"
          onClick={() => navigate('/polisso-movel/videochamada')}
        >
          Confirmar {selected}
        </PrimaryButton>
        <TextLink onClick={() => navigate(-1)}>Agendar em outro dia</TextLink>
      </footer>
    </div>
  );
}
