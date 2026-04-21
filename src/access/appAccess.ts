/**
 * Access tiers for IA / navigation. **Effective tier** comes from `public.my_effective_access_tier`
 * (see `AccessTierProvider`) when Supabase is configured; `resolveAccessTier(email)` remains a
 * dev/bootstrap fallback via env allowlists (`VITE_*_EMAILS`) when the RPC is unavailable.
 *
 * This is not an authorization boundary: always enforce permissions on the server.
 */
export type AccessTier =
  | 'member'
  | 'pro'
  | 'workspace_admin'
  | 'platform_admin'
  | 'super_admin'

/** Production bootstrap: only this account has super-admin UI / operator surfaces. */
export const CANONICAL_SUPER_ADMIN_EMAIL = 'neuralbuildlab.ai@gmail.com'

/** Platform operator account — admin workflows, not super-user controls. */
export const CANONICAL_PLATFORM_ADMIN_EMAIL = 'neuralbuild.ai@gmail.com'

function parseEmailList(raw: string | undefined): Set<string> {
  if (!raw?.trim()) return new Set()
  return new Set(
    raw
      .split(/[,\s]+/g)
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean),
  )
}

function tierRank(t: AccessTier): number {
  switch (t) {
    case 'member':
      return 0
    case 'pro':
      return 1
    case 'workspace_admin':
      return 2
    case 'platform_admin':
      return 3
    case 'super_admin':
      return 4
    default:
      return 0
  }
}

export function resolveAccessTier(userEmail: string | null | undefined): AccessTier {
  const email = userEmail?.trim().toLowerCase() ?? ''
  if (!email) return 'member'

  if (email === CANONICAL_SUPER_ADMIN_EMAIL.trim().toLowerCase()) return 'super_admin'
  if (email === CANONICAL_PLATFORM_ADMIN_EMAIL.trim().toLowerCase()) return 'platform_admin'

  const superAdmins = parseEmailList(import.meta.env.VITE_SUPER_ADMIN_EMAILS as string | undefined)
  const platformAdmins = parseEmailList(
    import.meta.env.VITE_PLATFORM_ADMIN_EMAILS as string | undefined,
  )
  const workspaceAdmins = parseEmailList(
    import.meta.env.VITE_WORKSPACE_ADMIN_EMAILS as string | undefined,
  )
  const proUsers = parseEmailList(import.meta.env.VITE_PRO_USER_EMAILS as string | undefined)

  if (superAdmins.has(email)) return 'super_admin'
  if (platformAdmins.has(email)) return 'platform_admin'
  if (workspaceAdmins.has(email)) return 'workspace_admin'
  if (proUsers.has(email)) return 'pro'
  return 'member'
}

/**
 * After `my_effective_access_tier` (or RPC failure), enforce canonical operator accounts so
 * in-app tier always matches product policy for the known super-admin and platform-admin emails.
 */
export function effectiveAccessTierAfterRpc(userEmail: string | null | undefined, rpcTier: AccessTier | null): AccessTier {
  const email = userEmail?.trim().toLowerCase() ?? ''
  if (email === CANONICAL_SUPER_ADMIN_EMAIL.toLowerCase()) return 'super_admin'
  if (email === CANONICAL_PLATFORM_ADMIN_EMAIL.toLowerCase()) return 'platform_admin'
  return rpcTier ?? resolveAccessTier(userEmail)
}

export function isAtLeastTier(user: AccessTier, min: AccessTier): boolean {
  return tierRank(user) >= tierRank(min)
}

/** Advanced studio tools (Learning lab / simulation) — not shown to every member by default. */
export function canAccessProLab(tier: AccessTier): boolean {
  if (import.meta.env.VITE_FORCE_PRO_TOOLS === 'true') return true
  if (import.meta.env.DEV && import.meta.env.VITE_DEV_SHOW_PRO_TOOLS === 'true') return true
  return isAtLeastTier(tier, 'pro')
}

/** Internal ops / runtime status / UAT diagnostics surface. */
export function canAccessPlatformSurface(tier: AccessTier): boolean {
  if (import.meta.env.VITE_FORCE_PLATFORM_TOOLS === 'true') return true
  if (import.meta.env.DEV && import.meta.env.VITE_DEV_SHOW_PLATFORM_TOOLS === 'true') return true
  return isAtLeastTier(tier, 'platform_admin')
}

/** Tenant identifiers are never shown in standard product UI — reserved for internal tools only. */
export function canSeeTenantMetadata(_tier: AccessTier): boolean {
  return false
}

/** Workspace settings beyond brand basics (e.g. tenant ids). */
export function canSeeWorkspaceAdminSettings(tier: AccessTier): boolean {
  return isAtLeastTier(tier, 'workspace_admin')
}

/** Short label for dashboard / settings (not an authorization boundary). */
export function humanAccessTierLabel(tier: AccessTier): string {
  switch (tier) {
    case 'member':
      return 'Learner'
    case 'pro':
      return 'Pro'
    case 'workspace_admin':
      return 'Workspace admin'
    case 'platform_admin':
      return 'Platform admin'
    case 'super_admin':
      return 'Super admin'
    default:
      return 'Member'
  }
}
