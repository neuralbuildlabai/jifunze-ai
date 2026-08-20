import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ContentGrid, Eyebrow, Section } from './mediaUi'
import { PUBLIC_CONTENT, publicContent } from '../../social/contentLedger'
import { PILLARS, type PillarId } from '../../social/pillars'
import { BRAND_SITE_NAME } from '../../social/brand'
import { usePageMeta } from '../../social/seo'

export function ContentHubPage() {
  const all = useMemo(() => publicContent(PUBLIC_CONTENT), [])
  const [filter, setFilter] = useState<PillarId | 'all'>('all')
  const items = filter === 'all' ? all : all.filter((i) => i.pillar === filter)

  usePageMeta({
    title: `Content hub — ${BRAND_SITE_NAME}`,
    description:
      'Every Jifunze.ai lesson in one place: CVs, interviews, job applications, practical AI, money skills and professional growth.',
    path: '/content',
  })

  return (
    <Section className="py-14 sm:py-16">
      <Eyebrow>Content hub</Eyebrow>
      <h1 className="mt-3 text-[30px] font-extrabold tracking-tight sm:text-[38px]">
        Every lesson, in one place
      </h1>
      <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-zinc-300">
        Each lesson is published here as readable text as well as on the official channels, so it
        stays available whatever happens to any one platform.
      </p>

      <div className="mt-8">
        <h2 id="filter-heading" className="sr-only">
          Filter by topic
        </h2>
        <ul aria-labelledby="filter-heading" className="flex flex-wrap gap-2">
          <li>
            <button
              type="button"
              aria-pressed={filter === 'all'}
              onClick={() => setFilter('all')}
              className={`inline-flex min-h-[2.25rem] items-center rounded-full border px-3.5 text-[13px] font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6] ${
                filter === 'all'
                  ? 'border-[#7C3AED] bg-[#7C3AED] text-white'
                  : 'border-white/12 text-zinc-300 hover:border-white/25 hover:text-white'
              }`}
            >
              All ({all.length})
            </button>
          </li>
          {PILLARS.map((p) => {
            const count = all.filter((i) => i.pillar === p.id).length
            return (
              <li key={p.id}>
                <button
                  type="button"
                  aria-pressed={filter === p.id}
                  onClick={() => setFilter(p.id)}
                  className={`inline-flex min-h-[2.25rem] items-center rounded-full border px-3.5 text-[13px] font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6] ${
                    filter === p.id
                      ? 'border-[#7C3AED] bg-[#7C3AED] text-white'
                      : 'border-white/12 text-zinc-300 hover:border-white/25 hover:text-white'
                  }`}
                >
                  {p.label} ({count})
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="mt-8" aria-live="polite">
        <ContentGrid items={items} />
      </div>

      <p className="mt-10 text-[14px] text-zinc-500">
        Prefer a feed? <a className="rounded underline decoration-white/25 underline-offset-4 hover:text-zinc-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]" href="/feed.xml">Subscribe by RSS</a>, or{' '}
        <Link className="rounded underline decoration-white/25 underline-offset-4 hover:text-zinc-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]" to="/social">follow on any official channel</Link>.
      </p>
    </Section>
  )
}
