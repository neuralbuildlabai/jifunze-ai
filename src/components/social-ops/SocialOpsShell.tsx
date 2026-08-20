import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'

/**
 * Chrome for `/admin/social-ops`.
 *
 * Intentionally its own shell, not `AdminShell`: the frozen learning-platform admin must keep its
 * nav, its styling and its behaviour exactly as tagged. Nothing here imports from
 * `components/admin/platform/`.
 */
const NAV = [
  { to: '/admin/social-ops', end: true, label: 'Overview' },
  { to: '/admin/social-ops/accounts', end: false, label: 'Accounts' },
  { to: '/admin/social-ops/pipeline', end: false, label: 'Pipeline' },
  { to: '/admin/social-ops/safety', end: false, label: 'Safety' },
] as const

export function SocialOpsShell() {
  const { user } = useAuth()

  return (
    <div className="jf-media min-h-screen w-full bg-[#0B0B12] text-zinc-100 antialiased">
      <header className="border-b border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="flex h-8 w-8 items-center justify-center rounded-[0.6rem] bg-[#7C3AED] text-white"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 13.5 12 7l7 6.5" />
                <path d="M5 18 12 11.5 19 18" />
              </svg>
            </span>
            <div>
              <h1 className="text-[15px] font-semibold tracking-tight text-white">Social operations</h1>
              <p className="text-[12px] text-zinc-500">Internal console — not linked from the public site</p>
            </div>
          </div>
          <p className="text-[12px] text-zinc-500">{user?.email}</p>
        </div>
        <nav aria-label="Social operations" className="mx-auto w-full max-w-6xl px-5 sm:px-6">
          <ul className="-mb-px flex flex-wrap gap-1">
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `inline-flex min-h-[2.5rem] items-center border-b-2 px-3.5 text-[14px] font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6] ${
                      isActive
                        ? 'border-[#7C3AED] text-white'
                        : 'border-transparent text-zinc-400 hover:text-zinc-200'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-6">
        <Outlet />
      </main>
    </div>
  )
}
