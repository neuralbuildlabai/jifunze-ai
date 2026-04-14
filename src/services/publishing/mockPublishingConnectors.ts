import type { SocialPlatformId } from '../../types/socialPlatform'
import type { PublishIntent, PublishResult, PublishValidation, PublishingConnector } from './types'

/** In-memory / log-only connector until real OAuth + vendor SDKs ship. */
export function createMockPublishingConnector(platform: SocialPlatformId): PublishingConnector {
  async function validate(intent: PublishIntent): Promise<PublishValidation> {
    const errors: string[] = []
    if (!intent.primary_text.trim()) errors.push('primary_text is empty')
    if (!intent.social_account_id) errors.push('social_account_id is required')
    return { ok: errors.length === 0, errors }
  }

  return {
    platform,
    validate,
    async publish(intent: PublishIntent): Promise<PublishResult> {
      const v = await validate(intent)
      if (!v.ok) return { ok: false, error: v.errors.join('; ') }
      return {
        ok: true,
        provider_ref: `mock:${platform}:${intent.social_account_id}:${intent.scheduled_at_iso ?? 'immediate'}`,
      }
    },
  }
}
