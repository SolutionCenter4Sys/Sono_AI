import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Video, Check } from 'lucide-react';
import PrimaryButton from '@/components/primitives/PrimaryButton.jsx';
import TextLink from '@/components/primitives/TextLink.jsx';

/**
 * Agendamento da teleconsulta (atendimento online por vídeo).
 * Ao confirmar, o paciente segue para a consulta agendada — a modalidade do
 * exame (em casa ou presencial) é decidida depois, não aqui.
 */
const SLOTS = [
  { id: 't1', label: 'Hoje', time: '19h00' },
  { id: 't2', label: 'Hoje', time: '20h30' },
  { id: 't3', label: 'Amanhã', time: '08h00' },
  { id: 't4', label: 'Amanhã', time: '12h00' },
];

const STEPS = [
  'Consulta por vídeo de 20 minutos com médico do sono',
  'Se um exame for indicado, você escolhe onde fazer — em casa ou presencial',
  'Faça o exame e receba o laudo assinado por um médico do sono',
];

export default function TeleconsultScreen() {
  const navigate = useNavigate();
  const [slot, setSlot] = useState('t2');

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
          Teleconsulta
        </span>
        <span className="h-10 w-10" aria-hidden />
      </header>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="pt-1 pb-1">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-laranja">
            Atendimento por vídeo
          </p>
          <h1 className="mt-2 text-[22px] font-bold leading-tight">Agende sua teleconsulta</h1>
          <p className="mt-1.5 text-[13px] leading-[1.5] text-baunilha/65">
            Atendimento de onde você estiver, sem deslocamento.
          </p>
        </div>

        {/* Médico */}
        <section className="mt-4 rounded-card bg-surface p-4 flex items-center gap-3.5">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-menta text-text-on-brand font-bold">
            MR
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-semibold text-text-primary/95">Dr. Marcos Rocha</p>
            <p className="text-[11px] text-baunilha/55">Pneumologista do sono · CRM 117892-SP</p>
          </div>
          <span
            className="grid h-9 w-9 place-items-center rounded-full"
            style={{ backgroundColor: 'hsl(var(--laranja) / 0.16)', color: 'hsl(var(--laranja))' }}
          >
            <Video size={17} />
          </span>
        </section>

        {/* Horários */}
        <h2 className="mt-6 mb-2.5 text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
          Horários disponíveis
        </h2>
        <div className="grid grid-cols-2 gap-2.5">
          {SLOTS.map((s) => {
            const active = slot === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setSlot(s.id)}
                className="rounded-card px-3 py-3 text-left transition border"
                style={{
                  backgroundColor: active ? 'hsl(var(--laranja) / 0.14)' : 'hsl(var(--surface))',
                  borderColor: active ? 'hsl(var(--laranja))' : 'hsl(var(--surface-2) / 0.6)',
                }}
              >
                <span className="block text-[11px] text-baunilha/55">{s.label}</span>
                <span className="block text-[16px] font-bold text-text-primary/95">{s.time}</span>
              </button>
            );
          })}
        </div>

        {/* Como funciona */}
        <section className="mt-6 rounded-card bg-marinho p-4">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-menta">
            Como funciona
          </p>
          <ul className="mt-3 flex flex-col gap-2.5">
            {STEPS.map((step, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[13px] text-text-primary/85">
                <span
                  className="grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] font-bold"
                  style={{ backgroundColor: 'hsl(var(--menta) / 0.18)', color: 'hsl(var(--menta))' }}
                >
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ul>
        </section>

        <div
          className="mt-4 rounded-card p-3.5 flex items-start gap-2.5"
          style={{ backgroundColor: 'hsl(var(--menta) / 0.10)', border: '1px solid hsl(var(--menta) / 0.3)' }}
        >
          <Check size={16} className="mt-0.5 shrink-0 text-menta" />
          <p className="text-[12px] leading-[1.45] text-text-primary/85">
            Sem limite geográfico — atendemos você em qualquer cidade.
          </p>
        </div>
      </div>

      <footer className="flex flex-col items-center gap-3 px-6 pb-5 pt-3">
        <PrimaryButton
          trailingIcon="→"
          onClick={() => navigate('/exame/consulta', { state: { mode: 'tele' } })}
        >
          Confirmar teleconsulta
        </PrimaryButton>
        <TextLink onClick={() => navigate('/agenda/atendimento')}>
          Prefiro presencial
        </TextLink>
      </footer>
    </div>
  );
}
