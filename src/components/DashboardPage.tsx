import { Link } from 'react-router-dom'
import { useAppAccess } from '../access/useAppAccess'
import { humanAccessTierLabel } from '../access/appAccess'
import { LEGAL_ROUTES } from '../training/trustCopy'
import { useAuth } from '../auth/AuthContext'
import { isSupabaseConfigured } from '../config/supabaseEnv'
import { DashboardTeamAssignmentsWidget } from './team/DashboardTeamAssignmentsWidget'
import { DashboardTrainingWidget } from './training/DashboardTrainingWidget'
const cardClass =
  'rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 shadow-[0_12px_40px_rgba(0,0,0,0.2)] ring-1 ring-white/[0.04]'

const linkTileClass =
  'flex flex-col gap-1 rounded-lg border border-white/[0.06] bg-zinc-950/40 px-3 py-2.5 text-left transition hover:border-violet-400/25 hover:bg-white/[0.04]'

/**
 * Post-login hub: session, effective access tier, and role-filtered shortcuts (UI only — enforce on server).
 */
export function DashboardPage() {
  const {
    user,
    loading: authLoading,
    error: authError,
    workspaceTenantResolved,
    workspaceShellReady,
    signOut,
    signOutPending,
    retryWorkspaceBootstrap,
  } = useAuth()

  const { tier, tierLoading, navVariant, canViewOperatorInsights } = useAppAccess()

  const workspaceBootstrapNeedsRecovery =
    isSupabaseConfigured() &&
    Boolean(user) &&
    !workspaceTenantResolved &&
    authError != null

  if (workspaceBootstrapNeedsRecovery) {
    return (
      <div className="mx-auto w-full max-w-2xl space-y-6 px-4 py-12 text-center text-zinc-100">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold text-white">Workspace setup</h1>
          <p className="whitespace-pre-wrap text-sm text-rose-300/90">{authError}</p>
        </header>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => void retryWorkspaceBootstrap()}
            className="rounded-lg border border-violet-500/40 bg-violet-600/25 px-4 py-2 text-sm font-medium text-violet-100 hover:bg-violet-600/35"
          >
            Retry workspace setup
          </button>
          <button
            type="button"
            disabled={signOutPending}
            onClick={() => void signOut()}
            className="rounded-lg border border-zinc-600 bg-zinc-800/80 px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Sign out
          </button>
        </div>
      </div>
    )
  }

  if (isSupabaseConfigured() && authLoading && !workspaceShellReady) {
    return (
      <div className="mx-auto flex min-h-[min(70vh,48rem)] w-full max-w-2xl items-center justify-center px-4 py-12 text-zinc-100">
        <p className="text-sm text-zinc-400">Loading workspace…</p>
      </div>
    )
  }

  const email = user?.email ?? '—'
  const tierLabel = humanAccessTierLabel(tier)

  return (
    <div className="mx-auto w-full max-w-3xl space-y-8 px-4 py-10 text-zinc-100">
      <header className="border-b border-white/[0.06] pb-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">Dashboard</p>
        <h1 className="mt-1 text-xl font-semibold text-white">Welcome back</h1>
        <p className="mt-2 max-w-xl text-sm text-zinc-400">
          Pick up learning, manage your plan, or open tools that match your role.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <DashboardTrainingWidget />
        </div>
        <div className="sm:col-span-2">
          <DashboardTeamAssignmentsWidget />
        </div>
        <section className={navVariant === 'learner' ? `${cardClass} sm:col-span-2` : cardClass}>
          <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">Account</h2>
          <p className="mt-2 text-sm text-zinc-200">{email}</p>
          {navVariant === 'learner' ? (
            <p className="mt-3 text-[13px] leading-relaxed text-zinc-400">
              Continue courses and open Account when you need billing links or password help.
            </p>
          ) : null}
        </section>
        {navVariant === 'learner' ? null : (
          <section className={cardClass}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">Role</h2>
            <p className="mt-2 text-sm font-medium text-zinc-100">
              {tierLoading ? 'Loading…' : tierLabel}
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-zinc-500">
              Course access follows your subscription or purchases. Administrative actions are enforced on the server too.
            </p>
          </section>
        )}
      </div>

      <section className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">Go to</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {navVariant === 'learner' ? (
            <>
              <Link to="/my-learning" className={linkTileClass}>
                <span className="text-sm font-medium text-zinc-100">My Learning</span>
                <span className="text-[11px] text-zinc-500">Continue courses and assignments</span>
              </Link>
              <Link to="/reports" className={linkTileClass}>
                <span className="text-sm font-medium text-zinc-100">Reports</span>
                <span className="text-[11px] text-zinc-500">Progress and chapter status</span>
              </Link>
              <Link to={LEGAL_ROUTES.learn} className={linkTileClass}>
                <span className="text-sm font-medium text-zinc-100">Discover</span>
                <span className="text-[11px] text-zinc-500">Browse the catalog</span>
              </Link>
              <Link to="/library" className={linkTileClass}>
                <span className="text-sm font-medium text-zinc-100">Library</span>
                <span className="text-[11px] text-zinc-500">Extended readers</span>
              </Link>
              <Link to={LEGAL_ROUTES.workspaceSubscription} className={linkTileClass}>
                <span className="text-sm font-medium text-zinc-100">Billing / Plan</span>
                <span className="text-[11px] text-zinc-500">Pricing and subscription</span>
              </Link>
              <Link to="/account" className={linkTileClass}>
                <span className="text-sm font-medium text-zinc-100">Account</span>
                <span className="text-[11px] text-zinc-500">Plan links &amp; sign-in</span>
              </Link>
            </>
          ) : null}
          {navVariant === 'institution_admin' || navVariant === 'platform_admin' ? (
            <>
              <Link to="/training" className={linkTileClass}>
                <span className="text-sm font-medium text-zinc-100">Training plans</span>
                <span className="text-[11px] text-zinc-500">Assign catalog-backed paths</span>
              </Link>
              <Link to="/team/members" className={linkTileClass}>
                <span className="text-sm font-medium text-zinc-100">Members</span>
                <span className="text-[11px] text-zinc-500">Workspace roster</span>
              </Link>
              <Link to="/team/learning-reports" className={linkTileClass}>
                <span className="text-sm font-medium text-zinc-100">Learning reports</span>
                <span className="text-[11px] text-zinc-500">Assignment progress</span>
              </Link>
              <Link to="/team/assignments" className={linkTileClass}>
                <span className="text-sm font-medium text-zinc-100">Assignments</span>
                <span className="text-[11px] text-zinc-500">Deployment board</span>
              </Link>
              <Link to={LEGAL_ROUTES.learn} className={linkTileClass}>
                <span className="text-sm font-medium text-zinc-100">Courses</span>
                <span className="text-[11px] text-zinc-500">Catalog</span>
              </Link>
              <Link to="/trends" className={linkTileClass}>
                <span className="text-sm font-medium text-zinc-100">Trend Insights</span>
                <span className="text-[11px] text-zinc-500">Signals and recommendations</span>
              </Link>
              <Link to="/ideas" className={linkTileClass}>
                <span className="text-sm font-medium text-zinc-100">Ideas</span>
                <span className="text-[11px] text-zinc-500">Operator workspace</span>
              </Link>
              <Link to="/studio" className={linkTileClass}>
                <span className="text-sm font-medium text-zinc-100">Studio</span>
                <span className="text-[11px] text-zinc-500">Packages &amp; adaptation</span>
              </Link>
              <Link to={LEGAL_ROUTES.workspaceSubscription} className={linkTileClass}>
                <span className="text-sm font-medium text-zinc-100">Billing / Plan</span>
                <span className="text-[11px] text-zinc-500">Subscription</span>
              </Link>
              <Link to="/settings" className={linkTileClass}>
                <span className="text-sm font-medium text-zinc-100">Settings</span>
                <span className="text-[11px] text-zinc-500">Workspace preferences</span>
              </Link>
            </>
          ) : null}
          {navVariant === 'super_admin' ? (
            <>
              <Link to="/platform" className={linkTileClass}>
                <span className="text-sm font-medium text-zinc-100">Platform ops</span>
                <span className="text-[11px] text-zinc-500">Runtime &amp; diagnostics</span>
              </Link>
              <Link to={LEGAL_ROUTES.learn} className={linkTileClass}>
                <span className="text-sm font-medium text-zinc-100">Catalog</span>
                <span className="text-[11px] text-zinc-500">All courses</span>
              </Link>
              <Link to={LEGAL_ROUTES.workspaceSubscription} className={linkTileClass}>
                <span className="text-sm font-medium text-zinc-100">Billing / Plan</span>
                <span className="text-[11px] text-zinc-500">Plans</span>
              </Link>
              {canViewOperatorInsights ? (
                <Link to="/insights" className={linkTileClass}>
                  <span className="text-sm font-medium text-zinc-100">Insights</span>
                  <span className="text-[11px] text-zinc-500">Learning analytics</span>
                </Link>
              ) : null}
              <Link to="/settings" className={linkTileClass}>
                <span className="text-sm font-medium text-zinc-100">Settings</span>
                <span className="text-[11px] text-zinc-500">Account</span>
              </Link>
            </>
          ) : null}
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-6">
        <p className="text-[11px] text-zinc-600">
          Need help? Open Account or sign out and back in after confirming email.
        </p>
        <button
          type="button"
          disabled={signOutPending}
          onClick={() => void signOut()}
          className="rounded-lg border border-zinc-600 bg-zinc-800/80 px-3 py-1.5 text-xs text-zinc-200 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Sign out
        </button>
      </div>
    </div>
  )
}
