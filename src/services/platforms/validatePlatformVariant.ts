import type { PlatformAdaptationPolicy } from '../../config/platformAdaptationPolicies'
import type { AdaptationPlatformId } from '../../types/adaptationPlatform'
import type { BrandProfile } from '../../types/brand'
import type { ContentOpportunity } from '../../types/opportunity'
import type {
  PlatformAdaptationIssue,
  PlatformAdaptationQuality,
  PlatformPostVariant,
} from '../../types/platformAdaptation'

function clipHard(text: string, max: number): string {
  const t = text.trim()
  if (t.length <= max) return t
  return `${t.slice(0, Math.max(0, max - 1)).trimEnd()}…`
}

function isWeakCta(cta: string | undefined): boolean {
  if (!cta?.trim()) return true
  const t = cta.trim()
  if (t.length < 14) return true
  if (/^(save|link|shop|learn more)\.?$/i.test(t)) return true
  return false
}

function fallbackHook(opportunity: ContentOpportunity, platform: AdaptationPlatformId): string {
  const t = opportunity.topic.trim() || 'This moment matters for your feed.'
  const trend = opportunity.trend_category.replace(/_/g, ' ')
  if (platform === 'x') return clipHard(`${t.split('.')[0] || t} — ${trend}`, 100)
  if (platform === 'instagram') return clipHard(`On-feed: ${t.split('.')[0] || t}`, 95)
  if (platform === 'tiktok') return clipHard(`${t.slice(0, 42)}${t.length > 42 ? '…' : ''}`, 52)
  return clipHard(`Quick take: ${t.split('.')[0] || t}`, 90)
}

function strengthenCta(
  base: string | undefined,
  brand: BrandProfile,
  opportunity: ContentOpportunity,
  platform: AdaptationPlatformId,
): string {
  const seed = (base?.trim() || opportunity.suggested_cta || 'Engage with this drop').trim()
  if (platform === 'x') return clipHard(`${seed} — reply with your take.`, 95)
  if (platform === 'instagram') return clipHard(`${seed} · Save + share if it landed.`, 120)
  if (platform === 'tiktok')
    return clipHard(`Watch the payoff — duet/stitch if it fits ${brand.name}.`, 95)
  return clipHard(`${seed} Who in your circle needs to see this? Comment below.`, 140)
}

/**
 * Detects length, hook, CTA, and media issues (read-only diagnostic).
 */
export function validatePlatformVariant(
  v: PlatformPostVariant,
  policy: PlatformAdaptationPolicy,
): { issues: PlatformAdaptationIssue[]; passes: boolean } {
  const issues: PlatformAdaptationIssue[] = []
  if (v.caption.length > policy.roughMaxCaptionChars) issues.push('caption_over_guideline')
  if (!v.hook?.trim()) issues.push('missing_hook')
  if (isWeakCta(v.cta)) issues.push('weak_cta')
  if (!v.mediaPlanSummary?.trim() || v.mediaPlanSummary.trim().length < 32) issues.push('thin_media_plan')
  return { issues, passes: issues.length === 0 }
}

/**
 * Applies guardrails and fallbacks so every surface ships usable copy.
 */
export function refinePlatformVariant(
  draft: PlatformPostVariant,
  policy: PlatformAdaptationPolicy,
  opportunity: ContentOpportunity,
  brand: BrandProfile,
): PlatformPostVariant {
  const adjustments: string[] = []
  let v: PlatformPostVariant = { ...draft }

  if (!v.hook?.trim()) {
    v = { ...v, hook: fallbackHook(opportunity, v.platform) }
    adjustments.push('Inserted platform-native fallback hook (source line was thin).')
  }

  if (isWeakCta(v.cta)) {
    v = { ...v, cta: strengthenCta(v.cta, brand, opportunity, v.platform) }
    adjustments.push('CTA strengthened for clarity and channel norms.')
  }

  if (!v.mediaPlanSummary?.trim() || v.mediaPlanSummary.trim().length < 36) {
    const fill = [
      policy.mediaExpectations,
      opportunity.suggested_media_direction?.trim() || `Hero aligns with ${brand.name} visual system.`,
    ]
      .filter(Boolean)
      .join(' ')
    v = { ...v, mediaPlanSummary: clipHard(fill, 420) }
    adjustments.push('Media direction padded from policy + opportunity fallbacks.')
  }

  if (v.caption.length > policy.roughMaxCaptionChars) {
    v = {
      ...v,
      caption: clipHard(v.caption, policy.roughMaxCaptionChars),
      characterLimitStatus: 'trimmed',
    }
    adjustments.push('Caption hard-clipped to platform guideline.')
  }

  const { issues: remaining, passes } = validatePlatformVariant(v, policy)

  const quality_check: PlatformAdaptationQuality = {
    passes,
    issues_detected: remaining,
    adjustments_applied: adjustments,
  }

  return { ...v, quality_check }
}
