import { expect, test } from '@playwright/test'
import { practicalMathematicsCourse } from '../src/data/courses'
import {
  PRACTICAL_MATH_PROGRESS_STORAGE_KEY,
  STANDALONE_COURSES_PROGRESS_V2_KEY,
} from '../src/lib/practicalMathProgressStorage'
import { applyPublicE2eMaintenanceBypass } from './helpers/publicE2eMaintenanceBypass'

/**
 * Real interactive quiz flow for the standalone Practical Mathematics course.
 * Standalone — does NOT exercise flagship lesson-quiz player or AI Essentials code paths.
 */
test.describe('Practical Mathematics — interactive module quiz', () => {
  const SLUG = 'practical-mathematics-life-work-business'
  const MODULE_1_SLUG = 'math-confidence-number-sense'

  test.beforeEach(async ({ page }) => {
    await applyPublicE2eMaintenanceBypass(page)
    // Reset progress so tests are isolated.
    await page.addInitScript(([k1, k2]) => {
      localStorage.removeItem(k1)
      localStorage.removeItem(k2)
    }, [PRACTICAL_MATH_PROGRESS_STORAGE_KEY, STANDALONE_COURSES_PROGRESS_V2_KEY])
  })

  test('module 1 page shows Take module quiz CTA and hides manual self-score box', async ({ page }) => {
    await page.goto(`/learn/${SLUG}/modules/${MODULE_1_SLUG}`)
    const quizSection = page.getByTestId(`standalone-module-quiz-section-${MODULE_1_SLUG}`)
    await expect(quizSection).toBeVisible({ timeout: 20_000 })

    // CTA visible
    await expect(page.getByTestId(`standalone-module-take-quiz-${MODULE_1_SLUG}`)).toBeVisible()
    // Status starts as Not started
    await expect(page.getByTestId(`standalone-module-quiz-status-${MODULE_1_SLUG}`)).toHaveText('Not started')

    // Legacy manual self-check is gone; dev-only manual override is hidden by default
    await expect(page.locator('text=Record your score (self-check)')).toHaveCount(0)
    await expect(page.getByTestId(`standalone-module-quiz-devmanual-${MODULE_1_SLUG}`)).toHaveCount(0)
  })

  test('quiz route loads with breadcrumb, title, all questions, and a submit button', async ({ page }) => {
    await page.goto(`/learn/${SLUG}/modules/${MODULE_1_SLUG}/quiz`)
    await expect(page.getByTestId(`practical-math-quiz-page-${MODULE_1_SLUG}`)).toBeVisible({ timeout: 20_000 })
    await expect(page.getByTestId('practical-math-quiz-title')).toContainText('Math Confidence and Number Sense')

    const module1 = practicalMathematicsCourse.modules.find((m) => m.slug === MODULE_1_SLUG)
    expect(module1).toBeDefined()
    const quizQuestions = module1!.moduleQuiz
    for (const q of quizQuestions) {
      await expect(page.getByTestId(`practical-math-quiz-question-${q.id}`)).toBeVisible()
    }

    await expect(page.getByTestId('practical-math-quiz-submit')).toBeVisible()
  })

  test('submitting all-correct answers shows pass result + per-question explanations', async ({ page }) => {
    await page.goto(`/learn/${SLUG}/modules/${MODULE_1_SLUG}/quiz`)
    await expect(page.getByTestId(`practical-math-quiz-page-${MODULE_1_SLUG}`)).toBeVisible({ timeout: 20_000 })

    const module1 = practicalMathematicsCourse.modules.find((m) => m.slug === MODULE_1_SLUG)!
    for (const q of module1.moduleQuiz) {
      if ((q.type === 'multiple_choice' || q.type === 'scenario') && q.options) {
        const optionId = `practical-math-quiz-option-${q.id}-${q.correctAnswer.replace(/\s+/g, '-')}`
        await page.getByTestId(optionId).click()
      } else {
        await page.getByTestId(`practical-math-quiz-input-${q.id}`).fill(q.correctAnswer)
      }
    }

    await page.getByTestId('practical-math-quiz-submit').click()

    await expect(page.getByTestId('practical-math-quiz-result')).toBeVisible()
    await expect(page.getByTestId('practical-math-quiz-pass-message')).toBeVisible()
    // Explanation block visible for first question
    const firstId = module1.moduleQuiz[0]!.id
    await expect(page.getByTestId(`practical-math-quiz-explanation-${firstId}`)).toBeVisible()
    // Continue to next module visible after pass
    await expect(page.getByTestId('practical-math-quiz-next-module')).toBeVisible()
  })

  test('submitting all-wrong answers shows needs retry + retry button works', async ({ page }) => {
    await page.goto(`/learn/${SLUG}/modules/${MODULE_1_SLUG}/quiz`)
    await expect(page.getByTestId(`practical-math-quiz-page-${MODULE_1_SLUG}`)).toBeVisible({ timeout: 20_000 })

    const module1 = practicalMathematicsCourse.modules.find((m) => m.slug === MODULE_1_SLUG)!
    for (const q of module1.moduleQuiz) {
      if ((q.type === 'multiple_choice' || q.type === 'scenario') && q.options) {
        // pick the first option that is NOT the correct answer
        const wrong = q.options.find((o) => o !== q.correctAnswer)!
        const optionId = `practical-math-quiz-option-${q.id}-${wrong.replace(/\s+/g, '-')}`
        await page.getByTestId(optionId).click()
      } else {
        await page.getByTestId(`practical-math-quiz-input-${q.id}`).fill('definitely wrong answer xyz')
      }
    }

    await page.getByTestId('practical-math-quiz-submit').click()

    await expect(page.getByTestId('practical-math-quiz-result')).toBeVisible()
    await expect(page.getByTestId('practical-math-quiz-fail-message')).toBeVisible()
    // Retry button visible on fail; next-module button is NOT visible
    await expect(page.getByTestId('practical-math-quiz-retry')).toBeVisible()
    await expect(page.getByTestId('practical-math-quiz-next-module')).toHaveCount(0)

    // Retry resets the quiz
    await page.getByTestId('practical-math-quiz-retry').click()
    await expect(page.getByTestId('practical-math-quiz-result')).toHaveCount(0)
    await expect(page.getByTestId('practical-math-quiz-submit')).toBeVisible()
  })

  test('submit button is disabled until every question is answered', async ({ page }) => {
    await page.goto(`/learn/${SLUG}/modules/${MODULE_1_SLUG}/quiz`)
    await expect(page.getByTestId(`practical-math-quiz-page-${MODULE_1_SLUG}`)).toBeVisible({ timeout: 20_000 })
    await expect(page.getByTestId('practical-math-quiz-submit')).toBeDisabled()
  })

  test('module page reflects passed status after a passing submission', async ({ page }) => {
    await page.goto(`/learn/${SLUG}/modules/${MODULE_1_SLUG}/quiz`)
    await expect(page.getByTestId(`practical-math-quiz-page-${MODULE_1_SLUG}`)).toBeVisible({ timeout: 20_000 })

    const module1 = practicalMathematicsCourse.modules.find((m) => m.slug === MODULE_1_SLUG)!
    for (const q of module1.moduleQuiz) {
      if ((q.type === 'multiple_choice' || q.type === 'scenario') && q.options) {
        const optionId = `practical-math-quiz-option-${q.id}-${q.correctAnswer.replace(/\s+/g, '-')}`
        await page.getByTestId(optionId).click()
      } else {
        await page.getByTestId(`practical-math-quiz-input-${q.id}`).fill(q.correctAnswer)
      }
    }
    await page.getByTestId('practical-math-quiz-submit').click()
    await expect(page.getByTestId('practical-math-quiz-pass-message')).toBeVisible()

    // Navigate back to module page; status should now be Passed.
    await page.getByTestId('practical-math-quiz-back-to-module').click()
    await expect(page.getByTestId(`standalone-module-quiz-status-${MODULE_1_SLUG}`)).toHaveText('Passed', { timeout: 20_000 })
    await expect(page.getByTestId(`standalone-module-quiz-latest-score-${MODULE_1_SLUG}`)).toBeVisible()
  })
})
