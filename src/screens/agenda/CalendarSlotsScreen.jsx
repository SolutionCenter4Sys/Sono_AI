import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ArrowLeft, ArrowRight } from 'lucide-react';
import PrimaryButton from '@/components/primitives/PrimaryButton.jsx';

const WEEKDAYS = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];
const DAYS = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
const SLOTS = [
  { time: '18:00', disabled: false },
  { time: '19:00', disabled: false },
  { time: '20:00', disabled: false },
  { time: '21:00', disabled: false },
  { time: '22:00', disabled: true },
  { time: '23:00', disabled: false },
];

export default function CalendarSlotsScreen() {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(12);
  const [selectedSlot, setSelectedSlot] = useState('21:00');

  return (
    <div className="flex h-full flex-col">
      {/* TopBar */}
      <div className="flex items-center justify-between px-4 py-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-2/60 text-text-primary"
          aria-label="Voltar"
        >
          <ChevronLeft size={20} />
        </button>
        <span className="text-xs font-semibold uppercase tracking-kicker text-baunilha/60">
          Escolha um horário
        </span>
        <span className="h-10 w-10" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-4">
        <h1 className="text-lg font-semibold text-text-primary">AFIP — Vila Mariana</h1>
        <p className="text-sm text-baunilha/70">Polissonografia completa · 1 noite</p>

        {/* Calendar */}
        <section className="mt-4 rounded-card bg-marinho p-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-base font-semibold text-text-primary">
              <ArrowLeft size={16} className="text-baunilha/70" />
              Junho 2026
            </span>
            <ArrowRight size={16} className="text-baunilha/70" />
          </div>

          <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs text-baunilha/50">
            {WEEKDAYS.map((d, i) => (
              <span key={i}>{d}</span>
            ))}
          </div>

          <div className="mt-2 grid grid-cols-7 gap-y-3">
            {DAYS.map((d) => {
              const selected = d === selectedDay;
              const ringed = d === 10 || d === 18;
              return (
                <div key={d} className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => setSelectedDay(d)}
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                      selected
                        ? 'bg-laranja text-text-on-brand'
                        : ringed
                          ? 'border border-laranja/60 text-text-primary'
                          : 'bg-surface-2/60 text-text-primary'
                    }`}
                  >
                    {d}
                  </button>
                </div>
              );
            })}
          </div>

          <p className="mt-3 text-center text-xs text-menta">
            {selectedDay} de junho selecionado · sexta-feira
          </p>
        </section>

        {/* Time slots */}
        <section className="mt-4 rounded-card bg-marinho p-4">
          <span className="text-xs font-semibold uppercase tracking-kicker text-baunilha/50">
            Horários disponíveis · {selectedDay} jun
          </span>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {SLOTS.map((s) => {
              const selected = s.time === selectedSlot && !s.disabled;
              return (
                <button
                  key={s.time}
                  type="button"
                  disabled={s.disabled}
                  onClick={() => setSelectedSlot(s.time)}
                  className={`rounded-button px-3 py-3.5 text-sm font-semibold transition-colors ${
                    s.disabled
                      ? 'cursor-not-allowed bg-surface-2/40 text-baunilha/40 line-through'
                      : selected
                        ? 'border border-laranja/60 bg-laranja/15 text-text-primary'
                        : 'bg-surface-2 text-text-primary'
                  }`}
                >
                  {s.time}
                </button>
              );
            })}
          </div>
        </section>

        {/* Summary */}
        <section className="mt-4 rounded-card bg-surface p-4">
          <span className="text-xs font-semibold uppercase tracking-kicker text-baunilha/50">
            Resumo da reserva
          </span>
          <div className="mt-3 space-y-2.5">
            <SummaryRow label="Clínica" value="AFIP V.M" />
            <SummaryRow label="Data" value={`Sex, ${selectedDay} Jun`} />
            <SummaryRow label="Horário" value={selectedSlot} />
            <SummaryRow label="Exame" value="PSG completa" />
          </div>
        </section>
      </div>

      <footer className="px-5 pb-4 pt-3">
        <PrimaryButton trailingIcon="→" onClick={() => navigate('/agenda/confirmacao')}>
          Confirmar agendamento
        </PrimaryButton>
      </footer>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-baunilha/70">{label}</span>
      <span className="text-sm font-semibold text-text-primary">{value}</span>
    </div>
  );
}
