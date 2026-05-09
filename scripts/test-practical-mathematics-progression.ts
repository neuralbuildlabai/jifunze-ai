/**
 * Lightweight unit tests for the standalone Practical Mathematics
 * progression rule and catalog adapter.
 *
 * Run: `npm run test:practical-math-progression`
 * No Supabase or network access required.
 */

import assert from 'node:assert/strict'

import {
  emptyPracticalMathProgress,
  findNextPracticalMathModule,
  findStandaloneCourseBySlug,
  findStandaloneCourseByInternalKey,
  isPracticalMathCourseFullyComplete,
  isStandaloneCourseSlug,
  lessonKey,
  moduleAllLessonsComplete,
  moduleFullyComplete,
  moduleQuizPassed,
  PRACTICAL_MATH_INTERNAL_KEY,
  PRACTICAL_MATH_SLUG,
  practicalMathematicsCourse,
  practicalMathCertificateEligible,
  practicalMathQuizPassed,
  practicalMathWeightedScorePercent,
  STANDALONE_LEARNER_CATALOG,
} from '../src/data/courses'
import { practicalMathFlagshipCurriculum } from '../src/data/courses/practicalMathematicsFlagshipAdapter'

function testQuizPassThreshold() {
  // 8-question quiz: ceil(0.75 × 8) = 6
  assert.equal(practicalMathQuizPassed({ correct: 6, total: 8 }), true, '6/8 passes at 75%')
  assert.equal(practicalMathQuizPassed({ correct: 5, total: 8 }), false, '5/8 fails')

  // 10-question quiz: ceil(7.5) = 8 required
  assert.equal(practicalMathQuizPassed({ correct: 8, total: 10 }), true, '8/10 passes')
  assert.equal(practicalMathQuizPassed({ correct: 7, total: 10 }), false, '7/10 fails')

  // 11-question quiz: ceil(8.25) = 9 required
  assert.equal(practicalMathQuizPassed({ correct: 9, total: 11 }), true, '9/11 passes')
  assert.equal(practicalMathQuizPassed({ correct: 8, total: 11 }), false, '8/11 fails')

  // 12-question quiz: ceil(9) = 9 required
  assert.equal(practicalMathQuizPassed({ correct: 9, total: 12 }), true, '9/12 passes')
  assert.equal(practicalMathQuizPassed({ correct: 8, total: 12 }), false, '8/12 fails')

  assert.equal(practicalMathQuizPassed({ correct: 0, total: 0 }), false, 'empty quiz fails safely')
}

function testSequentialProgression() {
  const progress = emptyPracticalMathProgress()
  const first = findNextPracticalMathModule(practicalMathematicsCourse, progress)
  assert.ok(first, 'a next module exists for empty progress')
  assert.equal(first!.moduleNumber, 1, 'first module is M1')

  const m1 = practicalMathematicsCourse.modules[0]!
  for (const l of m1.lessons) progress.completedLessonKeys.add(lessonKey(m1, l.lessonNumber))
  progress.passedModuleQuizzes.set(m1.slug, { correct: 8, total: m1.moduleQuiz.length })

  assert.equal(moduleAllLessonsComplete(m1, progress), true, 'M1 lessons complete')
  assert.equal(moduleQuizPassed(m1, progress), true, 'M1 quiz passed')
  assert.equal(moduleFullyComplete(m1, progress), true, 'M1 fully complete')

  const second = findNextPracticalMathModule(practicalMathematicsCourse, progress)
  assert.equal(second!.moduleNumber, 2, 'second module unlocks once M1 fully complete')

  const m2 = practicalMathematicsCourse.modules[1]!
  for (const l of m2.lessons) progress.completedLessonKeys.add(lessonKey(m2, l.lessonNumber))
  assert.equal(moduleQuizPassed(m2, progress), false, 'M2 quiz still unpassed without record')
  assert.equal(
    findNextPracticalMathModule(practicalMathematicsCourse, progress)!.moduleNumber,
    2,
    'next remains M2 until quiz passes',
  )

  progress.passedModuleQuizzes.set(m2.slug, { correct: 5, total: m2.moduleQuiz.length })
  assert.equal(moduleQuizPassed(m2, progress), false, '5 correct on a 10-question quiz fails at 75%')

  progress.passedModuleQuizzes.set(m2.slug, { correct: 8, total: m2.moduleQuiz.length })
  assert.equal(moduleQuizPassed(m2, progress), true, '8 correct on a 10-question quiz passes')
  assert.equal(
    findNextPracticalMathModule(practicalMathematicsCourse, progress)!.moduleNumber,
    3,
    'next advances to M3 once M2 is fully complete',
  )

  assert.equal(
    isPracticalMathCourseFullyComplete(practicalMathematicsCourse, progress),
    false,
    'course not fully complete after only M1 and M2',
  )
}

function testFullCourseComplete() {
  const progress = emptyPracticalMathProgress()
  for (const m of practicalMathematicsCourse.modules) {
    for (const l of m.lessons) progress.completedLessonKeys.add(lessonKey(m, l.lessonNumber))
    progress.passedModuleQuizzes.set(m.slug, { correct: m.moduleQuiz.length, total: m.moduleQuiz.length })
  }
  assert.equal(
    isPracticalMathCourseFullyComplete(practicalMathematicsCourse, progress),
    true,
    'every module lessons + quiz passed marks course fully complete',
  )
  assert.equal(
    findNextPracticalMathModule(practicalMathematicsCourse, progress),
    undefined,
    'no next module when fully complete',
  )
  assert.equal(practicalMathCertificateEligible(practicalMathematicsCourse, progress), false, 'certificate blocked without capstone')
  progress.capstoneComplete = true
  assert.equal(practicalMathCertificateEligible(practicalMathematicsCourse, progress), true, 'certificate eligible with capstone')
  const pct = practicalMathWeightedScorePercent(practicalMathematicsCourse, progress)
  assert.ok(pct !== null && pct >= 75, 'overall weighted score meets 75%')
}

function testCertificateNeedsOverall75() {
  const progress = emptyPracticalMathProgress()
  for (const m of practicalMathematicsCourse.modules) {
    for (const l of m.lessons) progress.completedLessonKeys.add(lessonKey(m, l.lessonNumber))
    const t = m.moduleQuiz.length
    const need = Math.ceil(t * 0.75)
    progress.passedModuleQuizzes.set(m.slug, { correct: need, total: t })
  }
  progress.capstoneComplete = true
  assert.equal(practicalMathCertificateEligible(practicalMathematicsCourse, progress), true, 'min passing scores + capstone unlock')
  const pct = practicalMathWeightedScorePercent(practicalMathematicsCourse, progress)
  assert.ok(pct !== null && pct + 1e-9 >= 75, 'aggregate at least 75% when each module meets bar')
}

function testCertificateRequiresCapstone() {
  const progress = emptyPracticalMathProgress()
  for (const m of practicalMathematicsCourse.modules) {
    for (const l of m.lessons) progress.completedLessonKeys.add(lessonKey(m, l.lessonNumber))
    progress.passedModuleQuizzes.set(m.slug, { correct: m.moduleQuiz.length, total: m.moduleQuiz.length })
  }
  assert.equal(progress.capstoneComplete, false, 'empty progress capstone flag')
  assert.equal(practicalMathCertificateEligible(practicalMathematicsCourse, progress), false, 'no certificate without capstone')
  progress.capstoneComplete = true
  assert.equal(practicalMathCertificateEligible(practicalMathematicsCourse, progress), true, 'certificate with capstone')
}

function testCatalogAdapter() {
  assert.equal(STANDALONE_LEARNER_CATALOG.length >= 1, true, 'catalog has at least one entry')
  const entry = findStandaloneCourseBySlug(PRACTICAL_MATH_SLUG)
  assert.ok(entry, 'catalog finds practical-math by slug')
  assert.equal(entry!.accessLabel, 'Free', 'catalog entry is free-facing')
  assert.equal(entry!.publicRoute, `/learn/${PRACTICAL_MATH_SLUG}`, 'public route matches convention')

  const byKey = findStandaloneCourseByInternalKey(PRACTICAL_MATH_INTERNAL_KEY)
  assert.ok(byKey, 'catalog finds practical-math by internal key')

  assert.equal(isStandaloneCourseSlug(PRACTICAL_MATH_SLUG), true, 'slug is recognised as standalone')
  assert.equal(isStandaloneCourseSlug('ai-essentials'), false, 'flagship slug is not standalone')
}

function testFlagshipAdapter() {
  assert.equal(
    practicalMathFlagshipCurriculum.modules.length,
    16,
    'adapter exposes 16 modules in flagship-shape',
  )
  for (const m of practicalMathFlagshipCurriculum.modules) {
    assert.ok(m.id.startsWith('pm-m'), `adapter module id ${m.id} namespaced as pm-mNN`)
  }
}

function main() {
  testQuizPassThreshold()
  testSequentialProgression()
  testFullCourseComplete()
  testCertificateNeedsOverall75()
  testCertificateRequiresCapstone()
  testCatalogAdapter()
  testFlagshipAdapter()
  console.log('test-practical-mathematics-progression: OK')
}

main()
