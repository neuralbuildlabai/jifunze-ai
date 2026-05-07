import { test, expect } from '@playwright/test'
import { applyPublicE2eMaintenanceBypass } from './helpers/publicE2eMaintenanceBypass'

/**
 * Supabase env cleared for E2E: app runs in **demo persistence** (local tenant + demo brands).
 * Member-tier demo users are routed like learners: operator-only tools redirect away; learning catalog stays open.
 */
test.describe('Workspace routes (demo / no Supabase env)', () => {
  test.beforeEach(async ({ page }) => {
    await applyPublicE2eMaintenanceBypass(page)
  })

  test('member guest hitting Ideas is redirected to My Learning (operator-only)', async ({ page }) => {
    await page.goto('/ideas')
    await expect(page).toHaveURL(/\/my-learning$/, { timeout: 15_000 })
    await expect(page.getByRole('heading', { name: /^my learning$/i })).toBeVisible()
  })

  test('member guest hitting Studio is redirected to My Learning (operator-only)', async ({ page }) => {
    await page.goto('/studio')
    await expect(page).toHaveURL(/\/my-learning$/, { timeout: 15_000 })
    await expect(page.getByRole('heading', { name: /^my learning$/i })).toBeVisible()
  })

  test('settings route loads learner Account surface (demo guest)', async ({ page }) => {
    await page.goto('/settings')
    await expect(page.getByRole('heading', { name: /^account$/i }).first()).toBeVisible({ timeout: 15_000 })
    await expect(page.getByRole('button', { name: /^sign out$/i })).toBeVisible()
  })

  test('plans & billing page shows paused copy (demo guest)', async ({ page }) => {
    await page.goto('/settings/subscription')
    await expect(page.getByRole('heading', { name: /plans & billing/i })).toBeVisible({ timeout: 15_000 })
    await expect(page.getByText(/plans are not available yet/i)).toBeVisible()
  })

  test('dashboard route redirects learner guests to My Learning', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page).toHaveURL(/\/my-learning$/, { timeout: 15_000 })
    await expect(page.getByTestId('learner-my-learning-home')).toBeVisible()
    await expect(page.getByRole('heading', { name: /^my learning$/i })).toBeVisible()
  })

  test('member guest hitting training admin is redirected to My Learning', async ({ page }) => {
    await page.goto('/training')
    await expect(page).toHaveURL(/\/my-learning$/, { timeout: 15_000 })
    await expect(page.getByRole('heading', { name: /my learning/i })).toBeVisible()
  })

  test('member guest hitting team members is redirected to My Learning', async ({ page }) => {
    await page.goto('/team/members')
    await expect(page).toHaveURL(/\/my-learning$/, { timeout: 15_000 })
    await expect(page.getByRole('heading', { name: /^my learning$/i })).toBeVisible()
  })

  test('team assignments route loads (demo guest)', async ({ page }) => {
    await page.goto('/team/assignments')
    await expect(page.getByRole('heading', { name: /training assignments/i })).toBeVisible({
      timeout: 15_000,
    })
  })

  test('member guest hitting trends is redirected to My Learning (operator-only)', async ({ page }) => {
    await page.goto('/trends')
    await expect(page).toHaveURL(/\/my-learning$/, { timeout: 15_000 })
    await expect(page.getByRole('heading', { name: /^my learning$/i })).toBeVisible()
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

  test('member guest hitting insights is redirected to My Learning (platform-only)', async ({ page }) => {
    await page.goto('/insights')
    await expect(page).toHaveURL(/\/my-learning$/, { timeout: 20_000 })
    await expect(page.getByRole('heading', { name: /^my learning$/i })).toBeVisible()
  })
})
