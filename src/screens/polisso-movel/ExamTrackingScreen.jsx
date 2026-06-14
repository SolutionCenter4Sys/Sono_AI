import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  Activity,
  Wifi,
  Battery,
  Phone,
  CheckCircle2,
  CircleDashed,
  Loader2,
  Truck,
  FileText,
  Info,
  ArrowRight,
} from 'lucide-react';
import PrimaryButton from '@/components/primitives/PrimaryButton.jsx';
import TextLink from '@/components/primitives/TextLink.jsx';
import {
  EXAM,
  NIGHTS,
  PRELIMINARY,
  progressPct,
  nightsCompleted,
  signalMeta,
} from '@/data/examMock.js';
import { batteryColor } from '@/data/deviceMock.js';

/**
 * /polisso-movel/acompanhamento · Exame multi-noite (ADR-025 · WEB-EP-08-FT-04).
 * Hero status + timeline + pré-resultado + saúde do kit + instruções + devolução.
 */
export default function ExamTrackingScreen() {
  const navigate = useNavigate();
  const pct = progressPct(EXAM.currentNight, EXAM.totalNights);
  const completed = nightsCompleted(NIGHTS);
  const sig = signalMeta(EXAM.kit.signal);
  const battCol = batteryColor(EXAM.kit.battery);

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
          Exame em casa
        </span>
        <span className="h-10 w-10" aria-hidden />
      </header>

      <div className="flex-1 overflow-y-auto px-5 pb-6">
        {/* Hero status */}
        <section
          className="overflow-hidden rounded-card-lg p-6"
          style={{
            background:
              'linear-gradient(135deg, hsl(var(--menta) / 0.18) 0%, hsl(var(--laranja) / 0.12) 100%)',
            border: '1px solid hsl(var(--menta) / 0.32)',
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="grid h-7 w-7 place-items-center rounded-lg"
              style={{ backgroundColor: 'hsl(var(--menta) / 0.22)' }}
            >
              <Activity size={14} className="text-menta" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-kicker text-menta">
              Em andamento
            </span>
          </div>
          <p className="mt-3 text-[13px] uppercase tracking-kicker text-baunilha/60">
            Sua noite
          </p>
          <h1 className="mt-1 text-[32px] font-bold leading-none tracking-tight">
            Noite {EXAM.currentNight} <span className="text-baunilha/55">de {EXAM.totalNights}</span>
          </h1>
          <p className="mt-2 text-[12.5px] text-baunilha/70">
            Iniciado em {EXAM.startDate} · devolução até {EXAM.expectedReturnDate}
          </p>

          <div className="mt-4">
            <div className="mb-1.5 flex items-center justify-between text-[11px]">
              <span className="text-baunilha/60">{completed} noite(s) concluída(s)</span>
              <span className="font-semibold text-menta">{pct}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-pill bg-surface-2/70">
              <div className="h-full rounded-pill bg-menta" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </section>

        {/* CTA principal — ver dados ao vivo */}
        <button
          type="button"
          onClick={() => navigate('/polisso-movel/stream')}
          className="mt-4 flex w-full items-center justify-between rounded-card-lg bg-surface p-4 transition hover:bg-surface-2/60"
        >
          <span className="flex items-center gap-3">
            <span
              className="grid h-10 w-10 place-items-center rounded-xl"
              style={{ backgroundColor: 'hsl(var(--laranja) / 0.18)' }}
            >
              <Activity size={18} className="text-laranja" />
            </span>
            <span className="text-left">
              <span className="block text-[14px] font-semibold text-text-primary/95">
                Ver dados ao vivo
              </span>
              <span className="block text-[11.5px] text-baunilha/55">
                8 canais clínicos sendo coletados agora
              </span>
            </span>
          </span>
          <ArrowRight size={18} className="text-baunilha/45" />
        </button>

        {/* Timeline */}
        <section className="mt-5 rounded-card bg-surface p-5">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
            Timeline das noites
          </p>
          <div className="mt-3 flex flex-col gap-2">
            {NIGHTS.map((n) => (
              <NightRow key={n.number} night={n} />
            ))}
          </div>
        </section>

        {/* Pré-resultado */}
        <section
          className="mt-4 rounded-card border p-5"
          style={{
            backgroundColor: 'hsl(var(--menta) / 0.10)',
            borderColor: 'hsl(var(--menta) / 0.32)',
          }}
        >
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-kicker text-menta">
              Pré-resultado consolidado
            </p>
            <span className="rounded-pill bg-surface/60 px-2 py-0.5 text-[10px] font-bold text-baunilha/70">
              {PRELIMINARY.coveragePct}% dos dados
            </span>
          </div>
          <h2 className="mt-2 text-[18px] font-bold leading-snug">
            {PRELIMINARY.classification}
          </h2>
          <div className="mt-3 flex items-end gap-2">
            <span className="text-[40px] font-bold leading-none">
              {PRELIMINARY.ahiAvg}
            </span>
            <span className="mb-1.5 text-[12px] text-baunilha/55">AHI médio (parcial)</span>
          </div>
          <p className="mt-2 text-[11.5px] leading-[1.45] text-baunilha/60">
            <Info size={11} className="mr-1 inline text-baunilha/50" />
            {PRELIMINARY.note}
          </p>
        </section>

        {/* Saúde do equipamento */}
        <section className="mt-4 rounded-card bg-surface p-5">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
            Saúde do equipamento
          </p>
          <p className="mt-1 text-[13px] font-bold">{EXAM.kit.model}</p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <StatTile
              icon={<Battery size={14} style={{ color: `hsl(var(--${battCol}))` }} />}
              label="Bateria"
              value={`${EXAM.kit.battery}%`}
              valueColor={battCol}
            />
            <StatTile
              icon={<Wifi size={14} style={{ color: `hsl(var(--${sig.color}))` }} />}
              label="Sinal"
              value={sig.label}
              valueColor={sig.color}
            />
          </div>
        </section>

        {/* Instruções */}
        <section className="mt-4 rounded-card bg-surface p-5">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
            Antes de dormir
          </p>
          <ul className="mt-3 flex flex-col gap-2.5">
            {[
              'Vista a faixa torácica + cânula nasal 30min antes de deitar',
              'Carregue o módulo central durante o jantar (autonomia 9h)',
              'Mantenha o celular próximo, na rede Wi-Fi de casa',
              'Evite cafeína e álcool nas 6h anteriores',
            ].map((tip) => (
              <li
                key={tip}
                className="flex items-start gap-2.5 text-[13px] leading-[1.4] text-text-primary/85"
              >
                <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-laranja" />
                {tip}
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-button border py-3 text-[13px] font-semibold text-sun-moon"
            style={{
              backgroundColor: 'hsl(var(--sun-moon) / 0.1)',
              borderColor: 'hsl(var(--sun-moon) / 0.4)',
            }}
          >
            <Phone size={14} />
            Chamar técnico ({EXAM.technician.name.split(' ')[0]})
          </button>
        </section>

        {/* Devolução + próximos passos */}
        <section className="mt-4 rounded-card bg-surface p-5">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
            Devolução e próximos passos
          </p>
          <div className="mt-3 flex flex-col gap-3">
            <StepLine
              icon={<Truck size={15} className="text-laranja" />}
              title={`Devolver o kit até ${EXAM.expectedReturnDate}`}
              body="Coleta agendada por motoboy, no mesmo endereço de entrega."
            />
            <StepLine
              icon={<Loader2 size={15} className="text-menta" />}
              title="Análise por IA (~24h após devolução)"
              body="O algoritmo consolida os dados de todas as noites e gera o pré-laudo."
            />
            <StepLine
              icon={<FileText size={15} className="text-sun-moon" />}
              title="Laudo assinado pelo médico"
              body="Médico do sono valida e libera o laudo no seu app."
            />
          </div>
        </section>
      </div>

      <footer className="flex flex-col items-center gap-3 px-6 pb-5 pt-3">
        <PrimaryButton
          trailingIcon="→"
          onClick={() => navigate('/polisso-movel/stream')}
          leadingIcon={<Activity size={16} />}
        >
          Ver dados ao vivo
        </PrimaryButton>
        <TextLink onClick={() => navigate('/inicio')}>Voltar para o início</TextLink>
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------- Sub-components */

function NightRow({ night }) {
  const isDone = night.status === 'completed';
  const isCurrent = night.status === 'in_progress';
  const Icon = isDone ? CheckCircle2 : isCurrent ? Loader2 : CircleDashed;
  const color = isDone ? 'menta' : isCurrent ? 'laranja' : 'baunilha';
  const fade = night.status === 'pending' ? 'opacity-55' : '';

  return (
    <div className={'flex items-center gap-3 rounded-card bg-surface-2/40 p-3 ' + fade}>
      <span
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full"
        style={{ backgroundColor: `hsl(var(--${color}) / 0.18)` }}
      >
        <Icon
          size={16}
          style={{ color: `hsl(var(--${color}))` }}
          className={isCurrent ? 'animate-spin' : ''}
        />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold leading-snug text-text-primary/95">
          Noite {night.number} · {night.date}
        </p>
        <p className="mt-0.5 text-[11px] text-baunilha/55">
          {isDone
            ? `AHI ${night.ahi} · SpO₂ mín ${night.spo2Min}% · ${night.duration}`
            : isCurrent
              ? 'Coleta em andamento'
              : 'Pendente'}
        </p>
      </div>
      {isDone && (
        <span className="shrink-0 rounded-pill bg-menta/16 px-2 py-0.5 text-[10px] font-bold text-menta">
          OK
        </span>
      )}
      {isCurrent && (
        <span className="shrink-0 rounded-pill bg-laranja/16 px-2 py-0.5 text-[10px] font-bold text-laranja">
          AGORA
        </span>
      )}
    </div>
  );
}

function StatTile({ icon, label, value, valueColor }) {
  return (
    <div className="rounded-card bg-surface-2/40 p-3.5 text-left">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
          {label}
        </span>
      </div>
      <p
        className="mt-1.5 text-[16px] font-bold"
        style={valueColor ? { color: `hsl(var(--${valueColor}))` } : undefined}
      >
        {value}
      </p>
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

