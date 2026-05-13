import { expect, test } from '@playwright/test'
import { applyPublicE2eMaintenanceBypass } from './helpers/publicE2eMaintenanceBypass'

const FREE_STARTER_EMBEDDED_INDEX_PATHS = [
  '/course-assets/interactive/smart-workflows-with-ai/content/index.html',
  '/course-assets/interactive/business-analytics-decision-making/content/index.html',
  '/course-assets/interactive/ai-at-work-chatgpt/content/index.html',
  '/course-assets/interactive/5-day-mental-wellbeing-reset/content/index.html',
] as const

test.describe('Free microlearning courses (smoke)', () => {
  test.beforeEach(async ({ page }) => {
    await applyPublicE2eMaintenanceBypass(page)
  })

  test('each microlearning index.html is reachable as a static asset', async ({ request }) => {
    for (const path of FREE_STARTER_EMBEDDED_INDEX_PATHS) {
      const res = await request.get(path)
      expect(res.ok(), `${path} should return 200`).toBeTruthy()
      const ct = res.headers()['content-type'] ?? ''
      expect(ct).toMatch(/text\/html/)
      const body = (await res.text()).toLowerCase()
      expect(body.includes('rise_frontend'), `${path} should not ship legacy vendor HTML comments`).toBe(false)
      expect(body.includes('articulate logo'), `${path} should not embed vendor logo label copy`).toBe(false)
    }
  })

  test('legacy /learn/business-analytics-native-modules redirects to free microlearning route', async ({ page }) => {
    await page.goto('/learn/business-analytics-native-modules')
    await expect(page).toHaveURL(/\/learn\/free\/business-analytics-decision-making$/)
  })

  test('legacy /learn/business-analytics-decision-making redirects to free microlearning route', async ({ page }) => {
    await page.goto('/learn/business-analytics-decision-making')
    await expect(page).toHaveURL(/\/learn\/free\/business-analytics-decision-making$/)
  })

  test('public /learn does not list a duplicate native Business Analytics full-course card', async ({ page }) => {
    await page.goto('/learn')
    await expect(page.getByTestId('learning-discovery-hub')).toBeVisible({ timeout: 20_000 })
    await expect(page.getByTestId('discovery-full-course-business-analytics-decision-making')).toHaveCount(0)
    await expect(page.getByTestId('discovery-full-course-business-process-automation-for-work')).toHaveCount(0)
  })
})
