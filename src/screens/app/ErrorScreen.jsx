import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import PrimaryButton from '@/components/primitives/PrimaryButton.jsx';
import TextLink from '@/components/primitives/TextLink.jsx';
import ErrorGlyph from '@/components/primitives/ErrorGlyph.jsx';
import { useSleepState } from '@/state/SleepStateContext.jsx';

/** Cada case mapeia para visual, copy e CTA distintos (BACKLOG EP-03-FT-06). */
const ERROR_CASES = {
  hcNotInstalled: {
    severity: 'moderate',
    glyph: '!',
    kicker: 'Dependência ausente',
    title: 'Health Connect não\nestá instalado',
    body: 'Precisamos do app Health Connect para acessar os dados do seu Galaxy Watch. A instalação leva menos de um minuto.',
    bullets: [
      'Conecta o Galaxy Watch ao app',
      'Lê sono, FC e SpO₂ da última noite',
      'Mantém os dados no seu dispositivo',
    ],
    bulletsTitle: 'O que instalar Health Connect faz',
    ctaLabel: 'Instalar Health Connect',
    ctaIcon: '↗',
    secondary: ['retry', 'demo'],
  },
  sdkOutdated: {
    severity: 'moderate',
    glyph: '⟳',
    kicker: 'Atualização necessária',
    title: 'Health Connect precisa\nser atualizado',
    body: 'A versão instalada do Health Connect é antiga demais para acessar dados de SpO₂. Atualize pela Play Store em 1 clique.',
    bullets: [
      'Health Connect 1.1+ instalado',
      'Acesso a sono, FC e SpO₂',
      'Suporte a sessões noturnas',
    ],
    bulletsTitle: 'Versão mínima requerida',
    ctaLabel: 'Atualizar Health Connect',
    ctaIcon: '↗',
    secondary: ['retry', 'demo'],
  },
  androidTooOld: {
    severity: 'critical',
    glyph: '✕',
    kicker: 'Requer Android 10+',
    title: 'Este Android ainda\nnão roda o Instituto do Sono',
    body: 'Precisamos de Android 10 ou mais recente. Que tal explorar como o app funciona no modo demo enquanto isso?',
    bullets: [
      'Health Connect requer Android 10+',
      'Acesso seguro a dados de saúde',
      'API de leitura noturna estável',
    ],
    bulletsTitle: 'Por que a restrição',
    ctaLabel: null,
    secondary: ['demo'],
  },
  permissionDenied: {
    severity: 'moderate',
    glyph: '⊘',
    kicker: 'Permissão necessária',
    title: 'Não temos acesso\naos seus dados',
    body: 'Você negou permissão para o Instituto do Sono ler dados do Health Connect. Habilite nas Configurações do sistema para continuar.',
    bullets: [
      'Sessões de sono (Health Connect)',
      'Frequência cardíaca noturna',
      'Saturação de O₂ (SpO₂)',
    ],
    bulletsTitle: 'Dados que precisamos',
    ctaLabel: 'Abrir Configurações',
    ctaIcon: '⚙',
    secondary: ['retry', 'demo'],
  },
  sessionNotFound: {
    severity: 'info',
    glyph: '?',
    kicker: 'Sem dados noturnos',
    title: 'Nenhuma noite\nencontrada',
    body: 'Não achamos uma sessão de sono nas últimas 36h. Use o app após acordar com o watch — ou veja como funciona em modo demo.',
    bullets: [
      'Use o Galaxy Watch para dormir',
      'Sincronize com Samsung Health',
      'Abra o Instituto do Sono após acordar',
    ],
    bulletsTitle: 'Dicas',
    ctaLabel: 'Tentar novamente',
    ctaIcon: '↻',
    secondary: ['demo'],
  },
};

export default function ErrorScreen() {
  const navigate = useNavigate();
  const { case: caseParam } = useParams();
  const { prepareDemo } = useSleepState();

  const errorCase = caseParam ?? 'hcNotInstalled';
  const cfg = ERROR_CASES[errorCase] ?? ERROR_CASES.sessionNotFound;

  const reset = () => navigate('/app/home');
  const startAnalysis = () => navigate('/app/loading');
  const startDemo = () => {
    prepareDemo();
    navigate('/app/result');
  };

  const handlePrimary = () => {
    if (errorCase === 'sessionNotFound') {
      startAnalysis();
    } else {
      // Para outros casos não temos efeito real no PoC; voltamos pra Home.
      reset();
    }
  };

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center px-4 pt-4 pb-2">
        <button
          type="button"
          onClick={reset}
          aria-label="Voltar"
          className="grid h-10 w-10 place-items-center rounded-full bg-surface-2/60 text-text-primary/90 transition hover:bg-surface-2"
        >
          <ChevronLeft size={20} strokeWidth={2.4} />
        </button>
      </header>

      <section className="flex flex-col items-center px-8 pt-10 pb-2">
        <ErrorGlyph severity={cfg.severity} char={cfg.glyph} size={160} />
        <p
          className="mt-6 text-[11px] font-semibold uppercase tracking-kicker"
          style={{
            color: `hsl(var(--${cfg.severity === 'info' ? 'menta' : `risk-${cfg.severity}`}))`,
          }}
        >
          {cfg.kicker}
        </p>
        <h1 className="mt-2 text-[26px] font-bold leading-[1.15] tracking-tight text-center whitespace-pre-line">
          {cfg.title}
        </h1>
        <p className="mt-3 text-center text-sm leading-[1.5] text-baunilha/65">
          {cfg.body}
        </p>
      </section>

      <div className="px-6 pt-6">
        <div className="rounded-[16px] bg-surface p-4">
          <h2 className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/50 mb-3">
            {cfg.bulletsTitle}
          </h2>
          <ul className="space-y-2.5">
            {cfg.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="grid h-5 w-5 place-items-center rounded-full text-[11px] font-bold"
                  style={{
                    backgroundColor: 'hsl(var(--risk-low) / 0.18)',
                    color: 'hsl(var(--risk-low))',
                  }}
                >
                  ✓
                </span>
                <span className="text-[13px] leading-[1.5] text-text-primary/85">
                  {b}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex-1" />

      <div className="flex flex-col items-center gap-3.5 px-6 pt-3 pb-6">
        {cfg.ctaLabel ? (
          <PrimaryButton leadingIcon={cfg.ctaIcon} onClick={handlePrimary}>
            {cfg.ctaLabel}
          </PrimaryButton>
        ) : null}
        <div className="flex justify-center gap-3">
          {cfg.secondary.includes('retry') ? (
            <TextLink onClick={startAnalysis}>Tentar novamente</TextLink>
          ) : null}
          {cfg.secondary.includes('demo') ? (
            <TextLink onClick={startDemo}>Usar modo demo</TextLink>
          ) : null}
        </div>
      </div>
    </div>
  );
}
