import { expect, test } from '@playwright/test'
import { seedFlagshipLocalProgress } from './helpers/seedFlagshipLocalProgress'
import { applyPublicE2eMaintenanceBypass } from './helpers/publicE2eMaintenanceBypass'

test.describe('Learning discovery (public)', () => {
  test.beforeEach(async ({ page }) => {
    await applyPublicE2eMaintenanceBypass(page)
  })

  test('/paths redirects to /learn with available-now anchor', async ({ page }) => {
    await page.goto('/paths')
    await expect(page).toHaveURL(/\/learn#available-now$/)
    await expect(page.getByTestId('learning-discovery-hub')).toBeVisible({ timeout: 20_000 })
  })

  test('/learn shows honest available catalog heading and no legacy flagship featured grid', async ({ page }) => {
    await page.goto('/learn')
    await expect(page.getByTestId('learning-discovery-hub')).toBeVisible({ timeout: 20_000 })
    await expect(page.getByRole('heading', { level: 1, name: /available courses.*workshops/i })).toBeVisible()
    await expect(page.locator('[data-testid^="discovery-featured-"]')).toHaveCount(0)
    await expect(page.getByTestId('discovery-section-available-now')).toBeVisible()
  })

  test('/learn hub lists Free Starter Rise pilots with working iframe paths', async ({ page }) => {
    await page.goto('/learn')
    await expect(page.getByTestId('discovery-available-rise-ai-at-work-chatgpt')).toBeVisible()
    await expect(page.getByTestId('discovery-available-rise-smart-workflows-with-ai')).toBeVisible()

    await page.goto('/learn/free/ai-at-work-chatgpt')
    await expect(page.getByTestId('free-starter-ai-at-work-chatgpt-page')).toBeVisible({ timeout: 20_000 })
    const frameAi = page.locator('iframe[title="AI at Work — interactive lesson"]')
    await expect(frameAi).toBeVisible()
    await expect(frameAi).toHaveAttribute('src', /\/course-assets\/rise\/ai-at-work-chatgpt\/content\/index\.html$/)

    await page.goto('/learn/free/smart-workflows-with-ai')
    await expect(page.getByTestId('free-starter-smart-workflows-with-ai-page')).toBeVisible({ timeout: 20_000 })
    const frameSw = page.locator('iframe[title="Smart Workflows with AI — interactive workshop"]')
    await expect(frameSw).toBeVisible()
    await expect(frameSw).toHaveAttribute('src', /\/course-assets\/rise\/smart-workflows-with-ai\/content\/index\.html$/)
  })

  test('/learn lists Practical Mathematics and standalone courses in available grid', async ({ page }) => {
    await page.goto('/learn')
    await expect(page.getByTestId('discovery-available-standalone-practical-mathematics-life-work-business')).toBeVisible()
    await expect(page.getByTestId('discovery-available-standalone-business-process-automation-for-work')).toBeVisible()
    await expect(page.getByTestId('discovery-available-standalone-business-analytics-decision-making')).toBeVisible()
  })

  test('category page renders browse surface without subscription framing', async ({ page }) => {
    await page.goto('/learn/category/cybersecurity')
    await expect(page.getByTestId('learning-discovery-category-cybersecurity')).toBeVisible({ timeout: 20_000 })
    await expect(page.getByTestId('category-access-note-cybersecurity')).toContainText(/learning focus/i)
    await expect(page.getByTestId('category-faq-cybersecurity')).toBeVisible()
    await expect(page.getByTestId('category-learn-more-cybersecurity')).toBeVisible()
  })

  test('invalid category slug redirects to /learn', async ({ page }) => {
    await page.goto('/learn/category/does-not-exist')
    await expect(page).toHaveURL(/\/learn$/)
  })

  test('AI Essentials course detail: one Curriculum heading and core sections', async ({ page }) => {
    await page.goto('/learn/courses/ai-essentials')
    await expect(page.getByRole('heading', { name: /^AI Essentials$/ })).toBeVisible({ timeout: 20_000 })
    await expect(page.getByText(/16 modules/i).first()).toBeVisible()
    await expect(page.getByRole('heading', { name: /^Curriculum$/ })).toHaveCount(1)
    await expect(page.getByTestId('flagship-learning-path')).toBeVisible()
    await expect(page.getByTestId('ae-milestone-progress')).toBeVisible()
    await expect(page.getByTestId('flagship-modules-with-sessions')).toBeVisible()
    await page.getByRole('button', { name: /Module 1.*What AI Is and What It Is Not/i }).click()
    await expect(page.getByTestId('flagship-session-row-ae-m01-lesson')).toBeVisible()
    await expect(page.getByTestId('ae-hero-primary-cta')).toBeVisible()
    await expect(page.getByTestId('ae-capstone-section')).toBeVisible()
  })

  test('flagship session page renders curated layout, blocks, and completion footer', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await page.goto('/learn/courses/ai-essentials/session/ae-m01-lesson')
    await expect(page.getByRole('heading', { level: 1, name: /Map what AI does/i })).toBeVisible({ timeout: 20_000 })
    await expect(page.getByTestId('flagship-session-back-to-course')).toBeVisible()
    await expect(page.getByTestId('flagship-session-content')).toBeVisible()
    await expect(page.locator('[data-session-presentation="guided-lesson"]')).toBeVisible()
    await expect(page.getByTestId('flagship-session-curated-nav')).toBeVisible()
    const stepLinks = page.getByTestId('flagship-session-curated-nav-links').locator('a')
    const stepCount = await stepLinks.count()
    expect(stepCount).toBeGreaterThan(2)
    expect(stepCount).toBeLessThan(12)
    await expect(stepLinks.filter({ hasText: 'Learn' })).toHaveCount(1)
    await expect(page.getByTestId('flagship-session-completion-footer')).toBeVisible()
    await expect(page.getByTestId('flagship-session-completion-footer')).toContainText(/you.*re ready to complete this lesson/i)
    await expect(page.locator('[data-block-type="concept_explanation"]').first()).toBeVisible()
    await expect(page.locator('[data-block-type="worked_example"]').first()).toBeVisible()
    await expect(page.getByTestId('flagship-session-complete-toggle')).toBeVisible()
    await expect(page.getByRole('navigation', { name: 'Session navigation' })).toBeVisible()
  })

  test('AI Essentials practice session renders practice_task blocks + mastery checkpoints panel', async ({ page }) => {
    await seedFlagshipLocalProgress(page, 'ai-essentials', ['ae-m01-lesson'])
    await page.goto('/learn/courses/ai-essentials/session/ae-m01-practice')
    await expect(page.getByTestId('flagship-session-content')).toBeVisible({ timeout: 20_000 })
    await expect(page.locator('[data-session-presentation="practice-lab"]')).toBeVisible()
    await expect(page.locator('#flagship-practice-goal')).toBeVisible()
    await expect(page.locator('#flagship-practice-tasks')).toBeVisible()
    await expect(page.locator('#flagship-practice-artifact')).toBeVisible()
    await expect(page.getByText('Self-paced · foundations depth · practice block').first()).toBeVisible()
    const stepLinks = page.getByTestId('flagship-session-curated-nav-links').locator('a')
    await expect(stepLinks.filter({ hasText: 'Goal' })).toHaveCount(1)
    await expect(stepLinks.filter({ hasText: 'Tasks' })).toHaveCount(1)
    await expect(page.locator('[data-block-type="practice_task"]').first()).toBeVisible()
    await expect(page.locator('[data-block-type="output_prompt"]').first()).toBeVisible()
    await expect(page.locator('#flagship-practice-review')).toBeVisible()
    await expect(page.getByTestId('flagship-session-assessment-panel')).toBeVisible()
    await expect(page.getByTestId('flagship-session-completion-footer')).toContainText(/you.*re ready to complete this practice/i)
    await expect(page.getByTestId('flagship-session-complete-toggle')).toBeVisible()
    const firstResponse = page.locator('[data-testid^="flagship-learner-response-"]').first()
    await expect(firstResponse).toBeVisible()
    await expect(firstResponse).toContainText(/sign in to save|save draft/i)
  })
})
