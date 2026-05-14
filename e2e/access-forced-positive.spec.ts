import { test, expect } from '@playwright/test'
import { applyPublicE2eMaintenanceBypass } from './helpers/publicE2eMaintenanceBypass'

/**
 * Requires `npm run test:e2e:access-forced` — build embeds VITE_PLAYWRIGHT_BUILD (admin shell), VITE_FORCE_PRO_TOOLS / VITE_FORCE_PLATFORM_TOOLS (tier gates).
 * Lab remains behind workspace sign-in; this asserts the **tier gate** does not bounce to /settings.
 */
test.describe('Access gates (forced pro/platform via build flags)', () => {
  test.beforeEach(async ({ page }) => {
    await applyPublicE2eMaintenanceBypass(page)
  })
  test('lab URL redirects to public learn catalog when pro tools are forced', async ({ page }) => {
    await page.goto('/lab', { waitUntil: 'load' })
    await expect(page).toHaveURL(/\/learn$/, { timeout: 20_000 })
    await expect(page.getByTestId('learning-discovery-hub')).toBeVisible({ timeout: 20_000 })
  })

  test('legacy /platform redirects to admin health when Playwright admin shell is active', async ({ page }) => {
    await page.goto('/platform')
    await expect(page).toHaveURL(/\/admin\/health$/, { timeout: 20_000 })
  })

  test('admin dashboard loads in Playwright-tagged no-Supabase bundle (no auth)', async ({ page }) => {
    await page.goto('/admin/dashboard')
    await expect(page.getByTestId('admin-dashboard-home')).toBeVisible({ timeout: 20_000 })
    await expect(page.getByTestId('admin-health-summary-link')).toBeVisible()
  })

  test('admin learners table renders in forced E2E build', async ({ page }) => {
    await page.goto('/admin/learners')
    await expect(page.getByTestId('admin-learners-page')).toBeVisible({ timeout: 20_000 })
  })

  test('admin progress page renders without public catalog leakage', async ({ page }) => {
    await page.goto('/admin/progress')
    await expect(page.getByTestId('admin-progress-page')).toBeVisible({ timeout: 20_000 })
  })

  test('admin certificates page shows honest empty state', async ({ page }) => {
    await page.goto('/admin/certificates')
    await expect(page.getByTestId('admin-certificates-page')).toBeVisible({ timeout: 20_000 })
    await expect(page.getByText(/No certificate records found yet/i)).toBeVisible()
  })

  test('admin dashboard health strip is visible', async ({ page }) => {
    await page.goto('/admin/dashboard')
    await expect(page.getByTestId('admin-dashboard-health-strip')).toBeVisible({ timeout: 20_000 })
  })

  test('admin health overview snapshot section mounts', async ({ page }) => {
    await page.goto('/admin/health')
    await expect(page.getByTestId('admin-health-page')).toBeVisible({ timeout: 20_000 })
    await expect(page.getByTestId('admin-health-overview-snapshot')).toBeVisible()
  })

  test('admin health page shows prioritized board and copy control', async ({ page }) => {
    await page.goto('/admin/health')
    await expect(page.getByTestId('admin-health-grouped-board')).toBeVisible({ timeout: 20_000 })
    await expect(page.getByTestId('admin-health-copy-summary')).toBeVisible()
    await expect(page.getByTestId('admin-health-last-checked')).toBeVisible()
  })

  test('admin health page body does not echo JWT or Stripe secret patterns', async ({ page }) => {
    await page.goto('/admin/health')
    const text = await page.locator('body').innerText()
    expect(text).not.toMatch(/sk_live_[a-z0-9]{8,}/i)
    expect(text).not.toMatch(/eyJ[a-zA-Z0-9_-]{12,}\.[a-zA-Z0-9_-]{8,}\.[a-zA-Z0-9_-]{8,}/)
  })

  test('admin health auth tab shows canonical admin accounts guidance', async ({ page }) => {
    await page.goto('/admin/health')
    await page.getByRole('button', { name: 'Auth' }).click()
    await expect(page.getByText('Canonical admin accounts')).toBeVisible()
  })

  test('admin settings shows read-only system accounts for non-super session', async ({ page }) => {
    await page.goto('/admin/settings')
    await expect(page.getByTestId('admin-system-accounts-readonly')).toBeVisible({ timeout: 20_000 })
    await expect(page.getByTestId('admin-system-accounts-table')).toHaveCount(0)
  })

  test('admin dashboard shows role badge and identity strip', async ({ page }) => {
    await page.goto('/admin/dashboard')
    await expect(page.getByTestId('admin-shell-role-badge')).toBeVisible({ timeout: 20_000 })
    await expect(page.getByTestId('admin-shell-identity')).toBeVisible()
  })

  test('admin shell mobile menu toggle is present on narrow viewports', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 800 })
    await page.goto('/admin/dashboard')
    await expect(page.getByTestId('admin-shell-menu-toggle')).toBeVisible({ timeout: 20_000 })
  })
})