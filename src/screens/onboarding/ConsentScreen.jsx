import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Check } from 'lucide-react';
import PrimaryButton from '@/components/primitives/PrimaryButton.jsx';
import TextLink from '@/components/primitives/TextLink.jsx';

const POINTS = [
  'Dados ficam armazenados no seu dispositivo',
  'Imagem facial NÃO é armazenada — apenas marcadores',
  'Você pode revogar consentimento a qualquer momento',
  'Compartilhamento com médico só sob seu consentimento',
];

export default function ConsentScreen() {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(true);

  return (
    <div className="flex h-full flex-col">
      <StepHeader step={1} onBack={() => navigate(-1)} />

      <div className="flex-1 overflow-y-auto px-6 pt-4">
        <p className="text-[12px] font-semibold uppercase tracking-kicker text-menta">
          Privacidade
        </p>
        <h1 className="mt-1.5 text-[28px] font-bold leading-[1.12] tracking-tight">
          Você no controle dos
          <br />
          seus dados
        </h1>
        <p className="mt-3 text-[15px] leading-[1.45] text-baunilha/70">
          Antes de qualquer coleta, queremos ser transparentes sobre o que
          faremos com seus dados.
        </p>

        <ul className="mt-6 space-y-4 rounded-card-lg bg-surface p-5">
          {POINTS.map((text) => (
            <li key={text} className="flex items-start gap-3">
              <span
                className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full"
                style={{ backgroundColor: 'hsl(var(--risk-low) / 0.22)' }}
              >
                <Check size={12} strokeWidth={3} className="text-risk-low" />
              </span>
              <span className="text-[14px] leading-[1.4] text-text-primary/90">
                {text}
              </span>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setAgreed((v) => !v)}
          className="mt-5 flex w-full items-center gap-3 rounded-card border bg-surface/60 px-4 py-3.5 text-left transition"
          style={{ borderColor: agreed ? 'hsl(var(--laranja))' : 'hsl(var(--surface-2))' }}
        >
          <span
            className="grid h-6 w-6 flex-none place-items-center rounded-md transition"
            style={{
              backgroundColor: agreed ? 'hsl(var(--laranja))' : 'hsl(var(--surface-2))',
            }}
          >
            {agreed ? <Check size={15} strokeWidth={3} className="text-text-on-brand" /> : null}
          </span>
          <span className="text-[14px] font-semibold text-text-primary">
            Li e concordo com os termos
          </span>
        </button>
      </div>

      <div className="flex flex-col items-center gap-2 px-6 pb-6 pt-3">
        <PrimaryButton
          trailingIcon="→"
          disabled={!agreed}
          onClick={() => navigate('/onboarding/profile')}
        >
          Continuar
        </PrimaryButton>
        <TextLink>Ler termos completos</TextLink>
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
