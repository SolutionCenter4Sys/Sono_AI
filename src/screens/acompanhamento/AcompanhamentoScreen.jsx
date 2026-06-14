import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  CalendarClock,
  Activity,
  Sparkles,
  CheckCircle2,
  CircleDashed,
  Loader2,
  Wind,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import PrimaryButton from '@/components/primitives/PrimaryButton.jsx';
import TextLink from '@/components/primitives/TextLink.jsx';
import {
  RETURNS,
  ADHERENCE,
  nextReturn,
  daysUntil,
  fmtBR,
  returnMeta,
} from '@/data/followUpMock.js';

/**
 * /acompanhamento · Hub de acompanhamento pós-laudo (ADR-028 · WEB-EP-09-FT-05).
 * Hero próximo retorno + timeline + aderência + evolução clínica.
 */
export default function AcompanhamentoScreen() {
  const navigate = useNavigate();
  const next = nextReturn();
  const daysToNext = next ? daysUntil(next.plannedDate) : null;
  const anticipated = next?.triggeredBy === 'clinical';
  const heroColor = anticipated ? 'laranja' : 'menta';

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

      <div className="flex-1 overflow-y-auto px-5 pb-6">
        {/* Hero — próximo retorno */}
        {next && (
          <section
            className="rounded-card-lg p-6"
            style={{
              background: `linear-gradient(135deg, hsl(var(--${heroColor}) / 0.18) 0%, hsl(var(--sun-moon) / 0.10) 100%)`,
              border: `1px solid hsl(var(--${heroColor}) / 0.38)`,
            }}
          >
            <div className="flex items-center gap-2">
              <span
                className="grid h-7 w-7 place-items-center rounded-lg"
                style={{ backgroundColor: `hsl(var(--${heroColor}) / 0.22)` }}
              >
                <CalendarClock size={14} style={{ color: `hsl(var(--${heroColor}))` }} />
              </span>
              <span
                className="text-[11px] font-semibold uppercase tracking-kicker"
                style={{ color: `hsl(var(--${heroColor}))` }}
              >
                Próximo retorno
              </span>
              {anticipated && (
                <span className="ml-auto rounded-pill bg-laranja/22 px-2 py-0.5 text-[10px] font-bold text-laranja">
                  ANTECIPADO
                </span>
              )}
            </div>
            <p className="mt-3 text-[13px] uppercase tracking-kicker text-baunilha/60">
              Em
            </p>
            <h1 className="mt-1 text-[40px] font-bold leading-none tracking-tight">
              {daysToNext} <span className="text-baunilha/55 text-[24px]">dias</span>
            </h1>
            <p className="mt-2 text-[13px] text-baunilha/70">
              {fmtBR(next.plannedDate)} · {next.doctor}
            </p>
            {anticipated && next.triggerReason && (
              <div className="mt-4 rounded-card bg-marinho-deep/40 p-3 border border-laranja/25">
                <p className="text-[11px] font-semibold uppercase tracking-kicker text-laranja">
                  Por que antecipamos
                </p>
                <p className="mt-1.5 text-[12.5px] leading-[1.5] text-text-primary/85">
                  {next.triggerReason}
                </p>
              </div>
            )}
            <button
              type="button"
              onClick={() => navigate(`/acompanhamento/retorno/${next.id}`)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-button bg-laranja py-3 text-[14px] font-semibold text-text-on-brand"
            >
              Ver pré-consulta <ChevronRight size={16} />
            </button>
          </section>
        )}

        {/* Aderência ao tratamento */}
        <section className="mt-4 rounded-card bg-surface p-5">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
            Aderência ao tratamento
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Stat
              icon={<Wind size={14} className="text-menta" />}
              label="CPAP / noite"
              value={`${ADHERENCE.cpapHoursAvg7d}h`}
              detail="média 7 dias"
            />
            <Stat
              icon={<TrendingUp size={14} className="text-menta" />}
              label="Aderência 30d"
              value={`${ADHERENCE.cpapAdherencePct}%`}
              detail={`${ADHERENCE.cpapNightsUsed30d} de 30 noites`}
            />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Stat
              icon={<TrendingDown size={14} className="text-menta" />}
              label="Peso"
              value={`${ADHERENCE.habits.weightChangeKg.toFixed(1)} kg`}
              detail="desde diagnóstico"
            />
            <Stat
              icon={<Activity size={14} className="text-menta" />}
              label="Atividade"
              value={`${ADHERENCE.habits.exerciseMinAvg} min`}
              detail="média diária"
            />
          </div>
        </section>

        {/* Timeline de retornos */}
        <section className="mt-4 rounded-card bg-surface p-5">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
            Timeline dos retornos
          </p>
          <p className="mt-1 text-[14px] font-bold">
            {RETURNS.filter(r => r.status === 'done').length} concluídos · próximo destacado
          </p>
          <div className="mt-3 flex flex-col gap-2">
            {RETURNS.map((r) => (
              <ReturnRow
                key={r.id}
                ret={r}
                onClick={() => navigate(`/acompanhamento/retorno/${r.id}`)}
              />
            ))}
          </div>
        </section>

        {/* Evolução clínica resumo */}
        <section className="mt-4 rounded-card bg-surface p-5">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
            Evolução do AHI
          </p>
          <p className="mt-1 text-[12.5px] text-baunilha/65">
            Comparação entre os retornos concluídos
          </p>
          <AhiMiniChart />
        </section>
      </div>

      <footer className="flex flex-col items-center gap-3 px-6 pb-5 pt-3">
        <PrimaryButton trailingIcon="→" onClick={() => navigate('/sono-ai/full')} leadingIcon={<Sparkles size={16} />}>
          Tirar dúvidas com Sono AI
        </PrimaryButton>
        <TextLink onClick={() => navigate('/inicio')}>Voltar para o início</TextLink>
      </footer>
    </div>
  );
}

/* ----------------------------------------------------- Sub-components */

function Stat({ icon, label, value, detail }) {
  return (
    <div className="rounded-card bg-surface-2/40 p-3">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-[10px] font-semibold uppercase tracking-kicker text-baunilha/55">
          {label}
        </span>
      </div>
      <p className="mt-1 text-[18px] font-bold text-text-primary/95">{value}</p>
      <p className="mt-0.5 text-[10.5px] text-baunilha/55">{detail}</p>
    </div>
  );
}

function ReturnRow({ ret, onClick }) {
  const meta = returnMeta(ret);
  const isDone = ret.status === 'done';
  const isNext = ret.status === 'scheduled';
  const isPending = ret.status === 'pending';
  const Icon = isDone ? CheckCircle2 : isNext ? Loader2 : CircleDashed;
  const fade = isPending ? 'opacity-55' : '';
  const ring = isNext ? 'ring-2 ring-laranja/40' : '';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isPending}
      className={`flex items-center gap-3 rounded-card bg-surface-2/40 p-3.5 text-left transition hover:bg-surface-2/70 disabled:cursor-not-allowed ${fade} ${ring}`}
    >
      <span
        className="grid h-10 w-10 shrink-0 place-items-center rounded-full"
        style={{ backgroundColor: `hsl(var(--${meta.color}) / 0.18)` }}
      >
        <Icon
          size={18}
          style={{ color: `hsl(var(--${meta.color}))` }}
          className={isNext ? 'animate-spin' : ''}
        />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[13.5px] font-semibold text-text-primary/95">
          {ret.type} · {fmtBR(ret.plannedDate)}
        </p>
        <p className="mt-0.5 text-[11.5px] text-baunilha/55">
          {isDone && ret.snapshot && `AHI ${ret.snapshot.ahi} · Aderência ${ret.snapshot.cpapAdherence}%`}
          {isNext && (ret.triggerReason ? 'Antecipado · ver detalhe' : 'Programado · ver detalhe')}
          {isPending && 'Aguardando data'}
        </p>
      </div>
      <span
        className="shrink-0 rounded-pill px-2 py-0.5 text-[10px] font-bold"
        style={{
          backgroundColor: `hsl(var(--${meta.color}) / 0.18)`,
          color: `hsl(var(--${meta.color}))`,
        }}
      >
        {meta.label}
      </span>
      {!isPending && <ChevronRight size={16} className="text-baunilha/40" />}
    </button>
  );
}

function AhiMiniChart() {
  const done = RETURNS.filter((r) => r.status === 'done' && r.snapshot);
  const max = Math.max(...done.map((r) => r.snapshot.ahi), 30);
  return (
    <div className="mt-3 flex h-[100px] items-end justify-around gap-2">
      {done.map((r) => {
        const h = (r.snapshot.ahi / max) * 100;
        const col = r.snapshot.ahi >= 15 ? 'risk-moderate' : r.snapshot.ahi >= 5 ? 'menta' : 'risk-low';
        return (
          <div key={r.id} className="flex flex-1 flex-col items-center gap-1">
            <span className="text-[10px] font-bold text-baunilha/70">{r.snapshot.ahi}</span>
            <div
              className="w-full rounded-t-md"
              style={{
                height: `${h}%`,
                backgroundColor: `hsl(var(--${col}))`,
              }}
            />
            <span className="text-[10px] text-baunilha/55">{r.type.split(' ')[0]}</span>
          </div>
        );
      })}
      {/* Próximo retorno como placeholder dashed */}
      <div className="flex flex-1 flex-col items-center gap-1">
        <span className="text-[10px] font-bold text-laranja">?</span>
        <div
          className="w-full rounded-t-md border-2 border-dashed border-laranja/50"
          style={{ height: '50%', backgroundColor: 'transparent' }}
        />
        <span className="text-[10px] text-laranja">D+150</span>
      </div>
    </div>
  );
}

