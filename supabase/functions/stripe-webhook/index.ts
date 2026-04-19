/**
 * Stripe webhook — Stripe customers, subscription entitlement snapshots, one-time module purchases.
 *
 * Secrets: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_URL
 */
import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'npm:@supabase/supabase-js@2'
import Stripe from 'npm:stripe@14.21.0'

const corsHeaders: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'stripe-signature, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

function legacyPlanFromPrice(
  priceId: string | null | undefined,
  creatorPrice: string | undefined,
  teamPrice: string | undefined,
): string | null {
  if (!priceId) return null
  if (creatorPrice && priceId === creatorPrice) return 'creator'
  if (teamPrice && priceId === teamPrice) return 'team'
  return null
}

function parseMeta(meta: Stripe.Metadata | null | undefined): {
  uid: string | null
  skuKey: string | null
  productKind: string | null
  billingInterval: string | null
  accessScope: string | null
  discountTag: string | null
  moduleCsv: string | null
} {
  const uid = meta?.supabase_user_id ?? null
  const skuKey = meta?.sku_key ?? meta?.plan_key ?? null
  const productKind = meta?.product_kind ?? null
  const billingInterval = meta?.billing_interval ?? null
  const accessScope = meta?.access_scope ?? null
  const discountTag = meta?.discount_tag ?? null
  const moduleCsv = meta?.module_keys ?? null
  return { uid, skuKey, productKind, billingInterval, accessScope, discountTag, moduleCsv }
}

function moduleArrayFromCsv(csv: string | null): string[] | null {
  if (!csv?.trim()) return null
  const parts = csv
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  return parts.length ? parts : null
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY')?.trim()
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')?.trim()
  const supabaseUrl = Deno.env.get('SUPABASE_URL')?.trim()
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')?.trim()
  const priceCreator = Deno.env.get('STRIPE_PRICE_CREATOR_USD_MONTHLY')?.trim()
  const priceTeam = Deno.env.get('STRIPE_PRICE_TEAM_USD_MONTHLY')?.trim()

  if (!stripeSecret || !webhookSecret || !supabaseUrl || !serviceKey) {
    console.error('[stripe-webhook] Missing secrets / Supabase service env')
    return json({ error: 'Webhook not configured' }, 500)
  }

  const sig = req.headers.get('stripe-signature')
  if (!sig) return json({ error: 'Missing stripe-signature' }, 400)

  const rawBody = await req.text()
  const stripe = new Stripe(stripeSecret)

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret)
  } catch (e) {
    console.error('[stripe-webhook] Signature verification failed', e)
    return json({ error: 'Invalid signature' }, 400)
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceKey)

  const upsertCustomer = async (userId: string, customerId: string | null | undefined) => {
    const cid = customerId?.trim()
    if (!cid) return
    const { error } = await supabaseAdmin.from('stripe_customers').upsert(
      { user_id: userId, stripe_customer_id: cid },
      { onConflict: 'user_id' },
    )
    if (error) console.error('[stripe-webhook] upsert stripe_customers', error)
  }

  const upsertSubscriptionEntitlement = async (params: {
    userId: string
    customerId: string | null
    subscription: Stripe.Subscription
    skuKeyResolved: string
    metaProductKind?: string | null
    metaBillingInterval?: string | null
    metaAccessScope?: string | null
    metaDiscount?: string | null
    modules?: string[] | null
  }) => {
    const sub = params.subscription
    const priceId = sub.items.data[0]?.price?.id ?? null

    const row = {
      user_id: params.userId,
      stripe_customer_id: params.customerId,
      stripe_subscription_id: sub.id,
      status: sub.status,
      plan_key: params.skuKeyResolved,
      sku_key: params.skuKeyResolved,
      price_id: priceId,
      product_kind: params.metaProductKind ?? null,
      billing_interval: params.metaBillingInterval ?? null,
      access_scope: params.metaAccessScope ?? null,
      discount_tag: params.metaDiscount ?? null,
      module_keys: params.modules ?? null,
      current_period_end: sub.current_period_end
        ? new Date(sub.current_period_end * 1000).toISOString()
        : null,
      cancel_at_period_end: sub.cancel_at_period_end ?? false,
      updated_at: new Date().toISOString(),
    }

    const { error } = await supabaseAdmin.from('stripe_subscription_entitlements').upsert(row, {
      onConflict: 'user_id',
    })
    if (error) console.error('[stripe-webhook] upsert entitlements', error)
  }

  const clearEntitlement = async (userId: string) => {
    const { error } = await supabaseAdmin.from('stripe_subscription_entitlements').delete().eq('user_id', userId)
    if (error) console.error('[stripe-webhook] delete entitlement', error)
  }

  const upsertModulePurchases = async (params: {
    userId: string
    skuKey: string
    csv: string | null
    paymentIntentId?: string | null
  }) => {
    const modules = moduleArrayFromCsv(params.csv)
    if (!modules?.length) return
    const rows = modules.map((module_key) => ({
      user_id: params.userId,
      module_key,
      sku_key: params.skuKey,
      stripe_payment_intent_id: params.paymentIntentId ?? null,
    }))
    const { error } = await supabaseAdmin.from('stripe_module_purchases').upsert(rows, {
      onConflict: 'user_id,module_key',
    })
    if (error) console.error('[stripe-webhook] upsert module purchases', error)
  }

  const handleSubscription = async (sub: Stripe.Subscription) => {
    const meta = parseMeta(sub.metadata as Stripe.Metadata)
    const legacyGuess = legacyPlanFromPrice(sub.items.data[0]?.price?.id ?? null, priceCreator, priceTeam)
    const skuKeyResolved = meta.skuKey ?? legacyGuess
    const uid = meta.uid?.trim()
    if (!uid || !skuKeyResolved) {
      console.warn('[stripe-webhook] subscription missing uid or sku', {
        id: sub.id,
        uid,
        skuKeyResolved,
      })
      return
    }

    const customerId = typeof sub.customer === 'string' ? sub.customer : sub.customer?.id ?? null

    await upsertCustomer(uid, customerId)

    if (sub.status === 'canceled' || sub.status === 'unpaid' || sub.status === 'incomplete_expired') {
      await clearEntitlement(uid)
      return
    }

    await upsertSubscriptionEntitlement({
      userId: uid,
      customerId,
      subscription: sub,
      skuKeyResolved,
      metaProductKind: meta.productKind,
      metaBillingInterval: meta.billingInterval,
      metaAccessScope: meta.accessScope,
      metaDiscount: meta.discountTag,
      modules: moduleArrayFromCsv(meta.moduleCsv),
    })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const meta = parseMeta(session.metadata as Stripe.Metadata)
        const userId = meta.uid ?? session.client_reference_id ?? ''

        const customerId = typeof session.customer === 'string' ? session.customer : session.customer?.id

        if (userId && customerId) await upsertCustomer(userId, customerId)

        const subscriptionId =
          typeof session.subscription === 'string' ? session.subscription : session.subscription?.id

        if (session.mode === 'subscription' && userId && subscriptionId) {
          const sub = await stripe.subscriptions.retrieve(subscriptionId)
          await handleSubscription(sub)
        }

        if (session.mode === 'payment' && userId) {
          const skuKeyResolved = meta.skuKey ?? 'unknown_module_purchase'
          const pi =
            typeof session.payment_intent === 'string'
              ? session.payment_intent
              : session.payment_intent &&
                  typeof session.payment_intent === 'object' &&
                  'id' in session.payment_intent
                ? (session.payment_intent as { id: string }).id
                : null
          await upsertModulePurchases({
            userId: userId,
            skuKey: skuKeyResolved,
            csv: meta.moduleCsv,
            paymentIntentId: pi,
          })
        }

        break
      }
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        await handleSubscription(sub)
        break
      }
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const subRef = invoice.subscription
        const subId =
          typeof subRef === 'string'
            ? subRef
            : subRef && typeof subRef === 'object' && 'id' in subRef
              ? (subRef as { id: string }).id
              : null
        if (!subId) break
        const sub = await stripe.subscriptions.retrieve(subId)
        await handleSubscription(sub)
        break
      }
      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge
        const customerId = typeof charge.customer === 'string' ? charge.customer : charge.customer?.id
        if (!customerId) break
        const { data: rows } = await supabaseAdmin
          .from('stripe_customers')
          .select('user_id')
          .eq('stripe_customer_id', customerId)
          .maybeSingle()
        const uid = (rows as { user_id?: string } | null)?.user_id
        if (uid) await clearEntitlement(uid)
        break
      }
      default:
        break
    }
  } catch (e) {
    console.error('[stripe-webhook] handler error', e)
    return json({ received: false, error: 'handler_failed' }, 500)
  }

  return json({ received: true })
})
