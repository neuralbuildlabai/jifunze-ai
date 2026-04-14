import type { SocialContent } from '../../types/content'
import type { GenerationPayload } from './payloads'

export type ContentGenerationAdapter = {
  generate(payload: GenerationPayload): Promise<SocialContent>
}
