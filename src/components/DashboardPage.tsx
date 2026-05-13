import { LearnerDashboardPage } from './learning/LearnerDashboardPage'
import { useAppAccess } from '../access/useAppAccess'
import { humanAccessTierLabel } from '../access/appAccess'
import { useAuth } from '../auth/AuthContext'
import { isSupabaseConfigured } from '../config/supabaseEnv'
import { LEARNER_MONETIZATION_UI_DISABLED } from '../learner/learnerCommerceConstants'
import { DashboardTeamAssignmentsWidget } from './team/DashboardTeamAssignmentsWidget'
import { DashboardAdminToolsSection } from './DashboardAdminToolsSection'
import { DashboardSuperAdminHub } from './DashboardSuperAdminHub'

const cardClass =
  'rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 shadow-[0_12px_40px_rgba(0,0,0,0.2)] ring-1 ring-white/[0.04]'

/**
 * Role-specific dashboard for operators (super-admin, institution, platform). Learners see the learner dashboard.
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

  if (navVariant === 'learner') {
    return <LearnerDashboardPage />
  }

  const email = user?.email ?? '—'
  const tierLabel = humanAccessTierLabel(tier)
  const maxWidth = navVariant === 'super_admin' ? 'max-w-5xl' : 'max-w-3xl'

  const header =
    navVariant === 'super_admin' ? (
      <header className="border-b border-white/[0.06] pb-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">Jifunze.ai Workspace</p>
        <h1 className="mt-1 text-xl font-semibold text-white">Operations</h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-400">
          Manage platform operations, learning content, and internal review.
        </p>
      </header>
    ) : (
      <header className="border-b border-white/[0.06] pb-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">Workspace</p>
        <h1 className="mt-1 text-xl font-semibold text-white">Operations dashboard</h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-400">
          Assign training, review learner progress, and run workspace tools—learner views stay in the public catalog and My Learning.
        </p>
      </header>
    )

  return (
    <div className={`mx-auto w-full ${maxWidth} space-y-8 px-4 py-10 text-zinc-100`}>
      {header}

      {navVariant === 'super_admin' ? <DashboardSuperAdminHub /> : null}

      {navVariant === 'institution_admin' || navVariant === 'platform_admin' ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <DashboardTeamAssignmentsWidget />
          </div>
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <section className={cardClass}>
          <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">Account</h2>
          <p className="mt-2 text-sm text-zinc-200">{email}</p>
        </section>
        <section className={cardClass}>
          <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">Role</h2>
          <p className="mt-2 text-sm font-medium text-zinc-100">{tierLoading ? 'Loading…' : tierLabel}</p>
          {LEARNER_MONETIZATION_UI_DISABLED ? (
            <p className="mt-1 text-[11px] leading-relaxed text-zinc-500">Administrative actions are enforced on the server.</p>
          ) : (
            <p className="mt-1 text-[11px] leading-relaxed text-zinc-500">
              Course access follows your subscription or purchases. Administrative actions are enforced on the server too.
            </p>
          )}
        </section>
      </div>

      {navVariant === 'super_admin' ? null : (
        <DashboardAdminToolsSection
          navVariant={navVariant}
          canManageInstitutionTrainingPlans={canManageInstitutionTrainingPlans}
          canViewOperatorInsights={canViewOperatorInsights}
        />
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-6">
        <p className="text-[11px] text-zinc-600">Need help? Open Settings or sign out and back in after confirming email.</p>
        <button
          type="button"
          disabled={signOutPending}
          onClick={() => void signOut()}
          className="rounded-lg border border-zinc-600 bg-zinc-800/80 px-3 py-1.5 text-xs text-zinc-200 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
          data-testid="dashboard-sign-out"
        >
          Sign out
        </button>
      </div>
    </div>
  )
}
