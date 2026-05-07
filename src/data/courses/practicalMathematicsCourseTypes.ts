/**
 * Standalone Jifunze course shape for "Practical Mathematics for Life, Work, and Business".
 *
 * Deliberately separate from the flagship curriculum types so this course can be added,
 * served, and progressed without touching ai-essentials, smart-workflows, or any other
 * existing flagship code, types, or fixtures.
 */

export type StandaloneCourseAccessLabel = 'Free' | 'Free Access' | 'Start Free' | 'Included'

export type StandaloneCourseLevel = 'Foundational' | 'Foundational to Intermediate' | 'Intermediate'

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
}
