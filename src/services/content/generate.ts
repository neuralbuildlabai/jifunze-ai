import { LOCAL_DEV_TENANT_ID } from '../../persistence/registry'
import type { BrandProfile } from '../../types/brand'
import type { SocialContent } from '../../types/content'
import type { ContentOpportunity } from '../../types/opportunity'
import type { ExternalSignal } from '../../types/signal'
import type { SupabaseClient } from '@supabase/supabase-js'
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
    `Learning memory confidence: ${opportunity.learning_confidence_band}`,
    `Learning adaptation labels: ${opportunity.learning_adaptation_labels.length ? opportunity.learning_adaptation_labels.join(' · ') : '(none — cold start or no matching patterns)'}`,
    `Past performance hints: ${opportunity.learning_performance_hints.length ? opportunity.learning_performance_hints.join(' · ') : '(none yet)'}`,
    `Learning touched: format=${opportunity.learning_affects.format} · cta=${opportunity.learning_affects.cta} · teaching=${opportunity.learning_affects.teaching} · platform=${opportunity.learning_affects.platform} · priority=${opportunity.learning_affects.priority}`,
  ]
  if (opportunity.learning_influence_trace.length) {
    base.push(
      `Learning influence detail:\n${opportunity.learning_influence_trace
        .slice(0, 8)
        .map(
          (t) =>
            `- [${t.direction}] ${t.pattern}${t.patternStrength ? ` (${t.patternStrength})` : ''}: ${t.why}`,
        )
        .join('\n')}`,
    )
  }
  if (learningLines?.length) {
    base.push(...learningLines)
  }
  base.push(...buildTeachingContextLines(opportunity))
  return base.join('\n')
}

async function resolveAccessToken(supabase?: SupabaseClient): Promise<string | undefined> {
  if (!supabase) return undefined
  const { data } = await supabase.auth.getSession()
  return data.session?.access_token
}

async function generateWithPayload(
  payload: GenerationPayload,
  supabase?: SupabaseClient,
): Promise<SocialContent> {
  const trimmedTopic = payload.topic.trim()
  if (!trimmedTopic) {
    throw new Error('Enter a topic to generate content.')
  }

  const accessToken = payload.accessToken ?? (await resolveAccessToken(supabase))

  try {
    return await adapter.generate({
      ...payload,
      topic: trimmedTopic,
      accessToken,
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
export async function generateSocialContent(
  topic: string,
  options?: { supabase?: SupabaseClient },
): Promise<SocialContent> {
  const trimmed = topic.trim()
  if (!trimmed) {
    throw new Error('Enter a topic to generate content.')
  }
  return generateWithPayload(
    {
      topic: trimmed,
      source: 'manual_topic',
    },
    options?.supabase,
  )
}

/**
 * Generate from a normalized external signal (trend/news item).
 */
export async function generateFromExternalSignal(
  signal: ExternalSignal,
  options?: { supabase?: SupabaseClient },
): Promise<SocialContent> {
  return generateWithPayload(
    {
      topic: signal.title,
      context: buildSignalContext(signal),
      source: 'signal',
      external_signal_id: signal.id,
    },
    options?.supabase,
  )
}

/**
 * Generate from a structured opportunity (recommended angle, CTA, etc.).
 */
export async function generateFromOpportunity(
  opportunity: ContentOpportunity,
  options?: {
    brand?: BrandProfile
    tenantId?: string
    supabase?: SupabaseClient
    /** When set, skips {@link buildLearningContextLines} / duplicate getBrandLearningState. */
    learningContextLines?: string[]
  },
): Promise<SocialContent> {
  const tenantId = options?.tenantId ?? options?.brand?.tenant_id ?? LOCAL_DEV_TENANT_ID
  const learningLines =
    options?.learningContextLines ??
    (options?.brand
      ? await buildLearningContextLines(options.brand.id, tenantId, options.supabase)
      : undefined)
  return generateWithPayload(
    {
      topic: opportunity.topic,
      context: buildOpportunityContext(opportunity, learningLines),
      source: 'opportunity',
      content_opportunity_id: opportunity.id,
      external_signal_id: opportunity.signal_id,
    },
    options?.supabase,
  )
}

/** Stable entrypoint name; same behavior and options as {@link generateSocialContent}. */
export const generateContent = generateSocialContent
