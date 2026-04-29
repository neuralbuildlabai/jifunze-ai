/**
 * Deterministic checks for mergeLocalRemoteReconciledForSlug (pathways + Reports).
 * No Supabase, no browser — Node sees empty localStorage, so "local" is default empty progress.
 */

import assert from 'node:assert/strict'
import { canLearnerSelectPathwayAsPrimary, getPathwayBySlug } from '../src/data/learning/employablePathwaysCatalog'
import { FLAGSHIP_COURSES } from '../src/data/learning/flagshipCoursesCatalog'
import { getFlagshipCurriculum } from '../src/data/learning/flagshipCourseCurricula'
import { buildSessionsForCurriculum } from '../src/data/learning/flagshipCourseSessions'
import {
  completionSet,
  reconcileFlagshipProgressState,
  type FlagshipCourseProgressState,
} from '../src/lib/flagshipCourseProgressDerived'
import { mergeLocalRemoteReconciledForSlug } from '../src/lib/flagshipCourseProgressLocalRemoteMerge'
import { defaultFlagshipProgress } from '../src/lib/flagshipCourseLocalProgress'
import { flagshipProgressStatesEqual, mergeFlagshipProgressStates } from '../src/lib/flagshipCourseProgressMerge'

function firstPublishedSlugWithSessions(): { slug: string; sessionId: string } {
  for (const c of FLAGSHIP_COURSES) {
    const curriculum = getFlagshipCurriculum(c.slug)
    if (!curriculum) continue
    const sessions = buildSessionsForCurriculum(curriculum)
    const first = sessions[0]
    if (first) return { slug: c.slug, sessionId: first.id }
  }
  throw new Error('No flagship course with sessions found for verification')
}

function remoteWithSession(sessionId: string): FlagshipCourseProgressState {
  return {
    version: 1,
    completedSessionIds: [sessionId],
    flaggedForReviewSessionIds: [],
    startedAt: '2026-01-02T00:00:00.000Z',
  }
}

function testApplyRemoteFalseIgnoresRemote() {
  const { slug, sessionId } = firstPublishedSlugWithSessions()
  const remote = remoteWithSession(sessionId)
  const localOnly = mergeLocalRemoteReconciledForSlug(slug, remote, false)
  const ignoreRemote = mergeLocalRemoteReconciledForSlug(slug, null, false)
  assert.ok(
    flagshipProgressStatesEqual(localOnly, ignoreRemote),
    'applyRemote false must ignore remote (no regression before hydration)',
  )
  const done = completionSet(localOnly)
  assert.equal(done.has(sessionId), false, 'remote session must not apply when applyRemote is false')
}

function testApplyRemoteTrueMergesRemoteWhenLocalDefault() {
  const { slug, sessionId } = firstPublishedSlugWithSessions()
  const remote = remoteWithSession(sessionId)
  const merged = mergeLocalRemoteReconciledForSlug(slug, remote, true)
  const done = completionSet(merged)
  assert.ok(done.has(sessionId), 'applyRemote true must union remote completions into merged state')
}

/** Helper output must match manual mergeFlagshipProgressStates + reconcile (same as pre-Reports refactor). */
function testHelperMatchesManualMergeReconcile() {
  const { slug, sessionId } = firstPublishedSlugWithSessions()
  const curriculum = getFlagshipCurriculum(slug)
  assert.ok(curriculum)
  const sessions = buildSessionsForCurriculum(curriculum)
  const local = defaultFlagshipProgress()
  const remote = remoteWithSession(sessionId)
  const manualRaw = mergeFlagshipProgressStates(local, remote)
  const manual = reconcileFlagshipProgressState(manualRaw, curriculum, sessions)
  const viaHelper = mergeLocalRemoteReconciledForSlug(slug, remote, true)
  assert.ok(
    flagshipProgressStatesEqual(manual, viaHelper),
    'mergeLocalRemoteReconciledForSlug(..., true) must match merge + reconcile for default local',
  )
}

function testEmptyRemoteWithApplyRemoteTrueStable() {
  const { slug } = firstPublishedSlugWithSessions()
  const a = mergeLocalRemoteReconciledForSlug(slug, null, true)
  const b = mergeLocalRemoteReconciledForSlug(slug, null, true)
  assert.ok(flagshipProgressStatesEqual(a, b))
}

function testApplyRemoteTrueNeverFewerCompletionsThanApplyFalse() {
  const { slug, sessionId } = firstPublishedSlugWithSessions()
  const remote = remoteWithSession(sessionId)
  const whenIgnored = mergeLocalRemoteReconciledForSlug(slug, remote, false)
  const whenMerged = mergeLocalRemoteReconciledForSlug(slug, remote, true)
  const ignoredDone = completionSet(whenIgnored).size
  const mergedDone = completionSet(whenMerged).size
  assert.ok(mergedDone >= ignoredDone, 'applyRemote true must not drop completions vs applyRemote false baseline')
}

function testPrimaryPathwayEligibilityMatchesCatalog() {
  assert.equal(canLearnerSelectPathwayAsPrimary(getPathwayBySlug('digital-work-starter')), true)
  assert.equal(canLearnerSelectPathwayAsPrimary(getPathwayBySlug('junior-tech-builder')), false)
  assert.equal(canLearnerSelectPathwayAsPrimary(undefined), false)
}

function main() {
  testApplyRemoteFalseIgnoresRemote()
  testApplyRemoteTrueMergesRemoteWhenLocalDefault()
  testHelperMatchesManualMergeReconcile()
  testEmptyRemoteWithApplyRemoteTrueStable()
  testApplyRemoteTrueNeverFewerCompletionsThanApplyFalse()
  testPrimaryPathwayEligibilityMatchesCatalog()
  console.log('verify-pathway-remote-merge: all checks passed')
}

main()
