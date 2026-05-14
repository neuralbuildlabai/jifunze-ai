import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { isSupabaseConfigured } from '../../config/supabaseEnv'

/**
 * Signed-in shortcuts on public catalog / course surfaces (outside the signed-in learner / workspace layouts).
 */
export function SignedInPublicLearningActions({ className = '' }: { className?: string }) {
  const { user, signOut, signOutPending } = useAuth()

  if (!isSupabaseConfigured() || !user) return null

  return (
    <div className={`flex flex-wrap items-center justify-end gap-2 ${className}`}>
      <Link
        to="/dashboard"
        className="inline-flex min-h-[2.25rem] items-center rounded-lg border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] px-3 text-[11px] font-semibold text-[color:var(--jf-text)] transition hover:border-stone-400/45 hover:bg-[color:var(--jf-surface-elevated)]"
        data-testid="public-learning-dashboard"
      >
        Dashboard
      </Link>
      <Link
        to="/my-learning"
        className="inline-flex min-h-[2.25rem] items-center rounded-lg border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)] px-3 text-[11px] font-semibold text-[color:var(--jf-muted)] transition hover:border-stone-400/45 hover:text-[color:var(--jf-text)]"
        data-testid="public-learning-my-learning"
      >
        My Learning
      </Link>
      <button
        type="button"
        disabled={signOutPending}
        onClick={() => void signOut()}
        className="inline-flex min-h-[2.25rem] items-center rounded-lg border border-transparent px-2 text-[11px] font-medium text-[color:var(--jf-muted)] transition hover:text-[color:var(--jf-text)] disabled:cursor-not-allowed disabled:opacity-50"
        data-testid="public-learning-sign-out"
      >
        {signOutPending ? 'Signing out…' : 'Sign out'}
      </button>
    </div>
  )
}
