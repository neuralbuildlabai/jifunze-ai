/**
 * Continuity checks for the Business Process Automation for Work standalone course.
 * Asserts: slug, internalKey, 5 modules, 12 quiz questions, dataset values, learner practice,
 * certificate config, catalog presence, no slug collisions with flagship courses.
 *
 * Run: `npm run verify:business-process-automation`
 * No Supabase or network access required.
 */

import assert from 'node:assert/strict'

import {
  businessProcessAutomationCourse,
  BUSINESS_PROCESS_AUTOMATION_SLUG,
  BUSINESS_PROCESS_AUTOMATION_INTERNAL_KEY,
  STANDALONE_LEARNER_CATALOG,
  getStandaloneLessonSlug,
} from '../src/data/courses'
import { FLAGSHIP_CURRICULUM_SLUGS } from '../src/data/learning/flagshipCourseCurricula'

function testCourseShellAndIdentity() {
  assert.equal(businessProcessAutomationCourse.slug, BUSINESS_PROCESS_AUTOMATION_SLUG, 'slug constant matches export')
  assert.equal(businessProcessAutomationCourse.internalKey, BUSINESS_PROCESS_AUTOMATION_INTERNAL_KEY, 'internalKey constant matches export')
  assert.equal(businessProcessAutomationCourse.isolation.type, 'standalone', 'isolation marker present')
  assert.equal(businessProcessAutomationCourse.accessLabel, 'Free', 'free-facing access label')
  assert.equal(businessProcessAutomationCourse.modules.length, 5, 'course has exactly 5 modules')
  assert.equal(businessProcessAutomationCourse.certificateIdPrefix, 'BPA', 'certificate prefix is BPA')
  assert.ok(businessProcessAutomationCourse.safetyDisclaimer.length > 80, 'safetyDisclaimer is substantive')
  assert.ok(businessProcessAutomationCourse.title.includes('Business Process Automation'), 'title includes course name')
  assert.ok(businessProcessAutomationCourse.learningOutcomes.length >= 8, 'at least 8 learning outcomes')
  assert.ok(businessProcessAutomationCourse.targetAudience.length >= 5, 'at least 5 target audience entries')
}

function testModuleOrderAndSlugs() {
  const expectedSlugs = [
    'automation-foundations',
    'understanding-current-workflow',
    'finding-automation-opportunities',
    'designing-future-workflow',
    'business-value-risk-implementation',
  ]
  assert.equal(businessProcessAutomationCourse.modules.length, expectedSlugs.length, 'module count matches expected')
  for (let i = 0; i < expectedSlugs.length; i++) {
    const m = businessProcessAutomationCourse.modules[i]
    assert.ok(m, `module at index ${i} exists`)
    assert.equal(m.moduleNumber, i + 1, `module #${i + 1} has correct moduleNumber`)
    assert.equal(m.slug, expectedSlugs[i], `module #${i + 1} slug matches expected`)
  }
  const slugSet = new Set(businessProcessAutomationCourse.modules.map((m) => m.slug))
  assert.equal(slugSet.size, 5, 'all module slugs are unique within the course')
}

function testModuleStructure() {
  for (const m of businessProcessAutomationCourse.modules) {
    assert.ok(m.lessons.length >= 4, `${m.slug}: at least 4 lessons (got ${m.lessons.length})`)
    assert.ok(m.overview.length > 20, `${m.slug}: overview is non-empty`)
    assert.ok(m.whyThisMatters.length >= 1, `${m.slug}: whyThisMatters present`)
    assert.ok(m.learningObjectives.length >= 2, `${m.slug}: at least 2 learning objectives`)
    assert.ok(m.moduleSummary.length > 20, `${m.slug}: moduleSummary present`)
    assert.ok(m.completionChecklist.length >= 2, `${m.slug}: completionChecklist present`)
    assert.ok(m.practiceLab.scenarios.length >= 1, `${m.slug}: practice lab has at least 1 scenario`)
    assert.ok(m.practiceLab.title.length > 0, `${m.slug}: practice lab has a title`)

    for (const l of m.lessons) {
      assert.ok(l.lessonNumber.startsWith(`${m.moduleNumber}.`), `${m.slug} lesson ${l.lessonNumber}: numbered with correct module prefix`)
      assert.ok(l.learnerGoal.length > 10, `${m.slug} lesson ${l.lessonNumber}: learnerGoal present`)
      assert.ok(l.blocks.length > 0, `${m.slug} lesson ${l.lessonNumber}: at least one block`)
    }
  }
}

function testQuizStructure() {
  const quizModule = businessProcessAutomationCourse.modules.find((m) => m.slug === 'business-value-risk-implementation')
  assert.ok(quizModule, 'Module 5 (business-value-risk-implementation) exists')
  assert.equal(quizModule!.moduleQuiz.length, 12, 'Module 5 quiz has exactly 12 questions')

  const quizIds = new Set<string>()
  let hardOrMedium = 0

  for (const q of quizModule!.moduleQuiz) {
    assert.ok(q.id.length > 0, `quiz item: id present`)
    assert.ok(!quizIds.has(q.id), `quiz item: duplicate id ${q.id}`)
    quizIds.add(q.id)

    assert.ok(q.question.length > 0, `${q.id}: question text present`)
    assert.ok(q.correctAnswer.length > 0, `${q.id}: correctAnswer present`)
    assert.ok(q.explanation.length > 0, `${q.id}: explanation present`)
    assert.ok(q.relatedLesson.length > 0, `${q.id}: relatedLesson present`)
    assert.ok(['easy', 'medium', 'hard'].includes(q.difficulty), `${q.id}: valid difficulty`)
    assert.ok(
      ['multiple_choice', 'scenario', 'calculation', 'short_answer'].includes(q.type),
      `${q.id}: valid type`,
    )

    if (q.type === 'multiple_choice' || q.type === 'scenario') {
      assert.ok(Array.isArray(q.options) && q.options.length === 4, `${q.id}: scenario/MC question has exactly 4 options`)
      assert.ok(q.options!.includes(q.correctAnswer), `${q.id}: correctAnswer is one of the 4 options`)
    }

    if (q.difficulty === 'medium' || q.difficulty === 'hard') hardOrMedium++
  }

  assert.ok(hardOrMedium >= 4, `Module 5 quiz: at least 4 medium/hard questions (got ${hardOrMedium})`)
}

function testNonQuizModulesHaveEmptyQuiz() {
  for (const m of businessProcessAutomationCourse.modules) {
    if (m.slug !== 'business-value-risk-implementation') {
      assert.equal(m.moduleQuiz.length, 0, `${m.slug}: non-quiz modules must have empty moduleQuiz array`)
    }
  }
}

function testDatasetValuesPresent() {
  const module2 = businessProcessAutomationCourse.modules.find((m) => m.slug === 'understanding-current-workflow')
  assert.ok(module2, 'Module 2 (understanding-current-workflow) exists')

  const allModule2Content = JSON.stringify(module2)
  assert.ok(allModule2Content.includes('75.3'), 'Module 2 references the 75.3 total hours baseline')
  assert.ok(allModule2Content.includes('120'), 'Module 2 references 120 enquiries/month volume')
  assert.ok(allModule2Content.includes('16.0'), 'Module 2 references 16.0 hrs for respond-to-enquiry')
  assert.ok(allModule2Content.includes('18%') || allModule2Content.includes('18'), 'Module 2 references 18% certificate error rate')
  assert.ok(allModule2Content.includes('11.6'), 'Module 2 references 11.6 hrs for certificate preparation')
}

function testProjectedSavingsValuesPresent() {
  const module5 = businessProcessAutomationCourse.modules.find((m) => m.slug === 'business-value-risk-implementation')
  assert.ok(module5, 'Module 5 (business-value-risk-implementation) exists')

  const allModule5Content = JSON.stringify(module5)
  assert.ok(allModule5Content.includes('44.6'), 'Module 5 references 44.6 hours total saved')
  assert.ok(allModule5Content.includes('802.80') || allModule5Content.includes('$802'), 'Module 5 references the $802.80 labor value calculation')
  assert.ok(allModule5Content.includes('10.8'), 'Module 5 references 10.8 hrs saved from course info automation')
  assert.ok(allModule5Content.includes('8.1'), 'Module 5 references 8.1 hrs saved from certificate automation')
}

function testCaseStudyPresent() {
  const caseStudy = businessProcessAutomationCourse.microWorkshopDetail?.caseStudy
  assert.ok(caseStudy, 'microWorkshopDetail.caseStudy is present')
  assert.ok(caseStudy!.headline.includes('BrightPath'), 'case study headline references BrightPath')
  assert.ok(caseStudy!.centralProblem.length > 50, 'central problem description is substantive')
}

function testLearnerPracticePresent() {
  const module5 = businessProcessAutomationCourse.modules.find((m) => m.slug === 'business-value-risk-implementation')
  assert.ok(module5, 'Module 5 exists')

  const practiceScenarios = module5!.practiceLab.scenarios
  assert.ok(practiceScenarios.length >= 4, `Module 5 practice lab has at least 4 scenarios (8-question practice, got ${practiceScenarios.length})`)

  for (const s of practiceScenarios) {
    assert.ok(s.id.length > 0, `practice scenario: id present`)
    assert.ok(s.prompt.length > 10, `practice scenario ${s.id}: prompt is substantive`)
    assert.ok(s.answerKey.length > 10, `practice scenario ${s.id}: answerKey is substantive`)
  }

  const lessonWithPractice = module5!.lessons.find((l) =>
    l.blocks.some((b) => b.type === 'practice_task'),
  )
  assert.ok(lessonWithPractice, 'Module 5 has a lesson containing a practice_task block')
}

function testRoadmapPresent() {
  const module5 = businessProcessAutomationCourse.modules.find((m) => m.slug === 'business-value-risk-implementation')
  const module5Content = JSON.stringify(module5)
  assert.ok(module5Content.includes('30') && module5Content.includes('60') && module5Content.includes('90'), 'Module 5 contains 30-60-90 day roadmap content')
}

function testRiskChecklistPresent() {
  const module5 = businessProcessAutomationCourse.modules.find((m) => m.slug === 'business-value-risk-implementation')
  const module5Content = JSON.stringify(module5)
  assert.ok(module5Content.toLowerCase().includes('audit'), 'Module 5 risk content mentions audit trail')
  assert.ok(module5Content.toLowerCase().includes('payment'), 'Module 5 risk content mentions payment risk')
  assert.ok(module5Content.toLowerCase().includes('fallback') || module5Content.toLowerCase().includes('backup'), 'Module 5 risk content mentions fallback/backup process')
}

function testChangeManagementPresent() {
  const module5 = businessProcessAutomationCourse.modules.find((m) => m.slug === 'business-value-risk-implementation')
  const module5Content = JSON.stringify(module5)
  assert.ok(module5Content.toLowerCase().includes('change'), 'Module 5 includes change management content')
  assert.ok(module5Content.toLowerCase().includes('staff'), 'Module 5 change management references staff')
}

function testCertificateConfig() {
  assert.equal(businessProcessAutomationCourse.certificateIdPrefix, 'BPA', 'certificate prefix is BPA (not PM or BA — no collision)')
  assert.ok(businessProcessAutomationCourse.capstoneModuleSlug === 'business-value-risk-implementation', 'capstoneModuleSlug points to Module 5')
  assert.ok(businessProcessAutomationCourse.capstoneAcknowledgement.title.length > 0, 'capstone acknowledgment title present')
  assert.ok(businessProcessAutomationCourse.capstoneAcknowledgement.checkboxLabel.length > 0, 'capstone checkbox label present')
  assert.ok(businessProcessAutomationCourse.completionRequirements.passThreshold.includes('75%'), 'pass threshold specifies 75%')
  assert.ok(businessProcessAutomationCourse.completionRequirements.passThreshold.includes('12'), 'pass threshold references 12 questions')
}

function testCatalogPresence() {
  const entry = STANDALONE_LEARNER_CATALOG.find((c) => c.slug === BUSINESS_PROCESS_AUTOMATION_SLUG)
  assert.ok(entry, 'course is present in STANDALONE_LEARNER_CATALOG')
  assert.equal(entry!.internalKey, BUSINESS_PROCESS_AUTOMATION_INTERNAL_KEY, 'catalog entry internalKey matches constant')
  assert.ok(entry!.publicRoute.includes('business-process-automation-for-work'), 'catalog publicRoute includes slug')
  assert.ok(entry!.title.length > 0, 'catalog entry has a title')
  assert.ok(entry!.subtitle.length > 0, 'catalog entry has a subtitle')
}

function testNoFlagshipSlugCollisions() {
  for (const flagshipSlug of FLAGSHIP_CURRICULUM_SLUGS) {
    assert.notEqual(flagshipSlug, businessProcessAutomationCourse.slug, `flagship slug ${flagshipSlug} must not collide with BPA course slug`)
  }
  assert.ok(
    !FLAGSHIP_CURRICULUM_SLUGS.includes(businessProcessAutomationCourse.slug as never),
    'BPA slug is not in flagship slugs list',
  )
}

function testInternalKeyIsUniqueAcrossCatalog() {
  const keys = STANDALONE_LEARNER_CATALOG.map((c) => c.internalKey)
  const keySet = new Set(keys)
  assert.equal(keySet.size, keys.length, 'all standalone catalog internalKeys are unique')
}

function testLessonUrlSlugsUniqueWithinEachModule() {
  for (const m of businessProcessAutomationCourse.modules) {
    const seen = new Set<string>()
    for (const l of m.lessons) {
      const s = getStandaloneLessonSlug(l)
      assert.ok(!seen.has(s), `${m.slug}: duplicate lesson URL slug '${s}'`)
      seen.add(s)
    }
  }
}

function testModuleMapMatchesModules() {
  assert.equal(
    businessProcessAutomationCourse.moduleMap.length,
    businessProcessAutomationCourse.modules.length,
    'moduleMap length matches modules length',
  )
  for (let i = 0; i < businessProcessAutomationCourse.modules.length; i++) {
    const mapEntry = businessProcessAutomationCourse.moduleMap[i]
    const module = businessProcessAutomationCourse.modules[i]
    assert.equal(mapEntry!.number, module!.moduleNumber, `moduleMap entry ${i} number matches`)
    assert.equal(mapEntry!.slug, module!.slug, `moduleMap entry ${i} slug matches`)
  }
}

function main() {
  testCourseShellAndIdentity()
  testModuleOrderAndSlugs()
  testModuleStructure()
  testQuizStructure()
  testNonQuizModulesHaveEmptyQuiz()
  testDatasetValuesPresent()
  testProjectedSavingsValuesPresent()
  testCaseStudyPresent()
  testLearnerPracticePresent()
  testRoadmapPresent()
  testRiskChecklistPresent()
  testChangeManagementPresent()
  testCertificateConfig()
  testCatalogPresence()
  testNoFlagshipSlugCollisions()
  testInternalKeyIsUniqueAcrossCatalog()
  testLessonUrlSlugsUniqueWithinEachModule()
  testModuleMapMatchesModules()
  console.log('verify-business-process-automation-course: OK — all checks passed')
}

main()
