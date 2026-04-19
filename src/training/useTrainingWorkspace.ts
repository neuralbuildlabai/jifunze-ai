import { useMemo } from 'react'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { User } from '@supabase/supabase-js'
import { isSupabaseConfigured } from '../config/supabaseEnv'
import { isDemoPersistenceTenantId, isWorkspaceTenantId } from '../persistence/tenantPersistenceMode'

export type TrainingWorkspaceMode =
  | {
      kind: 'live'
      supabase: SupabaseClient
      workspaceId: string
      userId: string
    }
  | {
      kind: 'demo'
      workspaceId: string
      userId: string
    }
  | {
      kind: 'blocked'
      reason: 'workspace_unavailable'
    }

/**
 * Resolves whether training data is read/written via Supabase (workspace UUID) or the demo store.
 */
export function useTrainingWorkspace(
  user: User | null,
  tenantId: string,
  supabase: SupabaseClient | null,
): TrainingWorkspaceMode {
  return useMemo(
    () => resolveTrainingWorkspace(user, tenantId, supabase),
    [user, tenantId, supabase],
  )
}

export function resolveTrainingWorkspace(
  user: User | null,
  tenantId: string,
  supabase: SupabaseClient | null,
): TrainingWorkspaceMode {
  const userId = user?.id ?? 'demo-guest'

  if (!isSupabaseConfigured() || isDemoPersistenceTenantId(tenantId)) {
    return { kind: 'demo', workspaceId: tenantId, userId }
  }

  if (!isWorkspaceTenantId(tenantId) || !user?.id || !supabase) {
    return { kind: 'blocked', reason: 'workspace_unavailable' }
  }

  return { kind: 'live', workspaceId: tenantId, userId, supabase }
}
