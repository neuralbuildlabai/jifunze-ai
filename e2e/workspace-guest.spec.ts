import { test, expect } from '@playwright/test'
import { applyPublicE2eMaintenanceBypass } from './helpers/publicE2eMaintenanceBypass'

/**
 * Supabase env cleared for E2E: app runs in **demo persistence** (local tenant + demo brands).
 * Workspace surfaces load without a Supabase session — distinct from production “sign in” gating.
 */
test.describe('Workspace routes (demo / no Supabase env)', () => {
  test.beforeEach(async ({ page }) => {
    await applyPublicE2eMaintenanceBypass(page)
  })
  test('ideas page loads', async ({ page }) => {
    await page.goto('/ideas')
    await expect(page.getByRole('heading', { name: /^ideas$/i }).first()).toBeVisible({ timeout: 15_000 })
  })

  test('studio page loads', async ({ page }) => {
    await page.goto('/studio')
    await expect(page.getByRole('heading', { name: /^studio$/i }).first()).toBeVisible({ timeout: 15_000 })
  })

  test('settings page loads', async ({ page }) => {
    await page.goto('/settings')
    await expect(page.getByRole('heading', { name: /^settings$/i }).first()).toBeVisible({ timeout: 15_000 })
  })

  test('plans & subscription page loads (demo guest)', async ({ page }) => {
    await page.goto('/settings/subscription')
    await expect(page.getByRole('heading', { name: /plans & subscription/i })).toBeVisible({ timeout: 15_000 })
    await expect(page.getByTestId('plan-card-free')).toBeVisible()
  })

  test('dashboard route loads (demo guest)', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page.getByRole('heading', { name: /welcome back/i })).toBeVisible({ timeout: 15_000 })
    await expect(page.getByText(/continue your pathway, build portfolio-ready proof/i)).toBeVisible()
    await expect(page.getByTestId('dashboard-your-pathway')).toBeVisible()
  })

  test('training route loads (demo guest)', async ({ page }) => {
    await page.goto('/training')
    await expect(page.getByRole('heading', { name: /plans.*cohort/i })).toBeVisible({ timeout: 15_000 })
  })

  test('team members route loads (demo guest)', async ({ page }) => {
    await page.goto('/team/members')
    await expect(page.getByRole('heading', { name: /^members$/i })).toBeVisible({ timeout: 15_000 })
  })

  test('team assignments route loads (demo guest)', async ({ page }) => {
    await page.goto('/team/assignments')
    await expect(page.getByRole('heading', { name: /training assignments/i })).toBeVisible({
      timeout: 15_000,
    })
  })

  test('trends route loads (demo guest)', async ({ page }) => {
    await page.goto('/trends')
    await expect(page.getByRole('heading', { name: /trend insights/i })).toBeVisible({ timeout: 15_000 })
  })

  test('teaching labs route loads with structured lab capture (demo guest)', async ({ page }) => {
    await page.goto('/learning/labs')
    await expect(page.getByRole('heading', { name: /guided, practice, and test labs/i })).toBeVisible({
      timeout: 15_000,
    })
    await expect(page.getByRole('heading', { name: /^Structured learner capture$/i }).first()).toBeVisible()
  })

  test('member-tier guest cannot access /lab (tier guard redirects to settings)', async ({
    page,
  }) => {
    await page.goto('/lab')
    await expect(page).toHaveURL(/\/settings$/, { timeout: 15_000 })
  })

  test('member-tier guest cannot access /platform (redirects to home)', async ({ page }) => {
    await page.goto('/platform')
    await expect(page).toHaveURL(/\/?$/, { timeout: 15_000 })
    await expect(page).not.toHaveURL(/\/platform/)
  })
})

test.describe('Navigation smoke (guest)', () => {
  test.beforeEach(async ({ page }) => {
    await applyPublicE2eMaintenanceBypass(page)
  })

  test('insights route loads (demo brands when Supabase env is cleared)', async ({ page }) => {
    await page.goto('/insights')
    await expect(page.getByRole('heading', { name: /what jifunze learned/i })).toBeVisible({
      timeout: 20_000,
    })
  })
})
