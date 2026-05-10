import { test, expect } from '@playwright/test'
import { applyPublicE2eMaintenanceBypass } from './helpers/publicE2eMaintenanceBypass'
import { gotoPublicHomeAnonymous } from './helpers/publicHomeAnonymous'

test.describe('Homepage learning-first (public)', () => {
  test.beforeEach(async ({ page }) => {
    await applyPublicE2eMaintenanceBypass(page)
  })

  test('hero primary CTA navigates to /learn with available-now anchor', async ({ page }) => {
    await gotoPublicHomeAnonymous(page)
    await expect(page.getByRole('heading', { level: 1, name: /available courses.*workshops/i })).toBeVisible({
      timeout: 15_000,
    })
    const primary = page.getByTestId('landing-hero-primary-cta')
    await expect(primary).toHaveAttribute('href', /\/learn#available-now$/)
    await primary.click()
    await expect(page).toHaveURL(/\/learn#available-now$/)
  })

  test('home shows preview cards for Smart Workflows, AI at Work, and Practical Mathematics', async ({ page }) => {
    await gotoPublicHomeAnonymous(page)
    await expect(page.getByRole('heading', { name: /^Start with available free learning$/ })).toBeVisible()
    await expect(page.getByTestId('home-available-preview-smart-workflows-with-ai')).toBeVisible()
    await expect(page.getByTestId('home-available-preview-ai-at-work-chatgpt')).toBeVisible()
    await expect(page.getByTestId('home-available-preview-practical-mathematics-life-work-business')).toBeVisible()
  })

  test('/paths redirects to warm learn catalog (available-now anchor)', async ({ page }) => {
    await page.goto('/paths')
    await expect(page).toHaveURL(/\/learn#available-now$/)
    await expect(page.getByTestId('learning-discovery-hub')).toBeVisible({ timeout: 20_000 })
    await expect(page.locator('#available-now')).toBeVisible()
  })

  test('header Courses reaches catalog', async ({ page }) => {
    await gotoPublicHomeAnonymous(page)
    await page.getByTestId('home-nav-courses').click()
    await expect(page).toHaveURL(/\/learn#available-now$/)
    await expect(page.getByTestId('learning-discovery-hub')).toBeVisible()
  })
})
