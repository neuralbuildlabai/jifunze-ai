import { Link, useParams } from 'react-router-dom'
import { ContentGrid, Eyebrow, Section } from './mediaUi'
import { NotFoundPage } from '../NotFoundPage'
import { PUBLIC_CONTENT, contentForPillar } from '../../social/contentLedger'
import { PILLARS, pillarBySlug } from '../../social/pillars'
import { BRAND_SITE_NAME } from '../../social/brand'
import { usePageMeta } from '../../social/seo'

export function TopicPillarPage() {
  const { pillarSlug } = useParams<{ pillarSlug: string }>()
  const pillar = pillarBySlug(pillarSlug)

  usePageMeta({
    title: pillar ? `${pillar.label} — ${BRAND_SITE_NAME}` : `Topic not found — ${BRAND_SITE_NAME}`,
    description: pillar?.description ?? 'Topic not found.',
    path: `/topics/${pillarSlug ?? ''}`,
    noIndex: !pillar,
  })

  if (!pillar) return <NotFoundPage />

  const items = contentForPillar(pillar.id, PUBLIC_CONTENT)

  return (
    <Section className="py-14 sm:py-16">
      <Eyebrow>Topic</Eyebrow>
      <h1 className="mt-3 text-[30px] font-extrabold tracking-tight sm:text-[38px]">{pillar.label}</h1>
      <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-zinc-300">{pillar.description}</p>

      <div className="mt-9">
        <ContentGrid items={items} />
      </div>

      <nav aria-label="Other topics" className="mt-12 border-t border-white/10 pt-6">
        <h2 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
          Other topics
        </h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {PILLARS.filter((p) => p.id !== pillar.id).map((p) => (
            <li key={p.id}>
              <Link
                to={`/topics/${p.slug}`}
                className="inline-flex min-h-[2.25rem] items-center rounded-full border border-white/12 px-3.5 text-[13px] font-medium text-zinc-300 transition hover:border-white/25 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]"
              >
                {p.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </Section>
  )
}
