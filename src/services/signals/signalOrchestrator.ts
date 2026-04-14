import type { BrandProfile } from '../../types/brand'
import type { ContentOpportunity } from '../../types/opportunity'
import type { ExternalSignal } from '../../types/signal'
import { classifySignal } from '../domains/classifySignal'
import { classifyTrendCategory } from '../trends/classifyTrendCategory'
import { applySignalGuards } from './applySignalGuards'
import { collectExternalSignals } from './collectExternalSignals'
import { normalizeExternalSignals } from './normalizeSignals'
import { compareSignalsByRank } from '../relevance/compositeRank'
import { ensureBrandLearningDemoSeed } from '../learning/seedDemoLearningData'
import { buildOpportunitiesFromSignals } from '../opportunities/buildOpportunities'
import { scoreSignalForBrand } from '../relevance/simpleKeywordScorer'
import type { ScoredSignal } from '../relevance/types'
import { dedupeScoredSignals } from './dedupeScoredSignals'

export type TrendPreviewBundle = {
  raw_signals: ExternalSignal[]
  guarded_signals: ExternalSignal[]
  scored_signals: ScoredSignal[]
  opportunities: ContentOpportunity[]
}

function rankScoredSignals(signals: ScoredSignal[]): ScoredSignal[] {
  return [...signals].sort(compareSignalsByRank)
}

/**
 * ## Future production architecture (signal ingestion)
 *
 * **Today:** this orchestrator runs in the browser using mock providers or a thin POST to
 * `VITE_SIGNAL_INGESTION_URL` that returns normalized JSON.
 *
 * **Recommended next step:** move real “internet scanning” to **Supabase Edge Functions** or
 * **server jobs** so you can:
 * - run **scheduled fetching** (cron / queue workers) instead of unbounded client calls
 * - apply **rate limiting** and per-source quotas
 * - centralize **caching** (KV / Postgres) to cut API cost and respect vendor limits
 * - enforce **source compliance** (ToS, robots.txt, attribution, paywalls, PII rules)
 * - perform **deduplication**, **staleness**, and **misinformation / brand-safety** checks
 *   authoritatively (client previews are best-effort only)
 *
 * The client should treat this module as a **preview** path: the same pipeline shape can call
 * an Edge aggregate that internally fans out to news, RSS, trends, and web-monitoring workers.
 *
 * **Downstream:** opportunities carry `lifecycle_status` (from autonomy) toward draft / queue /
 * publish; see `docs/near-autonomous-content-operations.md` for scheduled jobs, publishing
 * safeguards, analytics feedback, and rollback patterns.
 */
export async function buildRankedOpportunitiesForBrand(
  brand: BrandProfile,
  options?: { minRelevance?: number },
): Promise<TrendPreviewBundle> {
  const fetched_at = new Date().toISOString()
  const raw = await collectExternalSignals({ fetched_at })
  const normalized = normalizeExternalSignals(raw)
  const guard = applySignalGuards(normalized, brand.banned_topics)
  const withDomains: ExternalSignal[] = guard.kept.map((s) => ({
    ...s,
    classified_domain: classifySignal(s),
    classified_trend_category: s.classified_trend_category ?? classifyTrendCategory(s),
  }))
  const scored = withDomains.map((signal) => scoreSignalForBrand({ signal, brand }))
  const ranked = rankScoredSignals(dedupeScoredSignals(scored))
  ensureBrandLearningDemoSeed(brand)
  const opportunities = buildOpportunitiesFromSignals(ranked, brand, options?.minRelevance)

  return {
    raw_signals: raw,
    guarded_signals: withDomains,
    scored_signals: ranked,
    opportunities,
  }
}
