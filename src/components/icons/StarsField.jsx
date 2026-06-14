/**
 * Constelação decorativa atrás da lua na Home.
 * Dots distribuídos pseudo-aleatoriamente; opacidade varia para profundidade.
 */
const STARS = [
  { x: 18, y: 16, r: 1.2, o: 0.9 },
  { x: 30, y: 6,  r: 0.8, o: 0.7 },
  { x: 78, y: 18, r: 1.4, o: 0.9 },
  { x: 92, y: 8,  r: 0.8, o: 0.6 },
  { x: 14, y: 56, r: 0.9, o: 0.7 },
  { x: 88, y: 62, r: 1.1, o: 0.85 },
  { x: 50, y: 84, r: 0.9, o: 0.6 },
  { x: 8,  y: 78, r: 0.7, o: 0.55 },
];

export default function StarsField({ className }) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={className}
      aria-hidden
    >
      {STARS.map((s, i) => (
        <circle
          key={i}
          cx={s.x}
          cy={s.y}
          r={s.r}
          fill="hsl(var(--text-primary))"
          opacity={s.o}
        />
      ))}
    </svg>
  );
}
