import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import PrimaryButton from '@/components/primitives/PrimaryButton.jsx';
import TextLink from '@/components/primitives/TextLink.jsx';

const ACTIONS = [
  {
    num: '①',
    tone: 'laranja',
    title: 'Iniciar tratamento CPAP',
    sub: 'Agende ajuste e titulação',
    badge: 'Urgente',
  },
  {
    num: '②',
    tone: 'menta',
    title: 'Agendar consulta retorno · 3 meses',
    sub: 'Acompanhamento pneumologista',
    badge: 'Programado',
  },
  {
    num: '③',
    tone: 'sun-moon',
    title: 'Material educativo sobre AOS',
    sub: '+50 pts no Sleep Score',
    arrow: true,
  },
  {
    num: '④',
    tone: 'risk-moderate',
    title: 'Compartilhar laudo com clínico geral',
    sub: 'Integração FHIR',
    arrow: true,
  },
];

export default function NextStepsScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col">
      {/* TopBar */}
      <div className="flex items-center justify-between px-4 py-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-2/60 text-text-primary"
          aria-label="Voltar"
        >
          <ChevronLeft size={20} />
        </button>
        <span className="text-xs font-semibold uppercase tracking-kicker text-baunilha/60">
          Próximos passos
        </span>
        <span className="h-10 w-10" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-4">
        <span className="text-xs font-semibold uppercase tracking-kicker text-sun-moon">
          Após o diagnóstico
        </span>
        <h1 className="mt-1 text-2xl font-bold text-text-primary">Próximas ações</h1>
        <p className="mt-2 text-sm text-baunilha/80">
          Com o laudo assinado, aqui está o plano de cuidado.
        </p>

        {/* Action cards */}
        <div className="mt-4 space-y-3">
          {ACTIONS.map((a) => (
            <div key={a.num} className="flex items-center gap-3 rounded-card bg-surface p-3.5">
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl font-bold text-marinho-deep"
                style={{ backgroundColor: `hsl(var(--${a.tone}))` }}
              >
                {a.num}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-text-primary">{a.title}</p>
                <p
                  className="text-xs"
                  style={{
                    color:
                      a.tone === 'sun-moon'
                        ? 'hsl(var(--sun-moon))'
                        : 'hsl(var(--baunilha))',
                  }}
                >
                  {a.sub}
                </p>
              </div>
              {a.badge ? (
                <span
                  className="shrink-0 rounded-pill px-2.5 py-1 text-[9px] font-bold uppercase tracking-kicker"
                  style={{
                    backgroundColor: `hsl(var(--${a.tone}) / 0.18)`,
                    color: `hsl(var(--${a.tone}))`,
                  }}
                >
                  {a.badge}
                </span>
              ) : (
                <span className="shrink-0 text-lg font-bold text-baunilha/80">→</span>
              )}
            </div>
          ))}
        </div>

        {/* Reminder (menta) */}
        <div className="mt-3 flex items-start gap-2.5 rounded-card bg-menta p-3.5">
          <span className="text-base">💡</span>
          <div>
            <p className="text-xs font-semibold text-text-primary">Uma dica</p>
            <p className="mt-1 text-xs leading-relaxed text-marinho-deep/80">
              Acompanhe sua adesão ao CPAP pelo app no dia a dia — e ainda ganhe pontos no Sleep Score.
            </p>
          </div>
        </div>
        <div className="h-4" />
      </div>

      <footer className="px-6 pb-4 pt-3 flex flex-col items-center gap-2">
        <PrimaryButton trailingIcon="→" onClick={() => navigate('/score')}>
          Acompanhar meu tratamento
        </PrimaryButton>
        <TextLink onClick={() => navigate('/inicio')}>Ir para o início</TextLink>
      </footer>
    </div>
  );
}
