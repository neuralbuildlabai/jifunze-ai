import { useState } from 'react'
import { Link } from 'react-router-dom'
import { isBillingCheckoutEnabled } from '../../lib/billingEnv'
import {
  PUBLIC_ANNUAL_USD,
  PUBLIC_MONTHLY_DISPLAY_USD,
  PUBLIC_SINGLE_COURSE_USD,
  annualEffectiveMonthlyUsd,
  formatUsdWhole,
} from '../../data/learning/publicPricingStory'
import { LEGAL_ROUTES, SUPPORT_CONTACT_EMAIL } from '../../training/trustCopy'

function billingHref(billingEnabled: boolean): string {
  return billingEnabled ? LEGAL_ROUTES.workspaceSubscription : '/?auth=signup#auth'
}

function monthlyCtaLabel(billingEnabled: boolean): string {
  return billingEnabled ? 'Choose monthly' : 'Get started'
}

function annualCtaLabel(billingEnabled: boolean): string {
  return billingEnabled ? 'Choose annual' : 'Get started'
}

function singleCtaLabel(billingEnabled: boolean): string {
  return billingEnabled ? 'Buy course' : 'Get started'
}

const CARD_SHELL =
  'relative flex flex-col rounded-3xl border border-white/[0.1] bg-gradient-to-b from-white/[0.07] to-[color:var(--jf-surface)] p-8 pb-7 shadow-[0_20px_48px_-18px_rgba(12,14,18,0.55)] ring-1 ring-white/[0.06]'

const PLAN_BULLETS = {
  monthly: [
    'Full library access for flexible ongoing learning',
    'Billed monthly—manage or cancel from your account',
    'Best when you want maximum flexibility',
  ],
  annual: [
    'Same full library as monthly at the best yearly value',
    'Single annual payment',
    'Ideal when you plan to learn over the year',
  ],
  single: [
    'One-time purchase for one standalone course',
    'Know what you need—buy without a subscription',
    'Course selection from the catalog at checkout',
  ],
} as const

/**
 * Public pricing: individuals (monthly · annual · single) + optional teams path.
 */
export function PublicPricingPlansSimplified() {
  const billingEnabled = isBillingCheckoutEnabled()
  const checkoutHref = billingHref(billingEnabled)
  const effectiveMo = annualEffectiveMonthlyUsd(PUBLIC_ANNUAL_USD)
  const [audience, setAudience] = useState<'individual' | 'team'>('individual')

  return (
    <section className="space-y-8" data-testid="public-pricing-plans-grid">
      {/* Individual vs team — commercial clarity without clutter */}
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--jf-muted)]">How are you buying?</p>
        <div
          className="inline-flex rounded-full border border-white/[0.12] bg-[color:var(--jf-surface)] p-1 ring-1 ring-white/[0.04]"
          role="tablist"
          aria-label="Buyer type"
        >
          <button
            type="button"
            role="tab"
            aria-selected={audience === 'individual'}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              audience === 'individual'
                ? 'bg-white/[0.12] text-[color:var(--jf-text)] shadow-sm'
                : 'text-[color:var(--jf-muted)] hover:text-[color:var(--jf-text)]'
            }`}
            onClick={() => setAudience('individual')}
          >
            Individual
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={audience === 'team'}
            data-testid="pricing-audience-team"
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              audience === 'team'
                ? 'bg-white/[0.12] text-[color:var(--jf-text)] shadow-sm'
                : 'text-[color:var(--jf-muted)] hover:text-[color:var(--jf-text)]'
            }`}
            onClick={() => setAudience('team')}
          >
            Team
          </button>
        </div>
      </div>

      {audience === 'individual' ? (
        <>
          <div className="grid gap-6 lg:grid-cols-3 lg:items-stretch">
            {/* Monthly */}
            <section className={CARD_SHELL} data-testid="pricing-plan-monthly">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--jf-muted)]">Monthly access</p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight text-[color:var(--jf-text)]">Flexible ongoing learning</h3>
              <p className="mt-2 text-[14px] leading-snug text-[color:var(--jf-muted)]">Monthly access for flexible ongoing learning.</p>
              <div className="mt-8 border-t border-white/[0.08] pt-6" data-testid="pricing-monthly-price">
                <p className="text-4xl font-semibold tracking-tight text-[color:var(--jf-text)] tabular-nums">
                  {formatUsdWhole(PUBLIC_MONTHLY_DISPLAY_USD)}
                  <span className="text-xl font-semibold text-[color:var(--jf-muted)]">/mo</span>
                </p>
                <p className="mt-3 text-[14px] font-semibold text-[color:var(--jf-text)]">Cancel anytime.</p>
              </div>
              <ul className="mt-5 flex-1 space-y-3 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
                {PLAN_BULLETS.monthly.map((line) => (
                  <li key={line} className="flex gap-2.5">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[color:var(--jf-muted)]" aria-hidden />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <Link
                data-testid="public-pricing-cta-monthly"
                className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-[var(--jf-brand)] px-4 py-3.5 text-sm font-semibold text-zinc-950 shadow-[var(--jf-shadow-soft)] transition hover:bg-[var(--jf-brand-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
                to={checkoutHref}
              >
                {monthlyCtaLabel(billingEnabled)}
              </Link>
            </section>

            {/* Annual — featured */}
            <section
              className={`${CARD_SHELL} lg:-mt-1 lg:border-[color:var(--jf-brand)]/25 lg:shadow-[0_28px_64px_-20px_rgba(12,14,18,0.6)]`}
              data-testid="pricing-plan-annual"
            >
              <span className="absolute right-6 top-6 rounded-full bg-white/[0.12] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[color:var(--jf-text)]">
                Best value
              </span>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--jf-muted)]">Annual access</p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight text-[color:var(--jf-text)]">Best yearly rate</h3>
              <p className="mt-2 text-[14px] leading-snug text-[color:var(--jf-muted)]">Annual access at the best yearly value.</p>
              <div className="mt-8 border-t border-white/[0.08] pt-6" data-testid="pricing-annual-summary">
                <p className="text-4xl font-semibold tracking-tight text-[color:var(--jf-text)] tabular-nums">
                  {formatUsdWhole(PUBLIC_ANNUAL_USD)}
                  <span className="text-xl font-semibold text-[color:var(--jf-muted)]">/year</span>
                </p>
                <p className="mt-2 text-[13px] text-[color:var(--jf-muted)]">
                  About <span className="font-medium text-[color:var(--jf-text)]">{formatUsdWhole(effectiveMo)}</span>/mo averaged over 12 months.
                </p>
              </div>
              <ul className="mt-6 flex-1 space-y-3 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
                {PLAN_BULLETS.annual.map((line) => (
                  <li key={line} className="flex gap-2.5">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[color:var(--jf-muted)]" aria-hidden />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <Link
                data-testid="public-pricing-cta-annual"
                className="mt-8 inline-flex w-full items-center justify-center rounded-xl border border-white/[0.18] bg-white/[0.1] px-4 py-3.5 text-sm font-semibold text-[color:var(--jf-text)] transition hover:bg-white/[0.14] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
                to={checkoutHref}
              >
                {annualCtaLabel(billingEnabled)}
              </Link>
            </section>

            {/* Single course */}
            <section className={CARD_SHELL} data-testid="pricing-plan-single-course">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--jf-muted)]">Single course</p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight text-[color:var(--jf-text)]">One course, one payment</h3>
              <p className="mt-2 text-[14px] leading-snug text-[color:var(--jf-muted)]">Buy a single course for one-time access when you know what you need.</p>
              <div className="mt-8 border-t border-white/[0.08] pt-6">
                <p className="text-4xl font-semibold tracking-tight text-[color:var(--jf-text)] tabular-nums">
                  {formatUsdWhole(PUBLIC_SINGLE_COURSE_USD)}
                  <span className="text-lg font-semibold text-[color:var(--jf-muted)]"> one-time</span>
                </p>
              </div>
              <ul className="mt-6 flex-1 space-y-3 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
                {PLAN_BULLETS.single.map((line) => (
                  <li key={line} className="flex gap-2.5">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[color:var(--jf-muted)]" aria-hidden />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:gap-3">
                <Link
                  className="inline-flex flex-1 items-center justify-center rounded-xl border border-white/[0.14] bg-white/[0.06] px-4 py-3 text-sm font-semibold text-[color:var(--jf-text)] transition hover:bg-white/[0.1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
                  to={LEGAL_ROUTES.learn}
                  data-testid="pricing-buy-one-course-browse"
                >
                  Browse catalog
                </Link>
                <Link
                  className="inline-flex flex-1 items-center justify-center rounded-xl bg-[var(--jf-brand)] px-4 py-3 text-sm font-semibold text-zinc-950 shadow-[var(--jf-shadow-soft)] transition hover:bg-[var(--jf-brand-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
                  to={checkoutHref}
                  data-testid="pricing-buy-one-course-billing"
                >
                  {singleCtaLabel(billingEnabled)}
                </Link>
              </div>
            </section>
          </div>

          <p className="text-center text-[12px] leading-relaxed text-[color:var(--jf-subtle)]">
            Totals and renewal dates are confirmed at checkout. Manage billing anytime in{' '}
            <Link className="font-medium text-[color:var(--jf-muted)] underline-offset-2 hover:underline" to={LEGAL_ROUTES.workspaceSubscription}>
              subscription settings
            </Link>
            .
          </p>
        </>
      ) : (
        <section
          className="rounded-3xl border border-white/[0.12] bg-gradient-to-br from-[color:var(--jf-surface-elevated)] to-[color:var(--jf-surface)] px-8 py-10 shadow-[0_24px_56px_-22px_rgba(12,14,18,0.55)] ring-1 ring-white/[0.08] sm:px-12 sm:py-12"
          data-testid="pricing-team-path"
        >
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--jf-muted)]">Team access</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[color:var(--jf-text)] sm:text-[1.65rem]">
              Shared learning across your organization
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[color:var(--jf-muted)]">
              Team pricing and access are set up with you—we’ll align seats, billing, and rollout to how you work. No self-serve team checkout yet; we’ll respond
              quickly by email.
            </p>
            <a
              className="mt-8 inline-flex w-full max-w-sm items-center justify-center rounded-xl bg-[var(--jf-brand)] px-6 py-3.5 text-sm font-semibold text-zinc-950 shadow-[var(--jf-shadow-soft)] transition hover:bg-[var(--jf-brand-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)] sm:w-auto"
              href={`mailto:${SUPPORT_CONTACT_EMAIL}?subject=Team%20access%20inquiry`}
            >
              Contact sales
            </a>
            <p className="mt-4 text-[12px] text-[color:var(--jf-subtle)]">
              Include team size and what you&apos;re trying to accomplish—we&apos;ll follow up with next steps.
            </p>
          </div>
        </section>
      )}
    </section>
  )
}
