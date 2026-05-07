import type { ReactNode } from 'react'
import { learnerShellTokens } from './learnerShellTokens'

type Props = {
  email: string
  signOut: ReactNode
  children?: ReactNode
}

export function LearnerAccountPanel({ email, signOut, children }: Props) {
  return (
    <section className={learnerShellTokens.card} data-testid="learner-account-panel">
      <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">Account</h2>
      <p className="mt-2 text-sm text-zinc-900">{email}</p>
      {children ? <div className="mt-4 space-y-3">{children}</div> : null}
      <div className="mt-5">{signOut}</div>
    </section>
  )
}
