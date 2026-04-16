import type { SupabaseClient } from '@supabase/supabase-js'
import { demoBrands } from '../../config/demoBrands'
import { isWorkspaceTenantId } from '../../persistence/tenantPersistenceMode'

const MAX_NAME_LEN = 120

type PostgrestLikeError = {
  message: string
  code?: string
  details?: string
  hint?: string
}

function formatSupabaseInsertError(error: PostgrestLikeError): string {
  const parts: string[] = []
  if (error.message) parts.push(error.message)
  if (error.details) parts.push(`Details: ${error.details}`)
  if (error.hint) parts.push(`Hint: ${error.hint}`)
  if (error.code) parts.push(`Code: ${error.code}`)
  return parts.join(' · ')
}

/**
 * Validates display name for the first-run “Create brand” flow.
 * @returns error message or null if valid.
 */
export function validateFirstBrandName(name: string): string | null {
  const t = name.trim()
  if (!t) return 'Brand name is required.'
  if (t.length > MAX_NAME_LEN) return `Brand name must be at most ${MAX_NAME_LEN} characters.`
  return null
}

export type InsertFirstBrandInput = {
  tenantId: string
  name: string
  /** `auth.users` id for `public.brands.created_by`. */
  createdByUserId: string
}

/**
 * Inserts a `public.brands` row (`id`, `tenant_id`, `name`, `created_by`) for the active workspace.
 */
export async function insertFirstBrandProfile(
  supabase: SupabaseClient,
  input: InsertFirstBrandInput,
): Promise<{ ok: true; brandId: string } | { ok: false; message: string }> {
  const validation = validateFirstBrandName(input.name)
  if (validation) {
    console.log('[JifunzeAI workspace]', { create_brand_failed: { reason: 'validation', message: validation } })
    return { ok: false, message: validation }
  }

  const tid = input.tenantId.trim()
  if (!isWorkspaceTenantId(tid)) {
    const message = 'Workspace tenant is not valid. Sign out and sign in again.'
    console.log('[JifunzeAI workspace]', { create_brand_failed: { reason: 'invalid_tenant', tenantId: tid } })
    return { ok: false, message }
  }
  const uid = input.createdByUserId.trim()
  if (!uid) {
    const message = 'You must be signed in to create a brand.'
    console.log('[JifunzeAI workspace]', { create_brand_failed: { reason: 'missing_user' } })
    return { ok: false, message }
  }
  if (!isWorkspaceTenantId(uid)) {
    const message = 'Signed-in user id is not a valid UUID.'
    console.log('[JifunzeAI workspace]', { create_brand_failed: { reason: 'invalid_created_by', userId: uid } })
    return { ok: false, message }
  }

  if (!demoBrands[0]) {
    const message = 'Demo brand template is missing.'
    console.log('[JifunzeAI workspace]', { create_brand_failed: { reason: 'demo_template_missing' } })
    return { ok: false, message }
  }

  /** Postgres `brands.id` is uuid in hosted Supabase; must not use prefixed demo-style strings. */
  const id = crypto.randomUUID()
  const name = input.name.trim()

  console.log('[JifunzeAI workspace]', {
    create_brand_started: { tenantId: tid, brandId: id },
  })

  try {
    const { error } = await supabase
      .from('brands')
      .insert({
        id,
        tenant_id: tid,
        name,
        created_by: uid,
      })
      .select('id')
      .maybeSingle()

    if (error) {
      const message = formatSupabaseInsertError(error as PostgrestLikeError)
      console.log('[JifunzeAI workspace]', {
        create_brand_failed: {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint,
        },
      })
      return {
        ok: false,
        message: message || 'Could not create brand. Check permissions and try again.',
      }
    }
  } catch (e) {
    const raw = e instanceof Error ? e.message : String(e)
    console.log('[JifunzeAI workspace]', {
      create_brand_failed: { reason: 'insert_threw', message: raw },
    })
    return {
      ok: false,
      message: raw || 'Could not create brand. Check your network and try again.',
    }
  }

  console.log('[JifunzeAI workspace]', { create_brand_success: { brandId: id, tenantId: tid } })
  return { ok: true, brandId: id }
}
