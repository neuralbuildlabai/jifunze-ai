import type { ReactNode } from 'react'
import { learnerShellTokens } from './learnerShellTokens'

type Props = {
  title?: string
  purpose?: string
  primaryAction?: ReactNode
  children: ReactNode
  footer?: ReactNode
  /** Wider layout for dense tables (e.g. reports). */
  wide?: boolean
}

/**
 * Consistent learner page frame: title, one-line purpose, optional primary action, main body, optional footer.
 */
export function LearnerPageShell({ title, purpose, primaryAction, children, footer, wide }: Props) {
  const max = wide ? 'max-w-5xl' : 'max-w-3xl'
  return (
    <div className={`mx-auto w-full ${max} space-y-8`}>
      {title || purpose || primaryAction ? (
        <header className={`space-y-3 pb-6 ${learnerShellTokens.workspaceHeaderBorder}`}>
          {title ? <h1 className={learnerShellTokens.pageTitle}>{title}</h1> : null}
          {purpose ? <p className={learnerShellTokens.pagePurpose}>{purpose}</p> : null}
          {primaryAction ? <div className="flex flex-wrap gap-3 pt-1">{primaryAction}</div> : null}
        </header>
      ) : null}
      <div className="space-y-8">{children}</div>
      {footer ? (
        <footer className="border-t border-[color:var(--jf-border)] pt-6 text-sm text-[color:var(--jf-muted)]">{footer}</footer>
      ) : null}
    </div>
  )
}
