import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import { LEARNER_MONETIZATION_UI_DISABLED } from '../../learner/learnerCommerceConstants'
import { LEGAL_ROUTES } from '../../training/trustCopy'
import { TrustLegalFooterLinks } from '../TrustLegalFooterLinks'
import { WorkspaceRouteReady } from './WorkspaceRouteReady'
import { LearnerPageShell } from '../learner-shell/LearnerPageShell'
import { LearnerAccountSettingsForm } from '../learner-shell/LearnerAccountSettingsForm'

/**
 * Account surface for learners — profile, password, and policies.
 */
export function LearnerAccountPage() {
  const { user, signOut, signOutPending } = useAuth()

  return (
    <WorkspaceRouteReady>
      <LearnerPageShell title="Account" purpose="Update your profile, password, and sign-in preferences.">
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
    </WorkspaceRouteReady>
  )
}
