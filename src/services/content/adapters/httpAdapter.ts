import { FunctionsHttpError } from '@supabase/supabase-js'
import type { GenerateContentRequestBody } from '../../../contracts/contentGenerationApi'
import { isSupabaseConfigured } from '../../../config/supabaseEnv'
import { getSupabaseBrowserClient } from '@/lib/supabaseClient'
import type { SocialContent } from '../../../types/content'
import type { ContentGenerationAdapter } from '../adapter'
import type { GenerationPayload } from '../payloads'
import { parseGenerationDeliverySource, parseSocialContentResponse } from '../validateResponse'

/** Browsers typically throw TypeError when fetch cannot complete (offline, DNS, CORS, etc.). */
function isLikelyFetchFailure(error: unknown): boolean {
  return error instanceof TypeError
}

function toRequestBody(payload: GenerationPayload): GenerateContentRequestBody {
  return {
    topic: payload.topic,
    context: payload.context,
    source: payload.source,
    external_signal_id: payload.external_signal_id,
    content_opportunity_id: payload.content_opportunity_id,
  }
}

/**
 * Calls your hosted generator (e.g. Supabase Edge). OpenAI and service keys stay server-side.
 */
export function createHttpContentAdapter(): ContentGenerationAdapter {
  return {
    async generate(payload: GenerationPayload): Promise<SocialContent> {
      if (!isSupabaseConfigured()) {
        throw new Error(
          'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to use remote generation.',
        )
      }

      const supabase = getSupabaseBrowserClient()
      const body = toRequestBody(payload)

      const {
        data: { session },
      } = await supabase.auth.getSession()
      console.info('[JifunzeAI invoke_auth]', {
        hasSession: Boolean(session),
        hasToken: Boolean(session?.access_token),
      })

      let data: unknown
      try {
        const result = await supabase.functions.invoke('generate-content', { body })
        if (result.error) {
          if (result.error instanceof FunctionsHttpError) {
            const res = result.error.context as Response
            if (res.status === 503) {
              try {
                const payload = (await res.clone().json()) as Record<string, unknown>
                const reason =
                  typeof payload.reason === 'string' && payload.reason.trim()
                    ? payload.reason.trim()
                    : null
                if (reason) {
                  throw new Error(`Generation unavailable: ${reason}`)
                }
              } catch (e) {
                if (e instanceof Error && e.message.startsWith('Generation unavailable:')) throw e
              }
            }
          }
          throw result.error
        }
        data = result.data
      } catch (error) {
        if (isLikelyFetchFailure(error)) {
          throw new Error('Network problem. Check your connection and try again.')
        }
        throw error
      }

      const content = parseSocialContentResponse(data)
      if (!content) {
        throw new Error('The server response was missing a caption or hashtags.')
      }

      const delivery = parseGenerationDeliverySource(data)
      console.info('[JifunzeAI content_generation]', {
        source: delivery ?? 'backend_unspecified',
      })

      return content
    },
  }
}
