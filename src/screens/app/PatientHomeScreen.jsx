import { Navigate, useNavigate } from 'react-router-dom';
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
  CalendarClock,
} from 'lucide-react';
import { DEVICE, batteryColor, statusMeta, syncRelative } from '@/data/deviceMock.js';
import { EXAM, NIGHTS, POST_EXAM_META, progressPct, nightsCompleted } from '@/data/examMock.js';
import { nextReturn, daysUntil, fmtBR } from '@/data/followUpMock.js';
import { useUseCase } from '@/lib/useCaseContext.jsx';
import TelemedicineBadge from '@/components/TelemedicineBadge.jsx';

/** Mapeia ddmm → ISO local para uso no daysUntil() do followUpMock. */
function ddmmToIso(ddmm) {
  if (!ddmm || typeof ddmm !== 'string') return null;
  const [d, m] = ddmm.split('/');
  if (!d || !m) return null;
  const year = new Date().getFullYear();
  return `${year}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
}

/** Mapeia laudo severity → risk-* color tokens do design system. */
function severityColor(severity) {
  switch (severity) {
    case 'mild': return 'risk-low';
    case 'moderate': return 'risk-moderate';
    case 'severe': return 'risk-high';
    default: return 'risk-moderate';
  }
}

/** Última noite → perfil de atenção no card de destaque. */
function lastNightRiskLabel(quality) {
  if (quality === 'Boa') return { label: 'Perfil tranquilo', token: 'risk-low' };
  if (quality === 'OK') return { label: 'Merece atenção', token: 'risk-moderate' };
  return { label: 'Algo incomoda', token: 'risk-moderate' };
}

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
  const { persona, isDoctor } = useUseCase();

  // Persona médica → redireciona pro Portal Médico (não tem Home de paciente).
  // Preserva ?uc= na URL para que o Provider continue com a persona correta.
  if (isDoctor) {
    return <Navigate to={`/medico/cadastro?uc=${persona.id}`} replace />;
  }

  // ===== Resolução de dados (persona > mock global como fallback) =====
  const device = persona.device ?? DEVICE;
  const lastNight = persona.lastNight; // { score, ahi, spo2Min, duration, quality, ... } | null
  const preDiag = persona.preDiag;     // { show, severity, label, signals[] } | null
  const exam = persona.exam;            // { state, currentNight, totalNights, ... } | null
  const laudo = persona.laudo;          // { iah, severity, signedAt, signedBy{}, ... } | null
  const followUpData = persona.followUp; // { next, completed[], ... } | null

  const meta = statusMeta(device.state);
  const battColor = batteryColor(device.battery);

  // Exame ativo (em andamento ou aguardando devolução do kit)
  const examActive = exam && (exam.state === 'in_progress' || exam.state === 'returning');
  const examPct = exam ? progressPct(exam.currentNight ?? 0, exam.totalNights ?? 1) : 0;
  const examCompleted = exam ? nightsCompleted(NIGHTS) : 0; // fallback p/ contagem rica

  // Card pós-exame: usa POST_EXAM_META quando exam.state in {analyzing, reviewing, signed}
  const postExam = exam && exam.state ? POST_EXAM_META[exam.state] : null;

  // Próximo retorno — aparece quando há retorno em ≤ 60 dias (ADR-028)
  const followUp = followUpData?.next ?? null;
  const followUpDays = followUp ? daysUntil(ddmmToIso(followUp.date) ?? followUp.plannedDate) : null;
  const showFollowUp = followUp && followUpDays != null && followUpDays >= 0 && followUpDays <= 60;
  const followUpAnticipated = !!followUp?.anticipated;

  // Risco do card "última noite"
  const lastNightRisk = lastNight ? lastNightRiskLabel(lastNight.quality) : null;

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
              aria-label={`Dispositivo · ${meta.label} · ${device.battery}%`}
              className="flex items-center gap-1.5 rounded-pill bg-surface-2/60 px-2.5 py-1.5 transition hover:bg-surface-2"
            >
              <Watch size={14} style={{ color: `hsl(var(--${meta.color}))` }} />
              <span className="text-[10px] font-bold text-text-primary/85">
                {device.battery}%
              </span>
              <span
                className="block h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: `hsl(var(--${meta.dotColor}))` }}
              />
            </button>
          </div>
          <h1 className="mt-4 text-[26px] font-bold leading-tight tracking-tight">
            Olá, {persona.firstName} 👋
          </h1>
          <p className="mt-1 text-sm text-baunilha/65">
            Que bom te ver. Aqui está um resumo da sua jornada do sono.
          </p>
          {persona.telemedicine && (
            <div className="mt-3">
              <TelemedicineBadge telemedicine={persona.telemedicine} geography={persona.geography} />
            </div>
          )}
        </header>

        {/* Alerta de pré-diagnóstico algorítmico (ADR-024) — só pra personas com preDiag.show */}
        {preDiag?.show && (
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
                Triagem assistida
              </span>
            </div>
            <h2 className="mt-3 text-[18px] font-bold leading-snug">{preDiag.label}</h2>
            <p className="mt-1.5 text-[12px] leading-[1.45] text-baunilha/70">
              Triagem dos seus dados nos últimos 7 dias — indicativa, não é diagnóstico.
            </p>
            {preDiag.signals?.length > 0 && (
              <ul className="mt-3 flex flex-col gap-1.5 text-[12.5px] text-text-primary/85">
                {preDiag.signals.map((s, i) => {
                  const Icon = i === 0 ? Droplet : i === 1 ? Heart : Moon;
                  const iconColor = s.state === 'warn' ? 'text-risk-moderate' : 'text-baunilha/70';
                  return (
                    <li key={s.label} className="flex items-center gap-2">
                      <Icon size={13} className={`shrink-0 ${iconColor}`} />
                      <span>
                        {s.label}: <strong>{s.value}</strong>
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
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
                Entender a triagem →
              </button>
            </div>
          </section>
        )}

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
              Noite {exam.currentNight} <span className="text-baunilha/55">de {exam.totalNights}</span>
            </p>
            <p className="mt-1 text-[12px] text-baunilha/65">
              {examCompleted} concluída(s){exam.expectedReturnDate ? ` · devolução até ${exam.expectedReturnDate}` : ''}
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

        {/* Card "Próximo retorno" (ADR-028) — aparece quando há retorno em ≤ 60 dias */}
        {showFollowUp && (
          <button
            type="button"
            onClick={() => navigate('/acompanhamento')}
            className="w-full mb-4 text-left rounded-card-lg p-4 transition hover:brightness-110"
            style={{
              background: followUpAnticipated
                ? 'linear-gradient(135deg, hsl(var(--laranja) / 0.16) 0%, hsl(var(--sun-moon) / 0.10) 100%)'
                : 'linear-gradient(135deg, hsl(var(--menta) / 0.14) 0%, hsl(var(--sun-moon) / 0.10) 100%)',
              border: followUpAnticipated
                ? '1px solid hsl(var(--laranja) / 0.38)'
                : '1px solid hsl(var(--menta) / 0.35)',
            }}
          >
            <div className="flex items-center gap-2">
              <span
                className="grid h-6 w-6 place-items-center rounded-lg"
                style={{
                  backgroundColor: followUpAnticipated
                    ? 'hsl(var(--laranja) / 0.22)'
                    : 'hsl(var(--menta) / 0.22)',
                }}
              >
                <CalendarClock
                  size={13}
                  className={followUpAnticipated ? 'text-laranja' : 'text-menta'}
                />
              </span>
              <span
                className={'text-[11px] font-semibold uppercase tracking-kicker ' +
                  (followUpAnticipated ? 'text-laranja' : 'text-menta')}
              >
                Próximo retorno
              </span>
              {followUpAnticipated && (
                <span className="ml-auto rounded-pill bg-laranja/22 px-2 py-0.5 text-[10px] font-bold text-laranja">
                  ANTECIPADO
                </span>
              )}
            </div>
            <p className="mt-3 text-[18px] font-bold leading-snug">
              Em {followUpDays} dias{' '}
              <span className="text-baunilha/55 text-[14px]">
                · {followUp.date ?? fmtBR(followUp.plannedDate)}
              </span>
            </p>
            <p className="mt-1 text-[12px] text-baunilha/65">
              {followUp.type}
              {followUpAnticipated && followUp.anticipatedReason
                ? ` · ${followUp.anticipatedReason}`
                : ''}
            </p>
            <div
              className={'mt-3 flex items-center justify-end text-[12.5px] font-semibold ' +
                (followUpAnticipated ? 'text-laranja' : 'text-menta')}
            >
              Ver acompanhamento <ChevronRight size={14} className="ml-0.5" />
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
              {device.name}
            </span>
            <span className="block text-[11px] text-baunilha/55">
              {meta.label} · sync {syncRelative(device.lastSyncMinutesAgo)}
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-1 text-baunilha/65">
            <Battery size={13} style={{ color: `hsl(var(--${battColor}))` }} />
            <span className="text-[11px] font-bold">{device.battery}%</span>
            <RefreshCw size={13} className="ml-2 text-baunilha/55" />
          </span>
        </button>

        {/* Última noite — card destaque (só quando há dados) */}
        {lastNight && (
          <button
            type="button"
            onClick={() => navigate('/app/result')}
            className="w-full text-left rounded-card-lg bg-surface p-5 mb-5 transition hover:bg-surface/80"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
                Sua última noite
              </span>
              {lastNightRisk && (
                <span
                  className="text-[10px] font-semibold uppercase tracking-kicker px-2 py-0.5 rounded-pill"
                  style={{
                    backgroundColor: `hsl(var(--${lastNightRisk.token}) / 0.18)`,
                    color: `hsl(var(--${lastNightRisk.token}))`,
                  }}
                >
                  {lastNightRisk.label}
                </span>
              )}
            </div>
            <div className="flex items-end gap-2">
              <span className="text-[56px] font-bold leading-none tracking-tighter">
                {lastNight.score}
              </span>
              <span className="pb-2 text-lg font-medium text-baunilha/55">/100</span>
              <div className="flex-1" />
              <ChevronRight className="mb-3 text-baunilha/40" size={22} />
            </div>
            <p className="mt-1 text-xs text-baunilha/55">
              Qualidade do sono · {lastNight.duration} · ODI {lastNight.ahi} · SpO₂ mín {lastNight.spo2Min}%
            </p>
          </button>
        )}

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
