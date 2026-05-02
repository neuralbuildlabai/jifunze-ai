import { Link } from 'react-router-dom'
import { JifunzeBrandLogo } from '../brand/JifunzeBrandLogo'
import { LEGAL_ROUTES, SUPPORT_CONTACT_EMAIL } from '../../training/trustCopy'

/**
 * Full-screen coming-soon surface for anonymous visitors when public maintenance is enabled
 * (`src/lib/maintenanceMode.ts`).
 * No course links, no pricing CTAs, no internal rebuild copy.
 */
export function PublicMaintenancePage() {
  return (
    <div className="jf-public-surface relative min-h-screen w-full overflow-hidden bg-[var(--jf-bg-page)] text-[var(--jf-text)]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(148,163,184,0.14),transparent_55%)]"
        aria-hidden
      />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-6 py-16 text-center sm:px-8">
        <div className="mb-10">
          <JifunzeBrandLogo to={null} size="xxl" className="mx-auto justify-center" surface="dark" />
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--jf-muted)]">Jifunze.ai</p>
        </div>

        <h1 className="text-balance text-[1.65rem] font-semibold tracking-tight text-[color:var(--jf-text)] sm:text-[1.85rem] sm:leading-snug">
          We&apos;re upgrading the learning experience.
        </h1>
        <p className="mt-5 max-w-md text-pretty text-[15px] leading-relaxed text-[color:var(--jf-muted)] sm:text-[16px]">
          Jifunze.ai will be back soon with deeper AI learning, guided practice, and portfolio-ready courses.
        </p>

        <p className="mt-10 text-[13px] leading-relaxed text-[color:var(--jf-subtle)]">
          Questions?{' '}
          <a
            className="font-medium text-[color:var(--jf-muted)] underline-offset-4 transition-colors hover:text-[color:var(--jf-text)] hover:underline"
            href={`mailto:${SUPPORT_CONTACT_EMAIL}`}
          >
            {SUPPORT_CONTACT_EMAIL}
          </a>
        </p>

        <div className="mt-14 flex flex-col items-center gap-4 border-t border-[color:var(--jf-border)] pt-10">
          <p className="text-[12px] text-[color:var(--jf-subtle)]">Already have an account?</p>
          <Link
            to={LEGAL_ROUTES.authSignIn}
            className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-white/[0.12] px-8 text-[14px] font-semibold text-[color:var(--jf-text)] transition-colors hover:border-white/[0.18] hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
          >
            Sign in
          </Link>
        </div>

        <nav className="mt-12 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] text-[color:var(--jf-subtle)]">
          <Link to={LEGAL_ROUTES.terms} className="hover:text-[color:var(--jf-muted)] hover:underline">
            Terms
          </Link>
          <span className="text-[color:var(--jf-border)]" aria-hidden>
            ·
          </span>
          <Link to={LEGAL_ROUTES.privacy} className="hover:text-[color:var(--jf-muted)] hover:underline">
            Privacy
          </Link>
          <span className="text-[color:var(--jf-border)]" aria-hidden>
            ·
          </span>
          <Link to={LEGAL_ROUTES.disclaimer} className="hover:text-[color:var(--jf-muted)] hover:underline">
            Disclaimer
          </Link>
        </nav>
      </div>
    </div>
  )
}
