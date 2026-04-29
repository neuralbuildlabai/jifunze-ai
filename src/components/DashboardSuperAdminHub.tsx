import { Link } from 'react-router-dom'
import { useAppAccess } from '../access/useAppAccess'
import { LEGAL_ROUTES } from '../training/trustCopy'

const snapClass =
  'flex flex-col gap-1 rounded-xl border border-white/[0.08] bg-zinc-950/40 px-4 py-3 text-left transition hover:border-violet-400/25 hover:bg-white/[0.04]'
const actionClass =
  'flex flex-col gap-0.5 rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-2.5 text-left text-[13px] transition hover:border-violet-400/20 hover:bg-white/[0.05]'

/**
 * Super-admin landing: operations-first links only — no learner pathway or commerce surfaces.
 */
export function DashboardSuperAdminHub() {
  const { canViewOperatorInsights } = useAppAccess()

  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Platform snapshot</h2>
        <p className="max-w-2xl text-[13px] leading-relaxed text-zinc-500">
          Quick entry points to operational areas. Aggregate metrics will appear here when wired to reporting — nothing is shown until data
          is available.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Link to="/team/members" className={snapClass}>
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">Learners</span>
            <span className="text-sm font-medium text-zinc-100">Members</span>
            <span className="text-[12px] text-zinc-500">Workspace roster and roles</span>
          </Link>
          <Link to={LEGAL_ROUTES.learn} className={snapClass}>
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">Content</span>
            <span className="text-sm font-medium text-zinc-100">Courses</span>
            <span className="text-[12px] text-zinc-500">Flagship catalog</span>
          </Link>
          <Link to={LEGAL_ROUTES.paths} className={snapClass}>
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">Structure</span>
            <span className="text-sm font-medium text-zinc-100">Pathways</span>
            <span className="text-[12px] text-zinc-500">Employability tracks</span>
          </Link>
          <Link to="/team/learning-reports" className={snapClass}>
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">Evidence</span>
            <span className="text-sm font-medium text-zinc-100">Learning reports</span>
            <span className="text-[12px] text-zinc-500">Assignment and session signals</span>
          </Link>
          <Link to="/platform" className={snapClass}>
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">Runtime</span>
            <span className="text-sm font-medium text-zinc-100">Platform ops</span>
            <span className="text-[12px] text-zinc-500">Diagnostics and internal tools</span>
          </Link>
          <Link to="/trends" className={snapClass}>
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">Signals</span>
            <span className="text-sm font-medium text-zinc-100">Growth intelligence</span>
            <span className="text-[12px] text-zinc-500">Trend previews</span>
          </Link>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Core admin actions</h2>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <Link to={LEGAL_ROUTES.learn} className={actionClass}>
            <span className="font-medium text-zinc-100">Catalog</span>
            <span className="text-[11px] text-zinc-500">Courses</span>
          </Link>
          <Link to={LEGAL_ROUTES.paths} className={actionClass}>
            <span className="font-medium text-zinc-100">Pathways</span>
            <span className="text-[11px] text-zinc-500">Tracks</span>
          </Link>
          <Link to="/team/learning-reports" className={actionClass}>
            <span className="font-medium text-zinc-100">Learner reports</span>
            <span className="text-[11px] text-zinc-500">Workspace</span>
          </Link>
          <Link to="/team/members" className={actionClass}>
            <span className="font-medium text-zinc-100">Members</span>
            <span className="text-[11px] text-zinc-500">Roster</span>
          </Link>
          <Link to="/training" className={actionClass}>
            <span className="font-medium text-zinc-100">Training plans</span>
            <span className="text-[11px] text-zinc-500">Assignments</span>
          </Link>
          <Link to="/trends" className={actionClass}>
            <span className="font-medium text-zinc-100">Growth intelligence</span>
            <span className="text-[11px] text-zinc-500">Signals</span>
          </Link>
          {canViewOperatorInsights ? (
            <Link to="/insights" className={actionClass}>
              <span className="font-medium text-zinc-100">Learner insights</span>
              <span className="text-[11px] text-zinc-500">Analytics</span>
            </Link>
          ) : null}
          <Link to="/platform" className={actionClass}>
            <span className="font-medium text-zinc-100">Platform ops</span>
            <span className="text-[11px] text-zinc-500">Internal</span>
          </Link>
          <Link to="/settings" className={actionClass}>
            <span className="font-medium text-zinc-100">Settings</span>
            <span className="text-[11px] text-zinc-500">Workspace</span>
          </Link>
        </div>
      </section>

      <section className="rounded-xl border border-white/[0.06] bg-zinc-950/30 px-4 py-4">
        <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Operational visibility</h2>
        <p className="mt-2 text-[13px] text-zinc-500">No operational alerts right now.</p>
      </section>
    </div>
  )
}
