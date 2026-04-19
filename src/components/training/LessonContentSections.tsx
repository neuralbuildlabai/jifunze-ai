import type { ReactNode } from 'react'
import type { TrainingLessonRow } from '../../training/trainingTypes'

const sectionClass =
  'rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 ring-1 ring-white/[0.04]'

function Section({ label, children }: { label: string; children: ReactNode }) {
  if (children == null) return null
  const s = typeof children === 'string' ? children.trim() : ''
  if (typeof children === 'string' && s === '') return null
  return (
    <section className={sectionClass}>
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">{label}</p>
      <div className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-zinc-200">{children}</div>
    </section>
  )
}

/**
 * Renders structured lesson fields; falls back gracefully when older plans only have `content` + objectives.
 */
export function LessonContentSections(props: { lesson: TrainingLessonRow; variant?: 'full' | 'fast' }) {
  const { lesson, variant = 'full' } = props
  const hasStructured =
    Boolean(lesson.lesson_summary?.trim()) ||
    Boolean(lesson.practical_example?.trim()) ||
    Boolean(lesson.action_exercise?.trim()) ||
    Boolean(lesson.reflection_prompt?.trim()) ||
    Boolean(lesson.mistakes_to_avoid?.trim())

  if (variant === 'fast') {
    return (
      <>
        <div className="rounded-lg border border-sky-500/25 bg-sky-950/25 px-3 py-2 text-xs text-sky-100/90">
          <span className="font-semibold text-white">Fast review mode</span>
          <span className="text-sky-200/80">
            {' '}
            — skim summary + action + takeaway; open full lesson anytime by removing <code>?fast=1</code>.
          </span>
        </div>
        {lesson.lesson_summary ? <Section label="Purpose & overview">{lesson.lesson_summary}</Section> : null}
        {!lesson.lesson_summary && lesson.objectives ? <Section label="Learning objectives">{lesson.objectives}</Section> : null}
        {!lesson.lesson_summary && !lesson.objectives ? (
          <Section label="Core instruction (abbrev.)">{lesson.content.slice(0, 1200)}</Section>
        ) : null}
        {lesson.action_exercise ? <Section label="Action exercise">{lesson.action_exercise}</Section> : null}
        {lesson.takeaway ? <Section label="Takeaway">{lesson.takeaway}</Section> : null}
      </>
    )
  }

  if (!hasStructured) {
    return (
      <>
        {lesson.objectives ? (
          <section className={sectionClass}>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">Objectives</p>
            <p className="mt-2 whitespace-pre-wrap text-sm text-zinc-200">{lesson.objectives}</p>
          </section>
        ) : null}
        <section className={sectionClass}>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">Content</p>
          <div className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-zinc-200">{lesson.content}</div>
        </section>
        {lesson.takeaway ? (
          <section className={sectionClass}>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">Takeaway</p>
            <p className="mt-2 whitespace-pre-wrap text-sm text-zinc-200">{lesson.takeaway}</p>
          </section>
        ) : null}
      </>
    )
  }

  return (
    <>
      {lesson.objectives ? (
        <Section label="Learning objectives">{lesson.objectives}</Section>
      ) : null}
      {lesson.lesson_summary ? <Section label="Purpose & overview">{lesson.lesson_summary}</Section> : null}
      <Section label="Core instruction">{lesson.content}</Section>
      {lesson.practical_example ? (
        <Section label="Worked example">{lesson.practical_example}</Section>
      ) : null}
      {lesson.action_exercise ? <Section label="Action exercise">{lesson.action_exercise}</Section> : null}
      {lesson.reflection_prompt ? <Section label="Reflection">{lesson.reflection_prompt}</Section> : null}
      {lesson.mistakes_to_avoid ? <Section label="Mistakes to avoid">{lesson.mistakes_to_avoid}</Section> : null}
      {lesson.takeaway ? <Section label="Takeaway">{lesson.takeaway}</Section> : null}
    </>
  )
}

export function LessonMetaBar({ lesson }: { lesson: TrainingLessonRow }) {
  if (lesson.estimated_minutes == null) return null
  return (
    <p className="text-[11px] text-zinc-500">
      Estimated time: <span className="text-zinc-400">{lesson.estimated_minutes} min</span>
    </p>
  )
}
