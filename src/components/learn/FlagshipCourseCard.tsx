import { Link } from 'react-router-dom'
import type { FlagshipCourse, FlagshipSchool } from '../../data/learning/flagshipCoursesCatalog'
import { FLAGSHIP_SCHOOLS } from '../../data/learning/flagshipCoursesCatalog'

const SCHOOL_ACCENT: Record<FlagshipSchool['accent'], string> = {
  slate: 'border-l-slate-400/50',
  stone: 'border-l-amber-800/25',
  neutral: 'border-l-neutral-500/40',
  zinc: 'border-l-zinc-500/45',
}

function schoolForCourse(course: FlagshipCourse) {
  return FLAGSHIP_SCHOOLS[course.schoolId]
}

export function FlagshipCourseCard({
  course,
  testId,
  ctaLabel = 'Explore course',
}: {
  course: FlagshipCourse
  testId?: string
  ctaLabel?: string
}) {
  const school = schoolForCourse(course)
  const leftAccent = SCHOOL_ACCENT[school.accent]

  return (
    <article
      data-testid={testId}
      className={`group flex h-full flex-col rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] shadow-[var(--jf-shadow-soft)] ring-1 ring-black/[0.03] transition-colors duration-200 hover:border-white/[0.14] hover:bg-[color:var(--jf-surface-elevated)] ${leftAccent} border-l-[3px]`}
    >
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--jf-muted)]">{school.shortLabel}</p>
        <h3 className="mt-2 text-[17px] font-semibold leading-snug tracking-tight text-[color:var(--jf-text)]">{course.title}</h3>
        <p className="mt-2 flex-1 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">{course.subtitle}</p>

        <p className="mt-4 text-[11px] font-medium text-[color:var(--jf-subtle)]">
          Depth: <span className="text-[color:var(--jf-text)]">{course.levelRange}</span>
        </p>

        <ul className="mt-3 space-y-1.5 border-t border-[color:var(--jf-border)] pt-4">
          {course.exampleOutputs.map((line) => (
            <li key={line} className="flex gap-2 text-[12px] leading-snug text-[color:var(--jf-muted)]">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[color:var(--jf-muted)]/80" aria-hidden />
              <span>{line}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5">
          <Link
            to={`/learn/courses/${course.slug}`}
            className="inline-flex items-center text-[13px] font-semibold text-[color:var(--jf-text)] underline-offset-4 transition group-hover:underline"
          >
            {ctaLabel}
            <span className="ml-1 transition group-hover:translate-x-0.5" aria-hidden>
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  )
}
