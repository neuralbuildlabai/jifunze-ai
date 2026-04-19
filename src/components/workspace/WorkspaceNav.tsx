import { NavLink } from 'react-router-dom'
import { LEGAL_ROUTES } from '../../training/trustCopy'
import { useAppAccess } from '../../access/useAppAccess'

const linkClass =
  'rounded-lg px-2.5 py-1.5 text-[11px] font-medium text-zinc-400 transition-colors hover:text-zinc-100'
const activeClass = 'bg-white/[0.06] text-zinc-100 ring-1 ring-white/[0.08]'

/**
 * Consolidated workspace navigation — learn + library are primary entry points;
 * specialized libraries remain reachable via `/library` hub instead of crowding top-level tabs.
 */
export function WorkspaceNav({ className = '' }: { className?: string }) {
  const { showProLabNav, showPlatformNav } = useAppAccess()

  return (
    <nav
      className={`flex flex-wrap items-center gap-1 border border-white/[0.06] bg-zinc-950/35 p-1.5 ${className}`}
      aria-label="Workspace"
      data-testid="workspace-nav-primary"
    >
      <NavLink to="/dashboard" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>
        Dashboard
      </NavLink>
      <NavLink to={LEGAL_ROUTES.learn} className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>
        Discover
      </NavLink>
      <NavLink to="/training" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>
        Training
      </NavLink>
      <NavLink to="/library" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>
        Libraries
      </NavLink>
      <NavLink to="/learning/labs" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>
        Labs
      </NavLink>
      <NavLink to="/studio" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>
        Studio
      </NavLink>
      <NavLink to="/ideas" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>
        Ideas
      </NavLink>
      <NavLink to="/trends" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>
        Trends
      </NavLink>
      <NavLink to="/insights" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>
        Insights
      </NavLink>
      <NavLink to="/team/members" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>
        Team
      </NavLink>
      <NavLink to="/pricing" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>
        Pricing
      </NavLink>
      <NavLink to="/settings/subscription" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>
        Plans
      </NavLink>
      {showProLabNav ? (
        <NavLink to="/lab" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>
          Lab
        </NavLink>
      ) : null}
      <NavLink end to="/settings" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>
        Settings
      </NavLink>
      {showPlatformNav ? (
        <NavLink to="/platform" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>
          Platform
        </NavLink>
      ) : null}
    </nav>
  )
}
