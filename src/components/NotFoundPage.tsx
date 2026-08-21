import { Link } from 'react-router-dom'
import { BRAND_SITE_NAME } from '../social/brand'
import { usePageMeta } from '../social/seo'
import { TrustLegalFooterLinks } from './TrustLegalFooterLinks'

/**
 * Branded 404. The HTTP status for unknown paths is emitted by the hosting config
 * (`vercel.json`); this component is the branded body and carries `noindex`.
 */
export function NotFoundPage() {
  usePageMeta({
    title: `Page not found — ${BRAND_SITE_NAME}`,
    description: 'That page does not exist.',
    path: '/',
    noIndex: true,
  })

  return (
    <div className="jf-media flex min-h-screen w-full flex-col bg-[#0B0B12] px-5 py-12 text-white antialiased sm:px-8">
      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center text-center">
        <span
          aria-hidden
          className="flex h-12 w-12 items-center justify-center rounded-[0.8rem] bg-[#7C3AED] text-white"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 13.5 12 7l7 6.5" />
            <path d="M5 18 12 11.5 19 18" />
          </svg>
        </span>
        <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">404</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white">Page not found</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-zinc-400">
          That link may be outdated or mistyped.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full bg-[#7C3AED] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#8B5CF6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]"
            to="/"
          >
            Go to the homepage
          </Link>
          <Link
            className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-white/15 px-6 py-2.5 text-sm font-semibold text-zinc-200 transition hover:border-white/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]"
            to="/social"
          >
            Official accounts
          </Link>
        </div>
      </div>
      <footer className="mx-auto mt-12 w-full max-w-lg pb-6">
        <TrustLegalFooterLinks variant="compact" className="justify-center" />
      </footer>
    </div>
  )
}
