/**
 * Upload a rendered MP4 to Supabase Storage and return a public URL that the
 * Instagram API can fetch (video_url must be publicly reachable).
 * Bucket: `reels` (public). Created by the orchestrator migration.
 */
import { readFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

export async function uploadReel(localPath: string, key: string): Promise<string> {
  const url = process.env.SUPABASE_URL!
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY!
  const admin = createClient(url, service, { auth: { persistSession: false } })
  const bytes = readFileSync(localPath)
  const path = `${key}.mp4`
  const { error } = await admin.storage.from('reels').upload(path, bytes, {
    contentType: 'video/mp4', upsert: true,
  })
  if (error) throw new Error(`storage upload failed: ${error.message}`)
  const { data } = admin.storage.from('reels').getPublicUrl(path)
  return data.publicUrl
}
