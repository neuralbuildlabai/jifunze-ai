import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { PUBLIC_AI_FOUNDATIONS_BASE_PATH } from '../../data/publicStarterLibraries/aiFoundations'
import { JifunzeBrandLogo } from '../brand/JifunzeBrandLogo'

type Props = {
  title: string
  eyebrow?: string
  description?: string
  /** Defaults to AI Foundations public index—override for other library families (e.g. chatbots). */
  browseHref?: string
  browseLabel?: string
  /** Optional second header link (e.g. back to /learn catalog). */
  secondaryNav?: { href: string; label: string }
  /** Optional outer visual shell for course-specific palettes (standalone landings). */
  shellClassName?: string
  children: ReactNode
}

export function PublicStarterLibraryChrome({
  title,
  eyebrow,
  description,
  browseHref = PUBLIC_AI_FOUNDATIONS_BASE_PATH,
  browseLabel = 'AI Foundations · Browse',
  secondaryNav,
  shellClassName,
  children,
}: Props) {
  const shell =
    shellClassName?.trim() ||
    'bg-[radial-gradient(ellipse_120%_55%_at_50%_-8%,rgba(255,255,255,0.05),transparent_52%),linear-gradient(180deg,_rgb(14,14,18)_0%,_rgb(12,12,16)_46%,_rgb(9,9,12)_100%)]'

  return (
    <div className={`relative min-h-screen w-full ${shell} text-zinc-100`}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-white/[0.035] to-transparent" aria-hidden />
      <header className="relative border-b border-white/[0.06] bg-black/10 backdrop-blur-[2px]">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8 lg:px-10">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-[11px] font-medium text-zinc-500 transition-colors hover:text-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/55"
            >
              ← Home
            </Link>
            <div className="h-8 w-px bg-gradient-to-b from-transparent via-white/[0.14] to-transparent" aria-hidden />
            <JifunzeBrandLogo to="/" size="lg" />
          </div>
          <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-4">
            {secondaryNav ? (
              <Link
                to={secondaryNav.href}
                className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500 transition-colors hover:text-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/55"
              >
                {secondaryNav.label}
              </Link>
            ) : null}
            <Link
              to={browseHref}
              className="max-w-[14rem] text-right text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 transition-colors hover:text-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/55 sm:max-w-none"
            >
              {browseLabel}
            </Link>
          </div>
        </div>
      </header>
      <main className="relative mx-auto max-w-3xl px-5 pb-20 pt-10 sm:px-8 sm:pt-12 lg:px-10">
        {eyebrow ? (
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">{eyebrow}</p>
        ) : null}
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-[2rem] sm:leading-tight">{title}</h1>
        {description ? <p className="mt-4 text-[15px] leading-relaxed text-zinc-400">{description}</p> : null}
        <div className="mt-10">{children}</div>
      </main>
    </div>
  )
}
