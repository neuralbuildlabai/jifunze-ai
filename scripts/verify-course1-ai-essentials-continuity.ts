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
  completionSet,
  moduleFullyComplete,
  type FlagshipCourseProgressState,
} from '../src/lib/flagshipCourseProgressDerived'
import { bespokeAssessmentTriple } from '../src/lib/flagshipAssessmentBespokeModules'
import {
  getFlagshipCourseDisplayProgressPercent,
  AI_ESSENTIALS_SLUG,
} from '../src/lib/aiEssentialsProgressMilestones'

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
  testPortfolioRows()
  testForbiddenSubstringsInKeyLearnerFiles()
  console.log('verify-course1-ai-essentials-continuity: OK')
}

main()
