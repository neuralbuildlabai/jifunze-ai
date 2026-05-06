import type { ReactNode } from 'react'

type Props = { children: ReactNode }

/** Practice sessions: task-first visual grouping (no lesson-style hero chrome). */
export function PracticeLabShell({ children }: Props) {
  return (
    <div className="min-w-0 space-y-8 border-t border-[color:var(--jf-border)] pt-6 first:border-t-0 first:pt-0">{children}</div>
  )
}
