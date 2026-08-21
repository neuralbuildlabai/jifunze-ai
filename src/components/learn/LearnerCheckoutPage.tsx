import { useMemo } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { getFlagshipCourseBySlug } from '@/data/learning/flagshipCoursesCatalog'
import { PUBLIC_ANNUAL_USD, PUBLIC_MONTHLY_DISPLAY_USD, PUBLIC_SINGLE_COURSE_USD, formatUsdWhole } from '@/data/learning/publicPricingStory'
import { LEGAL_ROUTES } from '@/shared/legalRoutes'
import { LEARNER_MONETIZATION_UI_DISABLED } from '@/learner/learnerCommerceConstants'
import { useLearnerCommerce } from '@/learner/LearnerCommerceContext'
import { JifunzeBrandLogo } from '../brand/JifunzeBrandLogo'
import { isBillingLiveConfigured } from '@/lib/billingEnv'

/** Dev-only simulated prices; production copy references public pricing anchors when simulation is off. */
const MOCK_SINGLE_PRICE_USD = 149
const MOCK_ALL_ACCESS_PRICE_USD = 39

export function LearnerCheckoutPage() {
  const [params] = useSearchParams()
  const courseSlug = params.get('course')
  const planParam = params.get('plan')

  const navigate = useNavigate()
  const { grantSingleCourse, grantAllAccess, entitlement, consumeFirstCourseDiscount, discount } = useLearnerCommerce()

  const course = courseSlug ? getFlagshipCourseBySlug(courseSlug) : undefined
  const mode = planParam === 'all' ? 'all_access' : courseSlug ? 'single' : null

  const eligibleDiscount = Boolean(
    discount.eligible &&
      !discount.consumed &&
      discount.courseSlug &&
      mode === 'single' &&
      courseSlug === discount.courseSlug,
  )

  const singleTotal = useMemo(() => {
    const base = MOCK_SINGLE_PRICE_USD
    return eligibleDiscount ? Math.round(base * 0.95 * 100) / 100 : base
  }, [eligibleDiscount])

  const showSimulatedCheckout = !import.meta.env.PROD
  const liveBilling = isBillingLiveConfigured()

  if (LEARNER_MONETIZATION_UI_DISABLED) {
    return (
      <div className="jf-learn-warm min-h-screen w-full bg-[var(--jf-bg-page)] text-[color:var(--jf-text)]">
        <header className="jf-learn-nav-header sticky top-0 z-10 border-b backdrop-blur-md">
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8">
            <Link to="/learn" className="text-[12px] font-medium text-[color:var(--jf-muted)] hover:text-[color:var(--jf-text)]">
              ← Catalog
            </Link>
            <JifunzeBrandLogo to="/" size="sm" surface="light" />
          </div>
        </header>
        <main className="mx-auto max-w-lg px-5 pb-24 pt-10 sm:px-8">
          <h1 className="text-xl font-semibold tracking-tight text-[color:var(--jf-text)] sm:text-2xl">Checkout not available</h1>
          <p className="mt-4 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">
            Paid checkout is paused in this product phase. Continue from the catalog and course pages while access stays open for workspace review.
          </p>
          <Link
            to={LEGAL_ROUTES.learn}
            className="mt-6 inline-flex rounded-full bg-[var(--jf-brand)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--jf-brand-hover)]"
          >
            Back to catalog
          </Link>
        </main>
      </div>
    )
  }

  if (!mode) {
    return <Navigate to={LEGAL_ROUTES.learn} replace />
  }

  if (mode === 'single' && (!courseSlug || !course)) {
    return <Navigate to={LEGAL_ROUTES.learn} replace />
  }

  const alreadyOwnedSingle = Boolean(
    mode === 'single' &&
      courseSlug &&
      (entitlement.mode === 'all_access' || (entitlement.mode === 'single' && entitlement.courseSlug === courseSlug)),
  )

  const alreadyOwnedAllAccess = mode === 'all_access' && entitlement.mode === 'all_access'

  function completePurchase() {
    if (!showSimulatedCheckout) return
    if (mode === 'single' && courseSlug) {
      if (eligibleDiscount) consumeFirstCourseDiscount()
      grantSingleCourse(courseSlug)
      navigate(`/learn/courses/${courseSlug}`, { replace: true })
      return
    }
    if (mode === 'all_access') {
      grantAllAccess()
      navigate('/learn', { replace: true })
    }
  }

  return (
    <div className="jf-learn-warm min-h-screen w-full bg-[var(--jf-bg-page)] text-[color:var(--jf-text)]">
      <header className="jf-learn-nav-header sticky top-0 z-10 border-b backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <Link to="/learn" className="text-[12px] font-medium text-[color:var(--jf-muted)] hover:text-[color:var(--jf-text)]">
            ← Catalog
          </Link>
          <JifunzeBrandLogo to="/" size="sm" surface="light" />
        </div>
      </header>

      <main className="mx-auto max-w-lg px-5 pb-24 pt-10 sm:px-8">
        <h1 className="text-xl font-semibold tracking-tight text-[color:var(--jf-text)] sm:text-2xl">Checkout</h1>

        {!showSimulatedCheckout ? (
          <div className="mt-6 space-y-4 rounded-2xl border border-amber-200/70 bg-amber-50/90 p-5 text-[14px] leading-relaxed text-amber-950/95">
            <p>
              Simulated flagship checkout is <strong className="font-semibold">disabled in production</strong>. Paid access is handled through{' '}
              <strong className="font-semibold">Plans & billing</strong> in your account when Stripe checkout is enabled for your deployment.
            </p>
            <p className="text-[13px] text-amber-900/85">
              Public reference prices: single course from {formatUsdWhole(PUBLIC_SINGLE_COURSE_USD)}, monthly from {formatUsdWhole(PUBLIC_MONTHLY_DISPLAY_USD)}/mo,
              annual from {formatUsdWhole(PUBLIC_ANNUAL_USD)}/yr — see{' '}
              <Link className="font-semibold underline-offset-2 hover:underline" to={LEGAL_ROUTES.pricing}>
                pricing
              </Link>
              .
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Link
                className="inline-flex rounded-full border border-[color:var(--jf-border)] px-4 py-2 text-xs font-semibold text-[color:var(--jf-text)] hover:bg-stone-50"
                to={LEGAL_ROUTES.pricing}
              >
                View pricing
              </Link>
              <Link
                className="inline-flex rounded-full bg-[var(--jf-brand)] px-4 py-2 text-xs font-semibold text-white hover:bg-[var(--jf-brand-hover)]"
                to={LEGAL_ROUTES.workspaceSubscription}
              >
                Plans & billing
              </Link>
            </div>
          </div>
        ) : (
          <>
            <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">
              {liveBilling
                ? 'Live billing is configured for subscriptions. Use Plans & billing for real checkout — the form below is a preview.'
                : 'Preview mode: access below is saved to this browser only.'}
            </p>

            {mode === 'single' && course ? (
              <section className="mt-10 rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] p-6 shadow-[var(--jf-shadow-soft)]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--jf-muted)]">Single course</p>
                <p className="mt-2 text-lg font-semibold text-[color:var(--jf-text)]">{course.title}</p>
                <p className="mt-4 font-mono text-2xl tabular-nums text-[color:var(--jf-text)]">
                  ${singleTotal.toFixed(2)}{' '}
                  <span className="text-[13px] font-sans font-normal text-[color:var(--jf-muted)]">USD (preview)</span>
                </p>
                {eligibleDiscount ? (
                  <p className="mt-2 text-[13px] text-emerald-800/90">Readiness Challenge discount applied (5% on this course).</p>
                ) : null}
                <ul className="mt-6 space-y-2 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
                  <li>· Opens this flagship course for structured learning on this device.</li>
                  <li>· Modules still unlock progressively inside the course.</li>
                  <li>· PDF support materials unlock as you progress.</li>
                </ul>
                <button
                  type="button"
                  disabled={alreadyOwnedSingle}
                  className="mt-8 inline-flex min-h-[2.75rem] w-full items-center justify-center rounded-full bg-[var(--jf-brand)] px-6 py-3 text-sm font-semibold text-white shadow-[var(--jf-shadow-soft)] hover:bg-[var(--jf-brand-hover)] enabled:cursor-pointer disabled:cursor-not-allowed disabled:opacity-45 sm:w-auto"
                  onClick={completePurchase}
                  data-testid="checkout-complete-single"
                >
                  Confirm access — ${singleTotal.toFixed(2)}
                </button>
                <p className="mt-4 text-center text-[12px] text-[color:var(--jf-subtle)]">After confirming, you&apos;ll go straight into the course.</p>
              </section>
            ) : null}

            {mode === 'all_access' ? (
              <section className="mt-10 rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] p-6 shadow-[var(--jf-shadow-soft)]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--jf-muted)]">All-access subscription</p>
                <p className="mt-2 text-lg font-semibold text-[color:var(--jf-text)]">All flagship courses</p>
                <p className="mt-4 font-mono text-2xl tabular-nums text-[color:var(--jf-text)]">
                  ${MOCK_ALL_ACCESS_PRICE_USD}{' '}
                  <span className="text-[13px] font-sans font-normal text-[color:var(--jf-muted)]">/ month (preview)</span>
                </p>
                <ul className="mt-6 space-y-2 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
                  <li>· Enroll and enter every flagship course.</li>
                  <li>· Each course still progresses session by session — not an instant unlock of every module.</li>
                  <li>· Challenge discount applies to first single-course purchase only, not this tier.</li>
                </ul>
                <button
                  type="button"
                  disabled={alreadyOwnedAllAccess}
                  className="mt-8 inline-flex min-h-[2.75rem] w-full items-center justify-center rounded-full bg-[var(--jf-brand)] px-6 py-3 text-sm font-semibold text-white shadow-[var(--jf-shadow-soft)] hover:bg-[var(--jf-brand-hover)] enabled:cursor-pointer disabled:cursor-not-allowed disabled:opacity-45 sm:w-auto"
                  onClick={completePurchase}
                  data-testid="checkout-complete-all-access"
                >
                  Confirm subscription — ${MOCK_ALL_ACCESS_PRICE_USD}/mo
                </button>
                <p className="mt-4 text-center text-[12px] text-[color:var(--jf-subtle)]">
                  After confirming, you&apos;ll return to the catalog with every course available to open.
                </p>
              </section>
            ) : null}

            {alreadyOwnedSingle || alreadyOwnedAllAccess ? (
              <p className="mt-6 text-[13px] text-amber-900/90">
                You already have this access —{' '}
                <Link className="font-medium underline-offset-2 hover:underline" to="/learn">
                  open the catalog
                </Link>
                .
              </p>
            ) : null}
          </>
        )}

        <p className="mt-10 text-[12px] leading-relaxed text-[color:var(--jf-subtle)]">
          Account security: learners may use up to two active browsers/devices at once; you&apos;ll see a calm prompt if that limit is reached.
        </p>
      </main>
    </div>
  )
}
