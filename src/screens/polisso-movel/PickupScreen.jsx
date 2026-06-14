import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Check } from 'lucide-react';
import PrimaryButton from '@/components/primitives/PrimaryButton.jsx';
import TextLink from '@/components/primitives/TextLink.jsx';

/**
 * Modalidade B — Retirar os equipamentos no hospital.
 * Paciente escolhe unidade + horário de retirada; a orientação é presencial
 * no momento da retirada e o exame é feito em casa.
 */
const UNITS = [
  { id: 'vm', name: 'Instituto do Sono · Vila Mariana', dist: '0,8 km', hint: 'Rua Borges Lagoa, 564' },
  { id: 'tt', name: 'Instituto do Sono · Tatuapé', dist: '4,2 km', hint: 'Rua Tuiuti, 1820' },
];

const SLOTS = [
  { id: 's1', label: 'Hoje', time: '16h – 18h' },
  { id: 's2', label: 'Amanhã', time: '08h – 10h' },
  { id: 's3', label: 'Amanhã', time: '14h – 16h' },
];

const KIT = ['Sensor cardíaco de peito', 'Oxímetro de dedo', 'Cinta abdominal', 'Cabo de dados USB-C'];

export default function PickupScreen() {
  const navigate = useNavigate();
  const [unit, setUnit] = useState('vm');
  const [slot, setSlot] = useState('s1');

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
          Retirar no hospital
        </span>
        <span className="h-10 w-10" aria-hidden />
      </header>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="pt-1 pb-1">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-sun-moon">
            Etapa 1 de 2
          </p>
          <h1 className="mt-2 text-[22px] font-bold leading-tight">Onde quer retirar?</h1>
          <p className="mt-1.5 text-[13px] leading-[1.5] text-baunilha/65">
            Você recebe a orientação presencial na retirada e leva o kit para dormir em casa.
          </p>
        </div>

        {/* Unidades */}
        <section className="mt-4 flex flex-col gap-2.5">
          {UNITS.map((u) => {
            const active = unit === u.id;
            return (
              <button
                key={u.id}
                type="button"
                onClick={() => setUnit(u.id)}
                className="w-full rounded-card p-4 text-left transition border"
                style={{
                  backgroundColor: active ? 'hsl(var(--sun-moon) / 0.12)' : 'hsl(var(--surface))',
                  borderColor: active ? 'hsl(var(--sun-moon))' : 'hsl(var(--surface-2) / 0.6)',
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-semibold text-text-primary/95">{u.name}</span>
                  <span className="text-[11px] font-semibold text-sun-moon">{u.dist}</span>
                </div>
                <span className="text-[12px] text-baunilha/55">{u.hint}</span>
              </button>
            );
          })}
        </section>

        {/* Horários */}
        <h2 className="mt-6 mb-2.5 text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
          Horário de retirada
        </h2>
        <div className="grid grid-cols-3 gap-2.5">
          {SLOTS.map((s) => {
            const active = slot === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setSlot(s.id)}
                className="rounded-card px-2 py-3 text-center transition border"
                style={{
                  backgroundColor: active ? 'hsl(var(--sun-moon) / 0.14)' : 'hsl(var(--surface))',
                  borderColor: active ? 'hsl(var(--sun-moon))' : 'hsl(var(--surface-2) / 0.6)',
                }}
              >
                <span className="block text-[13px] font-semibold text-text-primary/95">{s.label}</span>
                <span className="block text-[11px] text-baunilha/55">{s.time}</span>
              </button>
            );
          })}
        </div>

        {/* Kit */}
        <section className="mt-6 rounded-card bg-marinho p-4">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-sun-moon">
            O que você vai retirar
          </p>
          <ul className="mt-3 flex flex-col gap-2">
            {KIT.map((k) => (
              <li key={k} className="flex items-center gap-2.5 text-[13px] text-text-primary/85">
                <span
                  className="grid h-5 w-5 place-items-center rounded-full"
                  style={{ backgroundColor: 'hsl(var(--risk-low) / 0.18)', color: 'hsl(var(--risk-low))' }}
                >
                  <Check size={12} strokeWidth={3} />
                </span>
                {k}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <footer className="flex flex-col items-center gap-3 px-6 pb-5 pt-3">
        <PrimaryButton trailingIcon="→" onClick={() => navigate('/polisso-movel/stream')}>
          Confirmar retirada
        </PrimaryButton>
        <TextLink onClick={() => navigate('/polisso-movel/modalidade')}>Trocar de modalidade</TextLink>
      </footer>
    </div>
  );
}
