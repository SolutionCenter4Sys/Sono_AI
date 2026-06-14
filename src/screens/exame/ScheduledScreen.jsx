import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import PrimaryButton from '@/components/primitives/PrimaryButton.jsx';
import TextLink from '@/components/primitives/TextLink.jsx';
import { comingSoon } from '@/lib/demoToast.js';

const TIMELINE = [
  { label: 'Encaminhamento recebido', date: '8 Jun', state: 'done' },
  { label: 'Agendamento confirmado', date: '9 Jun', state: 'done' },
  { label: 'Preparo enviado', date: 'Hoje', state: 'current' },
  { label: 'Realizar exame', date: '12 Jun', state: 'pending' },
];

export default function ScheduledScreen() {
  const navigate = useNavigate();

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
          Meu exame
        </span>
        <span className="h-10 w-10" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-4">
        {/* Countdown hero */}
        <div className="flex flex-col items-center pt-4 text-center">
          <span className="mb-2 inline-flex rounded-pill bg-menta px-6 py-1.5 text-xs font-bold uppercase tracking-kicker text-marinho-deep">
            ● Confirmado
          </span>
          <h1 className="text-6xl font-bold text-text-primary">3 dias</h1>
          <p className="mt-2 text-sm text-baunilha/70">para o seu exame</p>
        </div>

        {/* Exam card */}
        <section className="mt-5 rounded-card bg-marinho p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sun-moon text-xl">
              🛌
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">Polissonografia</p>
              <p className="text-xs text-baunilha/70">AFIP — Vila Mariana</p>
            </div>
          </div>
          <div className="mt-4 space-y-2 border-t border-surface-2/50 pt-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-baunilha/70">Protocolo</span>
              <span className="font-semibold text-menta">AFIP-PSG-2026-04421</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-baunilha/70">Médico solicitante</span>
              <span className="font-semibold text-text-primary">Dr. Marcos Rocha</span>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="mt-3 rounded-card bg-marinho p-4">
          <span className="text-xs font-semibold uppercase tracking-kicker text-baunilha/50">
            Timeline
          </span>
          <div className="mt-3 space-y-3.5">
            {TIMELINE.map((t) => (
              <div key={t.label} className="flex items-center gap-3">
                <span
                  className="h-3.5 w-3.5 shrink-0 rounded-full"
                  style={{
                    backgroundColor:
                      t.state === 'done'
                        ? 'hsl(var(--risk-low))'
                        : t.state === 'current'
                          ? 'hsl(var(--menta))'
                          : 'hsl(var(--surface-2))',
                  }}
                />
                <span
                  className={`flex-1 text-sm font-semibold ${
                    t.state === 'current' ? 'text-menta' : 'text-text-primary'
                  }`}
                >
                  {t.label}
                </span>
                <span className="text-xs text-baunilha/60">{t.date}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer className="px-5 pb-4 pt-3">
        <PrimaryButton
          className="bg-menta text-text-on-brand shadow-none"
          trailingIcon="→"
          onClick={() => navigate('/exame/em-laudo-ia')}
        >
          Acompanhar meu exame
        </PrimaryButton>
        <div className="mt-1 flex justify-center">
          <TextLink onClick={() => comingSoon('Adicionar ao calendário')}>
            Adicionar ao calendário
          </TextLink>
        </div>
      </footer>
    </div>
  );
}
