import type { GenerateContentRequestSource } from '../../contracts/contentGenerationApi'

export type GenerationSourceKind = GenerateContentRequestSource

export type GenerationPayload = {
  /** Primary hook line sent to the model. */
  topic: string
  /** Structured context (angles, sources) for server-side prompting. */
  context?: string
  source: GenerationSourceKind
  external_signal_id?: string
  content_opportunity_id?: string
}
