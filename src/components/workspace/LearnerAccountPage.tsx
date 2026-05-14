import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import { LEARNER_MONETIZATION_UI_DISABLED } from '../../learner/learnerCommerceConstants'
import { LEGAL_ROUTES } from '../../training/trustCopy'
import { TrustLegalFooterLinks } from '../TrustLegalFooterLinks'
import { LearnerRouteReady } from '../learner-shell/LearnerRouteReady'
import { LearnerPageShell } from '../learner-shell/LearnerPageShell'
import { LearnerAccountSettingsForm } from '../learner-shell/LearnerAccountSettingsForm'
import { useAdminAccess } from '../admin/useAdminAccess'

/**
 * Account surface for learners — profile, password, and policies.
 */
export function LearnerAccountPage() {
  const { user, signOut, signOutPending } = useAuth()
  const { canAccessAdmin, isSuperAdmin, tier } = useAdminAccess()

  return (
    <LearnerRouteReady>
      <LearnerPageShell title="Account" purpose="Update your profile, password, and sign-in preferences.">
        {isSupabaseConfigured() && user && canAccessAdmin ? (
          <section
            className="mb-8 rounded-2xl border border-violet-200/90 bg-violet-50/50 p-4 sm:p-5"
            data-testid="learner-account-admin-role-card"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-violet-800">Administrator access</p>
            <p className="mt-2 text-sm text-violet-950">
              {isSuperAdmin
                ? 'You have Super Admin access — full operator console including system accounts where implemented.'
                : 'You have Platform Admin access — day-to-day operations console. Super-only controls stay disabled.'}{' '}
              <span className="font-mono text-[11px] text-violet-800">({tier})</span>
            </p>
            <Link
              to="/admin/dashboard"
              className="mt-4 inline-flex min-h-[2.5rem] items-center justify-center rounded-full bg-violet-700 px-5 text-sm font-semibold text-white shadow-sm hover:bg-violet-800"
              data-testid="learner-account-open-admin-console"
            >
              Open Admin Console
            </Link>
          </section>
        ) : null}

        <LearnerAccountSettingsForm />

        {isSupabaseConfigured() && user ? (
          <div className="mt-8 border-t border-stone-200/90 pt-4">
            <button
              type="button"
              disabled={signOutPending}
              onClick={() => void signOut()}
              className="text-sm font-medium text-stone-600 underline-offset-2 hover:text-stone-900 hover:underline"
              data-testid="learner-account-sign-out"
            >
              {signOutPending ? 'Signing out…' : 'Sign out'}
            </button>
          </div>
        ) : null}

        {LEARNER_MONETIZATION_UI_DISABLED ? null : (
          <div className="mt-8 space-y-2 border-t border-stone-200/90 pt-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">Plan &amp; billing</h3>
            <div className="flex flex-wrap gap-3">
              <Link to={LEGAL_ROUTES.pricing} className="text-sm font-medium text-orange-700 hover:underline">
                Pricing
              </Link>
              <Link to={LEGAL_ROUTES.workspaceSubscription} className="text-sm font-medium text-orange-700 hover:underline">
                Billing / Plan
              </Link>
            </div>
          </div>
        )}

        <div className="mt-10 border-t border-stone-200/90 pt-6">
          <p className="text-[11px] text-stone-500">Legal &amp; policies</p>
          <TrustLegalFooterLinks variant="compact" className="mt-3 justify-start text-stone-500 [&_a]:text-stone-600 [&_a]:hover:text-stone-900" />
        </div>
      </LearnerPageShell>
    </LearnerRouteReady>
  )
}
