/**
 * High-level plan labels for dashboards — aligns with `pricingSkuRegistry.ts` (three SKUs).
 */

import { skuByKey } from './pricingSkuRegistry'

export type PaidPlanKey = 'jifunze_monthly' | 'jifunze_annual' | 'jifunze_single_course'

export type SubscriptionPlanId = 'free' | PaidPlanKey

export type SubscriptionPlan = {
  id: SubscriptionPlanId
  name: string
  monthlyUsd: number | null
  summary: string
  tagline?: string
  bullets: readonly string[]
  checkoutPlanKey?: PaidPlanKey
  accessTierHint: 'member' | 'pro' | 'workspace_admin'
}

const freePlan: SubscriptionPlan = {
  id: 'free',
  name: 'Free',
  monthlyUsd: null,
  summary: 'Explore the catalog and workspace basics.',
  tagline: 'Get started with core learning flows.',
  bullets: [
    'Browse courses and preview learning paths',
    'Workspace features available for your account',
    'Upgrade when you want full access or a single deep dive',
  ],
  accessTierHint: 'member',
}

function skuPlan(key: PaidPlanKey): SubscriptionPlan {
  const sku = skuByKey(key)
  if (!sku) {
    return {
      id: key,
      name: 'Paid plan',
      monthlyUsd: null,
      summary: 'See Plans & billing for current options.',
      bullets: [],
      checkoutPlanKey: key,
      accessTierHint: 'pro',
    }
  }
  const monthlyUsd =
    sku.billingInterval === 'month' ? sku.displayAmountUsd : sku.billingInterval === 'year' ? Math.round(sku.displayAmountUsd / 12) : null
  return {
    id: key,
    name: sku.name,
    monthlyUsd,
    summary: sku.summary,
    tagline: sku.summary,
    bullets: sku.bullets,
    checkoutPlanKey: key,
    accessTierHint: 'pro',
  }
}

export const SUBSCRIPTION_PLANS: readonly SubscriptionPlan[] = [
  freePlan,
  skuPlan('jifunze_monthly'),
  skuPlan('jifunze_annual'),
  skuPlan('jifunze_single_course'),
] as const

export function paidPlans(): readonly SubscriptionPlan[] {
  return SUBSCRIPTION_PLANS.filter((p) => p.checkoutPlanKey !== undefined)
}
