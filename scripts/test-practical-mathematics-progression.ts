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
  practicalMathQuizPassed,
  STANDALONE_LEARNER_CATALOG,
} from '../src/data/courses'
import { practicalMathFlagshipCurriculum } from '../src/data/courses/practicalMathematicsFlagshipAdapter'

function testQuizPassThreshold() {
  // 8-question fallback: ≥6 of 8
  assert.equal(practicalMathQuizPassed({ correct: 6, total: 8 }), true, '6/8 passes')
  assert.equal(practicalMathQuizPassed({ correct: 5, total: 8 }), false, '5/8 fails')

  // 10-question quiz: ceil(0.7 × 10) = 7 required
  assert.equal(practicalMathQuizPassed({ correct: 7, total: 10 }), true, '7/10 passes')
  assert.equal(practicalMathQuizPassed({ correct: 6, total: 10 }), false, '6/10 fails')

  // 11-question quiz: ceil(0.7 × 11) = 8 required
  assert.equal(practicalMathQuizPassed({ correct: 8, total: 11 }), true, '8/11 passes')
  assert.equal(practicalMathQuizPassed({ correct: 7, total: 11 }), false, '7/11 fails')

  // 12-question quiz: ceil(0.7 × 12) = 9 required
  assert.equal(practicalMathQuizPassed({ correct: 9, total: 12 }), true, '9/12 passes')
  assert.equal(practicalMathQuizPassed({ correct: 8, total: 12 }), false, '8/12 fails')

  // total 0 should fail safely (no division by zero)
  assert.equal(practicalMathQuizPassed({ correct: 0, total: 0 }), false, 'empty quiz fails safely')
}

function testSequentialProgression() {
  const progress = emptyPracticalMathProgress()
  // initial: nothing complete; first module is M1
  const first = findNextPracticalMathModule(practicalMathematicsCourse, progress)
  assert.ok(first, 'a next module exists for empty progress')
  assert.equal(first!.moduleNumber, 1, 'first module is M1')

  // mark M1 lessons complete and quiz passed
  const m1 = practicalMathematicsCourse.modules[0]!
  for (const l of m1.lessons) progress.completedLessonKeys.add(lessonKey(m1, l.lessonNumber))
  progress.passedModuleQuizzes.set(m1.slug, { correct: 8, total: m1.moduleQuiz.length })

  assert.equal(moduleAllLessonsComplete(m1, progress), true, 'M1 lessons complete')
  assert.equal(moduleQuizPassed(m1, progress), true, 'M1 quiz passed')
  assert.equal(moduleFullyComplete(m1, progress), true, 'M1 fully complete')

  const second = findNextPracticalMathModule(practicalMathematicsCourse, progress)
  assert.equal(second!.moduleNumber, 2, 'second module unlocks once M1 fully complete')

  // missing quiz: even if all lessons of M2 are done, quiz must pass
  const m2 = practicalMathematicsCourse.modules[1]!
  for (const l of m2.lessons) progress.completedLessonKeys.add(lessonKey(m2, l.lessonNumber))
  assert.equal(moduleQuizPassed(m2, progress), false, 'M2 quiz still unpassed without record')
  assert.equal(
    findNextPracticalMathModule(practicalMathematicsCourse, progress)!.moduleNumber,
    2,
    'next remains M2 until quiz passes',
  )

  // failing quiz score does not pass
  progress.passedModuleQuizzes.set(m2.slug, { correct: 5, total: m2.moduleQuiz.length })
  assert.equal(moduleQuizPassed(m2, progress), false, '5 correct on a 10-question quiz fails')

  // passing score lets progression advance
  progress.passedModuleQuizzes.set(m2.slug, { correct: 7, total: m2.moduleQuiz.length })
  assert.equal(moduleQuizPassed(m2, progress), true, '7 correct on a 10-question quiz passes')
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
  testCatalogAdapter()
  testFlagshipAdapter()
  console.log('test-practical-mathematics-progression: OK')
}

main()
