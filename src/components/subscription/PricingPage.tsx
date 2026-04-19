import { Link } from 'react-router-dom'
import { LEGAL_ROUTES, TRUST_COPY } from '../../training/trustCopy'
import { SUBSCRIPTION_PLANS } from '../../subscription/subscriptionCatalog'
import { JifunzeBrandLogo } from '../brand/JifunzeBrandLogo'
import { TrustBoundaryStrip } from '../TrustBoundaryStrip'
import { isBillingCheckoutEnabled } from '../../lib/billingEnv'
import { PricingSkuCards } from '../pricing/PricingSkuCards'

/** Legacy route — mirrors public catalog; prefer `/pricing` canonical. */
export function PricingPage() {
  const billingEnabled = isBillingCheckoutEnabled()
  const freePlan = SUBSCRIPTION_PLANS.find((p) => p.id === 'free')

  return (
    <div className="min-h-screen w-full bg-zinc-950 px-4 py-10 text-zinc-100">
      <div className="mx-auto w-full max-w-5xl space-y-8">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
          <JifunzeBrandLogo to="/" size="sm" variant="compact" />
          <Link to="/pricing" className="text-xs font-medium text-violet-300/90 hover:text-violet-200">
            Canonical pricing
          </Link>
        </header>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Plans</p>
          <h1 className="mt-2 text-2xl font-semibold text-white">Choose learning access</h1>
          <p className="mt-2 max-w-3xl text-sm text-zinc-400">
            One-time modules, monthly module plans, bundles, full access, and team/student discounts (where enabled). Paid access
            is software and materials—not a credential. See the{' '}
            <Link className="text-violet-300/90 hover:text-violet-200" to={LEGAL_ROUTES.disclaimer}>
              disclaimer
            </Link>{' '}
            for boundaries.
          </p>
        </div>

        <TrustBoundaryStrip variant="panel" dataTestId="pricing-trust-strip" />

        <div className="rounded-xl border border-amber-500/20 bg-amber-950/15 p-4 text-[11px] leading-relaxed text-amber-100/95 ring-1 ring-amber-500/10">
          <p className="font-semibold uppercase tracking-[0.12em] text-amber-200/95">Paid access &amp; outcomes</p>
          <p className="mt-2 text-zinc-300/95">{TRUST_COPY.subscriptionPaidAccessBoundary}</p>
        </div>

        {freePlan ? (
          <section
            className="flex max-w-xl flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 ring-1 ring-white/[0.04]"
            data-testid={`pricing-plan-${freePlan.id}`}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">{freePlan.name}</p>
            <p className="mt-2 text-sm font-semibold text-white">{freePlan.tagline ?? freePlan.summary}</p>
            <p className="mt-3 text-2xl font-semibold text-white">$0</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[13px] text-zinc-400">
              {freePlan.bullets.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <button
              type="button"
              disabled
              className="mt-6 w-full rounded-xl border border-white/[0.08] bg-zinc-950/60 px-4 py-2.5 text-sm font-semibold text-zinc-500"
            >
              Included
            </button>
          </section>
        ) : null}

        <PricingSkuCards mode="public" billingEnabled={billingEnabled} workspaceCheckoutHref="/settings/subscription" />

        <p className="text-center text-[11px] text-zinc-600">
          See also{' '}
          <Link className="text-violet-300/90 hover:text-violet-200" to={LEGAL_ROUTES.refunds}>
            Refunds &amp; billing
          </Link>{' '}
          and the{' '}
          <Link className="text-violet-300/90 hover:text-violet-200" to={LEGAL_ROUTES.disclaimer}>
            product disclaimer
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
