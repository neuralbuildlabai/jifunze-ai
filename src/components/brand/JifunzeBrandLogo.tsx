import { Link } from 'react-router-dom'
import logoIcon from '../../assets/branding/jifunze-logo-icon.png'
import logoLight from '../../assets/branding/jifunze-logo-light.png'
import logoDark from '../../assets/branding/jifunze-logo-dark.png'

type Props = {
  /** Link target; use `null` for non-link (e.g. header title only). */
  to?: string | null
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  variant?: 'full' | 'compact'
  /** `light` = assets/text for pale backgrounds (public marketing). Default matches dark app chrome. */
  surface?: 'dark' | 'light'
}

const sizeClasses = {
  sm: {
    full: 'h-8',
    compact: 'h-8 w-8',
  },
  md: {
    full: 'h-9 sm:h-10',
    compact: 'h-9 w-9 sm:h-10 sm:w-10',
  },
  lg: {
    full: 'h-10 sm:h-11',
    compact: 'h-11 w-11 sm:h-12 sm:w-12',
  },
  xl: {
    full: 'h-12 sm:h-14',
    compact: 'h-12 w-12 sm:h-14 sm:w-14',
  },
  xxl: {
    full: 'h-14 sm:h-16',
    compact: 'h-14 w-14 sm:h-16 sm:w-16',
  },
} as const

/**
 * Public brand lockup using the production logo assets.
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
  const fullLogoSrc = onLight ? logoDark : logoLight
  const inner = (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {isCompact ? (
        <>
          <img
            src={logoIcon}
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
            <span className={onLight ? 'text-zinc-600' : 'text-zinc-400'}>.AI</span>
          </span>
        </>
      ) : (
        <img
          src={fullLogoSrc}
          alt="Jifunze.AI"
          height={40}
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
      aria-label="Jifunze.AI home"
      className="inline-flex items-center outline-none ring-zinc-400/35 focus-visible:ring-2"
    >
      {inner}
    </Link>
  )
}
