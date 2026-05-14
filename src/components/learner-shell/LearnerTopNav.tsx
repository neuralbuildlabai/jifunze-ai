import { Link, NavLink } from 'react-router-dom'
import { LEGAL_ROUTES } from '../../training/trustCopy'
import { learnerShellTokens } from './learnerShellTokens'
import { useAdminAccess } from '../admin/useAdminAccess'

/**
 * Signed-in learner navigation — dashboard, catalog, learning home, and progress (profile in {@link LearnerProfileMenu}).
 * Admins also see quick links into the admin console while browsing learner surfaces.
 */
export function LearnerTopNav({ className = '' }: { className?: string }) {
  const { canAccessAdmin } = useAdminAccess()

  return (
    <nav
      className={`flex flex-wrap items-center gap-0.5 sm:gap-1 ${className}`}
      aria-label="Learning"
      data-testid="learner-nav-primary"
    >
      {canAccessAdmin ? (
        <div className="mr-1 flex flex-wrap items-center gap-1 border-r border-stone-200/90 pr-2 sm:mr-2 sm:pr-3">
          <Link
            to="/admin/dashboard"
            className="rounded-lg px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-violet-800 underline-offset-2 hover:bg-violet-50 hover:underline sm:text-[11px]"
            data-testid="learner-nav-admin-console"
          >
            Admin console
          </Link>
          <Link
            to="/admin/health"
            className="rounded-lg px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-violet-800 underline-offset-2 hover:bg-violet-50 hover:underline sm:text-[11px]"
            data-testid="learner-nav-admin-health"
          >
            Admin health
          </Link>
        </div>
      ) : null}
      <NavLink
        to="/dashboard"
        className={({ isActive }) => `${learnerShellTokens.navLink} ${isActive ? learnerShellTokens.navLinkActive : ''}`}
        data-testid="learner-nav-dashboard"
      >
        Dashboard
      </NavLink>
      <NavLink
        to={LEGAL_ROUTES.learn}
        className={({ isActive }) => `${learnerShellTokens.navLink} ${isActive ? learnerShellTokens.navLinkActive : ''}`}
        data-testid="learner-nav-catalog"
      >
        Catalog
      </NavLink>
      <NavLink
        to="/my-learning"
        className={({ isActive }) => `${learnerShellTokens.navLink} ${isActive ? learnerShellTokens.navLinkActive : ''}`}
        data-testid="learner-nav-my-learning"
      >
        My Learning
      </NavLink>
      <NavLink
        to="/reports"
        className={({ isActive }) => `${learnerShellTokens.navLink} ${isActive ? learnerShellTokens.navLinkActive : ''}`}
        data-testid="learner-nav-progress"
      >
        Progress
      </NavLink>
    </nav>
  )
}
