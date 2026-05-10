/**
 * Pure checks for paid flagship certificate + capstone rules (no DB).
 * Run: npx tsx scripts/verify-capstone-certificate-rules.ts
 */
import assert from 'node:assert/strict'
import type { FlagshipCourseCurriculum } from '../src/data/learning/flagshipCourseCurricula'
import type { FlagshipSession } from '../src/data/learning/flagshipCourseSessions'
import type { FlagshipCourseProgressState } from '../src/lib/flagshipCourseProgressDerived'
import { evaluateLearnerCertificateEligibility } from '../src/lib/paidFlagshipCertificateEligibility'

const minimalCurriculum = {
  slug: 'ai-productivity-smart-workflows',
  modules: [
    {
      id: 'm1',
      order: 1,
      title: 'M1',
      stage: 'foundations' as const,
      summary: 's',
      learningGoals: [],
      practiceActivities: [],
    },
  ],
  capstone: { title: 'c', description: 'd', deliverables: [] },
} as unknown as FlagshipCourseCurriculum

const sessions: FlagshipSession[] = [
  {
    id: 'm1-lesson',
    courseSlug: 'ai-productivity-smart-workflows',
    moduleId: 'm1',
    orderInModule: 1,
    orderInCourse: 1,
    title: 'L',
    type: 'lesson',
    durationMinutes: 28,
    effortLabel: 'x',
    summary: '',
    objectives: [],
  },
  {
    id: 'm1-practice',
    courseSlug: 'ai-productivity-smart-workflows',
    moduleId: 'm1',
    orderInModule: 2,
    orderInCourse: 2,
    title: 'P',
    type: 'practice',
    durationMinutes: 30,
    effortLabel: 'x',
    summary: '',
    objectives: [],
  },
  {
    id: 'ai-productivity-smart-workflows-capstone-prep',
    courseSlug: 'ai-productivity-smart-workflows',
    moduleId: 'capstone',
    orderInModule: 1,
    orderInCourse: 3,
    title: 'Prep',
    type: 'capstone_prep',
    durationMinutes: 48,
    effortLabel: 'x',
    summary: '',
    objectives: [],
  },
]

const fullProgress: FlagshipCourseProgressState = {
  version: 1,
  completedSessionIds: ['m1-lesson', 'm1-practice', 'ai-productivity-smart-workflows-capstone-prep'],
  flaggedForReviewSessionIds: [],
  moduleQuiz: { m1: { passedAt: new Date().toISOString() } },
}

const passedCapstone = {
  status: 'passed',
  score: 80,
  certificate_eligible: true,
  certificate_issued_at: new Date().toISOString(),
  certificate_valid_until: new Date(Date.now() + 86400e3 * 365 * 2).toISOString(),
  created_at: new Date().toISOString(),
}

function run() {
  const locked = evaluateLearnerCertificateEligibility({
    courseSlug: 'ai-productivity-smart-workflows',
    curriculum: minimalCurriculum,
    sessions,
    progress: { version: 1, completedSessionIds: [], flaggedForReviewSessionIds: [] },
    latestCapstone: null,
  })
  assert.equal(locked.eligible, false)
  assert.ok(locked.blockers.some((b) => /submit your capstone/i.test(b)))

  const noCapstonePass = evaluateLearnerCertificateEligibility({
    courseSlug: 'ai-productivity-smart-workflows',
    curriculum: minimalCurriculum,
    sessions,
    progress: fullProgress,
    latestCapstone: {
      status: 'submitted',
      score: null,
      certificate_eligible: false,
      certificate_issued_at: null,
      certificate_valid_until: null,
      created_at: new Date().toISOString(),
    },
  })
  assert.equal(noCapstonePass.eligible, false)

  const passLowScore = evaluateLearnerCertificateEligibility({
    courseSlug: 'ai-productivity-smart-workflows',
    curriculum: minimalCurriculum,
    sessions,
    progress: fullProgress,
    latestCapstone: {
      status: 'passed',
      score: 70,
      certificate_eligible: true,
      certificate_issued_at: new Date().toISOString(),
      certificate_valid_until: new Date().toISOString(),
      created_at: new Date().toISOString(),
    },
  })
  assert.equal(passLowScore.eligible, false)

  const ok = evaluateLearnerCertificateEligibility({
    courseSlug: 'ai-productivity-smart-workflows',
    curriculum: minimalCurriculum,
    sessions,
    progress: fullProgress,
    latestCapstone: passedCapstone,
  })
  assert.equal(ok.eligible, true)
  assert.ok(ok.certificateIssuedAt)

  console.log('verify-capstone-certificate-rules: ok')
}

run()
