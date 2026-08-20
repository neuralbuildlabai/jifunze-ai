import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ContentGrid, Eyebrow, PillarBadge, Section } from './mediaUi'
import { NotFoundPage } from '../NotFoundPage'
import {
  PUBLIC_CONTENT,
  contentBySlug,
  publishedPlatformLinks,
  relatedContent,
} from '../../social/contentLedger'
import { socialAccount } from '../../social/socialAccounts'
import { BRAND_SITE_NAME, BRAND_DISPLAY_NAME } from '../../social/brand'
import { absoluteUrl, usePageMeta } from '../../social/seo'

function ShareControls({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={copy}
        className="inline-flex min-h-[2.5rem] items-center rounded-full border border-white/15 px-4 text-[13px] font-medium text-zinc-200 transition hover:border-white/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]"
      >
        Copy link
      </button>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`}
        target="_blank"
        rel="noreferrer noopener"
        className="inline-flex min-h-[2.5rem] items-center rounded-full border border-white/15 px-4 text-[13px] font-medium text-zinc-200 transition hover:border-white/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]"
      >
        Share on WhatsApp
      </a>
      <span aria-live="polite" className="text-[13px] text-[#A78BFA]">
        {copied ? 'Link copied.' : ''}
      </span>
    </div>
  )
}

export function ContentDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const item = contentBySlug(slug, PUBLIC_CONTENT)

  usePageMeta({
    title: item?.seo.meta_title ?? `Not found — ${BRAND_SITE_NAME}`,
    description: item?.seo.meta_description ?? 'This lesson could not be found.',
    path: `/content/${slug ?? ''}`,
    ogType: 'article',
    noIndex: !item,
    jsonLd: item
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: item.title,
          description: item.summary,
          mainEntityOfPage: item.seo.canonical_url,
          datePublished: item.published_at ?? undefined,
          inLanguage: 'en',
          author: { '@type': 'Organization', name: BRAND_DISPLAY_NAME },
          publisher: { '@type': 'Organization', name: BRAND_DISPLAY_NAME },
          articleSection: item.pillar,
        }
      : undefined,
  })

  if (!item) return <NotFoundPage />

  const platformLinks = publishedPlatformLinks(item)
  const related = relatedContent(item, 3, PUBLIC_CONTENT)
  const url = absoluteUrl(`/content/${item.slug}`)

  return (
    <Section className="py-14 sm:py-16">
      <nav aria-label="Breadcrumb" className="text-[13px] text-zinc-500">
        <Link className="rounded hover:text-zinc-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]" to="/content">
          Content hub
        </Link>
        <span aria-hidden> / </span>
        <span className="text-zinc-400">{item.title}</span>
      </nav>

      <article className="mt-6 max-w-2xl">
        <Eyebrow>Lesson</Eyebrow>
        <h1 className="mt-3 text-[30px] font-extrabold leading-tight tracking-tight sm:text-[38px]">
          {item.title}
        </h1>
        <p className="mt-4 text-[17px] leading-relaxed text-zinc-300">{item.summary}</p>

        <div className="mt-5 flex flex-wrap items-center gap-3 text-[13px] text-zinc-500">
          <PillarBadge pillar={item.pillar} />
          {item.published_at ? (
            <span>
              Published <time dateTime={item.published_at}>{item.published_at}</time>
            </span>
          ) : null}
        </div>

        {item.correction_note ? (
          <p
            role="note"
            className="mt-6 rounded-2xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-[14px] leading-relaxed text-amber-100"
          >
            <strong className="font-semibold">Correction:</strong> {item.correction_note}
          </p>
        ) : null}

        {item.video_asset_ref ? (
          <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-black">
            {/* Captions are burned into the render, and the full text is in "The steps" below,
                so the lesson is readable without playing the video at all. */}
            <video
              className="aspect-[9/16] w-full"
              controls
              preload="none"
              poster={item.thumbnail_url ?? undefined}
              src={item.video_asset_ref}
            />
          </div>
        ) : null}

        <h2 className="mt-10 text-[13px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
          The steps
        </h2>
        <ol className="mt-4 space-y-3">
          {item.body.map((step, i) => (
            <li key={step} className="flex gap-3.5">
              <span
                aria-hidden
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#7C3AED]/20 text-[12px] font-bold text-[#C4B5FD]"
              >
                {i + 1}
              </span>
              <span className="text-[16px] leading-relaxed text-zinc-200">{step}</span>
            </li>
          ))}
        </ol>

        {item.sources.length ? (
          <>
            <h2 className="mt-10 text-[13px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
              Sources
            </h2>
            <ul className="mt-3 space-y-1.5">
              {item.sources.map((s) => (
                <li key={s.url} className="text-[14px] text-zinc-400">
                  <a
                    className="rounded underline decoration-white/25 underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]"
                    href={s.url}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {s.attribution}
                  </a>
                </li>
              ))}
            </ul>
          </>
        ) : null}

        {platformLinks.length ? (
          <>
            <h2 className="mt-10 text-[13px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
              Also posted on
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {platformLinks.map((p) => (
                <li key={`${p.platform}-${p.platform_post_id}`}>
                  <a
                    href={p.platform_post_url ?? '#'}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex min-h-[2.25rem] items-center rounded-full border border-white/12 px-3.5 text-[13px] font-medium text-zinc-300 transition hover:border-white/25 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]"
                  >
                    {socialAccount(p.platform).name}
                  </a>
                </li>
              ))}
            </ul>
          </>
        ) : null}

        <h2 className="mt-10 text-[13px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
          Share this
        </h2>
        <div className="mt-3">
          <ShareControls url={url} title={item.title} />
        </div>
      </article>

      {related.length ? (
        <section className="mt-14 border-t border-white/10 pt-8">
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
            Related lessons
          </h2>
          <div className="mt-5">
            <ContentGrid items={related} />
          </div>
        </section>
      ) : null}
    </Section>
  )
}
