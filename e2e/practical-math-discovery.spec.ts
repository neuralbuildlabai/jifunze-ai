import { expect, test } from '@playwright/test'
import { lessonKey, practicalMathematicsCourse } from '../src/data/courses'
import { PRACTICAL_MATH_PROGRESS_STORAGE_KEY } from '../src/lib/practicalMathProgressStorage'
import { applyPublicE2eMaintenanceBypass } from './helpers/publicE2eMaintenanceBypass'

/**
 * Standalone Practical Mathematics: discovery, course flow, full lessons, certificate route.
 * Does not modify flagship course fixtures.
 */
test.describe('Practical Mathematics — public discovery (standalone)', () => {
  const SLUG = 'practical-mathematics-life-work-business'
  const TITLE = 'Practical Mathematics for Life, Work, and Business'
  const LESSON_1_1_SLUG = '1-1-building-math-confidence'
  const LESSON_2_1_SLUG = '2-1-understanding-the-three-forms'
  const HEALTH_LESSON_SLUG = '14-1-medication-and-dose-math-numeracy-only'

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

    await expect(page.getByTestId('discovery-section-flagship-catalog')).toBeVisible()
    await expect(page.getByTestId('discovery-featured-ai-essentials')).toBeVisible()
  })

  test('learn nav includes anchor to new free course section', async ({ page }) => {
    await page.goto('/learn')
    await expect(page.getByTestId('learn-nav-free-course')).toBeVisible()
    await page.getByTestId('learn-nav-free-course').click()
    await expect(page.locator('#new-free-courses')).toBeVisible()
  })

  test('card click routes to course detail with Certificate of Completion and 75% copy', async ({ page }) => {
    await page.goto('/learn')
    await expect(page.getByTestId('learning-discovery-hub')).toBeVisible({ timeout: 20_000 })
    await page.getByTestId(`discovery-standalone-${SLUG}-title-link`).click()
    await expect(page).toHaveURL(new RegExp(`/learn/${SLUG}$`))
    await expect(page.getByTestId(`standalone-course-detail-${SLUG}`)).toBeVisible()
    await expect(page.getByRole('heading', { level: 1, name: TITLE })).toBeVisible()
    await expect(page.getByTestId(`standalone-course-access-label-${SLUG}`)).toHaveText('Free')
    await expect(page.getByRole('heading', { name: 'Modules' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'What you will learn' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'How this course works' })).toBeVisible()
    await expect(page.getByTestId(`standalone-course-curriculum-${SLUG}`)).toBeVisible()
    await expect(page.getByTestId(`standalone-course-disclaimer-${SLUG}`)).toBeVisible()
    await expect(page.getByTestId(`standalone-course-start-${SLUG}`)).toBeVisible()
    await expect(page.getByTestId(`standalone-course-certificate-link-${SLUG}`)).toContainText('Certificate of Completion')
    await expect(page.getByTestId(`standalone-course-detail-${SLUG}`)).toContainText(/75%/)
    await expect(page.getByTestId(`standalone-course-detail-${SLUG}`)).toContainText(/Module 16 capstone/i)
    await expect(page.getByTestId(`standalone-course-module-safety-${SLUG}-healthcare-medical-math`)).toContainText(
      'Healthcare calculations can affect patient safety',
    )
    await expect(page.getByTestId(`standalone-course-module-safety-${SLUG}-construction-trade-math`)).toContainText(
      'Construction, structural, electrical, plumbing, HVAC, and code-related calculations',
    )
    await expect(
      page.getByTestId(`standalone-course-module-${SLUG}-math-confidence-number-sense`),
    ).toBeVisible()
    await expect(
      page.getByTestId(`standalone-course-module-${SLUG}-final-integration-mastery`),
    ).toBeVisible()
  })

  test('Start course opens first lesson with full content and navigation', async ({ page }) => {
    await page.goto(`/learn/${SLUG}`)
    await expect(page.getByTestId(`standalone-course-start-${SLUG}`)).toBeVisible({ timeout: 20_000 })
    await page.getByTestId(`standalone-course-start-${SLUG}`).click()
    await expect(page).toHaveURL(
      new RegExp(`/learn/${SLUG}/modules/math-confidence-number-sense/lessons/${LESSON_1_1_SLUG}$`),
    )
    await expect(page.getByTestId(`standalone-lesson-detail-math-confidence-number-sense-${LESSON_1_1_SLUG}`)).toBeVisible()
    await expect(page.getByRole('heading', { level: 1, name: 'Building Math Confidence' })).toBeVisible()
    await expect(page.getByText(/Learner goal/i).first()).toBeVisible()
    await expect(page.getByTestId('standalone-lesson-blocks')).toBeVisible()
    await expect(page.getByTestId('standalone-lesson-block-worked-example').first()).toBeVisible()
    await expect(page.getByTestId('standalone-lesson-prev')).toBeVisible()
    await expect(page.getByTestId('standalone-lesson-next')).toBeVisible()
    await expect(page.getByTestId('standalone-lesson-back-module')).toBeVisible()
    await expect(page.getByTestId('standalone-lesson-back-course')).toBeVisible()
  })

  test('module 1 page shows lesson cards with Open lesson buttons', async ({ page }) => {
    await page.goto(`/learn/${SLUG}/modules/math-confidence-number-sense`)
    await expect(page.getByTestId(`standalone-module-detail-${SLUG}-math-confidence-number-sense`)).toBeVisible({
      timeout: 20_000,
    })
    await expect(page.getByTestId('standalone-module-lessons-math-confidence-number-sense')).toBeVisible()
    await expect(page.getByTestId(`standalone-module-open-lesson-math-confidence-number-sense-${LESSON_1_1_SLUG}`)).toBeVisible()
  })

  test('module 2 lesson route renders', async ({ page }) => {
    await page.goto(`/learn/${SLUG}/modules/fractions-decimals-percentages-estimation/lessons/${LESSON_2_1_SLUG}`)
    await expect(page.getByTestId('standalone-lesson-content')).toBeVisible({ timeout: 20_000 })
    await expect(page.getByRole('heading', { level: 1, name: /Understanding the Three Forms/i })).toBeVisible()
  })

  test('healthcare module lesson shows safety note', async ({ page }) => {
    await page.goto(`/learn/${SLUG}/modules/healthcare-medical-math/lessons/${HEALTH_LESSON_SLUG}`)
    await expect(page.getByTestId('standalone-lesson-content')).toBeVisible({ timeout: 20_000 })
    await expect(page.getByTestId('standalone-lesson-safety-healthcare-medical-math')).toContainText(
      'Healthcare calculations can affect patient safety',
    )
  })

  test('unknown standalone lesson slug redirects to module page', async ({ page }) => {
    await page.goto(`/learn/${SLUG}/modules/math-confidence-number-sense/lessons/this-lesson-slug-does-not-exist`)
    await expect(page).toHaveURL(new RegExp(`/learn/${SLUG}/modules/math-confidence-number-sense$`))
  })

  test('certificate route exists and is locked before completion', async ({ page }) => {
    await page.addInitScript((key) => {
      localStorage.removeItem(key)
      localStorage.removeItem('jifunze.practical_math.certificate_meta.v1')
    }, PRACTICAL_MATH_PROGRESS_STORAGE_KEY)
    await page.goto(`/learn/${SLUG}/certificate`)
    await expect(page.getByTestId('standalone-certificate-locked')).toBeVisible({ timeout: 20_000 })
    await expect(page.getByText(/Complete all modules, pass with 75% or higher, and submit the capstone/)).toBeVisible()
  })

  test('certificate stays locked when lessons and quizzes are complete but capstone is not marked', async ({ page }) => {
    const completedLessonKeys: string[] = []
    const passedModuleQuizzes: Record<string, { correct: number; total: number }> = {}
    for (const m of practicalMathematicsCourse.modules) {
      for (const l of m.lessons) {
        completedLessonKeys.push(lessonKey(m, l.lessonNumber))
      }
      passedModuleQuizzes[m.slug] = { correct: m.moduleQuiz.length, total: m.moduleQuiz.length }
    }
    const payload = JSON.stringify({ v: 1, completedLessonKeys, passedModuleQuizzes, capstoneComplete: false })
    await page.addInitScript(
      ([key, val]) => {
        localStorage.setItem(key, val)
        localStorage.removeItem('jifunze.practical_math.certificate_meta.v1')
      },
      [PRACTICAL_MATH_PROGRESS_STORAGE_KEY, payload],
    )
    await page.goto(`/learn/${SLUG}/certificate`)
    await expect(page.getByTestId('standalone-certificate-locked')).toBeVisible({ timeout: 20_000 })
    await expect(page.getByText(/Module 16 capstone marked complete/)).toBeVisible()
  })

  test('module 16 page shows capstone completion action', async ({ page }) => {
    await page.goto(`/learn/${SLUG}/modules/final-integration-mastery`)
    await expect(page.getByTestId('standalone-capstone-panel')).toBeVisible({ timeout: 20_000 })
    await expect(page.getByTestId('standalone-capstone-ack-checkbox')).toBeVisible()
    await expect(page.getByTestId('standalone-capstone-mark-complete')).toBeVisible()
  })

  test('certificate shows print button when course is fully complete', async ({ page }) => {
    const completedLessonKeys: string[] = []
    const passedModuleQuizzes: Record<string, { correct: number; total: number }> = {}
    for (const m of practicalMathematicsCourse.modules) {
      for (const l of m.lessons) {
        completedLessonKeys.push(lessonKey(m, l.lessonNumber))
      }
      passedModuleQuizzes[m.slug] = { correct: m.moduleQuiz.length, total: m.moduleQuiz.length }
    }
    const payload = JSON.stringify({ v: 1, completedLessonKeys, passedModuleQuizzes, capstoneComplete: true })
    await page.addInitScript(
      ([key, val]) => {
        localStorage.setItem(key, val)
        localStorage.removeItem('jifunze.practical_math.certificate_meta.v1')
      },
      [PRACTICAL_MATH_PROGRESS_STORAGE_KEY, payload],
    )
    await page.goto(`/learn/${SLUG}/certificate`)
    await expect(page.getByTestId('standalone-certificate-printable')).toBeVisible({ timeout: 20_000 })
    await expect(page.getByTestId('standalone-certificate-print')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Certificate of Completion' }).first()).toBeVisible()
  })

  test('unknown standalone slug redirects back to /learn', async ({ page }) => {
    await page.goto('/learn/practical-math-does-not-exist')
    await expect(page).toHaveURL(/\/learn$/)
    await expect(page.getByTestId('learning-discovery-hub')).toBeVisible({ timeout: 20_000 })
  })

  test('/paths redirect still works', async ({ page }) => {
    await page.goto('/paths')
    await expect(page).toHaveURL(/\/learn#schools$/)
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
