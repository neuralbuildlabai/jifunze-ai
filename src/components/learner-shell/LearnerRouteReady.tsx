import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import { AuthForm } from '../AuthForm'

/**
 * Bootstrap gate for learner-only surfaces — uses auth only (no studio / brand generator context).
 */
export function LearnerRouteReady({ children }: { children: React.ReactNode }) {
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

  const setupNeedsRecovery =
    isSupabaseConfigured() && Boolean(user) && !workspaceTenantResolved && authError != null

  if (setupNeedsRecovery) {
    return (
      <div className="mx-auto flex min-h-[min(70vh,48rem)] w-full max-w-2xl flex-col items-center justify-center space-y-6 px-4 py-12 text-center text-stone-800">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold text-zinc-900">Account setup</h1>
          <p className="whitespace-pre-wrap text-sm text-rose-700/90">{authError}</p>
        </header>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => void retryWorkspaceBootstrap()}
            className="rounded-lg border border-orange-600/40 bg-orange-600/15 px-4 py-2 text-sm font-medium text-orange-900 hover:bg-orange-600/25"
          >
            Retry setup
          </button>
          <button
            type="button"
            disabled={signOutPending}
            onClick={() => void signOut()}
            className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Sign out
          </button>
        </div>
      </div>
    )
  }

  if (isSupabaseConfigured() && authLoading && !workspaceShellReady) {
    return (
      <div className="mx-auto flex min-h-[min(70vh,48rem)] w-full max-w-2xl items-center justify-center px-4 py-12">
        <p className="text-sm text-stone-600">Loading…</p>
      </div>
    )
  }

  if (isSupabaseConfigured() && !user) {
    return (
      <div className="mx-auto flex min-h-[min(70vh,48rem)] w-full max-w-2xl flex-col items-center justify-center space-y-6 px-4 py-12 text-center text-stone-800">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold text-zinc-900">Jifunze</h1>
          <p className="text-sm text-stone-600">Sign in to continue.</p>
        </header>
        <div className="flex justify-center">
          <AuthForm />
        </div>
        <p className="text-xs text-stone-500">
          <Link to="/" className="font-medium text-orange-700 hover:underline">
            Back home
          </Link>
        </p>
      </div>
    )
  }

  return <>{children}</>
}
