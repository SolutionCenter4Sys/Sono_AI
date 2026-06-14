import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Map } from 'lucide-react';
import PrimaryButton from '@/components/primitives/PrimaryButton.jsx';
import TextLink from '@/components/primitives/TextLink.jsx';

/**
 * 05.3 Tracking de entrega — timeline do pedido.
 * Figma 48:105.
 */
const TIMELINE = [
  { label: 'Pedido criado', time: '14h08', state: 'done' },
  { label: 'Em separação', time: '14h20', state: 'done' },
  { label: 'Despachado', time: '15h30', state: 'done' },
  { label: 'Em rota', time: '16h12', state: 'active' },
  { label: 'Saiu para entrega', time: 'estimado 17h30', state: 'pending' },
];

export default function TrackingScreen() {
  const navigate = useNavigate();

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
          Seu pedido
        </span>
        <span className="h-10 w-10" aria-hidden />
      </header>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <p className="text-[11px] font-semibold uppercase tracking-kicker text-laranja">Em rota</p>
        <h1 className="mt-1.5 text-[26px] font-bold leading-tight">Seu kit chega hoje</h1>
        <p className="mt-2 text-[13px] text-baunilha/60">
          Pedido AFIP-POL-2026-04421 · Em rota desde 14:08
        </p>

        {/* Timeline */}
        <section className="mt-5 rounded-card bg-surface p-5">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
            Timeline
          </p>
          <div className="relative mt-4 pl-6">
            <span
              className="absolute left-[5px] top-2 bottom-3 w-px"
              style={{ backgroundColor: 'hsl(var(--surface-2))' }}
              aria-hidden
            />
            <div className="flex flex-col gap-5">
              {TIMELINE.map((item) => (
                <div key={item.label} className="relative">
                  <span
                    className="absolute -left-[25px] top-0.5 grid h-3 w-3 place-items-center rounded-full"
                    style={{
                      backgroundColor:
                        item.state === 'done'
                          ? 'hsl(var(--menta))'
                          : item.state === 'active'
                            ? 'hsl(var(--laranja))'
                            : 'transparent',
                      border: item.state === 'pending' ? '1.5px solid hsl(var(--surface-2))' : 'none',
                    }}
                    aria-hidden
                  />
                  <p
                    className="text-[14px] font-semibold"
                    style={{
                      color: item.state === 'pending' ? 'hsl(var(--baunilha) / 0.55)' : undefined,
                    }}
                  >
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-[12px] text-baunilha/50">{item.time}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Previsão */}
        <section className="mt-4 rounded-card bg-surface p-5">
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-baunilha/65">Previsão de entrega</span>
            <span className="text-[14px] font-semibold text-menta">Hoje · 18:15</span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-[13px] text-baunilha/65">Rastreio</span>
            <span className="text-[14px] font-semibold text-text-primary/90">
              AFIP-POL-2026-04421
            </span>
          </div>
        </section>
      </div>

      <footer className="flex flex-col items-center gap-3 px-6 pb-5 pt-3">
        <PrimaryButton
          leadingIcon={<Map size={18} />}
          onClick={() => navigate('/polisso-movel/recebido')}
        >
          Acompanhar no mapa
        </PrimaryButton>
        <TextLink onClick={() => navigate(-1)}>Cancelar pedido</TextLink>
      </footer>
    </div>
  );
}
