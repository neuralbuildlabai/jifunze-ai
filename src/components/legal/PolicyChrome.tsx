import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { LEGAL_ROUTES, SUPPORT_CONTACT_EMAIL } from '../../shared/legalRoutes'
import { JifunzeBrandLogo } from '../brand/JifunzeBrandLogo'

type Props = {
  title: string
  eyebrow?: string
  children: ReactNode
  /** ISO date string for “Last updated” */
  lastUpdated?: string
}

export function PolicyChrome(props: Props) {
  const { title, eyebrow = 'Jifunze', children, lastUpdated = '2026-08-21' } = props

  return (
    <div className="jf-media min-h-screen w-full bg-[#0B0B12] px-4 py-10 text-zinc-100 antialiased">
      <div className="mx-auto w-full max-w-2xl">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
          <JifunzeBrandLogo to="/" size="sm" />
          <Link
            to="/"
            className="rounded text-xs font-medium text-[#A78BFA] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]"
          >
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
            <a className="text-[#A78BFA] hover:text-white" href={`mailto:${SUPPORT_CONTACT_EMAIL}`}>
              {SUPPORT_CONTACT_EMAIL}
            </a>
          </p>
          <nav className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
            <Link className="hover:text-zinc-300" to={LEGAL_ROUTES.terms}>
              Terms
            </Link>
            <Link className="hover:text-zinc-300" to={LEGAL_ROUTES.privacy}>
              Privacy
            </Link>
            <Link className="hover:text-zinc-300" to={LEGAL_ROUTES.aiDisclosure}>
              AI disclosure
            </Link>
            <Link className="hover:text-zinc-300" to={LEGAL_ROUTES.contact}>
              Contact
            </Link>
          </nav>
          <p className="mt-4 text-zinc-600">
            These pages describe how Jifunze operates today. They are not a substitute for
            jurisdiction-specific legal advice.
          </p>
        </footer>
      </div>
    </div>
  )
}
