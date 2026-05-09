import type { StandaloneCourseLesson } from '../../data/courses/practicalMathematicsCourseTypes'

/** One clean duration label from minutes (e.g. "10 min", "1 hour", "2.5 hours"). Empty when minutes are 0 or negative. */
export function formatHoursFromMinutes(totalMinutes: number): string {
  if (totalMinutes <= 0) return ''
  if (totalMinutes < 60) return `${totalMinutes} min`
  const h = totalMinutes / 60
  const rounded = Math.round(h * 2) / 2
  if (rounded === 1) return '1 hour'
  if (Number.isInteger(rounded)) return `${rounded} hours`
  return `${rounded.toFixed(1)} hours`
}

/** Course-level duration line (uses minutes when under one hour). */
export function formatCourseDurationLabel(estimatedHours: number): string {
  if (estimatedHours > 0 && estimatedHours < 1) {
    const mins = Math.max(1, Math.round(estimatedHours * 60))
    return `About ${mins} min`
  }
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
