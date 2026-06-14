/**
 * Estado mockado do dispositivo (ADR-023 · WEB-EP-06-FT-03).
 * Sem SDK real — apenas dados de display + helpers de progresso de sync.
 */

export const DEVICE = {
  name: 'Galaxy Watch 6',
  model: 'SM-R930',
  brand: 'Samsung',
  // Persona: paciente já pareado, conectado, sincronizando OK.
  state: 'connected', // 'connected' | 'offline' | 'syncing'
  battery: 78, // 0-100
  lastSyncMinutesAgo: 12,
  pairedSinceDays: 47,
};

export const PERMISSIONS = [
  {
    key: 'heart_rate',
    label: 'Frequência cardíaca',
    hint: 'Leitura contínua e variabilidade noturna',
    icon: 'heart',
    granted: true,
  },
  {
    key: 'spo2',
    label: 'Saturação de oxigênio (SpO₂)',
    hint: 'Quedas durante o sono — sinal de apneia',
    icon: 'droplet',
    granted: true,
  },
  {
    key: 'sleep',
    label: 'Sessões de sono',
    hint: 'Início, fim, estágios e despertares',
    icon: 'moon',
    granted: true,
  },
  {
    key: 'steps',
    label: 'Passos e atividade',
    hint: 'Atividade do dia anterior para contexto',
    icon: 'footprints',
    granted: false,
  },
];

/** Bateria → cor semântica do design system. */
export function batteryColor(pct) {
  if (pct >= 30) return 'menta';
  if (pct >= 10) return 'risk-moderate';
  return 'risk-high';
}

/** Status → metadados de display. */
export function statusMeta(state) {
  switch (state) {
    case 'connected':
      return { label: 'Conectado', color: 'menta', dotColor: 'menta' };
    case 'syncing':
      return { label: 'Sincronizando', color: 'laranja', dotColor: 'laranja' };
    case 'offline':
    default:
      return { label: 'Offline', color: 'baunilha', dotColor: 'baunilha' };
  }
}

/** "12 min atrás", "agora", "2h atrás". Recebe minutos desde a última sync. */
export function syncRelative(minutesAgo) {
  if (minutesAgo == null) return 'sem registro';
  if (minutesAgo === 0) return 'agora';
  if (minutesAgo < 1) return 'há instantes';
  if (minutesAgo < 60) return `há ${minutesAgo} min`;
  const hours = Math.floor(minutesAgo / 60);
  if (hours < 24) return `há ${hours}h`;
  const days = Math.floor(hours / 24);
  return `há ${days}d`;
}
