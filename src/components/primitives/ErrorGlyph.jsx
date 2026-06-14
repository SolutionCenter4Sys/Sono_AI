import { cn } from '@/lib/utils.js';

/**
 * Glyph reusável de erro: glow + ring donut + disco interior + caractere central.
 * Atende WEB-EP-02-FT-02-US-04.
 *
 * Props:
 * - severity: 'moderate' | 'high' | 'critical' | 'info' (mapeia o token de cor)
 * - char: caractere central ('!', '⟳', '✕', '⊘', '?', 'i')
 * - size: diâmetro em px (default 160)
 */
const SEVERITY_TOKEN = {
  moderate: 'risk-moderate',
  high: 'risk-high',
  critical: 'risk-critical',
  info: 'menta',
};

export default function ErrorGlyph({
  severity = 'moderate',
  char = '!',
  size = 160,
  className,
}) {
  const token = SEVERITY_TOKEN[severity] ?? SEVERITY_TOKEN.moderate;
  const accent = `hsl(var(--${token}))`;

  const innerSize = Math.round(size * 0.75);
  const innerOffset = (size - innerSize) / 2;
  const fontSize = char.length > 1 ? size * 0.35 : size * 0.5;

  return (
    <div
      className={cn('relative inline-flex items-center justify-center', className)}
      style={{ width: size, height: size }}
      aria-hidden
    >
      {/* glow */}
      <div
        className="pointer-events-none absolute -inset-7 rounded-full"
        style={{
          background: `radial-gradient(circle, hsl(var(--${token}) / 0.20) 0%, hsl(var(--${token}) / 0.04) 70%, transparent 78%)`,
        }}
      />
      {/* outer ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          backgroundColor: `hsl(var(--${token}) / 0.25)`,
          padding: size * 0.07,
        }}
      >
        <div
          className="h-full w-full rounded-full"
          style={{ backgroundColor: 'hsl(var(--marinho-deep))' }}
        />
      </div>
      {/* inner disc */}
      <div
        className="absolute rounded-full"
        style={{
          width: innerSize,
          height: innerSize,
          top: innerOffset,
          left: innerOffset,
          backgroundColor: `hsl(var(--${token}) / 0.10)`,
        }}
      />
      {/* glyph */}
      <span
        className="relative font-bold leading-none"
        style={{ color: accent, fontSize, lineHeight: 1 }}
      >
        {char}
      </span>
    </div>
  );
}
