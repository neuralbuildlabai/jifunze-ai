export type {
  PersistenceLayer,
  PerformanceMemoryRepository,
  SignalRepository,
  OpportunityRepository,
  ContentItemRepository,
  SocialAccountRepository,
  BrandProfileRepository,
} from './contracts'
export {
  getPersistence,
  setPersistence,
  resetPersistenceForTests,
  clearSupabasePersistenceCache,
  persistenceBackendForTenant,
  LOCAL_DEV_TENANT_ID,
  isWorkspaceTenantId,
  isDemoPersistenceTenantId,
} from './registry'
export {
  shouldAutoSeedDemoLearningRows,
} from './tenantPersistenceMode'
export { createInMemoryPersistenceLayer } from './inMemoryPersistence'
export type {
  SignalIngestionBatch,
  StoredContentItem,
  StoredOpportunity,
  StoredLearningSnapshot,
  StoredLearningLabRun,
} from '../types/storedRecords'
