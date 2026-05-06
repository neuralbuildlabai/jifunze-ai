import type { ReactNode } from 'react'

type Props = { children: ReactNode }

/** Main column wrapper for guided lesson flow — calmer reading width. */
export function GuidedLessonShell({ children }: Props) {
  return (
    <div className="jf-reading-surface mx-auto min-w-0 max-w-[42rem] space-y-7 text-[color:var(--jf-text)] sm:space-y-8">{children}</div>
  )
}
