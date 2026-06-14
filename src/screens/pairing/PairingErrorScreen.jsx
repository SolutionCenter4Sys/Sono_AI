import { useNavigate } from 'react-router-dom';
import ErrorGlyph from '@/components/primitives/ErrorGlyph.jsx';
import PrimaryButton from '@/components/primitives/PrimaryButton.jsx';
import TextLink from '@/components/primitives/TextLink.jsx';

const CHECKS = [
  'O Bluetooth do celular está ligado?',
  'O wearable está por perto (< 5m)?',
  'Apareceu um pop-up no relógio para confirmar?',
  'A permissão de Bluetooth está liberada?',
];

export default function PairingErrorScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto px-6 pt-12">
        <div className="flex justify-center">
          <ErrorGlyph severity="moderate" char="!" size={150} />
        </div>

        <div className="mt-6 text-center">
          <p className="text-[12px] font-semibold uppercase tracking-kicker text-risk-moderate">
            Pareamento interrompido
          </p>
          <h1 className="mt-1.5 text-[26px] font-bold leading-[1.15] tracking-tight">
            Não conseguimos
            <br />
            conectar dessa vez
          </h1>
          <p className="mx-auto mt-3 max-w-[320px] text-[15px] leading-[1.45] text-baunilha/70">
            Vamos checar alguns pontos antes de tentar de novo.
          </p>
        </div>

        <div className="mt-7 rounded-card-lg bg-surface p-5">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
            Checklist rápido
          </p>
          <ul className="mt-3.5 space-y-2.5">
            {CHECKS.map((text) => (
              <li key={text} className="flex items-center gap-3 text-[14px] text-text-primary/90">
                <span className="block h-1.5 w-1.5 flex-none rounded-full bg-laranja" />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 px-6 pb-6 pt-3">
        <PrimaryButton trailingIcon="↻" onClick={() => navigate('/pairing/searching')}>
          Tentar novamente
        </PrimaryButton>
        <TextLink onClick={() => navigate('/inicio')}>Pular pareamento</TextLink>
      </div>
    </div>
  );
}
