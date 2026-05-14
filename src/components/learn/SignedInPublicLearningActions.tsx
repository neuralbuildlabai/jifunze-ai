import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { useAppAccess } from '../../access/useAppAccess'
import { resolveAccessTier } from '../../access/appAccess'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import { isAdminTier } from '../../lib/admin/adminAccess'
import { ADMIN_DEFAULT_SIGNED_IN_PATH } from '../../lib/signedInDefaultRoute'

/**
 * Signed-in shortcuts on public catalog / course surfaces (outside the signed-in learner / workspace layouts).
 */
export function SignedInPublicLearningActions({ className = '' }: { className?: string }) {
  const { user, signOut, signOutPending } = useAuth()
  const { tier } = useAppAccess()

  if (!isSupabaseConfigured() || !user) return null

  const emailTier = resolveAccessTier(user.email)
  const adminNav = isAdminTier(tier) || isAdminTier(emailTier)
  const primarySignedInHref = adminNav ? ADMIN_DEFAULT_SIGNED_IN_PATH : '/dashboard'
  const primarySignedInLabel = adminNav ? 'Admin console' : 'Dashboard'

  return (
    <div className={`flex flex-wrap items-center justify-end gap-2 ${className}`}>
      <Link
        to={primarySignedInHref}
        className="inline-flex min-h-[2.25rem] items-center rounded-lg border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] px-3 text-[11px] font-semibold text-[color:var(--jf-text)] transition hover:border-stone-400/45 hover:bg-[color:var(--jf-surface-elevated)]"
        data-testid="public-learning-dashboard"
      >
        {primarySignedInLabel}
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
