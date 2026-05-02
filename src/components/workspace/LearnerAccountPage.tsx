import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import { passwordPolicyHint } from '../../auth/passwordPolicy'
import { LEARNER_MONETIZATION_UI_DISABLED } from '../../learner/learnerCommerceConstants'
import { LEGAL_ROUTES } from '../../training/trustCopy'
import { TrustLegalFooterLinks } from '../TrustLegalFooterLinks'
import { WorkspaceRouteReady } from './WorkspaceRouteReady'
import { LearnerPageShell } from '../learner-shell/LearnerPageShell'
import { LearnerAccountPanel } from '../learner-shell/LearnerAccountPanel'
import { learnerShellTokens } from '../learner-shell/learnerShellTokens'

/**
 * Account surface for learners — sign-in help and policies; no workspace operator controls.
 */
export function LearnerAccountPage() {
  const { user, signOut, signOutPending } = useAuth()

  return (
    <WorkspaceRouteReady>
      <LearnerPageShell title="Account" purpose="Manage how you sign in and review policies.">
        <LearnerAccountPanel
          email={user?.email ?? '—'}
          signOut={
            <button
              type="button"
              disabled={signOutPending}
              onClick={() => void signOut()}
              className={learnerShellTokens.ghostButton}
              data-testid="learner-account-sign-out"
            >
              Sign out
            </button>
          }
        >
          {isSupabaseConfigured() ? (
            <div className="space-y-2 border-t border-white/[0.06] pt-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">Password &amp; sign-in</h3>
              <p className="text-[12px] leading-relaxed text-zinc-500">{passwordPolicyHint()}</p>
              <Link to="/forgot-password" className="inline-flex text-sm font-medium text-violet-300 hover:text-violet-200 hover:underline">
                Reset password via email
              </Link>
            </div>
          ) : null}

          {LEARNER_MONETIZATION_UI_DISABLED ? null : (
            <div className="space-y-2 border-t border-white/[0.06] pt-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">Plan &amp; billing</h3>
              <div className="flex flex-wrap gap-3">
                <Link to={LEGAL_ROUTES.pricing} className="text-sm font-medium text-violet-300 hover:underline">
                  Pricing
                </Link>
                <Link to={LEGAL_ROUTES.workspaceSubscription} className="text-sm font-medium text-violet-300 hover:underline">
                  Billing / Plan
                </Link>
              </div>
            </div>
          )}
        </LearnerAccountPanel>

        <div className="border-t border-white/[0.06] pt-6">
          <p className="text-[11px] text-zinc-600">Legal &amp; policies</p>
          <TrustLegalFooterLinks variant="compact" className="mt-3 justify-start text-zinc-500 [&_a]:text-zinc-400 [&_a]:hover:text-zinc-200" />
        </div>
      </LearnerPageShell>
    </WorkspaceRouteReady>
  )
}
