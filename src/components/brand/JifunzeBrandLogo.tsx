import { Link } from 'react-router-dom'
import markSrc from '../../assets/branding/jifunze-mark.svg'
import lockupDark from '../../assets/branding/jifunze-lockup-dark.svg'
import lockupLight from '../../assets/branding/jifunze-lockup-light.svg'

type Props = {
  /** Link target; use `null` for non-link (e.g. header title only). */
  to?: string | null
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  /**
   * `full` (default) is the primary logo: mark + `Jifunze` wordmark lockup. Use it anywhere
   * the brand name should read — headers, footers, auth screens.
   * `compact` is the standalone squircle mark, for genuinely icon-sized slots only.
   */
  variant?: 'full' | 'compact'
  /** `light` = assets/text for pale backgrounds (public marketing). Default matches dark app chrome. */
  surface?: 'dark' | 'light'
}

// Sizing rules — bumped overall so the logo reads as a real brand mark, not a favicon.
// `sm` is now the minimum for top nav, `xxl` is the hero size used on auth and maintenance.
// `compact` is the 512×512 square mark, so equal h/w classes are correct. The lockup is
// 334.63×96 and must keep `w-auto` so it is never squeezed into a square.
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
 * Public brand logo.
 *
 * The primary logo is the horizontal lockup (mark + `Jifunze` wordmark, Plus Jakarta Sans
 * ExtraBold as SVG outlines — no font is embedded or loaded). The bare mark is reserved for
 * icon-sized placements: favicon, app icon, avatar.
 *
 * The positioning line ("Your idea never sleeps.") is deliberately NOT part of any logo
 * asset — it stays editable copy in page-level markup beside or below the lockup.
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
  const src = isCompact ? markSrc : onLight ? lockupLight : lockupDark
  // Inside a link the wrapper supplies the accessible name, so the artwork is decorative and
  // is not announced twice. Standalone, the artwork itself carries the name.
  const alt = to === null ? 'Jifunze' : ''
  const inner = (
    <span className={`inline-flex items-center ${className}`}>
      {isCompact ? (
        <img
          src={src}
          alt={alt}
          width={48}
          height={48}
          className={`${sizeClasses[size].compact} shrink-0 rounded-xl shadow-sm ${onLight ? 'shadow-zinc-900/10 ring-1 ring-zinc-200/90' : 'shadow-black/45 ring-1 ring-white/10'}`}
          decoding="async"
        />
      ) : (
        <img
          src={src}
          alt={alt}
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
