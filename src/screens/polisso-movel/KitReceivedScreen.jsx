import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Check, Lightbulb, PackageCheck } from 'lucide-react';
import PrimaryButton from '@/components/primitives/PrimaryButton.jsx';

/**
 * 05.4 Equipamentos chegaram — confirmação de recebimento.
 * Figma 48:173.
 */
const ITEMS = [
  'Sensor cardio peito',
  'Oxímetro de dedo',
  'Cinta abdominal respiratória',
  'Cabo dados USB-C',
];

export default function KitReceivedScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center px-4 pt-4 pb-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Voltar"
          className="grid h-10 w-10 place-items-center rounded-full bg-surface-2/60 text-text-primary/90 transition hover:bg-surface-2"
        >
          <ChevronLeft size={20} strokeWidth={2.4} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        {/* Illustration */}
        <div className="flex justify-center pt-2 pb-2">
          <div className="relative grid h-[160px] w-[160px] place-items-center">
            <span
              className="absolute h-[160px] w-[160px] rounded-full"
              style={{ backgroundColor: 'hsl(var(--risk-low) / 0.4)' }}
            />
            <span
              className="absolute h-[120px] w-[120px] rounded-full"
              style={{ backgroundColor: 'hsl(var(--risk-low))' }}
            />
            <PackageCheck size={54} className="relative text-marinho-deep" />
          </div>
        </div>

        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-risk-low">
            Entregue
          </p>
          <h1 className="mt-2 text-[28px] font-bold leading-tight">Tudo certo, seu kit chegou!</h1>
          <p className="mx-auto mt-3 max-w-[300px] text-[14px] leading-[1.5] text-baunilha/65">
            Confira os itens e agende a orientação técnica com nosso especialista.
          </p>
        </div>

        {/* Kit recebido */}
        <section className="mt-6 rounded-card bg-surface p-5">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-risk-low">
            Kit recebido
          </p>
          <ul className="mt-3 flex flex-col gap-2.5">
            {ITEMS.map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <Check size={15} className="text-menta" strokeWidth={3} />
                <span className="text-[14px] font-medium text-text-primary/90">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Aviso */}
        <section
          className="mt-4 flex items-start gap-3 rounded-card border p-4"
          style={{
            backgroundColor: 'hsl(var(--sun-moon) / 0.1)',
            borderColor: 'hsl(var(--sun-moon) / 0.4)',
          }}
        >
          <Lightbulb size={18} className="mt-0.5 shrink-0 text-sun-moon" />
          <p className="text-[13px] leading-[1.45] text-baunilha/85">
            Não use ainda — aguarde a orientação do técnico para garantir resultado válido.
          </p>
        </section>
      </div>

      <footer className="px-6 pb-5 pt-3">
        <PrimaryButton leadingIcon="→" onClick={() => navigate('/polisso-movel/agendamento')}>
          Agendar orientação técnica
        </PrimaryButton>
      </footer>
    </div>
  );
}
