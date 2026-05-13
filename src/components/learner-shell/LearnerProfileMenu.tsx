import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import { learnerDisplayFirstName, learnerProfileInitials } from '../../lib/learnerProfileDisplay'
import { useAdminAccess } from '../admin/useAdminAccess'

export function LearnerProfileMenu() {
  const { user, signOut, signOutPending } = useAuth()
  const { canAccessAdmin } = useAdminAccess()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])

  if (!isSupabaseConfigured() || !user) return null

  const first = learnerDisplayFirstName(user)
  const initials = learnerProfileInitials(user)

  return (
    <div className="relative" ref={rootRef} data-testid="learner-profile-menu">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex max-w-full items-center gap-2 rounded-full border border-stone-300/90 bg-white px-3 py-1.5 text-left text-sm font-medium text-zinc-900 shadow-sm transition hover:border-stone-400 hover:bg-stone-50"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-rose-600 text-xs font-bold text-white"
          aria-hidden
        >
          {initials}
        </span>
        <span className="min-w-0 max-w-[10rem] truncate text-left sm:max-w-[12rem]">{first}</span>
        <span className="text-stone-400" aria-hidden>
          ▾
        </span>
      </button>
      {open ? (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 max-h-[min(70vh,22rem)] w-[min(calc(100vw-1.25rem),17.5rem)] overflow-y-auto overscroll-contain rounded-xl border border-stone-200/90 bg-white py-1.5 shadow-lg shadow-stone-900/10 sm:min-w-[12.5rem] sm:max-w-none"
        >
          <Link
            role="menuitem"
            to="/dashboard"
            className="block px-4 py-2 text-sm text-zinc-800 hover:bg-stone-50"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            role="menuitem"
            to="/my-learning"
            className="block px-4 py-2 text-sm text-zinc-800 hover:bg-stone-50"
            onClick={() => setOpen(false)}
          >
            My Learning
          </Link>
          <Link
            role="menuitem"
            to="/account"
            className="block px-4 py-2 text-sm text-zinc-800 hover:bg-stone-50"
            onClick={() => setOpen(false)}
          >
            Account settings
          </Link>
          {canAccessAdmin ? (
            <Link
              role="menuitem"
              to="/admin/dashboard"
              className="block px-4 py-2 text-sm text-zinc-800 hover:bg-stone-50"
              onClick={() => setOpen(false)}
              data-testid="learner-nav-admin-console"
            >
              Admin console
            </Link>
          ) : null}
          <Link
            role="menuitem"
            to="/account#password"
            className="block px-4 py-2 text-sm text-zinc-800 hover:bg-stone-50"
            onClick={() => setOpen(false)}
          >
            Change password
          </Link>
          <Link
            role="menuitem"
            to="/forgot-password"
            className="block px-4 py-2 text-sm text-zinc-800 hover:bg-stone-50"
            onClick={() => setOpen(false)}
          >
            Forgot password
          </Link>
          <div className="my-1 border-t border-stone-200/80" />
          <button
            role="menuitem"
            type="button"
            disabled={signOutPending}
            onClick={() => {
              setOpen(false)
              void signOut()
            }}
            className="block w-full px-4 py-2 text-left text-sm text-zinc-800 hover:bg-stone-50 disabled:opacity-50"
          >
            {signOutPending ? 'Signing out…' : 'Sign out'}
          </button>
        </div>
      ) : null}
    </div>
  )
}
