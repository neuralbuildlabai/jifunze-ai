/**
 * Lightweight, inline SVG visuals for warm learner surfaces — abstract, educational, non-stock.
 */

type SvgProps = { className?: string }

/** Hero accent — abstract nodes + pathways suggesting systems / learning flow */
export function LearnHeroAbstractFigure({ className = '' }: SvgProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <title>Abstract learning flow</title>
      <defs>
        <linearGradient id="jfHeroBg" x1="80" y1="20" x2="340" y2="240" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff7ed" />
          <stop offset="0.45" stopColor="#ffedd5" />
          <stop offset="1" stopColor="#faf8f5" />
        </linearGradient>
        <linearGradient id="jfHeroLine" x1="0" y1="0" x2="400" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ea580c" stopOpacity="0.35" />
          <stop offset="1" stopColor="#78716c" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <rect x="16" y="12" width="368" height="236" rx="20" fill="url(#jfHeroBg)" stroke="rgba(28,25,23,0.08)" strokeWidth="1" />
      <path
        d="M56 170 C120 120, 160 200, 220 140 S320 80, 340 130"
        stroke="url(#jfHeroLine)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M72 88 C140 48, 200 112, 268 72 S352 40, 328 108"
        stroke="rgba(120,113,108,0.25)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="72" cy="88" r="10" fill="#fff" stroke="#ea580c" strokeOpacity="0.45" strokeWidth="2" />
      <circle cx="220" cy="140" r="12" fill="#fff" stroke="#ea580c" strokeOpacity="0.55" strokeWidth="2" />
      <circle cx="328" cy="108" r="9" fill="#fff" stroke="#78716c" strokeOpacity="0.35" strokeWidth="2" />
      <circle cx="160" cy="188" r="8" fill="#fff7ed" stroke="#fdba74" strokeOpacity="0.6" strokeWidth="1.5" />
      <rect x="248" y="168" width="72" height="44" rx="8" fill="#ffffff" stroke="rgba(28,25,23,0.1)" strokeWidth="1" />
      <path d="M264 188h40M264 196h28" stroke="rgba(87,83,78,0.35)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="284" cy="176" r="3" fill="#ea580c" fillOpacity="0.65" />
    </svg>
  )
}

/** Four-step pathway progression diagram */
export function LearnWorkflowStepsFigure({ className = '' }: SvgProps) {
  const boxW = 88
  const gap = 14
  const y = 10
  const h = 52
  const labels = ['Orient', 'Learn', 'Evidence', 'Advance']
  const cy = y + h / 2
  return (
    <svg className={className} viewBox="0 0 418 76" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <title>Pathway steps: orient, learn, evidence, advance</title>
      {labels.map((label, i) => {
        const x = i * (boxW + gap)
        return (
          <g key={label}>
            <rect
              x={x}
              y={y}
              width={boxW}
              height={h}
              rx="10"
              fill="#ffffff"
              stroke="rgba(28,25,23,0.1)"
              strokeWidth="1"
            />
            <text
              x={x + boxW / 2}
              y={cy + 4}
              textAnchor="middle"
              fill="#44403c"
              style={{ fontSize: '12px', fontFamily: 'system-ui, sans-serif', fontWeight: 600 }}
            >
              {label}
            </text>
          </g>
        )
      })}
      {[0, 1, 2].map((i) => {
        const left = i * (boxW + gap)
        const rightEdge = left + boxW
        const nextLeft = (i + 1) * (boxW + gap)
        const tip = nextLeft - 4
        const tail = rightEdge + 4
        return (
          <path
            key={i}
            d={`M ${tail} ${cy} L ${tip - 6} ${cy} M ${tip - 6} ${cy - 3.5} L ${tip} ${cy} L ${tip - 6} ${cy + 3.5}`}
            stroke="rgba(234,88,12,0.45)"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        )
      })}
    </svg>
  )
}

/** Section heading accent — spark / insight glyph */
export function LearnSectionSparkIcon({ className = '' }: SvgProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <title>Section marker</title>
      <path
        d="M12 2 L13.8 8.2 L20 10 L13.8 11.8 L12 18 L10.2 11.8 L4 10 L10.2 8.2 Z"
        fill="#ea580c"
        fillOpacity="0.18"
        stroke="#ea580c"
        strokeOpacity="0.55"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2" fill="#ea580c" fillOpacity="0.75" />
    </svg>
  )
}
