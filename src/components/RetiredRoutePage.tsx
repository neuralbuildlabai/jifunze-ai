import { Link } from 'react-router-dom'
import { BRAND_SITE_NAME } from '../social/brand'
import { usePageMeta } from '../social/seo'

type RetiredKind = 'courses' | 'registration' | 'commerce'

const COPY: Record<RetiredKind, { title: string; body: string }> = {
  courses: {
    title: 'This course page has been retired',
    body: "Jifunze's course experience is currently unavailable while we focus on practical social learning content. There are no previews, prices or return dates to share.",
  },
  registration: {
    title: 'Public registration is closed',
    body: 'Jifunze no longer offers public accounts. Access to the platform is invite-only for administrators.',
  },
  commerce: {
    title: 'This page has been retired',
    body: 'Pricing, subscriptions and refunds belonged to a product Jifunze no longer offers. Nothing is for sale here.',
  },
}

/**
 * Branded response for intentionally retired routes (courses, registration, commerce).
 *
 * The HTTP status for these paths (410) is emitted by the hosting config (`vercel.json`); a
 * client-rendered SPA cannot set a response status itself. This component is the branded body
 * for that response and carries `noindex` so retired URLs drop out of search.
 */
export function RetiredRoutePage({ kind = 'courses' }: { kind?: RetiredKind }) {
  const copy = COPY[kind]
  usePageMeta({
    title: `${copy.title} — ${BRAND_SITE_NAME}`,
    description: copy.body,
    path: '/',
    noIndex: true,
  })

  return (
    <div className="jf-media flex min-h-screen w-full flex-col items-center justify-center bg-[#0B0B12] px-5 py-16 text-white antialiased">
      <div className="mx-auto w-full max-w-lg text-center">
        <span
          aria-hidden
          className="mx-auto flex h-12 w-12 items-center justify-center rounded-[0.8rem] bg-[#7C3AED] text-white"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 13.5 12 7l7 6.5" />
            <path d="M5 18 12 11.5 19 18" />
          </svg>
        </span>
        <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">Retired</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white">{copy.title}</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-zinc-400">{copy.body}</p>
        <p className="mt-3 text-[15px] leading-relaxed text-zinc-400">
          {BRAND_SITE_NAME} now turns emerging developments in AI, work and digital opportunity into
          useful social learning content.
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
            Follow Jifunze
          </Link>
        </div>
      </div>
    </div>
  )
}
