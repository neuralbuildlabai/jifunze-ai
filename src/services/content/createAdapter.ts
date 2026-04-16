import type { ContentGenerationAdapter } from './adapter'
import { createHttpContentAdapter } from './adapters/httpAdapter'
import { createMockContentAdapter } from './adapters/mockAdapter'
import {
  getContentGenerationRuntimeSnapshot,
  noteContentBackendFailure,
  updateContentRoutingSnapshot,
  type RuntimeDecisionReason,
} from './runtimeMode'

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

function errorForHttpGenerationUnavailable(reason: RuntimeDecisionReason): Error {
  switch (reason) {
    case 'no_session':
      return new Error('Sign in to generate content.')
    case 'missing_endpoint':
      return new Error(
        'Remote generation is not configured. Set VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, and a reachable function URL (or VITE_CONTENT_API_URL).',
      )
    case 'forced_mock_mode':
      return new Error('Content mode is set to mock (VITE_CONTENT_MODE=mock).')
    case 'health_auth_failed':
      return new Error('Session expired or invalid. Sign in again to generate content.')
    case 'health_not_ready':
    case 'health_unreachable':
    case 'backend_ready':
      return new Error(`Content generation is unavailable (${reason}).`)
    default:
      return new Error(`Content generation is unavailable (${reason}).`)
  }
}

/** `http` = remote caption API; `mock` = in-browser demo text (no server LLM). */
export function getContentAdapterMode(): ContentGenerationMode {
  return readMode()
}

/**
 * `mock`: always in-browser demo generation.
 * `http`: Edge Function only — no silent fallback to mock; routing or invoke failures throw.
 */
export function createContentGenerationAdapter(): ContentGenerationAdapter {
  const configured = readMode()
  if (configured === 'mock') return createMockContentAdapter()

  const http = createHttpContentAdapter()

  return {
    async generate(payload) {
      await updateContentRoutingSnapshot({ accessToken: payload.accessToken })
      const runtime = getContentGenerationRuntimeSnapshot()
      if (runtime.mode !== 'backend') {
        console.info('[JifunzeAI content_runtime]', {
          decision: 'http_blocked',
          reason: runtime.reason,
        })
        throw errorForHttpGenerationUnavailable(runtime.reason)
      }

      console.info('[JifunzeAI content_runtime]', { decision: 'backend_attempt' })
      try {
        const out = await http.generate(payload)
        console.info('[JifunzeAI content_generation_route]', {
          pipeline: 'backend',
          route: 'edge_function',
        })
        return out
      } catch (error) {
        noteContentBackendFailure()
        if (error instanceof Error) throw error
        throw new Error('Generation service request failed.')
      }
    },
  }
}
