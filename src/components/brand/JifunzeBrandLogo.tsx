import { Link } from 'react-router-dom'
import logoOnDark from '../../assets/branding/jifunze-logo-mono-white-no-tagline-transparent.svg'
import logoOnLight from '../../assets/branding/jifunze-logo-horizontal-no-tagline.svg'
import iconSquircle from '../../assets/branding/jifunze-icon.svg'

type Props = {
  /** Link target; use `null` for non-link (e.g. header title only). */
  to?: string | null
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** `full` = icon + wordmark lockup; `compact` = icon only. */
  variant?: 'full' | 'compact'
  /** Surface the logo sits on. Default matches the near-black site chrome. */
  surface?: 'dark' | 'light'
}

const sizeClasses = {
  sm: { full: 'h-7 sm:h-8', compact: 'h-8 w-8 sm:h-9 sm:w-9' },
  md: { full: 'h-8 sm:h-9', compact: 'h-9 w-9 sm:h-10 sm:w-10' },
  lg: { full: 'h-10 sm:h-11', compact: 'h-11 w-11 sm:h-12 sm:w-12' },
  xl: { full: 'h-12 sm:h-14', compact: 'h-14 w-14 sm:h-16 sm:w-16' },
} as const

/**
 * The approved Jifunze lockup (brand/README-jifunze-brand.md): violet squircle chevron mark +
 * "Jifunze" wordmark in Plus Jakarta Sans. No ".AI" appears in the wordmark; the assets are the
 * kit's own SVGs with text converted to outlines.
 */
export function JifunzeBrandLogo({
  to = '/',
  className = '',
  size = 'md',
  variant = 'full',
  surface = 'dark',
}: Props) {
  const isCompact = variant === 'compact'
  const src = isCompact ? iconSquircle : surface === 'light' ? logoOnLight : logoOnDark
  const inner = (
    <span className={`inline-flex items-center ${className}`}>
      <img
        src={src}
        alt="Jifunze"
        className={`${isCompact ? sizeClasses[size].compact : `${sizeClasses[size].full} w-auto`} shrink-0`}
        decoding="async"
      />
    </span>
  )

  if (to === null) {
    return <span className="inline-flex items-center">{inner}</span>
  }

  return (
    <Link
      to={to}
      aria-label="Jifunze home"
      className="inline-flex items-center rounded-lg outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8B5CF6]"
    >
      {inner}
    </Link>
  )
}
