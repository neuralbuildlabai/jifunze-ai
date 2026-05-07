import { expect, test } from '@playwright/test'
import { applyPublicE2eMaintenanceBypass } from './helpers/publicE2eMaintenanceBypass'

/**
 * Smoke test for the standalone Practical Mathematics course in public discovery.
 *
 * Confirms the course appears on /learn (without disturbing existing flagship cards),
 * the card links to /learn/practical-mathematics-life-work-business, and the detail page
 * renders the expected title, free access label, and curriculum.
 *
 * Does NOT modify or assert against any flagship discovery test surface.
 */
test.describe('Practical Mathematics — public discovery (standalone)', () => {
  const SLUG = 'practical-mathematics-life-work-business'
  const TITLE = 'Practical Mathematics for Life, Work, and Business'

  test.beforeEach(async ({ page }) => {
    await applyPublicE2eMaintenanceBypass(page)
  })

  test('appears on /learn above flagship grid with Free, 16 modules, and open CTAs', async ({ page }) => {
    await page.goto('/learn')
    await expect(page.getByTestId('learning-discovery-hub')).toBeVisible({ timeout: 20_000 })

    const standaloneSection = page.getByTestId('discovery-section-standalone-catalog')
    await expect(standaloneSection).toBeVisible()
    const card = page.getByTestId(`discovery-standalone-${SLUG}`)
    await expect(card).toBeVisible()
    await expect(card).toContainText(TITLE)
    await expect(card).toContainText(/Free/i)
    await expect(card).toContainText(/16 modules/)
    await expect(page.getByTestId(`discovery-standalone-${SLUG}-open-course`)).toBeVisible()
    await expect(page.getByTestId(`discovery-standalone-${SLUG}-start-course`)).toBeVisible()

    // Existing flagship featured grid still works below standalone spotlight.
    await expect(page.getByTestId('discovery-section-flagship-catalog')).toBeVisible()
    await expect(page.getByTestId('discovery-featured-ai-essentials')).toBeVisible()
  })

  test('learn nav includes anchor to new free course section', async ({ page }) => {
    await page.goto('/learn')
    await expect(page.getByTestId('learn-nav-free-course')).toBeVisible()
    await page.getByTestId('learn-nav-free-course').click()
    await expect(page.locator('#new-free-courses')).toBeVisible()
  })

  test('card click routes to /learn/practical-mathematics-life-work-business', async ({ page }) => {
    await page.goto('/learn')
    await expect(page.getByTestId('learning-discovery-hub')).toBeVisible({ timeout: 20_000 })
    await page.getByTestId(`discovery-standalone-${SLUG}-title-link`).click()
    await expect(page).toHaveURL(new RegExp(`/learn/${SLUG}$`))
    await expect(page.getByTestId(`standalone-course-detail-${SLUG}`)).toBeVisible()
    await expect(page.getByRole('heading', { level: 1, name: TITLE })).toBeVisible()
    await expect(page.getByTestId(`standalone-course-access-label-${SLUG}`)).toContainText(/Free Access/i)
    await expect(page.getByText('16-module outline')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Course description' })).toBeVisible()
    await expect(page.getByTestId(`standalone-course-curriculum-${SLUG}`)).toBeVisible()
    await expect(page.getByTestId(`standalone-course-disclaimer-${SLUG}`)).toBeVisible()
    await expect(page.getByTestId(`standalone-course-start-${SLUG}`)).toBeVisible()
    await expect(page.getByTestId(`standalone-course-module-safety-${SLUG}-healthcare-medical-math`)).toContainText(
      'Healthcare calculations can affect patient safety',
    )
    await expect(page.getByTestId(`standalone-course-module-safety-${SLUG}-construction-trade-math`)).toContainText(
      'Construction, structural, electrical, plumbing, HVAC, and code-related calculations',
    )
    // Sample of expected module cards to prove curriculum rendered.
    await expect(
      page.getByTestId(`standalone-course-module-${SLUG}-math-confidence-number-sense`),
    ).toBeVisible()
    await expect(
      page.getByTestId(`standalone-course-module-${SLUG}-final-integration-mastery`),
    ).toBeVisible()
  })

  test('Start course opens module 1 preview with lessons and quiz metadata', async ({ page }) => {
    await page.goto(`/learn/${SLUG}`)
    await expect(page.getByTestId(`standalone-course-start-${SLUG}`)).toBeVisible({ timeout: 20_000 })
    await page.getByTestId(`standalone-course-start-${SLUG}`).click()
    await expect(page).toHaveURL(/\/learn\/practical-mathematics-life-work-business\/modules\/math-confidence-number-sense$/)
    await expect(page.getByTestId(`standalone-module-detail-${SLUG}-math-confidence-number-sense`)).toBeVisible()
    await expect(page.getByTestId('standalone-module-title-math-confidence-number-sense')).toContainText(
      'Math Confidence and Number Sense',
    )
    await expect(page.getByTestId('standalone-module-lessons-math-confidence-number-sense')).toBeVisible()
    await expect(page.getByText('Module quiz').first()).toBeVisible()
  })

  test('unknown standalone slug redirects back to /learn', async ({ page }) => {
    await page.goto('/learn/practical-math-does-not-exist')
    await expect(page).toHaveURL(/\/learn$/)
    await expect(page.getByTestId('learning-discovery-hub')).toBeVisible({ timeout: 20_000 })
  })

  test('flagship course detail still renders (no regression)', async ({ page }) => {
    await page.goto('/learn/courses/ai-essentials')
    await expect(page.getByRole('heading', { name: /^AI Essentials$/ })).toBeVisible({ timeout: 20_000 })
  })

  test('Smart Workflows flagship course detail still renders', async ({ page }) => {
    await page.goto('/learn/courses/smart-workflows-with-ai')
    await expect(page.getByRole('heading', { name: /Smart Workflows with AI/i })).toBeVisible({ timeout: 20_000 })
  })
})
