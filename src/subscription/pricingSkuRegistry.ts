/**
 * Customer-facing pricing — three commercial options only (USD).
 * Stripe Price IDs map via env vars configured in the dashboard (server secrets omit VITE_ prefix).
 */

/** Stable module identifiers for entitlement wiring (maps to flagship curriculum families). */
export type LearningModuleKey =
  | 'ai_foundations'
  | 'machine_learning'
  | 'everyday_chatbots'
  | 'cybersecurity'
  | 'cloud_devops'

export type BillingInterval = 'month' | 'year' | 'once'

export type AccessScope = 'single_course' | 'all_library'

export type ProductKind = 'subscription_all_access' | 'single_course_once'

export type DiscountKind = 'none'

/** Only three checkout SKUs are exposed in product UI. */
export type PricingSkuKey = 'jifunze_monthly' | 'jifunze_annual' | 'jifunze_single_course'

export type PricingSku = {
  skuKey: PricingSkuKey
  name: string
  summary: string
  bullets: readonly string[]
  displayAmountUsd: number
  billingInterval: BillingInterval
  productKind: ProductKind
  accessScope: AccessScope
  /** Full library vs one catalog course — server maps access rules. */
  moduleKeys: readonly LearningModuleKey[]
  discountKind: DiscountKind
  /** Operator documentation only — never shown in learner UI. */
  stripePriceEnvKey?: string
  savingsNote?: string
}

export const MODULE_LABEL: Record<LearningModuleKey, string> = {
  ai_foundations: 'AI Foundations',
  machine_learning: 'Machine Learning',
  everyday_chatbots: 'Everyday Chatbots',
  cybersecurity: 'Cybersecurity (Foundations → Defense)',
  cloud_devops: 'Cloud / DevOps & Platform Ops',
}

export const PRICING_SKUS: readonly PricingSku[] = [
  {
    skuKey: 'jifunze_monthly',
    name: 'Monthly access',
    summary: 'Learn across the full catalog with a simple monthly subscription.',
    bullets: [
      'Full library access while your subscription is active',
      'Cancel anytime from billing settings',
      'Best when you want flexibility month to month',
    ],
    displayAmountUsd: 29,
    billingInterval: 'month',
    productKind: 'subscription_all_access',
    accessScope: 'all_library',
    moduleKeys: [],
    discountKind: 'none',
    stripePriceEnvKey: 'VITE_STRIPE_PRICE_ALL_ACCESS_MONTHLY',
  },
  {
    skuKey: 'jifunze_annual',
    name: 'Annual access',
    summary: 'Twelve months of full library access at the best yearly rate.',
    bullets: [
      'Same full catalog as monthly—single annual payment',
      'Strong value for learners planning steady progress',
      'Renewal and invoices available in billing settings',
    ],
    displayAmountUsd: 199,
    billingInterval: 'year',
    productKind: 'subscription_all_access',
    accessScope: 'all_library',
    moduleKeys: [],
    discountKind: 'none',
    stripePriceEnvKey: 'VITE_STRIPE_PRICE_ALL_ACCESS_ANNUAL',
    savingsNote: 'Lower effective monthly cost than paying month-by-month.',
  },
  {
    skuKey: 'jifunze_single_course',
    name: 'Single course',
    summary: 'One-time purchase for deep focus on one catalog course.',
    bullets: [
      'Pay once for extended access to the course you choose at checkout',
      'Ideal when you already know which topic you need',
      'Does not unlock the full library outside that purchase',
    ],
    displayAmountUsd: 59,
    billingInterval: 'once',
    productKind: 'single_course_once',
    accessScope: 'single_course',
    moduleKeys: [],
    discountKind: 'none',
    stripePriceEnvKey: 'VITE_STRIPE_PRICE_SINGLE_COURSE_ONCE',
  },
] as const

export type PricingSectionId = 'plans'

export type PricingSection = {
  id: PricingSectionId
  title: string
  description: string
  skuKeys: readonly PricingSkuKey[]
}

export const PRICING_SECTIONS: readonly PricingSection[] = [
  {
    id: 'plans',
    title: 'Choose your access',
    description: 'Pick the option that fits how you want to learn—monthly, annual, or a single focused course.',
    skuKeys: ['jifunze_monthly', 'jifunze_annual', 'jifunze_single_course'],
  },
]

export function formatPricingSkuAmount(sku: PricingSku): string {
  const { displayAmountUsd: amount, billingInterval: interval } = sku
  if (interval === 'once') return `$${amount} · one-time`
  if (interval === 'year') return `$${amount} · per year`
  return `$${amount} · per month`
}

export function skuByKey(key: PricingSkuKey): PricingSku | undefined {
  return PRICING_SKUS.find((s) => s.skuKey === key)
}

export function skusForSection(sectionId: PricingSectionId): readonly PricingSku[] {
  const section = PRICING_SECTIONS.find((s) => s.id === sectionId)
  if (!section) return []
  return section.skuKeys.map((k) => skuByKey(k)).filter(Boolean) as PricingSku[]
}
