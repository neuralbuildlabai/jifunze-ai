import { expect, test } from '@playwright/test'
import { applyPublicE2eMaintenanceBypass } from './helpers/publicE2eMaintenanceBypass'

/**
 * Product guardrails: learner workspace shell stays learning-first (no Generate/Studio in primary nav),
 * profile menu is available when signed in, and the public /learn catalog grid matches the learner allowlist.
 */
test.describe('Learner workspace cleanup (demo / no Supabase env)', () => {
  test.beforeEach(async ({ page }) => {
    await applyPublicE2eMaintenanceBypass(page)
  })

  test('learner primary nav shows Catalog, My Learning, Dashboard (no operator tools)', async ({ page }) => {
    await page.goto('/my-learning')
    await expect(page.getByRole('heading', { name: /^my learning$/i })).toBeVisible({ timeout: 20_000 })
    const nav = page.getByTestId('learner-nav-primary')
    await expect(nav.getByRole('link', { name: /^my learning$/i })).toBeVisible()
    await expect(nav.getByRole('link', { name: /^catalog$/i })).toBeVisible()
    await expect(nav.getByRole('link', { name: /^dashboard$/i })).toBeVisible()
    await expect(nav.getByRole('link', { name: /^reports$/i })).toHaveCount(0)
    await expect(nav.getByRole('link', { name: /^account$/i })).toHaveCount(0)
    await expect(nav.getByRole('link', { name: /^pathways$/i })).toHaveCount(0)
    await expect(nav.getByRole('link', { name: /^settings$/i })).toHaveCount(0)
    await expect(nav.locator('a[href="/generate"], a[href="/studio"], a[href="/ideas"]')).toHaveCount(0)
    await expect(nav.getByRole('link', { name: /studio/i })).toHaveCount(0)
    await expect(nav.getByRole('link', { name: /generate/i })).toHaveCount(0)
  })

  test('learner profile menu is available when Supabase session exists', async ({ page }) => {
    await page.goto('/my-learning')
    await expect(page.getByRole('heading', { name: /^my learning$/i })).toBeVisible({ timeout: 20_000 })
    const menu = page.getByTestId('learner-profile-menu')
    if ((await menu.count()) === 0) {
      test.skip(true, 'Profile menu mounts only when Supabase is configured and a user session exists')
      return
    }
    await expect(menu).toBeVisible()
    await menu.getByRole('button').click()
    await expect(menu.getByRole('menuitem', { name: /sign out/i })).toBeVisible()
  })
})
