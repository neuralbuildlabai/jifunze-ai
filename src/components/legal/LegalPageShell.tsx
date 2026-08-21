import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { JifunzeBrandLogo } from '../brand/JifunzeBrandLogo'
import { LEGAL_ROUTES, SUPPORT_CONTACT_EMAIL } from '../../shared/legalRoutes'

/**
 * Inlined from the removed learner commerce layer (trap #2, docs/freeze/WIP_RECONCILIATION.md):
 * true (default) hides monetization UI. Behaviour unchanged.
 */
const LEARNER_MONETIZATION_UI_DISABLED = import.meta.env.VITE_LEARNER_MONETIZATION_UI_DISABLED !== 'false'

type Props = {
  title: string
  effectiveLabel: string
  children: ReactNode
}

/**
 * Shared chrome for Terms / Privacy / Refunds / Disclaimer pages (public routes).
 */
export function LegalPageShell(props: Props) {
  const { title, effectiveLabel, children } = props

  return (
    <div className="min-h-screen w-full bg-zinc-950 px-4 py-10 text-zinc-100">
      <div className="mx-auto w-full max-w-3xl space-y-8">
        <header className="flex flex-wrap items-start justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div className="flex min-w-0 items-center gap-3">
            <JifunzeBrandLogo to="/" size="sm" variant="compact" />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Legal</p>
              <h1 className="text-xl font-semibold text-white">{title}</h1>
              <p className="mt-1 text-[11px] text-zinc-500">{effectiveLabel}</p>
            </div>
          </div>
          <Link
            to="/"
            className="text-xs font-medium text-violet-300/90 hover:text-violet-200"
          >
            Back to home
          </Link>
        </header>

        <article className="prose prose-invert prose-sm max-w-none prose-p:text-zinc-400 prose-headings:text-zinc-100 prose-strong:text-zinc-200 prose-li:text-zinc-400">
          {children}
        </article>

        <footer className="border-t border-white/[0.06] pt-6 text-[11px] leading-relaxed text-zinc-500">
          <p>
            Questions:{' '}
            <a
              href={`mailto:${SUPPORT_CONTACT_EMAIL}`}
              className="font-medium text-violet-300/90 underline-offset-2 hover:underline"
            >
              {SUPPORT_CONTACT_EMAIL}
            </a>
          </p>
          <nav className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-zinc-600">
            <Link className="hover:text-zinc-300" to={LEGAL_ROUTES.disclaimer}>
              Disclaimer
            </Link>
            <Link className="hover:text-zinc-300" to={LEGAL_ROUTES.terms}>
              Terms
            </Link>
            <Link className="hover:text-zinc-300" to={LEGAL_ROUTES.privacy}>
              Privacy
            </Link>
            <Link className="hover:text-zinc-300" to={LEGAL_ROUTES.refunds}>
              Refunds
            </Link>
            {LEARNER_MONETIZATION_UI_DISABLED ? null : (
              <Link className="hover:text-zinc-300" to={LEGAL_ROUTES.pricing}>
                Pricing
              </Link>
            )}
          </nav>
          <p className="mt-4 text-[10px] text-zinc-600">
            These documents describe how Jifunze intends to operate the product today. They are not a substitute for
            jurisdiction-specific legal advice; counsel review may refine wording before high-scale paid traffic.
          </p>
        </footer>
      </div>
    </div>
  )
}
