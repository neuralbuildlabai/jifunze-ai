import type { ContentPackage } from '../../types/contentPackage'
import type { ContentOpportunity } from '../../types/opportunity'
import type {
  AdaptationPipelineSummary,
  OpportunityPipelineSummary,
  PipelineFeedbackEvent,
  PipelineStageCounts,
} from '../../types/pipelineFeedback'

const MAX_EVENTS = 64

const eventsByBrand = new Map<string, PipelineFeedbackEvent[]>()
const latestStageCountsByBrand = new Map<string, PipelineStageCounts>()
const latestAdaptationByBrand = new Map<string, AdaptationPipelineSummary>()

function pushEvent(event: PipelineFeedbackEvent): void {
  const current = eventsByBrand.get(event.brand_id) ?? []
  current.push(event)
  if (current.length > MAX_EVENTS) current.splice(0, current.length - MAX_EVENTS)
  eventsByBrand.set(event.brand_id, current)
}

function randomId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

function opportunitySummary(o: ContentOpportunity): OpportunityPipelineSummary {
  return {
    id: o.id,
    domain: o.content_domain,
    trend: o.trend_category,
    priority: Number(o.priority_score.toFixed(4)),
    priority_label: o.priority_label,
    lifecycle_status: o.lifecycle_status,
    autonomy_action: o.autonomy_action,
    conversion_intent: o.conversion_intent,
    teaching_level: o.teaching_level,
    format: o.suggested_content_format,
  }
}

/**
 * Explicit hook for ingestion → ranking stage completion.
 * Safe fallback: never throws into runtime flow.
 */
export function onSignalsIngested(input: {
  brand_id: string
  counts: PipelineStageCounts
}): void {
  try {
    latestStageCountsByBrand.set(input.brand_id, input.counts)
    pushEvent({
      id: randomId('pipe'),
      type: 'signals_ingested',
      brand_id: input.brand_id,
      created_at_iso: new Date().toISOString(),
      payload: input.counts,
    })
  } catch {
    // Hooks must never block user flow.
  }
}

/**
 * Explicit hook for scored signals → opportunities stage completion.
 */
export function onOpportunitiesBuilt(input: {
  brand_id: string
  opportunities: ContentOpportunity[]
}): void {
  try {
    pushEvent({
      id: randomId('pipe'),
      type: 'opportunities_built',
      brand_id: input.brand_id,
      created_at_iso: new Date().toISOString(),
      payload: {
        count: input.opportunities.length,
        top: input.opportunities.slice(0, 6).map(opportunitySummary),
      },
    })
  } catch {
    // Hooks must never block user flow.
  }
}

/**
 * Explicit hook for opportunity → package stage completion.
 */
export function onContentPackageGenerated(input: {
  brand_id: string
  opportunity: ContentOpportunity
  content_package: ContentPackage
}): void {
  try {
    pushEvent({
      id: randomId('pipe'),
      type: 'content_package_generated',
      brand_id: input.brand_id,
      created_at_iso: new Date().toISOString(),
      payload: {
        opportunity: opportunitySummary(input.opportunity),
        package_mode: input.content_package.mode,
        lifecycle_status: input.content_package.lifecycle_status ?? 'drafted',
        has_platform_adaptation: Boolean(input.content_package.platform_adaptation),
        has_learning_feedback_hook: Boolean(input.content_package.analytics_feedback),
      },
    })
  } catch {
    // Hooks must never block user flow.
  }
}

/**
 * Explicit hook for package → platform adaptation stage completion.
 */
export function onPlatformAdapted(input: {
  brand_id: string
  summary: AdaptationPipelineSummary
}): void {
  try {
    latestAdaptationByBrand.set(input.brand_id, input.summary)
    pushEvent({
      id: randomId('pipe'),
      type: 'platform_adapted',
      brand_id: input.brand_id,
      created_at_iso: new Date().toISOString(),
      payload: input.summary,
    })
  } catch {
    // Hooks must never block user flow.
  }
}

export function getLatestPipelineStageCounts(
  brand_id: string,
): PipelineStageCounts | undefined {
  return latestStageCountsByBrand.get(brand_id)
}

export function getLatestPipelineAdaptation(
  brand_id: string,
): AdaptationPipelineSummary | undefined {
  return latestAdaptationByBrand.get(brand_id)
}

export function getRecentPipelineEvents(
  brand_id: string,
  limit = 12,
): PipelineFeedbackEvent[] {
  const events = eventsByBrand.get(brand_id) ?? []
  return events.slice(Math.max(0, events.length - limit))
}
