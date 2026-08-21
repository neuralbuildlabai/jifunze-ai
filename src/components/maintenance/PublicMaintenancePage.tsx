import { Link } from 'react-router-dom'
import { JifunzeBrandLogo } from '../brand/JifunzeBrandLogo'
import { LEGAL_ROUTES, SUPPORT_CONTACT_EMAIL } from '../../shared/legalRoutes'
import { BRAND_TAGLINE } from '../../social/brand'

/**
 * Approved-brand maintenance surface for anonymous visitors when public maintenance is enabled
 * (`src/lib/maintenanceMode.ts`). Behaviour of the gate is unchanged — this is only its face.
 */
export function PublicMaintenancePage() {
  return (
    <div className="jf-media relative min-h-screen w-full overflow-hidden bg-[#0B0B12] text-white antialiased">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(124,58,237,0.22),transparent_60%)]"
        aria-hidden
      />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 py-16 text-center sm:px-8">
        <div className="mb-10 flex flex-col items-center gap-5">
          <JifunzeBrandLogo to={null} size="xl" className="justify-center" />
          <p className="text-[12px] font-medium text-zinc-500">{BRAND_TAGLINE}</p>
        </div>

        <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-10 sm:px-10 sm:py-12">
          <h1 className="text-balance text-[1.7rem] font-semibold tracking-tight text-white sm:text-[2rem] sm:leading-[1.15]">
            We&apos;ll be right back.
          </h1>
          <p className="mt-5 text-pretty text-[15px] leading-relaxed text-zinc-400 sm:text-[16px]">
            The Jifunze site is briefly down for maintenance. Our official social channels are
            unaffected.
          </p>

          <p className="mt-8 text-[13px] leading-relaxed text-zinc-500">
            Questions?{' '}
            <a
              className="font-semibold text-[#A78BFA] underline-offset-2 transition-colors hover:text-white hover:underline"
              href={`mailto:${SUPPORT_CONTACT_EMAIL}`}
            >
              {SUPPORT_CONTACT_EMAIL}
            </a>
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 border-t border-white/10 pt-8">
            <p className="text-[12px] text-zinc-500">Administrator?</p>
            <Link
              to={LEGAL_ROUTES.adminLogin}
              className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full bg-[#7C3AED] px-8 text-[14px] font-semibold text-white transition hover:bg-[#8B5CF6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]"
            >
              Admin Login
            </Link>
          </div>
        </div>

        <nav className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] text-zinc-500">
          <Link to={LEGAL_ROUTES.terms} className="hover:text-white hover:underline">
            Terms
          </Link>
          <span className="text-zinc-700" aria-hidden>
            ·
          </span>
          <Link to={LEGAL_ROUTES.privacy} className="hover:text-white hover:underline">
            Privacy
          </Link>
          <span className="text-zinc-700" aria-hidden>
            ·
          </span>
          <Link to={LEGAL_ROUTES.aiDisclosure} className="hover:text-white hover:underline">
            AI disclosure
          </Link>
        </nav>
      </div>
    </div>
  )
}
