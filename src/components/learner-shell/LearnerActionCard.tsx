import type { ReactNode } from 'react'
import { learnerShellTokens } from './learnerShellTokens'

type Props = {
  eyebrow?: string
  title: string
  description?: ReactNode
  footer?: ReactNode
  action?: ReactNode
  secondaryAction?: ReactNode
  'data-testid'?: string
}

/** One card, one purpose, one primary action. */
export function LearnerActionCard({ eyebrow, title, description, footer, action, secondaryAction, 'data-testid': testId }: Props) {
  return (
    <section className={learnerShellTokens.card} data-testid={testId}>
      {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">{eyebrow}</p> : null}
      <h2 className={`${learnerShellTokens.cardTitle} ${eyebrow ? 'mt-2' : ''}`}>{title}</h2>
      {description ? <div className={learnerShellTokens.cardMuted}>{description}</div> : null}
      {footer ? <div className="mt-3 text-sm text-zinc-500">{footer}</div> : null}
      <div className="mt-5 flex flex-wrap gap-2">
        {action}
        {secondaryAction}
      </div>
    </section>
  )
}
