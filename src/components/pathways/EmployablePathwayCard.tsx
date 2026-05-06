import { Link } from 'react-router-dom'
import type { EmployablePathway } from '../../data/learning/employablePathwaysTypes'
import { FLAGSHIP_SCHOOLS } from '../../data/learning/flagshipCoursesCatalog'
import { getPathwayAvailableCourses } from '../../lib/pathwayNextAction'

const shell =
  'group flex h-full min-h-[16.5rem] flex-col rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] shadow-[var(--jf-shadow-soft)] ring-1 ring-stone-900/[0.04] transition hover:-translate-y-0.5 hover:border-stone-300/80 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)] sm:min-h-[17.5rem]'

function statusPill(pathway: EmployablePathway): { label: string; className: string } {
  if (pathway.status === 'coming_soon') {
    return {
      label: 'Coming soon',
      className: 'border-amber-200/70 bg-amber-50 text-amber-950/90',
    }
  }
  if (pathway.status === 'planned') {
    return {
      label: 'Planned',
      className: 'border-[color:var(--jf-border)] bg-stone-50 text-[color:var(--jf-muted)]',
    }
  }
  return {
    label: 'Live + roadmap',
    className: 'border-emerald-200/70 bg-emerald-50 text-emerald-900/90',
  }
}

/**
 * Browse card for /paths — not the authenticated pathway progress panel.
 */
export function EmployablePathwayCard({
  pathway,
  compact = false,
  presentation = 'default',
}: {
  pathway: EmployablePathway
  compact?: boolean
  presentation?: 'default' | 'browse'
}) {
  const available = getPathwayAvailableCourses(pathway).length
  const planned = pathway.plannedCourseSlugs.length
  const pill = statusPill(pathway)
  const pad = compact ? 'p-5' : 'p-6 sm:p-7'

  if (presentation === 'browse') {
    return (
      <Link to={`/paths/${pathway.slug}`} className={`${shell} ${pad}`}>
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:var(--jf-muted)]">
          {FLAGSHIP_SCHOOLS[pathway.schoolId].shortLabel}
        </p>
        <h3 className="mt-3 text-left text-lg font-semibold tracking-tight text-[color:var(--jf-text)] group-hover:text-[color:var(--jf-text)] sm:text-[1.05rem]">
          {pathway.shortTitle}
        </h3>
        <p className="mt-2 line-clamp-3 text-left text-[13px] leading-relaxed text-[color:var(--jf-muted)]">{pathway.description}</p>
        <p className="mt-4 text-left text-[12px] leading-snug text-[color:var(--jf-muted)]">
          <span className="font-medium text-[color:var(--jf-text)]">Best for: </span>
          {pathway.targetLearner}
        </p>
        <span className="mt-auto pt-4 text-left text-[12px] font-semibold text-[color:var(--jf-text)] underline-offset-2 group-hover:underline">Open pathway</span>
      </Link>
    )
  }

  return (
    <Link to={`/paths/${pathway.slug}`} className={`${shell} ${pad}`}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:var(--jf-muted)]">
          {FLAGSHIP_SCHOOLS[pathway.schoolId].shortLabel}
        </p>
        <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] ${pill.className}`}>{pill.label}</span>
      </div>
      <h3 className="mt-3 text-left text-lg font-semibold tracking-tight text-[color:var(--jf-text)] group-hover:text-[color:var(--jf-text)] sm:text-[1.05rem]">
        {pathway.shortTitle}
      </h3>
      <p className="mt-2 line-clamp-2 text-left text-[13px] leading-relaxed text-[color:var(--jf-muted)]">{pathway.description}</p>
      <p className="mt-3 text-left text-[12px] leading-snug text-[color:var(--jf-subtle)]">
        <span className="font-medium text-[color:var(--jf-muted)]">For: </span>
        <span className="line-clamp-2 text-[color:var(--jf-muted)]">{pathway.targetLearner}</span>
      </p>
      <div className="mt-auto border-t border-[color:var(--jf-border)] pt-4 text-[11px] text-[color:var(--jf-subtle)]">
        <span className="font-semibold tabular-nums text-[color:var(--jf-muted)]">{available}</span> courses available now
        {planned > 0 ? (
          <span className="text-[color:var(--jf-muted)]">
            {' '}
            · <span className="font-semibold tabular-nums">{planned}</span> planned
          </span>
        ) : null}
      </div>
      <span className="mt-4 text-left text-[12px] font-semibold text-[color:var(--jf-text)] underline-offset-2 group-hover:underline">Open pathway →</span>
    </Link>
  )
}
