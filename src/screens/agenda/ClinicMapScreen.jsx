import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, Star, Footprints } from 'lucide-react';
import TextLink from '@/components/primitives/TextLink.jsx';

const CLINICS = [
  {
    id: 'afip-vm',
    name: 'AFIP — Vila Mariana',
    address: 'Rua Borges Lagoa, 564',
    rating: '4.9',
    distance: '0.8km',
    slot: 'Hoje 14:00',
    slotTone: 'menta',
  },
  {
    id: 'afip-tt',
    name: 'AFIP — Tatuapé',
    address: 'Rua Tuiuti, 1820',
    rating: '4.8',
    distance: '4.2km',
    slot: 'Hoje 16:00',
    slotTone: 'menta',
  },
  {
    id: 'afip-ph',
    name: 'AFIP — Pinheiros',
    address: 'Rua Capote Valente, 295',
    rating: '4.7',
    distance: '6.1km',
    slot: 'Amanhã 09:00',
    slotTone: 'baunilha',
  },
];

export default function ClinicMapScreen() {
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
          Escolha uma clínica
        </span>
        <span className="h-10 w-10" />
      </div>

      {/* Search */}
      <div className="px-5 pb-3">
        <div className="flex items-center gap-3 rounded-card-lg bg-surface-2/60 px-4 py-3.5">
          <Search size={18} className="shrink-0 text-baunilha/50" />
          <span className="text-base text-baunilha/70">Buscar clínica ou bairro...</span>
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto px-5 pb-3">
        <button
          type="button"
          onClick={() => navigate('/agenda/filtros')}
          className="shrink-0 rounded-pill border border-laranja/60 bg-laranja/15 px-4 py-2 text-sm font-semibold text-laranja"
        >
          AFIP × 24
        </button>
        {['Convênio', 'Raio 5km', 'Tipo de exame'].map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => navigate('/agenda/filtros')}
            className="shrink-0 rounded-pill bg-surface-2 px-4 py-2 text-sm font-medium text-text-primary"
          >
            {f}
          </button>
        ))}
      </div>

      {/* Map */}
      <div className="relative mx-0 h-40 shrink-0 overflow-hidden bg-surface">
        <div className="absolute inset-0 bg-gradient-to-br from-surface-2/40 to-marinho" />
        <MapPin n="1" className="left-[26%] top-[40%]" />
        <MapPin n="2" className="left-[62%] top-[22%]" />
        <MapPin n="3" className="left-[78%] top-[64%]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
          <div className="h-6 w-6 rounded-full bg-laranja shadow-cta" />
          <div className="mx-auto h-3 w-0.5 bg-laranja/70" />
        </div>
      </div>

      {/* Clinic list */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        <div className="flex flex-col gap-3">
          {CLINICS.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => navigate('/agenda/clinica/afip-vm')}
              className="w-full rounded-card bg-surface p-4 text-left"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-surface-2 text-2xl">
                  🏥
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-semibold text-text-primary">{c.name}</h3>
                    <span className="flex shrink-0 items-center gap-1 text-sm font-semibold text-sun-moon">
                      <Star size={13} className="fill-sun-moon text-sun-moon" />
                      {c.rating}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-baunilha/70">{c.address}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="flex items-center gap-1 text-xs font-medium text-laranja">
                      <Footprints size={13} />
                      {c.distance}
                    </span>
                    <span
                      className="rounded-pill px-2 py-0.5 text-xs font-semibold"
                      style={{
                        backgroundColor: `hsl(var(--${c.slotTone}) / 0.18)`,
                        color: `hsl(var(--${c.slotTone}))`,
                      }}
                    >
                      {c.slot}
                    </span>
                    <span className="rounded-pill bg-surface-2 px-2 py-0.5 text-xs text-baunilha/70">
                      +3 horários
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <TextLink onClick={() => navigate('/agenda/clinica/afip-vm')}>
            Ver mais clínicas
          </TextLink>
        </div>
      </div>
    </div>
  );
}

function MapPin({ n, className }) {
  return (
    <span
      className={`absolute flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-laranja text-[10px] font-bold text-text-on-brand ${className}`}
    >
      {n}
    </span>
  );
}
