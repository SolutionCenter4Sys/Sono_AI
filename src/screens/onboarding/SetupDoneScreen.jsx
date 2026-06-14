import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import PrimaryButton from '@/components/primitives/PrimaryButton.jsx';
import TextLink from '@/components/primitives/TextLink.jsx';

const SUMMARY = [
  { n: 1, title: 'Consentimento', sub: 'Termos aceitos' },
  { n: 2, title: 'Perfil clínico', sub: '42 anos · masculino' },
  { n: 3, title: 'Marcadores faciais', sub: '8 marcadores extraídos' },
];

export default function SetupDoneScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto px-6 pt-10">
        {/* Success badge */}
        <div className="flex justify-center">
          <div
            className="grid h-[150px] w-[150px] place-items-center rounded-full"
            style={{
              border: '4px solid hsl(var(--risk-low) / 0.45)',
              background:
                'radial-gradient(circle, hsl(var(--risk-low) / 0.22) 0%, hsl(var(--risk-low) / 0.05) 70%, transparent 100%)',
            }}
          >
            <Check size={72} strokeWidth={2.5} className="text-risk-low" />
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-[12px] font-semibold uppercase tracking-kicker text-baunilha/60">
            Etapa 4 de 4
          </p>
          <h1 className="mt-1.5 text-[30px] font-bold leading-[1.12] tracking-tight">
            Tudo pronto!
          </h1>
          <p className="mx-auto mt-3 max-w-[320px] text-[15px] leading-[1.45] text-baunilha/70">
            Falta apenas conectar seu wearable para começar a analisar suas
            noites.
          </p>
        </div>

        <ul className="mt-7 space-y-3">
          {SUMMARY.map((item) => (
            <li
              key={item.n}
              className="flex items-center gap-3.5 rounded-card bg-surface px-4 py-3.5"
            >
              <span className="grid h-8 w-8 flex-none place-items-center rounded-full border border-menta/40 text-[13px] font-semibold text-menta">
                {item.n}
              </span>
              <div className="flex-1">
                <p className="text-[15px] font-bold text-text-primary">{item.title}</p>
                <p className="text-[12px] text-baunilha/60">{item.sub}</p>
              </div>
              <Check size={18} strokeWidth={2.6} className="text-risk-low" />
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col items-center gap-2 px-6 pb-6 pt-3">
        <PrimaryButton trailingIcon="→" onClick={() => navigate('/pairing/select')}>
          Parear meu wearable
        </PrimaryButton>
        <TextLink onClick={() => navigate('/app/home')}>Fazer depois</TextLink>
      </div>
    </div>
  );
}
