import { Link } from 'react-router-dom'
import type { BillingEligibilityTags } from '../../lib/billingEligibility'
import { LEGAL_ROUTES } from '../../shared/legalRoutes'
import {
  formatPricingSkuAmount,
  PRICING_SECTIONS,
  skuByKey,
  type PricingSkuKey,
} from '../../subscription/pricingSkuRegistry'

export type PricingSkuCardsMode = 'public' | 'workspace'

export type PricingSkuCardsProps = {
  mode: PricingSkuCardsMode
  billingEnabled: boolean
  eligibility?: BillingEligibilityTags
  workspaceCheckoutHref?: string
  onCheckoutSku?: (skuKey: PricingSkuKey) => void
  checkoutBusySku?: PricingSkuKey | null
  /** When false, Stripe env hints are omitted (cleaner public page). */
  showStripeEnvHints?: boolean
}

function skuDisabled(args: { billingEnabled: boolean; checkoutBusy: boolean }) {
  const { billingEnabled, checkoutBusy } = args
  return !billingEnabled || checkoutBusy
}

function skuCtaLabel(args: {
  mode: PricingSkuCardsMode
  billingEnabled: boolean
  checkoutBusy: boolean
  productKind: string
  name: string
}) {
  const { mode, billingEnabled, checkoutBusy, productKind, name } = args
  if (mode === 'public') {
    return billingEnabled ? 'Continue in workspace billing' : 'Sign in to subscribe'
  }
  if (!billingEnabled) return 'Checkout unavailable'
  if (checkoutBusy) return 'Starting checkout…'
  return productKind === 'single_course_once' ? `Purchase · ${name}` : `Subscribe · ${name}`
}

export function PricingSkuCards(props: PricingSkuCardsProps) {
  const {
    mode,
    billingEnabled,
    workspaceCheckoutHref = LEGAL_ROUTES.workspaceSubscription,
    onCheckoutSku,
    checkoutBusySku,
  } = props

  return (
    <div className="space-y-10">
      {PRICING_SECTIONS.map((section) => (
        <section key={section.id} data-testid={`pricing-section-${section.id}`}>
          <div className="space-y-2 border-b border-white/[0.06] pb-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">{section.title}</p>
            <p className="text-sm text-zinc-400">{section.description}</p>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {section.skuKeys.map((skuKey) => {
              const item = skuByKey(skuKey)
              if (!item) return null

              const busy = checkoutBusySku === item.skuKey
              const disabled = skuDisabled({
                billingEnabled,
                checkoutBusy: checkoutBusySku != null,
              })

              return (
                <div
                  key={skuKey}
                  data-testid={`pricing-sku-${skuKey}`}
                  className="flex flex-col rounded-xl border border-white/[0.08] bg-zinc-950/40 p-4 ring-1 ring-white/[0.04]"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-violet-300/90">{item.name}</p>
                  <p className="mt-2 text-xl font-semibold text-white">{formatPricingSkuAmount(item)}</p>
                  {item.savingsNote ? <p className="mt-2 text-[11px] text-emerald-200/85">{item.savingsNote}</p> : null}
                  <p className="mt-2 text-[12px] text-zinc-500">{item.summary}</p>
                  <ul className="mt-3 flex-1 list-disc space-y-1 pl-5 text-[11px] text-zinc-400">
                    {item.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-4">
                    {mode === 'public' ? (
                      <Link
                        to={billingEnabled ? workspaceCheckoutHref : '/?auth=signin#auth'}
                        className="inline-flex w-full items-center justify-center rounded-lg border border-emerald-400/35 bg-emerald-500/[0.12] px-3 py-2 text-xs font-semibold text-emerald-50 transition hover:border-emerald-300/55 hover:bg-emerald-500/[0.18]"
                        data-testid={`public-pricing-cta-${skuKey}`}
                      >
                        {skuCtaLabel({
                          mode,
                          billingEnabled,
                          checkoutBusy: false,
                          productKind: item.productKind,
                          name: item.name,
                        })}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        disabled={disabled}
                        onClick={() => onCheckoutSku?.(item.skuKey)}
                        className="w-full rounded-lg border border-emerald-400/35 bg-emerald-500/[0.12] px-3 py-2 text-xs font-semibold text-emerald-50 transition hover:border-emerald-300/55 hover:bg-emerald-500/[0.18] disabled:cursor-not-allowed disabled:opacity-40"
                        data-testid={`checkout-${item.skuKey}`}
                      >
                        {skuCtaLabel({
                          mode,
                          billingEnabled,
                          checkoutBusy: busy,
                          productKind: item.productKind,
                          name: item.name,
                        })}
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}
