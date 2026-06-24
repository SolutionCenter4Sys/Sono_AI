import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, RotateCcw } from 'lucide-react';

/**
 * Captura facial em 2 fotos: frontal + perfil.
 * O perfil é o que mais importa para a mandíbula/retrognatia (feedback Dr. Gustavo).
 */
export default function FaceCameraScreen() {
  const navigate = useNavigate();
  const [step, setStep] = useState('frontal'); // 'frontal' → 'perfil'
  const isFrontal = step === 'frontal';

  const capture = () => {
    if (isFrontal) setStep('perfil');
    else navigate('/onboarding/done');
  };

  return (
    <div className="relative flex h-full flex-col bg-marinho-deep">
      {/* Top controls */}
      <header className="flex items-center justify-between px-6 pt-4">
        <button
          type="button"
          onClick={() => (isFrontal ? navigate(-1) : setStep('frontal'))}
          aria-label="Fechar"
          className="grid h-10 w-10 place-items-center rounded-full bg-surface-2/60 text-text-primary/90 transition hover:bg-surface-2"
        >
          <X size={20} strokeWidth={2.4} />
        </button>
        <span className="text-[12px] font-semibold uppercase tracking-kicker text-baunilha/70">
          Foto {isFrontal ? '1' : '2'} de 2
        </span>
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
          <span
            className="text-[80px] leading-none opacity-40 grayscale"
            style={{ transform: isFrontal ? 'none' : 'scaleX(-1) rotate(-8deg)' }}
          >
            {isFrontal ? '🙂' : '👤'}
          </span>
        </div>

        <p className="mt-7 text-[12px] font-semibold uppercase tracking-kicker text-menta">
          {isFrontal ? 'Foto frontal' : 'Foto de perfil'}
        </p>
        <p className="mt-1.5 text-[18px] font-bold text-text-primary text-center">
          {isFrontal ? 'Centralize seu rosto no oval' : 'Vire o rosto de lado (perfil)'}
        </p>
        {!isFrontal && (
          <p className="mt-1.5 max-w-[260px] text-center text-[12px] text-baunilha/55">
            O perfil ajuda a avaliar a mandíbula.
          </p>
        )}
      </div>

      {/* Shutter */}
      <div className="flex items-center justify-center pb-10">
        <button
          type="button"
          aria-label={isFrontal ? 'Capturar foto frontal' : 'Capturar foto de perfil'}
          onClick={capture}
          className="grid h-20 w-20 place-items-center rounded-full border-4 border-surface-2/70 transition active:scale-95"
        >
          <span className="h-14 w-14 rounded-full bg-laranja shadow-cta" />
        </button>
      </div>
    </div>
  );
}
