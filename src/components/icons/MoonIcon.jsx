/**
 * Lua crescente da Home — composta por dois círculos (corpo + máscara).
 * A cor vem do token --sun-moon, que adapta entre Dark (cream) e Light (gold).
 */
export default function MoonIcon({ size = 140, className }) {
  // Posicionamento da máscara é proporcional ao body.
  const maskOffsetX = size * 0.23;
  const maskOffsetY = -size * 0.07;
  const maskSize = size * 0.86;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      aria-hidden
    >
      <defs>
        <mask id="moon-mask">
          <rect width={size} height={size} fill="white" />
          <circle
            cx={size / 2 + maskOffsetX}
            cy={size / 2 + maskOffsetY}
            r={maskSize / 2}
            fill="black"
          />
        </mask>
      </defs>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2}
        fill="hsl(var(--sun-moon))"
        mask="url(#moon-mask)"
      />
    </svg>
  );
}
