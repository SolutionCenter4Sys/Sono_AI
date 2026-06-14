import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  Check,
  Sparkles,
  Stethoscope,
  ShieldCheck,
  FileText,
  MessageSquare,
  CalendarDays,
  X,
  Download,
  Mail,
  Info,
} from 'lucide-react';
import PrimaryButton from '@/components/primitives/PrimaryButton.jsx';
import { comingSoon } from '@/lib/demoToast.js';
import {
  LAUDO,
  HYPNOGRAM,
  STAGE_META,
  SPO2_CURVE,
  IAH_BANDS,
  EDUCATIONAL,
} from '@/data/examMock.js';

const CONDUTAS = [
  'Iniciar tratamento com CPAP titulado',
  'Acompanhamento ambulatorial em 3 meses',
  'Avaliação de comorbidades (HAS, DM)',
  'Mudanças de estilo de vida (redução peso)',
];

const SEVERITY_COLOR = {
  low: 'risk-low',
  moderate: 'risk-moderate',
  high: 'risk-high',
  critical: 'risk-critical',
};

export default function DiagnosisScreen() {
  const navigate = useNavigate();
  const [pdfOpen, setPdfOpen] = useState(false);
  const sevColor = SEVERITY_COLOR[LAUDO.diagnosis.severity];

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
          Laudo médico
        </span>
        <span className="h-10 w-10" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-4">
        {/* Status badge */}
        <div className="flex justify-center pt-2">
          <span className="inline-flex items-center gap-1.5 rounded-pill bg-risk-low px-4 py-2 text-xs font-bold uppercase tracking-kicker text-marinho-deep">
            <ShieldCheck size={14} /> Laudo assinado
          </span>
        </div>

        {/* Diagnosis hero */}
        <section className="mt-4 rounded-card bg-surface p-6 text-center">
          <span className="text-xs font-semibold uppercase tracking-kicker text-baunilha/50">
            Diagnóstico
          </span>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-text-primary">
            {LAUDO.diagnosis.label}
          </h1>
          <span
            className="mt-3 inline-flex rounded-pill px-4 py-2 text-xs font-bold tracking-kicker"
            style={{
              backgroundColor: `hsl(var(--${sevColor}) / 0.18)`,
              color: `hsl(var(--${sevColor}))`,
            }}
          >
            ● IAH {LAUDO.metrics.iah} · {LAUDO.diagnosis.cid}
          </span>
          <p className="mt-3 text-[11px] uppercase tracking-kicker text-baunilha/45">
            Laudo {LAUDO.number}
          </p>
        </section>

        {/* Enquadramento empático */}
        <section
          className="mt-3 rounded-card p-4"
          style={{ backgroundColor: 'hsl(var(--menta) / 0.10)', border: '1px solid hsl(var(--menta) / 0.30)' }}
        >
          <p className="text-sm leading-relaxed text-text-primary/90">
            <span className="font-semibold text-menta">Respire fundo: você está no caminho certo.</span>{' '}
            A apneia moderada é comum e tem tratamento eficaz. Com o plano abaixo e
            acompanhamento, a maioria das pessoas volta a dormir bem.
          </p>
        </section>

        {/* === VISUALIZAÇÕES CLÍNICAS === */}
        <section className="mt-3 rounded-card bg-surface p-5">
          <span className="text-xs font-semibold uppercase tracking-kicker text-baunilha/50">
            Visualização clínica
          </span>

          {/* IAH bands */}
          <div className="mt-4">
            <div className="flex items-end justify-between">
              <p className="text-[13px] font-semibold">Índice de Apneia/Hipopneia (IAH)</p>
              <span className="text-[12px] font-bold" style={{ color: `hsl(var(--${sevColor}))` }}>
                {LAUDO.metrics.iah} ev/h
              </span>
            </div>
            <IahBands value={LAUDO.metrics.iah} />
          </div>

          <Divider />

          {/* Gauge eficiência */}
          <div>
            <div className="flex items-end justify-between">
              <p className="text-[13px] font-semibold">Eficiência do sono</p>
              <span className="text-[12px] font-bold text-menta">{LAUDO.metrics.efficiency}%</span>
            </div>
            <EfficiencyGauge value={LAUDO.metrics.efficiency} target={85} />
          </div>

          <Divider />

          {/* Hipnograma */}
          <div>
            <p className="text-[13px] font-semibold">Fases do sono (hipnograma)</p>
            <Hypnogram />
          </div>

          <Divider />

          {/* Curva SpO₂ */}
          <div>
            <div className="flex items-end justify-between">
              <p className="text-[13px] font-semibold">Curva de SpO₂ na noite</p>
              <span className="text-[12px] font-bold text-risk-moderate">mín {LAUDO.metrics.spo2Min}%</span>
            </div>
            <Spo2Curve />
          </div>
        </section>

        {/* === ANÁLISE GERADA PELA IA === */}
        <section
          className="mt-3 rounded-card p-5"
          style={{
            backgroundColor: 'hsl(var(--sun-moon) / 0.08)',
            border: '1px solid hsl(var(--sun-moon) / 0.28)',
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="grid h-6 w-6 place-items-center rounded-lg"
              style={{ backgroundColor: 'hsl(var(--sun-moon) / 0.22)' }}
            >
              <Sparkles size={12} className="text-sun-moon" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-kicker text-sun-moon">
              Análise gerada pela IA
            </span>
          </div>
          <p className="mt-3 text-[13.5px] leading-[1.55] text-text-primary/90">
            O algoritmo identificou 18,2 eventos respiratórios por hora — predomínio
            obstrutivo —, com dessaturações repetidas até 84% na 2ª metade da noite. Sono
            fragmentado, eficiência abaixo do alvo clínico (78% vs. ≥85%) e tempo
            reduzido em N3 (sono profundo reparador). Padrão consistente com apneia
            obstrutiva moderada.
          </p>
          <p className="mt-2 text-[11.5px] leading-[1.45] text-baunilha/55">
            <Info size={11} className="mr-1 inline" />
            Pré-laudo algorítmico — validado pelo médico do sono antes da assinatura.
          </p>
        </section>

        {/* === VALIDAÇÃO MÉDICA === */}
        <section className="mt-3 rounded-card bg-surface p-5">
          <div className="flex items-center gap-2">
            <span
              className="grid h-6 w-6 place-items-center rounded-lg"
              style={{ backgroundColor: 'hsl(var(--menta) / 0.22)' }}
            >
              <Stethoscope size={12} className="text-menta" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-kicker text-menta">
              Validação médica
            </span>
          </div>
          <p className="mt-3 text-[13.5px] leading-[1.55] text-text-primary/90">
            Paciente apresenta apneia obstrutiva moderada com dessaturações
            significativas. Recomenda-se início de tratamento com CPAP titulado e
            acompanhamento ambulatorial em 3 meses.
          </p>
        </section>

        {/* Condutas */}
        <section
          className="mt-3 rounded-card border p-5"
          style={{
            backgroundColor: 'hsl(var(--menta) / 0.10)',
            borderColor: 'hsl(var(--menta) / 0.32)',
          }}
        >
          <span className="text-xs font-semibold uppercase tracking-kicker text-menta">
            Condutas recomendadas
          </span>
          <div className="mt-3 space-y-2.5">
            {CONDUTAS.map((c) => (
              <div key={c} className="flex items-start gap-2.5 text-sm text-text-primary">
                <Check size={15} className="mt-0.5 shrink-0 text-menta" />
                {c}
              </div>
            ))}
          </div>
        </section>

        {/* === O QUE CADA NÚMERO SIGNIFICA === */}
        <section className="mt-3 rounded-card bg-surface p-5">
          <span className="text-xs font-semibold uppercase tracking-kicker text-baunilha/50">
            O que cada número significa
          </span>
          <div className="mt-3 flex flex-col gap-3">
            {EDUCATIONAL.map((e) => (
              <div key={e.key}>
                <p className="text-[13px] font-semibold text-text-primary/95">{e.title}</p>
                <p className="mt-0.5 text-[12px] leading-[1.5] text-baunilha/70">{e.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Signed by + validação */}
        <section className="mt-3 rounded-card bg-surface p-4">
          <span className="text-xs font-semibold uppercase tracking-kicker text-baunilha/50">
            Laudo assinado por
          </span>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-menta text-sm font-bold text-text-on-brand">
              {LAUDO.signedBy.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-text-primary">{LAUDO.signedBy.name}</p>
              <p className="text-[11px] text-baunilha/70">
                {LAUDO.signedBy.crm} · {LAUDO.signedBy.rqe}
              </p>
              <p className="text-[11px] text-baunilha/55">{LAUDO.signedAt}</p>
            </div>
            <span className="rounded-pill bg-risk-low/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-kicker text-risk-low">
              {LAUDO.standard}
            </span>
          </div>
          <div className="mt-3 flex items-center gap-2 text-[11.5px] text-baunilha/60">
            <ShieldCheck size={13} className="text-menta" />
            Validado pelo {LAUDO.validatedBy}
          </div>
        </section>

        {/* === FOLLOW-UP === */}
        <section className="mt-3 rounded-card bg-surface p-5">
          <span className="text-xs font-semibold uppercase tracking-kicker text-baunilha/50">
            Próximos passos com o médico
          </span>
          <div className="mt-3 flex flex-col gap-2">
            <FollowUpRow
              icon={<MessageSquare size={16} className="text-laranja" />}
              iconBg="hsl(var(--laranja) / 0.18)"
              title="Mensagem para Dr. Marcos"
              hint="Tire dúvidas sobre o tratamento por escrito"
              onClick={() => comingSoon('Mensagem para Dr. Marcos Rocha')}
            />
            <FollowUpRow
              icon={<CalendarDays size={16} className="text-menta" />}
              iconBg="hsl(var(--menta) / 0.18)"
              title="Agendar retorno"
              hint="Consulta de seguimento para iniciar o CPAP"
              onClick={() => navigate('/agenda/atendimento')}
            />
            <FollowUpRow
              icon={<Sparkles size={16} className="text-sun-moon" />}
              iconBg="hsl(var(--sun-moon) / 0.18)"
              title="Tirar dúvidas com Sono AI"
              hint="Assistente disponível 24h"
              onClick={() => navigate('/sono-ai/full')}
            />
          </div>
        </section>

        <div className="h-4" />
      </div>

      <footer className="px-5 pb-4 pt-3">
        <PrimaryButton trailingIcon="→" onClick={() => navigate('/exame/proximas-acoes')}>
          Ver próximos passos
        </PrimaryButton>
        <div className="mt-1 flex justify-center">
          <button
            type="button"
            onClick={() => setPdfOpen(true)}
            className="flex items-center gap-1.5 text-[13px] font-medium text-baunilha/60 underline-offset-4 hover:text-baunilha/85"
          >
            <FileText size={13} /> Baixar PDF do laudo
          </button>
        </div>
      </footer>

      {pdfOpen && <PdfPreviewModal onClose={() => setPdfOpen(false)} />}
    </div>
  );
}

/* ----------------------------------------------------- Visualizations */

function IahBands({ value }) {
  const max = IAH_BANDS[IAH_BANDS.length - 1].max;
  const widths = IAH_BANDS.map((b, i) => {
    const prev = i === 0 ? 0 : IAH_BANDS[i - 1].max;
    return ((b.max - prev) / max) * 100;
  });
  const markerPct = Math.min(100, (value / max) * 100);

  return (
    <>
      <div className="mt-3 relative h-2.5 w-full overflow-hidden rounded-pill">
        <div className="absolute inset-0 flex">
          {IAH_BANDS.map((b, i) => (
            <div
              key={b.label}
              style={{
                width: `${widths[i]}%`,
                backgroundColor: `hsl(var(--${b.color}) / 0.6)`,
              }}
            />
          ))}
        </div>
        <div
          className="absolute top-1/2 h-4 w-1 -translate-y-1/2 rounded-pill bg-text-primary shadow-[0_0_0_2px_hsl(var(--surface))]"
          style={{ left: `calc(${markerPct}% - 2px)` }}
        />
      </div>
      <div className="mt-2 flex justify-between text-[10px] text-baunilha/55">
        {IAH_BANDS.map((b, i) => {
          const prev = i === 0 ? 0 : IAH_BANDS[i - 1].max;
          return (
            <span key={b.label} className="flex flex-col items-start">
              <span style={{ color: `hsl(var(--${b.color}))` }} className="font-semibold">
                {b.label}
              </span>
              <span>{prev}–{b.max}</span>
            </span>
          );
        })}
      </div>
    </>
  );
}

function EfficiencyGauge({ value, target }) {
  const above = value >= target;
  return (
    <div className="mt-3">
      <div className="relative h-2.5 w-full overflow-hidden rounded-pill bg-surface-2/70">
        <div
          className="h-full rounded-pill bg-menta"
          style={{ width: `${value}%` }}
        />
        <div
          className="absolute top-0 h-full w-0.5 bg-baunilha/60"
          style={{ left: `${target}%` }}
        />
      </div>
      <div className="mt-2 flex items-center justify-between text-[10px] text-baunilha/55">
        <span>0%</span>
        <span className="font-semibold" style={{ color: above ? 'hsl(var(--menta))' : 'hsl(var(--risk-moderate))' }}>
          alvo {target}%
        </span>
        <span>100%</span>
      </div>
    </div>
  );
}

function Hypnogram() {
  const W = 320;
  const H = 96;
  const padX = 4;
  const padY = 8;
  const yMax = 4; // 0..4 (Wake..N3)

  const pts = HYPNOGRAM.flatMap((seg) => {
    const stage = STAGE_META[seg.stage];
    const xs = padX + (seg.start / 100) * (W - padX * 2);
    const xe = padX + (seg.end / 100) * (W - padX * 2);
    const y = padY + (stage.y / yMax) * (H - padY * 2);
    return [
      { x: xs, y },
      { x: xe, y },
    ];
  });

  const path = pts
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(' ');

  return (
    <div className="mt-3">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 96 }} preserveAspectRatio="none">
        {/* gridlines */}
        {[0, 1, 2, 3, 4].map((row) => {
          const y = padY + (row / yMax) * (H - padY * 2);
          return (
            <line
              key={row}
              x1={padX}
              x2={W - padX}
              y1={y}
              y2={y}
              stroke="hsl(var(--surface-2))"
              strokeOpacity={0.6}
              strokeDasharray="2 3"
            />
          );
        })}
        <path
          d={path}
          fill="none"
          stroke="hsl(var(--menta))"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-[10px] text-baunilha/65">
        {['Wake', 'REM', 'N1', 'N2', 'N3'].map((k) => (
          <span key={k} className="flex items-center gap-1">
            <span
              className="block h-2 w-2 rounded-sm"
              style={{ backgroundColor: `hsl(var(--${STAGE_META[k].color}))` }}
            />
            {STAGE_META[k].label}
          </span>
        ))}
      </div>
    </div>
  );
}

function Spo2Curve() {
  const W = 320;
  const H = 96;
  const padX = 14;
  const padY = 10;
  const min = 78;
  const max = 100;
  const range = max - min;
  const n = SPO2_CURVE.length;
  const step = (W - padX * 2) / (n - 1);

  const points = SPO2_CURVE.map((v, i) => {
    const x = padX + i * step;
    const y = padY + (1 - (v - min) / range) * (H - padY * 2);
    return [x, y];
  });
  const path = points
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(' ');

  // Limiar 90%
  const refY = padY + (1 - (90 - min) / range) * (H - padY * 2);

  return (
    <div className="mt-3">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 96 }} preserveAspectRatio="none">
        {/* área abaixo de 90% */}
        <rect
          x={padX}
          y={refY}
          width={W - padX * 2}
          height={H - padY - refY}
          fill="hsl(var(--risk-moderate))"
          opacity={0.12}
        />
        <line
          x1={padX}
          x2={W - padX}
          y1={refY}
          y2={refY}
          stroke="hsl(var(--risk-moderate))"
          strokeOpacity={0.6}
          strokeDasharray="3 3"
        />
        <path
          d={path}
          fill="none"
          stroke="hsl(var(--menta))"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {points.map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={SPO2_CURVE[i] < 90 ? 3 : 2}
            fill={SPO2_CURVE[i] < 90 ? 'hsl(var(--risk-moderate))' : 'hsl(var(--menta))'}
          />
        ))}
      </svg>
      <p className="mt-1 text-[10px] text-baunilha/55">
        --- limiar clínico = 90% · pontos em laranja = evento clínico
      </p>
    </div>
  );
}

/* --------------------------------------------------------- Follow-up row */

function FollowUpRow({ icon, iconBg, title, hint, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-card bg-surface-2/40 p-3.5 text-left transition hover:bg-surface-2/70"
    >
      <span
        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
        style={{ backgroundColor: iconBg }}
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[13.5px] font-semibold text-text-primary/95">{title}</span>
        <span className="block text-[11.5px] text-baunilha/60">{hint}</span>
      </span>
    </button>
  );
}

/* --------------------------------------------------------- PDF modal */

function PdfPreviewModal({ onClose }) {
  return (
    <div
      className="absolute inset-0 z-50 flex items-end bg-marinho-deep/70 backdrop-blur-sm sm:items-center sm:justify-center"
      onClick={onClose}
    >
      <div
        className="flex h-[88%] w-full flex-col rounded-t-[24px] bg-marinho sm:rounded-card-lg sm:max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between px-5 pt-4 pb-3">
          <span className="text-[12px] font-semibold uppercase tracking-kicker text-baunilha/70">
            Preview do PDF
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="grid h-9 w-9 place-items-center rounded-full bg-surface-2/60 text-text-primary"
          >
            <X size={18} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 pb-4">
          <div className="rounded-card bg-white p-5 text-[#15152A]">
            <div className="flex items-center justify-between border-b border-[#15152A]/15 pb-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#15152A]/60">
                Instituto do Sono — AFIP
              </p>
              <p className="text-[10px] text-[#15152A]/60">{LAUDO.number}</p>
            </div>
            <h2 className="mt-3 text-[15px] font-bold leading-tight">
              Laudo de Polissonografia Domiciliar
            </h2>
            <p className="mt-1 text-[10.5px] text-[#15152A]/60">
              Paciente: João Silva · {LAUDO.signedAt}
            </p>

            <p className="mt-4 text-[11.5px] font-bold uppercase tracking-[0.15em] text-[#15152A]/70">
              Diagnóstico
            </p>
            <p className="mt-1 text-[12.5px] font-semibold">{LAUDO.diagnosis.label}</p>
            <p className="text-[10.5px] text-[#15152A]/70">{LAUDO.diagnosis.cid}</p>

            <p className="mt-4 text-[11.5px] font-bold uppercase tracking-[0.15em] text-[#15152A]/70">
              Métricas principais
            </p>
            <div className="mt-1 grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px]">
              <span>IAH</span><span className="text-right font-semibold">{LAUDO.metrics.iah} ev/h</span>
              <span>SpO₂ mínima</span><span className="text-right font-semibold">{LAUDO.metrics.spo2Min}%</span>
              <span>Eficiência</span><span className="text-right font-semibold">{LAUDO.metrics.efficiency}%</span>
              <span>Duração</span><span className="text-right font-semibold">{LAUDO.metrics.duration}</span>
            </div>

            <p className="mt-4 text-[11.5px] font-bold uppercase tracking-[0.15em] text-[#15152A]/70">
              Condutas
            </p>
            <ul className="mt-1 list-disc pl-4 text-[11px]">
              {CONDUTAS.map((c) => <li key={c}>{c}</li>)}
            </ul>

            <div className="mt-5 border-t border-[#15152A]/15 pt-3 text-[10.5px]">
              <p className="font-semibold">{LAUDO.signedBy.name}</p>
              <p className="text-[#15152A]/70">
                {LAUDO.signedBy.crm} · {LAUDO.signedBy.rqe}
              </p>
              <p className="mt-1 text-[#15152A]/70">
                Validado pelo {LAUDO.validatedBy} · {LAUDO.standard}
              </p>
            </div>
          </div>
        </div>

        <footer className="flex gap-2 border-t border-surface-2/40 px-5 py-3">
          <button
            type="button"
            onClick={() => {
              comingSoon('PDF enviado para joao@email.com');
            }}
            className="flex flex-1 items-center justify-center gap-2 rounded-button bg-surface-2/60 py-3 text-[13px] font-semibold text-text-primary/90"
          >
            <Mail size={14} /> Enviar por email
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="flex flex-1 items-center justify-center gap-2 rounded-button bg-laranja py-3 text-[13px] font-semibold text-text-on-brand"
          >
            <Download size={14} /> Baixar PDF
          </button>
        </footer>
      </div>
    </div>
  );
}

/* --------------------------------------------------------- Misc */

function Divider() {
  return <div className="my-4 h-px w-full bg-surface-2/60" />;
}
