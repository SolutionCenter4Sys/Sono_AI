import { cn } from '@/lib/utils.js';
import { profileFor } from '@/lib/positioning.js';

/**
 * Badge de perfil de atenção — pill com dot + label em caps tracked.
 * Atende WEB-EP-02-FT-02-US-01.
 *
 * Posicionamento: NÃO usa "risco". Comunica um perfil amigável de atenção
 * (PERFIL TRANQUILO · MERECE ATENÇÃO · ALGO INCOMODA). Ver lib/positioning.js.
 *
 * Props:
 * - level: 'low' | 'moderate' | 'high' | 'critical'
 * - children: label custom (default = perfil derivado do level)
 */
export default function RiskBadge({ level = 'moderate', children, className }) {
  const profile = profileFor(level);
  const token = profile.token;
  const label = children ?? profile.label;

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
