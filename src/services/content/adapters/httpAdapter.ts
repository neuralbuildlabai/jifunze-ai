import type { GenerateContentRequestBody } from '../../../contracts/contentGenerationApi'
import type { SocialContent } from '../../../types/content'
import type { ContentGenerationAdapter } from '../adapter'
import type { GenerationPayload } from '../payloads'
import { parseSocialContentResponse } from '../validateResponse'

function getInvokeUrl(): string {
  const url = import.meta.env.VITE_CONTENT_API_URL?.trim()
  if (!url) {
    throw new Error(
      'Content API is not configured. Set VITE_CONTENT_API_URL to your Edge Function URL.',
    )
  }
  return url
}

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
      const url = getInvokeUrl()
      const body = toRequestBody(payload)

      let response: Response
      try {
        response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        })
      } catch (error) {
        if (isLikelyFetchFailure(error)) {
          throw new Error('Network problem. Check your connection and try again.')
        }
        throw new Error('Could not reach the generation service. Try again in a moment.')
      }

      const rawText = await response.text()

      if (!response.ok) {
        throw new Error(
          `Generation service returned an error (${response.status}). Please try again.`,
        )
      }

      let parsed: unknown
      try {
        parsed = rawText.trim() ? JSON.parse(rawText) : null
      } catch {
        throw new Error('The server returned data we could not read. Please try again.')
      }

      const content = parseSocialContentResponse(parsed)
      if (!content) {
        throw new Error('The server response was missing a caption or hashtags.')
      }

      return content
    },
  }
}
