import { Link } from 'react-router-dom'
import { useAppAccess } from '../access/useAppAccess'
import { TrustBoundaryStrip } from './TrustBoundaryStrip'
import { humanAccessTierLabel } from '../access/appAccess'
import { useAuth } from '../auth/AuthContext'
import { isSupabaseConfigured } from '../config/supabaseEnv'
import { isWorkspaceTenantId } from '../persistence/tenantPersistenceMode'
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
    tenantId,
    loading: authLoading,
    error: authError,
    workspaceTenantResolved,
    workspaceShellReady,
    signOut,
    signOutPending,
    retryWorkspaceBootstrap,
  } = useAuth()

  const {
    tier,
    tierLoading,
    showProLabNav,
    showPlatformNav,
    showTenantMetadata,
  } = useAppAccess()

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
  const tenantLabel =
    showTenantMetadata && isWorkspaceTenantId(tenantId) ? tenantId : null

  return (
    <div className="mx-auto w-full max-w-3xl space-y-8 px-4 py-10 text-zinc-100">
      <header className="border-b border-white/[0.06] pb-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">Dashboard</p>
        <h1 className="mt-1 text-xl font-semibold text-white">Welcome back</h1>
        <p className="mt-2 max-w-xl text-sm text-zinc-400">
          Your shortcuts reflect your effective access tier. Sensitive actions are still enforced server-side.
        </p>
      </header>

      <TrustBoundaryStrip dataTestId="dashboard-trust-boundary" />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <DashboardTrainingWidget />
        </div>
        <div className="sm:col-span-2">
          <DashboardTeamAssignmentsWidget />
        </div>
        <section className={cardClass}>
          <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">Account</h2>
          <p className="mt-2 text-sm text-zinc-200">{email}</p>
        </section>
        <section className={cardClass}>
          <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
            Effective access
          </h2>
          <p className="mt-2 text-sm font-medium text-zinc-100">
            {tierLoading ? 'Loading tier…' : tierLabel}
          </p>
          <p className="mt-1 text-[11px] leading-relaxed text-zinc-500">
            From <code className="text-zinc-400">my_effective_access_tier</code> when your workspace is ready.
          </p>
        </section>
        {tenantLabel ? (
          <section className={`${cardClass} sm:col-span-2`}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
              Workspace tenant
            </h2>
            <p className="mt-2 break-all font-mono text-xs text-zinc-300">{tenantLabel}</p>
          </section>
        ) : null}
      </div>

      <section className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">Go to</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          <Link to="/training" className={linkTileClass}>
            <span className="text-sm font-medium text-zinc-100">Training</span>
            <span className="text-[11px] text-zinc-500">Plans and lessons</span>
          </Link>
          <Link to="/team/members" className={linkTileClass}>
            <span className="text-sm font-medium text-zinc-100">Team</span>
            <span className="text-[11px] text-zinc-500">Members and assignments</span>
          </Link>
          <Link to="/trends" className={linkTileClass}>
            <span className="text-sm font-medium text-zinc-100">Trends</span>
            <span className="text-[11px] text-zinc-500">Topics, signals, recommendations</span>
          </Link>
          <Link to="/" className={linkTileClass}>
            <span className="text-sm font-medium text-zinc-100">Create</span>
            <span className="text-[11px] text-zinc-500">Generate and handoff</span>
          </Link>
          <Link to="/ideas" className={linkTileClass}>
            <span className="text-sm font-medium text-zinc-100">Ideas</span>
            <span className="text-[11px] text-zinc-500">Trend opportunities</span>
          </Link>
          <Link to="/studio" className={linkTileClass}>
            <span className="text-sm font-medium text-zinc-100">Studio</span>
            <span className="text-[11px] text-zinc-500">Packages &amp; adaptation</span>
          </Link>
          <Link to="/insights" className={linkTileClass}>
            <span className="text-sm font-medium text-zinc-100">Insights</span>
            <span className="text-[11px] text-zinc-500">Learning readout</span>
          </Link>
          <Link to="/settings" className={linkTileClass}>
            <span className="text-sm font-medium text-zinc-100">Settings</span>
            <span className="text-[11px] text-zinc-500">Workspace preferences</span>
          </Link>
          {showProLabNav ? (
            <Link to="/lab" className={linkTileClass}>
              <span className="text-sm font-medium text-zinc-100">Lab</span>
              <span className="text-[11px] text-zinc-500">Pro / simulation tools</span>
            </Link>
          ) : null}
          {showPlatformNav ? (
            <Link to="/platform" className={linkTileClass}>
              <span className="text-sm font-medium text-zinc-100">Platform</span>
              <span className="text-[11px] text-zinc-500">Operator surface</span>
            </Link>
          ) : null}
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-6">
        <p className="text-[11px] text-zinc-600">
          Need help? Use Settings or sign out and back in after confirming email.
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
