/**
 * Unit-style checks for flagship progress merge + blueprint integrity (runs with tsx; no vitest dependency).
 */

import assert from 'node:assert/strict'
import {
  FLAGSHIP_CURRICULUM_SLUGS,
  getFlagshipCurriculum,
} from '../src/data/learning/flagshipCourseCurricula'
import { FLAGSHIP_SESSION_CONTENT_OVERRIDES } from '../src/data/learning/flagshipSessionContentOverrides'
import { buildSessionsForCurriculum } from '../src/data/learning/flagshipCourseSessions'
import { buildAssessmentItemsForModule } from '../src/lib/flagshipAssessmentCatalog'
import {
  bespokeAssessmentTriple,
  FLAGSHIP_BESPOKE_ASSESSMENT_MODULE_IDS,
  FLAGSHIP_MID_BESPOKE_ASSESSMENT_MODULE_IDS,
} from '../src/lib/flagshipAssessmentBespokeModules'
import type { FlagshipCourseProgressState } from '../src/lib/flagshipCourseProgressDerived'
import {
  flagshipProgressStatesEqual,
  mergeFlagshipProgressStates,
} from '../src/lib/flagshipCourseProgressMerge'

function empty(): FlagshipCourseProgressState {
  return {
    version: 1,
    completedSessionIds: [],
    flaggedForReviewSessionIds: [],
  }
}

function mergeRemoteAddsCompletion() {
  const local = empty()
  const remote: FlagshipCourseProgressState = {
    ...empty(),
    completedSessionIds: ['s1'],
    startedAt: '2026-01-02T00:00:00.000Z',
  }
  const merged = mergeFlagshipProgressStates(local, remote)
  assert.ok(merged.completedSessionIds.includes('s1'))
}

function mergeLocalKeepsAheadCompletion() {
  const local: FlagshipCourseProgressState = {
    ...empty(),
    completedSessionIds: ['s1', 's2'],
    lastActiveSessionId: 's2',
    lastActiveAt: '2026-01-03T12:00:00.000Z',
  }
  const remote: FlagshipCourseProgressState = {
    ...empty(),
    completedSessionIds: ['s1'],
    lastActiveSessionId: 's1',
    lastActiveAt: '2026-01-02T12:00:00.000Z',
  }
  const merged = mergeFlagshipProgressStates(local, remote)
  assert.ok(merged.completedSessionIds.includes('s2'))
  assert.equal(merged.lastActiveSessionId, 's2')
}

function mergeUnionReviewFlags() {
  const local: FlagshipCourseProgressState = {
    ...empty(),
    flaggedForReviewSessionIds: ['a'],
  }
  const remote: FlagshipCourseProgressState = {
    ...empty(),
    flaggedForReviewSessionIds: ['b'],
  }
  const merged = mergeFlagshipProgressStates(local, remote)
  assert.deepEqual(new Set(merged.flaggedForReviewSessionIds), new Set(['a', 'b']))
}

function mergeNewerRemoteLastActiveWins() {
  const local: FlagshipCourseProgressState = {
    ...empty(),
    lastActiveSessionId: 'old',
    lastActiveAt: '2026-01-01T00:00:00.000Z',
  }
  const remote: FlagshipCourseProgressState = {
    ...empty(),
    lastActiveSessionId: 'new',
    lastActiveAt: '2026-02-01T00:00:00.000Z',
  }
  const merged = mergeFlagshipProgressStates(local, remote)
  assert.equal(merged.lastActiveSessionId, 'new')
}

function mergeEarlierStartedAt() {
  const local: FlagshipCourseProgressState = {
    ...empty(),
    startedAt: '2026-03-01T00:00:00.000Z',
  }
  const remote: FlagshipCourseProgressState = {
    ...empty(),
    startedAt: '2026-01-01T00:00:00.000Z',
  }
  const merged = mergeFlagshipProgressStates(local, remote)
  assert.equal(merged.startedAt, remote.startedAt)
}

function mergeUnionMasteryCheckpoints() {
  const local: FlagshipCourseProgressState = {
    ...empty(),
    completedMasteryCheckpointIds: ['a-m1-mastery'],
  }
  const remote: FlagshipCourseProgressState = {
    ...empty(),
    completedMasteryCheckpointIds: ['a-m2-mastery'],
  }
  const merged = mergeFlagshipProgressStates(local, remote)
  assert.deepEqual(new Set(merged.completedMasteryCheckpointIds ?? []), new Set(['a-m1-mastery', 'a-m2-mastery']))
}

function equalityStable() {
  const a: FlagshipCourseProgressState = {
    ...empty(),
    completedSessionIds: ['z', 'a'],
    flaggedForReviewSessionIds: ['r'],
    startedAt: '2026-01-01T00:00:00.000Z',
  }
  const b: FlagshipCourseProgressState = {
    ...empty(),
    completedSessionIds: ['a', 'z'],
    flaggedForReviewSessionIds: ['r'],
    startedAt: '2026-01-01T00:00:00.000Z',
  }
  assert.ok(flagshipProgressStatesEqual(a, b))
}

mergeRemoteAddsCompletion()
mergeLocalKeepsAheadCompletion()
mergeUnionReviewFlags()
mergeNewerRemoteLastActiveWins()
mergeEarlierStartedAt()
mergeUnionMasteryCheckpoints()
equalityStable()

function verifyAllFlagshipBlueprints() {
  assert.equal(FLAGSHIP_CURRICULUM_SLUGS.length, 15)
  for (const slug of FLAGSHIP_CURRICULUM_SLUGS) {
    const c = getFlagshipCurriculum(slug)
    assert.ok(c, `missing curriculum: ${slug}`)
    assert.ok(c.capstone.title.trim().length > 6, `weak capstone title: ${slug}`)
    assert.ok(c.capstone.deliverables.length >= 3, `capstone deliverables thin: ${slug}`)
    assert.ok(c.modules.length >= 10, `expected ≥10 modules: ${slug}`)
    const sessions = buildSessionsForCurriculum(c)
    assert.ok(sessions.some((s) => s.type === 'capstone_prep'), `missing capstone prep session: ${slug}`)
    assert.ok(sessions.length >= c.modules.length, `sessions suspiciously small: ${slug}`)
  }
}

verifyAllFlagshipBlueprints()

function verifyBespokeAssessmentAnchors() {
  assert.equal(
    FLAGSHIP_BESPOKE_ASSESSMENT_MODULE_IDS.length,
    45,
    'expected 3 anchor modules × 15 flagship courses',
  )
  const found = new Set<string>()
  for (const slug of FLAGSHIP_CURRICULUM_SLUGS) {
    const c = getFlagshipCurriculum(slug)
    assert.ok(c)
    for (const m of c.modules) {
      if (!FLAGSHIP_BESPOKE_ASSESSMENT_MODULE_IDS.includes(m.id)) continue
      found.add(m.id)
      const items = buildAssessmentItemsForModule(m)
      assert.equal(items.length, 3, `checkpoint triple: ${m.id}`)
      assert.ok(items[0].prompt.length > 15, `bespoke mcq prompt: ${m.id}`)
      assert.ok(items[0].id.endsWith('::a0'), `stable id a0: ${m.id}`)
    }
  }
  assert.equal(found.size, FLAGSHIP_BESPOKE_ASSESSMENT_MODULE_IDS.length, 'every bespoke module id must exist in a curriculum')
}

verifyBespokeAssessmentAnchors()

function verifyMidCourseBespokeAssessments() {
  assert.equal(
    FLAGSHIP_MID_BESPOKE_ASSESSMENT_MODULE_IDS.length,
    34,
    'expected baseline mid bespoke coverage + extra PE-focused mids on AI Essentials & Smart Workflows with AI',
  )
  const found = new Set<string>()
  for (const slug of FLAGSHIP_CURRICULUM_SLUGS) {
    const c = getFlagshipCurriculum(slug)
    assert.ok(c)
    for (const m of c.modules) {
      if (!FLAGSHIP_MID_BESPOKE_ASSESSMENT_MODULE_IDS.includes(m.id)) continue
      found.add(m.id)
      const items = buildAssessmentItemsForModule(m)
      assert.equal(items.length, 3, `mid checkpoint triple: ${m.id}`)
      assert.ok(items[0].prompt.length > 12, `mid bespoke mcq prompt: ${m.id}`)
      assert.ok(items[0].id.endsWith('::a0'), `stable id a0: ${m.id}`)
    }
  }
  assert.equal(found.size, FLAGSHIP_MID_BESPOKE_ASSESSMENT_MODULE_IDS.length, 'every mid bespoke id exists in a curriculum')
}

verifyMidCourseBespokeAssessments()

function verifyFullSessionOverrideCoverage() {
  const keys = new Set(Object.keys(FLAGSHIP_SESSION_CONTENT_OVERRIDES))
  for (const slug of FLAGSHIP_CURRICULUM_SLUGS) {
    const c = getFlagshipCurriculum(slug)
    assert.ok(c)
    for (const s of buildSessionsForCurriculum(c)) {
      assert.ok(keys.has(`${slug}::${s.id}`), `missing session override: ${slug}::${s.id}`)
    }
  }
}

verifyFullSessionOverrideCoverage()

function verifyEveryCurriculumModuleHasBespokeCheckpointPack() {
  for (const slug of FLAGSHIP_CURRICULUM_SLUGS) {
    const c = getFlagshipCurriculum(slug)
    assert.ok(c)
    for (const m of c.modules) {
      assert.ok(bespokeAssessmentTriple(m.id), `bespoke checkpoint pack missing: ${m.id}`)
      const items = buildAssessmentItemsForModule(m)
      assert.equal(items.length, 3, `checkpoint triple: ${m.id}`)
      assert.ok(items[0].prompt.length > 8, `mcq prompt: ${m.id}`)
      assert.ok(items[0].id.endsWith('::a0'), `stable id: ${m.id}`)
    }
  }
}

verifyEveryCurriculumModuleHasBespokeCheckpointPack()

console.log('verify-flagship-merge: ok')
