import { Link, NavLink, Outlet } from 'react-router-dom'
import { PublicSocialLinks } from '../PublicSocialLinks'
import { JifunzeBrandLogo } from '../brand/JifunzeBrandLogo'
import { CORE_SHORT_DESCRIPTION, BRAND_SITE_NAME, PUBLIC_CONTACT_EMAIL } from '../../social/brand'
import { PILLARS } from '../../social/pillars'

/**
 * The public site shell: brand home and social distribution hub.
 * Header and footer follow the approved brief — including the explicitly-labeled
 * "Admin Login" entry (never a bare "Login", and no learner/course items anywhere).
 */

const NAV = [
  { to: '/about', label: 'About' },
  { to: '/#topics', label: 'Topics' },
  { to: '/content', label: 'Latest Posts' },
  { to: '/social', label: 'Follow Us' },
] as const

function focusRing(extra = '') {
  return `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6] ${extra}`
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
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-5 py-3.5 sm:px-6">
          <JifunzeBrandLogo to="/" size="sm" />
          <nav aria-label="Primary" className="flex items-center gap-0.5 sm:gap-1">
            {NAV.map((item) =>
              item.to.includes('#') ? (
                <a
                  key={item.to}
                  href={item.to}
                  className={focusRing(
                    'inline-flex min-h-[2.5rem] items-center rounded-full px-2.5 text-[13.5px] font-medium text-zinc-400 transition hover:text-white sm:px-3 sm:text-[14px]',
                  )}
                >
                  {item.label}
                </a>
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    focusRing(
                      `inline-flex min-h-[2.5rem] items-center rounded-full px-2.5 text-[13.5px] font-medium transition sm:px-3 sm:text-[14px] ${
                        isActive ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-white'
                      }`,
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ),
            )}
            <Link
              to="/admin/login"
              className={focusRing(
                'ml-1 hidden min-h-[2.5rem] items-center rounded-full border border-white/15 px-3.5 text-[13.5px] font-medium text-zinc-300 transition hover:border-white/30 hover:text-white sm:inline-flex',
              )}
            >
              Admin Login
            </Link>
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
              <JifunzeBrandLogo to="/" size="sm" />
              <p className="mt-3 text-[14px] leading-relaxed text-zinc-400">{CORE_SHORT_DESCRIPTION}</p>
              <p className="mt-4 text-[13px] text-zinc-500">
                <Link className={focusRing('rounded underline decoration-white/25 underline-offset-4 hover:text-zinc-300')} to="/contact">
                  Contact
                </Link>
                {' · '}
                <a
                  className={focusRing('rounded underline decoration-white/25 underline-offset-4 hover:text-zinc-300')}
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
                      className={focusRing('rounded text-[14px] text-zinc-400 hover:text-white')}
                    >
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Follow</h2>
              <PublicSocialLinks className="mt-3 max-w-xs" label="Jifunze on social media (footer)" />
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-[13px] text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} {BRAND_SITE_NAME}</p>
            <ul className="flex flex-wrap gap-x-5 gap-y-1.5">
              <li>
                <Link className={focusRing('rounded hover:text-zinc-300')} to="/privacy">Privacy</Link>
              </li>
              <li>
                <Link className={focusRing('rounded hover:text-zinc-300')} to="/terms">Terms</Link>
              </li>
              <li>
                <Link className={focusRing('rounded hover:text-zinc-300')} to="/ai-disclosure">AI disclosure</Link>
              </li>
              <li>
                <Link className={focusRing('rounded hover:text-zinc-300')} to="/social">Official accounts</Link>
              </li>
              <li>
                <a className={focusRing('rounded hover:text-zinc-300')} href="/feed.xml">RSS</a>
              </li>
              <li>
                <Link className={focusRing('rounded hover:text-zinc-300')} to="/admin/login">Admin Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}
