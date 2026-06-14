import { motion } from 'framer-motion';
import { cn } from '@/lib/utils.js';

/**
 * Barra horizontal de score animada.
 * Atende WEB-EP-02-FT-02-US-02 e WEB-EP-04-FT-02-US-02 (stagger entre múltiplas barras).
 *
 * Props:
 * - label: nome da dimensão (ex.: "Apneia obstrutiva")
 * - value: 0-100
 * - color: 'laranja' | 'menta' | 'risk-low' | 'risk-moderate' | 'risk-high' | 'risk-critical'
 *          (mapeia para o token CSS)
 * - delay: ms de atraso na animação (para stagger)
 */
export default function ScoreBar({
  label,
  value,
  color = 'laranja',
  delay = 0,
  className,
}) {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-text-primary/95">{label}</span>
        <span
          className="text-lg font-bold"
          style={{ color: `hsl(var(--${color}))` }}
        >
          {Math.round(safeValue)}%
        </span>
      </div>
      <div
        className="relative h-2.5 w-full overflow-hidden rounded-pill bg-surface-2"
        role="progressbar"
        aria-valuenow={Math.round(safeValue)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <motion.div
          className="h-full rounded-pill"
          initial={{ width: 0 }}
          animate={{ width: `${safeValue}%` }}
          transition={{ duration: 0.4, delay: delay / 1000, ease: [0.22, 1, 0.36, 1] }}
          style={{ backgroundColor: `hsl(var(--${color}))` }}
        />
      </div>
    </div>
  );
}
