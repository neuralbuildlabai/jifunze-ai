import { Link } from 'react-router-dom'
import { LEARNER_MONETIZATION_UI_DISABLED } from '../../learner/learnerCommerceConstants'
import { LEGAL_ROUTES } from '../../training/trustCopy'
import { JifunzeBrandLogo } from '../brand/JifunzeBrandLogo'

const linkClass =
  'text-xs font-medium text-[color:var(--jf-muted)] transition hover:text-[color:var(--jf-text)]'

export function EmployablePathwaysPublicNav() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[color:var(--jf-border)] pb-6">
      <JifunzeBrandLogo to="/" size="sm" variant="compact" surface="dark" />
      <nav className="flex flex-wrap items-center gap-3" aria-label="Public">
        <Link className={linkClass} to={LEGAL_ROUTES.paths}>
          Pathways
        </Link>
        <Link className={linkClass} to={LEGAL_ROUTES.learn}>
          Courses
        </Link>
        {LEARNER_MONETIZATION_UI_DISABLED ? null : (
          <Link className={linkClass} to={LEGAL_ROUTES.pricing}>
            Plans
          </Link>
        )}
        <Link className={linkClass} to="/">
          Home
        </Link>
      </nav>
    </header>
  )
}
