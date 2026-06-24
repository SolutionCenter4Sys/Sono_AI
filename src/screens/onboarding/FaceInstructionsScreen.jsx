import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import PrimaryButton from '@/components/primitives/PrimaryButton.jsx';
import TextLink from '@/components/primitives/TextLink.jsx';

const TIPS = [
  'Ambiente bem iluminado',
  'Rosto sem óculos ou maquiagem pesada',
  'Duas fotos rápidas: frontal e de perfil',
];

export default function FaceInstructionsScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col">
      <StepHeader step={3} onBack={() => navigate(-1)} />

      <div className="flex-1 overflow-y-auto px-6 pt-4">
        <div className="text-center">
          <p className="text-[12px] font-semibold uppercase tracking-kicker text-menta">
            Análise facial
          </p>
          <h1 className="mt-1.5 text-[28px] font-bold leading-[1.12] tracking-tight">
            10 segundos
            <br />
            pra concluir
          </h1>
          <p className="mx-auto mt-3 max-w-[330px] text-[15px] leading-[1.45] text-baunilha/70">
            Marcadores anatômicos — mandíbula (retrognatia), nariz e
            circunferência do pescoço — que ajudam a avaliar indícios
            respiratórios do sono. É um{' '}
            <strong className="text-baunilha/90">sinal complementar</strong>, nunca a base única.
          </p>
        </div>

        {/* Face oval placeholder */}
        <div className="mt-7 flex justify-center">
          <div
            className="grid h-[200px] w-[160px] place-items-center rounded-[50%] bg-surface/70"
            style={{
              border: '2px dashed hsl(var(--menta) / 0.55)',
            }}
          >
            <span className="text-[64px] leading-none">🙂</span>
          </div>
        </div>

        <ul className="mt-7 space-y-2.5 rounded-card bg-surface p-5">
          {TIPS.map((tip) => (
            <li key={tip} className="flex items-center gap-3 text-[14px] text-text-primary/90">
              <span className="block h-1.5 w-1.5 flex-none rounded-full bg-menta" />
              {tip}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col items-center gap-2 px-6 pb-6 pt-3">
        <PrimaryButton onClick={() => navigate('/onboarding/face/camera')}>
          Permitir câmera
        </PrimaryButton>
        <TextLink onClick={() => navigate('/metodologia')}>Como funciona?</TextLink>
      </div>
    </div>
  );
}

function StepHeader({ step, total = 4, onBack }) {
  return (
    <header className="px-6 pt-4">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          aria-label="Voltar"
          className="grid h-10 w-10 place-items-center rounded-full bg-surface-2/60 text-text-primary/90 transition hover:bg-surface-2"
        >
          <ChevronLeft size={20} strokeWidth={2.4} />
        </button>
        <span className="text-[12px] font-semibold uppercase tracking-kicker text-baunilha/60">
          Etapa {step} de {total}
        </span>
        <span className="h-10 w-10" />
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-pill bg-surface-2/60">
        <div
          className="h-full rounded-pill bg-laranja transition-all"
          style={{ width: `${(step / total) * 100}%` }}
        />
      </div>
    </header>
  );
}
