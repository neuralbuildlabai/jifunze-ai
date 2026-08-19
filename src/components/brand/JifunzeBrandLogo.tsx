import { Link } from 'react-router-dom'
import markSrc from '../../assets/branding/jifunze-mark.svg'
import lockupOnDark from '../../assets/branding/jifunze-lockup-on-dark.svg'
import lockupOnLight from '../../assets/branding/jifunze-lockup-on-light.svg'

type Props = {
  /** Link target; use `null` for non-link (e.g. header title only). */
  to?: string | null
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  variant?: 'full' | 'compact'
  /** `light` = assets/text for pale backgrounds (public marketing). Default matches dark app chrome. */
  surface?: 'dark' | 'light'
}

// Sizing rules — bumped overall so the logo reads as a real brand mark, not a favicon.
// `sm` is now the minimum for top nav, `xxl` is the hero size used on auth and maintenance.
// `compact` uses the square mark (512×512), so equal h/w classes are correct here — the
// horizontal lockup is 334.63×96 and must keep `w-auto` so it is never squeezed to square.
const sizeClasses = {
  sm: {
    full: 'h-9 sm:h-10',
    compact: 'h-9 w-9 sm:h-10 sm:w-10',
  },
  md: {
    full: 'h-10 sm:h-12',
    compact: 'h-10 w-10 sm:h-12 sm:w-12',
  },
  lg: {
    full: 'h-12 sm:h-14',
    compact: 'h-12 w-12 sm:h-14 sm:w-14',
  },
  xl: {
    full: 'h-14 sm:h-16',
    compact: 'h-14 w-14 sm:h-16 sm:w-16',
  },
  xxl: {
    full: 'h-16 sm:h-20',
    compact: 'h-16 w-16 sm:h-20 sm:w-20',
  },
} as const

/**
 * Public brand lockup using the production SVG assets.
 *
 * The tagline is deliberately NOT part of any logo asset — positioning copy stays
 * editable in page-level markup.
 */
export function JifunzeBrandLogo({
  to = '/',
  className = '',
  size = 'md',
  variant = 'full',
  surface = 'dark',
}: Props) {
  const isCompact = variant === 'compact'
  const onLight = surface === 'light'
  const lockupSrc = onLight ? lockupOnLight : lockupOnDark
  // Inside a link the wrapper supplies the accessible name, so the artwork is decorative.
  // Standalone (`to === null`) the full lockup is the only thing to announce; in the compact
  // variant the adjacent "Jifunze" text always carries the name, so the mark stays decorative.
  const isLinked = to !== null
  const inner = (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {isCompact ? (
        <>
          <img
            src={markSrc}
            alt=""
            width={48}
            height={48}
            className={`${sizeClasses[size].compact} shrink-0 rounded-xl shadow-sm ${onLight ? 'shadow-zinc-900/10 ring-1 ring-zinc-200/90' : 'shadow-black/45 ring-1 ring-white/10'}`}
            decoding="async"
          />
          <span
            className={`font-semibold tracking-tight ${onLight ? 'text-zinc-900' : 'text-zinc-100'}`}
          >
            Jifunze
          </span>
        </>
      ) : (
        <img
          src={lockupSrc}
          alt={isLinked ? '' : 'Jifunze'}
          width={335}
          height={96}
          className={`${sizeClasses[size].full} w-auto shrink-0`}
          decoding="async"
        />
      )}
    </span>
  )

  if (to === null) {
    return <span className="inline-flex items-center">{inner}</span>
  }

  return (
    <Link
      to={to}
      aria-label="Jifunze"
      className="inline-flex items-center outline-none ring-zinc-400/35 focus-visible:ring-2"
    >
      {inner}
    </Link>
  )
}
