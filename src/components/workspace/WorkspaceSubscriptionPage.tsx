import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { humanAccessTierLabel } from '../../access/appAccess'
import { useAppAccess } from '../../access/useAppAccess'
import { PricingSkuCards } from '../pricing/PricingSkuCards'
import { SUBSCRIPTION_PLANS } from '../../subscription/subscriptionCatalog'
import { LEGAL_ROUTES, SUPPORT_CONTACT_EMAIL, TRUST_COPY } from '../../training/trustCopy'
import { WorkspaceRouteReady, WorkspaceRouteShell } from './WorkspaceRouteReady'
import { LearnerRouteReady } from '../learner-shell/LearnerRouteReady'
import { LearnerPageShell } from '../learner-shell/LearnerPageShell'
import { isBillingCheckoutInteractive, isBillingLiveConfigured } from '../../lib/billingEnv'
import { openStripeBillingPortal, startStripeCheckout } from '../../lib/billingStripe'
import type { PricingSkuKey } from '../../subscription/pricingSkuRegistry'

export function WorkspaceSubscriptionPage() {
  const { tier, tierLoading, refreshAccessTier, navVariant } = useAppAccess()
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

  const warm = navVariant === 'learner'

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

  const content = (
    <>
      {checkoutBanner || billingFlash ? (
        <section
          className={
            warm
              ? 'rounded-xl border border-orange-200/80 bg-orange-50/90 p-4 text-[13px] leading-relaxed text-orange-950 shadow-sm'
              : 'rounded-xl border border-violet-400/25 bg-violet-500/[0.07] p-4 text-[13px] leading-relaxed text-violet-50/95 ring-1 ring-violet-400/15'
          }
          data-testid="billing-checkout-banner"
        >
          {billingFlash ?? checkoutBanner}
        </section>
      ) : null}

      <section
        className={
          warm
            ? 'rounded-xl border border-stone-200/90 bg-white p-4 text-stone-800 shadow-sm'
            : 'rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 ring-1 ring-white/[0.04]'
        }
      >
        <p className={`text-[11px] font-semibold uppercase tracking-[0.12em] ${warm ? 'text-stone-500' : 'text-zinc-500'}`}>
          Your account
        </p>
        <p className={`mt-2 text-sm ${warm ? 'text-stone-700' : 'text-zinc-200'}`}>
          Signed in as <span className={`font-medium ${warm ? 'text-zinc-900' : 'text-white'}`}>{user?.email ?? '—'}</span>
        </p>
        <p className={`mt-2 text-sm ${warm ? 'text-stone-600' : 'text-zinc-400'}`}>
          Plan label:{' '}
          <span className={`font-semibold ${warm ? 'text-zinc-900' : 'text-zinc-100'}`}>{tierLabel}</span>
        </p>
        {planHint ? (
          <p className={`mt-2 text-[12px] ${warm ? 'text-stone-600' : 'text-zinc-500'}`}>
            Typical paid entry: <span className={warm ? 'text-zinc-900' : 'text-zinc-300'}>{planHint.name}</span> — actual access
            follows what you purchase at checkout.
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
        <section
          className={
            warm
              ? 'rounded-xl border border-stone-200/90 bg-stone-50/80 p-4 text-[12px] text-stone-700 shadow-sm'
              : 'rounded-xl border border-white/[0.08] bg-zinc-950/45 p-4 text-[12px] text-zinc-300 ring-1 ring-white/[0.04]'
          }
        >
          <p className={`text-[11px] font-semibold uppercase tracking-[0.12em] ${warm ? 'text-stone-500' : 'text-zinc-500'}`}>
            Manage payment method
          </p>
          <p className={`mt-2 ${warm ? 'text-stone-600' : 'text-zinc-400'}`}>
            Update cards, invoices, and cancellation through our secure billing portal.
          </p>
          <button
            type="button"
            disabled={!liveBillingConfigured || portalBusy}
            onClick={() => void onPortal()}
            className={
              warm
                ? 'mt-3 inline-flex rounded-lg border border-orange-600/30 bg-orange-600/10 px-4 py-2 text-[12px] font-semibold text-orange-900 transition hover:bg-orange-600/15 disabled:cursor-not-allowed disabled:opacity-40'
                : 'mt-3 inline-flex rounded-lg border border-violet-400/35 bg-violet-500/[0.12] px-4 py-2 text-[12px] font-semibold text-violet-50 transition hover:border-violet-300/55 hover:bg-violet-500/[0.18] disabled:cursor-not-allowed disabled:opacity-40'
            }
            data-testid="billing-open-portal"
          >
            {portalBusy ? 'Opening…' : 'Open billing portal'}
          </button>
        </section>
      ) : null}

      <p className={`text-sm leading-relaxed ${warm ? 'text-stone-600' : 'text-zinc-400'}`}>
        {TRUST_COPY.subscriptionPaidAccessBoundary}
      </p>

      <section
        className={
          warm
            ? 'rounded-xl border border-stone-200/90 bg-white p-4 text-[12px] text-stone-700 shadow-sm'
            : 'rounded-xl border border-white/[0.08] bg-black/25 p-4 ring-1 ring-white/[0.04]'
        }
      >
        <p className={`text-[11px] font-semibold uppercase tracking-[0.12em] ${warm ? 'text-stone-500' : 'text-zinc-500'}`}>
          Refund help
        </p>
        <p className={`mt-2 text-[12px] leading-relaxed ${warm ? 'text-stone-600' : 'text-zinc-400'}`}>
          Questions about refunds follow our{' '}
          <Link className={warm ? 'font-medium text-orange-700 hover:underline' : 'text-violet-300 hover:text-violet-200'} to={LEGAL_ROUTES.refunds}>
            refunds policy
          </Link>
          . Contact{' '}
          <a className={warm ? 'font-medium text-orange-700 hover:underline' : 'text-violet-300 hover:text-violet-200'} href={`mailto:${SUPPORT_CONTACT_EMAIL}`}>
            {SUPPORT_CONTACT_EMAIL}
          </a>{' '}
          with the email on your account.
        </p>
      </section>

      <section className="rounded-xl border border-amber-500/25 bg-amber-950/20 p-4 text-[11px] leading-relaxed text-amber-100/95 ring-1 ring-amber-500/15">
        <p className="font-semibold text-amber-50">Billing support</p>
        <p className="mt-2 text-amber-100/90">
          For invoices, taxes, or payment issues, email <span className="font-medium text-amber-50">{SUPPORT_CONTACT_EMAIL}</span>.
        </p>
      </section>

      <nav
        className={`flex flex-wrap gap-x-4 gap-y-2 border-t pt-6 text-[12px] ${warm ? 'border-stone-200/90 text-stone-600' : 'border-white/[0.06] text-zinc-500'}`}
      >
        <Link className={warm ? 'font-medium text-orange-700 hover:underline' : 'text-violet-300 hover:text-violet-200'} to={LEGAL_ROUTES.pricing}>
          Public pricing
        </Link>
        <Link className={warm ? 'font-medium text-orange-700 hover:underline' : 'text-violet-300 hover:text-violet-200'} to={LEGAL_ROUTES.refunds}>
          Refunds
        </Link>
        <Link className={warm ? 'font-medium text-orange-700 hover:underline' : 'text-violet-300 hover:text-violet-200'} to={LEGAL_ROUTES.privacy}>
          Privacy
        </Link>
        <Link className={warm ? 'font-medium text-orange-700 hover:underline' : 'text-violet-300 hover:text-violet-200'} to={LEGAL_ROUTES.terms}>
          Terms
        </Link>
        <Link className={warm ? 'font-medium text-orange-700 hover:underline' : 'text-violet-300 hover:text-violet-200'} to={LEGAL_ROUTES.disclaimer}>
          Disclaimer
        </Link>
      </nav>
    </>
  )

  if (warm) {
    return (
      <LearnerRouteReady>
        <LearnerPageShell
          title="Plans & billing"
          purpose="Choose monthly access, annual savings, or a one-time single-course purchase."
        >
          {content}
        </LearnerPageShell>
      </LearnerRouteReady>
    )
  }

  return (
    <WorkspaceRouteReady>
      <WorkspaceRouteShell
        title="Plans & billing"
        subtitle="Choose monthly access, annual savings, or a one-time single-course purchase."
      >
        {content}
      </WorkspaceRouteShell>
    </WorkspaceRouteReady>
  )
}
