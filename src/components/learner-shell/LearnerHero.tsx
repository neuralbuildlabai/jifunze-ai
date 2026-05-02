import type { ReactNode } from 'react'

/** Presentational hero — import from this file when wiring marketing/course landings; not re-exported from `index.ts` yet. */

type Props = {
  eyebrow?: string
  title: string
  subtitle?: string
  children?: ReactNode
}

/** Course or marketing hero — restrained typography, optional CTAs as children. */
export function LearnerHero({ eyebrow, title, subtitle, children }: Props) {
  return (
    <div className="space-y-4">
      {eyebrow ? <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">{eyebrow}</p> : null}
      <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-[1.75rem] sm:leading-snug">{title}</h1>
      {subtitle ? <p className="max-w-2xl text-[15px] leading-relaxed text-zinc-400">{subtitle}</p> : null}
      {children ? <div className="flex flex-wrap gap-3 pt-2">{children}</div> : null}
    </div>
  )
}
