import { Link } from 'react-router-dom'
import { LEGAL_ROUTES, SUPPORT_CONTACT_EMAIL } from '../../shared/legalRoutes'

/**
 * Subtle legal row for warm learner/catalog surfaces — centralized policies only.
 */
export function LearnerCatalogFooterBar({ className = '' }: { className?: string }) {
  const link =
    'text-[11px] font-medium text-stone-500 underline-offset-[3px] transition hover:text-stone-700 hover:underline'
  return (
    <footer
      className={`border-t border-[color:var(--jf-border)] pt-6 text-center ${className}`.trim()}
      data-testid="learner-catalog-footer-bar"
    >
      <nav aria-label="Legal and support" className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
        <Link to={LEGAL_ROUTES.privacy} className={link}>
          Privacy
        </Link>
        <span className="text-stone-300" aria-hidden>
          ·
        </span>
        <Link to={LEGAL_ROUTES.terms} className={link}>
          Terms
        </Link>
        <span className="text-stone-300" aria-hidden>
          ·
        </span>
        <Link to={LEGAL_ROUTES.disclaimer} className={link}>
          Disclaimer
        </Link>
        <span className="text-stone-300" aria-hidden>
          ·
        </span>
        <Link to={LEGAL_ROUTES.support} className={link}>
          Support
        </Link>
        <span className="text-stone-300" aria-hidden>
          ·
        </span>
        <Link to={LEGAL_ROUTES.contact} className={link}>
          Contact
        </Link>
      </nav>
      <p className="mt-3 text-[10px] text-stone-400">
        Help:{' '}
        <a className="font-medium text-stone-500 hover:text-stone-700 hover:underline" href={`mailto:${SUPPORT_CONTACT_EMAIL}`}>
          {SUPPORT_CONTACT_EMAIL}
        </a>
      </p>
    </footer>
  )
}
