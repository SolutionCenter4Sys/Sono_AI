import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import PrimaryButton from '@/components/primitives/PrimaryButton.jsx';
import RiskBadge from '@/components/primitives/RiskBadge.jsx';
import TextLink from '@/components/primitives/TextLink.jsx';
import { useSleepState } from '@/state/SleepStateContext.jsx';
import { instrumentsFor } from '@/data/triagem.js';
import { REFERENCES } from '@/lib/references.js';
import { VALIDATION } from '@/lib/positioning.js';
import SourceNote from '@/components/primitives/SourceNote.jsx';

/**
 * 06.6 Score consolidado da triagem.
 * Figma 59:368.
 */
const SCORES = [
  { id: 'epworth', value: '9', label: 'ESS', color: 'text-primary' },
  { id: 'stopbang', value: '5', label: 'STOP-BANG', color: 'laranja' },
  { id: 'isi', value: '11', label: 'ISI', color: 'risk-moderate' },
  { id: 'pittsburgh', value: '9', label: 'PSQI', color: 'sun-moon' },
];

const INTERPRETATIONS = [
  {
    id: 'epworth',
    color: 'menta',
    title: 'ESS 9 · Sonolência leve',
    body: 'Vale apenas acompanhar',
  },
  {
    id: 'stopbang',
    color: 'laranja',
    title: 'STOP-BANG 5 · Vários indícios de apneia',
    body: 'Sugere investigar com polissonografia',
  },
  {
    id: 'isi',
    color: 'risk-moderate',
    title: 'ISI 11 · Sinais moderados de insônia',
    body: 'Um especialista pode orientar a conduta',
  },
  {
    id: 'pittsburgh',
    color: 'sun-moon',
    title: 'PSQI · Sono percebido como razoável',
    body: 'Difere dos dados objetivos do relógio',
  },
];

export default function TriagemScoreScreen() {
  const navigate = useNavigate();
  const { questionnaire } = useSleepState();
  const planIds = instrumentsFor(questionnaire?.complaints);
  const scores = SCORES.filter((s) => planIds.includes(s.id));
  const interpretations = INTERPRETATIONS.filter((i) => planIds.includes(i.id));
  const REF_KEY = { epworth: 'epworth', stopbang: 'stopbang', isi: 'isi', pittsburgh: 'psqi' };
  const refs = planIds.map((id) => REFERENCES[REF_KEY[id]]).filter(Boolean);

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
          Resultado da triagem
        </span>
        <span className="h-10 w-10" aria-hidden />
      </header>

      <div className="flex-1 overflow-y-auto px-5 pb-6">
        {/* Hero */}
        <section className="rounded-card bg-surface p-6 text-center">
          <div className="flex justify-center">
            <RiskBadge level="moderate" />
          </div>
          <h1 className="mt-3 text-[32px] font-bold leading-tight">Vale investigar</h1>
          <p className="mt-2 text-[13px] leading-[1.4] text-baunilha/65">
            Os indícios sugerem que vale conversar com um especialista — uma polissonografia
            pode esclarecer. Esta triagem não é um diagnóstico.
          </p>
          <span className="mt-3 inline-block rounded-pill bg-menta/15 px-3 py-1 text-[10px] font-bold uppercase tracking-kicker text-menta">
            {VALIDATION.badge}
          </span>
          <div className="my-5 h-px w-full bg-surface-2" />
          <div className="flex items-end justify-between">
            {scores.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1">
                <span
                  className="text-[22px] font-bold"
                  style={{ color: `hsl(var(--${s.color}))` }}
                >
                  {s.value}
                </span>
                <span className="text-[10px] font-medium tracking-wide text-baunilha/65">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Interpretação por instrumento */}
        <section className="mt-4 rounded-card bg-surface p-5">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-menta">
            Interpretação por instrumento
          </p>
          <div className="mt-3 flex flex-col gap-3.5">
            {interpretations.map((item) => (
              <div key={item.title} className="flex items-start gap-2.5">
                <span
                  className="mt-0.5 h-9 w-1.5 shrink-0 rounded-[3px]"
                  style={{ backgroundColor: `hsl(var(--${item.color}))` }}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold leading-snug text-text-primary/95">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-[11px] text-baunilha/60">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Próximo passo */}
        <section
          className="mt-4 rounded-card border p-5"
          style={{
            backgroundColor: 'hsl(var(--menta) / 0.12)',
            borderColor: 'hsl(var(--menta) / 0.45)',
          }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-menta">
            Próximo passo
          </p>
          <h2 className="mt-2 text-[18px] font-bold">Polissonografia indicada</h2>
          <p className="mt-2 text-[13px] leading-[1.45] text-baunilha/75">
            Vamos enviar suas respostas para o médico via Portal C2 (com seu consentimento). Ele
            revisa, sugere CID-10 e indica clínica.
          </p>
        </section>

        <SourceNote className="mt-4" sources={refs} />
      </div>

      <footer className="flex flex-col items-center gap-3 px-5 pb-5 pt-3">
        <PrimaryButton leadingIcon="→" onClick={() => navigate('/agenda/atendimento')}>
          Agendar atendimento
        </PrimaryButton>
        <TextLink onClick={() => navigate('/sono-ai/full')}>Tirar dúvidas com o Sono AI</TextLink>
      </footer>
    </div>
  );
}
