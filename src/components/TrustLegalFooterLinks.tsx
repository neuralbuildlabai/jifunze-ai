import { Link } from 'react-router-dom'
import { LEGAL_ROUTES } from '../shared/legalRoutes'

type Props = {
  className?: string
  /** Smaller copy for dense forms */
  variant?: 'default' | 'compact'
}

/**
 * Cross-links for legal pages.
 */
export function TrustLegalFooterLinks(props: Props) {
  const { className = '', variant = 'default' } = props
  const textSize = variant === 'compact' ? 'text-[10px]' : 'text-[11px]'

  return (
    <nav
      aria-label="Policies"
      data-testid="trust-legal-footer-links"
      className={`flex flex-wrap items-center justify-center gap-x-3 gap-y-1 ${textSize} leading-snug text-zinc-500 ${className}`.trim()}
    >
      <Link to={LEGAL_ROUTES.privacy} className="text-zinc-400 underline-offset-2 hover:text-zinc-100 hover:underline">
        Privacy
      </Link>
      <span className="text-zinc-600" aria-hidden>
        ·
      </span>
      <Link to={LEGAL_ROUTES.terms} className="text-zinc-400 underline-offset-2 hover:text-zinc-100 hover:underline">
        Terms
      </Link>
      <span className="text-zinc-600" aria-hidden>
        ·
      </span>
      <Link to={LEGAL_ROUTES.contact} className="text-zinc-400 underline-offset-2 hover:text-zinc-100 hover:underline">
        Contact
      </Link>
    </nav>
  )
}
