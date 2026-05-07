import type { StandaloneCourseLesson } from '../../data/courses/practicalMathematicsCourseTypes'

/** One clean duration label from minutes (e.g. "2.5 hours", "3 hours"). */
export function formatHoursFromMinutes(totalMinutes: number): string {
  const h = totalMinutes / 60
  const rounded = Math.round(h * 2) / 2
  if (rounded === 1) return '1 hour'
  if (Number.isInteger(rounded)) return `${rounded} hours`
  return `${rounded.toFixed(1)} hours`
}

/** Course-level duration line. */
export function formatCourseDurationLabel(estimatedHours: number): string {
  const n = Number.isInteger(estimatedHours) ? String(estimatedHours) : estimatedHours.toFixed(1).replace(/\.0$/, '')
  return `About ${n} hours`
}

export function truncateWords(text: string, maxWords: number): string {
  const w = text.trim().split(/\s+/)
  if (w.length <= maxWords) return text.trim()
  return `${w.slice(0, maxWords).join(' ')}…`
}

export type LessonPreview = {
  takeaway: string
  summary?: string
  practiceLine?: string
}

/** Richer lesson preview from structured lesson data (no full block render). */
export function buildLessonPreview(lesson: StandaloneCourseLesson): LessonPreview {
  const takeaway = lesson.learnerGoal.trim()
  const concept = lesson.blocks.find((b) => b.type === 'concept_explanation' && b.content?.trim())
  let summary = concept?.content?.replace(/\s+/g, ' ').trim() ?? ''
  if (summary.length > 200) summary = `${summary.slice(0, 197)}…`
  const practiceBlock = lesson.blocks.find((b) => b.type === 'practice_task' || b.type === 'guided_practice')
  let practiceLine = practiceBlock?.title?.trim()
  if (!practiceLine && practiceBlock?.learnerTask) {
    practiceLine = practiceBlock.learnerTask.replace(/\s+/g, ' ').trim()
    if (practiceLine.length > 100) practiceLine = `${practiceLine.slice(0, 97)}…`
  }
  return {
    takeaway,
    summary: summary || undefined,
    practiceLine: practiceLine || undefined,
  }
}
