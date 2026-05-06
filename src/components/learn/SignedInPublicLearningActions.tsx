import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { isSupabaseConfigured } from '../../config/supabaseEnv'

/**
 * Compact Dashboard + Sign out for signed-in learners on public catalog/pathway surfaces
 * (outside {@link WorkspaceShell}).
 */
export function SignedInPublicLearningActions({ className = '' }: { className?: string }) {
  const { user, signOut, signOutPending } = useAuth()

  if (!isSupabaseConfigured() || !user) return null

  return (
    <div className={`flex flex-wrap items-center justify-end gap-2 ${className}`}>
      <Link
        to="/dashboard"
        className="inline-flex min-h-[2.25rem] items-center rounded-lg border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] px-3 text-[11px] font-semibold text-[color:var(--jf-text)] transition hover:border-stone-400/45 hover:bg-[color:var(--jf-surface-elevated)]"
      >
        Dashboard
      </Link>
      <button
        type="button"
        disabled={signOutPending}
        onClick={() => void signOut()}
        className="inline-flex min-h-[2.25rem] items-center rounded-lg border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)] px-3 text-[11px] font-semibold text-[color:var(--jf-muted)] transition hover:border-stone-400/45 hover:text-[color:var(--jf-text)] disabled:cursor-not-allowed disabled:opacity-50"
        data-testid="public-learning-sign-out"
      >
        {signOutPending ? 'Signing out…' : 'Sign out'}
      </button>
    </div>
  )
}
