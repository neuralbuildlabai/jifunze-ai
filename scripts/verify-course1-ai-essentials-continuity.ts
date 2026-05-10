/**
 * Continuity checks for AI Essentials (ai-essentials): 16 modules, sessions, quiz bank,
 * bespoke mastery triples, milestone config sanity, forbidden learner-copy substrings.
 * No Supabase; run: npm run verify:course1-ai-essentials
 */

import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { AI_ESSENTIALS_FLAGSHIP_MODULES } from '../src/data/learning/aiEssentialsCourse1Modules'
import { course1AiEssentialsQuizQuestionsForModule } from '../src/data/learning/course1AiEssentialsQuizBank'
import { getFlagshipCurriculum } from '../src/data/learning/flagshipCourseCurricula'
import { buildSessionsForCurriculum } from '../src/data/learning/flagshipCourseSessions'
import { portfolioOutputsForPathway } from '../src/data/learning/portfolioOutputsCatalog'
import {
  AI_ESSENTIALS_CAPSTONE_RUBRIC_IDS,
  aeCapstoneRubricAllCriteriaReadyPlus,
  completionSet,
  isFlagshipCertificateReady,
  moduleFullyComplete,
  type AeCapstoneRubricSelfGrade,
  type FlagshipCourseProgressState,
} from '../src/lib/flagshipCourseProgressDerived'
import { bespokeAssessmentTriple } from '../src/lib/flagshipAssessmentBespokeModules'
import { parseAeCapstoneRubricSelfGradeJson } from '../src/lib/aeCapstoneRubricPersistence'
import {
  getFlagshipCourseDisplayProgressPercent,
  AI_ESSENTIALS_SLUG,
} from '../src/lib/aiEssentialsProgressMilestones'
import { AI_ESSENTIALS_MODULE_LEARNER_CARD } from '../src/lib/aiEssentialsCourseUiMeta'
import { mergeFlagshipProgressStates } from '../src/lib/flagshipCourseProgressMerge'
import {
  flagshipProgressRowToState,
  flagshipProgressStateToUpsertPayload,
  type FlagshipCourseProgressRow,
} from '../src/services/learning/flagshipCourseProgressRemote'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

function readSrc(rel: string): string {
  return readFileSync(join(root, rel), 'utf8')
}

function assertNoForbiddenLearnerCopy(label: string, text: string) {
  const lower = text.toLowerCase()
  assert.ok(!lower.includes('premium'), `${label}: avoid "premium" in learner-facing copy`)
  assert.ok(!text.includes('M12_'), `${label}: use Module12_… not M12_`)
  assert.ok(!text.includes('Module16_Capstone_Bundle'), `${label}: use Module16_AI_Workflow_Capstone_… naming`)
}

function testModuleSpineMatchesExport() {
  const curriculum = getFlagshipCurriculum(AI_ESSENTIALS_SLUG)
  assert.ok(curriculum, 'ai-essentials curriculum exists')
  assert.equal(curriculum.modules.length, 16, 'exactly 16 modules')
  for (let i = 0; i < 16; i++) {
    const want = `ae-m${String(i + 1).padStart(2, '0')}`
    assert.equal(curriculum.modules[i]!.id, want, `module order ${i + 1}`)
    assert.equal(curriculum.modules[i]!.order, i + 1)
  }
  const exp = AI_ESSENTIALS_FLAGSHIP_MODULES.map((m) => m.id)
  const act = curriculum.modules.map((m) => m.id)
  assert.deepEqual(act, exp, 'curriculum module ids must match AI_ESSENTIALS_FLAGSHIP_MODULES')
}

function testSessionsQuizBespoke() {
  const curriculum = getFlagshipCurriculum(AI_ESSENTIALS_SLUG)!
  const sessions = buildSessionsForCurriculum(curriculum)
  assert.ok(sessions.some((s) => s.id === 'ai-essentials-capstone-prep'), 'capstone_prep session present')

  for (const m of curriculum.modules) {
    const modSessions = sessions.filter((s) => s.moduleId === m.id)
    assert.ok(modSessions.length > 0, `${m.id}: at least one session`)
    const bank = course1AiEssentialsQuizQuestionsForModule(m.id)
    assert.ok(bank.length >= 6, `${m.id}: quiz bank should be non-trivial`)
    const bespoke = bespokeAssessmentTriple(m.id)
    assert.ok(bespoke && bespoke.length === 3, `${m.id}: mastery trio (bespoke or prestamped)`)
  }
}

function testCapstoneRubricIds() {
  assert.equal(AI_ESSENTIALS_CAPSTONE_RUBRIC_IDS.length, 7)
  const seen = new Set(AI_ESSENTIALS_CAPSTONE_RUBRIC_IDS)
  assert.equal(seen.size, 7, 'rubric criterion ids must be unique')
}

function testDisplayPercentMilestoneOne() {
  const curriculum = getFlagshipCurriculum(AI_ESSENTIALS_SLUG)!
  const sessions = buildSessionsForCurriculum(curriculum)
  const m01Sessions = sessions.filter((s) => s.moduleId === 'ae-m01').map((s) => s.id)
  assert.ok(m01Sessions.length > 0)

  const empty: FlagshipCourseProgressState = { version: 1, completedSessionIds: [], flaggedForReviewSessionIds: [] }
  assert.equal(getFlagshipCourseDisplayProgressPercent(AI_ESSENTIALS_SLUG, curriculum, sessions, empty), 0)

  const allM01Done: FlagshipCourseProgressState = {
    ...empty,
    completedSessionIds: [...m01Sessions],
    moduleQuiz: {
      'ae-m01': { passedAt: new Date().toISOString() },
    },
    completedMasteryCheckpointIds: bespokeAssessmentTriple('ae-m01')!.map((i) => i.id),
  }
  const completed = completionSet(allM01Done)
  assert.ok(moduleFullyComplete('ae-m01', sessions, completed, allM01Done), 'fixture: module 1 fully complete')
  assert.equal(
    getFlagshipCourseDisplayProgressPercent(AI_ESSENTIALS_SLUG, curriculum, sessions, allM01Done),
    10,
    'first milestone is 10% when module 1 alone is fully complete',
  )
}

function testPortfolioRows() {
  const rows = portfolioOutputsForPathway('ai-productivity-professional').filter((o) => o.courseSlug === 'ai-essentials')
  assert.equal(rows.length, 16, 'one portfolio row per module for ai-productivity-professional')
  const ids = rows.map((r) => r.id).sort()
  const want = [...Array(16)].map((_, i) => `po-ai-m${String(i + 1).padStart(2, '0')}`).sort()
  assert.deepEqual(ids, want)
}

function allSessionsCompleteState(
  curriculum: NonNullable<ReturnType<typeof getFlagshipCurriculum>>,
  sessions: ReturnType<typeof buildSessionsForCurriculum>,
  rubric: AeCapstoneRubricSelfGrade | undefined,
): FlagshipCourseProgressState {
  const completedSessionIds = sessions.map((s) => s.id)
  const moduleQuiz: Record<string, { passedAt: string }> = {}
  for (const m of curriculum.modules) {
    moduleQuiz[m.id] = { passedAt: new Date().toISOString() }
  }
  const ck: string[] = []
  for (const m of curriculum.modules) {
    const trio = bespokeAssessmentTriple(m.id)
    if (trio) for (const it of trio) ck.push(it.id)
  }
  return {
    version: 1,
    completedSessionIds,
    flaggedForReviewSessionIds: [],
    completedMasteryCheckpointIds: ck,
    moduleQuiz,
    ...(rubric ? { aeCapstoneRubricSelfGrade: rubric } : {}),
  }
}

function testRubricRemoteHydrationAndMilestoneEdgeCases() {
  const curriculum = getFlagshipCurriculum(AI_ESSENTIALS_SLUG)!
  const sessions = buildSessionsForCurriculum(curriculum)

  const row: FlagshipCourseProgressRow = {
    id: '00000000-0000-0000-0000-000000000001',
    user_id: '00000000-0000-0000-0000-000000000002',
    course_slug: AI_ESSENTIALS_SLUG,
    completed_session_ids: [],
    flagged_for_review_session_ids: [],
    ae_capstone_rubric_self_grade: {
      ratings: {
        problemFraming: 'ready',
        promptWorkflow: 'strong',
        verificationReview: 'ready',
        safetyPrivacy: 'ready',
        reusability: 'ready',
        reflection: 'ready',
        presentation: 'ready',
      },
      updatedAt: '2026-02-01T12:00:00.000Z',
    },
    last_active_session_id: null,
    last_active_at: null,
    started_at: null,
    updated_at: '2026-02-01T12:00:00.000Z',
  }
  const fromRow = flagshipProgressRowToState(row)
  assert.ok(fromRow.aeCapstoneRubricSelfGrade)
  assert.equal(fromRow.aeCapstoneRubricSelfGrade?.problemFraming, 'ready')
  assert.ok(aeCapstoneRubricAllCriteriaReadyPlus(fromRow))

  const wrapped = parseAeCapstoneRubricSelfGradeJson({
    ratings: { problem_framing: 'developing', prompt_workflow_design: 'ready' },
    updatedAt: '2026-01-01T00:00:00.000Z',
  })
  assert.equal(wrapped.grades?.problemFraming, 'developing')
  assert.equal(wrapped.grades?.promptWorkflow, 'ready')

  const allReady: AeCapstoneRubricSelfGrade = {
    problemFraming: 'ready',
    promptWorkflow: 'ready',
    verificationReview: 'ready',
    safetyPrivacy: 'ready',
    reusability: 'ready',
    reflection: 'ready',
    presentation: 'ready',
  }
  const fullNoRubric = allSessionsCompleteState(curriculum, sessions, undefined)
  assert.equal(getFlagshipCourseDisplayProgressPercent(AI_ESSENTIALS_SLUG, curriculum, sessions, fullNoRubric), 90)

  const fullWithRubric = allSessionsCompleteState(curriculum, sessions, allReady)
  assert.equal(getFlagshipCourseDisplayProgressPercent(AI_ESSENTIALS_SLUG, curriculum, sessions, fullWithRubric), 100)

  const completed = new Set(fullWithRubric.completedSessionIds)
  const ck = new Set(fullWithRubric.completedMasteryCheckpointIds ?? [])
  assert.ok(
    isFlagshipCertificateReady(curriculum, sessions, completed, ck, fullWithRubric),
    'in-app readiness requires rubric + full completion',
  )
  assert.ok(
    !isFlagshipCertificateReady(curriculum, sessions, completed, ck, fullNoRubric),
    'readiness blocked without rubric',
  )

  const local: FlagshipCourseProgressState = {
    version: 1,
    completedSessionIds: [],
    flaggedForReviewSessionIds: [],
    aeCapstoneRubricSelfGrade: { problemFraming: 'ready' },
    aeCapstoneRubricSelfGradeUpdatedAt: '2026-03-01T00:00:00.000Z',
  }
  const remote: FlagshipCourseProgressState = {
    version: 1,
    completedSessionIds: [],
    flaggedForReviewSessionIds: [],
    aeCapstoneRubricSelfGrade: { problemFraming: 'developing' },
    aeCapstoneRubricSelfGradeUpdatedAt: '2026-01-01T00:00:00.000Z',
  }
  const merged = mergeFlagshipProgressStates(local, remote)
  assert.equal(merged.aeCapstoneRubricSelfGrade?.problemFraming, 'ready', 'never downgrade Ready vs Developing')

  const upsert = flagshipProgressStateToUpsertPayload('user-id', AI_ESSENTIALS_SLUG, {
    version: 1,
    completedSessionIds: [],
    flaggedForReviewSessionIds: [],
    aeCapstoneRubricSelfGrade: allReady,
    aeCapstoneRubricSelfGradeUpdatedAt: '2026-04-01T00:00:00.000Z',
  })
  assert.ok(
    upsert.ae_capstone_rubric_self_grade &&
      typeof upsert.ae_capstone_rubric_self_grade === 'object' &&
      'ratings' in upsert.ae_capstone_rubric_self_grade,
    'upsert payload includes wrapped rubric JSON for ai-essentials',
  )
}

function testAeLearnerMetaAndSessionTitles() {
  const curriculum = getFlagshipCurriculum(AI_ESSENTIALS_SLUG)!
  const titles = new Set<string>()
  for (const m of curriculum.modules) {
    assert.ok(!titles.has(m.title), `duplicate module title: ${m.title}`)
    titles.add(m.title)
    const card = AI_ESSENTIALS_MODULE_LEARNER_CARD[m.id]
    assert.ok(card, `${m.id}: AI_ESSENTIALS_MODULE_LEARNER_CARD entry`)
    assert.ok(card.purpose.length > 40, `${m.id}: purpose line should be substantive`)
    assert.ok(card.whatYouWillDo.length > 40, `${m.id}: activities line should be substantive`)
  }
  const sessions = buildSessionsForCurriculum(curriculum)
  for (const s of sessions) {
    if (s.courseSlug !== AI_ESSENTIALS_SLUG || s.moduleId === 'capstone') continue
    assert.ok(
      !s.title.startsWith('Practice lab ·'),
      `${s.id}: expected patched practice title, got "${s.title}"`,
    )
    assert.ok(
      !s.title.startsWith('Revision checkpoint:'),
      `${s.id}: expected patched revision title, got "${s.title}"`,
    )
  }
}

function testForbiddenSubstringsInKeyLearnerFiles() {
  const paths = [
    'src/data/learning/aiEssentialsCourse1Modules.ts',
    'src/data/learning/course1AiEssentialsQuizBank.ts',
    'src/data/learning/aiEssentialsLessonOverridesM10M16.ts',
    'src/data/learning/flagshipSessionContentOverridesAiEssentialsLessons.ts',
    'src/data/learning/portfolioOutputsCatalog.ts',
    'src/components/learn/AeCapstoneRubricSelfGradePanel.tsx',
  ] as const
  for (const p of paths) {
    assertNoForbiddenLearnerCopy(p, readSrc(p))
  }
}

function main() {
  testModuleSpineMatchesExport()
  testSessionsQuizBespoke()
  testCapstoneRubricIds()
  testDisplayPercentMilestoneOne()
  testRubricRemoteHydrationAndMilestoneEdgeCases()
  testPortfolioRows()
  testAeLearnerMetaAndSessionTitles()
  testForbiddenSubstringsInKeyLearnerFiles()
  console.log('verify-course1-ai-essentials-continuity: OK')
}

main()
