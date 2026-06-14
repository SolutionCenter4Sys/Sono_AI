import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Check } from 'lucide-react';
import PrimaryButton from '@/components/primitives/PrimaryButton.jsx';
import TextLink from '@/components/primitives/TextLink.jsx';

const DO = [
  'Durma seu horário normal hoje',
  'Lave o cabelo (sem condicionador)',
  'Tome banho antes do exame',
  'Use roupa confortável (algodão)',
];

const DONT = [
  'Cafeína após 14h do dia do exame',
  'Bebida alcoólica nas últimas 24h',
  'Cochilos durante o dia',
  'Maquiagem ou produtos no cabelo',
];

const BRING = [
  'Documento com foto',
  'Cartão do convênio',
  'Lista de medicamentos em uso',
  'Pijama ou roupa de dormir',
];

export default function PrepScreen() {
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
          Preparo do exame
        </span>
        <span className="h-10 w-10" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-4">
        <span className="text-xs font-semibold uppercase tracking-kicker text-menta">
          1 dia antes do seu exame
        </span>
        <h1 className="mt-1 text-3xl font-bold text-text-primary">Vamos te preparar</h1>
        <p className="mt-2 text-sm text-baunilha/80">
          Polissonografia em 12 de junho às 21:00 na AFIP — Vila Mariana.
        </p>

        {/* DO (menta) */}
        <section className="mt-5 rounded-card bg-menta p-5">
          <div className="space-y-2.5">
            {DO.map((d) => (
              <div key={d} className="flex items-center gap-2.5 text-sm text-text-primary">
                <Check size={16} className="shrink-0 text-marinho-deep" />
                {d}
              </div>
            ))}
          </div>
        </section>

        {/* DON'T (riskModerate) */}
        <section
          className="mt-3 rounded-card p-5"
          style={{ backgroundColor: 'hsl(var(--risk-moderate))' }}
        >
          <div className="space-y-2.5">
            {DONT.map((d) => (
              <div key={d} className="flex items-center gap-2.5 text-sm text-text-primary">
                <span className="shrink-0 font-bold text-marinho-deep">✕</span>
                {d}
              </div>
            ))}
          </div>
        </section>

        {/* BRING */}
        <section className="mt-3 rounded-card bg-surface p-5">
          <span className="text-xs font-semibold uppercase tracking-kicker text-baunilha/50">
            Leve com você
          </span>
          <div className="mt-3 space-y-2">
            {BRING.map((b) => (
              <div key={b} className="flex items-center gap-2 text-sm text-text-primary">
                <span className="text-baunilha/50">·</span>
                {b}
              </div>
            ))}
          </div>
        </section>
        <div className="h-4" />
      </div>

      <footer className="px-5 pb-4 pt-3">
        <PrimaryButton trailingIcon={<Check size={18} />} onClick={() => navigate('/exame/agendado')}>
          Marcar como lido
        </PrimaryButton>
        <div className="mt-1 flex justify-center">
          <TextLink onClick={() => navigate('/exame/agendado')}>Baixar preparo em PDF</TextLink>
        </div>
      </footer>
    </div>
  );
}
