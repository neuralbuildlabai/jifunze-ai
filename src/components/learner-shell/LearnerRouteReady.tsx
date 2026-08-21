import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import { AuthForm } from '../AuthForm'

/**
 * Bootstrap gate for learner-only surfaces.
 *
 * Post-Wave-1 (2026-05-18): workspace/tenant bootstrap removed. Auth is now session-only,
 * so this gate just waits for the initial session resolve and routes to the auth form when
 * unauthenticated.
 */
export function LearnerRouteReady({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading } = useAuth()

  if (isSupabaseConfigured() && authLoading) {
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
          <h1 className="text-2xl font-semibold text-zinc-900">Jifunze.AI</h1>
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
