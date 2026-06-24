import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  HelpCircle,
  Sparkles,
  Moon,
  Smartphone,
  Clock,
  Coffee,
  BedDouble,
  Stethoscope,
  Users,
} from 'lucide-react';
import PrimaryButton from '@/components/primitives/PrimaryButton.jsx';
import TextLink from '@/components/primitives/TextLink.jsx';
import { useUseCase } from '@/lib/useCaseContext.jsx';
import { useSleepScoreService } from '@/lib/sleepScoreService.jsx';

const FACTOR_ICON = {
  screen: Smartphone,
  schedule: Clock,
  distance: BedDouble,
  caffeine: Coffee,
};

/**
 * 08.1 Sleep Score — higiene do sono como ferramenta de tratamento.
 * Ativado pelo médico (ver lib/sleepScoreService.jsx). Sem ranking, sem pontos
 * competitivos, sem níveis — foco em hábitos e comparativo encorajador por idade.
 */
export default function SleepCoinsScreen() {
  const navigate = useNavigate();
  const { persona } = useUseCase();
  const { active, activatedBy, hygiene } = useSleepScoreService(persona);

  if (!active) {
    return (
      <div className="flex h-full flex-col">
        <TopBar navigate={navigate} />
        <div className="flex flex-1 flex-col items-center justify-center px-6 pb-10 text-center">
          <span
            className="grid h-16 w-16 place-items-center rounded-full"
            style={{ backgroundColor: 'hsl(var(--menta) / 0.14)' }}
          >
            <Stethoscope size={28} className="text-menta" />
          </span>
          <h2 className="mt-5 text-[19px] font-bold leading-snug">
            Sleep Score é ativado pelo seu médico
          </h2>
          <p className="mt-2 max-w-[300px] text-[13px] leading-[1.55] text-baunilha/65">
            É uma ferramenta de acompanhamento da higiene do sono que faz parte do
            seu tratamento. Quando seu médico ativar, você verá aqui seu score
            diário e hábitos sugeridos.
          </p>
          <div className="mt-7 w-full max-w-[300px]">
            <PrimaryButton onClick={() => navigate('/agenda/atendimento')}>
              Falar com um especialista
            </PrimaryButton>
          </div>
          <TextLink className="mt-4" onClick={() => navigate('/inicio')}>
            Voltar ao início
          </TextLink>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <TopBar navigate={navigate} />

      <div className="flex-1 overflow-y-auto px-5 pb-8">
        {/* Ativado pelo médico */}
        <div
          className="mt-1 flex items-center gap-2 rounded-card border px-3.5 py-2.5"
          style={{
            backgroundColor: 'hsl(var(--menta) / 0.10)',
            borderColor: 'hsl(var(--menta) / 0.30)',
          }}
        >
          <Stethoscope size={14} className="shrink-0 text-menta" />
          <p className="text-[11.5px] leading-[1.4] text-text-primary/85">
            Acompanhamento ativado por <strong>{activatedBy}</strong> como parte do
            seu tratamento.
          </p>
        </div>

        {/* Score de higiene */}
        <section className="relative mt-4 overflow-hidden rounded-card-lg bg-surface p-6 text-center">
          <div className="flex flex-col items-center">
            <div
              className="grid h-[64px] w-[64px] place-items-center rounded-full"
              style={{
                backgroundColor: 'hsl(var(--menta) / 0.18)',
                boxShadow: '0 0 28px hsl(var(--menta) / 0.25)',
              }}
            >
              <Moon size={30} className="text-menta" fill="hsl(var(--menta))" />
            </div>
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
              Higiene do sono
            </p>
            <div className="mt-1 flex items-end justify-center gap-2">
              <span className="text-[52px] font-bold leading-none tracking-tight">{hygiene.score}</span>
              <span className="mb-1.5 text-sm text-baunilha/60">/100</span>
            </div>
            <span
              className="mt-4 rounded-pill px-3 py-1.5 text-[11px] font-semibold"
              style={{
                backgroundColor: hygiene.weekDelta >= 0 ? 'hsl(var(--menta) / 0.16)' : 'hsl(var(--risk-moderate) / 0.16)',
                color: hygiene.weekDelta >= 0 ? 'hsl(var(--menta))' : 'hsl(var(--risk-moderate))',
              }}
            >
              {hygiene.weekDelta >= 0 ? '↑' : '↓'} {hygiene.weekDelta >= 0 ? '+' : ''}{hygiene.weekDelta} esta semana
            </span>
          </div>
        </section>

        {/* Comparativo encorajador por idade — sem ranking/competição */}
        <section className="mt-4 rounded-card border border-menta/25 bg-surface p-5">
          <div className="flex items-center gap-2">
            <span
              className="grid h-6 w-6 place-items-center rounded-lg"
              style={{ backgroundColor: 'hsl(var(--menta) / 0.16)' }}
            >
              <Users size={13} className="text-menta" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-kicker text-menta">
              Comparativo da sua idade
            </span>
          </div>
          <p className="mt-3 text-[18px] font-bold leading-snug">
            Melhor que {hygiene.comparison.betterThanPercent}% das pessoas de {hygiene.comparison.ageBand}
          </p>
          <p className="mt-2 text-[13px] leading-[1.5] text-baunilha/65">
            {hygiene.comparison.message}
          </p>
          <p className="mt-2 text-[10px] text-baunilha/40">
            Comparativo ilustrativo · base normativa por faixa etária em validação.
          </p>
        </section>

        {/* Fatores de higiene */}
        <h3 className="mt-7 text-[17px] font-bold">O que influencia seu score</h3>
        <div className="mt-3 flex flex-col gap-2.5">
          {hygiene.factors.map((f) => (
            <FactorRow key={f.key} factor={f} />
          ))}
        </div>

        {/* Insight do dia */}
        <section className="mt-7 rounded-card border border-menta/25 bg-surface p-5">
          <div className="flex items-center gap-2">
            <span
              className="grid h-6 w-6 place-items-center rounded-lg"
              style={{ backgroundColor: 'hsl(var(--menta) / 0.16)' }}
            >
              <Sparkles size={13} className="text-menta" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-kicker text-menta">
              Insight do dia
            </span>
          </div>
          <h2 className="mt-3 text-[18px] font-bold leading-snug">
            Sua FC noturna baixou 4 bpm
          </h2>
          <p className="mt-2 text-[13px] leading-[1.5] text-baunilha/65">
            Provavelmente porque você dormiu sem cafeína à tarde nas últimas 3 noites.
            Manter esse hábito tende a melhorar seu sono profundo.
          </p>
        </section>

        {/* Hábitos em andamento — sem pontos, sem níveis */}
        <div className="mt-7 flex items-center justify-between">
          <h3 className="text-[17px] font-bold">Hábitos em andamento</h3>
          <TextLink onClick={() => navigate('/score/historico')}>Ver histórico</TextLink>
        </div>

        <div className="mt-3 flex flex-col gap-2.5">
          {hygiene.habits.map((h) => (
            <HabitRow
              key={h.key}
              title={h.title}
              progress={h.progress}
              percent={h.percent}
              color={h.color}
              onClick={() => navigate('/score/challenge/sem-cafeina')}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function TopBar({ navigate }) {
  return (
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
        Sleep Score
      </span>
      <button
        type="button"
        aria-label="Ajuda"
        className="grid h-10 w-10 place-items-center rounded-full bg-surface-2/60 text-text-primary/80 transition hover:bg-surface-2"
      >
        <HelpCircle size={18} />
      </button>
    </header>
  );
}

function FactorRow({ factor }) {
  const Icon = FACTOR_ICON[factor.key] ?? Clock;
  const tone = factor.state === 'ok' ? 'menta' : 'risk-moderate';
  return (
    <div className="flex items-start gap-3 rounded-card bg-surface p-4">
      <span
        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
        style={{ backgroundColor: `hsl(var(--${tone}) / 0.16)` }}
      >
        <Icon size={18} style={{ color: `hsl(var(--${tone}))` }} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[14px] font-semibold leading-snug text-text-primary/95">{factor.label}</p>
          <span className="shrink-0 text-[13px] font-semibold" style={{ color: `hsl(var(--${tone}))` }}>
            {factor.value}
          </span>
        </div>
        <p className="mt-0.5 text-[12px] leading-[1.4] text-baunilha/55">{factor.detail}</p>
      </div>
    </div>
  );
}

function HabitRow({ title, progress, percent, color, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.985 }}
      className="w-full rounded-card bg-surface p-4 text-left"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-[14px] font-semibold leading-snug text-text-primary/95">{title}</p>
      </div>
      <div className="mt-3">
        <div className="mb-1.5 flex items-center justify-between text-[11px]">
          <span className="text-baunilha/60">{progress}</span>
          <span className="font-semibold" style={{ color: `hsl(var(--${color}))` }}>
            {percent}%
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-pill bg-surface-2">
          <div
            className="h-full rounded-pill"
            style={{ width: `${percent}%`, backgroundColor: `hsl(var(--${color}))` }}
          />
        </div>
      </div>
    </motion.button>
  );
}
