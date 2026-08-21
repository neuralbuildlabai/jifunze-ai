import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AuthForm } from '../AuthForm'
import { TrustLegalFooterLinks } from '../TrustLegalFooterLinks'

/**
 * Administrator sign-in. Canonical path: `/admin/login` (`/auth/sign-in` redirects there).
 * Invite-only; there is no public registration and no learner or instructor login.
 */
export function AdminLoginPage() {
  // Admin surfaces must never be indexed, whatever a crawler manages to reach.
  // (Same contract as AdminConsoleShell; /admin/login is publicly reachable.)
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
    <div className="jf-media min-h-screen w-full bg-[#0B0B12] text-white antialiased">
      <div className="relative mx-auto w-full max-w-xl px-5 pb-16 pt-12 sm:px-8 sm:pt-16">
        <header className="flex flex-col items-center gap-6 pb-8 text-center">
          <Link
            to="/"
            aria-label="Jifunze home"
            className="inline-flex items-center gap-2.5 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8B5CF6]"
          >
            <span
              aria-hidden
              className="flex h-10 w-10 items-center justify-center rounded-[0.7rem] bg-[#7C3AED] text-white"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 13.5 12 7l7 6.5" />
                <path d="M5 18 12 11.5 19 18" />
              </svg>
            </span>
            <span className="text-[19px] font-extrabold tracking-tight text-white">Jifunze</span>
          </Link>
          <div className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#A78BFA]">
              Administrator access
            </p>
            <h1 className="text-balance text-[1.7rem] font-semibold tracking-tight text-white sm:text-[2rem] sm:leading-[1.15]">
              Sign in to manage Jifunze
            </h1>
            <p className="text-pretty text-[14px] leading-relaxed text-zinc-400 sm:text-[15px]">
              Sign in to manage Jifunze signals, content, social accounts and platform operations.
            </p>
          </div>
        </header>

        <div className="flex flex-col items-center gap-5">
          <AuthForm />
          <Link
            className="text-[12px] font-medium text-zinc-500 hover:text-zinc-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]"
            to="/"
          >
            ← Back to the public site
          </Link>
          <TrustLegalFooterLinks variant="compact" className="justify-center" />
        </div>
      </div>
    </div>
  )
}
