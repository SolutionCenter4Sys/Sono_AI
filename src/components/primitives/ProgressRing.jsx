import { motion } from 'framer-motion';
import { cn } from '@/lib/utils.js';

/**
 * Anel circular donut (SVG) — usado no Loading e como base reusável.
 * Atende WEB-EP-02-FT-02-US-03.
 *
 * Props:
 * - percent: 0-100
 * - size: diâmetro em px (default 180)
 * - strokeWidth: espessura do anel (default 8)
 * - glow: renderiza glow radial Laranja atrás (default true)
 * - children: conteúdo central (geralmente o texto do percentual)
 */
export default function ProgressRing({
  percent = 0,
  size = 180,
  strokeWidth = 8,
  glow = true,
  className,
  children,
}) {
  const safe = Math.max(0, Math.min(100, percent));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - safe / 100);

  return (
    <div
      className={cn('relative inline-flex items-center justify-center', className)}
      style={{ width: size, height: size }}
    >
      {glow ? (
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-5 rounded-full"
          style={{
            background:
              'radial-gradient(circle, hsl(var(--laranja) / 0.18) 0%, hsl(var(--laranja) / 0.04) 60%, transparent 75%)',
          }}
        />
      ) : null}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        role="progressbar"
        aria-valuenow={Math.round(safe)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--surface-2))"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--laranja))"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.45, ease: [0, 0.55, 0.45, 1] }}
        />
      </svg>
      {children ? (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      ) : null}
    </div>
  );
}
