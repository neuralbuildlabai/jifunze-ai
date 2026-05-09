import { expect, test } from '@playwright/test'
import {
  businessAnalyticsDecisionMakingCourse,
  BUSINESS_ANALYTICS_DECISION_MAKING_INTERNAL_KEY,
  getStandaloneLessonSlug,
  lessonKey,
  PRACTICAL_MATH_INTERNAL_KEY,
  practicalMathematicsCourse,
} from '../src/data/courses'
import {
  PRACTICAL_MATH_PROGRESS_STORAGE_KEY,
  STANDALONE_COURSES_PROGRESS_V2_KEY,
} from '../src/lib/practicalMathProgressStorage'
import { applyPublicE2eMaintenanceBypass } from './helpers/publicE2eMaintenanceBypass'

const SLUG = 'business-analytics-decision-making'
const CERT_ROOT_KEY = 'jifunze.standalone.certificate_meta.v1'
const LEGACY_PM_CERT_KEY = 'jifunze.practical_math.certificate_meta.v1'

const MODULE_1_SLUG = 'business-analytics-foundations'
const MODULE_6_SLUG = 'turning-analytics-into-action'

const FIRST_LESSON_SLUG = getStandaloneLessonSlug(businessAnalyticsDecisionMakingCourse.modules[0]!.lessons[0]!)

function firstLessonPath(): string {
  const m0 = businessAnalyticsDecisionMakingCourse.modules[0]!
  return `/learn/${SLUG}/modules/${m0.slug}/lessons/${FIRST_LESSON_SLUG}`
}

/** Full v2 progress blob for Business Analytics certificate eligibility. */
function businessAnalyticsCompletedProgressV1() {
  const completedLessonKeys: string[] = []
  const passedModuleQuizzes: Record<string, { correct: number; total: number }> = {}
  for (const m of businessAnalyticsDecisionMakingCourse.modules) {
    for (const l of m.lessons) {
      completedLessonKeys.push(lessonKey(m, l.lessonNumber))
    }
    if (m.moduleQuiz.length > 0) {
      passedModuleQuizzes[m.slug] = { correct: m.moduleQuiz.length, total: m.moduleQuiz.length }
    }
  }
  return {
    v: 1 as const,
    completedLessonKeys,
    passedModuleQuizzes,
    capstoneComplete: true,
  }
}

test.describe('Business Analytics for Decision-Making — standalone smoke', () => {
  test.beforeEach(async ({ page }) => {
    await applyPublicE2eMaintenanceBypass(page)
    await page.addInitScript(
      ([k1, k2, k3, k4]) => {
        localStorage.removeItem(k1)
        localStorage.removeItem(k2)
        localStorage.removeItem(k3)
        localStorage.removeItem(k4)
      },
      [STANDALONE_COURSES_PROGRESS_V2_KEY, PRACTICAL_MATH_PROGRESS_STORAGE_KEY, CERT_ROOT_KEY, LEGACY_PM_CERT_KEY],
    )
  })

  test('discovery: workshop card visible, micro-course copy, navigates to course detail', async ({ page }) => {
    await page.goto('/learn')
    await expect(page.getByTestId('learning-discovery-hub')).toBeVisible({ timeout: 20_000 })

    const section = page.getByTestId('discovery-section-standalone-catalog')
    await expect(section).toBeVisible()

    const card = page.getByTestId(`discovery-standalone-${SLUG}`)
    await expect(card).toBeVisible()
    await expect(card).toContainText(/Business Analytics for Decision-Making/i)
    await expect(card.getByText('Professional micro-course')).toBeVisible()
    await expect(card).not.toContainText(/Flagship/i)

    await page.getByTestId(`discovery-standalone-${SLUG}-title-link`).click()
    await expect(page).toHaveURL(new RegExp(`/learn/${SLUG}$`))
    await expect(page.getByTestId(`standalone-course-detail-${SLUG}`)).toBeVisible()
  })

  test('detail page: hero, outcomes, modules, methods, downloads, suggested next, correct asset hrefs', async ({ page }) => {
    await page.goto(`/learn/${SLUG}`)
    await expect(page.getByTestId(`standalone-course-hero-${SLUG}`)).toBeVisible({ timeout: 20_000 })
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Business Analytics for Decision-Making/)

    await expect(page.getByRole('heading', { name: 'What you will learn' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'What the course covers' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Analytics methods included' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Learner practice' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Downloadable resources' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Suggested next courses' })).toBeVisible()

    const deck = page.getByRole('link', { name: /Download slide deck/i }).first()
    const notes = page.getByRole('link', { name: /Download companion notes/i }).first()
    await expect(deck).toHaveAttribute('href', '/training/business-analytics-decision-making/business_analytics_decision_making_serious_deck.pptx')
    await expect(notes).toHaveAttribute('href', '/training/business-analytics-decision-making/business_analytics_decision_making_source.md')
  })

  test('module and lesson navigation with back links', async ({ page }) => {
    await page.goto(`/learn/${SLUG}/modules/${MODULE_1_SLUG}`)
    await expect(page).toHaveURL(new RegExp(`/learn/${SLUG}/modules/${MODULE_1_SLUG}$`))

    await expect(page.getByTestId(`standalone-module-detail-${SLUG}-${MODULE_1_SLUG}`)).toBeVisible({ timeout: 20_000 })
    await expect(page.getByTestId(`standalone-module-title-${MODULE_1_SLUG}`)).toBeVisible()

    await page.getByTestId(`standalone-module-open-lesson-${MODULE_1_SLUG}-${FIRST_LESSON_SLUG}`).click()

    await expect(page.getByTestId('standalone-lesson-content')).toBeVisible({ timeout: 20_000 })
    await page.getByTestId('standalone-lesson-back-module').click()
    await expect(page).toHaveURL(new RegExp(`/learn/${SLUG}/modules/${MODULE_1_SLUG}$`))

    await page.getByRole('link', { name: 'Back to course' }).first().click()
    await expect(page).toHaveURL(new RegExp(`/learn/${SLUG}$`))
  })

  test('modules 1–5: no graded quiz UI; /quiz redirects to module (no broken quiz)', async ({ page }) => {
    await page.goto(`/learn/${SLUG}/modules/${MODULE_1_SLUG}/quiz`)
    await expect(page).toHaveURL(new RegExp(`/learn/${SLUG}/modules/${MODULE_1_SLUG}$`))

    await page.goto(`/learn/${SLUG}/modules/${MODULE_1_SLUG}`)
    await expect(page.getByTestId(`standalone-module-quiz-section-${MODULE_1_SLUG}`)).toBeVisible({ timeout: 20_000 })
    await expect(page.getByTestId(`standalone-module-quiz-section-${MODULE_1_SLUG}`)).toContainText(/reflection labs/i)
    await expect(page.getByTestId(`standalone-module-take-quiz-${MODULE_1_SLUG}`)).toHaveCount(0)
  })

  test('module 6 quiz: 12 questions, submit, pass message and explanations', async ({ page }) => {
    await page.goto(`/learn/${SLUG}/modules/${MODULE_6_SLUG}/quiz`)
    await expect(page.getByTestId(`practical-math-quiz-page-${MODULE_6_SLUG}`)).toBeVisible({ timeout: 20_000 })

    const m6 = businessAnalyticsDecisionMakingCourse.modules.find((m) => m.slug === MODULE_6_SLUG)!
    expect(m6.moduleQuiz).toHaveLength(12)

    for (const q of m6.moduleQuiz) {
      await expect(page.getByTestId(`practical-math-quiz-question-${q.id}`)).toBeVisible()
    }

    for (const q of m6.moduleQuiz) {
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
    await expect(page.getByTestId('practical-math-quiz-explanation-ba-q1')).toBeVisible()
    await expect(page.getByTestId('practical-math-quiz-pass-message')).toContainText(/75%/)
  })

  test('certificate locked shows Business Analytics framing, not Practical Mathematics', async ({ page }) => {
    await page.goto(`/learn/${SLUG}/certificate`)
    await expect(page.getByTestId('standalone-certificate-locked')).toBeVisible({ timeout: 20_000 })
    await expect(page.locator('body')).toContainText('Module 6 mini quiz')
    await expect(page.locator('body')).toContainText('reflection labs without auto-graded quizzes')
    await expect(page.locator('body')).not.toContainText('Practical Mathematics for Life, Work, and Business')
  })

  test('certificate printable uses BA course title and BA- certificate id when metadata is created', async ({ page }) => {
    const baSlice = businessAnalyticsCompletedProgressV1()
    const v2 = {
      v: 2 as const,
      courses: {
        [BUSINESS_ANALYTICS_DECISION_MAKING_INTERNAL_KEY]: baSlice,
      },
    }
    await page.addInitScript(
      ([kProg, kCert, progVal]) => {
        localStorage.setItem(kProg, progVal)
        localStorage.removeItem(kCert)
      },
      [STANDALONE_COURSES_PROGRESS_V2_KEY, CERT_ROOT_KEY, JSON.stringify(v2)],
    )

    await page.goto(`/learn/${SLUG}/certificate`)
    await expect(page.getByTestId('standalone-certificate-printable')).toBeVisible({ timeout: 20_000 })
    await expect(page.locator('body')).toContainText('Business Analytics for Decision-Making')
    await expect(page.locator('body')).not.toContainText('Practical Mathematics for Life, Work, and Business')

    const idLine = page.locator('text=/Certificate ID:/')
    await expect(idLine).toBeVisible()
    await expect(page.locator('body')).toContainText(/BA-/)

    const certRaw = await page.evaluate((k) => localStorage.getItem(k), CERT_ROOT_KEY)
    expect(certRaw).toBeTruthy()
    const cert = JSON.parse(certRaw!) as { v: 1; byCourse: Record<string, { certificateId: string }> }
    expect(cert.byCourse[BUSINESS_ANALYTICS_DECISION_MAKING_INTERNAL_KEY]?.certificateId).toMatch(/^BA-/)
  })

  test('storage isolation: BA lesson progress does not overwrite Practical Mathematics v2 entry', async ({ page }) => {
    const pmLesson = practicalMathematicsCourse.modules[0]!.lessons[0]!
    const pmMod = practicalMathematicsCourse.modules[0]!
    const pmKey = lessonKey(pmMod, pmLesson.lessonNumber)

    const seedV2 = {
      v: 2 as const,
      courses: {
        [PRACTICAL_MATH_INTERNAL_KEY]: {
          v: 1 as const,
          completedLessonKeys: [pmKey],
          passedModuleQuizzes: {},
          capstoneComplete: false,
        },
      },
    }

    await page.addInitScript(([k, val]) => localStorage.setItem(k, val), [STANDALONE_COURSES_PROGRESS_V2_KEY, JSON.stringify(seedV2)])

    await page.goto(firstLessonPath())
    await page.getByTestId('standalone-lesson-mark-complete').click()
    await expect(page.getByTestId('standalone-lesson-mark-complete')).toBeDisabled()

    const raw = await page.evaluate((k) => localStorage.getItem(k), STANDALONE_COURSES_PROGRESS_V2_KEY)
    expect(raw).toBeTruthy()
    const parsed = JSON.parse(raw!) as {
      v: 2
      courses: Record<string, { completedLessonKeys: string[] }>
    }
    expect(parsed.courses[PRACTICAL_MATH_INTERNAL_KEY]?.completedLessonKeys).toContain(pmKey)

    const baKeys = new Set(parsed.courses[BUSINESS_ANALYTICS_DECISION_MAKING_INTERNAL_KEY]?.completedLessonKeys ?? [])
    const m0 = businessAnalyticsDecisionMakingCourse.modules[0]!
    const l0 = m0.lessons[0]!
    expect(baKeys.has(lessonKey(m0, l0.lessonNumber))).toBe(true)
  })
})
