import { Link, NavLink, Outlet } from 'react-router-dom'
import { PublicSocialLinks } from '../PublicSocialLinks'
import { BRAND_SITE_NAME, BRAND_TAGLINE, BRAND_WORDMARK, PUBLIC_CONTACT_EMAIL } from '../../social/brand'
import { PILLARS } from '../../social/pillars'

/**
 * The public career-skills site shell.
 *
 * Deliberately separate from the learning platform's shells. `/learn`, `/admin`, billing and
 * training are frozen at `learning-platform-frozen-2026-08-18` and are not reachable from this
 * chrome; nothing in this tree imports from them.
 */

const NAV = [
  { to: '/content', label: 'Content' },
  { to: '/about', label: 'How it works' },
  { to: '/social', label: 'Follow' },
] as const

function Wordmark() {
  return (
    <Link
      to="/"
      className="group inline-flex items-center gap-2.5 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8B5CF6]"
      aria-label={`${BRAND_SITE_NAME} home`}
    >
      <span
        aria-hidden
        className="flex h-9 w-9 items-center justify-center rounded-[0.7rem] bg-[#7C3AED] text-white"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 13.5 12 7l7 6.5" />
          <path d="M5 18 12 11.5 19 18" />
        </svg>
      </span>
      <span className="text-[17px] font-extrabold tracking-tight text-white">{BRAND_WORDMARK}</span>
    </Link>
  )
}

export function MediaSiteShell() {
  return (
    <div className="jf-media flex min-h-screen w-full flex-col bg-[#0B0B12] text-white antialiased">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[#7C3AED] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0B0B12]/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-5 py-3.5 sm:px-6">
          <Wordmark />
          <nav aria-label="Primary" className="flex items-center gap-1">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `inline-flex min-h-[2.5rem] items-center rounded-full px-3 text-[14px] font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6] ${
                    isActive ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main id="main" className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-white/10 bg-[#0B0B12]">
        <div className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-6">
          <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
            <div className="max-w-xs">
              <Wordmark />
              <p className="mt-3 text-[14px] leading-relaxed text-zinc-400">{BRAND_TAGLINE}</p>
              <p className="mt-4 text-[13px] text-zinc-500">
                <a
                  className="rounded underline decoration-white/25 underline-offset-4 hover:text-zinc-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]"
                  href={`mailto:${PUBLIC_CONTACT_EMAIL}`}
                >
                  {PUBLIC_CONTACT_EMAIL}
                </a>
              </p>
            </div>

            <div>
              <h2 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Topics</h2>
              <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1.5">
                {PILLARS.map((p) => (
                  <li key={p.id}>
                    <Link
                      to={`/topics/${p.slug}`}
                      className="rounded text-[14px] text-zinc-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]"
                    >
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Follow</h2>
              <PublicSocialLinks className="mt-3 max-w-xs" label="Jifunze.AI on social media (footer)" />
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-[13px] text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} {BRAND_SITE_NAME}</p>
            <ul className="flex flex-wrap gap-x-5 gap-y-1.5">
              <li>
                <Link className="rounded hover:text-zinc-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]" to="/privacy">Privacy</Link>
              </li>
              <li>
                <Link className="rounded hover:text-zinc-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]" to="/terms">Terms</Link>
              </li>
              <li>
                <Link className="rounded hover:text-zinc-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]" to="/social">Official accounts</Link>
              </li>
              <li>
                <a className="rounded hover:text-zinc-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]" href="/feed.xml">RSS</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}
