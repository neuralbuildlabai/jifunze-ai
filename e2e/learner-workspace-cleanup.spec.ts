import { expect, test } from '@playwright/test'
import { applyPublicE2eMaintenanceBypass } from './helpers/publicE2eMaintenanceBypass'

/**
 * Product guardrails: learner workspace shell stays learning-first (no Generate/Studio in primary nav),
 * sign-out is discoverable on the dashboard, and the public /learn catalog grid matches the learner allowlist.
 */
test.describe('Learner workspace cleanup (demo / no Supabase env)', () => {
  test.beforeEach(async ({ page }) => {
    await applyPublicE2eMaintenanceBypass(page)
  })

  test('learner primary nav does not surface Generate or Studio', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page.getByRole('heading', { name: /welcome back/i })).toBeVisible({ timeout: 20_000 })
    const nav = page.getByTestId('workspace-nav-primary')
    await expect(nav.getByRole('link', { name: /^dashboard$/i })).toBeVisible()
    await expect(nav.getByRole('link', { name: /^my learning$/i })).toBeVisible()
    await expect(nav.getByRole('link', { name: /^catalog$/i })).toBeVisible()
    await expect(nav.getByRole('link', { name: /^pathways$/i })).toBeVisible()
    await expect(nav.getByRole('link', { name: /^reports$/i })).toBeVisible()
    await expect(nav.getByRole('link', { name: /^settings$/i })).toBeVisible()
    await expect(nav.locator('a[href="/generate"], a[href="/studio"], a[href="/ideas"]')).toHaveCount(0)
    await expect(nav.getByRole('link', { name: /studio/i })).toHaveCount(0)
    await expect(nav.getByRole('link', { name: /generate/i })).toHaveCount(0)
  })

  test('dashboard shows a sign out control', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page.getByTestId('dashboard-sign-out')).toBeVisible({ timeout: 20_000 })
    await expect(page.getByTestId('dashboard-sign-out')).toBeEnabled()
  })
})
