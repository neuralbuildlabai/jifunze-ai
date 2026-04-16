import { mergeSocialAccountAutomation } from '../types/socialAccount'
import type { SocialAccount } from '../types/socialAccount'

function ac(input: {
  id: string
  brand_profile_id: string
  platform: SocialAccount['platform']
  handle: string
  status?: SocialAccount['status']
  publishing_eligibility?: SocialAccount['publishing_eligibility']
  automation?: Partial<SocialAccount['automation']>
}): SocialAccount {
  return {
    id: input.id,
    brand_profile_id: input.brand_profile_id,
    platform: input.platform,
    handle: input.handle,
    status: input.status ?? 'connected',
    publishing_eligibility: input.publishing_eligibility ?? 'eligible',
    automation: mergeSocialAccountAutomation(input.automation),
  }
}

const JIFUNZE_AI_STUDIO: SocialAccount[] = [
  ac({
    id: 'acct-jas-ig',
    brand_profile_id: 'jifunze-ai-studio',
    platform: 'instagram',
    handle: 'jifunzeaistudio',
    automation: { posting_cadence_per_day_max: 3, blocked_trend_categories: ['breaking_news'] },
  }),
  ac({
    id: 'acct-jas-tiktok',
    brand_profile_id: 'jifunze-ai-studio',
    platform: 'tiktok',
    handle: '@jifunzeaistudio',
    automation: { posting_cadence_per_day_max: 4 },
  }),
  ac({
    id: 'acct-jas-x',
    brand_profile_id: 'jifunze-ai-studio',
    platform: 'x',
    handle: 'jifunzeaistudio',
  }),
  ac({
    id: 'acct-jas-li',
    brand_profile_id: 'jifunze-ai-studio',
    platform: 'linkedin',
    handle: 'company/jifunze-ai-studio',
  }),
]

const CONTEXT_WEIGHTS: SocialAccount[] = [
  ac({
    id: 'acct-cw-ig',
    brand_profile_id: 'context-weights',
    platform: 'instagram',
    handle: 'contextweights',
    automation: { auto_publish_enabled: true, posting_cadence_per_day_max: 5 },
  }),
  ac({
    id: 'acct-cw-tiktok',
    brand_profile_id: 'context-weights',
    platform: 'tiktok',
    handle: '@contextweights',
    automation: { posting_cadence_per_day_max: 3 },
  }),
  ac({
    id: 'acct-cw-x',
    brand_profile_id: 'context-weights',
    platform: 'x',
    handle: 'contextweights',
  }),
]

const BY_BRAND: Record<string, SocialAccount[]> = {
  'jifunze-ai-studio': JIFUNZE_AI_STUDIO,
  'context-weights': CONTEXT_WEIGHTS,
}

export function getDemoSocialAccountsForBrand(brandId: string): SocialAccount[] {
  return BY_BRAND[brandId] ?? []
}
