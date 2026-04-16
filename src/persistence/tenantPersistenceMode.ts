/**
 * Workspace vs demo persistence boundaries.
 *
 * **Real product path:** `tenantId` is a workspace UUID from `profiles.default_tenant_id`, the user
 * is authenticated, and the Supabase browser client is used. All app tables are scoped by
 * `tenant_id` with RLS (`user_tenant_ids()` membership) — see `supabase/migrations/`.
 *
 * **Demo / local path:** non-UUID tenant ids (including `local-dev`) use the in-process or
 * browser-backed {@link import('./registry').getPersistence} layer so the UI works without auth.
 */

/** Synthetic tenant id for offline / no-Supabase builds (not a Postgres tenant). */
export const LOCAL_DEV_TENANT_ID =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_LOCAL_DEV_TENANT_ID?.trim()) ||
  'local-dev'

/** Postgres workspace id shape — when matched with a Supabase client, the durable layer is used. */
export function isWorkspaceTenantId(tenantId: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(tenantId)
}

/** Browser or ephemeral memory persistence (no shared Supabase workspace row for this id). */
export function isDemoPersistenceTenantId(tenantId: string): boolean {
  return !isWorkspaceTenantId(tenantId)
}

/**
 * Synthetic performance seed for empty learning UIs. Disabled for real workspaces unless
 * `VITE_SEED_DEMO_LEARNING_IN_WORKSPACE=true` (e.g. staging), so production tenants are not polluted.
 */
export function shouldAutoSeedDemoLearningRows(tenantId: string): boolean {
  if (!isWorkspaceTenantId(tenantId)) return true
  return import.meta.env.VITE_SEED_DEMO_LEARNING_IN_WORKSPACE === 'true'
}
