import { cn } from '@/lib/utils.js';

/**
 * Badge semântico de risco — pill com dot + label em caps tracked.
 * Atende WEB-EP-02-FT-02-US-01.
 *
 * Props:
 * - level: 'low' | 'moderate' | 'high' | 'critical'
 * - children: label custom (default = derivado do level)
 */
const LEVEL_TOKEN = {
  low: 'risk-low',
  moderate: 'risk-moderate',
  high: 'risk-high',
  critical: 'risk-critical',
};

const LEVEL_LABEL = {
  low: 'RISCO BAIXO',
  moderate: 'RISCO MODERADO',
  high: 'RISCO ALTO',
  critical: 'RISCO CRÍTICO',
};

export default function RiskBadge({ level = 'moderate', children, className }) {
  const token = LEVEL_TOKEN[level];
  const label = children ?? LEVEL_LABEL[level];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-pill border px-3 py-1.5',
        'text-xs font-semibold tracking-kicker',
        className
      )}
      style={{
        backgroundColor: `hsl(var(--${token}) / 0.18)`,
        borderColor: `hsl(var(--${token}) / 0.5)`,
        color: `hsl(var(--${token}))`,
      }}
    >
      <span
        aria-hidden
        className="block h-2 w-2 rounded-full"
        style={{ backgroundColor: `hsl(var(--${token}))` }}
      />
      {label}
    </span>
  );
}
