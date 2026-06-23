import { useNavigate } from 'react-router-dom';
import { AlertTriangle, ChevronRight, Moon } from 'lucide-react';
import { getPersona } from '@/data/personasMock.js';
import { useSleepScoreAdmin } from '@/lib/sleepScoreService.jsx';

/** Pacientes-demo para ativar o Sleep Score como tratamento. */
const SLEEP_SCORE_PATIENTS = ['joao', 'carlos', 'ana'];

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
  { id: 'roberto-s', initials: 'RS', name: 'Roberto S.', sub: '11 Jun · PSG' },
  { id: 'maria-f', initials: 'MF', name: 'Maria F.', sub: '10 Jun · PSG' },
  { id: 'joao-c', initials: 'JC', name: 'João C.', sub: '10 Jun · PSG' },
  { id: 'helena-r', initials: 'HR', name: 'Helena R.', sub: '09 Jun · PSG' },
];

const ALERTS = [
  { name: 'João Silva', note: 'CPAP < 4h há 5 noites' },
  { name: 'Ana Costa', note: 'Laudo > 5 dias sem assinar' },
  { name: 'Pedro Lima', note: 'Não retornou 90 dias' },
  { name: 'Luiza Mendes', note: 'Bateria CPAP baixa' },
];

export default function DashboardScreen() {
  const navigate = useNavigate();
  const sleepScore = useSleepScoreAdmin();

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
                  onClick={() => navigate(`/medico/laudo/${r.id}`)}
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

        {/* Sleep Score como tratamento — médico ativa por paciente */}
        <section className="rounded-card-lg bg-surface p-6">
          <div className="flex items-center gap-2">
            <Moon size={16} className="text-menta" />
            <span className="text-xs font-semibold uppercase tracking-kicker text-menta">
              Sleep Score · acompanhamento contínuo
            </span>
          </div>
          <p className="mt-1 text-[13px] text-baunilha/65">
            Ative o acompanhamento da higiene do sono como parte do tratamento. O paciente
            passa a ver o score diário e hábitos sugeridos no app.
          </p>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {SLEEP_SCORE_PATIENTS.map((id) => {
              const persona = getPersona(id);
              const active = sleepScore.isActive(persona);
              return (
                <PatientSleepScoreCard
                  key={id}
                  persona={persona}
                  active={active}
                  onToggle={() =>
                    active
                      ? sleepScore.deactivate(id)
                      : sleepScore.activate(id, 'Dra. Marcela')
                  }
                />
              );
            })}
          </div>
        </section>

        {/* Alerts */}
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
      </div>
    </div>
  );
}

function PatientSleepScoreCard({ persona, active, onToggle }) {
  const name = persona?.firstName
    ? `${persona.firstName}${persona.lastName ? ' ' + persona.lastName : ''}`
    : (persona?.name ?? persona?.id);
  return (
    <div className="flex flex-col gap-3 rounded-card bg-surface-2/50 p-4">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-semibold text-text-primary">{name}</span>
        <span
          className="rounded-pill px-2 py-0.5 text-[10px] font-bold uppercase tracking-kicker"
          style={{
            backgroundColor: active ? 'hsl(var(--menta) / 0.18)' : 'hsl(var(--surface))',
            color: active ? 'hsl(var(--menta))' : 'hsl(var(--baunilha) / 0.55)',
          }}
        >
          {active ? 'Ativo' : 'Inativo'}
        </span>
      </div>
      <button
        type="button"
        onClick={onToggle}
        className="rounded-button px-3 py-2 text-[12.5px] font-semibold transition"
        style={{
          backgroundColor: active ? 'hsl(var(--surface))' : 'hsl(var(--menta))',
          color: active ? 'hsl(var(--baunilha) / 0.8)' : 'hsl(var(--marinho-deep))',
        }}
      >
        {active ? 'Desativar' : 'Ativar Sleep Score'}
      </button>
    </div>
  );
}
