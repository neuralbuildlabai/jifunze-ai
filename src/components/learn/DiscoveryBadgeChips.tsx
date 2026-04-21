import { badgeLabel, type DiscoveryBadgeToken } from '../../data/learning/standaloneCourseDiscoveryMeta'

const CHIP_TONE: Record<'dark' | 'light', string> = {
  dark: 'border-white/[0.08] bg-white/[0.03] text-zinc-300',
  light: 'border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)] text-[color:var(--jf-muted)]',
}

export function DiscoveryBadgeChips(props: {
  tokens: DiscoveryBadgeToken[]
  max?: number
  testId?: string
  tone?: 'dark' | 'light'
}) {
  const { tokens, max = 6, testId = 'discovery-badge-row', tone = 'dark' } = props
  const shown = tokens.slice(0, max)
  const chipClass = CHIP_TONE[tone]
  return (
    <div className="flex flex-wrap gap-1.5" data-testid={testId}>
      {shown.map((t) => (
        <span
          key={t}
          className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${chipClass}`}
        >
          {badgeLabel(t)}
        </span>
      ))}
    </div>
  )
}
