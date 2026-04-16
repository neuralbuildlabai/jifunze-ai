export {
  generateContent,
  generateFromExternalSignal,
  generateFromOpportunity,
  generateSocialContent,
} from './content/generate'
export { generateContentPackage } from './content/generatePackage'
export { buildAllMediaPlans, MEDIA_PLAN_KINDS } from './mediaPlanning/buildMediaPlans'
export { classifySignal } from './domains/classifySignal'
export { classifyTrendCategory } from './trends/classifyTrendCategory'
export { adaptOpportunityToPlatforms, adaptContentForSocialAccounts } from './platforms'
export type { AdaptOpportunityToPlatformsInput } from './platforms/adaptOpportunityToPlatforms'
export type { AdaptContentForSocialAccountsInput } from './platforms/adaptContentForSocialAccounts'
export type {
  Platform,
  PlatformPostVariant,
  PlatformAdaptationResult,
  CharacterLimitStatus,
  PlatformAdaptationIssue,
  PlatformAdaptationQuality,
} from '../types/platformAdaptation'
export { normalizeCreativeBriefForAdaptation, validatePlatformVariant, refinePlatformVariant } from './platforms'
export type { AdaptationPlatformId } from '../types/adaptationPlatform'
export { ADAPTATION_PLATFORM_IDS } from '../types/adaptationPlatform'
export { resolveSocialAccountsForBrand } from '../config/resolveSocialAccounts'
export type { SocialPlatformId } from '../types/socialPlatform'
export type { SocialAccount } from '../types/socialAccount'
export {
  getPublishingConnector,
  isAllPublishingSimulated,
  registerPublishingConnector,
  createMockPublishingConnector,
} from './publishing'
export type { PublishIntent, PublishResult, PublishingConnector } from './publishing'
export {
  getBrandLearningState,
  recordPublishedContentPerformance,
  analyzeBrandPerformance,
  buildStrategyRecommendations,
} from './learning'
export type { CtaLearningEmphasis } from '../types/performanceLearning'
export {
  analyzeTeachingPerformance,
  resolveTeachingProfile,
  buildTeachingContextLines,
} from './teaching'
export type { TeachingLevel, ExplanationStyle } from '../types/teaching'
export {
  getLatestPipelineStageCounts,
  getLatestPipelineAdaptation,
  getRecentPipelineEvents,
} from './pipeline'
export type {
  PipelineFeedbackEvent,
  PipelineFeedbackEventType,
  PipelineStageCounts,
} from '../types/pipelineFeedback'
export {
  getPersistence,
  setPersistence,
  resetPersistenceForTests,
  clearSupabasePersistenceCache,
  persistenceBackendForTenant,
} from '../persistence'
export type { PersistenceLayer } from '../persistence'
