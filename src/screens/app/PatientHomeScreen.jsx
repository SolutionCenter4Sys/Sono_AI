import { useNavigate } from 'react-router-dom';
import {
  Activity,
  ClipboardList,
  Sparkles,
  Trophy,
  CalendarDays,
  ChevronRight,
  Watch,
  Battery,
  RefreshCw,
  AlertCircle,
  Droplet,
  Heart,
  Moon,
} from 'lucide-react';
import { DEVICE, batteryColor, statusMeta, syncRelative } from '@/data/deviceMock.js';
import { EXAM, NIGHTS, POST_EXAM_META, progressPct, nightsCompleted } from '@/data/examMock.js';

/**
 * Home pessoal do paciente (/inicio) — hub da jornada.
 * Resolve o problema de UX de alta severidade: os CTAs "voltar para home"
 * apontavam para o índice de dev "/". Agora apontam para cá.
 *
 * Mostra: saudação, card da última noite e atalhos para cada jornada.
 */
const SHORTCUTS = [
  {
    to: '/app/loading',
    icon: Activity,
    title: 'Nova análise',
    hint: 'Ler a noite mais recente do watch',
    color: 'laranja',
  },
  {
    to: '/triagem/intro',
    icon: ClipboardList,
    title: 'Triagem clínica',
    hint: '4 questionários · 5 minutos',
    color: 'menta',
  },
  {
    to: '/sono-ai/full',
    icon: Sparkles,
    title: 'Sono AI',
    hint: 'Tire dúvidas sobre seu sono',
    color: 'menta',
  },
  {
    to: '/score',
    icon: Trophy,
    title: 'Sleep Score',
    hint: '1.250 pts · Nível Prata',
    color: 'sun-moon',
  },
  {
    to: '/agenda/atendimento',
    icon: CalendarDays,
    title: 'Agendar atendimento',
    hint: 'Presencial ou teleconsulta',
    color: 'laranja',
  },
];

export default function PatientHomeScreen() {
  const navigate = useNavigate();
  const meta = statusMeta(DEVICE.state);
  const battColor = batteryColor(DEVICE.battery);
  const examActive = EXAM.state === 'in_progress' || EXAM.state === 'returning';
  const postExam = POST_EXAM_META[EXAM.state]; // analyzing | reviewing | signed
  const examPct = progressPct(EXAM.currentNight, EXAM.totalNights);
  const examCompleted = nightsCompleted(NIGHTS);

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto px-6 pt-5 pb-6">
        {/* Header */}
        <header className="mb-6">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="block h-2.5 w-2.5 rounded-full bg-laranja" />
              <span className="text-base font-bold tracking-tight">Instituto do Sono</span>
              <span
                className="text-[9px] font-semibold uppercase tracking-[0.18em] px-1.5 py-0.5 rounded-md"
                style={{ backgroundColor: 'hsl(var(--laranja) / 0.16)', color: 'hsl(var(--laranja))' }}
              >
                Protótipo
              </span>
            </div>
            <button
              type="button"
              onClick={() => navigate('/dispositivo')}
              aria-label={`Dispositivo · ${meta.label} · ${DEVICE.battery}%`}
              className="flex items-center gap-1.5 rounded-pill bg-surface-2/60 px-2.5 py-1.5 transition hover:bg-surface-2"
            >
              <Watch size={14} style={{ color: `hsl(var(--${meta.color}))` }} />
              <span className="text-[10px] font-bold text-text-primary/85">
                {DEVICE.battery}%
              </span>
              <span
                className="block h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: `hsl(var(--${meta.dotColor}))` }}
              />
            </button>
          </div>
          <h1 className="mt-4 text-[26px] font-bold leading-tight tracking-tight">
            Olá, João 👋
          </h1>
          <p className="mt-1 text-sm text-baunilha/65">
            Que bom te ver. Aqui está um resumo da sua jornada do sono.
          </p>
        </header>

        {/* Alerta de pré-diagnóstico algorítmico (ADR-024) */}
        <section
          className="mb-4 overflow-hidden rounded-card-lg p-5"
          style={{
            background:
              'linear-gradient(135deg, hsl(var(--menta) / 0.14) 0%, hsl(var(--laranja) / 0.14) 100%)',
            border: '1px solid hsl(var(--menta) / 0.35)',
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="grid h-6 w-6 place-items-center rounded-lg"
              style={{ backgroundColor: 'hsl(var(--menta) / 0.22)' }}
            >
              <AlertCircle size={13} className="text-menta" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-kicker text-menta">
              Pré-diagnóstico
            </span>
          </div>
          <h2 className="mt-3 text-[18px] font-bold leading-snug">
            Detectamos sinais de apneia leve a moderada
          </h2>
          <p className="mt-1.5 text-[12px] leading-[1.45] text-baunilha/70">
            Análise dos seus dados nos últimos 7 dias — triagem automática, não é diagnóstico.
          </p>
          <ul className="mt-3 flex flex-col gap-1.5 text-[12.5px] text-text-primary/85">
            <li className="flex items-center gap-2">
              <Droplet size={13} className="shrink-0 text-risk-moderate" />
              <span>3 quedas de SpO₂ &lt; 90% (mínima 87%)</span>
            </li>
            <li className="flex items-center gap-2">
              <Heart size={13} className="shrink-0 text-laranja" />
              <span>FC noturna 8 bpm acima do seu baseline</span>
            </li>
            <li className="flex items-center gap-2">
              <Moon size={13} className="shrink-0 text-baunilha/70" />
              <span>Sono fragmentado, 6h 12min de duração média</span>
            </li>
          </ul>
          <div className="mt-4 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => navigate('/agenda/atendimento')}
              className="flex w-full items-center justify-center gap-2 rounded-button bg-laranja py-3 text-[14px] font-semibold text-text-on-brand shadow-[0_8px_24px_-12px_hsl(var(--laranja)/0.6)] transition hover:brightness-110"
            >
              <CalendarDays size={16} /> Agendar atendimento
            </button>
            <button
              type="button"
              onClick={() => navigate('/pre-diagnostico')}
              className="text-center text-[12.5px] font-medium text-menta underline-offset-4 hover:underline"
            >
              Entender o pré-diagnóstico →
            </button>
          </div>
        </section>

        {/* Card de exame em andamento (ADR-025) */}
        {examActive && (
          <button
            type="button"
            onClick={() => navigate('/polisso-movel/acompanhamento')}
            className="w-full mb-4 text-left rounded-card-lg p-4 transition hover:brightness-110"
            style={{
              background:
                'linear-gradient(135deg, hsl(var(--laranja) / 0.14) 0%, hsl(var(--menta) / 0.12) 100%)',
              border: '1px solid hsl(var(--laranja) / 0.32)',
            }}
          >
            <div className="flex items-center gap-2">
              <span
                className="grid h-6 w-6 place-items-center rounded-lg"
                style={{ backgroundColor: 'hsl(var(--laranja) / 0.22)' }}
              >
                <Activity size={13} className="text-laranja" />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-kicker text-laranja">
                Exame em casa
              </span>
              <span className="ml-auto rounded-pill bg-laranja/20 px-2 py-0.5 text-[10px] font-bold text-laranja">
                AGORA
              </span>
            </div>
            <p className="mt-3 text-[18px] font-bold leading-none">
              Noite {EXAM.currentNight} <span className="text-baunilha/55">de {EXAM.totalNights}</span>
            </p>
            <p className="mt-1 text-[12px] text-baunilha/65">
              {examCompleted} concluída(s) · devolução até {EXAM.expectedReturnDate}
            </p>
            <div className="mt-3">
              <div className="mb-1 flex items-center justify-between text-[11px]">
                <span className="text-baunilha/55">Progresso</span>
                <span className="font-semibold text-laranja">{examPct}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-pill bg-surface-2/70">
                <div className="h-full rounded-pill bg-laranja" style={{ width: `${examPct}%` }} />
              </div>
            </div>
            <div className="mt-3 flex items-center justify-end text-[12.5px] font-semibold text-laranja">
              Acompanhar exame <ChevronRight size={14} className="ml-0.5" />
            </div>
          </button>
        )}

        {/* Card pós-exame multi-estado (ADR-026): analyzing / reviewing / signed */}
        {postExam && (
          <button
            type="button"
            onClick={() => navigate(postExam.route)}
            className="w-full mb-4 text-left rounded-card-lg p-4 transition hover:brightness-110"
            style={{
              background: `linear-gradient(135deg, hsl(var(--${postExam.color}) / 0.18) 0%, hsl(var(--laranja) / 0.10) 100%)`,
              border: `1px solid hsl(var(--${postExam.color}) / 0.38)`,
            }}
          >
            <div className="flex items-center gap-2">
              <span
                className="grid h-6 w-6 place-items-center rounded-lg"
                style={{ backgroundColor: `hsl(var(--${postExam.color}) / 0.24)` }}
              >
                <Activity size={13} style={{ color: `hsl(var(--${postExam.color}))` }} />
              </span>
              <span
                className="text-[11px] font-semibold uppercase tracking-kicker"
                style={{ color: `hsl(var(--${postExam.color}))` }}
              >
                {postExam.kicker}
              </span>
              <span
                className="ml-auto rounded-pill px-2 py-0.5 text-[10px] font-bold"
                style={{
                  backgroundColor: `hsl(var(--${postExam.color}) / 0.22)`,
                  color: `hsl(var(--${postExam.color}))`,
                }}
              >
                {postExam.badge}
              </span>
            </div>
            <p className="mt-3 text-[17px] font-bold leading-snug">{postExam.title}</p>
            <p className="mt-1 text-[12px] text-baunilha/65">{postExam.subtitle}</p>
            <div
              className="mt-3 flex items-center justify-end text-[12.5px] font-semibold"
              style={{ color: `hsl(var(--${postExam.color}))` }}
            >
              {postExam.cta} <ChevronRight size={14} className="ml-0.5" />
            </div>
          </button>
        )}

        {/* Mini-card do dispositivo */}
        <button
          type="button"
          onClick={() => navigate('/dispositivo')}
          className="w-full mb-4 flex items-center gap-3 rounded-card bg-surface/70 p-3 text-left transition hover:bg-surface border border-surface-2/40"
        >
          <span
            className="grid h-9 w-9 shrink-0 place-items-center rounded-xl"
            style={{ backgroundColor: `hsl(var(--${meta.color}) / 0.16)` }}
          >
            <Watch size={16} style={{ color: `hsl(var(--${meta.color}))` }} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[13px] font-semibold text-text-primary/95">
              {DEVICE.name}
            </span>
            <span className="block text-[11px] text-baunilha/55">
              {meta.label} · sync {syncRelative(DEVICE.lastSyncMinutesAgo)}
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-1 text-baunilha/65">
            <Battery size={13} style={{ color: `hsl(var(--${battColor}))` }} />
            <span className="text-[11px] font-bold">{DEVICE.battery}%</span>
            <RefreshCw size={13} className="ml-2 text-baunilha/55" />
          </span>
        </button>

        {/* Última noite — card destaque */}
        <button
          type="button"
          onClick={() => navigate('/app/result')}
          className="w-full text-left rounded-card-lg bg-surface p-5 mb-5 transition hover:bg-surface/80"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
              Sua última noite
            </span>
            <span
              className="text-[10px] font-semibold uppercase tracking-kicker px-2 py-0.5 rounded-pill"
              style={{
                backgroundColor: 'hsl(var(--risk-moderate) / 0.18)',
                color: 'hsl(var(--risk-moderate))',
              }}
            >
              Risco moderado
            </span>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-[56px] font-bold leading-none tracking-tighter">62</span>
            <span className="pb-2 text-lg font-medium text-baunilha/55">/100</span>
            <div className="flex-1" />
            <ChevronRight className="mb-3 text-baunilha/40" size={22} />
          </div>
          <p className="mt-1 text-xs text-baunilha/55">
            Qualidade do sono · 6h 12min · 3 quedas de SpO₂
          </p>
        </button>

        {/* Atalhos */}
        <h2 className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/50 mb-3">
          Continuar sua jornada
        </h2>
        <div className="flex flex-col gap-2.5">
          {SHORTCUTS.map((s) => (
            <button
              key={s.to}
              type="button"
              onClick={() => navigate(s.to)}
              className="w-full flex items-center gap-3.5 rounded-card bg-surface p-4 text-left transition hover:bg-surface/80 border border-surface-2/40"
            >
              <span
                className="grid h-11 w-11 place-items-center rounded-[14px]"
                style={{ backgroundColor: `hsl(var(--${s.color}) / 0.16)` }}
              >
                <s.icon size={20} style={{ color: `hsl(var(--${s.color}))` }} />
              </span>
              <span className="flex-1 min-w-0">
                <span className="block text-[15px] font-semibold text-text-primary/95">
                  {s.title}
                </span>
                <span className="block text-xs text-baunilha/55">{s.hint}</span>
              </span>
              <ChevronRight className="text-baunilha/35" size={18} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
