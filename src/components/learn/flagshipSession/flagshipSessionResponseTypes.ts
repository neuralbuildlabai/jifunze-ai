import type { SupabaseClient } from '@supabase/supabase-js'

export type FlagshipSessionResponseContext = {
  courseSlug: string
  moduleId: string
  sessionId: string
  userId: string | null
  supabase: SupabaseClient | null
  usesWorkspacePersistence: boolean
  tenantId: string | null
  canEdit: boolean
  moduleFullyComplete: boolean
}
