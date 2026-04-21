/**
 * Stripe Checkout — subscription or one-time payment mapped by internal SKU key.
 *
 * Secrets: STRIPE_SECRET_KEY + one env per SKU price id (see SKU_CONFIG below).
 * Site URL: PUBLIC_SITE_URL | SITE_URL | VITE_SITE_URL
 *
 * Body: { skuKey: string }
 *
 * Discount SKUs enforce domain rules using BILLING_STUDENT_DOMAIN_SUFFIXES / BILLING_TEAM_ORG_DOMAIN_SUFFIXES when set.
 */
import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'npm:@supabase/supabase-js@2'
import Stripe from 'npm:stripe@14.21.0'

const corsHeaders: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

type SkuCfg = {
  mode: 'subscription' | 'payment'
  env: string
  /** Optional fallback env if primary Stripe Price ID is not set (migration continuity). */
  fallbackEnv?: string
  productKind: string
  billingInterval: string
  accessScope: string
  discountTag: 'none' | 'student' | 'team_org'
  modulesCsv?: string
}

/** Three customer-facing SKUs — env names match server secrets (no VITE_ prefix). */
const SKU_CONFIG: Record<string, SkuCfg> = {
  jifunze_monthly: {
    mode: 'subscription',
    env: 'STRIPE_PRICE_ALL_ACCESS_MONTHLY',
    productKind: 'subscription_all_access',
    billingInterval: 'month',
    accessScope: 'all_library',
    discountTag: 'none',
  },
  jifunze_annual: {
    mode: 'subscription',
    env: 'STRIPE_PRICE_ALL_ACCESS_ANNUAL',
    productKind: 'subscription_all_access',
    billingInterval: 'year',
    accessScope: 'all_library',
    discountTag: 'none',
  },
  jifunze_single_course: {
    mode: 'payment',
    env: 'STRIPE_PRICE_SINGLE_COURSE_ONCE',
    fallbackEnv: 'STRIPE_PRICE_MODULE_AI_FOUNDATIONS_ONCE',
    productKind: 'single_course_once',
    billingInterval: 'once',
    accessScope: 'single_course',
    discountTag: 'none',
  },
}

function parseSuffixes(raw: string | undefined): string[] {
  if (!raw?.trim()) return []
  return raw.split(',').map((s) => s.trim().toLowerCase()).filter(Boolean)
}

function domainSuffixEligible(email: string, suffixes: string[]): boolean {
  const at = email.lastIndexOf('@')
  if (at < 0) return false
  const domain = email.slice(at + 1).toLowerCase()
  return suffixes.some((suffix) => {
    const suf = suffix.startsWith('.') ? suffix : `.${suffix}`
    return domain.endsWith(suf)
  })
}

type Body = { skuKey?: string }

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY')?.trim()
  const siteUrl =
    Deno.env.get('PUBLIC_SITE_URL')?.trim() ||
    Deno.env.get('SITE_URL')?.trim() ||
    Deno.env.get('VITE_SITE_URL')?.trim()

  if (!stripeSecret || !siteUrl) {
    console.error('[stripe-checkout] Missing STRIPE_SECRET_KEY or PUBLIC_SITE_URL / SITE_URL')
    return json({ error: 'Billing is not configured on the server yet.' }, 503)
  }

  const authHeader = req.headers.get('Authorization')
  if (!authHeader?.trim()) return json({ error: 'Unauthorized' }, 401)

  const supabaseUrl = Deno.env.get('SUPABASE_URL')?.trim()
  const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')?.trim()
  if (!supabaseUrl || !supabaseAnonKey) return json({ error: 'Server misconfiguration' }, 500)

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: authHeader } },
  })

  const { data: userData, error: userErr } = await supabase.auth.getUser()
  const user = userData?.user ?? null
  if (userErr || !user?.id || !user.email) return json({ error: 'Unauthorized' }, 401)

  let body: Body = {}
  try {
    body = (await req.json()) as Body
  } catch {
    return json({ error: 'Invalid JSON body' }, 400)
  }

  const skuKey = body.skuKey ?? (body as { planKey?: string }).planKey
  if (!skuKey) return json({ error: 'skuKey is required (legacy planKey alias supported).' }, 400)

  const cfg = SKU_CONFIG[skuKey]
  if (!cfg) return json({ error: `Unknown skuKey: ${skuKey}` }, 400)

  const studentSuffixes = parseSuffixes(Deno.env.get('BILLING_STUDENT_DOMAIN_SUFFIXES'))
  const teamSuffixes = parseSuffixes(Deno.env.get('BILLING_TEAM_ORG_DOMAIN_SUFFIXES'))

  if (cfg.discountTag === 'student') {
    if (!domainSuffixEligible(user.email, studentSuffixes)) {
      return json({ error: 'Student pricing requires an eligible school email domain for this workspace.' }, 403)
    }
  }
  if (cfg.discountTag === 'team_org') {
    if (!domainSuffixEligible(user.email, teamSuffixes)) {
      return json({
        error:
          'Team/org workspace pricing requires an eligible organization email domain (configure BILLING_TEAM_ORG_DOMAIN_SUFFIXES).',
      }, 403)
    }
  }

  const priceId =
    Deno.env.get(cfg.env)?.trim() ?? (cfg.fallbackEnv ? Deno.env.get(cfg.fallbackEnv)?.trim() : undefined)
  if (!priceId) {
    console.error('[stripe-checkout] Missing env price for SKU', skuKey, cfg.env, cfg.fallbackEnv)
    return json({ error: 'Stripe price is not configured for this plan yet.' }, 503)
  }

  const stripe = new Stripe(stripeSecret)
  const base = siteUrl.replace(/\/$/, '')
  const successUrl = `${base}/settings/subscription?checkout=success`
  const cancelUrl = `${base}/settings/subscription?checkout=cancel`

  const metaBase = {
    supabase_user_id: user.id,
    sku_key: skuKey,
    plan_key: skuKey,
    product_kind: cfg.productKind,
    billing_interval: cfg.billingInterval,
    access_scope: cfg.accessScope,
    discount_tag: cfg.discountTag,
    module_keys: cfg.modulesCsv ?? '',
  }

  let session: Stripe.Checkout.Session
  if (cfg.mode === 'subscription') {
    session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email: user.email,
      client_reference_id: user.id,
      metadata: metaBase,
      subscription_data: {
        metadata: metaBase,
      },
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
      allow_promotion_codes: true,
    })
  } else {
    session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: user.email,
      client_reference_id: user.id,
      metadata: metaBase,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
    })
  }

  if (!session.url) return json({ error: 'Checkout session missing redirect URL' }, 500)

  return json({ url: session.url, checkoutSessionId: session.id })
})
