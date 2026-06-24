import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Watch } from 'lucide-react';
import TextLink from '@/components/primitives/TextLink.jsx';
import { WEARABLE_NOTE } from '@/lib/positioning.js';

const PLATFORMS = [
  { id: 'apple', name: 'Apple Watch', sub: 'Series 5 ou superior' },
  { id: 'galaxy', name: 'Galaxy Watch', sub: 'Watch 4 ou superior' },
];

export default function SelectPlatformScreen() {
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
        <span className="text-[13px] font-semibold uppercase tracking-kicker text-baunilha/60">
          Conectar wearable
        </span>
      </header>

      <div className="flex-1 overflow-y-auto px-6 pt-5">
        <p className="text-[12px] font-semibold uppercase tracking-kicker text-menta">
          Escolha seu relógio
        </p>
        <h1 className="mt-1.5 text-[28px] font-bold leading-[1.12] tracking-tight">
          Qual seu wearable?
        </h1>
        <p className="mt-3 text-[15px] leading-[1.45] text-baunilha/70">
          Suportamos Apple Watch Series 5+ e Samsung Galaxy Watch 4+.
        </p>
        <div
          className="mt-4 flex items-start gap-2.5 rounded-card border p-3.5"
          style={{
            backgroundColor: 'hsl(var(--menta) / 0.10)',
            borderColor: 'hsl(var(--menta) / 0.32)',
          }}
        >
          <Watch size={15} className="mt-0.5 shrink-0 text-menta" />
          <p className="text-[12px] leading-[1.45] text-text-primary/85">{WEARABLE_NOTE}</p>
        </div>

        <div className="mt-6 space-y-3.5">
          {PLATFORMS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => navigate('/pairing/searching')}
              className="flex w-full items-center gap-4 rounded-card-lg bg-surface px-4 py-4 text-left transition hover:bg-surface-2/60"
            >
              <span className="grid h-12 w-12 flex-none place-items-center rounded-card bg-surface-2/70 text-baunilha">
                <Watch size={24} strokeWidth={1.8} />
              </span>
              <div className="flex-1">
                <p className="text-[16px] font-bold text-text-primary">{p.name}</p>
                <p className="text-[12px] text-baunilha/60">{p.sub}</p>
              </div>
              <ChevronRight size={20} className="text-baunilha/55" />
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-center px-6 pb-6 pt-3">
        <TextLink>Tenho outro tipo de dispositivo</TextLink>
      </div>
    </div>
  );
}
