import type { ContentGenerationAdapter } from './adapter'
import { createHttpContentAdapter } from './adapters/httpAdapter'
import { createMockContentAdapter } from './adapters/mockAdapter'

export type ContentGenerationMode = 'mock' | 'http'

function readMode(): ContentGenerationMode {
  const explicit = import.meta.env.VITE_CONTENT_MODE?.toLowerCase()?.trim()
  if (explicit === 'http' || explicit === 'mock') return explicit
  const url = import.meta.env.VITE_CONTENT_API_URL?.trim()
  if (url) return 'http'
  const raw = import.meta.env.VITE_CONTENT_GENERATION_MODE?.toLowerCase()?.trim()
  if (raw === 'http') return 'http'
  return 'mock'
}

/** `http` = remote caption API; `mock` = in-browser demo text (no server LLM). */
export function getContentAdapterMode(): ContentGenerationMode {
  return readMode()
}

/**
 * When `VITE_CONTENT_API_URL` is set (e.g. Supabase `.../functions/v1/generate-content`), all
 * generation goes through the HTTP adapter so no LLM keys live in the browser. Otherwise uses
 * mock unless `VITE_CONTENT_GENERATION_MODE=http` (still requires URL at request time).
 */
export function createContentGenerationAdapter(): ContentGenerationAdapter {
  const mode = readMode()
  if (mode === 'http') {
    return createHttpContentAdapter()
  }
  return createMockContentAdapter()
}
