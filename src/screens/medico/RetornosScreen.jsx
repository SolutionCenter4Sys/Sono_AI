import { useNavigate } from 'react-router-dom';
import {
  CalendarClock,
  Clock,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  FileText,
} from 'lucide-react';
import { DOCTOR_TODAY_RETURNS } from '@/data/followUpMock.js';

/**
 * /medico/retornos · Agenda de retornos do dia (ADR-028 · WEB-EP-09-FT-05-US-06).
 * Visão consolidada do médico: lista com badge temporal/antecipado + prévia + link laudo.
 */
export default function RetornosScreen() {
  const navigate = useNavigate();
  const antecipados = DOCTOR_TODAY_RETURNS.filter((r) => r.badgeColor === 'laranja').length;

  return (
    <div className="px-8 py-8">
      <header className="mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
          Hoje · 14 de junho
        </p>
        <h1 className="mt-1 text-[28px] font-bold leading-tight">Retornos do dia</h1>
        <p className="mt-1 text-[14px] text-baunilha/65">
          {DOCTOR_TODAY_RETURNS.length} pacientes agendados ·{' '}
          <span className="text-laranja font-semibold">{antecipados} antecipados</span>{' '}
          pelos dados clínicos
        </p>
      </header>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <KpiCard
          label="Total hoje"
          value={DOCTOR_TODAY_RETURNS.length}
          icon={<CalendarClock size={18} className="text-menta" />}
          color="menta"
        />
        <KpiCard
          label="Antecipados"
          value={antecipados}
          icon={<TrendingUp size={18} className="text-laranja" />}
          color="laranja"
          detail="Por dados clínicos"
        />
        <KpiCard
          label="Aderência média"
          value="83%"
          icon={<TrendingDown size={18} className="text-sun-moon" />}
          color="sun-moon"
          detail="-4% vs mês anterior"
        />
      </div>

      <div className="space-y-3">
        {DOCTOR_TODAY_RETURNS.map((r) => (
          <RetornoRow key={r.time} ret={r} onClick={() => navigate('/medico/laudo')} />
        ))}
      </div>

      <footer className="mt-8 flex items-center justify-between rounded-card bg-surface p-4">
        <div className="flex items-center gap-3">
          <FileText size={18} className="text-baunilha/65" />
          <div>
            <p className="text-[13px] font-semibold">Próximos retornos da semana</p>
            <p className="text-[11px] text-baunilha/55">12 agendados · 3 antecipados</p>
          </div>
        </div>
        <button
          type="button"
          className="rounded-button bg-surface-2/60 px-4 py-2 text-[12.5px] font-semibold text-baunilha/85"
        >
          Ver semana →
        </button>
      </footer>
    </div>
  );
}

function KpiCard({ label, value, icon, color, detail }) {
  return (
    <div className="rounded-card bg-surface p-5">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
          {label}
        </span>
      </div>
      <p
        className="mt-2 text-[32px] font-bold leading-none"
        style={{ color: `hsl(var(--${color}))` }}
      >
        {value}
      </p>
      {detail && <p className="mt-1 text-[11px] text-baunilha/55">{detail}</p>}
    </div>
  );
}

function RetornoRow({ ret, onClick }) {
  const anticipado = ret.badgeColor === 'laranja';
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'flex w-full items-center gap-4 rounded-card bg-surface p-4 text-left transition hover:bg-surface-2/60 ' +
        (anticipado ? 'border-l-4 border-laranja' : '')
      }
    >
      <div className="flex w-16 shrink-0 flex-col items-center gap-1">
        <Clock size={14} className="text-baunilha/55" />
        <span className="text-[14px] font-bold">{ret.time}</span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-[14px] font-semibold">{ret.patient.name}</p>
          <span className="text-[11px] text-baunilha/55">· {ret.patient.id}</span>
          <span
            className="rounded-pill px-2 py-0.5 text-[10px] font-bold"
            style={{
              backgroundColor: `hsl(var(--${ret.badgeColor}) / 0.18)`,
              color: `hsl(var(--${ret.badgeColor}))`,
            }}
          >
            {ret.badge}
          </span>
        </div>
        <p className="mt-1 text-[12.5px] text-baunilha/65">{ret.preview}</p>
      </div>
      <ChevronRight size={18} className="text-baunilha/45" />
    </button>
  );
}
