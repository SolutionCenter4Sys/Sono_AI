import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Star, MapPin, Phone, Clock, Check } from 'lucide-react';
import PrimaryButton from '@/components/primitives/PrimaryButton.jsx';
import TextLink from '@/components/primitives/TextLink.jsx';

const EXAMS = [
  'Polissonografia completa (Tipo 1)',
  'Polissonografia portátil (Tipo 3)',
  'Actigrafia (7 dias)',
  'Teste de latência (MSLT)',
];

const SLOTS = ['Hoje · 14h', 'Hoje · 19h', 'Amanhã · 08h', '+ ver todos'];

export default function ClinicDetailScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col">
      {/* Hero with back button */}
      <div className="relative shrink-0">
        <div className="flex h-44 flex-col items-center justify-center bg-surface-2/50">
          <span className="text-lg font-semibold text-text-primary">🏥 AFIP — Vila Mariana</span>
        </div>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute left-4 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-surface-2/80 text-text-primary"
          aria-label="Voltar"
        >
          <ChevronLeft size={20} />
        </button>
      </div>

      <div className="-mt-5 flex-1 overflow-y-auto rounded-t-card-lg bg-marinho-deep px-5 pt-5">
        {/* Title block */}
        <h1 className="text-2xl font-bold text-text-primary">AFIP — Vila Mariana</h1>
        <div className="mt-3 flex items-center gap-2 text-sm text-baunilha/70">
          <span className="flex items-center gap-1 rounded-pill bg-surface-2 px-2.5 py-1 font-semibold text-sun-moon">
            <Star size={13} className="fill-sun-moon text-sun-moon" />
            4.9
          </span>
          <span>· 342 avaliações ·</span>
          <span>Há 0.8 km</span>
        </div>

        <div className="mt-4 space-y-2.5 border-t border-surface-2/50 pt-4 text-sm text-baunilha/80">
          <Row icon={<MapPin size={15} className="text-laranja" />}>
            Rua Borges Lagoa, 564 · Vila Mariana
          </Row>
          <Row icon={<Phone size={15} className="text-baunilha/70" />}>(11) 5908-7000</Row>
          <Row icon={<Clock size={15} className="text-menta" />}>
            <span className="text-menta">Aberto agora</span> · 06:00 às 22:00
          </Row>
        </div>

        {/* Exams */}
        <section className="mt-4 rounded-card bg-surface p-4">
          <SectionLabel>Exames oferecidos</SectionLabel>
          <div className="mt-3 space-y-2.5">
            {EXAMS.map((e) => (
              <div key={e} className="flex items-center gap-2.5 text-sm text-text-primary">
                <Check size={15} className="shrink-0 text-menta" />
                {e}
              </div>
            ))}
          </div>
        </section>

        {/* Slots */}
        <section className="mt-3 rounded-card bg-surface p-4">
          <SectionLabel className="text-menta">Próximos horários disponíveis</SectionLabel>
          <div className="mt-3 flex flex-wrap gap-2">
            {SLOTS.map((s) => (
              <span
                key={s}
                className="rounded-button bg-surface-2 px-3 py-2 text-xs font-medium text-text-primary"
              >
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* Info note */}
        <div className="mt-3 flex items-start gap-2 rounded-card border border-surface-2/60 bg-surface/40 p-4">
          <span className="text-base">💡</span>
          <p className="text-xs leading-relaxed text-baunilha/80">
            Esta é uma clínica AFIP - Instituto do Sono. Atendimento credenciado.
          </p>
        </div>
        <div className="h-4" />
      </div>

      <footer className="px-5 pb-4 pt-3">
        <PrimaryButton trailingIcon="→" onClick={() => navigate('/agenda/calendar/afip-vm')}>
          Agendar nesta clínica
        </PrimaryButton>
        <div className="mt-1 flex justify-center">
          <TextLink onClick={() => navigate('/agenda/calendar/afip-vm')}>Compartilhar</TextLink>
        </div>
      </footer>
    </div>
  );
}

function Row({ icon, children }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="shrink-0">{icon}</span>
      <span>{children}</span>
    </div>
  );
}

function SectionLabel({ children, className = '' }) {
  return (
    <span
      className={`text-xs font-semibold uppercase tracking-kicker text-baunilha/50 ${className}`}
    >
      {children}
    </span>
  );
}
