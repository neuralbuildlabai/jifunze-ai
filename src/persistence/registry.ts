import type { SupabaseClient } from '@supabase/supabase-js'
import { demoBrands } from '../config/demoBrands'
import { isSupabaseConfigured } from '../config/supabaseEnv'
import { getSupabaseBrowserClient } from '../lib/supabaseClient'
import type { PersistenceLayer } from './contracts'
import { clearAllBrowserPersistenceKeys, createBrowserBackedPersistenceLayer } from './browserTenantPersistence'
import { createInMemoryPersistenceLayer } from './inMemoryPersistence'
import { createSupabasePersistenceLayer } from './supabasePersistence'
import { isWorkspaceTenantId, LOCAL_DEV_TENANT_ID } from './tenantPersistenceMode'

export { LOCAL_DEV_TENANT_ID, isWorkspaceTenantId, isDemoPersistenceTenantId } from './tenantPersistenceMode'

const memoryByTenant = new Map<string, PersistenceLayer>()
const supabaseByTenant = new Map<string, PersistenceLayer>()

function resolveSupabaseClient(explicit?: SupabaseClient): SupabaseClient | undefined {
  if (!isSupabaseConfigured()) return undefined
  return explicit ?? getSupabaseBrowserClient()
}

/** Which physical backend {@link getPersistence} uses for this tenant + client hint. */
export function persistenceBackendForTenant(
  tenantId: string,
  supabase?: SupabaseClient,
): 'supabase' | 'demo' {
  const client = resolveSupabaseClient(supabase)
  if (isWorkspaceTenantId(tenantId)) {
    if (!client) {
      throw new Error(
        'Workspace UUID requires Supabase (configure VITE_SUPABASE_* and pass the client). Demo persistence is not allowed for workspace tenants.',
      )
    }
    return 'supabase'
  }
  return 'demo'
}

/**
 * Tenant-isolated persistence.
 *
 * When `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` are set and `tenantId` is a workspace UUID,
 * reads/writes go to Supabase (RLS-enforced). The browser client is used automatically if you omit
 * `supabase`.
 *
 * **Demo tenants (`demo` backend):** non-UUID ids (including `local-dev`) use an in-process or
 * **browser-backed JSON** layer (localStorage) so previews survive reloads without a workspace.
 * Set `VITE_BROWSER_PERSISTENCE=false` to force ephemeral in-memory storage (e.g. CI). Transient
 * UI toggles (simulation mode) use separate keys.
 *
 * **Workspace UUID tenants** always use Postgres (`createSupabasePersistenceLayer`). If Supabase
 * env is not configured, `getPersistence` throws — real users must never hit browser/demo storage.
 *
 * **Demo tenants** (`isDemoPersistenceTenantId`): in-memory or browser JSON; pass `supabase` only
 * when you intentionally use the anon client for non-workspace flows.
 */
function useBrowserBackedMemory(): boolean {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') return false
  if (import.meta.env.MODE === 'test') return false
  return import.meta.env.VITE_BROWSER_PERSISTENCE !== 'false'
}

export function getPersistence(tenantId: string, supabase?: SupabaseClient): PersistenceLayer {
  const client = resolveSupabaseClient(supabase)
  if (isWorkspaceTenantId(tenantId)) {
    if (!client) {
      throw new Error(
        'getPersistence: workspace tenant UUID requires Supabase. Configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY, sign in, and pass the client from useAuth(). Demo/browser persistence cannot be used for workspace IDs.',
      )
    }
    let layer = supabaseByTenant.get(tenantId)
    if (!layer) {
      layer = createSupabasePersistenceLayer(client, tenantId)
      supabaseByTenant.set(tenantId, layer)
    }
    return layer
  }
  let layer = memoryByTenant.get(tenantId)
  if (!layer) {
    const seed = tenantId === LOCAL_DEV_TENANT_ID ? demoBrands : []
    layer = useBrowserBackedMemory()
      ? createBrowserBackedPersistenceLayer(tenantId, seed)
      : createInMemoryPersistenceLayer(seed)
    memoryByTenant.set(tenantId, layer)
  }
  return layer
}

/** Clears cached Supabase-backed layers (e.g. after sign-out / tenant switch). */
export function clearSupabasePersistenceCache(): void {
  supabaseByTenant.clear()
}

/**
 * Full client-side persistence reset after logout: Supabase layer cache, in-memory demo layers,
 * and browser `localStorage` keys for `jifunze.persistence.v1:*`.
 */
export function clearAllPersistenceAfterSignOut(): void {
  supabaseByTenant.clear()
  memoryByTenant.clear()
  clearAllBrowserPersistenceKeys()
}

export function setPersistence(
  next: PersistenceLayer,
  tenantId: string,
  mode: 'demo' | 'supabase',
): void {
  if (mode === 'demo') memoryByTenant.set(tenantId, next)
  else supabaseByTenant.set(tenantId, next)
}

export function resetPersistenceForTests(): void {
  memoryByTenant.clear()
  supabaseByTenant.clear()
  clearAllBrowserPersistenceKeys()
}
