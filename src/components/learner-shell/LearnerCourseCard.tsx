import { Link } from 'react-router-dom'
import type { FlagshipCourse } from '../../data/learning/flagshipCoursesCatalog'
import { learnerShellTokens } from './learnerShellTokens'

type Props = {
  course: FlagshipCourse
  /** Overrides catalog card when the allowlisted course has fixed learner copy. */
  subtitleOverride?: string
  metaLine?: string
  ctaLabel?: string
  testId?: string
  /** Public catalog uses jf CSS variables; workspace uses learner shell tokens. */
  surface?: 'public' | 'workspace'
}

/**
 * Single complete-course card — minimal chrome, no school accent rail.
 */
export function LearnerCourseCard({
  course,
  subtitleOverride,
  metaLine,
  ctaLabel = 'Open course',
  testId,
  surface = 'public',
}: Props) {
  const subtitle = subtitleOverride ?? course.subtitle
  const shell =
    surface === 'workspace'
      ? `${learnerShellTokens.card} ring-1 ring-white/[0.02]`
      : 'rounded-xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] px-5 py-5 shadow-[var(--jf-shadow-soft)] ring-1 ring-black/[0.03] sm:px-6'
  const eyebrow = surface === 'workspace' ? 'text-zinc-500' : 'text-[color:var(--jf-muted)]'
  const title = surface === 'workspace' ? 'text-white' : 'text-[color:var(--jf-text)]'
  const body = surface === 'workspace' ? 'text-zinc-400' : 'text-[color:var(--jf-muted)]'
  const meta = surface === 'workspace' ? 'text-zinc-500' : 'text-[color:var(--jf-subtle)]'
  const btn =
    surface === 'workspace'
      ? learnerShellTokens.primaryButton
      : 'inline-flex min-h-[2.5rem] items-center justify-center rounded-full bg-[var(--jf-brand)] px-5 py-2 text-sm font-semibold text-zinc-950 shadow-[var(--jf-shadow-soft)] transition hover:bg-[var(--jf-brand-hover)]'

  return (
    <article data-testid={testId} className={shell}>
      <p className={`text-[11px] font-medium uppercase tracking-[0.12em] ${eyebrow}`}>{course.title}</p>
      <h2 className={`mt-2 text-lg font-semibold ${title}`}>
        {course.slug === 'ai-essentials' ? 'AI and Digital Fluency — Course 1' : course.levelRange}
      </h2>
      <p className={`mt-3 text-sm leading-relaxed ${body}`}>{subtitle}</p>
      {metaLine ? <p className={`mt-4 text-[13px] ${meta}`}>{metaLine}</p> : null}
      <Link to={`/learn/courses/${course.slug}`} className={`${btn} mt-6 inline-flex w-full justify-center sm:w-auto`}>
        {ctaLabel}
      </Link>
    </article>
  )
}
