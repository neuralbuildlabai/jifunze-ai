/**
 * Continuity checks for the standalone Practical Mathematics course.
 * Asserts: 16 modules in approved order, ≥4 lessons + ≥8 quiz items per module,
 * required safety notes present, course-level disclaimer present, no slug collisions
 * with existing flagship slugs, capstone rubric ids do not collide with AI Essentials.
 *
 * Run: `npm run verify:practical-math`
 * No Supabase or network access required.
 */

import assert from 'node:assert/strict'

import {
  practicalMathematicsCourse,
  PRACTICAL_MATH_MODULE_SLUGS,
  PRACTICAL_MATH_MODULES_REQUIRING_SAFETY_NOTE,
  PRACTICAL_MATH_INTERNAL_KEY,
  PRACTICAL_MATH_SLUG,
  PRACTICAL_MATH_CAPSTONE_RUBRIC_CRITERIA,
} from '../src/data/courses'
import { practicalMathFlagshipCurriculum } from '../src/data/courses/practicalMathematicsFlagshipAdapter'
import { FLAGSHIP_CURRICULUM_SLUGS } from '../src/data/learning/flagshipCourseCurricula'
import { AI_ESSENTIALS_CAPSTONE_RUBRIC_IDS } from '../src/lib/flagshipCourseProgressDerived'

function testCourseShellAndIdentity() {
  assert.equal(practicalMathematicsCourse.slug, PRACTICAL_MATH_SLUG, 'slug constant matches export')
  assert.equal(
    practicalMathematicsCourse.internalKey,
    PRACTICAL_MATH_INTERNAL_KEY,
    'internalKey constant matches export',
  )
  assert.equal(practicalMathematicsCourse.isolation.type, 'standalone', 'isolation marker present')
  assert.equal(practicalMathematicsCourse.accessLabel, 'Free', 'free-facing label')
  assert.equal(practicalMathematicsCourse.modules.length, 16, '16 modules')
  assert.ok(
    practicalMathematicsCourse.safetyDisclaimer.length > 80,
    'course-level safetyDisclaimer is non-empty and substantive',
  )
}

function testApprovedModuleOrderAndSlugs() {
  assert.equal(PRACTICAL_MATH_MODULE_SLUGS.length, 16, 'approved module slug list has 16 entries')
  for (let i = 0; i < 16; i++) {
    const expected = PRACTICAL_MATH_MODULE_SLUGS[i]
    const actual = practicalMathematicsCourse.modules[i]
    assert.ok(actual, `module at index ${i} exists`)
    assert.equal(actual.moduleNumber, i + 1, `module #${i + 1} order`)
    assert.equal(actual.slug, expected, `module #${i + 1} slug matches approved`)
  }
  // unique slugs within the course
  const slugSet = new Set(practicalMathematicsCourse.modules.map((m) => m.slug))
  assert.equal(slugSet.size, 16, 'module slugs are unique within the course')
}

function testEveryModuleStructure() {
  for (const m of practicalMathematicsCourse.modules) {
    assert.ok(m.lessons.length >= 4, `${m.slug}: ≥4 lessons (got ${m.lessons.length})`)
    assert.ok(m.moduleQuiz.length >= 8, `${m.slug}: ≥8 quiz items (got ${m.moduleQuiz.length})`)
    assert.ok(m.practiceLab.scenarios.length >= 3, `${m.slug}: practice lab has scenarios`)
    assert.ok(m.moduleSummary.length > 20, `${m.slug}: moduleSummary present`)
    assert.ok(m.completionChecklist.length >= 3, `${m.slug}: completionChecklist present`)

    // every lesson has a learner goal and at least one block
    for (const l of m.lessons) {
      assert.ok(l.lessonNumber.startsWith(`${m.moduleNumber}.`), `${m.slug} lesson ${l.lessonNumber} numbered correctly`)
      assert.ok(l.learnerGoal.length > 10, `${m.slug} lesson ${l.lessonNumber}: learnerGoal present`)
      assert.ok(l.blocks.length > 0, `${m.slug} lesson ${l.lessonNumber}: at least one block`)
    }

    // every quiz item has the required fields
    const quizIds = new Set<string>()
    let mediumOrHard = 0
    for (const q of m.moduleQuiz) {
      assert.ok(q.id.length > 0, `${m.slug}: quiz id present`)
      assert.ok(!quizIds.has(q.id), `${m.slug}: duplicate quiz id ${q.id}`)
      quizIds.add(q.id)
      assert.ok(q.question.length > 0, `${m.slug} ${q.id}: question text present`)
      assert.ok(
        ['multiple_choice', 'short_answer', 'calculation', 'scenario'].includes(q.type),
        `${m.slug} ${q.id}: valid type`,
      )
      assert.ok(q.correctAnswer.length > 0, `${m.slug} ${q.id}: correctAnswer present`)
      assert.ok(q.explanation.length > 0, `${m.slug} ${q.id}: explanation present`)
      assert.ok(q.relatedLesson.startsWith(`${m.moduleNumber}.`), `${m.slug} ${q.id}: relatedLesson aligned`)
      assert.ok(['easy', 'medium', 'hard'].includes(q.difficulty), `${m.slug} ${q.id}: valid difficulty`)
      if (q.type === 'multiple_choice' || q.type === 'scenario') {
        assert.ok(
          Array.isArray(q.options) && q.options.length >= 2,
          `${m.slug} ${q.id}: options provided for ${q.type}`,
        )
      }
      if (q.difficulty === 'medium' || q.difficulty === 'hard') mediumOrHard += 1
    }
    assert.ok(
      mediumOrHard >= 2,
      `${m.slug}: at least two medium/hard quiz items (got ${mediumOrHard})`,
    )
  }
}

function testSafetyNotesOnRequiredModules() {
  for (const slug of PRACTICAL_MATH_MODULES_REQUIRING_SAFETY_NOTE) {
    const m = practicalMathematicsCourse.modules.find((mm) => mm.slug === slug)
    assert.ok(m, `module ${slug} present in course`)
    assert.ok(
      typeof m!.safetyNote === 'string' && m!.safetyNote!.length > 60,
      `module ${slug}: safetyNote present and substantive`,
    )
  }
}

function testNoFlagshipSlugCollisions() {
  for (const flagshipSlug of FLAGSHIP_CURRICULUM_SLUGS) {
    assert.notEqual(
      flagshipSlug,
      practicalMathematicsCourse.slug,
      `flagship slug ${flagshipSlug} must not collide with practical-math course slug`,
    )
  }
  // Module ids are namespaced via the adapter and must not collide with `ae-mNN`.
  for (const m of practicalMathFlagshipCurriculum.modules) {
    assert.ok(m.id.startsWith('pm-m'), `adapter module id ${m.id} is namespaced`)
    assert.ok(!m.id.startsWith('ae-m'), `adapter module id ${m.id} does not collide with AI Essentials`)
  }
}

function testCapstoneRubricIsolation() {
  const pmIds = PRACTICAL_MATH_CAPSTONE_RUBRIC_CRITERIA.map((c) => c.id)
  assert.equal(new Set(pmIds).size, pmIds.length, 'practical-math rubric ids are unique')
  for (const id of pmIds) {
    assert.ok(
      !(AI_ESSENTIALS_CAPSTONE_RUBRIC_IDS as readonly string[]).includes(id),
      `practical-math rubric id ${id} must not collide with AI Essentials rubric ids`,
    )
  }
}

function testFlagshipAdapterMapping() {
  assert.equal(
    practicalMathFlagshipCurriculum.slug,
    practicalMathematicsCourse.slug,
    'adapter exposes the same course slug',
  )
  assert.equal(
    practicalMathFlagshipCurriculum.modules.length,
    practicalMathematicsCourse.modules.length,
    'adapter has same module count',
  )
  for (let i = 0; i < practicalMathFlagshipCurriculum.modules.length; i++) {
    assert.equal(
      practicalMathFlagshipCurriculum.modules[i]!.order,
      practicalMathematicsCourse.modules[i]!.moduleNumber,
      `adapter module #${i + 1} order matches`,
    )
  }
}

function main() {
  testCourseShellAndIdentity()
  testApprovedModuleOrderAndSlugs()
  testEveryModuleStructure()
  testSafetyNotesOnRequiredModules()
  testNoFlagshipSlugCollisions()
  testCapstoneRubricIsolation()
  testFlagshipAdapterMapping()
  console.log('verify-practical-mathematics-continuity: OK')
}

main()
