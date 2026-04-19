import { Link, Navigate } from 'react-router-dom'
import { WorkspaceNav } from './workspace/WorkspaceNav'
import { useAuth } from '../auth/AuthContext'
import { isSupabaseConfigured } from '../config/supabaseEnv'
import { EmptyWorkspaceCreateBrand } from './EmptyWorkspaceCreateBrand'
import { JifunzeBrandLogo } from './brand/JifunzeBrandLogo'
import { LearningOptimizationPanel } from './LearningOptimizationPanel'
import { TRUST_COPY } from '../training/trustCopy'

/**
 * Dedicated full readout for performance memory and “what Jifunze learned” (tenant-scoped).
 */
export function LearningInsightsPage() {
  const {
    user,
    brands,
    supabase,
    loading: authLoading,
    error: authError,
    workspaceTenantResolved,
    workspaceShellReady,
    signOut,
    signOutPending,
    retryWorkspaceBootstrap,
    tenantId,
  } = useAuth()

  const brand = brands[0] ?? null

  const workspaceBootstrapNeedsRecovery =
    isSupabaseConfigured() &&
    Boolean(user) &&
    !workspaceTenantResolved &&
    authError != null

  if (workspaceBootstrapNeedsRecovery) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-zinc-950 px-4 py-12 text-zinc-100">
        <div className="w-full max-w-2xl space-y-6 text-center">
          <p className="whitespace-pre-wrap text-sm text-rose-300/90">{authError}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => void retryWorkspaceBootstrap()}
              className="rounded-lg border border-violet-500/40 bg-violet-600/25 px-4 py-2 text-sm text-violet-100"
            >
              Retry workspace setup
            </button>
            <Link
              to="/"
              className="rounded-lg border border-zinc-600 bg-zinc-800/80 px-4 py-2 text-sm text-zinc-200"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (isSupabaseConfigured() && authLoading && !workspaceShellReady) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-zinc-950 px-4 py-12 text-zinc-100">
        <p className="text-sm text-zinc-400">Loading workspace…</p>
      </div>
    )
  }

  if (isSupabaseConfigured() && !user) {
    return <Navigate to="/" replace />
  }

  if (isSupabaseConfigured() && user && brands.length === 0) {
    return <EmptyWorkspaceCreateBrand gate="empty_brands" />
  }

  if (!brand) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-zinc-950 px-4 py-12 text-zinc-100">
        <p className="text-sm text-zinc-500">No brand profile loaded.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-zinc-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-950 to-zinc-950 px-4 py-10 text-zinc-100">
      <div className="mx-auto max-w-2xl space-y-8">
        <header className="space-y-4 border-b border-zinc-800/80 pb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <JifunzeBrandLogo to="/" size="lg" />
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">Insights</p>
                <h1 className="text-lg font-semibold text-white">What Jifunze learned</h1>
                <p className="text-xs text-zinc-500">{brand.name}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                disabled={signOutPending}
                onClick={() => void signOut()}
                className="rounded-lg border border-zinc-700 px-3 py-2 text-xs text-zinc-400 hover:text-zinc-200 disabled:opacity-50"
              >
                Sign out
              </button>
            </div>
          </div>
          <WorkspaceNav className="w-full justify-start" />
        </header>

        <p className="text-sm leading-relaxed text-zinc-400">
          Full performance memory, patterns, recommendations, and teaching signals for this workspace
          (tenant <span className="font-mono text-zinc-500">{tenantId.slice(0, 8)}…</span>).
        </p>
        <p className="text-[11px] leading-relaxed text-zinc-600" data-testid="learning-insights-trust">
          {TRUST_COPY.learningInsightsHeuristicBoundary}
        </p>

        <LearningOptimizationPanel
          brand={brand}
          tenantId={tenantId}
          supabase={supabase}
          variant="full"
        />

        <p className="text-center text-[11px] text-zinc-600">
          For discovery and generation, use{' '}
          <Link to="/ideas" className="text-violet-300/90 hover:text-violet-200">
            Ideas
          </Link>{' '}
          and{' '}
          <Link to="/studio" className="text-violet-300/90 hover:text-violet-200">
            Studio
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
