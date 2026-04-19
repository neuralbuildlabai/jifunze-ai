/**
 * Canonical pricing / SKU registry for Jifunze learning access (commercial structure).
 * Maps internal SKU keys → Stripe Price env vars (server secrets without VITE_), access scope, and trust-safe copy.
 *
 * Amounts are illustrative USD for UI—actual totals follow Stripe Checkout + tax configuration.
 */

/** Stable module identifiers for entitlement wiring (maps to flagship curriculum families). */
export type LearningModuleKey =
  | 'ai_foundations'
  | 'machine_learning'
  | 'everyday_chatbots'
  | 'cybersecurity'
  | 'cloud_devops'

export type BillingInterval = 'month' | 'year' | 'once'

export type AccessScope =
  | 'single_module'
  | 'module_bundle'
  | 'all_library'
  /** Legacy / facilitator workspace framing */
  | 'workspace_team'

export type ProductKind =
  | 'one_time_module'
  | 'subscription_module'
  | 'subscription_bundle'
  | 'subscription_all_access'
  /** Deprecated marketing tiers kept for Stripe backward compatibility */
  | 'legacy_creator_team'

export type DiscountKind = 'none' | 'student' | 'team_org'

export type PricingSkuKey =
  /** Legacy — maps to existing Stripe Creator monthly price */
  | 'creator'
  /** Legacy — maps to existing Stripe Team monthly price */
  | 'team'
  | 'module_ai_foundations_once'
  | 'module_ml_once'
  | 'module_chatbots_once'
  | 'module_ai_foundations_monthly'
  | 'module_ml_monthly'
  | 'module_chatbots_monthly'
  | 'bundle_two_flagship_monthly'
  | 'bundle_three_core_monthly'
  | 'all_access_monthly'
  | 'all_access_annual'
  | 'all_access_student_monthly'
  | 'all_access_team_workspace_monthly'

export type PricingSku = {
  skuKey: PricingSkuKey
  name: string
  summary: string
  bullets: readonly string[]
  /** Illustrative USD — null when “contact” / bundled display only */
  displayAmountUsd: number | null
  billingInterval: BillingInterval
  productKind: ProductKind
  accessScope: AccessScope
  /** Modules unlocked — empty when all-library or legacy */
  moduleKeys: readonly LearningModuleKey[]
  discountKind: DiscountKind
  /** VITE_ env key name for Stripe Price ID documentation; Edge Functions use secret without VITE_ */
  stripePriceEnvKey?: string
  /** Claim-safe savings note for annual vs monthly reference */
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
    skuKey: 'module_ai_foundations_once',
    name: 'One-time · AI Foundations module',
    summary:
      'Long-duration access to the AI Foundations instructional spine—one flagship path only. Does not unlock unrelated libraries.',
    bullets: [
      'Higher entry price than monthly module access—best when you want a defined block without renewing',
      'Access is to materials/features for this module family only—still not a certification or outcome guarantee',
      'Permanent/long-duration framing follows Stripe product configuration and account policies',
    ],
    displayAmountUsd: 79,
    billingInterval: 'once',
    productKind: 'one_time_module',
    accessScope: 'single_module',
    moduleKeys: ['ai_foundations'],
    discountKind: 'none',
    stripePriceEnvKey: 'VITE_STRIPE_PRICE_MODULE_AI_FOUNDATIONS_ONCE',
  },
  {
    skuKey: 'module_ml_once',
    name: 'One-time · Machine Learning module',
    summary: 'Long-duration access to the ML flagship instructional spine—single path only.',
    bullets: [
      'Priced above the monthly ML module entry point',
      'Useful when you want focused depth without keeping a subscription active',
      'Materials access ≠ employer credentialing or exam passage',
    ],
    displayAmountUsd: 79,
    billingInterval: 'once',
    productKind: 'one_time_module',
    accessScope: 'single_module',
    moduleKeys: ['machine_learning'],
    discountKind: 'none',
    stripePriceEnvKey: 'VITE_STRIPE_PRICE_MODULE_ML_ONCE',
  },
  {
    skuKey: 'module_chatbots_once',
    name: 'One-time · Everyday Chatbots module',
    summary: 'Long-duration access to the Everyday Chatbots flagship instructional spine.',
    bullets: [
      'One flagship learning block—does not imply bot-building certification',
      'Refund posture follows product type (one-time) — see refunds policy',
    ],
    displayAmountUsd: 79,
    billingInterval: 'once',
    productKind: 'one_time_module',
    accessScope: 'single_module',
    moduleKeys: ['everyday_chatbots'],
    discountKind: 'none',
    stripePriceEnvKey: 'VITE_STRIPE_PRICE_MODULE_CHATBOTS_ONCE',
  },
  {
    skuKey: 'module_ai_foundations_monthly',
    name: 'Monthly · AI Foundations only',
    summary: 'Subscription access limited to one flagship module family at a time.',
    bullets: [
      'Lower than one-time purchase for the same module—recurring until canceled',
      'Switching modules should follow billing rules shown at purchase (may require cancel/repurchase)',
    ],
    displayAmountUsd: 19,
    billingInterval: 'month',
    productKind: 'subscription_module',
    accessScope: 'single_module',
    moduleKeys: ['ai_foundations'],
    discountKind: 'none',
    stripePriceEnvKey: 'VITE_STRIPE_PRICE_MODULE_AI_FOUNDATIONS_MONTHLY',
  },
  {
    skuKey: 'module_ml_monthly',
    name: 'Monthly · Machine Learning only',
    summary: 'Single-module subscription for the ML flagship spine.',
    bullets: ['Scoped access—does not unlock unrelated flagship paths', 'Cancel anytime via billing portal when live'],
    displayAmountUsd: 19,
    billingInterval: 'month',
    productKind: 'subscription_module',
    accessScope: 'single_module',
    moduleKeys: ['machine_learning'],
    discountKind: 'none',
    stripePriceEnvKey: 'VITE_STRIPE_PRICE_MODULE_ML_MONTHLY',
  },
  {
    skuKey: 'module_chatbots_monthly',
    name: 'Monthly · Everyday Chatbots only',
    summary: 'Single-module subscription for the chatbots flagship spine.',
    bullets: ['Clear scope boundaries—support/trust surfaces still apply'],
    displayAmountUsd: 19,
    billingInterval: 'month',
    productKind: 'subscription_module',
    accessScope: 'single_module',
    moduleKeys: ['everyday_chatbots'],
    discountKind: 'none',
    stripePriceEnvKey: 'VITE_STRIPE_PRICE_MODULE_CHATBOTS_MONTHLY',
  },
  {
    skuKey: 'bundle_two_flagship_monthly',
    name: 'Monthly · 2-module bundle (Security + Cloud)',
    summary: 'Bundle subscription for Cybersecurity + Cloud/DevOps flagship paths—cheaper than buying both one-time.',
    bullets: [
      'Bundled scope only—does not imply full-library access',
      'Priced lower than separate one-time purchases for the same scope where advertised',
    ],
    displayAmountUsd: 32,
    billingInterval: 'month',
    productKind: 'subscription_bundle',
    accessScope: 'module_bundle',
    moduleKeys: ['cybersecurity', 'cloud_devops'],
    discountKind: 'none',
    stripePriceEnvKey: 'VITE_STRIPE_PRICE_BUNDLE_TWO_FLAGSHIP_MONTHLY',
  },
  {
    skuKey: 'bundle_three_core_monthly',
    name: 'Monthly · 3-module “core stack” bundle',
    summary: 'AI Foundations + Machine Learning + Everyday Chatbots bundled monthly.',
    bullets: [
      'Designed as a commercially realistic multi-path starter bundle',
      'Still assistive learning materials—review outputs before relying on them publicly or professionally',
    ],
    displayAmountUsd: 39,
    billingInterval: 'month',
    productKind: 'subscription_bundle',
    accessScope: 'module_bundle',
    moduleKeys: ['ai_foundations', 'machine_learning', 'everyday_chatbots'],
    discountKind: 'none',
    stripePriceEnvKey: 'VITE_STRIPE_PRICE_BUNDLE_THREE_CORE_MONTHLY',
  },
  {
    skuKey: 'all_access_monthly',
    name: 'All-access · Monthly',
    summary: 'Broad premium library access across flagship paths for individuals.',
    bullets: [
      'Best general-purpose subscription for exploring multiple modules',
      'Does not guarantee mastery, grades, hiring, or certification',
    ],
    displayAmountUsd: 49,
    billingInterval: 'month',
    productKind: 'subscription_all_access',
    accessScope: 'all_library',
    moduleKeys: [],
    discountKind: 'none',
    stripePriceEnvKey: 'VITE_STRIPE_PRICE_ALL_ACCESS_MONTHLY',
  },
  {
    skuKey: 'all_access_annual',
    name: 'All-access · Annual',
    summary: 'Annual all-library access—typically the best sustained value with transparent savings vs monthly.',
    bullets: [
      'Savings compare billed annual total vs twelve monthly renewals at list price—shown claim-safely in UI',
      'Renewal and cancellation follow Stripe Customer Portal rules once billing is live',
    ],
    displayAmountUsd: 490,
    billingInterval: 'year',
    productKind: 'subscription_all_access',
    accessScope: 'all_library',
    moduleKeys: [],
    discountKind: 'none',
    stripePriceEnvKey: 'VITE_STRIPE_PRICE_ALL_ACCESS_ANNUAL',
    savingsNote: 'Illustrative ~17% vs 12× monthly list — exact totals at checkout.',
  },
  {
    skuKey: 'all_access_student_monthly',
    name: 'All-access · Student (monthly)',
    summary: 'Discounted all-library monthly access for eligible school email domains.',
    bullets: [
      'Eligibility uses official education email domains at signup / checkout validation (first-stage model)',
      'Discount improves access affordability—not academic accreditation or enrollment verification by Jifunze',
    ],
    displayAmountUsd: 29,
    billingInterval: 'month',
    productKind: 'subscription_all_access',
    accessScope: 'all_library',
    moduleKeys: [],
    discountKind: 'student',
    stripePriceEnvKey: 'VITE_STRIPE_PRICE_ALL_ACCESS_STUDENT_MONTHLY',
  },
  {
    skuKey: 'all_access_team_workspace_monthly',
    name: 'All-access · Team / Org workspace (monthly)',
    summary: 'Discounted monthly all-library access anchored to verified work/school domains for organization use.',
    bullets: [
      'Frames facilitator / cohort workflows consistently with workspace architecture—seat automation may arrive later',
      'Domain eligibility is the first-stage gate; larger seat contracts may still route through support',
    ],
    displayAmountUsd: 79,
    billingInterval: 'month',
    productKind: 'subscription_all_access',
    accessScope: 'workspace_team',
    moduleKeys: [],
    discountKind: 'team_org',
    stripePriceEnvKey: 'VITE_STRIPE_PRICE_ALL_ACCESS_TEAM_WORKSPACE_MONTHLY',
  },
  {
    skuKey: 'creator',
    name: 'Legacy · Creator (monthly)',
    summary: 'Historical solo-creator SKU retained for existing Stripe price wiring—prefer all-access/module SKUs going forward.',
    bullets: [
      'Maps to existing Creator Stripe Price env for continuity',
      'Treat as broad “Pro materials” tier unless migrated to scoped SKUs',
    ],
    displayAmountUsd: 28,
    billingInterval: 'month',
    productKind: 'legacy_creator_team',
    accessScope: 'all_library',
    moduleKeys: [],
    discountKind: 'none',
    stripePriceEnvKey: 'VITE_STRIPE_PRICE_CREATOR_USD_MONTHLY',
  },
  {
    skuKey: 'team',
    name: 'Legacy · Team workspace (monthly)',
    summary: 'Historical facilitator SKU retained for Stripe continuity—prefer team discounted all-access SKU for new purchases.',
    bullets: [
      'Maps to existing Team Stripe Price env',
      'Workspace admin surfaces still depend on tenant roles—not payment alone',
    ],
    displayAmountUsd: 99,
    billingInterval: 'month',
    productKind: 'legacy_creator_team',
    accessScope: 'workspace_team',
    moduleKeys: [],
    discountKind: 'none',
    stripePriceEnvKey: 'VITE_STRIPE_PRICE_TEAM_USD_MONTHLY',
  },
] as const

export type PricingSectionId =
  | 'free'
  | 'one_time_modules'
  | 'module_monthly'
  | 'bundles'
  | 'all_access'
  | 'education_team'
  | 'legacy'

export type PricingSection = {
  id: PricingSectionId
  title: string
  description: string
  skuKeys: readonly PricingSkuKey[]
}

export const PRICING_SECTIONS: readonly PricingSection[] = [
  {
    id: 'one_time_modules',
    title: 'A. One-time module access',
    description:
      'Purchase a defined flagship module block. Priced higher than monthly entry points—useful when you want lasting access without a subscription.',
    skuKeys: ['module_ai_foundations_once', 'module_ml_once', 'module_chatbots_once'],
  },
  {
    id: 'module_monthly',
    title: 'B. Single-module monthly',
    description: 'Keep one flagship path active month-to-month. Scoped access—does not unlock the full library.',
    skuKeys: ['module_ai_foundations_monthly', 'module_ml_monthly', 'module_chatbots_monthly'],
  },
  {
    id: 'bundles',
    title: 'C. Module-combination subscriptions',
    description: 'Bundles combine multiple flagship paths at a lower blended rate than buying each module one-time separately.',
    skuKeys: ['bundle_two_flagship_monthly', 'bundle_three_core_monthly'],
  },
  {
    id: 'all_access',
    title: 'D & E. All-access monthly & annual',
    description: 'Broad library access for individuals. Annual pricing should show transparent savings vs monthly list—final totals at checkout.',
    skuKeys: ['all_access_monthly', 'all_access_annual'],
  },
  {
    id: 'education_team',
    title: 'F & G. Student & team discounts',
    description:
      'Discounted pricing with domain-based eligibility scaffolding. Automatic academic verification beyond domain checks may arrive later—UI labels this as “domain eligibility.”',
    skuKeys: ['all_access_student_monthly', 'all_access_team_workspace_monthly'],
  },
  {
    id: 'legacy',
    title: 'Legacy Stripe SKUs (continuity)',
    description: 'Prior Creator/Team prices remain wired for existing customers and migration—prefer new SKUs for new purchases.',
    skuKeys: ['creator', 'team'],
  },
]

export function formatPricingSkuAmount(sku: PricingSku): string {
  const { displayAmountUsd: amount, billingInterval: interval } = sku
  if (amount == null) return '—'
  if (interval === 'once') return `$${amount} · one-time · USD`
  if (interval === 'year') return `$${amount} · /yr · USD`
  return `$${amount} · /mo · USD`
}

export function skuByKey(key: PricingSkuKey): PricingSku | undefined {
  return PRICING_SKUS.find((s) => s.skuKey === key)
}

export function skusForSection(sectionId: PricingSectionId): readonly PricingSku[] {
  const section = PRICING_SECTIONS.find((s) => s.id === sectionId)
  if (!section) return []
  return section.skuKeys.map((k) => skuByKey(k)).filter(Boolean) as PricingSku[]
}
