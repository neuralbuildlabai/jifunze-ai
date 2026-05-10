import type { FlagshipCourseCurriculum } from '../data/learning/flagshipCourseCurricula'
import type { FlagshipSession } from '../data/learning/flagshipCourseSessions'
import { capstonePrepSession } from '../data/learning/flagshipCourseSessions'
import { completionSet, moduleFullyComplete, type FlagshipCourseProgressState } from './flagshipCourseProgressDerived'
import { JIFUNZE_LEARNING_HUB_ISSUER, getPaidFlagshipCertificateConfig } from './paidFlagshipCertificateConfig'

export type LearnerCapstoneSubmissionSummary = {
  status: string
  score: number | null
  certificate_eligible: boolean
  certificate_issued_at: string | null
  certificate_valid_until: string | null
  created_at: string
}

export type LearnerCertificateEligibility = {
  eligible: boolean
  /** Human-readable blockers for learner-facing UI */
  blockers: string[]
  issuer: typeof JIFUNZE_LEARNING_HUB_ISSUER
  certificateIssuedAt: string | null
  certificateValidUntil: string | null
}

function allCurriculumModulesComplete(
  curriculum: FlagshipCourseCurriculum,
  sessions: FlagshipSession[],
  completed: Set<string>,
  state: FlagshipCourseProgressState,
): boolean {
  return curriculum.modules.every((m) => moduleFullyComplete(m.id, sessions, completed, state))
}

function finalSessionsMarkedComplete(completed: Set<string>, requiredSessionIds: readonly string[]): boolean {
  if (!requiredSessionIds.length) return true
  return requiredSessionIds.every((id) => completed.has(id))
}

/**
 * Pure eligibility from local progress + latest capstone row (already loaded).
 * Fetch the latest submission server-side, then pass into this helper.
 */
export function evaluateLearnerCertificateEligibility(args: {
  courseSlug: string
  curriculum: FlagshipCourseCurriculum
  sessions: FlagshipSession[]
  progress: FlagshipCourseProgressState
  latestCapstone: LearnerCapstoneSubmissionSummary | null
}): LearnerCertificateEligibility {
  const cfg = getPaidFlagshipCertificateConfig(args.courseSlug)
  const issuer = JIFUNZE_LEARNING_HUB_ISSUER
  if (!cfg) {
    return {
      eligible: false,
      blockers: ['Certificate rules are not configured for this course.'],
      issuer,
      certificateIssuedAt: null,
      certificateValidUntil: null,
    }
  }

  const completed = completionSet(args.progress)
  const blockers: string[] = []

  if (!allCurriculumModulesComplete(args.curriculum, args.sessions, completed, args.progress)) {
    blockers.push('Complete all required modules, including their sessions and module checks.')
  }

  if (cfg.finalKnowledgeCheckRequired) {
    const prep = capstonePrepSession(args.sessions)
    const required = cfg.finalKnowledgeCheckSessionIds.length
      ? [...cfg.finalKnowledgeCheckSessionIds]
      : prep
        ? [prep.id]
        : []
    if (!finalSessionsMarkedComplete(completed, required)) {
      blockers.push('Complete the final knowledge / capstone preparation requirements for this course.')
    }
  }

  if (!args.latestCapstone) {
    blockers.push('Submit your capstone project for review.')
  } else if (args.latestCapstone.status !== 'passed') {
    blockers.push('Your capstone must be reviewed and marked passed before a certificate can be issued.')
  } else if (args.latestCapstone.score == null || args.latestCapstone.score < cfg.capstonePassScore) {
    blockers.push(`Capstone review must record a score of at least ${cfg.capstonePassScore}%.`)
  } else if (!args.latestCapstone.certificate_eligible) {
    blockers.push('Certificate eligibility has not been confirmed for your capstone yet.')
  }

  const eligible = blockers.length === 0

  return {
    eligible,
    blockers: eligible ? [] : blockers,
    issuer,
    certificateIssuedAt: eligible ? args.latestCapstone?.certificate_issued_at ?? null : null,
    certificateValidUntil: eligible ? args.latestCapstone?.certificate_valid_until ?? null : null,
  }
}
