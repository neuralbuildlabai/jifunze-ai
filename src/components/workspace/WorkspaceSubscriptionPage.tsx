import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { humanAccessTierLabel } from '../../access/appAccess'
import { useAppAccess } from '../../access/useAppAccess'
import { PricingSkuCards } from '../pricing/PricingSkuCards'
import { SUBSCRIPTION_PLANS } from '../../subscription/subscriptionCatalog'
import { LEGAL_ROUTES, SUPPORT_CONTACT_EMAIL, TRUST_COPY } from '../../training/trustCopy'
import { LearnerRouteReady } from '../learner-shell/LearnerRouteReady'
import { LearnerPageShell } from '../learner-shell/LearnerPageShell'
import { isBillingCheckoutInteractive, isBillingLiveConfigured } from '../../lib/billingEnv'
import { openStripeBillingPortal, startStripeCheckout } from '../../lib/billingStripe'
import type { PricingSkuKey } from '../../subscription/pricingSkuRegistry'

export function WorkspaceSubscriptionPage() {
  const { tier, tierLoading, refreshAccessTier } = useAppAccess()
  const tierLabel = tierLoading ? 'Loading…' : humanAccessTierLabel(tier)
  const planHint = SUBSCRIPTION_PLANS.find((p) => p.id === 'jifunze_monthly')

  const { supabase, user } = useAuth()
  const location = useLocation()
  const checkoutInteractive = isBillingCheckoutInteractive()
  const liveBillingConfigured = isBillingLiveConfigured()

  const [billingFlash, setBillingFlash] = useState<string | null>(null)
  const [portalBusy, setPortalBusy] = useState(false)
  const [checkoutBusy, setCheckoutBusy] = useState<PricingSkuKey | null>(null)

  const search = useMemo(() => new URLSearchParams(location.search), [location.search])

  useEffect(() => {
    const checkout = search.get('checkout')
    if (checkout !== 'success') return
    void refreshAccessTier()
    const t = window.setTimeout(() => void refreshAccessTier(), 2500)
    return () => window.clearTimeout(t)
  }, [search, refreshAccessTier])

  const checkoutBanner =
    search.get('checkout') === 'success'
      ? 'Payment received — your access updates in a moment. Refresh if needed.'
      : search.get('checkout') === 'cancel'
        ? 'Checkout was canceled. No charge was made.'
        : null

  async function onCheckout(skuKey: PricingSkuKey) {
    if (!import.meta.env.VITE_E2E_BILLING_INVOKE_MOCK && !supabase) return
    setCheckoutBusy(skuKey)
    setBillingFlash(null)
    const res = await startStripeCheckout(supabase, skuKey)
    setCheckoutBusy(null)
    if (!res.ok) {
      setBillingFlash(res.message)
      return
    }
    document.location.assign(res.url)
  }

  async function onPortal() {
    if (!supabase) return
    setPortalBusy(true)
    const res = await openStripeBillingPortal(supabase)
    setPortalBusy(false)
    if (!res.ok) {
      setBillingFlash(res.message)
      return
    }
    document.location.assign(res.url)
  }

  return (
    <LearnerRouteReady>
      <LearnerPageShell
        title="Plans & billing"
        purpose="Choose monthly access, annual savings, or a one-time single-course purchase."
      >
        {checkoutBanner || billingFlash ? (
          <section
            className="rounded-xl border border-orange-200/80 bg-orange-50/90 p-4 text-[13px] leading-relaxed text-orange-950 shadow-sm"
            data-testid="billing-checkout-banner"
          >
            {billingFlash ?? checkoutBanner}
          </section>
        ) : null}

        <section className="rounded-xl border border-stone-200/90 bg-white p-4 text-stone-800 shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-stone-500">Your account</p>
          <p className="mt-2 text-sm text-stone-700">
            Signed in as <span className="font-medium text-zinc-900">{user?.email ?? '—'}</span>
          </p>
          <p className="mt-2 text-sm text-stone-600">
            Plan label: <span className="font-semibold text-zinc-900">{tierLabel}</span>
          </p>
          {planHint ? (
            <p className="mt-2 text-[12px] text-stone-600">
              Typical paid entry: <span className="text-zinc-900">{planHint.name}</span> — actual access follows what you purchase at checkout.
            </p>
          ) : null}
        </section>

        <PricingSkuCards
          mode="workspace"
          billingEnabled={checkoutInteractive}
          onCheckoutSku={(skuKey) => void onCheckout(skuKey)}
          checkoutBusySku={checkoutBusy}
          showStripeEnvHints={false}
        />

        {liveBillingConfigured ? (
          <section className="rounded-xl border border-stone-200/90 bg-stone-50/80 p-4 text-[12px] text-stone-700 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-stone-500">Manage payment method</p>
            <p className="mt-2 text-stone-600">
              Update cards, invoices, and cancellation through our secure billing portal.
            </p>
            <button
              type="button"
              disabled={!liveBillingConfigured || portalBusy}
              onClick={() => void onPortal()}
              className="mt-3 inline-flex rounded-lg border border-orange-600/30 bg-orange-600/10 px-4 py-2 text-[12px] font-semibold text-orange-900 transition hover:bg-orange-600/15 disabled:cursor-not-allowed disabled:opacity-40"
              data-testid="billing-open-portal"
            >
              {portalBusy ? 'Opening…' : 'Open billing portal'}
            </button>
          </section>
        ) : null}

        <p className="text-sm leading-relaxed text-stone-600">{TRUST_COPY.subscriptionPaidAccessBoundary}</p>

        <section className="rounded-xl border border-stone-200/90 bg-white p-4 text-[12px] text-stone-700 shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-stone-500">Refund help</p>
          <p className="mt-2 text-[12px] leading-relaxed text-stone-600">
            Questions about refunds follow our{' '}
            <Link className="font-medium text-orange-700 hover:underline" to={LEGAL_ROUTES.refunds}>
              refunds policy
            </Link>
            . Contact{' '}
            <a className="font-medium text-orange-700 hover:underline" href={`mailto:${SUPPORT_CONTACT_EMAIL}`}>
              {SUPPORT_CONTACT_EMAIL}
            </a>{' '}
            with the email on your account.
          </p>
        </section>

        <section className="rounded-xl border border-amber-200/80 bg-amber-50/90 p-4 text-[11px] leading-relaxed text-amber-950 shadow-sm">
          <p className="font-semibold text-amber-950">Billing support</p>
          <p className="mt-2 text-amber-900/90">
            For invoices, taxes, or payment issues, email <span className="font-medium text-amber-950">{SUPPORT_CONTACT_EMAIL}</span>.
          </p>
        </section>

        <nav className="flex flex-wrap gap-x-4 gap-y-2 border-t border-stone-200/90 pt-6 text-[12px] text-stone-600">
          <Link className="font-medium text-orange-700 hover:underline" to={LEGAL_ROUTES.pricing}>
            Public pricing
          </Link>
          <Link className="font-medium text-orange-700 hover:underline" to={LEGAL_ROUTES.refunds}>
            Refunds
          </Link>
          <Link className="font-medium text-orange-700 hover:underline" to={LEGAL_ROUTES.privacy}>
            Privacy
          </Link>
          <Link className="font-medium text-orange-700 hover:underline" to={LEGAL_ROUTES.terms}>
            Terms
          </Link>
          <Link className="font-medium text-orange-700 hover:underline" to={LEGAL_ROUTES.disclaimer}>
            Disclaimer
          </Link>
        </nav>
      </LearnerPageShell>
    </LearnerRouteReady>
  )
}
