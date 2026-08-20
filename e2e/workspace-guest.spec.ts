import { test, expect } from '@playwright/test'
import { applyPublicE2eMaintenanceBypass } from './helpers/publicE2eMaintenanceBypass'

/**
 * Supabase env cleared for E2E: app runs in **demo persistence** (local tenant + demo brands).
 * Retired workspace/studio routes redirect to the public catalog or learner shell as appropriate.
 */
// Updated 20 Aug 2026: retired product routes now land on the public career-skills homepage
// instead of 404 or the frozen course catalog (AMENDMENT_001 §5).
test.describe('Workspace routes (demo / no Supabase env)', () => {
  test.beforeEach(async ({ page }) => {
    await applyPublicE2eMaintenanceBypass(page)
  })

  test('member guest hitting Ideas is redirected to the public homepage', async ({ page }) => {
    await page.goto('/ideas')
    await expect(page).toHaveURL(/\/$/, { timeout: 20_000 })
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      /practical career, income and ai skills/i,
    )
  })

  test('member guest hitting Studio is redirected to the public homepage', async ({ page }) => {
    await page.goto('/studio')
    await expect(page).toHaveURL(/\/$/, { timeout: 20_000 })
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      /practical career, income and ai skills/i,
    )
  })

  test('settings route redirects to account (demo guest)', async ({ page }) => {
    await page.goto('/settings')
    await expect(page).toHaveURL(/\/account$/, { timeout: 15_000 })
    await expect(page.getByRole('heading', { name: /^account$/i }).first()).toBeVisible({ timeout: 15_000 })
    await expect(page.getByText(/sign in with a live account to update your profile/i)).toBeVisible()
  })

  test('plans & billing page shows paused copy (demo guest)', async ({ page }) => {
    await page.goto('/settings/subscription')
    await expect(page.getByRole('heading', { name: /plans & billing/i })).toBeVisible({ timeout: 15_000 })
    await expect(page.getByText(/plans are not available yet/i)).toBeVisible()
  })

  test('dashboard route loads learner dashboard (demo guest)', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page).toHaveURL(/\/dashboard$/, { timeout: 15_000 })
    await expect(page.getByTestId('learner-dashboard-home')).toBeVisible()
    await expect(page.getByRole('heading', { name: /^dashboard$/i })).toBeVisible()
  })

  test('member guest hitting training URLs is redirected to the public homepage', async ({ page }) => {
    await page.goto('/training')
    await expect(page).toHaveURL(/\/$/, { timeout: 20_000 })
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      /practical career, income and ai skills/i,
    )
  })

  test('member guest hitting team members is redirected to the public homepage', async ({ page }) => {
    await page.goto('/team/members')
    await expect(page).toHaveURL(/\/$/, { timeout: 20_000 })
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      /practical career, income and ai skills/i,
    )
  })

  test('member guest hitting team assignments is redirected away (operator-only)', async ({ page }) => {
    await page.goto('/team/assignments')
    await expect(page).toHaveURL(/\/$/, { timeout: 20_000 })
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      /practical career, income and ai skills/i,
    )
    await expect(page.getByRole('heading', { name: /training assignments/i })).not.toBeVisible()
  })

  test('member guest hitting trends is redirected to the public homepage', async ({ page }) => {
    await page.goto('/trends')
    await expect(page).toHaveURL(/\/$/, { timeout: 20_000 })
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      /practical career, income and ai skills/i,
    )
  })

  test('legacy teaching labs URL redirects to public learn catalog', async ({ page }) => {
    await page.goto('/learning/labs')
    await expect(page).toHaveURL(/\/learn$/, { timeout: 15_000 })
    await expect(page.getByTestId('learning-discovery-hub')).toBeVisible()
  })

  test('member guest /lab redirects to public learn catalog', async ({ page }) => {
    await page.goto('/lab')
    await expect(page).toHaveURL(/\/learn$/, { timeout: 15_000 })
    await expect(page.getByTestId('learning-discovery-hub')).toBeVisible()
  })

  test('member-tier guest cannot access /platform (redirects to the public homepage)', async ({ page }) => {
    await page.goto('/platform')
    await expect(page).toHaveURL(/\/$/, { timeout: 20_000 })
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      /practical career, income and ai skills/i,
    )
    await expect(page).not.toHaveURL(/\/platform/)
  })
})

test.describe('Navigation smoke (guest)', () => {
  test.beforeEach(async ({ page }) => {
    await applyPublicE2eMaintenanceBypass(page)
  })

  test('member guest hitting insights is redirected to the public homepage', async ({ page }) => {
    await page.goto('/insights')
    await expect(page).toHaveURL(/\/$/, { timeout: 20_000 })
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      /practical career, income and ai skills/i,
    )
  })

  test('member guest /admin/dashboard without Supabase redirects to dashboard', async ({ page }) => {
    await page.goto('/admin/dashboard')
    await expect(page).toHaveURL(/\/dashboard$/, { timeout: 15_000 })
  })
})
