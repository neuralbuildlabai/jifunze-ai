import type { ReactNode } from 'react'

type Props = { children: ReactNode }

/** Main column wrapper for guided lesson flow — calmer reading width. */
export function GuidedLessonShell({ children }: Props) {
  return <div className="jf-reading-surface min-w-0 space-y-6">{children}</div>
}
