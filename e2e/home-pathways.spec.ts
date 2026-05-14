import { test, expect } from '@playwright/test'
import { applyPublicE2eMaintenanceBypass } from './helpers/publicE2eMaintenanceBypass'
import { gotoPublicHomeAnonymous } from './helpers/publicHomeAnonymous'

test.describe('Public catalog pathways (learning-first)', () => {
  test.beforeEach(async ({ page }) => {
    await applyPublicE2eMaintenanceBypass(page)
  })

  test('learn hero browse CTA scrolls to available-now anchor', async ({ page }) => {
    await gotoPublicHomeAnonymous(page)
    await expect(page.getByRole('heading', { level: 1, name: /available courses.*workshops/i })).toBeVisible({
      timeout: 15_000,
    })
    await page.getByTestId('learn-hero-browse-available').click()
    await expect(page).toHaveURL(/\/learn#available-now$/)
    await expect(page.locator('#available-now')).toBeVisible()
  })

  test('/learn lists discovery microlearning cards (no legacy homepage preview strip)', async ({ page }) => {
    await gotoPublicHomeAnonymous(page)
    await expect(page.getByTestId('learning-discovery-hub')).toBeVisible({ timeout: 20_000 })
    await expect(page.getByTestId('home-available-preview-smart-workflows-with-ai')).toHaveCount(0)
    await expect(page.getByTestId('discovery-microlearning-smart-workflows-with-ai')).toBeVisible()
    await expect(page.getByTestId('discovery-microlearning-business-analytics-decision-making')).toBeVisible()
    await expect(page.getByTestId('discovery-microlearning-ai-at-work-chatgpt')).toBeVisible()
    await expect(page.getByTestId('discovery-microlearning-5-day-mental-wellbeing-reset')).toBeVisible()
  })

  test('/paths redirects to warm learn catalog (available-now anchor)', async ({ page }) => {
    await page.goto('/paths')
    await expect(page).toHaveURL(/\/learn#available-now$/)
    await expect(page.getByTestId('learning-discovery-hub')).toBeVisible({ timeout: 20_000 })
    await expect(page.locator('#available-now')).toBeVisible()
  })

  test('header Available now reaches catalog section from /learn', async ({ page }) => {
    await gotoPublicHomeAnonymous(page)
    await page.getByTestId('learn-nav-available-now').click()
    await expect(page).toHaveURL(/\/learn#available-now$/)
    await expect(page.getByTestId('learning-discovery-hub')).toBeVisible()
    await expect(page.locator('#available-now')).toBeVisible()
  })
})
