import type { SupabaseClient } from '@supabase/supabase-js'
import type { BrandProfile } from '../../types/brand'
import { EMPTY_CONTENT_ANALYTICS_FEEDBACK } from '../../types/contentAnalytics'
import { EMPTY_CONVERSION_FUNNEL_FEEDBACK } from '../../types/conversionFeedback'
import type { ContentGenerationMode, ContentPackage } from '../../types/contentPackage'
import type { ContentOpportunity } from '../../types/opportunity'
import type { PlatformAdaptationResult } from '../../types/platformAdaptation'
import type { PublishTimingBucket } from '../../types/performanceLearning'
import type { ContentLearningFingerprint } from '../../types/storedRecords'
import { getPersistence, LOCAL_DEV_TENANT_ID } from '../../persistence/registry'
import { initialPackageLifecycleStatus } from '../lifecycle/packageLifecycle'
import { buildCreativeBriefFromOpportunity } from '../creative/buildCreativeBrief'
import { buildMockMediaPrompts, buildVisualConceptSummary } from '../creative/mockMediaPlanning'
import { buildAllMediaPlans } from '../mediaPlanning/buildMediaPlans'
import {
  buildLearningContextLinesFromState,
  getBrandLearningState,
} from '../learning/learningContext'
import { onContentPackageGenerated } from '../pipeline'
import { firstAdaptationPlatformFromSuggestions } from '../conversion/mapSuggestedPlatform'
import { adaptOpportunityToPlatforms } from '../platforms/adaptOpportunityToPlatforms'
import { generateFromOpportunity } from './generate'

function withArtifactPipelineFields(
  opportunity: ContentOpportunity,
  pkg: ContentPackage,
): ContentPackage {
  return {
    ...pkg,
    lifecycle_status: initialPackageLifecycleStatus(opportunity),
    lifecycle_updated_at: new Date().toISOString(),
    lifecycle_driver: 'system',
    source_opportunity_id: opportunity.id,
    analytics_feedback: { ...EMPTY_CONTENT_ANALYTICS_FEEDBACK },
    conversion_funnel_feedback: { ...EMPTY_CONVERSION_FUNNEL_FEEDBACK },
    teaching_explainability: opportunity.teaching_explainability,
  }
}

function withPlatformAdaptation(
  pkg: ContentPackage,
  adaptation: PlatformAdaptationResult | undefined,
): ContentPackage {
  if (!adaptation) return pkg
  return { ...pkg, platform_adaptation: adaptation }
}

function utcPublishBucket(d = new Date()): PublishTimingBucket {
  const hr = d.getUTCHours()
  if (hr >= 5 && hr < 12) return 'morning'
  if (hr >= 12 && hr < 17) return 'afternoon'
  if (hr >= 17 && hr < 22) return 'evening'
  return 'night'
}

function buildLearningFingerprint(
  opportunity: ContentOpportunity,
): ContentLearningFingerprint {
  const primarySurface = firstAdaptationPlatformFromSuggestions(opportunity.suggested_platforms)
  return {
    domain: opportunity.content_domain,
    trendCategory: opportunity.trend_category,
    primaryPlatform: primarySurface,
    contentFormat: opportunity.suggested_content_format,
    hookStyle: opportunity.suggested_media_direction.slice(0, 48),
    ctaStyle: opportunity.suggested_cta.slice(0, 64),
    teachingLevel: opportunity.teaching_level,
    explanationStyle: opportunity.explanation_style,
    lifecyclePath: `${opportunity.lifecycle_status}@${opportunity.lifecycle_driver}`,
    publishTimingBucket: utcPublishBucket(),
  }
}

/**
 * Assembles caption (via existing adapter) plus creative layers for richer deliverables.
 * Image/video generation stays mocked until vendor/Edge integration lands.
 */
export async function generateContentPackage(params: {
  opportunity: ContentOpportunity
  brand: BrandProfile
  mode: ContentGenerationMode
  /** When `multi`, builds a brief if needed and attaches four surface-native variants. */
  platformAdaptation?: 'off' | 'multi'
  tenantId?: string
  supabase?: SupabaseClient
}): Promise<ContentPackage> {
  const { opportunity, brand, mode } = params
  const platformAdaptation = params.platformAdaptation ?? 'off'
  const multi = platformAdaptation === 'multi'
  const tenantId = params.tenantId ?? brand.tenant_id ?? LOCAL_DEV_TENANT_ID
  const supabase = params.supabase

  const creative_brief =
    mode !== 'caption_only' || multi
      ? buildCreativeBriefFromOpportunity(opportunity, brand)
      : undefined

  const learningState = await getBrandLearningState(brand.id, tenantId, supabase)
  const learningNotes = learningState.recommendations.slice(0, 3).map((r) => r.title)
  const learningContextLines = buildLearningContextLinesFromState(learningState)

  const adaptation =
    multi && creative_brief
      ? await adaptOpportunityToPlatforms({
          brand,
          opportunity,
          creativeBrief: creative_brief,
          learningSurfaceNotes: learningNotes,
          recommendations: learningState.recommendations,
          tenantId,
          supabase,
        })
      : undefined

  const social = await generateFromOpportunity(opportunity, {
    brand,
    tenantId,
    supabase,
    learningContextLines,
  })
  const learningFingerprint = buildLearningFingerprint(opportunity)

  const withHook = async (pkg: ContentPackage): Promise<ContentPackage> => {
    const itemId = `pkg-${brand.id}-${opportunity.id}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
    await getPersistence(tenantId, supabase).contentItems.put({
      id: itemId,
      brandProfileId: brand.id,
      sourceOpportunityId: opportunity.id,
      mode,
      lifecycleStatus: pkg.lifecycle_status,
      createdAt: new Date().toISOString(),
      package: pkg,
      learningFingerprint,
    })
    onContentPackageGenerated({
      brand_id: brand.id,
      opportunity,
      content_package: pkg,
    })
    return pkg
  }

  if (mode === 'caption_only') {
    return withHook(withArtifactPipelineFields(
      opportunity,
      withPlatformAdaptation(
        {
          mode,
          social,
          ...(creative_brief ? { creative_brief } : {}),
        },
        adaptation,
      ),
    ))
  }

  const brief = creative_brief ?? buildCreativeBriefFromOpportunity(opportunity, brand)

  if (mode === 'caption_visual_concept') {
    return withHook(withArtifactPipelineFields(
      opportunity,
      withPlatformAdaptation(
        {
          mode,
          social,
          creative_brief: brief,
          visual_concept_summary: buildVisualConceptSummary(brief, opportunity),
        },
        adaptation,
      ),
    ))
  }

  const media_plans = buildAllMediaPlans(brand, opportunity)
  const media_prompts = buildMockMediaPrompts(brief, brand, opportunity, media_plans)

  if (mode === 'caption_media_brief') {
    return withHook(withArtifactPipelineFields(
      opportunity,
      withPlatformAdaptation(
        {
          mode,
          social,
          creative_brief: brief,
          media_prompts,
          media_plans,
        },
        adaptation,
      ),
    ))
  }

  return withHook(withArtifactPipelineFields(
    opportunity,
    withPlatformAdaptation(
      {
        mode,
        social,
        creative_brief: brief,
        visual_concept_summary: buildVisualConceptSummary(brief, opportunity),
        media_prompts,
        media_plans,
      },
      adaptation,
    ),
  ))
}
