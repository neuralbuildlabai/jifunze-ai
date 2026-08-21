import { Link } from 'react-router-dom'
import { PublicSocialLinks } from '../PublicSocialLinks'
import { ContentGrid, Eyebrow, Section } from './mediaUi'
import { LatestPostsSection } from './LatestPostsSection'
import { PUBLIC_CONTENT, publicContent } from '../../social/contentLedger'
import { PILLARS } from '../../social/pillars'
import { CONTENT_FORMATS, FORMAT_STATUS_LABELS } from '../../social/formats'
import {
  BRAND_SITE_NAME,
  BRAND_TAGLINE,
  PUBLIC_POSITIONING,
} from '../../social/brand'
import { organizationJsonLd, usePageMeta } from '../../social/seo'

const OPERATING_LOOP = [
  { step: 'Discover', body: 'We watch for useful signals in AI, work and digital opportunity.' },
  { step: 'Research & verify', body: 'Claims are checked against traceable sources before anything is made.' },
  { step: 'Create', body: 'Verified ideas become practical content you can apply.' },
  { step: 'Review & publish', body: 'A person reviews every piece before it goes out.' },
  { step: 'Learn', body: 'Audience engagement shapes what we make next.' },
] as const

export function MediaHomePage() {
  const items = publicContent(PUBLIC_CONTENT)
  const quickReads = items.slice(0, 6)

  usePageMeta({
    title: `${BRAND_SITE_NAME} — ${BRAND_TAGLINE.replace(/\.$/, '')}`,
    description: PUBLIC_POSITIONING,
    path: '/',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: BRAND_SITE_NAME,
      url: 'https://www.jifunze.ai/',
      description: PUBLIC_POSITIONING,
      publisher: organizationJsonLd(),
    },
  })

  return (
    <>
      {/* Hero */}
      <Section className="pb-14 pt-16 sm:pt-20">
        <Eyebrow>Social learning media</Eyebrow>
        <h1 className="mt-3 max-w-3xl text-[38px] font-extrabold leading-[1.06] tracking-tight sm:text-[52px]">
          {BRAND_TAGLINE.replace(/\.$/, '')}
          <span className="text-[#A78BFA]">.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-zinc-300 sm:text-[17px]">
          {PUBLIC_POSITIONING}
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link
            to="/content"
            className="inline-flex min-h-[2.75rem] items-center rounded-full bg-[#7C3AED] px-6 text-[15px] font-semibold text-white transition hover:bg-[#8B5CF6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]"
          >
            Explore Our Latest Posts
          </Link>
          <Link
            to="/social"
            className="inline-flex min-h-[2.75rem] items-center rounded-full border border-white/15 px-6 text-[15px] font-semibold text-zinc-200 transition hover:border-white/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]"
          >
            Follow Jifunze
          </Link>
        </div>
      </Section>

      {/* Mission */}
      <Section className="border-t border-white/10 py-14">
        <h2 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
          What Jifunze does
        </h2>
        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-zinc-300">
          Jifunze detects relevant developments in AI, work and digital opportunity, researches and
          verifies them, and turns them into practical learning content published through social
          media. Audience engagement then shapes what we make next.
        </p>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-zinc-400">
          Made for ambitious African and diaspora professionals who want to use AI and digital
          tools to improve their work, career and income.
        </p>
        <Link
          to="/about"
          className="mt-4 inline-flex rounded text-[14px] font-medium text-[#A78BFA] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]"
        >
          How Jifunze works →
        </Link>
      </Section>

      {/* Topics */}
      <Section className="border-t border-white/10 py-14">
        <h2 id="topics" className="scroll-mt-24 text-[13px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
          Topics
        </h2>
        <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p) => (
            <li key={p.id}>
              <Link
                to={`/topics/${p.slug}`}
                className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-[#7C3AED]/50 hover:bg-white/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]"
              >
                <span className="text-[16px] font-semibold text-white">{p.label}</span>
                <span className="mt-1.5 text-[14px] leading-relaxed text-zinc-400">{p.blurb}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* Latest posts */}
      <Section className="border-t border-white/10 py-14">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
            Latest posts
          </h2>
          <Link
            to="/social"
            className="rounded text-[14px] font-medium text-[#A78BFA] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]"
          >
            All official channels →
          </Link>
        </div>
        <div className="mt-6">
          <LatestPostsSection />
        </div>
      </Section>

      {/* Quick reads */}
      <Section className="border-t border-white/10 py-14">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
            Quick reads
          </h2>
          <Link
            to="/content"
            className="rounded text-[14px] font-medium text-[#A78BFA] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]"
          >
            All {items.length} quick reads →
          </Link>
        </div>
        <div className="mt-6">
          <ContentGrid items={quickReads} />
        </div>
      </Section>

      {/* Formats */}
      <Section className="border-t border-white/10 py-14">
        <h2 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
          What we make
        </h2>
        <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-zinc-400">
          Labels are honest: a format marked “{FORMAT_STATUS_LABELS.planned}” is not publishing
          anywhere yet.
        </p>
        <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CONTENT_FORMATS.map((f) => (
            <li
              key={f.id}
              className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-4"
            >
              <span className="flex items-center justify-between gap-2">
                <span className="text-[15px] font-semibold text-white">{f.label}</span>
                <span
                  className={`inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${
                    f.status === 'live'
                      ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300'
                      : f.status === 'toolkit'
                        ? 'border-violet-400/40 bg-violet-400/10 text-violet-300'
                        : 'border-white/15 bg-white/[0.04] text-zinc-500'
                  }`}
                >
                  {FORMAT_STATUS_LABELS[f.status]}
                </span>
              </span>
              <span className="mt-1.5 text-[13.5px] leading-relaxed text-zinc-400">{f.blurb}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Operating loop */}
      <Section className="border-t border-white/10 py-14">
        <h2 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
          How it works
        </h2>
        <ol className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {OPERATING_LOOP.map((s, i) => (
            <li key={s.step} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <span className="text-[12px] font-semibold text-[#A78BFA]">{i + 1}</span>
              <p className="mt-1 text-[15px] font-semibold text-white">{s.step}</p>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-zinc-400">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* AI disclosure */}
      <Section className="border-t border-white/10 py-14">
        <h2 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
          AI disclosure
        </h2>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-zinc-400">
          Jifunze uses AI-assisted tools to research, draft, adapt and produce educational content.
          Human oversight remains part of the process as our publishing system develops.
        </p>
        <Link
          to="/ai-disclosure"
          className="mt-4 inline-flex rounded text-[14px] font-medium text-[#A78BFA] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]"
        >
          Read the full AI disclosure →
        </Link>
      </Section>

      {/* Follow */}
      <Section className="border-t border-white/10 py-14 pb-20">
        <h2 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
          Follow Jifunze
        </h2>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-zinc-400">
          These are the only official Jifunze accounts. Anything not in the directory is not us.
        </p>
        <PublicSocialLinks className="mt-5" label="Jifunze on social media (home)" />
        <Link
          to="/social"
          className="mt-5 inline-flex rounded text-[14px] font-medium text-[#A78BFA] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]"
        >
          See the full account directory →
        </Link>
      </Section>
    </>
  )
}
