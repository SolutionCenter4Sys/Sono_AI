import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import TextLink from '@/components/primitives/TextLink.jsx';

/**
 * 08.5 Régua de acompanhamento (WhatsApp) — timeline de mensagens AFIP.
 * Figma 44:232.
 */
const STEPS = [
  {
    title: 'D+0 · Bem-vindo',
    body: 'Olá! Aqui vai um resumo do que esperar nas próximas semanas...',
    status: 'enviado',
    dot: 'menta',
  },
  {
    title: 'D+5 · Como você está?',
    body: 'Passados 5 dias, queremos saber: como tem sido seu sono? Responda esta breve enquete.',
    status: 'enviado',
    dot: 'menta',
  },
  {
    title: 'D+30 · 1º acompanhamento',
    body: 'Disponível em 12 dias',
    status: 'proximo',
    dot: 'sun-moon',
  },
  {
    title: 'D+90 · Revisão do plano',
    body: 'Disponível em 72 dias',
    status: 'futuro',
    dot: 'surface-2',
  },
];

const STATUS = {
  enviado: { label: 'ENVIADO', color: 'menta', bg: 'hsl(var(--menta) / 0.16)' },
  proximo: { label: 'PRÓXIMO', color: 'sun-moon', bg: 'hsl(var(--sun-moon) / 0.18)' },
  futuro: { label: 'FUTURO', color: 'baunilha', bg: 'hsl(var(--surface-2) / 0.7)' },
};

export default function WhatsappJourneyScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center justify-between px-4 pt-4 pb-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Voltar"
          className="grid h-10 w-10 place-items-center rounded-full bg-surface-2/60 text-text-primary/90 transition hover:bg-surface-2"
        >
          <ChevronLeft size={20} strokeWidth={2.4} />
        </button>
        <span className="text-[12px] font-semibold uppercase tracking-kicker text-baunilha/70">
          Acompanhamento
        </span>
        <span className="h-10 w-10" aria-hidden />
      </header>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <p className="mt-2 text-[11px] font-semibold uppercase tracking-kicker text-menta">
          Jornada AFIP
        </p>
        <h1 className="mt-1.5 text-[26px] font-bold leading-tight">
          Suas mensagens de acompanhamento
        </h1>
        <p className="mt-2 text-[14px] leading-[1.5] text-baunilha/65">
          A AFIP mantém contato em momentos-chave do seu tratamento.
        </p>

        {/* Timeline */}
        <div className="relative mt-6 pl-7">
          <span
            className="absolute left-[5px] top-2 bottom-2 w-px"
            style={{ backgroundColor: 'hsl(var(--surface-2))' }}
            aria-hidden
          />
          <div className="flex flex-col gap-3.5">
            {STEPS.map((step) => {
              const status = STATUS[step.status];
              return (
                <div key={step.title} className="relative">
                  <span
                    className="absolute -left-[26px] top-4 h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: `hsl(var(--${step.dot}))` }}
                    aria-hidden
                  />
                  <div className="rounded-card bg-surface p-4">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-[14px] font-bold leading-snug">{step.title}</p>
                      <span
                        className="shrink-0 rounded-pill px-2 py-1 text-[10px] font-bold tracking-kicker"
                        style={{ backgroundColor: status.bg, color: `hsl(var(--${status.color}))` }}
                      >
                        {status.label}
                      </span>
                    </div>
                    <p className="mt-2 text-[12px] leading-[1.5] text-baunilha/60">{step.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <footer className="flex flex-col items-center gap-3 px-6 pb-5 pt-3">
        <button
          type="button"
          onClick={() => navigate('/score')}
          className="w-full rounded-button py-3.5 text-base font-semibold text-marinho-deep"
          style={{ backgroundColor: 'hsl(var(--menta))' }}
        >
          Ativar lembretes extras
        </button>
        <TextLink onClick={() => navigate('/score')}>Preferências</TextLink>
      </footer>
    </div>
  );
}
