import { useMemo } from 'react'
import type { SupabaseClient, User } from '@supabase/supabase-js'
import { isSupabaseConfigured } from '../config/supabaseEnv'

/**
 * Resolves whether training data is read/written via Supabase (signed-in learner) or the demo
 * store (unauthenticated / Supabase unavailable).
 *
 * Post-Wave-1 (2026-05-18): renamed from tenant-scoped to user-scoped. The training workspace is
 * the user — there is no separate tenant boundary in the single-user model.
 */

const DEMO_WORKSPACE_ID = 'demo-guest'

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

export function useTrainingWorkspace(
  user: User | null,
  supabase: SupabaseClient | null,
): TrainingWorkspaceMode {
  return useMemo(() => resolveTrainingWorkspace(user, supabase), [user, supabase])
}

export function resolveTrainingWorkspace(
  user: User | null,
  supabase: SupabaseClient | null,
): TrainingWorkspaceMode {
  const userId = user?.id ?? DEMO_WORKSPACE_ID

  if (!isSupabaseConfigured() || !user?.id) {
    return { kind: 'demo', workspaceId: userId, userId }
  }

  if (!supabase) {
    return { kind: 'blocked', reason: 'workspace_unavailable' }
  }

  return { kind: 'live', workspaceId: userId, userId, supabase }
}
