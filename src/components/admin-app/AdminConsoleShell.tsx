import { useEffect } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { ADMIN_MODULE_GROUPS, ADMIN_STATUS_LABELS, type AdminModuleStatus } from './adminModules'

/**
 * Chrome for the `/admin` console. Owns the /admin prefix; the social-ops pages keep their own
 * proven shell under /admin/social-ops and are linked from here.
 *
 * Every route inside this shell sits behind `RequireSocialOpsAccess` (client UX guard) with the
 * real boundary server-side: RLS `public.is_admin()` on every operational table and a tier
 * re-check inside the `social-ops-admin` Edge Function.
 */

const STATUS_DOT: Record<AdminModuleStatus, string> = {
  operational: 'bg-emerald-400',
  'read-only': 'bg-sky-400',
  partial: 'bg-amber-400',
  'awaiting-connection': 'bg-violet-400',
  planned: 'bg-zinc-600',
}

export function AdminConsoleShell() {
  const { user } = useAuth()

  // Admin surfaces must never be indexed, whatever a crawler manages to reach.
  useEffect(() => {
    let el = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]')
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute('name', 'robots')
      document.head.appendChild(el)
    }
    const previous = el.getAttribute('content')
    el.setAttribute('content', 'noindex, nofollow')
    return () => {
      if (previous) el?.setAttribute('content', previous)
    }
  }, [])

  return (
    <div className="jf-media min-h-screen w-full bg-[#0B0B12] text-zinc-100 antialiased">
      <header className="border-b border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-6">
          <Link
            to="/admin"
            className="flex items-center gap-3 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8B5CF6]"
          >
            <span
              aria-hidden
              className="flex h-8 w-8 items-center justify-center rounded-[0.6rem] bg-[#7C3AED] text-white"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 13.5 12 7l7 6.5" />
                <path d="M5 18 12 11.5 19 18" />
              </svg>
            </span>
            <span>
              <span className="block text-[15px] font-semibold tracking-tight text-white">Jifunze admin</span>
              <span className="block text-[12px] text-zinc-500">Signal → content → review → publish → learn</span>
            </span>
          </Link>
          <p className="text-[12px] text-zinc-500">{user?.email}</p>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-8 sm:px-6 lg:flex-row">
        <nav aria-label="Admin modules" className="lg:w-60 lg:shrink-0">
          <ul className="space-y-5">
            <li>
              <NavLink
                to="/admin"
                end
                className={({ isActive }) =>
                  `inline-flex min-h-[2.25rem] w-full items-center rounded-lg px-3 text-[14px] font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6] ${
                    isActive ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-white'
                  }`
                }
              >
                Overview
              </NavLink>
            </li>
            {ADMIN_MODULE_GROUPS.map((group) => (
              <li key={group.title}>
                <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-600">
                  {group.title}
                </p>
                <ul className="mt-1.5 space-y-0.5">
                  {group.modules.map((m) => (
                    <li key={m.path}>
                      <NavLink
                        to={`/admin/${m.path}`}
                        className={({ isActive }) =>
                          `flex min-h-[2.25rem] w-full items-center justify-between gap-2 rounded-lg px-3 text-[13.5px] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6] ${
                            isActive ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-white'
                          }`
                        }
                      >
                        <span>{m.label}</span>
                        <span
                          aria-hidden
                          title={ADMIN_STATUS_LABELS[m.status]}
                          className={`h-1.5 w-1.5 shrink-0 rounded-full ${STATUS_DOT[m.status]}`}
                        />
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
            <li className="border-t border-white/10 pt-4">
              <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-600">Console</p>
              <ul className="mt-1.5 space-y-0.5">
                {[
                  { to: '/admin/social-ops', label: 'Social-ops overview' },
                  { to: '/admin/social-ops/accounts', label: 'Social-ops accounts' },
                  { to: '/admin/social-ops/pipeline', label: 'Social-ops pipeline' },
                  { to: '/admin/social-ops/safety', label: 'Social-ops safety' },
                ].map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="flex min-h-[2.25rem] w-full items-center rounded-lg px-3 text-[13.5px] text-zinc-400 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          <div className="mt-6 space-y-1.5 border-t border-white/10 px-3 pt-4 text-[11px] leading-relaxed text-zinc-600">
            <p>
              <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 align-middle" /> operational
              <span className="ml-3 mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-sky-400 align-middle" /> read-only
            </p>
            <p>
              <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-amber-400 align-middle" /> partial
              <span className="ml-3 mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-violet-400 align-middle" /> awaiting connection
              <span className="ml-3 mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-zinc-600 align-middle" /> planned
            </p>
          </div>
        </nav>

        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
