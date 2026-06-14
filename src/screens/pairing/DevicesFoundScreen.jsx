import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Watch, BatteryFull, Wifi } from 'lucide-react';
import TextLink from '@/components/primitives/TextLink.jsx';
import { comingSoon } from '@/lib/demoToast.js';

const DEVICES = [
  {
    id: 'gw6',
    name: 'Galaxy Watch 6',
    model: 'Watch6 Classic 47mm',
    battery: 87,
    signal: 'Forte',
    signalColor: 'menta',
    mine: true,
  },
  {
    id: 'gw4',
    name: 'Galaxy Watch (Carlos)',
    model: 'Watch4 44mm',
    battery: 23,
    signal: 'Fraco',
    signalColor: 'risk-moderate',
  },
  {
    id: 'gwx',
    name: 'GW-A23F1',
    model: 'Sem nome conhecido',
    battery: 64,
    signal: 'Médio',
    signalColor: 'baunilha',
    // Dispositivo desconhecido → demonstra o caminho de falha de pareamento
    failsPairing: true,
  },
];

export default function DevicesFoundScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center gap-3 px-6 pt-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Voltar"
          className="grid h-10 w-10 place-items-center rounded-full bg-surface-2/60 text-text-primary/90 transition hover:bg-surface-2"
        >
          <ChevronLeft size={20} strokeWidth={2.4} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-6 pt-4">
        <p className="text-[12px] font-semibold uppercase tracking-kicker text-menta">
          Toque para conectar
        </p>
        <h1 className="mt-1.5 text-[28px] font-bold leading-[1.12] tracking-tight">
          Dispositivos encontrados
        </h1>
        <p className="mt-3 text-[15px] leading-[1.45] text-baunilha/70">
          Escolha o seu — vamos pedir confirmação no relógio.
        </p>

        <div className="mt-6 space-y-3.5">
          {DEVICES.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() =>
                navigate(d.failsPairing ? '/pairing/error' : '/pairing/connecting')
              }
              className="flex w-full items-center gap-3.5 rounded-card-lg border bg-surface px-4 py-3.5 text-left transition hover:bg-surface-2/60"
              style={{
                borderColor: d.mine ? 'hsl(var(--laranja))' : 'transparent',
              }}
            >
              <span className="grid h-11 w-11 flex-none place-items-center rounded-card bg-surface-2/70 text-baunilha">
                <Watch size={22} strokeWidth={1.8} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-[15px] font-bold text-text-primary">{d.name}</p>
                  {d.mine ? (
                    <span
                      className="rounded-pill px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-kicker text-laranja"
                      style={{ backgroundColor: 'hsl(var(--laranja) / 0.18)' }}
                    >
                      Seu
                    </span>
                  ) : null}
                </div>
                <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-baunilha/60">
                  <span className="truncate">{d.model}</span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1">
                    <BatteryFull size={13} className="text-menta" />
                    {d.battery}%
                  </span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1" style={{ color: `hsl(var(--${d.signalColor}))` }}>
                    <Wifi size={13} />
                    {d.signal}
                  </span>
                </div>
              </div>
              <ChevronRight size={20} className="flex-none text-baunilha/55" />
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-1 px-6 pb-6 pt-3">
        <TextLink onClick={() => navigate('/pairing/searching')}>Buscar novamente</TextLink>
        <TextLink onClick={() => comingSoon('Pareamento manual')}>Pareamento manual</TextLink>
      </div>
    </div>
  );
}
