import { NavLink } from 'react-router-dom'
import { LEGAL_ROUTES } from '../../training/trustCopy'
import { learnerShellTokens } from './learnerShellTokens'

/**
 * Signed-in learner navigation — dashboard, catalog, learning home, and progress (profile in {@link LearnerProfileMenu}).
 */
export function LearnerTopNav({ className = '' }: { className?: string }) {
  return (
    <nav
      className={`flex flex-wrap items-center gap-0.5 sm:gap-1 ${className}`}
      aria-label="Learning"
      data-testid="learner-nav-primary"
    >
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
