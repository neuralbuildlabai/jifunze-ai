import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { TrustLegalFooterLinks } from '../TrustLegalFooterLinks'

/**
 * Shared chrome for the administrator auth surfaces (sign-in, forgot password, reset password).
 * Approved brand only: violet on near-black, Jifunze wordmark with no ".AI".
 */
export function AuthPageShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string
  title: string
  intro?: string
  children: ReactNode
}) {
  return (
    <div className="jf-media min-h-screen w-full bg-[#0B0B12] text-white antialiased">
      <div className="relative mx-auto flex min-h-screen w-full max-w-xl flex-col justify-center px-5 py-14 sm:px-8">
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
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#A78BFA]">{eyebrow}</p>
            <h1 className="text-balance text-[1.6rem] font-semibold tracking-tight text-white sm:leading-[1.15]">
              {title}
            </h1>
            {intro ? (
              <p className="text-pretty text-[14px] leading-relaxed text-zinc-400 sm:text-[15px]">{intro}</p>
            ) : null}
          </div>
        </header>
        <div className="flex flex-col items-center gap-5">{children}</div>
        <div className="mt-8">
          <TrustLegalFooterLinks variant="compact" className="justify-center" />
        </div>
      </div>
    </div>
  )
}
