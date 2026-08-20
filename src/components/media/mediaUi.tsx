import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import type { ContentItem } from '../../social/contentLedger'
import { pillarById } from '../../social/pillars'

export function Section({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return <section className={`mx-auto w-full max-w-5xl px-5 sm:px-6 ${className}`}>{children}</section>
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#A78BFA]">{children}</p>
  )
}

export function PillarBadge({ pillar }: { pillar: ContentItem['pillar'] }) {
  const p = pillarById(pillar)
  return (
    <Link
      to={`/topics/${p.slug}`}
      className="inline-flex items-center rounded-full border border-[#7C3AED]/40 bg-[#7C3AED]/10 px-2.5 py-0.5 text-[12px] font-medium text-[#C4B5FD] transition hover:bg-[#7C3AED]/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]"
    >
      {p.label}
    </Link>
  )
}

export function ContentCard({ item }: { item: ContentItem }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-[#7C3AED]/50 hover:bg-white/[0.05]">
      <PillarBadge pillar={item.pillar} />
      <h3 className="mt-3 text-[17px] font-semibold leading-snug tracking-tight text-white">
        <Link
          to={`/content/${item.slug}`}
          className="rounded after:absolute after:inset-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8B5CF6]"
        >
          {item.title}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-[14px] leading-relaxed text-zinc-400">{item.summary}</p>
      <p className="mt-4 text-[13px] font-medium text-[#A78BFA]">Read the steps →</p>
    </article>
  )
}

export function ContentGrid({ items }: { items: readonly ContentItem[] }) {
  if (!items.length) {
    return (
      <p className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-5 py-8 text-center text-[14px] text-zinc-400">
        Nothing published under this topic yet.
      </p>
    )
  }
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.id} className="relative">
          <ContentCard item={item} />
        </li>
      ))}
    </ul>
  )
}
