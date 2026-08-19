import { Link } from 'react-router-dom'
import { LEGAL_ROUTES, SUPPORT_CONTACT_EMAIL, TRUST_COPY } from '../training/trustCopy'
import { JifunzeBrandLogo } from './brand/JifunzeBrandLogo'

/**
 * Canonical product-boundary disclaimer (full paragraph). Not a substitute for Terms / Privacy.
 */
export function FullDisclaimerPage() {
  return (
    <div className="min-h-screen w-full bg-zinc-950 px-4 py-10 text-zinc-100">
      <div className="mx-auto w-full max-w-2xl">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
          <JifunzeBrandLogo to="/" size="sm" />
          <Link to="/" className="text-xs font-medium text-violet-300/90 hover:text-violet-200">
            Home
          </Link>
        </header>

        <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Product disclaimer</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white">How to understand Jifunze</h1>
        <p className="mt-3 text-sm text-zinc-500">
          This page summarizes core product boundaries. It does not replace counsel-reviewed Terms, Privacy, or refund
          policies—those documents govern contractual and regulatory topics.
        </p>

        <div className="mt-8 rounded-2xl border border-amber-500/20 bg-amber-950/15 p-5 ring-1 ring-amber-500/10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-200/95">
            Independent learning &amp; content support · assistive tools only
          </p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-200/95">{TRUST_COPY.affiliationNoGuaranteeFinePrint}</p>
        </div>

        <section className="mt-10 space-y-3 text-sm text-zinc-400">
          <h2 className="text-base font-semibold text-white">Questions or clarifications</h2>
          <p>
            Email{' '}
            <a className="font-medium text-violet-300/90 hover:text-violet-200" href={`mailto:${SUPPORT_CONTACT_EMAIL}`}>
              {SUPPORT_CONTACT_EMAIL}
            </a>
            .
          </p>
        </section>

        <nav className="mt-10 flex flex-wrap gap-x-4 gap-y-2 border-t border-white/[0.06] pt-8 text-xs text-zinc-500">
          <Link className="hover:text-zinc-300" to={LEGAL_ROUTES.terms}>
            Terms of Service
          </Link>
          <Link className="hover:text-zinc-300" to={LEGAL_ROUTES.privacy}>
            Privacy Policy
          </Link>
          <Link className="hover:text-zinc-300" to={LEGAL_ROUTES.refunds}>
            Refunds &amp; billing
          </Link>
          <Link className="hover:text-zinc-300" to={LEGAL_ROUTES.pricing}>
            Plans &amp; pricing
          </Link>
        </nav>
      </div>
    </div>
  )
}
