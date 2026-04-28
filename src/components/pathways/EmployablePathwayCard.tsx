import { Link } from 'react-router-dom'
import type { EmployablePathway } from '../../data/learning/employablePathwaysTypes'
import { FLAGSHIP_SCHOOLS } from '../../data/learning/flagshipCoursesCatalog'
import { getPathwayAvailableCourses } from '../../lib/pathwayNextAction'

const shell =
  'group flex h-full min-h-[16.5rem] flex-col rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] shadow-[var(--jf-shadow-soft)] ring-1 ring-black/[0.04] transition hover:border-white/[0.14] hover:bg-[color:var(--jf-surface-elevated)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)] sm:min-h-[17.5rem]'

function statusPill(pathway: EmployablePathway): { label: string; className: string } {
  if (pathway.status === 'coming_soon') {
    return {
      label: 'Coming soon',
      className: 'border-amber-400/35 bg-amber-500/[0.12] text-amber-100/95',
    }
  }
  if (pathway.status === 'planned') {
    return {
      label: 'Planned',
      className: 'border-white/[0.12] bg-white/[0.05] text-[color:var(--jf-muted)]',
    }
  }
  return {
    label: 'Live + roadmap',
    className: 'border-emerald-400/25 bg-emerald-500/[0.1] text-emerald-100/90',
  }
}

/**
 * Browse card for /paths and homepage — not the authenticated pathway progress panel.
 */
export function EmployablePathwayCard({ pathway, compact = false }: { pathway: EmployablePathway; compact?: boolean }) {
  const available = getPathwayAvailableCourses(pathway).length
  const planned = pathway.plannedCourseSlugs.length
  const portfolioCount = pathway.portfolioOutputs.length
  const pill = statusPill(pathway)
  const pad = compact ? 'p-5' : 'p-6 sm:p-7'
  const skillsPreview = pathway.skillsGained.slice(0, 3).join(' · ')
  const rolesPreview = pathway.possibleRoles.slice(0, 2).join(' · ')

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
      <p className="mt-2 text-left text-[11px] leading-relaxed text-[color:var(--jf-muted)]">
        <span className="font-semibold text-[color:var(--jf-subtle)]">Skills: </span>
        <span className="line-clamp-2">{skillsPreview}</span>
      </p>
      <p className="mt-1.5 text-left text-[11px] leading-relaxed text-[color:var(--jf-muted)]">
        <span className="font-semibold text-[color:var(--jf-subtle)]">Roles: </span>
        <span className="line-clamp-2">{rolesPreview}</span>
      </p>
      <div className="mt-auto flex flex-wrap gap-x-3 gap-y-1 border-t border-[color:var(--jf-border)] pt-4 text-[11px] tabular-nums text-[color:var(--jf-subtle)]">
        <span>
          <span className="font-semibold text-[color:var(--jf-muted)]">{available}</span> courses live
        </span>
        <span aria-hidden className="text-[color:var(--jf-border)]">
          ·
        </span>
        <span>
          <span className="font-semibold text-[color:var(--jf-muted)]">{planned}</span> planned
        </span>
        <span aria-hidden className="text-[color:var(--jf-border)]">
          ·
        </span>
        <span>
          <span className="font-semibold text-[color:var(--jf-muted)]">{portfolioCount}</span> portfolio themes
        </span>
      </div>
      <span className="mt-4 text-left text-[12px] font-semibold text-[color:var(--jf-text)] underline-offset-2 group-hover:underline">Open pathway →</span>
    </Link>
  )
}
