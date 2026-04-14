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

const JIFUNZE_SUSTAIN: SocialAccount[] = [
  ac({
    id: 'acct-jifunze-ig',
    brand_profile_id: 'jifunze-sustain',
    platform: 'instagram',
    handle: 'jifunzedemoco',
    automation: { posting_cadence_per_day_max: 3, blocked_trend_categories: ['breaking_news'] },
  }),
  ac({
    id: 'acct-jifunze-fb',
    brand_profile_id: 'jifunze-sustain',
    platform: 'facebook',
    handle: 'JifunzeDemoCo',
    automation: { posting_cadence_per_day_max: 2 },
  }),
  ac({
    id: 'acct-jifunze-li',
    brand_profile_id: 'jifunze-sustain',
    platform: 'linkedin',
    handle: 'company/jifunze-demo-co',
  }),
]

const PULSE_BEAUTY: SocialAccount[] = [
  ac({
    id: 'acct-pulse-ig',
    brand_profile_id: 'pulse-beauty',
    platform: 'instagram',
    handle: 'pulsebeautylab',
    automation: { auto_publish_enabled: true, posting_cadence_per_day_max: 5 },
  }),
  ac({
    id: 'acct-pulse-tiktok',
    brand_profile_id: 'pulse-beauty',
    platform: 'tiktok',
    handle: '@pulsebeautylab',
    automation: { posting_cadence_per_day_max: 3 },
  }),
  ac({
    id: 'acct-pulse-x',
    brand_profile_id: 'pulse-beauty',
    platform: 'x',
    handle: 'pulsebeautylab',
  }),
]

const NOCTURNE: SocialAccount[] = [
  ac({
    id: 'acct-nocturne-ig',
    brand_profile_id: 'nocturne-events',
    platform: 'instagram',
    handle: 'nocturnecollective',
  }),
  ac({
    id: 'acct-nocturne-tiktok',
    brand_profile_id: 'nocturne-events',
    platform: 'tiktok',
    handle: '@nocturnecollective',
  }),
  ac({
    id: 'acct-nocturne-fb',
    brand_profile_id: 'nocturne-events',
    platform: 'facebook',
    handle: 'NocturneCollectiveEvents',
    publishing_eligibility: 'restricted',
  }),
]

const BY_BRAND: Record<string, SocialAccount[]> = {
  'jifunze-sustain': JIFUNZE_SUSTAIN,
  'pulse-beauty': PULSE_BEAUTY,
  'nocturne-events': NOCTURNE,
}

export function getDemoSocialAccountsForBrand(brandId: string): SocialAccount[] {
  return BY_BRAND[brandId] ?? []
}
