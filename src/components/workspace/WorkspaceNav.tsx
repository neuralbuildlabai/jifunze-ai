import { NavLink } from 'react-router-dom'
import { LEGAL_ROUTES } from '../../training/trustCopy'
import { useAppAccess } from '../../access/useAppAccess'

const linkClass =
  'rounded-lg px-2.5 py-1.5 text-[11px] font-medium text-zinc-400 transition-colors hover:text-zinc-100'
const activeClass = 'bg-white/[0.06] text-zinc-100 ring-1 ring-white/[0.08]'

/** Institution + platform operators: assign courses, track progress. */
function OperationalAdminNav() {
  return (
    <>
      <NavLink to="/dashboard" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>
        Dashboard
      </NavLink>
      <NavLink to="/team/members" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>
        Members
      </NavLink>
      <NavLink to={LEGAL_ROUTES.learn} className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>
        Catalog
      </NavLink>
      <NavLink to="/learn#available-now" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>
        Schools
      </NavLink>
      <NavLink to="/team/assignments" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>
        Assignments
      </NavLink>
      <NavLink to="/training" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>
        Training plans
      </NavLink>
      <NavLink to="/team/learning-reports" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>
        Learning reports
      </NavLink>
      <NavLink to="/trends" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>
        Growth Intelligence
      </NavLink>
      <NavLink end to="/settings" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>
        Settings
      </NavLink>
    </>
  )
}

/** Super-admin: platform runtime + catalog + billing + insights — separate from day-to-day ops nav. */
function SuperAdminNav() {
  const { canViewOperatorInsights } = useAppAccess()
  return (
    <>
      <NavLink to="/dashboard" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>
        Dashboard
      </NavLink>
      <NavLink to="/platform" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>
        Platform ops
      </NavLink>
      <NavLink to={LEGAL_ROUTES.learn} className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>
        Catalog
      </NavLink>
      <NavLink to="/learn#available-now" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>
        Schools
      </NavLink>
      <NavLink to="/team/learning-reports" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>
        Learner reports
      </NavLink>
      <NavLink to="/trends" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>
        Growth Intelligence
      </NavLink>
      {canViewOperatorInsights ? (
        <NavLink to="/insights" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>
          Learner Insights
        </NavLink>
      ) : null}
      <NavLink end to="/settings" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>
        Settings
      </NavLink>
    </>
  )
}

/**
 * Role-specific operator workspace navigation — institution, platform, and super-admin variants.
 * Learner navigation lives in {@link LearnerTopNav} inside {@link LearnerAppShell}.
 */
export function WorkspaceNav({ className = '' }: { className?: string }) {
  const { navVariant } = useAppAccess()

  return (
    <nav
      className={`flex flex-wrap items-center gap-1 border border-white/[0.06] bg-zinc-950/35 p-1.5 ${className}`}
      aria-label="Workspace"
      data-testid="workspace-nav-primary"
    >
      {(navVariant === 'institution_admin' || navVariant === 'platform_admin') ? <OperationalAdminNav /> : null}

      {navVariant === 'super_admin' ? <SuperAdminNav /> : null}
    </nav>
  )
}
