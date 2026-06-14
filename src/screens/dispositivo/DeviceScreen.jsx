import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  Watch,
  Battery,
  RefreshCw,
  RotateCw,
  Heart,
  Droplet,
  Moon,
  Footprints,
  ShieldCheck,
  ShieldAlert,
  ChevronRight,
  Cpu,
  Wifi,
} from 'lucide-react';
import PrimaryButton from '@/components/primitives/PrimaryButton.jsx';
import TextLink from '@/components/primitives/TextLink.jsx';
import {
  DEVICE,
  PERMISSIONS,
  batteryColor,
  statusMeta,
  syncRelative,
} from '@/data/deviceMock.js';
import { EXAM, signalMeta } from '@/data/examMock.js';

const PERMISSION_ICONS = {
  heart: Heart,
  droplet: Droplet,
  moon: Moon,
  footprints: Footprints,
};

/**
 * /dispositivo · Gestão do relógio (ADR-023 · WEB-EP-06-FT-03).
 * Hero de status + bateria + sync + permissões + reconectar/trocar.
 */
export default function DeviceScreen() {
  const navigate = useNavigate();
  const [state, setState] = useState(DEVICE.state);
  const [lastSync, setLastSync] = useState(DEVICE.lastSyncMinutesAgo);
  const isSyncing = state === 'syncing';
  const isOffline = state === 'offline';

  const meta = statusMeta(state);
  const kitInUse = EXAM.state === 'in_progress' || EXAM.state === 'returning';
  const kitSig = signalMeta(EXAM.kit.signal);
  const kitBattCol = batteryColor(EXAM.kit.battery);

  const sync = () => {
    if (isSyncing) return;
    setState('syncing');
    setTimeout(() => {
      setState('connected');
      setLastSync(0);
    }, 1500);
  };

  const reconnect = () => {
    if (isSyncing) return;
    setState('syncing');
    setTimeout(() => {
      setState('connected');
      setLastSync(0);
    }, 1800);
  };

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
          Dispositivo
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
                backgroundColor: `hsl(var(--${meta.color}) / 0.18)`,
                boxShadow: `0 0 32px hsl(var(--${meta.color}) / 0.28)`,
              }}
            >
              <Watch size={36} style={{ color: `hsl(var(--${meta.color}))` }} />
              {isSyncing && (
                <motion.span
                  className="absolute inset-0 rounded-full border-2"
                  style={{ borderColor: `hsl(var(--${meta.color}) / 0.6)` }}
                  animate={{ scale: [1, 1.18, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                />
              )}
            </div>
            <p className="mt-4 text-[20px] font-bold leading-tight">{DEVICE.name}</p>
            <p className="mt-0.5 text-[12px] text-baunilha/55">
              {DEVICE.brand} · {DEVICE.model}
            </p>

            <span
              className="mt-3 inline-flex items-center gap-1.5 rounded-pill px-3 py-1.5 text-[11px] font-semibold"
              style={{
                backgroundColor: `hsl(var(--${meta.color}) / 0.16)`,
                color: `hsl(var(--${meta.color}))`,
              }}
            >
              <span
                className="block h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: `hsl(var(--${meta.dotColor}))` }}
              />
              {meta.label}
            </span>

            <div className="mt-5 grid w-full grid-cols-2 gap-3">
              <StatTile
                icon={<Battery size={16} style={{ color: `hsl(var(--${batteryColor(DEVICE.battery)}))` }} />}
                label="Bateria"
                value={`${DEVICE.battery}%`}
                valueColor={batteryColor(DEVICE.battery)}
              />
              <StatTile
                icon={<RefreshCw size={16} className="text-baunilha/70" />}
                label="Última sync"
                value={syncRelative(lastSync)}
              />
            </div>
          </div>
        </section>

        {/* CTA principal */}
        <section className="mt-4">
          {isOffline ? (
            <PrimaryButton leadingIcon={<RotateCw size={18} />} onClick={reconnect}>
              Tentar reconectar
            </PrimaryButton>
          ) : (
            <button
              type="button"
              onClick={sync}
              disabled={isSyncing}
              className="flex w-full items-center justify-center gap-2 rounded-button bg-laranja py-3.5 text-base font-semibold text-text-on-brand shadow-[0_8px_24px_-12px_hsl(var(--laranja)/0.6)] transition disabled:opacity-60"
            >
              <RefreshCw
                size={18}
                className={isSyncing ? 'animate-spin' : ''}
              />
              {isSyncing ? 'Sincronizando...' : 'Sincronizar agora'}
            </button>
          )}
        </section>

        {/* Permissões */}
        <section className="mt-6 rounded-card bg-surface p-5">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
            Dados sincronizados
          </p>
          <p className="mt-1 text-[14px] font-bold">Permissões do relógio</p>
          <div className="mt-3 flex flex-col gap-2.5">
            {PERMISSIONS.map((p) => (
              <PermissionRow key={p.key} item={p} />
            ))}
          </div>
        </section>

        {/* Pareamento e troca */}
        <section className="mt-4 rounded-card bg-surface p-5">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
            Pareamento
          </p>
          <p className="mt-1 text-[13px] text-baunilha/70">
            Pareado há {DEVICE.pairedSinceDays} dias.
          </p>
          <button
            type="button"
            onClick={() => navigate('/pairing/select')}
            className="mt-3 flex w-full items-center justify-between rounded-card bg-surface-2/50 p-3.5 text-left transition hover:bg-surface-2"
          >
            <span className="text-[14px] font-semibold text-text-primary/95">
              Trocar de dispositivo
            </span>
            <ChevronRight size={18} className="text-baunilha/45" />
          </button>
        </section>

        {/* Também em uso: kit PSG (ADR-027) */}
        {kitInUse && (
          <button
            type="button"
            onClick={() => navigate('/polisso-movel/dispositivo')}
            className="mt-4 w-full rounded-card-lg p-4 text-left transition hover:brightness-110"
            style={{
              background:
                'linear-gradient(135deg, hsl(var(--sun-moon) / 0.14) 0%, hsl(var(--laranja) / 0.10) 100%)',
              border: '1px solid hsl(var(--sun-moon) / 0.32)',
            }}
          >
            <div className="flex items-center gap-2">
              <span
                className="grid h-6 w-6 place-items-center rounded-lg"
                style={{ backgroundColor: 'hsl(var(--sun-moon) / 0.22)' }}
              >
                <Cpu size={13} className="text-sun-moon" />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-kicker text-sun-moon">
                Também em uso
              </span>
              <span className="ml-auto rounded-pill bg-sun-moon/22 px-2 py-0.5 text-[10px] font-bold text-sun-moon">
                EXAME
              </span>
            </div>
            <p className="mt-3 text-[15px] font-bold leading-snug">{EXAM.kit.model}</p>
            <p className="mt-1 text-[12px] text-baunilha/65">
              Kit de polissonografia em casa · noite {EXAM.currentNight} de {EXAM.totalNights}
            </p>
            <div className="mt-3 flex items-center gap-3 text-[11.5px] text-baunilha/70">
              <span className="flex items-center gap-1">
                <Battery size={13} style={{ color: `hsl(var(--${kitBattCol}))` }} />
                <span className="font-bold">{EXAM.kit.battery}%</span>
              </span>
              <span className="flex items-center gap-1">
                <Wifi size={13} style={{ color: `hsl(var(--${kitSig.color}))` }} />
                <span className="font-bold">{kitSig.label}</span>
              </span>
              <span className="ml-auto flex items-center gap-0.5 font-semibold text-sun-moon">
                Abrir kit <ChevronRight size={13} />
              </span>
            </div>
          </button>
        )}

        {/* Toggle de estado para demo */}
        <section className="mt-4 rounded-card border border-dashed border-surface-2/50 bg-surface/40 p-4">
          <p className="text-[10px] font-semibold uppercase tracking-kicker text-baunilha/45">
            Modo demo
          </p>
          <p className="mt-1 text-[12px] text-baunilha/60">
            Simule um estado diferente do dispositivo para apresentar.
          </p>
          <div className="mt-3 flex gap-2">
            {['connected', 'offline'].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setState(s)}
                className={
                  'flex-1 rounded-pill px-3 py-1.5 text-[11px] font-semibold transition ' +
                  (state === s
                    ? 'bg-text-primary/90 text-marinho-deep'
                    : 'bg-surface-2/60 text-baunilha/75 hover:bg-surface-2')
                }
              >
                {statusMeta(s).label}
              </button>
            ))}
          </div>
        </section>
      </div>

      <footer className="flex justify-center px-5 pb-5 pt-3">
        <TextLink onClick={() => navigate('/inicio')}>Voltar para o início</TextLink>
      </footer>
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
        className="mt-1.5 text-[18px] font-bold"
        style={valueColor ? { color: `hsl(var(--${valueColor}))` } : undefined}
      >
        {value}
      </p>
    </div>
  );
}

function PermissionRow({ item }) {
  const Icon = PERMISSION_ICONS[item.icon] || Heart;
  const Shield = item.granted ? ShieldCheck : ShieldAlert;
  const color = item.granted ? 'menta' : 'risk-moderate';
  const label = item.granted ? 'Liberado' : 'Negado';

  return (
    <div className="flex items-center gap-3 rounded-card bg-surface-2/40 p-3">
      <span
        className="grid h-9 w-9 shrink-0 place-items-center rounded-xl"
        style={{ backgroundColor: `hsl(var(--${color}) / 0.16)` }}
      >
        <Icon size={16} style={{ color: `hsl(var(--${color}))` }} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold leading-snug text-text-primary/95">
          {item.label}
        </p>
        <p className="mt-0.5 text-[11px] text-baunilha/55">{item.hint}</p>
      </div>
      <span
        className="flex shrink-0 items-center gap-1 rounded-pill px-2 py-0.5 text-[10px] font-bold"
        style={{
          backgroundColor: `hsl(var(--${color}) / 0.18)`,
          color: `hsl(var(--${color}))`,
        }}
      >
        <Shield size={11} />
        {label}
      </span>
    </div>
  );
}
