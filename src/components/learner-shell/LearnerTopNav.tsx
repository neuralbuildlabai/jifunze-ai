import { NavLink } from 'react-router-dom'
import { LEGAL_ROUTES } from '../../training/trustCopy'
import { learnerShellTokens } from './learnerShellTokens'

/**
 * Primary learner navigation — matches workspace routes; calm, no pill chrome.
 */
export function LearnerTopNav({ className = '' }: { className?: string }) {
  return (
    <nav
      className={`flex flex-wrap items-center gap-1 ${className}`}
      aria-label="Learning"
      data-testid="workspace-nav-primary"
    >
      <NavLink
        to="/dashboard"
        className={({ isActive }) => `${learnerShellTokens.navLink} ${isActive ? learnerShellTokens.navLinkActive : ''}`}
      >
        Dashboard
      </NavLink>
      <NavLink
        to={LEGAL_ROUTES.learn}
        className={({ isActive }) => `${learnerShellTokens.navLink} ${isActive ? learnerShellTokens.navLinkActive : ''}`}
      >
        Catalog
      </NavLink>
      <NavLink
        to={LEGAL_ROUTES.paths}
        className={({ isActive }) => `${learnerShellTokens.navLink} ${isActive ? learnerShellTokens.navLinkActive : ''}`}
      >
        Pathways
      </NavLink>
      <NavLink to="/reports" className={({ isActive }) => `${learnerShellTokens.navLink} ${isActive ? learnerShellTokens.navLinkActive : ''}`}>
        Reports
      </NavLink>
      <NavLink end to="/settings" className={({ isActive }) => `${learnerShellTokens.navLink} ${isActive ? learnerShellTokens.navLinkActive : ''}`}>
        Settings
      </NavLink>
    </nav>
  )
}
