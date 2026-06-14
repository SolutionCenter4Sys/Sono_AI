import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import PrimaryButton from '@/components/primitives/PrimaryButton.jsx';
import TextLink from '@/components/primitives/TextLink.jsx';
import { comingSoon } from '@/lib/demoToast.js';

const STEPS = [
  'Receber preparo (1 dia antes)',
  'Lembrete no WhatsApp (manhã do exame)',
  'Realizar exame na data marcada',
];

export default function BookingConfirmScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto px-5 pt-8">
        {/* Hero */}
        <div className="flex flex-col items-center text-center">
          <div
            className="flex h-32 w-32 items-center justify-center rounded-full text-6xl"
            style={{ backgroundColor: 'hsl(var(--menta) / 0.18)' }}
          >
            📅
          </div>
          <span className="mt-4 text-xs font-semibold uppercase tracking-kicker text-menta">
            Agendado
          </span>
          <h1 className="mt-1 text-3xl font-bold text-text-primary">Tudo certo!</h1>
          <p className="mt-1 text-sm text-baunilha/70">Seu exame está reservado.</p>
        </div>

        {/* Details */}
        <section className="mt-6 rounded-card bg-surface p-4">
          <span className="text-xs font-semibold uppercase tracking-kicker text-baunilha/50">
            Detalhes do agendamento
          </span>
          <div className="mt-3 space-y-2.5">
            <DetailRow label="Clínica" value="AFIP — Vila Mariana" />
            <DetailRow label="Data" value="Sex, 12 Jun · 21:00" />
            <DetailRow label="Exame" value="Polissonografia completa" />
            <DetailRow label="Médico solicitante" value="Dr. Marcos R." />
          </div>
          <div className="mt-3 flex items-center gap-2 border-t border-surface-2/50 pt-3 text-sm">
            <span className="text-baunilha/70">🗓 Protocolo:</span>
            <span className="font-semibold text-menta">AFIP-PSG-2026-04421</span>
          </div>
        </section>

        {/* WhatsApp */}
        <section className="mt-3 flex items-start gap-3 rounded-card border border-menta/50 bg-menta/10 p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-menta text-lg">
            📱
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary">Mensagem enviada no WhatsApp</p>
            <p className="mt-0.5 text-xs text-baunilha/70">
              Você receberá lembretes e preparo via (11) 9 *****-1234
            </p>
          </div>
        </section>

        {/* Next steps */}
        <section className="mt-3 rounded-card bg-surface p-4">
          <span className="text-xs font-semibold uppercase tracking-kicker text-baunilha/50">
            Próximos passos
          </span>
          <div className="mt-3 space-y-2.5">
            {STEPS.map((s) => (
              <div key={s} className="flex items-center gap-2.5 text-sm text-text-primary">
                <Check size={15} className="shrink-0 text-menta" />
                {s}
              </div>
            ))}
          </div>
        </section>
        <div className="h-4" />
      </div>

      <footer className="px-5 pb-4 pt-3">
        <PrimaryButton trailingIcon="→" onClick={() => navigate('/exame/preparo')}>
          Continuar para o preparo
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

function DetailRow({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-baunilha/70">{label}</span>
      <span className="text-sm font-semibold text-text-primary">{value}</span>
    </div>
  );
}
