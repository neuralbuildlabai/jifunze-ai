import { expect, test } from '@playwright/test'

test.describe('Learning discovery (public)', () => {
  test('/learn hub renders flagship catalog + specialist courses + category cards', async ({ page }) => {
    await page.goto('/learn')
    await expect(page.getByTestId('learning-discovery-hub')).toBeVisible({ timeout: 20_000 })
    await expect(page.getByRole('heading', { name: /flagship learning paths built for depth/i })).toBeVisible()
    await expect(page.getByTestId('discovery-section-flagship-catalog')).toBeVisible()
    await expect(page.getByTestId('discovery-featured-ai-essentials')).toBeVisible()
    await expect(page.getByTestId('discovery-trending-course_chatgpt_everyday')).toBeVisible()
    await expect(page.getByTestId('discovery-section-course-index')).toBeVisible()
    await expect(page.getByTestId('learning-discovery-category-card-chatgpt')).toBeVisible()
  })

  test('category page renders browse surface + subscription note', async ({ page }) => {
    await page.goto('/learn/category/cybersecurity')
    await expect(page.getByTestId('learning-discovery-category-cybersecurity')).toBeVisible({ timeout: 20_000 })
    await expect(page.getByText(/Subscriptions · claim-safe framing/i)).toBeVisible()
    await expect(page.getByTestId('category-faq-cybersecurity')).toBeVisible()
    await expect(page.getByTestId('category-learn-more-cybersecurity')).toBeVisible()
  })

  test('invalid category slug redirects to /learn', async ({ page }) => {
    await page.goto('/learn/category/does-not-exist')
    await expect(page).toHaveURL(/\/learn$/)
  })

  test('flagship course detail exposes curriculum depth beyond original six tracks', async ({ page }) => {
    await page.goto('/learn/courses/ai-essentials')
    await expect(page.getByRole('heading', { name: /^AI Essentials$/ })).toBeVisible({ timeout: 20_000 })
    await expect(page.getByTestId('flagship-module-count')).toContainText('10')
    await expect(page.getByTestId('flagship-curriculum-structure')).toBeVisible()
    await expect(page.getByTestId('flagship-learning-path')).toBeVisible()
    await expect(page.getByTestId('flagship-progress-summary')).toBeVisible()
    await expect(page.getByTestId('flagship-modules-with-sessions')).toBeVisible()
    await expect(page.getByTestId('flagship-session-row-ae-m01-lesson')).toBeVisible()
    await expect(page.getByTestId('flagship-resume-primary')).toBeVisible()
    await expect(page.getByTestId('flagship-capstone-deep')).toBeVisible()
    await expect(page.getByRole('heading', { name: /^Course promise$/ })).toBeVisible()
    await expect(page.getByRole('heading', { name: /^Course structure overview$/ })).toBeVisible()
    await expect(page.getByRole('link', { name: /^Start course$/ })).toBeVisible()

    await page.goto('/learn/courses/clear-communication')
    await expect(page.getByTestId('flagship-module-count')).toContainText('10')
    await expect(page.getByTestId('flagship-capstone-deep')).toBeVisible()

    await page.goto('/learn/courses/data-and-decisions')
    await expect(page.getByRole('heading', { name: /^Data and Decisions$/ })).toBeVisible({ timeout: 20_000 })
    await expect(page.getByTestId('flagship-module-count')).toContainText('10')
    await expect(page.getByTestId('flagship-curriculum-structure')).toBeVisible()
    await expect(page.getByTestId('flagship-learning-path')).toBeVisible()
  })

  test('flagship session page renders instructional blocks + completion control', async ({ page }) => {
    await page.goto('/learn/courses/ai-essentials/session/ae-m01-lesson')
    await expect(page.getByRole('heading', { name: /How modern AI behaves/i })).toBeVisible({ timeout: 20_000 })
    await expect(page.getByText(/Self-paced · foundations depth · study block/i)).toBeVisible()
    await expect(page.getByTestId('flagship-session-content')).toBeVisible()
    await expect(page.locator('[data-block-type="concept_explanation"]').first()).toBeVisible()
    await expect(page.locator('[data-block-type="worked_example"]').first()).toBeVisible()
    await expect(page.getByTestId('flagship-session-complete-toggle')).toBeVisible()
    await expect(page.getByTestId('flagship-session-next')).toBeVisible()
  })

  test('flagship practice session renders practice_task blocks + mastery checkpoints panel', async ({ page }) => {
    await page.goto('/learn/courses/marketing-and-growth/session/mg-m01-practice')
    await expect(page.getByTestId('flagship-session-content')).toBeVisible({ timeout: 20_000 })
    await expect(page.getByText(/Self-paced · foundations depth · practice block/i)).toBeVisible()
    await expect(page.locator('[data-block-type="practice_task"]').first()).toBeVisible()
    await expect(page.locator('[data-block-type="output_prompt"]').first()).toBeVisible()
    await expect(page.getByTestId('flagship-session-assessment-panel')).toBeVisible()
    await expect(page.getByTestId('flagship-session-complete-toggle')).toBeVisible()
  })

  test('bespoke mastery checkpoint shows hand-authored assessment copy', async ({ page }) => {
    await page.goto('/learn/courses/marketing-and-growth/session/mg-m01-practice')
    await expect(page.getByTestId('flagship-session-assessment-panel')).toBeVisible({ timeout: 20_000 })
    await expect(page.getByText(/Hypotheses tied to observable signals/i)).toBeVisible()
  })

  test('data session opening includes KPI dashboard worked example block', async ({ page }) => {
    await page.goto('/learn/courses/data-and-decisions/session/dd-m01-lesson')
    await expect(page.getByTestId('flagship-session-content')).toBeVisible({ timeout: 20_000 })
    await expect(page.getByText(/From dashboard tile to disciplined question/i)).toBeVisible()
  })

  test('mid-course lesson renders bespoke instructional override blocks', async ({ page }) => {
    await page.goto('/learn/courses/ai-essentials/session/ae-m05-lesson')
    await expect(page.getByTestId('flagship-session-content')).toBeVisible({ timeout: 20_000 })
    await expect(page.getByRole('heading', { name: /Separation of practice from substitution/i })).toBeVisible()
    await page.goto('/learn/courses/data-and-decisions/session/dd-m07-lesson')
    await expect(page.getByText(/Dashboards become harmful when they answer/i)).toBeVisible({ timeout: 20_000 })
  })

  test('mid-course practice shows bespoke mastery checkpoint copy', async ({ page }) => {
    await page.goto('/learn/courses/marketing-and-growth/session/mg-m05-practice')
    await expect(page.getByTestId('flagship-session-assessment-panel')).toBeVisible({ timeout: 20_000 })
    await expect(page.getByText(/Engagement rises but pipeline is flat/i)).toBeVisible()
  })

  test('long-tail lesson uses completion override (not generator-only shell)', async ({ page }) => {
    await page.goto('/learn/courses/ai-essentials/session/ae-m02-lesson')
    await expect(page.getByTestId('flagship-session-content')).toBeVisible({ timeout: 20_000 })
    await expect(page.getByRole('heading', { name: /Operational truth conditions for this module/i })).toBeVisible()
    await page.goto('/learn/courses/marketing-and-growth/session/mg-m03-lesson')
    await expect(page.getByRole('heading', { name: /Decisions and tradeoffs this module must clarify/i })).toBeVisible({
      timeout: 20_000,
    })
  })

  test('School of Business & Growth courses render tightened catalog copy', async ({ page }) => {
    await page.goto('/learn/courses/business-builder')
    await expect(page.getByRole('heading', { name: /^Business Builder$/ })).toBeVisible({ timeout: 20_000 })
    await expect(page.getByText(/diligence-minded operating pack/i)).toBeVisible()
    await page.goto('/learn/courses/money-and-finance')
    await expect(page.getByRole('heading', { name: /^Money and Finance$/ })).toBeVisible({ timeout: 20_000 })
    await expect(page.getByText(/reviewer-ready finance action pack/i)).toBeVisible()
  })

  test('multiple flagship tracks expose blueprint depth', async ({ page }) => {
    const slugs = ['smart-workflows-with-ai', 'business-builder', 'research-and-critical-thinking'] as const
    for (const slug of slugs) {
      await page.goto(`/learn/courses/${slug}`)
      await expect(page.getByTestId('flagship-module-count')).toContainText(/modules/i, { timeout: 20_000 })
      await expect(page.getByTestId('flagship-learning-path')).toBeVisible()
      await expect(page.getByTestId('flagship-capstone-deep')).toBeVisible()
    }
  })

  test('digital-safety flagship course renders full blueprint (all 15 tracks covered)', async ({ page }) => {
    await page.goto('/learn/courses/digital-safety')
    await expect(page.getByRole('heading', { name: /^Digital Safety$/ })).toBeVisible({ timeout: 20_000 })
    await expect(page.getByTestId('flagship-module-count')).toContainText('10')
    await expect(page.getByTestId('flagship-curriculum-structure')).toBeVisible()
    await expect(page.getByTestId('flagship-learning-path')).toBeVisible()
  })
})
