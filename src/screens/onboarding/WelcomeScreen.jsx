import { useNavigate } from 'react-router-dom';
import PrimaryButton from '@/components/primitives/PrimaryButton.jsx';
import TextLink from '@/components/primitives/TextLink.jsx';
import MoonIcon from '@/components/icons/MoonIcon.jsx';

const STEPS = [
  'Consentimento LGPD — você no controle dos seus dados',
  'Perfil clínico básico (idade, sexo, contexto)',
  'Análise facial — marcadores não armazenam imagem',
];

export default function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <header className="px-6 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <span className="block h-2.5 w-2.5 rounded-full bg-laranja" />
          <span className="text-lg font-bold tracking-tight">Instituto do Sono</span>
        </div>
      </header>

      {/* Moon hero */}
      <div className="relative h-[230px]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div
            className="grid h-[170px] w-[170px] place-items-center rounded-full border border-surface-2/50"
            style={{
              background:
                'radial-gradient(circle, hsl(var(--surface) / 0.9) 0%, hsl(var(--marinho) / 0.4) 70%, transparent 100%)',
            }}
          >
            <MoonIcon size={92} />
          </div>
        </div>
      </div>

      {/* Copy */}
      <div className="px-8 text-center">
        <h1 className="text-[30px] font-bold leading-[1.12] tracking-tight">
          Bem-vindo ao
          <br />
          Instituto do Sono
        </h1>
        <p className="mx-auto mt-3 max-w-[320px] text-[15px] leading-[1.45] text-baunilha/70">
          Vamos configurar seu perfil clínico para que o algoritmo analise seu
          sono com a maior precisão possível.
        </p>
      </div>

      {/* Steps */}
      <ul className="mt-7 space-y-4 px-7">
        {STEPS.map((text, i) => (
          <li key={i} className="flex items-start gap-3.5">
            <span className="mt-0.5 grid h-7 w-7 flex-none place-items-center rounded-full border border-menta/40 text-[13px] font-semibold text-menta">
              {i + 1}
            </span>
            <span className="pt-1 text-[14px] leading-[1.4] text-text-primary/90">
              {text}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex-1" />

      {/* Actions */}
      <div className="flex flex-col items-center gap-2 px-6 pb-6">
        <PrimaryButton trailingIcon="→" onClick={() => navigate('/onboarding/consent')}>
          Vamos começar
        </PrimaryButton>
        <TextLink onClick={() => navigate('/onboarding/consent')}>
          Já tenho conta
        </TextLink>
      </div>
    </div>
  );
}
