import { Link } from 'react-router-dom'
import { LEGAL_ROUTES } from '../shared/legalRoutes'
import { TRUST_COPY } from '../training/trustCopy'

type Props = {
  /** `panel` = subtle bordered callout; `inline` = plain paragraph; `muted` = softer text */
  variant?: 'inline' | 'panel' | 'muted'
  /**
   * `default` = `trustStripPrimary` (in-app / general). `publicHero` = short public marketing line + disclaimer link.
   */
  strip?: 'default' | 'publicHero'
  /**
   * `full` = one-line trust copy + “Full disclaimer” (for dense in-app surfaces that still need the line).
   * `legalLink` = **link-only** to the disclaimer page (no long in-body legal paragraph) — prefer on public marketing/discovery pages.
   */
  density?: 'full' | 'legalLink'
  /** `utility` = quieter footnote-like styling on public pages (same copy + link behavior). */
  presentation?: 'default' | 'utility'
  /** Smaller copy for dense forms / embeds */
  compact?: boolean
  className?: string
  dataTestId?: string
}

/**
 * Lightweight trust copy + link to the canonical full disclaimer page.
 * Prefer this over repeating full `AffiliationDisclaimerCallout` blocks across the app.
 */
export function TrustBoundaryStrip(props: Props) {
  const {
    variant = 'inline',
    strip = 'default',
    density = 'full',
    presentation = 'default',
    compact = false,
    className = '',
    dataTestId = 'trust-boundary-strip',
  } = props

  const line = strip === 'publicHero' ? TRUST_COPY.publicHeroTrustLine : TRUST_COPY.trustStripPrimary

  const wrap =
    variant === 'panel'
      ? 'rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 ring-1 ring-white/[0.04]'
      : variant === 'muted'
        ? 'text-zinc-500'
        : ''

  const utility = presentation === 'utility'
  const textTone =
    variant === 'muted'
      ? 'text-zinc-500'
      : utility
        ? 'text-zinc-600'
        : 'text-zinc-400'
  const textSize = compact ? (utility ? 'text-[9px]' : 'text-[10px]') : utility ? 'text-[10px]' : 'text-[11px]'
  const tracking = utility ? 'tracking-[0.02em]' : ''

  const linkClass = utility
    ? 'font-normal text-zinc-400 underline decoration-white/12 underline-offset-[3px] transition-colors hover:text-zinc-100 hover:decoration-white/30'
    : 'font-medium text-zinc-300 underline-offset-2 hover:text-zinc-100 hover:underline'

  if (density === 'legalLink') {
    return (
      <p
        data-testid={dataTestId}
        className={`${textSize} leading-snug ${tracking} text-zinc-500 ${wrap} ${className}`.trim()}
      >
        <span className="text-zinc-400">Legal &amp; safety:</span>{' '}
        <Link to={LEGAL_ROUTES.disclaimer} className={`${linkClass} font-semibold text-zinc-400`}>
          Read disclaimer
        </Link>
      </p>
    )
  }

  return (
    <p
      data-testid={dataTestId}
      className={`${textSize} leading-snug ${tracking} ${textTone} ${wrap} ${className}`.trim()}
    >
      <span>{line}</span>{' '}
      <Link to={LEGAL_ROUTES.disclaimer} className={linkClass}>
        Full disclaimer
      </Link>
    </p>
  )
}
