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

/** Tenant ids, migration hints, RPC names — workspace or platform operators. */
export function canSeeTenantMetadata(tier: AccessTier): boolean {
  return isAtLeastTier(tier, 'workspace_admin')
}

/** Workspace settings beyond brand basics (e.g. tenant ids). */
export function canSeeWorkspaceAdminSettings(tier: AccessTier): boolean {
  return isAtLeastTier(tier, 'workspace_admin')
}

/** Short label for dashboard / settings (not an authorization boundary). */
export function humanAccessTierLabel(tier: AccessTier): string {
  switch (tier) {
    case 'member':
      return 'Member'
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
