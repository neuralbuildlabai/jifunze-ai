import type { SupabaseClient } from '@supabase/supabase-js'
import type { FlagshipCourseCurriculum } from '../data/learning/flagshipCourseCurricula'
import type { FlagshipSession } from '../data/learning/flagshipCourseSessions'
import { fetchLatestCapstoneSubmissionForLearner } from '../services/learnerState/learnerCapstoneSubmissionsRemote'
import type { FlagshipCourseProgressState } from './flagshipCourseProgressDerived'
import {
  evaluateLearnerCertificateEligibility,
  type LearnerCertificateEligibility,
} from './paidFlagshipCertificateEligibility'

/**
 * Loads the learner's latest capstone row and evaluates certificate eligibility
 * against course progress (modules, quizzes, final checks, capstone review).
 */
export async function getLearnerCertificateEligibility(
  supabase: SupabaseClient,
  courseSlug: string,
  learnerId: string,
  curriculum: FlagshipCourseCurriculum,
  sessions: FlagshipSession[],
  progress: FlagshipCourseProgressState,
): Promise<LearnerCertificateEligibility> {
  const row = await fetchLatestCapstoneSubmissionForLearner(supabase, learnerId, courseSlug)
  const latestCapstone = row
    ? {
        status: row.status,
        score: row.score,
        certificate_eligible: row.certificate_eligible,
        certificate_issued_at: row.certificate_issued_at,
        certificate_valid_until: row.certificate_valid_until,
        created_at: row.created_at,
      }
    : null

  return evaluateLearnerCertificateEligibility({
    courseSlug,
    curriculum,
    sessions,
    progress,
    latestCapstone,
  })
}
