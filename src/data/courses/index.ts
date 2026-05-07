/**
 * Standalone courses barrel export.
 *
 * This is a NEW namespace that lives alongside the existing `src/data/learning/` flagship registry.
 * It does not import or modify any flagship course code, slugs, or fixtures.
 *
 * Consumers that want to render or progress standalone courses should import from this barrel:
 *
 *     import { practicalMathematicsCourse, STANDALONE_LEARNER_CATALOG } from '@/data/courses'
 *
 * Adding new standalone courses in the future means: drop a course file alongside
 * `practicalMathematicsCourse.ts`, add an entry to `standaloneCoursesCatalog.ts`, and re-export
 * here. Flagship registries stay untouched.
 */

export {
  practicalMathematicsCourse,
  PRACTICAL_MATH_SLUG,
  PRACTICAL_MATH_INTERNAL_KEY,
  PRACTICAL_MATH_MODULE_SLUGS,
} from './practicalMathematicsCourse'

export {
  PRACTICAL_MATH_MODULES_REQUIRING_SAFETY_NOTE,
  type PracticalMathModuleSlug,
} from './practicalMathematicsCourseConstants'

export type {
  PracticalMathematicsCourse,
  StandaloneCourseAccessLabel,
  StandaloneCourseLevel,
  StandaloneCourseLessonBlock,
  StandaloneCourseLessonBlockType,
  StandaloneCourseLesson,
  StandaloneCourseModule,
  StandaloneCourseModuleMapEntry,
  StandaloneCoursePracticeLab,
  StandaloneCoursePracticeLabScenario,
  StandaloneCourseQuizQuestion,
  StandaloneCourseQuizQuestionDifficulty,
  StandaloneCourseQuizQuestionType,
  StandaloneCourseIsolation,
  StandaloneCourseCompletionRequirements,
} from './practicalMathematicsCourseTypes'

export {
  STANDALONE_LEARNER_CATALOG,
  isStandaloneCourseSlug,
  findStandaloneCourseBySlug,
  findStandaloneCourseByInternalKey,
  findStandaloneModule,
  type StandaloneCatalogEntry,
} from './standaloneCoursesCatalog'

export {
  slugifyForUrlSegment,
  getStandaloneLessonSlug,
  getStandaloneCoursePath,
  getStandaloneModulePath,
  getStandaloneLessonPath,
  getStandaloneCertificatePath,
  getStandaloneFirstLessonPath,
  findStandaloneLesson,
  getStandaloneLessonNavTargets,
  type StandaloneLessonNavTargets,
} from './standaloneCourseLearnPaths'

export {
  practicalMathFlagshipCurriculum,
  practicalMathFlagshipModuleId,
  PRACTICAL_MATH_MODULE_ID_PREFIX,
} from './practicalMathematicsFlagshipAdapter'

export {
  PRACTICAL_MATH_CAPSTONE_RUBRIC_CRITERIA,
  PRACTICAL_MATH_CAPSTONE_RUBRIC_INTERNAL_KEY,
  practicalMathCapstoneAllCriteriaReadyPlus,
  mergePracticalMathCapstoneSelfGrade,
  type PracticalMathCapstoneRubricCriterion,
  type PracticalMathCapstoneRubricId,
  type PracticalMathCapstoneRubricLevel,
  type PracticalMathCapstoneRubricSelfGrade,
} from './practicalMathematicsCapstoneRubric'

export {
  practicalMathQuizPassed,
  emptyPracticalMathProgress,
  lessonKey,
  moduleAllLessonsComplete,
  moduleQuizPassed,
  moduleFullyComplete,
  findNextPracticalMathModule,
  isPracticalMathCourseFullyComplete,
  practicalMathWeightedScorePercent,
  practicalMathCertificateEligible,
  practicalMathCapstoneComplete,
  PRACTICAL_MATH_PROGRESSION_KEY,
  PRACTICAL_MATH_QUIZ_PASS_RATE,
  type PracticalMathProgressState,
  type PracticalMathQuizScore,
} from './practicalMathematicsProgression'
