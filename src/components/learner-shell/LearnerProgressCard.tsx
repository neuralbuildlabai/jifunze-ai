import type { ReactNode } from 'react'
import { learnerShellTokens } from './learnerShellTokens'

/** Compact progress block — import from this file when needed; not re-exported from `index.ts` yet. */

type Props = {
  title?: string
  percent: number
  lines: ReactNode[]
  action?: ReactNode
  'data-testid'?: string
}

/** Compact progress summary for dashboard or course sidebar contexts. */
export function LearnerProgressCard({
  title = 'Progress',
  percent,
  lines,
  action,
  'data-testid': testId,
}: Props) {
  return (
    <section className={learnerShellTokens.card} data-testid={testId}>
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">{title}</p>
      <p className="mt-2 font-mono text-2xl font-semibold tabular-nums text-zinc-900">{percent}%</p>
      <ul className="mt-3 space-y-1.5 text-sm text-stone-600">
        {lines.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>
      {action ? <div className="mt-4">{action}</div> : null}
    </section>
  )
}
