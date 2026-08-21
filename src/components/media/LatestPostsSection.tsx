import { useEffect, useState } from 'react'
import { loadPublicFeed, type PublicFeed } from '../../services/publicFeed/publicFeedData'
import { socialAccount } from '../../social/socialAccounts'
import { pillarById } from '../../social/pillars'

/**
 * "Latest posts" — the public feed of Jifunze's own platform posts, rendered from the cached
 * publication store. Every state is honest:
 *   loading · live · stale (metrics older than 48h, labeled) · empty (nothing published yet) ·
 *   unavailable (store unreachable) · not configured (build has no Supabase).
 * The browser never calls a platform API and never fabricates a post, a metric or a
 * connection status.
 */
export function LatestPostsSection() {
  const [feed, setFeed] = useState<PublicFeed | null>(null)

  useEffect(() => {
    let cancelled = false
    loadPublicFeed().then((f) => {
      if (!cancelled) setFeed(f)
    })
    return () => {
      cancelled = true
    }
  }, [])

  if (!feed) {
    return (
      <div aria-busy="true" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-40 animate-pulse rounded-2xl border border-white/10 bg-white/[0.03]" />
        ))}
      </div>
    )
  }

  if (feed.state === 'not_configured' || feed.state === 'empty') {
    return (
      <p className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-5 py-8 text-center text-[14px] leading-relaxed text-zinc-400">
        Platform posts will appear here once our publishing system goes live. Until then, every
        lesson is published as a quick read below and on the official channels listed under{' '}
        <a className="rounded underline decoration-white/25 underline-offset-4 hover:text-white" href="/social">
          Follow Us
        </a>
        .
      </p>
    )
  }

  if (feed.state === 'unavailable') {
    return (
      <p className="rounded-2xl border border-white/15 bg-white/[0.02] px-5 py-8 text-center text-[14px] leading-relaxed text-zinc-400">
        The latest-post feed is temporarily unavailable. The official accounts under{' '}
        <a className="rounded underline decoration-white/25 underline-offset-4 hover:text-white" href="/social">
          Follow Us
        </a>{' '}
        always have the newest posts.
      </p>
    )
  }

  return (
    <div>
      {feed.state === 'stale' ? (
        <p className="mb-4 rounded-xl border border-amber-400/25 bg-amber-400/5 px-4 py-2.5 text-[13px] text-amber-200/90">
          Shown from our last synchronization — engagement numbers may be out of date.
        </p>
      ) : null}
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {feed.posts.map((post) => {
          const account = socialAccount(post.platform)
          const image = post.thumbnail_url ?? post.video_poster_url
          return (
            <li key={post.id}>
              <a
                href={post.post_url}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${account.name} post — opens in a new tab`}
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:border-[#7C3AED]/50 hover:bg-white/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]"
              >
                {image ? (
                  <img src={image} alt="" className="aspect-video w-full object-cover" loading="lazy" />
                ) : (
                  <span
                    aria-hidden
                    className="flex aspect-video w-full items-center justify-center bg-[#7C3AED]/15 text-[#C4B5FD]"
                  >
                    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 13.5 12 7l7 6.5" />
                      <path d="M5 18 12 11.5 19 18" />
                    </svg>
                  </span>
                )}
                <span className="flex flex-1 flex-col p-4">
                  <span className="flex items-center gap-2 text-[12px] font-medium text-zinc-500">
                    <span>{account.name}</span>
                    {post.pillar ? (
                      <>
                        <span aria-hidden>·</span>
                        <span className="text-[#C4B5FD]">{pillarById(post.pillar).label}</span>
                      </>
                    ) : null}
                    {post.published_at ? (
                      <>
                        <span aria-hidden>·</span>
                        <time dateTime={post.published_at}>
                          {new Date(post.published_at).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                          })}
                        </time>
                      </>
                    ) : null}
                  </span>
                  {post.caption_excerpt ? (
                    <span className="mt-2 line-clamp-3 text-[14px] leading-relaxed text-zinc-300">
                      {post.caption_excerpt}
                    </span>
                  ) : null}
                  {post.metrics?.views !== undefined || post.metrics?.likes !== undefined ? (
                    <span className="mt-3 text-[12px] text-zinc-500">
                      {post.metrics.views !== undefined ? `${post.metrics.views.toLocaleString()} views` : null}
                      {post.metrics.views !== undefined && post.metrics.likes !== undefined ? ' · ' : null}
                      {post.metrics.likes !== undefined ? `${post.metrics.likes.toLocaleString()} likes` : null}
                    </span>
                  ) : null}
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
