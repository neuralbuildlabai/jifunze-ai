import type { SocialContent } from '../types/content'

export type GenerateContentRequestSource = 'manual_topic' | 'signal' | 'opportunity'

/**
 * JSON body sent to the server-side generator (Supabase Edge `generate-content` or any
 * compatible POST endpoint). LLM keys stay on the server; the browser only sends this payload.
 */
export type GenerateContentRequestBody = {
  topic: string
  context?: string
  source?: GenerateContentRequestSource
  external_signal_id?: string
  content_opportunity_id?: string
}

/**
 * Expected successful JSON body from the server.
 * Matches {@link SocialContent} so the client can render without extra mapping.
 */
export type GenerateContentResponseBody = SocialContent
