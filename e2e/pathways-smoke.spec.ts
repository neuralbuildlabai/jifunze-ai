import { test, expect } from '@playwright/test'
import { applyPublicE2eMaintenanceBypass } from './helpers/publicE2eMaintenanceBypass'

test.describe('Legacy pathways URLs', () => {
  test.beforeEach(async ({ page }) => {
    await applyPublicE2eMaintenanceBypass(page)
  })

  test('/paths redirects to /learn catalog schools section', async ({ page }) => {
    await page.goto('/paths')
    await expect(page).toHaveURL(/\/learn#schools$/)
    await expect(page.getByTestId('learning-discovery-hub')).toBeVisible({ timeout: 20_000 })
    const nav = page.getByRole('navigation', { name: 'Public' })
    await expect(nav.getByRole('link', { name: /^training$/i })).toHaveCount(0)
  })

  test('/paths/:slug redirects to the same catalog anchor', async ({ page }) => {
    await page.goto('/paths/digital-work-starter')
    await expect(page).toHaveURL(/\/learn#schools$/)
    await expect(page.getByTestId('learning-discovery-hub')).toBeVisible({ timeout: 20_000 })
  })
})
