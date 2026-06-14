import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  Battery,
  Wifi,
  RefreshCw,
  Heart,
  Droplet,
  Wind,
  Activity,
  Rotate3d,
  Mic,
  Move,
  Thermometer,
  CheckCircle2,
  CircleSlash,
  Phone,
  Truck,
  Package,
  Cpu,
} from 'lucide-react';
import PrimaryButton from '@/components/primitives/PrimaryButton.jsx';
import TextLink from '@/components/primitives/TextLink.jsx';
import {
  EXAM,
  KIT_CHANNELS,
  KIT_SENSORS,
  signalMeta,
} from '@/data/examMock.js';
import { batteryColor } from '@/data/deviceMock.js';

/**
 * /polisso-movel/dispositivo · Kit PSG domiciliar (ADR-027 · WEB-EP-08-FT-04-US-05).
 * Simétrica à /dispositivo do relógio: hero + canais + diagrama de sensores + suporte.
 */

const CHANNEL_ICONS = {
  heart: Heart,
  droplet: Droplet,
  wind: Wind,
  activity: Activity,
  'rotate-3d': Rotate3d,
  mic: Mic,
  move: Move,
  thermometer: Thermometer,
};

export default function KitDeviceScreen() {
  const navigate = useNavigate();
  const [state, setState] = useState(EXAM.kit.signal === 'lost' ? 'lost' : 'connected');
  const sig = signalMeta(state === 'connected' ? EXAM.kit.signal : 'lost');
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
          Kit PSG
        </span>
        <span className="h-10 w-10" aria-hidden />
      </header>

      <div className="flex-1 overflow-y-auto px-5 pb-6">
        {/* Hero status */}
        <section className="relative overflow-hidden rounded-card-lg bg-surface p-6">
          <div className="flex flex-col items-center text-center">
            <div
              className="relative grid h-[88px] w-[88px] place-items-center rounded-full"
              style={{
                backgroundColor: `hsl(var(--${sig.color}) / 0.18)`,
                boxShadow: `0 0 32px hsl(var(--${sig.color}) / 0.28)`,
              }}
            >
              <Cpu size={36} style={{ color: `hsl(var(--${sig.color}))` }} />
              {state === 'connected' && (
                <motion.span
                  className="absolute inset-0 rounded-full border-2"
                  style={{ borderColor: `hsl(var(--${sig.color}) / 0.5)` }}
                  animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
              )}
            </div>
            <p className="mt-4 text-[20px] font-bold leading-tight">{EXAM.kit.model}</p>
            <p className="mt-0.5 text-[12px] text-baunilha/55">
              Polissonografia domiciliar
            </p>

            <span
              className="mt-3 inline-flex items-center gap-1.5 rounded-pill px-3 py-1.5 text-[11px] font-semibold"
              style={{
                backgroundColor: `hsl(var(--${sig.color}) / 0.16)`,
                color: `hsl(var(--${sig.color}))`,
              }}
            >
              <span
                className="block h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: `hsl(var(--${sig.color}))` }}
              />
              {sig.label}
            </span>

            <div className="mt-5 grid w-full grid-cols-2 gap-3">
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
          </div>
        </section>

        {/* Canais clínicos */}
        <section className="mt-4 rounded-card bg-surface p-5">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
            Canais clínicos sendo coletados
          </p>
          <p className="mt-1 text-[14px] font-bold">8 canais</p>
          <div className="mt-3 grid grid-cols-2 gap-2.5">
            {KIT_CHANNELS.map((ch) => (
              <ChannelTile key={ch.key} channel={ch} />
            ))}
          </div>
        </section>

        {/* Diagrama dos sensores */}
        <section className="mt-4 rounded-card bg-surface p-5">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
            Onde os sensores ficam
          </p>
          <p className="mt-1 text-[12px] text-baunilha/65">
            Vista esquemática. Posicione cada sensor 30min antes de dormir.
          </p>
          <SensorDiagram />
          <div className="mt-3 grid grid-cols-2 gap-2.5">
            {KIT_SENSORS.map((s) => (
              <SensorLegend key={s.key} sensor={s} />
            ))}
          </div>
        </section>

        {/* Devolução + suporte */}
        <section className="mt-4 rounded-card bg-surface p-5">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
            Devolução e suporte
          </p>
          <div className="mt-3 flex flex-col gap-3">
            <StepLine
              icon={<Truck size={15} className="text-laranja" />}
              title={`Devolver até ${EXAM.expectedReturnDate}`}
              body="Motoboy passa no mesmo endereço de entrega."
            />
            <StepLine
              icon={<Package size={15} className="text-menta" />}
              title="Como embalar"
              body="Use a caixa original. Enrole a faixa torácica e proteja o módulo central com a espuma azul."
            />
          </div>
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

        {/* Toggle de demo */}
        <section className="mt-4 rounded-card border border-dashed border-surface-2/50 bg-surface/40 p-4">
          <p className="text-[10px] font-semibold uppercase tracking-kicker text-baunilha/45">
            Modo demo
          </p>
          <p className="mt-1 text-[12px] text-baunilha/60">
            Simule a perda de sinal para apresentar.
          </p>
          <div className="mt-3 flex gap-2">
            {[
              { id: 'connected', label: 'Conectado' },
              { id: 'lost', label: 'Sem sinal' },
            ].map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setState(s.id)}
                className={
                  'flex-1 rounded-pill px-3 py-1.5 text-[11px] font-semibold transition ' +
                  (state === s.id
                    ? 'bg-text-primary/90 text-marinho-deep'
                    : 'bg-surface-2/60 text-baunilha/75 hover:bg-surface-2')
                }
              >
                {s.label}
              </button>
            ))}
          </div>
        </section>
      </div>

      <footer className="flex flex-col items-center gap-3 px-6 pb-5 pt-3">
        <PrimaryButton
          leadingIcon={<RefreshCw size={16} />}
          onClick={() => navigate('/polisso-movel/stream')}
        >
          Ver dados ao vivo
        </PrimaryButton>
        <TextLink onClick={() => navigate('/polisso-movel/acompanhamento')}>
          Acompanhar exame
        </TextLink>
      </footer>
    </div>
  );
}

/* -------------------------------------------------- Sub-components */

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
        className="mt-1.5 text-[18px] font-bold"
        style={valueColor ? { color: `hsl(var(--${valueColor}))` } : undefined}
      >
        {value}
      </p>
    </div>
  );
}

function ChannelTile({ channel }) {
  const Icon = CHANNEL_ICONS[channel.icon] || Activity;
  const color = channel.active ? 'menta' : 'risk-moderate';
  const StatusIcon = channel.active ? CheckCircle2 : CircleSlash;
  return (
    <div
      className={
        'flex items-center gap-2.5 rounded-card bg-surface-2/40 p-2.5 ' +
        (channel.active ? '' : 'opacity-65')
      }
    >
      <span
        className="grid h-8 w-8 shrink-0 place-items-center rounded-lg"
        style={{ backgroundColor: `hsl(var(--${color}) / 0.16)` }}
      >
        <Icon size={13} style={{ color: `hsl(var(--${color}))` }} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[11.5px] font-semibold text-text-primary/95">
          {channel.label}
        </p>
        <p className="text-[10px] text-baunilha/55">
          {channel.active ? 'Ativo' : 'Sem leitura'}
        </p>
      </div>
      <StatusIcon size={12} style={{ color: `hsl(var(--${color}))` }} />
    </div>
  );
}

function SensorLegend({ sensor }) {
  return (
    <div className="flex items-start gap-2 rounded-card bg-surface-2/40 p-2.5">
      <span
        className="mt-0.5 block h-3 w-3 shrink-0 rounded-full"
        style={{ backgroundColor: `hsl(var(--${sensor.color}))` }}
      />
      <div className="min-w-0 flex-1">
        <p className="text-[11.5px] font-semibold text-text-primary/95">{sensor.label}</p>
        <p className="text-[10.5px] leading-[1.3] text-baunilha/55">{sensor.hint}</p>
      </div>
    </div>
  );
}

function SensorDiagram() {
  // SVG esquemático simplificado: cabeça + tronco + braços + dedo apontado.
  // 200x260 viewBox; sensores plotados em coordenadas % do KIT_SENSORS.
  const W = 200;
  const H = 260;
  return (
    <div className="mt-3 flex justify-center">
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: 200, height: 260 }}>
        {/* Cabeça */}
        <circle cx="100" cy="32" r="22" stroke="hsl(var(--baunilha) / 0.4)" strokeWidth="1.5" fill="none" />
        {/* Pescoço */}
        <line x1="100" y1="54" x2="100" y2="66" stroke="hsl(var(--baunilha) / 0.4)" strokeWidth="1.5" />
        {/* Tronco */}
        <path
          d="M 70 66 Q 64 95 64 155 L 136 155 Q 136 95 130 66 Z"
          stroke="hsl(var(--baunilha) / 0.4)"
          strokeWidth="1.5"
          fill="hsl(var(--surface-2) / 0.3)"
        />
        {/* Braços */}
        <path
          d="M 70 70 Q 50 100 46 140 L 56 165 Q 60 130 78 105"
          stroke="hsl(var(--baunilha) / 0.4)"
          strokeWidth="1.5"
          fill="hsl(var(--surface-2) / 0.3)"
        />
        <path
          d="M 130 70 Q 150 100 154 140 L 144 165 Q 140 130 122 105"
          stroke="hsl(var(--baunilha) / 0.4)"
          strokeWidth="1.5"
          fill="hsl(var(--surface-2) / 0.3)"
        />
        {/* Dedo (oxímetro) */}
        <line x1="148" y1="158" x2="158" y2="170" stroke="hsl(var(--baunilha) / 0.4)" strokeWidth="1.5" />
        <circle cx="158" cy="170" r="5" stroke="hsl(var(--baunilha) / 0.4)" strokeWidth="1.5" fill="none" />
        {/* Faixa torácica — linha ilustrativa */}
        <line x1="68" y1="100" x2="132" y2="100" stroke="hsl(var(--laranja) / 0.6)" strokeWidth="2" strokeDasharray="3 2" />

        {/* Sensores plotados */}
        {KIT_SENSORS.map((s, i) => {
          const cx = (s.x / 100) * W;
          const cy = (s.y / 100) * H;
          return (
            <g key={s.key}>
              <circle
                cx={cx}
                cy={cy}
                r="9"
                fill={`hsl(var(--${s.color}))`}
                opacity={0.22}
              />
              <circle
                cx={cx}
                cy={cy}
                r="5"
                fill={`hsl(var(--${s.color}))`}
              />
              <text
                x={cx}
                y={cy + 1.5}
                textAnchor="middle"
                fontSize="6.5"
                fontWeight="700"
                fill="hsl(var(--marinho-deep))"
              >
                {i + 1}
              </text>
            </g>
          );
        })}
      </svg>
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
