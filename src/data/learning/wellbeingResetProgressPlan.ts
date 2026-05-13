/**
 * Canonical day anchors for the 5-Day Mental Wellbeing Reset — used for resume, progress %, and in-page anchors.
 */

export const WELLBEING_RESET_COURSE_SLUG = '5-day-mental-wellbeing-reset' as const

export const WELLBEING_RESET_DAY_SLUGS = [
  'day-1',
  'day-2',
  'day-3',
  'day-4',
  'day-5',
  'day-reflection',
] as const

export type WellbeingResetDaySlug = (typeof WELLBEING_RESET_DAY_SLUGS)[number]

export const WELLBEING_RESET_DAY_COUNT = WELLBEING_RESET_DAY_SLUGS.length

export function wellbeingProgressPercent(completedDays: readonly string[]): number {
  const set = new Set(completedDays)
  let n = 0
  for (const d of WELLBEING_RESET_DAY_SLUGS) {
    if (set.has(d)) n += 1
  }
  return Math.round((n / WELLBEING_RESET_DAY_COUNT) * 100)
}

export function nextWellbeingDaySlug(completedDays: readonly string[]): WellbeingResetDaySlug | null {
  const set = new Set(completedDays)
  for (const d of WELLBEING_RESET_DAY_SLUGS) {
    if (!set.has(d)) return d
  }
  return null
}

export function wellbeingDayAnchor(daySlug: string): string {
  return `#${daySlug}`
}
