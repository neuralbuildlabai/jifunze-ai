import type { SupabaseClient } from '@supabase/supabase-js'
import type { BrandProfile } from '../../types/brand'
import type { CreativeBrief } from '../../types/creativeBrief'
import type { ContentOpportunity } from '../../types/opportunity'
import type { PlatformPostVariant } from '../../types/platformAdaptation'
import type { SocialAccount } from '../../types/socialAccount'
import type { AdaptationPlatformId } from '../../types/adaptationPlatform'
import { getLearningAdapterNotes } from '../learning/learningContext'
import { adaptOpportunityToPlatforms } from './adaptOpportunityToPlatforms'

export type AdaptContentForSocialAccountsInput = {
  brand: BrandProfile
  opportunity: ContentOpportunity
  accounts: SocialAccount[]
  creativeBrief?: CreativeBrief
  tenantId: string
  supabase?: SupabaseClient
}

function isAdaptationPlatform(p: SocialAccount['platform']): p is AdaptationPlatformId {
  return p === 'x' || p === 'instagram' || p === 'tiktok' || p === 'facebook'
}

/**
 * Maps shared adaptation variants onto **connected** accounts (same platform = shared variant + handle notes).
 */
export async function adaptContentForSocialAccounts(
  input: AdaptContentForSocialAccountsInput,
): Promise<PlatformPostVariant[]> {
  const { brand, opportunity, accounts, creativeBrief, tenantId, supabase } = input
  const learningNotes = await getLearningAdapterNotes(brand.id, tenantId, supabase)
  const base = await adaptOpportunityToPlatforms({
    brand,
    opportunity,
    creativeBrief,
    learningSurfaceNotes: learningNotes,
    tenantId,
    supabase,
  })
  const byPlatform = new Map(base.variants.map((v) => [v.platform, v]))

  const connected = accounts.filter(
    (a) =>
      a.brand_profile_id === brand.id &&
      a.status === 'connected' &&
      a.publishing_eligibility !== 'blocked' &&
      !a.automation.blocked_trend_categories.includes(opportunity.trend_category),
  )

  const out: PlatformPostVariant[] = []
  for (const account of connected) {
    if (!isAdaptationPlatform(account.platform)) continue
    const v = byPlatform.get(account.platform)
    if (!v) continue
    out.push({
      ...v,
      social_account_id: account.id,
      publishingNotes: [
        v.publishingNotes,
        `Surface @${account.handle} · max ${account.automation.posting_cadence_per_day_max}/day · auto-publish ${account.automation.auto_publish_enabled ? 'allowed if policy clears' : 'off on this handle'}.`,
      ]
        .filter(Boolean)
        .join(' '),
    })
  }
  return out
}
