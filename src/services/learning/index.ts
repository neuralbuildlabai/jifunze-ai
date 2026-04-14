export type { PerformanceMemoryStore } from './performanceMemoryStore'
export {
  InMemoryPerformanceMemory,
  getPerformanceMemoryStore,
  setPerformanceMemoryStore,
} from './performanceMemoryStore'
export { recordPublishedContentPerformance } from './recordPerformance'
export { ensureBrandLearningDemoSeed } from './seedDemoLearningData'
export { analyzeBrandPerformance } from './analyzePerformance'
export { buildStrategyRecommendations } from './buildRecommendations'
export {
  getBrandLearningState,
  buildLearningContextLines,
  getLearningAdapterNotes,
} from './learningContext'
export {
  applyLearningToPriorityScore,
  learningConfidenceAdjustment,
  adjustFormatWithLearning,
  resolveCtaLearningEmphasis,
} from './applyLearningFeedback'
export type { CtaLearningEmphasis } from '../../types/performanceLearning'
