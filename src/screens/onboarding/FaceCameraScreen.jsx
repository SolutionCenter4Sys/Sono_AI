import { useNavigate } from 'react-router-dom';
import { X, RotateCcw } from 'lucide-react';

export default function FaceCameraScreen() {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-full flex-col bg-marinho-deep">
      {/* Top controls */}
      <header className="flex items-center justify-between px-6 pt-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Fechar"
          className="grid h-10 w-10 place-items-center rounded-full bg-surface-2/60 text-text-primary/90 transition hover:bg-surface-2"
        >
          <X size={20} strokeWidth={2.4} />
        </button>
        <button
          type="button"
          aria-label="Virar câmera"
          className="grid h-10 w-10 place-items-center rounded-full bg-surface-2/60 text-text-primary/90 transition hover:bg-surface-2"
        >
          <RotateCcw size={18} strokeWidth={2.2} />
        </button>
      </header>

      {/* Camera oval */}
      <div className="flex flex-1 flex-col items-center justify-center px-6">
        <div
          className="grid h-[280px] w-[230px] place-items-center rounded-[50%] bg-surface/40"
          style={{ border: '2px dashed hsl(var(--menta) / 0.6)' }}
        >
          <span className="text-[80px] leading-none opacity-40 grayscale">🙂</span>
        </div>

        <p className="mt-7 text-[12px] font-semibold uppercase tracking-kicker text-menta">
          Fique tranquilo por um instante
        </p>
        <p className="mt-1.5 text-[18px] font-bold text-text-primary">
          Centralize seu rosto no oval
        </p>
      </div>

      {/* Shutter */}
      <div className="flex items-center justify-center pb-10">
        <button
          type="button"
          aria-label="Capturar"
          onClick={() => navigate('/onboarding/done')}
          className="grid h-20 w-20 place-items-center rounded-full border-4 border-surface-2/70 transition active:scale-95"
        >
          <span className="h-14 w-14 rounded-full bg-laranja shadow-cta" />
        </button>
      </div>
    </div>
  );
}
