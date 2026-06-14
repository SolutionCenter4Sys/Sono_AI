import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import PrimaryButton from '@/components/primitives/PrimaryButton.jsx';
import TextLink from '@/components/primitives/TextLink.jsx';

const SEXES = ['Masculino', 'Feminino', 'Outro'];

export default function ProfileScreen() {
  const navigate = useNavigate();
  const [age, setAge] = useState('42 anos');
  const [sex, setSex] = useState('Masculino');
  const [weight, setWeight] = useState('78 kg');
  const [height, setHeight] = useState('175 cm');

  return (
    <div className="flex h-full flex-col">
      <StepHeader step={2} onBack={() => navigate(-1)} />

      <div className="flex-1 overflow-y-auto px-6 pt-4">
        <p className="text-[12px] font-semibold uppercase tracking-kicker text-menta">
          Perfil clínico
        </p>
        <h1 className="mt-1.5 text-[28px] font-bold leading-[1.12] tracking-tight">
          Vamos te conhecer
        </h1>
        <p className="mt-3 text-[15px] leading-[1.45] text-baunilha/70">
          Esses dados ajudam o algoritmo a calibrar a análise para o seu perfil.
        </p>

        <div className="mt-6 space-y-5">
          <Field label="Idade">
            <input
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full rounded-card bg-surface px-4 py-3.5 text-[16px] font-medium text-text-primary outline-none focus:ring-1 focus:ring-laranja/60"
            />
          </Field>

          <div>
            <FieldLabel>Sexo</FieldLabel>
            <div className="grid grid-cols-3 gap-2.5">
              {SEXES.map((option) => {
                const active = sex === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSex(option)}
                    className="rounded-card border px-2 py-3 text-[14px] font-semibold transition"
                    style={{
                      backgroundColor: active ? 'hsl(var(--laranja) / 0.12)' : 'hsl(var(--surface))',
                      borderColor: active ? 'hsl(var(--laranja))' : 'transparent',
                      color: active ? 'hsl(var(--laranja))' : 'hsl(var(--text-primary))',
                    }}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          <Field label="Peso (kg) — opcional">
            <input
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full rounded-card bg-surface px-4 py-3.5 text-[16px] font-medium text-text-primary outline-none focus:ring-1 focus:ring-laranja/60"
            />
          </Field>

          <Field label="Altura (cm) — opcional">
            <input
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full rounded-card bg-surface px-4 py-3.5 text-[16px] font-medium text-text-primary outline-none focus:ring-1 focus:ring-laranja/60"
            />
          </Field>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 px-6 pb-6 pt-3">
        <PrimaryButton trailingIcon="→" onClick={() => navigate('/onboarding/face/instructions')}>
          Continuar
        </PrimaryButton>
        <TextLink onClick={() => navigate('/onboarding/face/instructions')}>
          Pular dados opcionais
        </TextLink>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      {children}
    </div>
  );
}

function FieldLabel({ children }) {
  return (
    <p className="mb-2 text-[12px] font-semibold uppercase tracking-kicker text-baunilha/70">
      {children}
    </p>
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
