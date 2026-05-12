/**
 * Paid / gated flagship courses with native capstone review + certificate rules.
 * Learner UI reads only public fields (issuer label, thresholds); never expose internal billing keys here.
 */

export const JIFUNZE_LEARNING_HUB_ISSUER = 'Jifunze Learning Hub' as const

export type PaidFlagshipCertificateCourseConfig = {
  courseSlug: string
  provider: typeof JIFUNZE_LEARNING_HUB_ISSUER
  certificateValidityYears: 2
  capstoneRequired: boolean
  capstonePassScore: 75
  /** Minimum correct answers out of {@link MODULE_QUIZ_DRAW_COUNT} (default app pool draws 8). */
  moduleQuizMinCorrect: number
  finalKnowledgeCheckRequired: boolean
  /** Session ids that must be marked complete (in addition to all module work). Often capstone prep. */
  finalKnowledgeCheckSessionIds: readonly string[]
  capstoneSubmissionEnabled: boolean
  /** When true, session pages enforce minimum on-tab active seconds before “Mark chapter complete”. */
  enableLessonTimer: boolean
  /**
   * Static interactive lesson export served from `public/` (path from site root, ending in `content/index.html`).
   * Omit when the course has no hosted lesson bundle on this app.
   */
  hostedRiseIndexPath?: string
}

const AI_PRODUCTIVITY_SMART_WORKFLOWS: PaidFlagshipCertificateCourseConfig = {
  courseSlug: 'ai-productivity-smart-workflows',
  provider: JIFUNZE_LEARNING_HUB_ISSUER,
  certificateValidityYears: 2,
  capstoneRequired: true,
  capstonePassScore: 75,
  moduleQuizMinCorrect: 7,
  finalKnowledgeCheckRequired: true,
  finalKnowledgeCheckSessionIds: ['ai-productivity-smart-workflows-capstone-prep'],
  capstoneSubmissionEnabled: true,
  enableLessonTimer: true,
  hostedRiseIndexPath: '/course-assets/interactive/ai-productivity-smart-workflows/content/index.html',
}

const BY_SLUG: Record<string, PaidFlagshipCertificateCourseConfig> = {
  [AI_PRODUCTIVITY_SMART_WORKFLOWS.courseSlug]: AI_PRODUCTIVITY_SMART_WORKFLOWS,
}

export function getPaidFlagshipCertificateConfig(courseSlug: string): PaidFlagshipCertificateCourseConfig | undefined {
  return BY_SLUG[courseSlug]
}

export function paidFlagshipCourseSlugs(): string[] {
  return Object.keys(BY_SLUG)
}
