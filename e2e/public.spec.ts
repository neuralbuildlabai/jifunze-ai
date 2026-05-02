import { test, expect } from '@playwright/test'
import { applyPublicE2eMaintenanceBypass } from './helpers/publicE2eMaintenanceBypass'
import { gotoPublicHomeAnonymous } from './helpers/publicHomeAnonymous'

test.describe('Public surfaces', () => {
  test.beforeEach(async ({ page }) => {
    await applyPublicE2eMaintenanceBypass(page)
  })
  test('homepage loads and exposes primary CTAs (demo E2E runs without Supabase env)', async ({
    page,
  }) => {
    await gotoPublicHomeAnonymous(page)
    await expect(
      page.getByRole('heading', { level: 1, name: /learn skills.*build proof.*become employable/i }),
    ).toBeVisible({ timeout: 15_000 })
    const heroPrimary = page.getByTestId('landing-hero-primary-cta')
    await expect(heroPrimary).toBeVisible()
    await expect(heroPrimary).toHaveAttribute('href', /\/paths$/)
    await expect(page.getByTestId('home-nav-pathways')).toBeVisible()
    await expect(page.locator('header').getByRole('link', { name: /^training$/i })).toHaveCount(0)
    await expect(page.getByTestId('landing-cta-trust-line')).toBeVisible()
    await expect(page.getByTestId('landing-cta-trust-line')).toContainText('Read disclaimer')
    await expect(page.getByTestId('home-generate-trust-boundary')).toHaveCount(0)
    await expect(page.getByTestId('trust-legal-footer-links')).toBeVisible()
    await expect(page.getByTestId('landing-marketing-slim')).toBeVisible()
    await expect(page.getByTestId('landing-browse-courses-cta')).toBeVisible()
  })

  test('/generate remains a direct-only public route (unpromoted from homepage)', async ({ page }) => {
    await page.goto('/generate')
    await expect(page.getByTestId('public-generate-unpromoted-notice')).toBeVisible()
    await expect(page.getByRole('heading', { name: /start from context you can verify/i })).toBeVisible()
    await expect(page.getByTestId('public-generate-trust-boundary')).toBeVisible()
    await expect(page.getByTestId('public-generate-trust-boundary')).toContainText('Review for accuracy before posting')
    await expect(page.getByTestId('trust-legal-footer-links')).toBeVisible()
    await expect(page.getByPlaceholder(/what is the post about/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /try preview/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /^sign in$/i }).first()).toBeVisible()
  })

  test('direct /generate route works without auth', async ({ page }) => {
    const res = await page.goto('/generate')
    expect(res?.ok()).toBeTruthy()
    await expect(page).toHaveURL(/\/generate$/)
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

  test('full disclaimer link from landing navigates to /disclaimer', async ({ page }) => {
    await gotoPublicHomeAnonymous(page)
    await page.getByTestId('landing-cta-trust-line').getByRole('link', { name: /read disclaimer/i }).click()
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
