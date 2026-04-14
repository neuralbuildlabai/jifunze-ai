import type { BrandProfile } from '../../types/brand'
import { EMPTY_CONTENT_ANALYTICS_FEEDBACK } from '../../types/contentAnalytics'
import { EMPTY_CONVERSION_FUNNEL_FEEDBACK } from '../../types/conversionFeedback'
import type { ContentGenerationMode, ContentPackage } from '../../types/contentPackage'
import type { ContentOpportunity } from '../../types/opportunity'
import type { PlatformAdaptationResult } from '../../types/platformAdaptation'
import { initialPackageLifecycleStatus } from '../lifecycle/packageLifecycle'
import { buildCreativeBriefFromOpportunity } from '../creative/buildCreativeBrief'
import { buildMockMediaPrompts, buildVisualConceptSummary } from '../creative/mockMediaPlanning'
import { buildAllMediaPlans } from '../mediaPlanning/buildMediaPlans'
import { getLearningAdapterNotes } from '../learning/learningContext'
import { adaptOpportunityToPlatforms } from '../platforms/adaptOpportunityToPlatforms'
import { generateFromOpportunity } from './generate'

function withArtifactPipelineFields(
  opportunity: ContentOpportunity,
  pkg: ContentPackage,
): ContentPackage {
  return {
    ...pkg,
    lifecycle_status: initialPackageLifecycleStatus(),
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
}): Promise<ContentPackage> {
  const { opportunity, brand, mode } = params
  const platformAdaptation = params.platformAdaptation ?? 'off'
  const multi = platformAdaptation === 'multi'

  const creative_brief =
    mode !== 'caption_only' || multi
      ? buildCreativeBriefFromOpportunity(opportunity, brand)
      : undefined

  const adaptation = multi && creative_brief
    ? adaptOpportunityToPlatforms({
        brand,
        opportunity,
        creativeBrief: creative_brief,
        learningSurfaceNotes: getLearningAdapterNotes(brand.id),
      })
    : undefined

  const social = await generateFromOpportunity(opportunity, { brand })

  if (mode === 'caption_only') {
    return withArtifactPipelineFields(
      opportunity,
      withPlatformAdaptation(
        {
          mode,
          social,
          ...(creative_brief ? { creative_brief } : {}),
        },
        adaptation,
      ),
    )
  }

  const brief = creative_brief ?? buildCreativeBriefFromOpportunity(opportunity, brand)

  if (mode === 'caption_visual_concept') {
    return withArtifactPipelineFields(
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
    )
  }

  const media_plans = buildAllMediaPlans(brand, opportunity)
  const media_prompts = buildMockMediaPrompts(brief, brand, opportunity, media_plans)

  if (mode === 'caption_media_brief') {
    return withArtifactPipelineFields(
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
    )
  }

  return withArtifactPipelineFields(
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
  )
}
