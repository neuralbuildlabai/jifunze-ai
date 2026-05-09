import { Link } from 'react-router-dom'
import { JifunzeBrandLogo } from '../brand/JifunzeBrandLogo'
import { LEGAL_ROUTES, SUPPORT_CONTACT_EMAIL } from '../../training/trustCopy'

/**
 * Warm Jifunze-branded maintenance surface for anonymous visitors when
 * public maintenance is enabled (`src/lib/maintenanceMode.ts`).
 *
 * Behaviour: maintenance gating itself is unchanged — this is just the public
 * face of the gate. No course links, no pricing CTAs.
 */
export function PublicMaintenancePage() {
  return (
    <div className="jf-learn-warm relative min-h-screen w-full overflow-hidden bg-[var(--jf-bg-page)] text-[color:var(--jf-text)]">
      {/* soft warm glow — not a dark vignette */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(255,170,76,0.18),transparent_60%)]"
        aria-hidden
      />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 py-16 text-center sm:px-8">
        <div className="mb-10 flex flex-col items-center gap-5">
          <JifunzeBrandLogo to={null} size="xxl" surface="light" className="justify-center" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-700">Jifunze.AI</p>
        </div>

        <div className="w-full max-w-xl rounded-2xl border border-orange-100/90 bg-white px-6 py-10 shadow-[0_22px_50px_-20px_rgba(120,53,15,0.18)] sm:px-10 sm:py-12">
          <h1 className="text-balance text-[1.7rem] font-semibold tracking-tight text-stone-900 sm:text-[2rem] sm:leading-[1.15]">
            We&apos;re improving the learning experience.
          </h1>
          <p className="mt-5 text-pretty text-[15px] leading-relaxed text-stone-600 sm:text-[16px]">
            Jifunze.ai will be back soon with guided learning, practical courses, and stronger learner tools.
          </p>

          <p className="mt-8 text-[13px] leading-relaxed text-stone-500">
            Questions?{' '}
            <a
              className="font-semibold text-orange-700 underline-offset-2 transition-colors hover:text-orange-800 hover:underline"
              href={`mailto:${SUPPORT_CONTACT_EMAIL}`}
            >
              {SUPPORT_CONTACT_EMAIL}
            </a>
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 border-t border-orange-100/80 pt-8">
            <p className="text-[12px] text-stone-500">Already have an account?</p>
            <Link
              to={LEGAL_ROUTES.authSignIn}
              className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 px-8 text-[14px] font-semibold text-white shadow-md shadow-orange-500/25 transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
            >
              Sign in
            </Link>
          </div>
        </div>

        <nav className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] text-stone-500">
          <Link to={LEGAL_ROUTES.terms} className="hover:text-orange-700 hover:underline">
            Terms
          </Link>
          <span className="text-stone-300" aria-hidden>
            ·
          </span>
          <Link to={LEGAL_ROUTES.privacy} className="hover:text-orange-700 hover:underline">
            Privacy
          </Link>
          <span className="text-stone-300" aria-hidden>
            ·
          </span>
          <Link to={LEGAL_ROUTES.disclaimer} className="hover:text-orange-700 hover:underline">
            Disclaimer
          </Link>
        </nav>
      </div>
    </div>
  )
}
