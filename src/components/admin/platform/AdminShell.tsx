import { useMemo, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../../auth/AuthContext'
import { learnerDisplayFirstName, learnerProfileInitials } from '../../../lib/learnerProfileDisplay'
import { adminEnvironmentLabel, getAdminAppEnvironment } from '../../../lib/admin/adminEnv'
import { useAdminAccess } from '../useAdminAccess'

const nav = [
  { to: '/admin/dashboard', label: 'Dashboard' },
  { to: '/admin/learners', label: 'Learners' },
  { to: '/admin/courses', label: 'Courses' },
  { to: '/admin/enrollments', label: 'Enrollments' },
  { to: '/admin/progress', label: 'Progress' },
  { to: '/admin/certificates', label: 'Certificates' },
  { to: '/admin/reports', label: 'Reports' },
  { to: '/admin/support', label: 'Support' },
  { to: '/admin/health', label: 'Health' },
  { to: '/admin/settings', label: 'Settings' },
] as const

function envBadgeClass(): string {
  switch (getAdminAppEnvironment()) {
    case 'production':
      return 'border-emerald-200 bg-emerald-50 text-emerald-900'
    case 'preview':
      return 'border-sky-200 bg-sky-50 text-sky-900'
    default:
      return 'border-amber-200 bg-amber-50 text-amber-900'
  }
}

export function AdminShell() {
  const { user, signOut, signOutPending } = useAuth()
  const { isSuperAdmin } = useAdminAccess()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const first = useMemo(() => learnerDisplayFirstName(user), [user])
  const initials = useMemo(() => learnerProfileInitials(user), [user])

  return (
    <div className="min-h-screen w-full bg-zinc-50 text-zinc-900">
      <div className="flex min-h-screen">
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-zinc-200 bg-white shadow-sm transition-transform duration-200 lg:static lg:translate-x-0 ${
            menuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
          aria-label="Admin navigation"
        >
          <div className="flex h-14 items-center border-b border-zinc-100 px-4">
            <Link to="/admin/dashboard" className="text-sm font-semibold tracking-tight text-zinc-900">
              Jifunze Admin
            </Link>
          </div>
          <nav className="flex flex-col gap-0.5 p-2">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium transition ${
                    isActive ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:bg-zinc-100'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="absolute bottom-0 left-0 right-0 border-t border-zinc-100 p-3 text-[11px] leading-snug text-zinc-500 lg:static lg:border-t-0 lg:px-4 lg:pb-4 lg:pt-2">
            {isSuperAdmin ? 'Signed in as super admin.' : 'Signed in as platform admin.'} Destructive controls stay super-admin only.
          </div>
        </aside>

        {menuOpen ? (
          <button
            type="button"
            className="fixed inset-0 z-30 bg-zinc-900/40 lg:hidden"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          />
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col lg:pl-0">
          <header className="sticky top-0 z-20 flex flex-wrap items-center gap-3 border-b border-zinc-200 bg-white/95 px-4 py-3 backdrop-blur">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg border border-zinc-200 bg-white px-2.5 py-2 text-sm font-medium text-zinc-700 shadow-sm lg:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              data-testid="admin-shell-menu-toggle"
            >
              Admin menu
            </button>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Operations</p>
              <p className="truncate text-sm font-semibold text-zinc-900">
                {location.pathname.replace(/^\//, '').replace(/\//g, ' · ') || 'admin'}
              </p>
            </div>
            <div className="hidden max-w-xs flex-1 sm:block">
              <label className="sr-only" htmlFor="admin-search">
                Search
              </label>
              <input
                id="admin-search"
                placeholder="Search (learners page)"
                className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-800 outline-none ring-zinc-900/10 placeholder:text-zinc-400 focus:ring-2"
                readOnly
                title="Use the Learners page for full search and filters."
              />
            </div>
            <span className={`inline-flex shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${envBadgeClass()}`}>
              {adminEnvironmentLabel()}
            </span>
            <div className="relative flex shrink-0 items-center gap-2">
              <div className="hidden text-right sm:block">
                <p className="text-xs font-medium text-zinc-500">{first}</p>
                <p className="max-w-[10rem] truncate text-[11px] text-zinc-400">{user?.email}</p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white">
                {initials}
              </div>
              <div className="relative flex flex-col items-end gap-1 text-sm">
                <Link to="/account" className="text-zinc-600 underline-offset-2 hover:text-zinc-900 hover:underline">
                  Account
                </Link>
                <Link to="/dashboard" className="text-zinc-600 underline-offset-2 hover:text-zinc-900 hover:underline">
                  Learner dashboard
                </Link>
                <button
                  type="button"
                  disabled={signOutPending}
                  onClick={() => void signOut()}
                  className="text-left text-zinc-600 underline-offset-2 hover:text-zinc-900 hover:underline disabled:opacity-50"
                >
                  Sign out
                </button>
              </div>
            </div>
          </header>
          <main className="flex-1 px-4 py-8 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
