import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { humanAccessTierLabel } from '../../access/appAccess'
import { useAppAccess } from '../../access/useAppAccess'
import { MODULE_LABEL, type PricingSkuKey } from '../../subscription/pricingSkuRegistry'
import { PricingSkuCards } from '../pricing/PricingSkuCards'
import { SUBSCRIPTION_PLANS } from '../../subscription/subscriptionCatalog'
import { LEGAL_ROUTES, SUPPORT_CONTACT_EMAIL, TRUST_COPY } from '../../training/trustCopy'
import { TrustBoundaryStrip } from '../TrustBoundaryStrip'
import { WorkspaceRouteReady, WorkspaceRouteShell } from './WorkspaceRouteReady'
import { isBillingCheckoutInteractive, isBillingLiveConfigured } from '../../lib/billingEnv'
import { openStripeBillingPortal, startStripeCheckout } from '../../lib/billingStripe'
import { deriveBillingEligibility } from '../../lib/billingEligibility'
import { fetchLearningAccessSummary, type LearningAccessSummary } from '../../lib/learningAccessSummary'

type EntitlementRow = Record<string, unknown> | null

export function WorkspaceSubscriptionPage() {
  const { tier, tierLoading, refreshAccessTier } = useAppAccess()
  const tierLabel = tierLoading ? 'Loading…' : humanAccessTierLabel(tier)
  const planHint =
    tier === 'workspace_admin'
      ? SUBSCRIPTION_PLANS.find((p) => p.id === 'team')
      : SUBSCRIPTION_PLANS.find((p) => p.accessTierHint === tier)

  const { supabase, user, tenantId } = useAuth()
  const location = useLocation()
  const checkoutInteractive = isBillingCheckoutInteractive()
  const liveBillingConfigured = isBillingLiveConfigured()

  const [billingFlash, setBillingFlash] = useState<string | null>(null)
  const [portalBusy, setPortalBusy] = useState(false)
  const [checkoutBusy, setCheckoutBusy] = useState<PricingSkuKey | null>(null)
  const [entitlement, setEntitlement] = useState<EntitlementRow>(null)
  const [accessSummary, setAccessSummary] = useState<LearningAccessSummary | null>(null)
  const [accessSummaryErr, setAccessSummaryErr] = useState<string | null>(null)

  const [refundReason, setRefundReason] = useState('')
  const [refundBusy, setRefundBusy] = useState(false)
  const [refundNotice, setRefundNotice] = useState<string | null>(null)

  const search = useMemo(() => new URLSearchParams(location.search), [location.search])

  const eligibility = useMemo(() => deriveBillingEligibility(user?.email), [user?.email])

  useEffect(() => {
    const checkout = search.get('checkout')
    if (checkout !== 'success') return
    void refreshAccessTier()
    const t = window.setTimeout(() => void refreshAccessTier(), 2500)
    return () => window.clearTimeout(t)
  }, [search, refreshAccessTier])

  useEffect(() => {
    let cancelled = false
    async function loadEntitlement() {
      if (!supabase || !liveBillingConfigured) {
        setEntitlement(null)
        return
      }
      const { data } = await supabase.from('stripe_subscription_entitlements').select('*').maybeSingle()
      if (!cancelled) setEntitlement((data as EntitlementRow) ?? null)
    }
    void loadEntitlement()
    return () => {
      cancelled = true
    }
  }, [supabase, liveBillingConfigured, tier])

  useEffect(() => {
    let cancelled = false
    async function loadSummary() {
      if (!supabase) return
      const { summary, error } = await fetchLearningAccessSummary(supabase, tenantId)
      if (cancelled) return
      if (error) setAccessSummaryErr(error)
      else {
        setAccessSummaryErr(null)
        setAccessSummary(summary)
      }
    }
    void loadSummary()
    return () => {
      cancelled = true
    }
  }, [supabase, tenantId, entitlement, tier])

  const checkoutBanner =
    search.get('checkout') === 'success'
      ? 'Checkout completed — syncing access from Stripe can take a few seconds. If your tier does not update, refresh this page.'
      : search.get('checkout') === 'cancel'
        ? 'Checkout canceled — no charge was completed.'
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

  async function submitRefundRequest() {
    if (!supabase) return
    const reason = refundReason.trim()
    if (reason.length < 8) {
      setRefundNotice('Please add a short description (at least 8 characters) so support can locate your account.')
      return
    }
    setRefundBusy(true)
    setRefundNotice(null)
    const authUser = (await supabase.auth.getUser()).data.user
    if (!authUser) {
      setRefundBusy(false)
      setRefundNotice('You must be signed in to request a refund.')
      return
    }
    const { error } = await supabase.from('billing_refund_requests').insert({
      user_id: authUser.id,
      reason,
      status: 'pending',
    })
    setRefundBusy(false)
    if (error) {
      setRefundNotice(error.message)
      return
    }
    setRefundNotice('Refund request recorded — support will reply using the email on your account.')
    setRefundReason('')
  }

  const freePlan = SUBSCRIPTION_PLANS.find((p) => p.id === 'free')

  return (
    <WorkspaceRouteReady>
      <WorkspaceRouteShell
        title="Plans & subscription"
        subtitle="Granular learning access—subscriptions, bundles, one-time modules, and discounts—without implying certification or guaranteed outcomes."
      >
        <TrustBoundaryStrip />

        {checkoutBanner || billingFlash ? (
          <section
            className="rounded-xl border border-violet-400/25 bg-violet-500/[0.07] p-4 text-[13px] leading-relaxed text-violet-50/95 ring-1 ring-violet-400/15"
            data-testid="billing-checkout-banner"
          >
            {billingFlash ?? checkoutBanner}
          </section>
        ) : null}

        <section className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 ring-1 ring-white/[0.04]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">Effective access today</p>
          <p className="mt-2 text-sm text-zinc-200">
            Workspace tier (UI signal): <span className="font-semibold text-white">{tierLabel}</span>
          </p>
          {planHint ? (
            <p className="mt-2 text-[12px] text-zinc-500">
              Closest legacy catalog card: <span className="text-zinc-300">{planHint.name}</span> — detailed entitlements
              follow the SKU you purchased and server access rules (not this label alone).
            </p>
          ) : null}
          <p className="mt-2 text-[11px] leading-relaxed text-zinc-600">
            Tier labels gate navigation surfaces only—they are not hiring credentials, certifications, or guarantees of skill.
          </p>
        </section>

        <section className="rounded-xl border border-white/[0.08] bg-zinc-950/40 p-4 text-[12px] text-zinc-300 ring-1 ring-white/[0.04]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">Eligibility preview (domain-based)</p>
          <p className="mt-2 leading-relaxed text-zinc-400">
            Student and team discounts use first-stage email domain checks (configure{' '}
            <span className="font-mono text-zinc-300">VITE_BILLING_STUDENT_DOMAIN_SUFFIXES</span> and{' '}
            <span className="font-mono text-zinc-300">VITE_BILLING_TEAM_ORG_DOMAIN_SUFFIXES</span>). This is not institutional
            enrollment verification—only a practical gate for pricing.
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-[12px] text-zinc-400">
            <li>
              Student path:{' '}
              <span className="text-zinc-200">{eligibility.studentDomainEligible ? 'eligible domain pattern' : 'not detected'}</span>
            </li>
            <li>
              Team/org path:{' '}
              <span className="text-zinc-200">{eligibility.teamOrgDomainEligible ? 'eligible domain pattern' : 'not detected'}</span>
            </li>
          </ul>
        </section>

        {accessSummaryErr ? (
          <p className="text-[12px] text-amber-200/90">
            Learning access summary unavailable ({accessSummaryErr}). Apply the latest database migration to enable{' '}
            <span className="font-mono">my_learning_access_summary</span>.
          </p>
        ) : accessSummary ? (
          <section className="rounded-xl border border-emerald-400/20 bg-emerald-500/[0.06] p-4 text-[12px] text-zinc-200 ring-1 ring-emerald-400/15">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">Learning access snapshot</p>
            <p className="mt-2">
              All-library premium (flagship bundle):{' '}
              <span className="font-semibold text-white">{accessSummary.allLibraryActive ? 'yes' : 'no'}</span>
            </p>
            <p className="mt-1 text-zinc-400">
              Entitled module families:{' '}
              <span className="text-zinc-200">
                {accessSummary.entitledModuleKeys.length
                  ? accessSummary.entitledModuleKeys.map((k) => MODULE_LABEL[k as keyof typeof MODULE_LABEL] ?? k).join(', ')
                  : '—'}
              </span>
            </p>
          </section>
        ) : null}

        {entitlement && liveBillingConfigured ? (
          <section className="rounded-xl border border-white/[0.08] bg-zinc-950/45 p-4 text-[12px] text-zinc-300 ring-1 ring-white/[0.04]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">Stripe subscription snapshot</p>
            <p className="mt-2">
              Status:{' '}
              <span className="font-semibold text-white">{String(entitlement.status ?? '—')}</span> · SKU:{' '}
              <span className="font-semibold text-white">{String(entitlement.sku_key ?? entitlement.plan_key ?? '—')}</span>
            </p>
            {typeof entitlement.current_period_end === 'string' && entitlement.current_period_end ? (
              <p className="mt-1 text-zinc-500">
                Current period ends: {new Date(String(entitlement.current_period_end)).toLocaleString()}
                {entitlement.cancel_at_period_end ? ' · Cancels at period end' : null}
              </p>
            ) : null}
            <button
              type="button"
              disabled={!liveBillingConfigured || portalBusy}
              onClick={() => void onPortal()}
              className="mt-3 inline-flex rounded-lg border border-violet-400/35 bg-violet-500/[0.12] px-4 py-2 text-[12px] font-semibold text-violet-50 transition hover:border-violet-300/55 hover:bg-violet-500/[0.18] disabled:cursor-not-allowed disabled:opacity-40"
              data-testid="billing-open-portal"
            >
              {portalBusy ? 'Opening portal…' : 'Manage billing in Stripe portal'}
            </button>
          </section>
        ) : null}

        <p className="text-sm leading-relaxed text-zinc-400">{TRUST_COPY.subscriptionPaidAccessBoundary}</p>
        <p className="text-[11px] leading-relaxed text-zinc-600">{TRUST_COPY.subscriptionProductBoundary}</p>

        {freePlan ? (
          <section
            className="rounded-xl border border-white/[0.08] bg-zinc-950/35 p-4 ring-1 ring-white/[0.04]"
            data-testid="plan-card-free"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">Free</p>
            <p className="mt-2 text-lg font-semibold text-white">{freePlan.name}</p>
            <p className="mt-2 text-[12px] text-zinc-500">{freePlan.summary}</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-[11px] text-zinc-400">
              {freePlan.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <p className="mt-3 text-[11px] text-zinc-600">Included by default—no checkout required.</p>
          </section>
        ) : null}

        <PricingSkuCards
          mode="workspace"
          billingEnabled={checkoutInteractive}
          eligibility={eligibility}
          onCheckoutSku={(skuKey) => void onCheckout(skuKey)}
          checkoutBusySku={checkoutBusy}
        />

        <section className="rounded-xl border border-white/[0.08] bg-black/25 p-4 ring-1 ring-white/[0.04]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">Refund request</p>
          <p className="mt-2 text-[12px] leading-relaxed text-zinc-400">
            Refunds are evaluated by product type (one-time vs recurring) — see{' '}
            <Link className="text-violet-300 hover:text-violet-200" to={LEGAL_ROUTES.refunds}>
              refunds policy
            </Link>
            . Include your SKU if known (shown on receipts once billing is live).
          </p>
          <textarea
            value={refundReason}
            onChange={(e) => setRefundReason(e.target.value)}
            rows={4}
            placeholder="What should we review (SKU, purchase date, charge description)?"
            className="mt-3 w-full resize-y rounded-xl border border-white/[0.08] bg-black/30 px-3 py-2 text-[13px] leading-relaxed text-zinc-100 placeholder:text-zinc-600 focus:border-violet-400/35 focus:outline-none focus:ring-2 focus:ring-violet-400/25"
          />
          <button
            type="button"
            disabled={refundBusy || !supabase}
            onClick={() => void submitRefundRequest()}
            className="mt-3 rounded-lg border border-amber-400/35 bg-amber-500/[0.08] px-4 py-2 text-[12px] font-semibold text-amber-50 transition hover:border-amber-300/55 hover:bg-amber-500/[0.14] disabled:opacity-40"
            data-testid="refund-request-submit"
          >
            {refundBusy ? 'Submitting…' : 'Submit refund request'}
          </button>
          {refundNotice ? <p className="mt-2 text-[12px] text-emerald-200/90">{refundNotice}</p> : null}
        </section>

        <section className="rounded-xl border border-amber-500/25 bg-amber-950/20 p-4 text-[11px] leading-relaxed text-amber-100/95 ring-1 ring-amber-500/15">
          <p className="font-semibold text-amber-50">Operational billing notes</p>
          <p className="mt-2 text-amber-100/90">
            Currency, tax/VAT, and merchant-of-record settings follow your Stripe Dashboard configuration. Questions:{' '}
            <span className="font-mono text-amber-50/95">{SUPPORT_CONTACT_EMAIL}</span>.
          </p>
        </section>

        <div className="flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-zinc-500">
          <Link className="text-violet-300 hover:text-violet-200" to={LEGAL_ROUTES.pricing}>
            Public pricing
          </Link>
          <Link className="text-violet-300 hover:text-violet-200" to={LEGAL_ROUTES.refunds}>
            Refunds &amp; billing policy
          </Link>
          <Link className="text-violet-300 hover:text-violet-200" to={LEGAL_ROUTES.privacy}>
            Privacy
          </Link>
          <Link className="text-violet-300 hover:text-violet-200" to={LEGAL_ROUTES.terms}>
            Terms of Service
          </Link>
          <Link className="text-violet-300 hover:text-violet-200" to={LEGAL_ROUTES.disclaimer}>
            Full disclaimer
          </Link>
        </div>
      </WorkspaceRouteShell>
    </WorkspaceRouteReady>
  )
}
