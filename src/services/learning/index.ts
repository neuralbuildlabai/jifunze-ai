export type { PerformanceMemoryStore } from './performanceMemoryStore'
export { getPerformanceMemoryStore, setPerformanceMemoryStore } from './performanceMemoryStore'
export { InMemoryPerformanceMemoryRepository as InMemoryPerformanceMemory } from '../../persistence/inMemoryPersistence'
export { recordPublishedContentPerformance } from './recordPerformance'
export { appendSimulatedPerformanceFromTrendBatch } from './appendSimulatedPerformanceFromTrendBatch'
export { learningMemoryRowWeight } from './learningMemoryRowWeight'
export { ensureBrandLearningDemoSeed } from './seedDemoLearningData'
export { analyzeBrandPerformance } from './analyzePerformance'
export { buildStrategyRecommendations } from './buildRecommendations'
export {
  insightConfidenceForStrength,
  strengthForStrongSignal,
  strengthForWeakSignal,
} from './patternStrength'
export {
  getBrandLearningState,
  buildLearningContextLines,
  buildLearningContextLinesFromState,
  getLearningAdapterNotes,
} from './learningContext'
export type { GetBrandLearningStateOptions } from './learningContext'
export {
  applyLearningToPriorityScore,
  learningConfidenceAdjustment,
  adjustFormatWithLearning,
  applyPositiveFormatPreference,
  nudgeTeachingWithPositiveLearning,
  allowsPositivePreference,
  resolveCtaLearningEmphasis,
  learningNotesForPlatform,
} from './applyLearningFeedback'
export {
  buildLearningVisibilityFields,
  computeLearningConfidenceBand,
  reorderSuggestedPlatformsForLearning,
  buildLearningAdaptationLabels,
  buildLearningPerformanceHints,
  computeLearningAffects,
} from './buildLearningVisibility'
export type { CtaLearningEmphasis } from '../../types/performanceLearning'
