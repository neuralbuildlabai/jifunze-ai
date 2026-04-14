import type { ContentGenerationAdapter } from './adapter'
import { createHttpContentAdapter } from './adapters/httpAdapter'
import { createMockContentAdapter } from './adapters/mockAdapter'

export type ContentGenerationMode = 'mock' | 'http'

function readMode(): ContentGenerationMode {
  const raw = import.meta.env.VITE_CONTENT_GENERATION_MODE?.toLowerCase()?.trim()
  return raw === 'http' ? 'http' : 'mock'
}

export function createContentGenerationAdapter(): ContentGenerationAdapter {
  const mode = readMode()
  if (mode === 'http') {
    return createHttpContentAdapter()
  }
  return createMockContentAdapter()
}
