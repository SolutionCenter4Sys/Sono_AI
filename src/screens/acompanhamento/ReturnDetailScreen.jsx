import { useNavigate, useParams } from 'react-router-dom';
import {
  ChevronLeft,
  Activity,
  Calendar,
  Stethoscope,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  CheckCircle2,
  Sparkles,
  MessageSquare,
} from 'lucide-react';
import PrimaryButton from '@/components/primitives/PrimaryButton.jsx';
import TextLink from '@/components/primitives/TextLink.jsx';
import {
  findReturn,
  previousReturn,
  fmtBR,
  returnMeta,
} from '@/data/followUpMock.js';

/**
 * /acompanhamento/retorno/:id · Detalhe do retorno (ADR-028 · WEB-EP-09-FT-05-US-02).
 * Para retornos passados: resumo + decisões.
 * Para próximo: pré-consulta automática com comparativo + questionário pré-preenchido.
 */
export default function ReturnDetailScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const ret = findReturn(id);

  if (!ret) {
    return (
      <div className="flex h-full flex-col items-center justify-center px-6 text-center">
        <p className="text-[14px] text-baunilha/70">Retorno não encontrado.</p>
        <TextLink onClick={() => navigate('/acompanhamento')}>Voltar</TextLink>
      </div>
    );
  }

  const meta = returnMeta(ret);
  const isDone = ret.status === 'done';
  const isNext = ret.status === 'scheduled';
  const prev = isNext ? previousReturn(ret.id) : null;

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
          {ret.type}
        </span>
        <span className="h-10 w-10" aria-hidden />
      </header>

      <div className="flex-1 overflow-y-auto px-5 pb-6">
        {/* Hero — data + médico + status */}
        <section className="rounded-card-lg bg-surface p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-baunilha/55" />
                <span className="text-[12px] text-baunilha/65">
                  {fmtBR(ret.plannedDate)}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <Stethoscope size={14} className="text-menta" />
                <span className="text-[13.5px] font-semibold">{ret.doctor}</span>
              </div>
            </div>
            <span
              className="shrink-0 rounded-pill px-2.5 py-1 text-[10px] font-bold"
              style={{
                backgroundColor: `hsl(var(--${meta.color}) / 0.18)`,
                color: `hsl(var(--${meta.color}))`,
              }}
            >
              {meta.label}
            </span>
          </div>
        </section>

        {/* ---- VERSÃO PARA RETORNO PASSADO ---- */}
        {isDone && ret.snapshot && (
          <>
            <section className="mt-4 rounded-card bg-surface p-5">
              <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
                Métricas do dia
              </p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <Metric label="AHI" value={ret.snapshot.ahi} />
                <Metric label="Aderência CPAP" value={`${ret.snapshot.cpapAdherence}%`} />
                <Metric label="CPAP horas/noite" value={`${ret.snapshot.cpapHoursAvg}h`} />
                <Metric label="SpO₂ mín" value={`${ret.snapshot.spo2Min}%`} />
                <Metric label="Sleep Score" value={ret.snapshot.sleepScore} />
              </div>
            </section>

            <section className="mt-4 rounded-card bg-surface p-5">
              <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
                O que o paciente relatou
              </p>
              <p className="mt-2 text-[13px] leading-[1.5] text-text-primary/90 italic">
                &ldquo;{ret.snapshot.symptoms}&rdquo;
              </p>
            </section>

            {ret.decisions && (
              <section
                className="mt-4 rounded-card border p-5"
                style={{
                  backgroundColor: 'hsl(var(--menta) / 0.10)',
                  borderColor: 'hsl(var(--menta) / 0.32)',
                }}
              >
                <p className="text-[11px] font-semibold uppercase tracking-kicker text-menta">
                  Decisões do médico
                </p>
                <div className="mt-3 space-y-2">
                  {ret.decisions.map((d) => (
                    <div key={d} className="flex items-start gap-2.5">
                      <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-menta" />
                      <span className="text-[13px] leading-[1.4] text-text-primary/90">
                        {d}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {/* ---- VERSÃO PARA PRÓXIMO RETORNO (PRÉ-CONSULTA AUTO) ---- */}
        {isNext && (
          <>
            {ret.triggeredBy === 'clinical' && (
              <section
                className="mt-4 rounded-card p-5"
                style={{
                  backgroundColor: 'hsl(var(--laranja) / 0.12)',
                  border: '1px solid hsl(var(--laranja) / 0.35)',
                }}
              >
                <div className="flex items-center gap-2">
                  <AlertCircle size={16} className="text-laranja" />
                  <p className="text-[11px] font-semibold uppercase tracking-kicker text-laranja">
                    Por que antecipamos este retorno
                  </p>
                </div>
                <p className="mt-3 text-[13px] leading-[1.55] text-text-primary/90">
                  {ret.triggerReason}
                </p>
                {ret.triggerData && (
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <TriggerStat
                      label="Sleep Score"
                      value={`${ret.triggerData.sleepScoreDelta} pts`}
                      detail={`em ${ret.triggerData.sleepScoreWindow}`}
                      trend="down"
                    />
                    <TriggerStat
                      label="AHI médio"
                      value={`${ret.triggerData.ahiAvgPrior} → ${ret.triggerData.ahiAvgRecent}`}
                      detail="últimas 4 noites"
                      trend="up"
                    />
                  </div>
                )}
              </section>
            )}

            {prev && prev.snapshot && (
              <section className="mt-4 rounded-card bg-surface p-5">
                <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
                  Comparativo com {prev.type}
                </p>
                <p className="mt-1 text-[12px] text-baunilha/60">
                  Como estava {fmtBR(prev.plannedDate)} vs últimas noites
                </p>
                <div className="mt-3 space-y-2">
                  <CompareRow label="AHI" was={prev.snapshot.ahi} now={ret.triggerData?.ahiAvgRecent || prev.snapshot.ahi} lowerIsBetter />
                  <CompareRow label="Aderência CPAP" was={`${prev.snapshot.cpapAdherence}%`} now="77%" />
                  <CompareRow label="Sleep Score" was={prev.snapshot.sleepScore} now={prev.snapshot.sleepScore + (ret.triggerData?.sleepScoreDelta || 0)} />
                </div>
              </section>
            )}

            {ret.preConsult && (
              <section className="mt-4 rounded-card bg-surface p-5">
                <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
                  Questionário pré-preenchido
                </p>
                <p className="mt-1 text-[12px] text-baunilha/60">
                  Respostas baseadas nos seus dados — você pode revisar antes da consulta.
                </p>
                <div className="mt-3 space-y-3">
                  {ret.preConsult.symptomQuestions.map((q) => (
                    <div key={q.q}>
                      <p className="text-[12.5px] font-semibold text-text-primary/95">
                        {q.q}
                      </p>
                      <p className="mt-1 rounded-pill bg-menta/16 px-3 py-1.5 text-[12px] font-medium text-menta inline-block">
                        {q.preselected}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="mt-4 rounded-card bg-surface p-5">
              <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
                Próximos passos
              </p>
              <div className="mt-3 space-y-3">
                <StepLine
                  icon={<Calendar size={15} className="text-laranja" />}
                  title="Reagendar ou confirmar"
                  body="Você pode confirmar o horário sugerido ou pedir outro."
                />
                <StepLine
                  icon={<Activity size={15} className="text-menta" />}
                  title="Mantenha o uso do CPAP"
                  body="Quanto mais consistente até a consulta, mais útil o comparativo."
                />
                <StepLine
                  icon={<MessageSquare size={15} className="text-sun-moon" />}
                  title="Anote dúvidas"
                  body="Se algo te incomoda, escreve e leva pro médico."
                />
              </div>
            </section>
          </>
        )}
      </div>

      <footer className="flex flex-col items-center gap-3 px-6 pb-5 pt-3">
        {isNext ? (
          <PrimaryButton trailingIcon="→" onClick={() => navigate('/agenda/atendimento')}>
            Confirmar agendamento
          </PrimaryButton>
        ) : (
          <PrimaryButton trailingIcon="→" onClick={() => navigate('/acompanhamento')}>
            Voltar ao acompanhamento
          </PrimaryButton>
        )}
        <TextLink onClick={() => navigate('/sono-ai/full')}>
          <span className="inline-flex items-center gap-1.5">
            <Sparkles size={13} /> Tirar dúvidas com o Sono AI
          </span>
        </TextLink>
      </footer>
    </div>
  );
}

/* --------------------------------- Sub-components */

function Metric({ label, value }) {
  return (
    <div className="rounded-card bg-surface-2/40 p-3">
      <p className="text-[10px] font-semibold uppercase tracking-kicker text-baunilha/55">
        {label}
      </p>
      <p className="mt-1 text-[20px] font-bold text-white">{value}</p>
    </div>
  );
}

function TriggerStat({ label, value, detail, trend }) {
  const Icon = trend === 'down' ? ArrowDownRight : ArrowUpRight;
  return (
    <div className="rounded-card bg-surface/60 p-3">
      <p className="text-[10px] font-semibold uppercase tracking-kicker text-baunilha/55">
        {label}
      </p>
      <div className="mt-1 flex items-center gap-1">
        <Icon size={14} className="text-laranja" />
        <p className="text-[15px] font-bold text-laranja">{value}</p>
      </div>
      <p className="mt-0.5 text-[10px] text-baunilha/55">{detail}</p>
    </div>
  );
}

function CompareRow({ label, was, now, lowerIsBetter = false }) {
  // tenta inferir se piorou
  const wasNum = typeof was === 'number' ? was : parseFloat(String(was).replace('%', ''));
  const nowNum = typeof now === 'number' ? now : parseFloat(String(now).replace('%', ''));
  const delta = nowNum - wasNum;
  const worse = lowerIsBetter ? delta > 0 : delta < 0;
  const Icon = Math.abs(delta) < 0.01 ? Minus : worse ? ArrowUpRight : ArrowDownRight;
  const color = Math.abs(delta) < 0.01 ? 'baunilha' : worse ? 'laranja' : 'menta';

  return (
    <div className="flex items-center justify-between">
      <span className="text-[13px] text-text-primary/85">{label}</span>
      <div className="flex items-center gap-3">
        <span className="text-[12px] text-baunilha/55">{was}</span>
        <Icon size={14} style={{ color: `hsl(var(--${color}))` }} />
        <span className="text-[13.5px] font-bold" style={{ color: `hsl(var(--${color}))` }}>
          {now}
        </span>
      </div>
    </div>
  );
}

function StepLine({ icon, title, body }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-surface-2/60">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold leading-snug text-text-primary/95">{title}</p>
        <p className="mt-0.5 text-[11.5px] leading-[1.4] text-baunilha/55">{body}</p>
      </div>
    </div>
  );
}
