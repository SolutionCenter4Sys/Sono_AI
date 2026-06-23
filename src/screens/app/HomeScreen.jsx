import { useNavigate } from 'react-router-dom';
import PrimaryButton from '@/components/primitives/PrimaryButton.jsx';
import TextLink from '@/components/primitives/TextLink.jsx';
import MoonIcon from '@/components/icons/MoonIcon.jsx';
import StarsField from '@/components/icons/StarsField.jsx';
import { useSleepState } from '@/state/SleepStateContext.jsx';

export default function HomeScreen() {
  const navigate = useNavigate();
  const { reset, prepareDemo } = useSleepState();

  const startAnalysis = () => {
    reset();
    navigate('/app/loading');
  };

  const startDemo = () => {
    prepareDemo();
    navigate('/app/result');
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <header className="px-6 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <span className="block h-2.5 w-2.5 rounded-full bg-laranja" />
          <span className="text-lg font-bold tracking-tight">Instituto do Sono</span>
          <span
            className="text-[9px] font-semibold uppercase tracking-[0.18em] px-1.5 py-0.5 rounded-md"
            style={{ backgroundColor: 'hsl(var(--laranja) / 0.16)', color: 'hsl(var(--laranja))' }}
          >
            Protótipo
          </span>
        </div>
        <p className="mt-0.5 text-[11px] font-medium uppercase tracking-kicker text-baunilha/60">
          AFIP · Foursys
        </p>
      </header>

      {/* Hero — moon + stars */}
      <div className="relative h-[280px]">
        <StarsField className="absolute inset-0 h-full w-full" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div
            className="h-[240px] w-[240px] rounded-full"
            style={{
              background:
                'radial-gradient(circle, hsl(var(--menta) / 0.25) 0%, hsl(var(--menta) / 0.05) 60%, transparent 75%)',
            }}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <MoonIcon size={140} />
        </div>
      </div>

      {/* Copy */}
      <div className="px-8 pt-4 pb-2 text-center">
        <h1 className="text-[30px] font-bold leading-[1.1] tracking-tight">
          Vamos analisar
          <br />
          seu sono
        </h1>
        <p className="mt-3 text-[15px] leading-[1.45] text-baunilha/70">
          Conecte seu Galaxy Watch e veja como anda seu sono em
          menos de 5 minutos.
        </p>
      </div>

      <div className="flex-1" />

      {/* Actions */}
      <div className="flex flex-col items-center gap-3 px-6 pb-4">
        <PrimaryButton trailingIcon="→" onClick={startAnalysis}>
          Iniciar análise
        </PrimaryButton>
        <TextLink onClick={startDemo}>Usar modo demo</TextLink>
      </div>

      {/* Footer */}
      <footer className="flex items-center justify-center gap-2 px-6 pb-6">
        <span aria-hidden className="text-xs text-menta/90">⌂</span>
        <span className="text-[11px] font-medium tracking-wider text-baunilha/45">
          Health Connect  •  dados processados localmente
        </span>
      </footer>
    </div>
  );
}
