import { Link } from 'react-router-dom'
import type { EmployablePathway } from '../../data/learning/employablePathwaysTypes'

/** Browse pathway tile — title, one line, best-for, single CTA (public catalog surface). */
export function LearnerPathwayCard({ pathway }: { pathway: EmployablePathway }) {
  return (
    <Link
      to={`/paths/${pathway.slug}`}
      className="block rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] p-5 shadow-[var(--jf-shadow-soft)] ring-1 ring-stone-900/[0.03] transition hover:-translate-y-0.5 hover:border-stone-300/80 hover:shadow-lg sm:p-6"
    >
      <h2 className="text-lg font-semibold tracking-tight text-[color:var(--jf-text)]">{pathway.shortTitle}</h2>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[color:var(--jf-muted)]">{pathway.description}</p>
      <p className="mt-4 text-sm text-[color:var(--jf-muted)]">
        <span className="font-medium text-[color:var(--jf-text)]">Best for:</span> {pathway.targetLearner}
      </p>
      <span className="mt-5 inline-block text-sm font-semibold text-[color:var(--jf-text)] underline-offset-2 hover:underline">Open pathway</span>
    </Link>
  )
}
