import { expect, test } from '@playwright/test'
import { applyPublicE2eMaintenanceBypass } from './helpers/publicE2eMaintenanceBypass'

/**
 * Admin access boundaries in the no-Supabase demo bundle (the default e2e build).
 *
 * With no Supabase configuration there is no way to authenticate anyone, so every admin
 * surface must stay closed — no placeholder consoles, no Playwright bypass.
 */

test.beforeEach(async ({ page }) => {
  await applyPublicE2eMaintenanceBypass(page)
})

test('the social-ops console stays closed without Supabase', async ({ page }) => {
  for (const path of ['/admin/social-ops', '/admin/social-ops/accounts', '/admin/social-ops/pipeline', '/admin/social-ops/safety']) {
    await page.goto(path)
    await expect(page.getByText(/social ops is unavailable/i)).toBeVisible()
    const body = (await page.locator('body').innerText()).toLowerCase()
    expect(body).not.toMatch(/publish|token|metric row|queue depth/)
  }
})

test('the admin login page explains itself and offers no registration', async ({ page }) => {
  await page.goto('/admin/login')
  await expect(page.getByText(/administrator access/i).first()).toBeVisible()
  const body = (await page.locator('body').innerText()).toLowerCase()
  expect(body).not.toContain('sign up')
  expect(body).not.toContain('create an account')
})

test('the frozen Learn admin pages are gone', async ({ page }) => {
  for (const path of ['/admin/dashboard', '/admin/learners', '/admin/courses', '/admin/enrollments', '/admin/certificates', '/admin/capstones']) {
    await page.goto(path)
    await expect(page.getByRole('heading', { name: /page not found/i })).toBeVisible()
  }
})

test('legacy /auth/sign-in resolves to the admin login', async ({ page }) => {
  await page.goto('/auth/sign-in')
  await expect(page).toHaveURL(/\/admin\/login$/)
})
