import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { LEARNER_MONETIZATION_UI_DISABLED } from '../../learner/learnerCommerceConstants'
import { LEGAL_ROUTES, SUPPORT_CONTACT_EMAIL } from '../../training/trustCopy'
import { JifunzeBrandLogo } from '../brand/JifunzeBrandLogo'

type Props = {
  title: string
  eyebrow?: string
  children: ReactNode
  /** ISO date string for “Last updated” */
  lastUpdated?: string
}

export function PolicyChrome(props: Props) {
  const { title, eyebrow = 'Jifunze', children, lastUpdated = '2026-04-16' } = props

  return (
    <div className="min-h-screen w-full bg-zinc-950 px-4 py-10 text-zinc-100">
      <div className="mx-auto w-full max-w-2xl">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
          <JifunzeBrandLogo to="/" size="sm" variant="compact" />
          <Link to="/" className="text-xs font-medium text-violet-300/90 hover:text-violet-200">
            Home
          </Link>
        </header>
        <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">{eyebrow}</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white">{title}</h1>
        <p className="mt-2 text-[11px] text-zinc-500">Last updated: {lastUpdated}</p>

        <article className="mt-8 space-y-4 text-sm leading-relaxed text-zinc-300">{children}</article>

        <footer className="mt-10 border-t border-white/[0.06] pt-8 text-[11px] text-zinc-500">
          <p>
            Questions:{' '}
            <a className="text-violet-300/90 hover:text-violet-200" href={`mailto:${SUPPORT_CONTACT_EMAIL}`}>
              {SUPPORT_CONTACT_EMAIL}
            </a>
          </p>
          <nav className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
            <Link className="hover:text-zinc-300" to={LEGAL_ROUTES.disclaimer}>
              Product disclaimer
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
                Plans &amp; pricing
              </Link>
            )}
          </nav>
          <p className="mt-4 text-zinc-600">
            Jurisdiction-specific legal requirements may apply. These pages are intended to be accurate for the product as
            shipped; counsel review is recommended before high-stakes or regulated contexts.
          </p>
        </footer>
      </div>
    </div>
  )
}
