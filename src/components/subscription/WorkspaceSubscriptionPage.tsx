import { Link } from 'react-router-dom'
import { humanAccessTierLabel } from '../../access/appAccess'
import { useAppAccess } from '../../access/useAppAccess'
import { LEGAL_ROUTES, TRUST_COPY } from '../../training/trustCopy'
import { SUBSCRIPTION_PLANS } from '../../subscription/plans'
import { TrustBoundaryStrip } from '../TrustBoundaryStrip'
import { WorkspaceRouteReady, WorkspaceRouteShell } from '../workspace/WorkspaceRouteReady'

function WorkspaceSubscriptionInner() {
  const { tier, tierLoading } = useAppAccess()
  const label = humanAccessTierLabel(tier)
  const planHint = SUBSCRIPTION_PLANS.find((p) => p.accessTierHint === tier) ?? SUBSCRIPTION_PLANS[0]

  return (
    <WorkspaceRouteShell
      title="Subscription"
      subtitle="Your effective access tier today, plus where paid plans will connect when billing is enabled."
    >
      <section className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 ring-1 ring-white/[0.04]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Current access</p>
        <p className="mt-2 text-lg font-semibold text-white">{tierLoading ? 'Loading…' : label}</p>
        <p className="mt-2 text-sm text-zinc-500">
          Maps to the <span className="text-zinc-300">{planHint.name}</span> plan family for marketing purposes—effective
          entitlements still come from workspace configuration and server-side checks.
        </p>
        <Link
          to={LEGAL_ROUTES.pricing}
          className="mt-4 inline-flex rounded-xl bg-violet-600/90 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-500"
        >
          View plans &amp; pricing
        </Link>
      </section>

      <TrustBoundaryStrip variant="panel" />

      <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-4 space-y-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Billing readiness</h2>
        <p className="text-[12px] leading-relaxed text-zinc-500">
          In-app checkout is not enabled yet. When billing connects, you will manage payment methods and invoices here or via
          a secure portal link.
        </p>
        <p className="text-[11px] leading-relaxed text-zinc-600">{TRUST_COPY.subscriptionProductBoundary}</p>
        <p className="text-[11px] leading-relaxed text-zinc-600">{TRUST_COPY.affiliationCheckoutReminder}</p>
      </section>
    </WorkspaceRouteShell>
  )
}

export function WorkspaceSubscriptionPage() {
  return (
    <WorkspaceRouteReady>
      <WorkspaceSubscriptionInner />
    </WorkspaceRouteReady>
  )
}
