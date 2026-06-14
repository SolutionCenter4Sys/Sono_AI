import { useNavigate } from 'react-router-dom';
import { ScrollText, Package, PhoneOff } from 'lucide-react';

/**
 * 05.6 Videochamada em curso — orientação técnica ao vivo.
 * Figma 48:290.
 */
export default function VideoCallScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col px-5 pt-4 pb-6">
      {/* Status header */}
      <div className="flex items-center justify-center gap-4 pb-3">
        <span className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-kicker text-text-primary">
          <span className="h-2 w-2 rounded-full bg-laranja" />
          Ao vivo · 03:42
        </span>
        <button
          type="button"
          className="text-[12px] font-medium uppercase tracking-kicker text-baunilha/60 underline decoration-baunilha/35 underline-offset-4"
        >
          Detalhes
        </button>
      </div>

      {/* Camera */}
      <div className="relative flex-1 overflow-hidden rounded-card-lg bg-surface-2/40">
        <div className="absolute inset-0 grid place-items-center">
          <span className="text-[15px] text-baunilha/55">Sua câmera</span>
        </div>
        {/* PIP do técnico */}
        <div className="absolute bottom-4 right-4 grid h-[120px] w-[92px] place-items-end justify-items-center rounded-xl bg-surface-2/80 p-2">
          <span className="text-[12px] font-semibold text-text-primary/90">Marcos</span>
        </div>
      </div>

      {/* Próximo passo */}
      <section className="mt-4 rounded-card bg-surface p-5">
        <p className="text-[11px] font-semibold uppercase tracking-kicker text-sun-moon">
          Próximo passo
        </p>
        <h2 className="mt-2 text-[18px] font-bold leading-snug">
          Coloque o sensor cardio no peito
        </h2>
        <p className="mt-2 text-[13px] leading-[1.5] text-baunilha/65">
          O técnico vai te guiar. Repita após ele para confirmar o posicionamento.
        </p>
        <div className="mt-3 flex gap-1.5">
          {[true, false, false, false].map((active, i) => (
            <span
              key={i}
              className="h-2 w-2 rounded-full"
              style={{
                backgroundColor: i === 1 ? 'hsl(var(--laranja))' : 'hsl(var(--surface-2))',
              }}
            />
          ))}
        </div>
      </section>

      {/* Controls */}
      <div className="mt-5 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Notas"
          className="grid h-14 w-14 place-items-center rounded-full bg-surface-2/70 text-baunilha/80"
        >
          <ScrollText size={20} />
        </button>
        <button
          type="button"
          aria-label="Itens do kit"
          className="grid h-14 w-14 place-items-center rounded-full bg-surface-2/70 text-baunilha/80"
        >
          <Package size={20} />
        </button>
        <button
          type="button"
          aria-label="Encerrar chamada"
          onClick={() => navigate('/polisso-movel/stream')}
          className="grid h-14 w-14 place-items-center rounded-full text-white"
          style={{ backgroundColor: 'hsl(var(--risk-critical))' }}
        >
          <PhoneOff size={20} />
        </button>
      </div>
    </div>
  );
}
