import type { SocialContent } from '../../../types/content'
import type { ContentGenerationAdapter } from '../adapter'
import type { GenerationPayload } from '../payloads'

/**
 * Local stand-in for development and tests. No network, no secrets.
 */
export function createMockContentAdapter(): ContentGenerationAdapter {
  return {
    async generate(payload: GenerationPayload): Promise<SocialContent> {
      await new Promise((resolve) => setTimeout(resolve, 450))

      const angle =
        payload.source === 'opportunity'
          ? 'timely, signal-informed'
          : payload.source === 'signal'
            ? 'trend-aware'
            : 'on-brand'

      const contextHint = payload.context
        ? ` Weave in this context naturally: ${payload.context.slice(0, 180)}${payload.context.length > 180 ? '…' : ''}`
        : ''

      console.info('[JifunzeAI content_generation]', { source: 'fallback_mock' })

      return {
        caption: `Draft (${angle}): lead with “${payload.topic}”.${contextHint} Tune CTA and compliance when you connect the model.`,
        hashtags:
          payload.source === 'opportunity'
            ? '#timely #brandvoice #socialproof'
            : '#brand #growth #social #content',
      }
    },
  }
}
