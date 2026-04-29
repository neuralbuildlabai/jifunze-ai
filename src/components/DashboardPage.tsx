import { Link } from 'react-router-dom'
import { useAppAccess } from '../access/useAppAccess'
import { humanAccessTierLabel } from '../access/appAccess'
import { LEGAL_ROUTES } from '../training/trustCopy'
import { useAuth } from '../auth/AuthContext'
import { isSupabaseConfigured } from '../config/supabaseEnv'
import { DashboardTeamAssignmentsWidget } from './team/DashboardTeamAssignmentsWidget'
import { DashboardLearnerHub } from './DashboardLearnerHub'
import { DashboardAdminToolsSection } from './DashboardAdminToolsSection'

const cardClass =
  'rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 shadow-[0_12px_40px_rgba(0,0,0,0.2)] ring-1 ring-white/[0.04]'

const linkTileClass =
  'flex flex-col gap-1 rounded-lg border border-white/[0.06] bg-zinc-950/40 px-3 py-2.5 text-left transition hover:border-violet-400/25 hover:bg-white/[0.04]'

/**
 * Post-login hub: pathway-first learner surfaces, then account; admin tools stay compact below for operators.
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

  const { tier, tierLoading, navVariant, canViewOperatorInsights, canManageInstitutionTrainingPlans } = useAppAccess()

  const workspaceBootstrapNeedsRecovery =
    isSupabaseConfigured() && Boolean(user) && !workspaceTenantResolved && authError != null

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
    <div className="mx-auto w-full max-w-4xl space-y-8 px-4 py-10 text-zinc-100">
      <header className="border-b border-white/[0.06] pb-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">Dashboard</p>
        <h1 className="mt-1 text-xl font-semibold text-white">Welcome back</h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-400">
          Continue your pathway, build portfolio-ready proof, and manage your learning workspace.
        </p>
      </header>

      <DashboardLearnerHub />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <DashboardTeamAssignmentsWidget />
        </div>
        <section className={navVariant === 'learner' ? `${cardClass} sm:col-span-2` : cardClass}>
          <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">Account</h2>
          <p className="mt-2 text-sm text-zinc-200">{email}</p>
          {navVariant === 'learner' ? (
            <p className="mt-3 text-[13px] leading-relaxed text-zinc-400">
              Open Account when you need billing links, password help, or plan details—your pathway progress stays in Reports and Pathways.
            </p>
          ) : null}
        </section>
        {navVariant === 'learner' ? null : (
          <section className={cardClass}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">Role</h2>
            <p className="mt-2 text-sm font-medium text-zinc-100">{tierLoading ? 'Loading…' : tierLabel}</p>
            <p className="mt-1 text-[11px] leading-relaxed text-zinc-500">
              Course access follows your subscription or purchases. Administrative actions are enforced on the server too.
            </p>
          </section>
        )}
      </div>

      {navVariant === 'learner' ? (
        <section className="space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">Shortcuts</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            <Link to="/my-learning" className={linkTileClass}>
              <span className="text-sm font-medium text-zinc-100">My Learning</span>
              <span className="text-[11px] text-zinc-500">Assignments and enrolled paths</span>
            </Link>
            <Link to="/reports" className={linkTileClass}>
              <span className="text-sm font-medium text-zinc-100">Reports</span>
              <span className="text-[11px] text-zinc-500">Session and module progress</span>
            </Link>
            <Link to={LEGAL_ROUTES.paths} className={linkTileClass}>
              <span className="text-sm font-medium text-zinc-100">Pathways</span>
              <span className="text-[11px] text-zinc-500">Employability tracks</span>
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
              <span className="text-[11px] text-zinc-500">Plan links and sign-in</span>
            </Link>
          </div>
        </section>
      ) : null}

      <DashboardAdminToolsSection
        navVariant={navVariant}
        canManageInstitutionTrainingPlans={canManageInstitutionTrainingPlans}
        canViewOperatorInsights={canViewOperatorInsights}
      />

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-6">
        <p className="text-[11px] text-zinc-600">Need help? Open Account or sign out and back in after confirming email.</p>
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
