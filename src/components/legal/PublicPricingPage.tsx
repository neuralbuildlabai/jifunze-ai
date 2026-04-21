import { Link } from 'react-router-dom'
import { LEGAL_ROUTES, SUPPORT_CONTACT_EMAIL } from '../../training/trustCopy'
import { JifunzeBrandLogo } from '../brand/JifunzeBrandLogo'
import { PublicPricingPlansSimplified } from '../pricing/PublicPricingPlansSimplified'

/**
 * Public pricing — individual plans, team path, concise trust.
 */
export function PublicPricingPage() {
  return (
    <div className="jf-public-surface min-h-screen w-full bg-gradient-to-b from-[#1c2028] via-[#1a1e26] to-[#16191f] px-4 py-10 text-[color:var(--jf-text)] sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-6xl space-y-10">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
          <JifunzeBrandLogo to="/" size="sm" variant="compact" surface="dark" />
          <div className="flex flex-wrap items-center gap-4 text-[13px] font-medium">
            <Link className="text-[color:var(--jf-muted)] transition hover:text-[color:var(--jf-text)]" to="/generate">
              Try preview
            </Link>
            <Link className="text-[color:var(--jf-muted)] transition hover:text-[color:var(--jf-text)]" to={LEGAL_ROUTES.learn}>
              Explore courses
            </Link>
            <Link className="text-[color:var(--jf-muted)] transition hover:text-[color:var(--jf-text)]" to="/">
              Home
            </Link>
          </div>
        </header>

        <div data-testid="public-pricing-focused" className="mx-auto max-w-2xl text-center lg:mx-auto">
          <h1 className="text-3xl font-semibold tracking-tight text-[color:var(--jf-text)] sm:text-[2rem] sm:leading-tight">
            Choose your plan
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-[color:var(--jf-muted)]">
            Three straightforward options — monthly, annual, or a one-time single course.
          </p>
        </div>

        <PublicPricingPlansSimplified />

        <section
          className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 text-center sm:px-8"
          data-testid="pricing-secondary-notes"
        >
          <p className="text-[12px] leading-relaxed text-[color:var(--jf-muted)]">
            Preview lessons and limited flows from the learning hub before you upgrade.
          </p>
        </section>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-white/[0.08] pt-8 text-[12px] text-[color:var(--jf-muted)]">
          <span>
            Questions?{' '}
            <a className="font-medium text-[color:var(--jf-text)] underline-offset-2 hover:underline" href={`mailto:${SUPPORT_CONTACT_EMAIL}`}>
              {SUPPORT_CONTACT_EMAIL}
            </a>
          </span>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 pb-4 text-[12px] text-[color:var(--jf-subtle)]">
          <Link className="hover:text-[color:var(--jf-text)]" to={LEGAL_ROUTES.disclaimer}>
            Disclaimer
          </Link>
          <Link className="hover:text-[color:var(--jf-text)]" to={LEGAL_ROUTES.terms}>
            Terms
          </Link>
          <Link className="hover:text-[color:var(--jf-text)]" to={LEGAL_ROUTES.privacy}>
            Privacy
          </Link>
          <Link className="hover:text-[color:var(--jf-text)]" to={LEGAL_ROUTES.refunds}>
            Refunds
          </Link>
        </nav>
      </div>
    </div>
  )
}
