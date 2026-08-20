import { Link } from 'react-router-dom'
import { PublicSocialLinks } from '../PublicSocialLinks'
import { ContentGrid, Eyebrow, Section } from './mediaUi'
import { PUBLIC_CONTENT, publicContent } from '../../social/contentLedger'
import { PILLARS } from '../../social/pillars'
import {
  BRAND_SITE_NAME,
  BRAND_TAGLINE,
  EXTENDED_DESCRIPTION,
  PUBLIC_POSITIONING,
} from '../../social/brand'
import { organizationJsonLd, usePageMeta } from '../../social/seo'

export function MediaHomePage() {
  const items = publicContent(PUBLIC_CONTENT)
  const latest = items.slice(0, 6)

  usePageMeta({
    title: `${BRAND_SITE_NAME} — Career, Income and Practical AI Skills`,
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
      <Section className="pb-14 pt-16 sm:pt-20">
        <Eyebrow>Career skills, in short lessons</Eyebrow>
        <h1 className="mt-3 max-w-3xl text-[34px] font-extrabold leading-[1.08] tracking-tight sm:text-[46px]">
          Practical career, income and AI skills{' '}
          <span className="text-[#A78BFA]">you can use this week.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-zinc-300 sm:text-[17px]">
          {BRAND_SITE_NAME} is for job seekers, students and new freelancers in Kenya and other
          emerging markets. Every lesson teaches one concrete thing you can do — no jargon, nothing
          to buy.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link
            to="/content"
            className="inline-flex min-h-[2.75rem] items-center rounded-full bg-[#7C3AED] px-6 text-[15px] font-semibold text-white transition hover:bg-[#8B5CF6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]"
          >
            Browse the content hub
          </Link>
          <Link
            to="/about"
            className="inline-flex min-h-[2.75rem] items-center rounded-full border border-white/15 px-6 text-[15px] font-semibold text-zinc-200 transition hover:border-white/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]"
          >
            How Jifunze works
          </Link>
        </div>
        <p className="mt-8 text-[15px] font-medium text-zinc-400">{BRAND_TAGLINE}</p>
      </Section>

      <Section className="border-t border-white/10 py-14">
        <h2 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
          What you will learn
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

      <Section className="border-t border-white/10 py-14">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
            Latest lessons
          </h2>
          <Link
            to="/content"
            className="rounded text-[14px] font-medium text-[#A78BFA] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]"
          >
            All {items.length} lessons →
          </Link>
        </div>
        <div className="mt-6">
          <ContentGrid items={latest} />
        </div>
      </Section>

      <Section className="border-t border-white/10 py-14">
        <h2 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
          About Jifunze.ai
        </h2>
        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-zinc-300">
          {EXTENDED_DESCRIPTION}
        </p>
        <Link
          to="/about"
          className="mt-4 inline-flex rounded text-[14px] font-medium text-[#A78BFA] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]"
        >
          How content is chosen →
        </Link>
      </Section>

      <Section className="border-t border-white/10 py-14 pb-20">
        <h2 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
          Follow Jifunze.AI
        </h2>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-zinc-400">
          The same lessons go out on every official channel. These eight are the only accounts that
          belong to Jifunze.ai.
        </p>
        <PublicSocialLinks className="mt-5" label="Jifunze.AI on social media (home)" />
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
