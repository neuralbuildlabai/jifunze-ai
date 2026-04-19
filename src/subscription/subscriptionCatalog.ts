/**
 * Compatibility layer for workspace / pricing surfaces — composes legacy “plan cards” from the SKU registry.
 * New work should prefer `pricingSkuRegistry.ts` directly.
 */

import { type PricingSkuKey, skuByKey } from './pricingSkuRegistry'

export type PaidPlanKey = Extract<PricingSkuKey, 'creator' | 'team'>

export type SubscriptionPlanId = 'free' | PaidPlanKey

export type SubscriptionPlan = {
  id: SubscriptionPlanId
  name: string
  monthlyUsd: number | null
  summary: string
  tagline?: string
  bullets: readonly string[]
  stripePriceEnvKey?: string
  checkoutPlanKey?: PaidPlanKey
  accessTierHint: 'member' | 'pro' | 'workspace_admin'
}

const freePlan: SubscriptionPlan = {
  id: 'free',
  name: 'Free',
  monthlyUsd: null,
  summary: 'Try generation, workspace basics, and core training flows where enabled.',
  tagline: 'Try generation, workspace basics, and core training flows.',
  bullets: [
    'Public trial generation and workspace exploration where enabled',
    'Training plans and checkpoints where available for your tenant',
    'Assistive outputs—still require your review before publication or reliance',
  ],
  accessTierHint: 'member',
}

function legacyPlan(id: PaidPlanKey): SubscriptionPlan {
  const sku = skuByKey(id)
  if (!sku) {
    return {
      id,
      name: id === 'team' ? 'Team' : 'Creator',
      monthlyUsd: null,
      summary: 'Legacy billing SKU.',
      bullets: ['See pricing catalog for replacement SKUs.'],
      accessTierHint: id === 'team' ? 'workspace_admin' : 'pro',
      checkoutPlanKey: id,
    }
  }
  return {
    id,
    name: sku.name,
    monthlyUsd: sku.displayAmountUsd,
    summary: sku.summary,
    tagline: sku.summary,
    bullets: sku.bullets,
    stripePriceEnvKey: sku.stripePriceEnvKey,
    checkoutPlanKey: id,
    accessTierHint: id === 'team' ? 'workspace_admin' : 'pro',
  }
}

export const SUBSCRIPTION_PLANS: readonly SubscriptionPlan[] = [
  freePlan,
  legacyPlan('creator'),
  legacyPlan('team'),
] as const

export function paidPlans(): readonly SubscriptionPlan[] {
  return SUBSCRIPTION_PLANS.filter((p) => p.checkoutPlanKey !== undefined)
}
