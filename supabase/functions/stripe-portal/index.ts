/**
 * Stripe Customer Billing Portal — manage payment method, cancel, invoices.
 *
 * Secrets: STRIPE_SECRET_KEY, PUBLIC_SITE_URL (or SITE_URL).
 * Requires existing row in public.stripe_customers for auth.uid().
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

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY')?.trim()
  const siteUrl =
    Deno.env.get('PUBLIC_SITE_URL')?.trim() ||
    Deno.env.get('SITE_URL')?.trim() ||
    Deno.env.get('VITE_SITE_URL')?.trim()

  const supabaseUrl = Deno.env.get('SUPABASE_URL')?.trim()
  const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')?.trim()
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')?.trim()

  if (!stripeSecret || !siteUrl || !supabaseUrl || !supabaseAnonKey || !serviceKey) {
    console.error('[stripe-portal] Missing required env')
    return json({ error: 'Billing is not configured on the server yet.' }, 503)
  }

  const authHeader = req.headers.get('Authorization')
  if (!authHeader?.trim()) return json({ error: 'Unauthorized' }, 401)

  const supabaseUser = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: authHeader } },
  })
  const { data: userData, error: userErr } = await supabaseUser.auth.getUser()
  const user = userData?.user ?? null
  if (userErr || !user?.id) return json({ error: 'Unauthorized' }, 401)

  const supabaseAdmin = createClient(supabaseUrl, serviceKey)

  const { data: cust, error: custErr } = await supabaseAdmin
    .from('stripe_customers')
    .select('stripe_customer_id')
    .eq('user_id', user.id)
    .maybeSingle()

  if (custErr) {
    console.error('[stripe-portal] customer lookup', custErr)
    return json({ error: 'Unable to load billing profile' }, 500)
  }

  const stripeCustomerId = (cust as { stripe_customer_id?: string } | null)?.stripe_customer_id
  if (!stripeCustomerId) {
    return json({ error: 'No Stripe customer on file yet—complete checkout first.' }, 400)
  }

  const stripe = new Stripe(stripeSecret)
  const base = siteUrl.replace(/\/$/, '')
  const returnUrl = `${base}/settings/subscription`

  const session = await stripe.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: returnUrl,
  })

  if (!session.url) return json({ error: 'Portal session missing URL' }, 500)
  return json({ url: session.url })
})
