import type { BrandProfile } from '../../types/brand'
import type { ExternalSignal } from '../../types/signal'

export type BrandRelevanceInput = {
  signal: ExternalSignal
  brand: BrandProfile
}

export type ScoredSignal = ExternalSignal & {
  relevance_score: number
  freshness_score: number
}

/** Swappable scorer (ML, rules engine, embeddings) later. */
export type BrandRelevanceScorer = (input: BrandRelevanceInput) => ScoredSignal
