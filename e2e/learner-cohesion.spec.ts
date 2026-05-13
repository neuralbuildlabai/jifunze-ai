import { expect, test } from '@playwright/test'
import { applyPublicE2eMaintenanceBypass } from './helpers/publicE2eMaintenanceBypass'

test.describe('Learner surfaces cohesion (public / demo)', () => {
  test.beforeEach(async ({ page }) => {
    await applyPublicE2eMaintenanceBypass(page)
  })

  test('My Learning does not embed the full public discovery catalog', async ({ page }) => {
    await page.goto('/my-learning')
    await expect(page.getByTestId('learner-my-learning-home')).toBeVisible({ timeout: 20_000 })
    await expect(page.getByTestId('learning-discovery-hub')).toHaveCount(0)
  })

  test('Reports page does not embed the full public discovery catalog', async ({ page }) => {
    await page.goto('/reports')
    await expect(page.getByTestId('learner-reports-page')).toBeVisible({ timeout: 20_000 })
    await expect(page.getByTestId('learning-discovery-hub')).toHaveCount(0)
  })

  test('Free starters expose flow anchors for section resume URLs', async ({ page }) => {
    await page.goto('/learn/free/ai-at-work-chatgpt')
    await expect(page.getByTestId('free-starter-ai-at-work-chatgpt-page')).toBeVisible({ timeout: 20_000 })
    await expect(page.locator('#flow-1')).toBeVisible()
    await expect(page.locator('#flow-2')).toBeVisible()
  })
})
