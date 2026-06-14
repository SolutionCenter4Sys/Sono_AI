import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  ChevronLeft as ArrowLeftIcon,
  Star,
  TriangleAlert,
  Flame,
  Wind,
  Moon,
  CheckSquare,
  Download,
} from 'lucide-react';
import PrimaryButton from '@/components/primitives/PrimaryButton.jsx';
import TextLink from '@/components/primitives/TextLink.jsx';
import { comingSoon } from '@/lib/demoToast.js';
import {
  NIGHTS,
  APNEA_BANDS,
  METRIC_META,
  CHALLENGE_HISTORY,
  sliceSeries,
  avg,
  dayLabel,
} from '@/data/historyMock.js';

/**
 * 08.4 Histórico de tendências (ADR-021 · WEB-EP-09-FT-03).
 * Tabs de métrica (Sono / Apneia / FC / SpO2) + chips de range (anterior / 7d / 15d / 30d)
 * + janela navegável de 7 dias + card comparativo + histórico de desafios.
 */

const METRIC_TABS = ['sleep', 'ahi', 'hrAvg', 'spo2Min'];
const RANGES = [
  { id: 'prev', label: 'Noite anterior', days: 2 },
  { id: '7d', label: '7 dias', days: 7 },
  { id: '15d', label: '15 dias', days: 15 },
  { id: '30d', label: '30 dias', days: 30 },
];
const WINDOW_SIZE = 7;
const TOTAL = NIGHTS.length;

export default function NightsHistoryScreen() {
  const navigate = useNavigate();
  const [metricKey, setMetricKey] = useState('sleep');
  const [rangeId, setRangeId] = useState('7d');
  const [windowOffset, setWindowOffset] = useState(0); // 0 = janela mais recente

  const meta = METRIC_META[metricKey];
  const range = RANGES.find((r) => r.id === rangeId);

  // Faixa total do range (a partir de "hoje", olhando para trás)
  const rangeStart = Math.max(0, TOTAL - range.days);
  const rangeEnd = TOTAL;

  // Janela visível (7 dias, navegável quando range > 7d). Para "Noite anterior" (2d), exibe os 2 valores.
  const winSize = Math.min(WINDOW_SIZE, range.days);
  const maxOffset = Math.max(0, range.days - winSize);
  const clampedOffset = Math.min(windowOffset, maxOffset);
  const winEnd = rangeEnd - clampedOffset;
  const winStart = Math.max(rangeStart, winEnd - winSize);

  const windowSeries = useMemo(
    () => sliceSeries(metricKey, winStart, winEnd),
    [metricKey, winStart, winEnd],
  );
  const rangeSeries = useMemo(
    () => sliceSeries(metricKey, rangeStart, rangeEnd),
    [metricKey, rangeStart, rangeEnd],
  );
  const prevRangeSeries = useMemo(
    () =>
      sliceSeries(
        metricKey,
        Math.max(0, rangeStart - range.days),
        rangeStart,
      ),
    [metricKey, rangeStart, range.days],
  );

  const rangeAvg = avg(rangeSeries);
  const prevAvg = avg(prevRangeSeries);
  const delta = rangeAvg - prevAvg;

  // Trocar métrica/range volta para a janela mais recente
  const onMetric = (k) => {
    setMetricKey(k);
    setWindowOffset(0);
  };
  const onRange = (id) => {
    setRangeId(id);
    setWindowOffset(0);
  };

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center justify-between px-4 pt-4 pb-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Voltar"
          className="grid h-10 w-10 place-items-center rounded-full bg-surface-2/60 text-text-primary/90 transition hover:bg-surface-2"
        >
          <ArrowLeftIcon size={20} strokeWidth={2.4} />
        </button>
        <span className="text-[12px] font-semibold uppercase tracking-kicker text-baunilha/70">
          Histórico
        </span>
        <span className="h-10 w-10" aria-hidden />
      </header>

      <div className="flex-1 overflow-y-auto px-5 pb-6">
        {/* Tabs de métrica */}
        <MetricTabs current={metricKey} onChange={onMetric} />

        {/* Chips de range */}
        <RangeChips current={rangeId} onChange={onRange} />

        {/* Card comparativo */}
        <ComparativeCard
          meta={meta}
          avg={rangeAvg}
          delta={delta}
          rangeLabel={range.label.toLowerCase()}
        />

        {/* Chart + navegação de janela */}
        <section className="mt-4 rounded-card bg-surface p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
                {meta.label} por noite
              </p>
              <p className="mt-1 text-[14px] font-bold">
                {windowLabel(winStart, winEnd, range.days)}
              </p>
            </div>
            {range.days > WINDOW_SIZE && (
              <WindowNav
                offset={clampedOffset}
                maxOffset={maxOffset}
                onPrev={() => setWindowOffset((o) => Math.min(maxOffset, o + 1))}
                onNext={() => setWindowOffset((o) => Math.max(0, o - 1))}
              />
            )}
          </div>

          <div className="mt-4">
            {meta.chart === 'bar' ? (
              <BarChart series={windowSeries} meta={meta} />
            ) : (
              <LineChart series={windowSeries} meta={meta} />
            )}
          </div>

          {/* Legenda para apneia */}
          {metricKey === 'ahi' && <ApneaLegend />}
        </section>

        {/* Histórico de desafios */}
        <section className="mt-4 rounded-card bg-surface p-5">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
            Desafios
          </p>
          <p className="mt-1 text-[14px] font-bold">Em curso e concluídos</p>
          <div className="mt-3 flex flex-col gap-2.5">
            {CHALLENGE_HISTORY.map((c) => (
              <ChallengeHistoryRow key={c.id} item={c} />
            ))}
          </div>
        </section>

        {/* Recordes */}
        <section className="mt-4 rounded-card bg-surface p-5">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
            Recordes
          </p>
          <div className="mt-3 flex flex-col gap-3">
            <RecordRow
              icon={<Star size={16} className="text-menta" />}
              label="Melhor noite: 89"
              meta="13 dias atrás"
            />
            <RecordRow
              icon={<TriangleAlert size={16} className="text-risk-moderate" />}
              label="Pior noite: 38"
              meta="23 dias atrás"
            />
            <RecordRow
              icon={<Flame size={16} className="text-laranja" />}
              label="5 noites > 60"
              meta="Sequência atual"
            />
          </div>
        </section>
      </div>

      <footer className="flex flex-col items-center gap-3 px-5 pb-5 pt-3">
        <PrimaryButton leadingIcon={<Download size={18} />} onClick={() => comingSoon('Exportar PDF')}>
          Exportar PDF
        </PrimaryButton>
        <TextLink onClick={() => navigate('/score')}>Voltar para Sleep Score</TextLink>
      </footer>
    </div>
  );
}

/* ---------------------------------------------------------------- Tabs / chips */

function MetricTabs({ current, onChange }) {
  return (
    <div className="mt-1 flex gap-1.5 rounded-pill bg-surface-2/40 p-1">
      {METRIC_TABS.map((k) => {
        const active = current === k;
        return (
          <button
            key={k}
            type="button"
            onClick={() => onChange(k)}
            className={
              'flex-1 rounded-pill px-2 py-2 text-[12px] font-semibold transition ' +
              (active
                ? 'bg-laranja text-text-on-brand'
                : 'text-baunilha/70 hover:text-text-primary')
            }
          >
            {METRIC_META[k].label}
          </button>
        );
      })}
    </div>
  );
}

function RangeChips({ current, onChange }) {
  return (
    <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
      {RANGES.map((r) => {
        const active = current === r.id;
        return (
          <button
            key={r.id}
            type="button"
            onClick={() => onChange(r.id)}
            className={
              'shrink-0 rounded-pill px-3 py-1.5 text-[12px] font-semibold transition ' +
              (active
                ? 'bg-text-primary/90 text-marinho-deep'
                : 'bg-surface-2/60 text-baunilha/75 hover:bg-surface-2')
            }
          >
            {r.label}
          </button>
        );
      })}
    </div>
  );
}

/* --------------------------------------------------------------- Card comparativo */

function ComparativeCard({ meta, avg, delta, rangeLabel }) {
  const positive = meta.higherIsBetter ? delta > 0 : delta < 0;
  const negative = meta.higherIsBetter ? delta < 0 : delta > 0;
  const deltaColor = positive ? 'menta' : negative ? 'laranja' : 'baunilha';
  const arrow = delta > 0 ? '↑' : delta < 0 ? '↓' : '→';
  const absDelta = Math.abs(delta);

  return (
    <section className="mt-3 rounded-card bg-surface p-5">
      <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
        Média {rangeLabel}
      </p>
      <div className="mt-1 flex items-end gap-1.5">
        <span className="text-[44px] font-bold leading-none">
          {avg.toFixed(meta.decimals)}
        </span>
        <span className="mb-1.5 text-[13px] text-baunilha/55">{meta.suffix}</span>
      </div>
      {absDelta > 0.05 ? (
        <span
          className="mt-3 inline-block rounded-pill px-3 py-1.5 text-[11px] font-semibold"
          style={{
            backgroundColor: `hsl(var(--${deltaColor}) / 0.16)`,
            color: `hsl(var(--${deltaColor}))`,
          }}
        >
          {arrow} {absDelta.toFixed(meta.decimals)}{meta.suffix} vs período anterior
        </span>
      ) : (
        <span className="mt-3 inline-block rounded-pill bg-surface-2/70 px-3 py-1.5 text-[11px] font-semibold text-baunilha/65">
          → estável vs período anterior
        </span>
      )}
    </section>
  );
}

/* --------------------------------------------------------------- Window nav */

function WindowNav({ offset, maxOffset, onPrev, onNext }) {
  const atOldest = offset >= maxOffset;
  const atNewest = offset === 0;
  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        onClick={onPrev}
        disabled={atOldest}
        aria-label="Janela anterior"
        className="grid h-8 w-8 place-items-center rounded-full bg-surface-2/60 text-text-primary/85 transition hover:bg-surface-2 disabled:opacity-30"
      >
        <ChevronLeft size={16} strokeWidth={2.4} />
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={atNewest}
        aria-label="Janela seguinte"
        className="grid h-8 w-8 place-items-center rounded-full bg-surface-2/60 text-text-primary/85 transition hover:bg-surface-2 disabled:opacity-30"
      >
        <ChevronRight size={16} strokeWidth={2.4} />
      </button>
    </div>
  );
}

function windowLabel(winStart, winEnd, totalDays) {
  const newest = TOTAL - winStart; // dias atrás (mais novo da janela)
  const oldest = TOTAL - (winEnd - 1); // dias atrás (mais velho da janela)
  if (totalDays <= 7) {
    return `Últimos ${winEnd - winStart} dias`;
  }
  return `${oldest}-${newest} de ${totalDays} dias atrás`;
}

/* ------------------------------------------------------------------ Charts */

function BarChart({ series, meta }) {
  const { min, max } = meta.scale;
  const range = Math.max(1, max - min);
  return (
    <>
      <div className="flex h-[120px] items-end justify-between gap-1.5">
        {series.map((p, i) => {
          const h = Math.max(4, ((p.value - min) / range) * 100);
          const isToday = p.dayIndex === TOTAL - 1;
          return (
            <div
              key={i}
              className="flex flex-1 flex-col items-center gap-1"
              title={`${dayLabel(p.dayIndex)} · ${p.value}${meta.suffix}`}
            >
              <span className="text-[10px] font-semibold text-baunilha/55">
                {p.value}
              </span>
              <div
                className="w-full rounded-t-md"
                style={{
                  height: `${h}%`,
                  backgroundColor: isToday
                    ? 'hsl(var(--laranja))'
                    : 'hsl(var(--menta))',
                }}
              />
            </div>
          );
        })}
      </div>
      <DayAxis series={series} />
    </>
  );
}

function LineChart({ series, meta }) {
  // SVG inline; layout 320x120 viewBox para responsividade dentro do card.
  const W = 320;
  const H = 120;
  const padX = 14;
  const padY = 10;
  const { min, max } = meta.scale;
  const range = Math.max(1, max - min);
  const n = series.length;
  const step = n > 1 ? (W - padX * 2) / (n - 1) : 0;

  const pt = (p, i) => {
    const x = padX + i * step;
    const y = padY + (1 - (p.value - min) / range) * (H - padY * 2);
    return [x, y];
  };

  const points = series.map(pt);
  const path = points
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(' ');

  // Bandas para apneia (preenchimento horizontal por classe)
  const isApnea = meta.key === 'ahi';
  const bandRects = isApnea
    ? APNEA_BANDS.map((b, idx) => {
        const prevMax = idx === 0 ? 0 : APNEA_BANDS[idx - 1].max;
        const topY = padY + (1 - Math.min(b.max, max) / range) * (H - padY * 2);
        const bottomY = padY + (1 - prevMax / range) * (H - padY * 2);
        return { ...b, top: topY, height: Math.max(0, bottomY - topY) };
      })
    : [];

  // Linha de referência (baseline FC, threshold SpO2)
  const refValue =
    meta.key === 'hrAvg' ? meta.baseline : meta.key === 'spo2Min' ? meta.threshold : null;
  const refY =
    refValue != null
      ? padY + (1 - (refValue - min) / range) * (H - padY * 2)
      : null;

  return (
    <>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        style={{ height: 120 }}
        preserveAspectRatio="none"
      >
        {/* Bandas de severidade (apneia) */}
        {bandRects.map((b, i) => (
          <rect
            key={i}
            x={padX}
            y={b.top}
            width={W - padX * 2}
            height={b.height}
            fill={`hsl(var(--${b.color}))`}
            opacity={0.12}
          />
        ))}
        {/* Linha de referência */}
        {refY != null && (
          <line
            x1={padX}
            x2={W - padX}
            y1={refY}
            y2={refY}
            stroke="hsl(var(--baunilha))"
            strokeOpacity={0.35}
            strokeDasharray="3 3"
          />
        )}
        {/* Linha da série */}
        <path
          d={path}
          fill="none"
          stroke="hsl(var(--menta))"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Pontos */}
        {points.map(([x, y], i) => {
          const isToday = series[i].dayIndex === TOTAL - 1;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={isToday ? 4 : 2.6}
              fill={isToday ? 'hsl(var(--laranja))' : 'hsl(var(--menta))'}
              stroke="hsl(var(--surface))"
              strokeWidth={isToday ? 2 : 1.2}
            />
          );
        })}
      </svg>
      <DayAxis series={series} />
      {refValue != null && (
        <p className="mt-1 text-[10px] text-baunilha/45">
          --- {meta.key === 'hrAvg' ? 'baseline' : 'limiar clínico'} = {refValue}
          {meta.suffix}
        </p>
      )}
    </>
  );
}

function DayAxis({ series }) {
  return (
    <div className="mt-2 flex justify-between text-[10px] text-baunilha/45">
      {series.map((p, i) => (
        <span key={i} className="flex-1 text-center">
          {dayLabel(p.dayIndex)}
        </span>
      ))}
    </div>
  );
}

function ApneaLegend() {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[10px]">
      {APNEA_BANDS.map((b) => (
        <span key={b.label} className="flex items-center gap-1.5 text-baunilha/65">
          <span
            className="h-2.5 w-2.5 rounded-sm"
            style={{ backgroundColor: `hsl(var(--${b.color}))` }}
          />
          {b.label} ≤ {b.max}
        </span>
      ))}
    </div>
  );
}

/* ----------------------------------------------------------- Challenge history */

const CHALLENGE_ICONS = {
  wind: Wind,
  moon: Moon,
  check: CheckSquare,
};

const STATUS_STYLE = {
  done: { label: 'Concluído', color: 'menta' },
  in_progress: { label: 'Em curso', color: 'laranja' },
  abandoned: { label: 'Abandonado', color: 'baunilha' },
};

function ChallengeHistoryRow({ item }) {
  const Icon = CHALLENGE_ICONS[item.icon] || CheckSquare;
  const status = STATUS_STYLE[item.status];
  const fade = item.status === 'abandoned' ? 'opacity-55' : '';

  return (
    <div className={'rounded-card bg-surface-2/40 p-3.5 ' + fade}>
      <div className="flex items-start gap-3">
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
          <p className="mt-0.5 text-[11px] text-baunilha/55">
            {item.period} · {item.reward} pts
          </p>
        </div>
        <span
          className="shrink-0 rounded-pill px-2 py-0.5 text-[10px] font-bold"
          style={{
            backgroundColor: `hsl(var(--${status.color}) / 0.18)`,
            color: `hsl(var(--${status.color}))`,
          }}
        >
          {status.label}
        </span>
      </div>
      <div className="mt-2.5">
        <div className="mb-1 flex items-center justify-between text-[10px]">
          <span className="text-baunilha/50">{item.percent}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-pill bg-surface-2/70">
          <div
            className="h-full rounded-pill"
            style={{
              width: `${item.percent}%`,
              backgroundColor: `hsl(var(--${item.color}))`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

function RecordRow({ icon, label, meta }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        {icon}
        <span className="text-[14px] font-medium text-text-primary/90">{label}</span>
      </div>
      <span className="text-[12px] text-baunilha/50">{meta}</span>
    </div>
  );
}
