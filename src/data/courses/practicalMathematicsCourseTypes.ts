/**
 * Standalone Jifunze course shape for "Practical Mathematics for Life, Work, and Business".
 *
 * Deliberately separate from the flagship curriculum types so this course can be added,
 * served, and progressed without touching ai-essentials, smart-workflows, or any other
 * existing flagship code, types, or fixtures.
 */

export type StandaloneCourseAccessLabel = 'Free' | 'Free Access' | 'Start Free' | 'Included'

export type StandaloneCourseLevel =
  | 'Foundational'
  | 'Foundational to Intermediate'
  | 'Intermediate'
  | 'Beginner to early-intermediate'

export type StandaloneProductTier = 'full_standalone' | 'professional_micro'

/** Certificate / portfolio acknowledgment copy for the capstone module page. */
export type StandaloneCapstoneAcknowledgement = {
  title: string
  intro: string
  checkboxLabel: string
}

/** Optional rich detail used by professional micro-courses on the course overview page. */
export type StandaloneMicroWorkshopDetail = {
  cardSubtitle: string
  cardMeta: string
  cardTags: string[]
  whoThisIsFor: string[]
  caseStudy: {
    headline: string
    businessType: string
    revenueStreams: string[]
    salesChannels: string[]
    centralProblem: string
    diagnosisFraming: string
  }
  analyticsMethods: string[]
  visualsInDeck: string[]
  learnerPractice: {
    title: string
    artifactTitle: string
    prompt: string
    metricsChecklist: string[]
  }
  quizSummary: string
  suggestedNextCourses: Array<{ title: string; href: string; subtitle?: string }>
  /** Optional slide preview cards shown on course overview page. */
  slidePreviewCards?: Array<{
    moduleNumber: number
    title: string
    subtitle: string
    visualCue: string
    learnerOutput: string
  }>
}

export type StandaloneCourseLessonBlockType =
  | 'concept_explanation'
  | 'worked_example'
  | 'guided_practice'
  | 'pause_and_check'
  | 'common_mistakes'
  | 'real_world_application'
  | 'practice_task'
  | 'reflection_or_application'
  | 'summary'
  | 'quiz_intro'
  /** Scenario-style narrative (same render path as real_world_application in most readers). */
  | 'scenario'
  /** Visual block types — rendered by StandaloneVisualBlocks.tsx. */
  | 'dataset_table'
  | 'bar_chart'
  | 'heatmap'
  | 'calculation_card'
  | 'stat_grid'
  | 'roadmap_timeline'
  | 'priority_matrix'
  | 'process_flow'

export type StandaloneCourseLessonBlock = {
  type: StandaloneCourseLessonBlockType
  eyebrow?: string
  title?: string
  content?: string
  examples?: string[]
  bullets?: string[]
  learnerTask?: string
  answerKey?: string
  outputExpectation?: string
  prompt?: string
  facilitatorNote?: string
  /** dataset_table */
  tableColumns?: string[]
  tableRows?: Array<{ cells: string[] }>
  /** bar_chart */
  chartItems?: Array<{ label: string; value: number; unit?: string }>
  /** stat_grid */
  statItems?: Array<{ label: string; value: string; sub?: string }>
  /** roadmap_timeline */
  roadmapPhases?: Array<{ phase: string; days: string; items: string[] }>
  /** priority_matrix */
  matrixQuadrants?: {
    topLeft: { label: string; items: string[] }
    topRight: { label: string; items: string[] }
    bottomLeft: { label: string; items: string[] }
    bottomRight: { label: string; items: string[] }
    xLabel?: string
    yLabel?: string
  }
  /** heatmap */
  heatmapRows?: Array<{ label: string; displayValue: string; level: 'low' | 'medium' | 'high' | 'critical' }>
  /** process_flow */
  processSteps?: Array<{ step: string; detail?: string }>
}

export type StandaloneCourseLesson = {
  lessonNumber: string
  title: string
  estimatedMinutes: number
  learnerGoal: string
  blocks: StandaloneCourseLessonBlock[]
}

export type StandaloneCoursePracticeLabScenario = {
  id: string
  prompt: string
  answerKey: string
}

export type StandaloneCoursePracticeLab = {
  title: string
  durationMinutes: number
  learnerGoal: string
  scenarios: StandaloneCoursePracticeLabScenario[]
}

export type StandaloneCourseQuizQuestionType =
  | 'multiple_choice'
  | 'short_answer'
  | 'calculation'
  | 'scenario'

export type StandaloneCourseQuizQuestionDifficulty = 'easy' | 'medium' | 'hard'

export type StandaloneCourseQuizQuestion = {
  id: string
  question: string
  type: StandaloneCourseQuizQuestionType
  options?: string[]
  correctAnswer: string
  explanation: string
  relatedLesson: string
  difficulty: StandaloneCourseQuizQuestionDifficulty
}

export type StandaloneCourseModule = {
  moduleNumber: number
  slug: string
  title: string
  durationMinutes: number
  level: StandaloneCourseLevel
  prerequisites: string[]
  overview: string
  whyThisMatters: string[]
  learningObjectives: string[]
  lessons: StandaloneCourseLesson[]
  practiceLab: StandaloneCoursePracticeLab
  moduleQuiz: StandaloneCourseQuizQuestion[]
  moduleSummary: string
  completionChecklist: string[]
  safetyNote?: string
}

export type StandaloneCourseModuleMapEntry = {
  number: number
  slug: string
  title: string
}

export type StandaloneCourseCompletionRequirements = {
  progression: 'sequential' | 'flexible'
  rule: string
  passThreshold: string
  capstone: string
}

export type StandaloneCourseIsolation = {
  /** Standalone courses do not share progression keys with flagship courses. */
  type: 'standalone'
  doesNotAffect?: string[]
}

export type PracticalMathematicsCourse = {
  slug: string
  internalKey: string
  isolation: StandaloneCourseIsolation
  title: string
  accessLabel: StandaloneCourseAccessLabel
  estimatedHours: number
  level: StandaloneCourseLevel
  school: string
  format: string
  certificate: string
  /** Prefix used on printable certificate IDs (e.g., PM, BA). */
  certificateIdPrefix: string
  prerequisites: string[]
  description: string
  targetAudience: string[]
  learningOutcomes: string[]
  safetyDisclaimer: string
  completionRequirements: StandaloneCourseCompletionRequirements
  assessmentApproach: string
  capstoneDescription: string
  moduleMap: StandaloneCourseModuleMapEntry[]
  modules: StandaloneCourseModule[]
  /**
   * Module whose page shows the portfolio/capstone acknowledgment control.
   * Required for certificate eligibility when present.
   */
  capstoneModuleSlug: string
  productTier: StandaloneProductTier
  /** Public paths (e.g. `/training/...`) for learner downloads. */
  downloadableResources?: Array<{ label: string; href: string }>
  capstoneAcknowledgement: StandaloneCapstoneAcknowledgement
  microWorkshopDetail?: StandaloneMicroWorkshopDetail
}
