import { useNavigate } from 'react-router-dom';
import { AlertTriangle, ChevronRight } from 'lucide-react';

const KPIS = [
  { label: 'Pacientes ativos', value: '248', tone: 'menta', bar: 35 },
  { label: 'Laudos pendentes', value: '17', tone: 'risk-moderate', bar: 22 },
  { label: 'Assinados no mês', value: '82', tone: 'menta', bar: 45 },
  { label: 'Aderência CPAP', value: '74%', tone: 'sun-moon', bar: 28 },
];

const FUNNEL = [
  { label: 'Triagem inicial', detail: '248 pacientes · 100%', pct: 100, tone: 'laranja' },
  { label: 'Risco identificado', detail: '193 pacientes · 78%', pct: 78, tone: 'laranja' },
  { label: 'Polissonografia agendada', detail: '152 pacientes · 61%', pct: 61, tone: 'menta' },
  { label: 'Laudo assinado', detail: '134 pacientes · 54%', pct: 54, tone: 'risk-low' },
  { label: 'Em tratamento ativo', detail: '102 pacientes · 41%', pct: 41, tone: 'sun-moon' },
];

const REVIEW = [
  { initials: 'RS', name: 'Roberto S.', sub: '11 Jun · PSG' },
  { initials: 'MF', name: 'Maria F.', sub: '10 Jun · PSG' },
  { initials: 'JC', name: 'João C.', sub: '10 Jun · PSG' },
  { initials: 'HR', name: 'Helena R.', sub: '09 Jun · PSG' },
];

const ALERTS = [
  { name: 'João Silva', note: 'CPAP < 4h há 5 noites' },
  { name: 'Ana Costa', note: 'Laudo > 5 dias sem assinar' },
  { name: 'Pedro Lima', note: 'Não retornou 90 dias' },
  { name: 'Luiza Mendes', note: 'Bateria CPAP baixa' },
];

const REVENUE = [
  ['Consultas', 'R$ 22.400'],
  ['Laudos PSG', 'R$ 18.200'],
  ['Acompanhamento', 'R$ 8.120'],
];

export default function DashboardScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5">
        <div>
          <h1 className="text-[22px] font-bold text-text-primary">Dashboard</h1>
          <p className="text-xs text-baunilha/70">Visão geral · Junho 2026</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-button bg-surface-2 px-4 py-2.5 text-xs font-semibold text-text-primary">
            Período: 30 dias
          </span>
          <button
            type="button"
            className="rounded-button bg-surface-2 px-4 py-2.5 text-xs font-semibold text-text-primary"
          >
            Exportar
          </button>
        </div>
      </header>

      <div className="space-y-4 px-8 pb-8">
        {/* KPIs */}
        <div className="grid grid-cols-4 gap-4">
          {KPIS.map((k) => (
            <div key={k.label} className="rounded-card-lg bg-surface p-5">
              <span className="text-xs font-semibold uppercase tracking-kicker text-baunilha/60">
                {k.label}
              </span>
              <p
                className="mt-2 text-4xl font-bold"
                style={{ color: `hsl(var(--${k.tone}))` }}
              >
                {k.value}
              </p>
              <div className="mt-3 h-2 w-full rounded-pill bg-surface-2">
                <div
                  className="h-full rounded-pill"
                  style={{ width: `${k.bar}%`, backgroundColor: `hsl(var(--${k.tone}))` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Funnel + Review */}
        <div className="grid grid-cols-[1fr_400px] gap-4">
          <section className="rounded-card-lg bg-surface p-6">
            <span className="text-xs font-semibold uppercase tracking-kicker text-menta">
              Funil dos pacientes
            </span>
            <div className="mt-4 space-y-4">
              {FUNNEL.map((f) => (
                <div key={f.label}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-text-primary">{f.label}</span>
                    <span className="text-xs text-baunilha/60">{f.detail}</span>
                  </div>
                  <div className="mt-1.5 h-2.5 w-full rounded-pill bg-surface-2">
                    <div
                      className="h-full rounded-pill"
                      style={{ width: `${f.pct}%`, backgroundColor: `hsl(var(--${f.tone}))` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-card-lg bg-surface p-6">
            <span className="text-xs font-semibold uppercase tracking-kicker text-laranja">
              Laudos a revisar
            </span>
            <div className="mt-3 space-y-2.5">
              {REVIEW.map((r) => (
                <button
                  key={r.initials}
                  type="button"
                  onClick={() => navigate('/medico/laudo/walter')}
                  className="flex w-full items-center gap-3 rounded-card bg-surface-2 p-3 text-left"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-surface text-xs font-bold text-baunilha">
                    {r.initials}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-text-primary">{r.name}</p>
                    <p className="text-xs text-baunilha/60">{r.sub}</p>
                  </div>
                  <span className="rounded-pill bg-risk-moderate/85 px-3 py-1.5 text-[10px] font-bold uppercase tracking-kicker text-marinho-deep">
                    Revisar
                  </span>
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Alerts + Revenue */}
        <div className="grid grid-cols-[1fr_400px] gap-4">
          <section className="rounded-card-lg bg-surface p-6">
            <span className="text-xs font-semibold uppercase tracking-kicker text-risk-moderate">
              Pacientes com alertas
            </span>
            <div className="mt-3 space-y-2.5">
              {ALERTS.map((a) => (
                <div
                  key={a.name}
                  className="flex items-center gap-3 rounded-card bg-surface-2 px-4 py-3"
                >
                  <AlertTriangle size={16} className="shrink-0 text-risk-moderate" />
                  <span className="flex-1 text-sm font-semibold text-text-primary">{a.name}</span>
                  <span className="text-xs text-risk-moderate">{a.note}</span>
                  <ChevronRight size={15} className="text-baunilha/50" />
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-card-lg bg-surface p-6">
            <span className="text-xs font-semibold uppercase tracking-kicker text-menta">
              Receita do mês
            </span>
            <p className="mt-2 text-3xl font-bold text-text-primary">R$ 48.720</p>
            <div className="mt-3 h-2 w-full rounded-pill bg-surface-2">
              <div className="h-full w-3/4 rounded-pill bg-menta" />
            </div>
            <div className="mt-4 space-y-2.5 border-t border-surface-2/60 pt-3">
              {REVENUE.map(([k, v]) => (
                <div key={k} className="flex items-center justify-between">
                  <span className="text-sm text-baunilha/80">{k}</span>
                  <span className="text-sm font-semibold text-text-primary">{v}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
