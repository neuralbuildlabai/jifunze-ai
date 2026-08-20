import { test, expect } from '@playwright/test'
import { applyPublicE2eMaintenanceBypass } from './helpers/publicE2eMaintenanceBypass'
import { gotoPublicHomeAnonymous } from './helpers/publicHomeAnonymous'

test.describe('Public surfaces', () => {
  test.beforeEach(async ({ page }) => {
    await applyPublicE2eMaintenanceBypass(page)
  })

  // Updated 20 Aug 2026: the root route now serves the public career-skills site. The catalog is
  // still reachable and unchanged at /learn, so this test checks both.
  test('catalog loads for anonymous visitors at /learn (demo E2E without Supabase env)', async ({ page }) => {
    await page.goto('/learn')
    await expect(page).toHaveURL(/\/learn$/, { timeout: 15_000 })
    await expect(page.getByTestId('learning-discovery-hub')).toBeVisible({ timeout: 20_000 })
    await expect(page.getByRole('heading', { level: 1, name: /available courses.*workshops/i })).toBeVisible()
    await expect(page.getByTestId('learn-hero-browse-available')).toBeVisible()
    await expect(page.getByTestId('learn-nav-available-now')).toBeVisible()
    await expect(page.locator('header').getByRole('link', { name: /^training$/i })).toHaveCount(0)
    await expect(page.getByTestId('landing-hero-primary-cta')).toHaveCount(0)
    await expect(page.getByTestId('home-generate-trust-boundary')).toHaveCount(0)
    await expect(page.getByTestId('public-home-marketplace')).toHaveCount(0)
    await expect(page.getByTestId('public-home-available-preview')).toHaveCount(0)
  })

  test('/learn exposes legal/support links in discovery footer', async ({ page }) => {
    await gotoPublicHomeAnonymous(page)
    await expect(page.getByTestId('learning-discovery-hub')).toBeVisible({ timeout: 20_000 })
    const footer = page.locator('footer#contact-public')
    await expect(footer.getByRole('link', { name: /^Disclaimer$/i })).toBeVisible()
    await expect(footer.getByRole('link', { name: /^Terms$/i })).toBeVisible()
    await expect(footer.getByRole('link', { name: /^Privacy$/i })).toBeVisible()
  })

  test('the retired /generate route redirects to the public career-skills homepage', async ({ page }) => {
    // Updated 20 Aug 2026: retired routes now land on the public career-skills homepage rather
    // than 404 or the frozen course catalog (AMENDMENT_001 §5). `/generate` matters most — the
    // April 2026 launch posts still link to it.
    const res = await page.goto('/generate')
    expect(res?.ok()).toBeTruthy()
    await expect(page).toHaveURL(/\/$/, { timeout: 20_000 })
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/practical career, income and ai skills/i)
    // The removed product must not be described on the page a visitor lands on.
    const body = (await page.locator('body').innerText()).toLowerCase()
    expect(body).not.toContain('create smarter social content')
  })

  test('full disclaimer page loads without auth', async ({ page }) => {
    await page.goto('/disclaimer')
    await expect(page.getByRole('heading', { name: /product disclaimer/i })).toBeVisible()
    await expect(page.getByText(/independent learning and content-support platform/i).first()).toBeVisible()
  })

  test('terms of service page loads without auth', async ({ page }) => {
    await page.goto('/terms')
    await expect(page.getByRole('heading', { name: /terms of service/i })).toBeVisible()
    await expect(page.getByText(/these terms describe how you may use jifunze/i)).toBeVisible()
  })

  test('privacy policy page loads without auth', async ({ page }) => {
    await page.goto('/privacy')
    await expect(page.getByRole('heading', { name: /privacy policy/i })).toBeVisible()
    await expect(page.getByText(/this privacy policy explains what information jifunze processes/i)).toBeVisible()
  })

  test('refunds policy page loads without auth', async ({ page }) => {
    await page.goto('/refunds')
    await expect(page.getByRole('heading', { name: /refunds.*billing/i })).toBeVisible()
    await expect(page.getByText(/no automated charges occur/i).first()).toBeVisible()
  })

  test('full disclaimer link from /learn discovery footer navigates to /disclaimer', async ({ page }) => {
    await gotoPublicHomeAnonymous(page)
    await page.locator('footer#contact-public').getByRole('link', { name: /^Disclaimer$/i }).click()
    await expect(page).toHaveURL(/\/disclaimer$/)
    await expect(page.getByRole('heading', { name: /product disclaimer/i })).toBeVisible()
  })

  test('public pricing page loads without auth', async ({ page }) => {
    await page.goto('/pricing')
    await expect(page.getByRole('heading', { name: /plans are not available yet/i })).toBeVisible()
    await expect(page.getByTestId('public-pricing-focused')).toBeVisible()
  })

  test('public AI foundations library index loads without auth', async ({ page }) => {
    await page.goto('/library/ai-foundations')
    await expect(page.getByRole('heading', { name: /^AI Foundations for Everyday Work$/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: /^Understanding AI clearly$/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /What AI Is and What It Is Not/i }).first()).toBeVisible()
  })

  test('legacy /libraries/ai-foundations redirects to canonical /library/ai-foundations', async ({ page }) => {
    await page.goto('/libraries/ai-foundations')
    await expect(page).toHaveURL(/\/library\/ai-foundations$/)
    await expect(page.getByRole('heading', { name: /^AI Foundations for Everyday Work$/i })).toBeVisible()
  })

  test('public AI foundations lesson loads without auth', async ({ page }) => {
    await page.goto('/library/ai-foundations/ai-foundations-what-ai-is-and-what-it-is-not')
    await expect(page.getByRole('heading', { name: /What AI Is and What It Is Not/i }).first()).toBeVisible()
    await expect(page.getByText(/models trained on large datasets/i)).toBeVisible()
  })

  test('public everyday chatbots library index loads without auth', async ({ page }) => {
    await page.goto('/library/everyday-chatbots')
    await expect(page.getByRole('heading', { name: /^Building Everyday Chatbots with AI$/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: /^Chatbots in Everyday Life$/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /What a Chatbot Is and What It Is Not/i }).first()).toBeVisible()
  })

  test('public everyday chatbots lesson loads without auth', async ({ page }) => {
    await page.goto(
      '/library/everyday-chatbots/chatbots-in-everyday-life-what-a-chatbot-is-and-what-it-is-not',
    )
    await expect(page.getByRole('heading', { name: /What a Chatbot Is and What It Is Not/i }).first()).toBeVisible()
    await expect(page.getByRole('heading', { name: /Definition that matches real systems/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: /^Misconceptions$/i })).toBeVisible()
  })

  test('legacy public AI lesson slug redirects to canonical curriculum slug', async ({ page }) => {
    await page.goto('/library/ai-foundations/what-ai-is-and-isnt')
    await expect(page).toHaveURL(/\/library\/ai-foundations\/ai-foundations-what-ai-is-and-what-it-is-not$/)
    await expect(page.getByRole('heading', { name: /What AI Is and What It Is Not/i }).first()).toBeVisible()
  })

  test('public networking & infrastructure library index loads without auth', async ({ page }) => {
    await page.goto('/library/networking-and-infrastructure')
    await expect(page.getByRole('heading', { name: /^Networking and Modern Infrastructure$/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: /^Network Foundations$/i }).first()).toBeVisible()
    await expect(
      page.getByRole('link', { name: /What Networks Are and Why They Matter/i }).first(),
    ).toBeVisible()
  })

  test('public networking starter lesson renders deep-learning sections without auth', async ({ page }) => {
    await page.goto('/library/networking-and-infrastructure/network-foundations-what-networks-are-and-why-they-matter')
    await expect(page.getByRole('heading', { name: /What Networks Are and Why They Matter/i }).first()).toBeVisible()
    await expect(page.getByRole('heading', { name: /^Concept teaching \(what to understand\)$/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: /^Worked example \(apply the idea\)$/i })).toBeVisible()
  })

  test('public cybersecurity starter lesson renders authored flagship sections without auth', async ({ page }) => {
    await page.goto('/library/cybersecurity-defense/cybersecurity-foundations-what-cybersecurity-is')
    await expect(page.getByRole('heading', { name: /What Cybersecurity Is/i }).first()).toBeVisible()
    await expect(
      page.getByRole('heading', { name: /What .*cybersecurity.* means in real organizations/i }),
    ).toBeVisible()
    await expect(page.getByRole('heading', { name: /Misconceptions and weak thinking/i })).toBeVisible()
  })

  test('public cloud/devops starter lesson renders authored flagship sections without auth', async ({ page }) => {
    await page.goto('/library/cloud-devops-platform/cloud-foundations-iaas-paas-and-saas')
    await expect(page.getByRole('heading', { name: /IaaS, PaaS, and SaaS/i }).first()).toBeVisible()
    await expect(
      page.getByRole('heading', { name: /Service models change what you control—and what you must still verify/i }),
    ).toBeVisible()
    await expect(page.getByRole('heading', { name: /Misconceptions/i }).first()).toBeVisible()
  })
})
