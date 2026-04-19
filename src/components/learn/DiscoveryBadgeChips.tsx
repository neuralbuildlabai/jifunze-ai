import { badgeLabel, type DiscoveryBadgeToken } from '../../data/learning/standaloneCourseDiscoveryMeta'

export function DiscoveryBadgeChips(props: { tokens: DiscoveryBadgeToken[]; max?: number; testId?: string }) {
  const { tokens, max = 6, testId = 'discovery-badge-row' } = props
  const shown = tokens.slice(0, max)
  return (
    <div className="flex flex-wrap gap-1.5" data-testid={testId}>
      {shown.map((t) => (
        <span
          key={t}
          className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-300"
        >
          {badgeLabel(t)}
        </span>
      ))}
    </div>
  )
}
