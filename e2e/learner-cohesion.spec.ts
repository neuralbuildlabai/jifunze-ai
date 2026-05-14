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

  test('Dashboard avoids retired workspace/studio marketing terms', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page.getByTestId('learner-dashboard-home')).toBeVisible({ timeout: 20_000 })
    const txt = (await page.locator('body').innerText()).toLowerCase()
    expect(txt).not.toContain('jifunze ai studio')
    expect(txt).not.toContain('growth intelligence')
    expect(txt).not.toContain('platform ops')
    expect(txt).not.toContain('create your first post')
  })

  test('/trends redirects to public catalog', async ({ page }) => {
    await page.goto('/trends')
    await expect(page).toHaveURL(/\/learn$/, { timeout: 15_000 })
    await expect(page.getByTestId('learning-discovery-hub')).toBeVisible()
  })
})
