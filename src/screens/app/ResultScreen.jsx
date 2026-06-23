import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, animate } from 'framer-motion';
import { ChevronLeft, Share2, RefreshCw } from 'lucide-react';
import PrimaryButton from '@/components/primitives/PrimaryButton.jsx';
import RiskBadge from '@/components/primitives/RiskBadge.jsx';
import ScoreBar from '@/components/primitives/ScoreBar.jsx';
import { useSleepState } from '@/state/SleepStateContext.jsx';
import { comingSoon } from '@/lib/demoToast.js';
import { DISCLAIMER } from '@/lib/positioning.js';

const RISK_HEX = {
  low: { var: 'risk-low' },
  moderate: { var: 'risk-moderate' },
  high: { var: 'risk-high' },
  critical: { var: 'risk-critical' },
};

export default function ResultScreen() {
  const navigate = useNavigate();
  const { ensureResult } = useSleepState();

  // Garante dados na montagem — gera mock se acessado diretamente.
  const { session, score, isDemo } = useMemo(() => ensureResult(), [ensureResult]);

  const reset = () => navigate('/app/home');
  const recColor = RISK_HEX[score.risk]?.var ?? 'risk-moderate';

  // Force-sync inline (ADR-023). Estado: idle → syncing → fresh.
  const [syncState, setSyncState] = useState('idle');
  const handleSync = () => {
    if (syncState === 'syncing') return;
    setSyncState('syncing');
    setTimeout(() => setSyncState('fresh'), 1500);
  };
  useEffect(() => {
    if (syncState !== 'fresh') return;
    const t = setTimeout(() => setSyncState('idle'), 3500);
    return () => clearTimeout(t);
  }, [syncState]);

  return (
    <div className="flex h-full flex-col">
      {/* Top bar */}
      <header className="flex items-center justify-between px-4 pt-4 pb-2">
        <button
          type="button"
          onClick={reset}
          aria-label="Voltar"
          className="grid h-10 w-10 place-items-center rounded-full bg-surface-2/60 text-text-primary/90 transition hover:bg-surface-2"
        >
          <ChevronLeft size={20} strokeWidth={2.4} />
        </button>
        <span className="text-[13px] font-semibold uppercase tracking-kicker text-baunilha/60">
          Resultado
        </span>
        <button
          type="button"
          aria-label="Compartilhar"
          onClick={() => comingSoon('Compartilhar resultado')}
          className="grid h-10 w-10 place-items-center rounded-full bg-surface-2/60 text-text-primary/90 transition hover:bg-surface-2"
        >
          <Share2 size={16} strokeWidth={2.2} />
        </button>
      </header>

      {/* MODO DEMO banner */}
      {isDemo ? (
        <motion.div
          initial={{ y: -28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.32, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center gap-2 py-2.5"
          style={{ backgroundColor: 'hsl(var(--risk-moderate) / 0.18)' }}
        >
          <span
            aria-hidden
            className="block h-2 w-2 rounded-full"
            style={{ backgroundColor: 'hsl(var(--risk-moderate))' }}
          />
          <span
            className="text-[11px] font-semibold uppercase tracking-kicker"
            style={{ color: 'hsl(var(--risk-moderate))' }}
          >
            Modo demo • dados simulados
          </span>
        </motion.div>
      ) : null}

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-5 pt-6 pb-4 space-y-4">
        {/* Hero score card */}
        <motion.section
          initial={{ scale: 0.97, opacity: 0, y: 12 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-card-lg bg-surface p-6 flex flex-col items-center gap-3"
        >
          <RiskBadge level={score.risk} />
          <div className="flex items-end gap-1 mt-1">
            <ScoreNumber value={score.quality} />
            <span className="pb-2 text-2xl font-medium text-baunilha/55">/100</span>
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/60">
            Qualidade do sono
          </span>
          <hr className="my-2 w-full border-surface-2/60" />
          <div className="flex w-full justify-between">
            <Metric value={formatDuration(session.totalSleepMinutes)} label="Duração" />
            <Metric value={`${session.spo2Min}%`} label="SpO₂ mín" />
            <Metric value={`${session.heartRateAvg}`} label="FC média" />
          </div>
        </motion.section>

        {/* Breakdown */}
        <section className="rounded-card bg-surface p-5">
          <h2 className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/50 mb-4">
            Sinais observados
          </h2>
          <div className="space-y-4">
            <ScoreBar
              label="Indícios de apneia"
              value={score.apnea}
              color="laranja"
              delay={0}
            />
            <ScoreBar
              label="Indícios de insônia"
              value={score.insomnia}
              color="menta"
              delay={80}
            />
          </div>
        </section>

        {/* Recommendation */}
        {score.recommendation ? (
          <section
            className="rounded-card p-5 border"
            style={{
              backgroundColor: `hsl(var(--${recColor}) / 0.10)`,
              borderColor: `hsl(var(--${recColor}) / 0.35)`,
            }}
          >
            <p
              className="text-[11px] font-semibold uppercase tracking-kicker"
              style={{ color: `hsl(var(--${recColor}))` }}
            >
              Orientação
            </p>
            <h3 className="mt-2 text-[20px] font-bold leading-[1.25]">
              {score.recommendation.title}
            </h3>
            <p className="mt-2.5 text-sm leading-[1.5] text-text-primary/75">
              {score.recommendation.body}
            </p>
          </section>
        ) : null}

        {/* Findings */}
        <section className="rounded-card bg-surface p-5">
          <h2 className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/50 mb-3.5">
            Destaques da noite
          </h2>
          {score.findings.length > 0 ? (
            <motion.ul
              className="space-y-3.5"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.07, delayChildren: 0.35 } },
              }}
            >
              {score.findings.map((f) => (
                <motion.li
                  key={f}
                  className="flex gap-3"
                  variants={{
                    hidden: { opacity: 0, x: -8 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  <span aria-hidden className="text-laranja font-bold">›</span>
                  <span className="text-sm leading-[1.5] text-text-primary/90">
                    {f}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          ) : (
            <p className="text-sm text-baunilha/65">Nenhum sinal preocupante hoje.</p>
          )}
        </section>
      </div>

      {/* Footer actions */}
      <div className="flex flex-col items-center gap-3 px-6 pt-3 pb-6 bg-marinho-deep border-t border-surface-2/40">
        <PrimaryButton trailingIcon="→" onClick={() => navigate('/triagem/intro')}>
          Aprofundar com triagem clínica
        </PrimaryButton>
        <button
          type="button"
          onClick={handleSync}
          disabled={syncState === 'syncing'}
          className="flex items-center gap-1.5 text-[13px] font-medium text-baunilha/60 underline-offset-4 hover:text-baunilha/85 disabled:opacity-70"
        >
          <RefreshCw
            size={13}
            className={syncState === 'syncing' ? 'animate-spin' : ''}
          />
          {syncState === 'syncing'
            ? 'Sincronizando…'
            : syncState === 'fresh'
              ? 'Atualizado há instantes'
              : 'Atualizar dados do relógio'}
        </button>
        <p className="px-4 text-center text-[11px] leading-[1.4] text-baunilha/45">
          {DISCLAIMER.footer}
        </p>
      </div>
    </div>
  );
}

/** Conta de 0 até value com easing — atende WEB-EP-04-FT-02-US-01. */
function ScoreNumber({ value }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const controls = animate(0, value, {
      duration: 0.6,
      delay: 0.15,
      ease: [0.33, 1, 0.68, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [value]);

  return (
    <motion.span
      className="text-[88px] font-bold leading-none tracking-tighter"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {display}
    </motion.span>
  );
}

function Metric({ value, label }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-[18px] font-bold leading-none">{value}</span>
      <span className="text-[11px] font-medium uppercase tracking-wide text-baunilha/55">
        {label}
      </span>
    </div>
  );
}

function formatDuration(min) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${h}h ${String(m).padStart(2, '0')}`;
}
