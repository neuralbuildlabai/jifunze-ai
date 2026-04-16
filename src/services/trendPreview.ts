export type { TrendPreviewBundle } from './signals/signalOrchestrator'
export {
  buildRankedOpportunitiesForBrand,
  buildRankedOpportunitiesForBrand as buildTrendPreviewForBrand,
} from './signals/signalOrchestrator'
export { loadCachedTrendStateFromPersistence } from './trendPreviewRestore'
export type { CachedTrendUiState } from './trendPreviewRestore'
