import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  Info,
  Activity,
  Heart,
  Droplet,
  Moon,
  Stethoscope,
  ClipboardList,
  ClipboardCheck,
  Sparkles,
} from 'lucide-react';
import PrimaryButton from '@/components/primitives/PrimaryButton.jsx';
import TextLink from '@/components/primitives/TextLink.jsx';

/**
 * /pre-diagnostico · Pré-diagnóstico algorítmico (ADR-024 · WEB-EP-09-FT-04).
 * Triagem automática baseada SÓ nos dados do relógio — pré-consulta.
 * Distinto de /exame/pre-diagnostico (pós-consulta).
 */

const SIGNALS = [
  {
    key: 'spo2',
    icon: Droplet,
    label: 'SpO₂ mínima',
    value: '87%',
    detail: '3 quedas abaixo de 90% na última noite',
    color: 'risk-moderate',
  },
  {
    key: 'fc',
    icon: Heart,
    label: 'FC noturna',
    value: '68 bpm',
    detail: '+8 bpm acima do seu baseline (60)',
    color: 'laranja',
  },
  {
    key: 'sono',
    icon: Moon,
    label: 'Duração média do sono',
    value: '6h 12',
    detail: 'Abaixo das 7-9h recomendadas; sono fragmentado',
    color: 'risk-moderate',
  },
];

const NEXT_STEPS = [
  {
    icon: Stethoscope,
    title: 'Conversar com um especialista',
    body: 'Médico do sono avalia seus sinais e direciona o exame certo.',
    color: 'laranja',
  },
  {
    icon: ClipboardList,
    title: 'Aprofundar com triagem clínica',
    body: 'Questionários (Epworth, STOP-BANG, ISI, Pittsburgh) qualificam a queixa.',
    color: 'menta',
  },
  {
    icon: ClipboardCheck,
    title: 'Polissonografia para confirmar',
    body: 'Exame de sono — único caminho para diagnóstico definitivo e laudo assinado.',
    color: 'sun-moon',
  },
];

export default function PreDiagnosisAlertScreen() {
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
          Triagem assistida
        </span>
        <span className="h-10 w-10" aria-hidden />
      </header>

      <div className="flex-1 overflow-y-auto px-5 pb-6">
        {/* Aviso preliminar */}
        <div
          className="flex items-start gap-2.5 rounded-card p-3.5"
          style={{
            backgroundColor: 'hsl(var(--sun-moon) / 0.10)',
            border: '1px solid hsl(var(--sun-moon) / 0.32)',
          }}
        >
          <Info size={16} className="mt-0.5 shrink-0 text-sun-moon" />
          <p className="text-[12px] leading-[1.45] text-text-primary/85">
            <span className="font-semibold">Isto não é um diagnóstico.</span> É uma
            triagem automática baseada nos dados do seu relógio. O diagnóstico vem do
            médico, depois da consulta e do exame.
          </p>
        </div>

        {/* Hero gravidade */}
        <section
          className="mt-4 overflow-hidden rounded-card-lg p-6"
          style={{
            background:
              'linear-gradient(135deg, hsl(var(--menta) / 0.16) 0%, hsl(var(--laranja) / 0.14) 100%)',
            border: '1px solid hsl(var(--menta) / 0.32)',
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="grid h-7 w-7 place-items-center rounded-lg"
              style={{ backgroundColor: 'hsl(var(--menta) / 0.22)' }}
            >
              <Activity size={14} className="text-menta" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-kicker text-menta">
              Sinal detectado
            </span>
          </div>
          <h1 className="mt-3 text-[22px] font-bold leading-[1.2]">
            Seu sono merece atenção
          </h1>
          <p className="mt-2.5 text-[13px] leading-[1.55] text-text-primary/80">
            Nas últimas 7 noites a triagem identificou quedas repetidas de oxigenação,
            FC noturna acima do seu baseline e sono curto e fragmentado. Um médico do sono
            pode avaliar esses indícios com você.
          </p>
        </section>

        {/* Sinais detectados */}
        <section className="mt-4 rounded-card bg-surface p-5">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
            Sinais nos dados do seu relógio
          </p>
          <div className="mt-3 flex flex-col gap-2.5">
            {SIGNALS.map((s) => (
              <SignalRow key={s.key} item={s} />
            ))}
          </div>
        </section>

        {/* Por que isso importa */}
        <section className="mt-4 rounded-card bg-surface p-5">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
            Por que vale acompanhar
          </p>
          <p className="mt-2 text-[13px] leading-[1.55] text-text-primary/85">
            Alterações do sono podem se relacionar com cansaço diurno, pressão e qualidade
            de vida. Acompanhar cedo e conversar com um especialista ajuda a entender o que
            está acontecendo.
          </p>
        </section>

        {/* Próximos passos */}
        <section className="mt-4 rounded-card bg-surface p-5">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
            Próximos passos sugeridos
          </p>
          <div className="mt-3 flex flex-col gap-2.5">
            {NEXT_STEPS.map((s) => (
              <NextStepRow key={s.title} item={s} />
            ))}
          </div>
        </section>
      </div>

      <footer className="flex flex-col items-center gap-3 px-6 pb-5 pt-3">
        <PrimaryButton trailingIcon="→" onClick={() => navigate('/agenda/atendimento')}>
          Agendar atendimento
        </PrimaryButton>
        <TextLink onClick={() => navigate('/sono-ai/full')}>
          <span className="inline-flex items-center gap-1.5">
            <Sparkles size={13} /> Tirar dúvidas com o Sono AI
          </span>
        </TextLink>
      </footer>
    </div>
  );
}

function SignalRow({ item }) {
  const Icon = item.icon;
  return (
    <div className="flex items-center gap-3 rounded-card bg-surface-2/40 p-3.5">
      <span
        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
        style={{ backgroundColor: `hsl(var(--${item.color}) / 0.18)` }}
      >
        <Icon size={16} style={{ color: `hsl(var(--${item.color}))` }} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[12.5px] font-semibold text-text-primary/95">{item.label}</p>
        <p className="mt-0.5 text-[11px] text-baunilha/55">{item.detail}</p>
      </div>
      <span
        className="shrink-0 text-[16px] font-bold"
        style={{ color: `hsl(var(--${item.color}))` }}
      >
        {item.value}
      </span>
    </div>
  );
}

function NextStepRow({ item }) {
  const Icon = item.icon;
  return (
    <div className="flex items-start gap-3 rounded-card bg-surface-2/40 p-3.5">
      <span
        className="grid h-9 w-9 shrink-0 place-items-center rounded-xl"
        style={{ backgroundColor: `hsl(var(--${item.color}) / 0.18)` }}
      >
        <Icon size={16} style={{ color: `hsl(var(--${item.color}))` }} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold leading-snug text-text-primary/95">
          {item.title}
        </p>
        <p className="mt-0.5 text-[11.5px] leading-[1.4] text-baunilha/60">
          {item.body}
        </p>
      </div>
    </div>
  );
}
