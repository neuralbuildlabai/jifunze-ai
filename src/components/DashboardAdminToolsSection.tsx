import { Link } from 'react-router-dom'
import type { WorkspaceNavVariant } from '../access/navRole'
import { LEGAL_ROUTES } from '../training/trustCopy'
import { DashboardTrainingWidget } from './training/DashboardTrainingWidget'

const cardClass =
  'rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 shadow-[0_12px_40px_rgba(0,0,0,0.2)] ring-1 ring-white/[0.04]'

const adminTileClass =
  'flex flex-col gap-1 rounded-lg border border-white/[0.08] bg-zinc-950/35 px-3 py-2.5 text-left transition hover:border-violet-400/25 hover:bg-white/[0.04]'

type Props = {
  navVariant: WorkspaceNavVariant
  canManageInstitutionTrainingPlans: boolean
  canViewOperatorInsights: boolean
}

/**
 * Compact admin / operator shortcuts — always below learner pathway sections on the dashboard.
 */
export function DashboardAdminToolsSection({ navVariant, canManageInstitutionTrainingPlans, canViewOperatorInsights }: Props) {
  if (navVariant === 'learner') return null

  return (
    <section className={cardClass} data-testid="dashboard-admin-tools">
      <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">Admin tools</h2>
      <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-zinc-500">
        Operator and workspace controls stay here so day-to-day learning stays pathway-first above.
      </p>

      {navVariant === 'institution_admin' || navVariant === 'platform_admin' ? (
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <Link to={LEGAL_ROUTES.learn} className={adminTileClass}>
            <span className="text-sm font-medium text-zinc-100">Catalog</span>
            <span className="text-[11px] text-zinc-500">Courses and curricula</span>
          </Link>
          <Link to="/training" className={adminTileClass}>
            <span className="text-sm font-medium text-zinc-100">Training plans</span>
            <span className="text-[11px] text-zinc-500">Assign catalog-backed paths</span>
          </Link>
          <Link to="/team/members" className={adminTileClass}>
            <span className="text-sm font-medium text-zinc-100">Members</span>
            <span className="text-[11px] text-zinc-500">Workspace roster</span>
          </Link>
          <Link to="/team/assignments" className={adminTileClass}>
            <span className="text-sm font-medium text-zinc-100">Assignments</span>
            <span className="text-[11px] text-zinc-500">Deployment board</span>
          </Link>
          <Link to="/team/learning-reports" className={adminTileClass}>
            <span className="text-sm font-medium text-zinc-100">Learning reports</span>
            <span className="text-[11px] text-zinc-500">Assignment progress</span>
          </Link>
          <Link to="/trends" className={adminTileClass}>
            <span className="text-sm font-medium text-zinc-100">Growth Intelligence</span>
            <span className="text-[11px] text-zinc-500">Trend and signal previews</span>
          </Link>
          {canViewOperatorInsights ? (
            <Link to="/insights" className={adminTileClass}>
              <span className="text-sm font-medium text-zinc-100">Learner Insights</span>
              <span className="text-[11px] text-zinc-500">Learning analytics</span>
            </Link>
          ) : null}
          <Link to="/ideas" className={adminTileClass}>
            <span className="text-sm font-medium text-zinc-100">Ideas (internal)</span>
            <span className="text-[11px] text-zinc-500">Operator discovery workspace</span>
          </Link>
          <Link to="/studio" className={adminTileClass}>
            <span className="text-sm font-medium text-zinc-100">Studio (internal)</span>
            <span className="text-[11px] text-zinc-500">Packaging and adaptation tools</span>
          </Link>
          <Link to="/settings" className={adminTileClass}>
            <span className="text-sm font-medium text-zinc-100">Settings</span>
            <span className="text-[11px] text-zinc-500">Workspace preferences</span>
          </Link>
        </div>
      ) : null}

      {navVariant === 'super_admin' ? (
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <Link to="/platform" className={adminTileClass}>
            <span className="text-sm font-medium text-zinc-100">Platform ops</span>
            <span className="text-[11px] text-zinc-500">Runtime and diagnostics</span>
          </Link>
          <Link to={LEGAL_ROUTES.learn} className={adminTileClass}>
            <span className="text-sm font-medium text-zinc-100">Catalog</span>
            <span className="text-[11px] text-zinc-500">All courses</span>
          </Link>
          <Link to="/training" className={adminTileClass}>
            <span className="text-sm font-medium text-zinc-100">Training plans</span>
            <span className="text-[11px] text-zinc-500">Plans and cohorts</span>
          </Link>
          <Link to="/team/members" className={adminTileClass}>
            <span className="text-sm font-medium text-zinc-100">Members</span>
            <span className="text-[11px] text-zinc-500">Workspace roster</span>
          </Link>
          <Link to="/trends" className={adminTileClass}>
            <span className="text-sm font-medium text-zinc-100">Growth Intelligence</span>
            <span className="text-[11px] text-zinc-500">Trend and signal surfaces</span>
          </Link>
          {canViewOperatorInsights ? (
            <Link to="/insights" className={adminTileClass}>
              <span className="text-sm font-medium text-zinc-100">Learner Insights</span>
              <span className="text-[11px] text-zinc-500">Learning analytics</span>
            </Link>
          ) : null}
          <Link to="/ideas" className={adminTileClass}>
            <span className="text-sm font-medium text-zinc-100">Ideas (internal)</span>
            <span className="text-[11px] text-zinc-500">Operator discovery workspace</span>
          </Link>
          <Link to="/studio" className={adminTileClass}>
            <span className="text-sm font-medium text-zinc-100">Studio (internal)</span>
            <span className="text-[11px] text-zinc-500">Packaging and adaptation tools</span>
          </Link>
          <Link to="/settings" className={adminTileClass}>
            <span className="text-sm font-medium text-zinc-100">Settings</span>
            <span className="text-[11px] text-zinc-500">Account</span>
          </Link>
        </div>
      ) : null}

      {canManageInstitutionTrainingPlans ? (
        <div className="mt-6 border-t border-white/[0.06] pt-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">Workspace training</p>
          <p className="mt-1 text-[12px] text-zinc-500">Assigned plans and cohort progress—kept below learner surfaces.</p>
          <div className="mt-3">
            <DashboardTrainingWidget />
          </div>
        </div>
      ) : null}
    </section>
  )
}
