import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import { passwordPolicyHint } from '../../auth/passwordPolicy'
import { LEARNER_MONETIZATION_UI_DISABLED } from '../../learner/learnerCommerceConstants'
import { LEGAL_ROUTES } from '../../training/trustCopy'
import { TrustLegalFooterLinks } from '../TrustLegalFooterLinks'
import { WorkspaceNav } from './WorkspaceNav'
import { WorkspaceRouteReady, WorkspaceRouteShell } from './WorkspaceRouteReady'

/**
 * Lightweight account surface for learners — billing links, password guidance, legal links;
 * no workspace-generator roster or operator diagnostics.
 */
export function LearnerAccountPage() {
  const { user, signOut, signOutPending } = useAuth()

  return (
    <WorkspaceRouteReady>
      <WorkspaceRouteShell
        title="Account"
        subtitle="Manage how you sign in and review policies—without workspace admin controls."
      >
        <WorkspaceNav className="mb-8 w-full justify-start" />

        <section className="rounded-2xl border border-white/[0.06] bg-zinc-950/35 p-5 space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">Signed in</h2>
          <p className="text-sm text-zinc-100">{user?.email ?? '—'}</p>
          <button
            type="button"
            disabled={signOutPending}
            onClick={() => void signOut()}
            className="rounded-lg border border-zinc-600 bg-zinc-800/80 px-4 py-2 text-sm font-medium text-zinc-100 hover:bg-zinc-800 disabled:opacity-50"
            data-testid="learner-account-sign-out"
          >
            Sign out
          </button>
        </section>

        {LEARNER_MONETIZATION_UI_DISABLED ? null : (
          <section className="mt-6 rounded-2xl border border-white/[0.06] bg-zinc-950/35 p-5 space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">Plan &amp; billing</h2>
            <p className="text-[13px] leading-relaxed text-zinc-400">View plans and manage subscription readiness in one place.</p>
            <div className="flex flex-wrap gap-3">
              <Link
                to={LEGAL_ROUTES.pricing}
                className="rounded-lg border border-violet-500/35 bg-violet-950/30 px-4 py-2 text-sm font-medium text-violet-100 hover:bg-violet-950/45"
              >
                Pricing
              </Link>
              <Link
                to={LEGAL_ROUTES.workspaceSubscription}
                className="rounded-lg border border-zinc-600 bg-zinc-900/60 px-4 py-2 text-sm font-medium text-zinc-100 hover:bg-zinc-800"
              >
                Billing / Plan
              </Link>
            </div>
          </section>
        )}

        {isSupabaseConfigured() ? (
          <section className="mt-6 rounded-2xl border border-white/[0.06] bg-zinc-950/35 p-5 space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">Password &amp; sign-in</h2>
            <p className="text-[12px] leading-relaxed text-zinc-500">{passwordPolicyHint()}</p>
            <Link
              to="/forgot-password"
              className="inline-flex text-sm font-medium text-violet-300 hover:text-violet-200 hover:underline"
            >
              Reset password via email
            </Link>
          </section>
        ) : null}

        <div className="mt-10 border-t border-white/[0.06] pt-6">
          <p className="text-[11px] text-zinc-600">Legal &amp; policies</p>
          <TrustLegalFooterLinks variant="compact" className="mt-3 justify-start text-zinc-500 [&_a]:text-zinc-400 [&_a]:hover:text-zinc-200" />
        </div>
      </WorkspaceRouteShell>
    </WorkspaceRouteReady>
  )
}
