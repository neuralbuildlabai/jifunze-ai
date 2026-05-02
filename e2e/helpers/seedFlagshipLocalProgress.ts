import type { Page } from '@playwright/test'

/**
 * Seeds device-local flagship progress so gated sessions open in Playwright (anonymous).
 * Matches `jifunze.flagshipCourseProgress.v1:` keys in `src/lib/flagshipCourseLocalProgress.ts`.
 */
export async function seedFlagshipLocalProgress(
  page: Page,
  courseSlug: string,
  completedSessionIds: string[],
): Promise<void> {
  await page.goto('/')
  await page.evaluate(
    ({ courseSlug: slug, ids }) => {
      const key = `jifunze.flagshipCourseProgress.v1:${slug}`
      const payload = {
        version: 1,
        completedSessionIds: ids,
        startedAt: new Date().toISOString(),
      }
      window.localStorage.setItem(key, JSON.stringify(payload))
    },
    { courseSlug, ids: completedSessionIds },
  )
}
