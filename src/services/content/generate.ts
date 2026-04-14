import type { BrandProfile } from '../../types/brand'
import type { SocialContent } from '../../types/content'
import type { ContentOpportunity } from '../../types/opportunity'
import type { ExternalSignal } from '../../types/signal'
import { buildLearningContextLines } from '../learning/learningContext'
import { buildTeachingContextLines } from '../teaching/buildTeachingContextLines'
import { createContentGenerationAdapter } from './createAdapter'
import type { GenerationPayload } from './payloads'

const adapter = createContentGenerationAdapter()

function buildSignalContext(signal: ExternalSignal): string {
  const tags = signal.topic_tags.length ? `Tags: ${signal.topic_tags.join(', ')}` : ''
  return [signal.summary, tags, signal.url].filter(Boolean).join('\n')
}

function buildOpportunityContext(
  opportunity: ContentOpportunity,
  learningLines?: string[],
): string {
  const kw =
    opportunity.matched_keywords.length > 0
      ? opportunity.matched_keywords.join(', ')
      : '(none surfaced)'
  const base = [
    `Why it matters: ${opportunity.why_it_matters}`,
    `Angle: ${opportunity.suggested_angle}`,
    `Format: ${opportunity.suggested_content_format}`,
    `Media direction: ${opportunity.suggested_media_direction}`,
    `Trend category: ${opportunity.trend_category}`,
    `Jifunze domain: ${opportunity.content_domain}`,
    `Matched domain: ${opportunity.matched_domain}`,
    `Matched keywords: ${kw}`,
    `Freshness: ${opportunity.freshness_summary}`,
    `Priority: ${opportunity.priority_label} (${opportunity.priority_score.toFixed(2)})`,
    `Autonomy: ${opportunity.autonomy_action.replace(/_/g, ' ')} — ${opportunity.autonomy_reason}`,
    `Lifecycle: ${opportunity.lifecycle_status} (driver: ${opportunity.lifecycle_driver}, updated ${opportunity.lifecycle_updated_at})`,
    `Confidence: ${(opportunity.confidence_score * 100).toFixed(0)}% · Risk: ${opportunity.risk_level} · Human review: ${opportunity.requires_human_review ? 'yes' : 'no'}`,
    `Selection: ${opportunity.selection_reason}`,
    `Conversion intent: ${opportunity.conversion_intent.replace(/_/g, ' ')}`,
    `Target destination: ${opportunity.target_destination}`,
    `CTA: ${opportunity.suggested_cta}`,
    `Platforms: ${opportunity.suggested_platforms.join(', ')}`,
    `Sources: ${opportunity.source_links.join(', ')}`,
  ]
  if (learningLines?.length) {
    base.push(...learningLines)
  }
  base.push(...buildTeachingContextLines(opportunity))
  return base.join('\n')
}

async function generateWithPayload(payload: GenerationPayload): Promise<SocialContent> {
  const trimmedTopic = payload.topic.trim()
  if (!trimmedTopic) {
    throw new Error('Enter a topic to generate content.')
  }

  try {
    return await adapter.generate({
      ...payload,
      topic: trimmedTopic,
    })
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Something went wrong while generating content.')
  }
}

/**
 * Manual topic path (original Phase 1 flow).
 */
export async function generateSocialContent(topic: string): Promise<SocialContent> {
  const trimmed = topic.trim()
  if (!trimmed) {
    throw new Error('Enter a topic to generate content.')
  }
  return generateWithPayload({
    topic: trimmed,
    source: 'manual_topic',
  })
}

/**
 * Generate from a normalized external signal (trend/news item).
 */
export async function generateFromExternalSignal(
  signal: ExternalSignal,
): Promise<SocialContent> {
  return generateWithPayload({
    topic: signal.title,
    context: buildSignalContext(signal),
    source: 'signal',
    external_signal_id: signal.id,
  })
}

/**
 * Generate from a structured opportunity (recommended angle, CTA, etc.).
 */
export async function generateFromOpportunity(
  opportunity: ContentOpportunity,
  options?: { brand?: BrandProfile },
): Promise<SocialContent> {
  const learningLines = options?.brand
    ? buildLearningContextLines(options.brand.id)
    : undefined
  return generateWithPayload({
    topic: opportunity.topic,
    context: buildOpportunityContext(opportunity, learningLines),
    source: 'opportunity',
    content_opportunity_id: opportunity.id,
    external_signal_id: opportunity.signal_id,
  })
}
