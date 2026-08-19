import type { VisualProvider } from '../src/types.ts'
import { designedProvider } from './designedProvider.ts'
import { fallbackProvider } from './fallbackProvider.ts'
import { stockProvider } from './stockProvider.ts'
import { aiProvider } from './aiProvider.ts'

/**
 * Resolve VISUAL_PROVIDER to a provider. The contract, in one place:
 *
 *   (unset) / designed  -> designed   the branded default; costs nothing
 *   stock               -> stock when PEXELS_API_KEY is set, else designed
 *   fallback            -> fallback   emergency flat gradient, never automatic
 *   ai                  -> ai         opt-in paid stub, itself falls back to designed
 *   generated           -> designed   DEPRECATED alias, warns
 *   anything else       -> designed   warns rather than silently picking a tier
 *
 * The rule that matters: nothing ever silently lands on `fallback`.
 */
export function selectVisualProvider(env: NodeJS.ProcessEnv = process.env): VisualProvider {
  const raw = (env.VISUAL_PROVIDER ?? '').trim().toLowerCase()

  switch (raw) {
    case '':
    case 'designed':
      return designedProvider

    case 'stock':
      if (!env.PEXELS_API_KEY) {
        console.warn('[visual] VISUAL_PROVIDER=stock without PEXELS_API_KEY — falling back to the designed provider.')
        return designedProvider
      }
      return stockProvider

    case 'fallback':
      console.warn('[visual] VISUAL_PROVIDER=fallback — emergency tier selected explicitly. Output will be off-brand.')
      return fallbackProvider

    case 'ai':
      return aiProvider

    case 'generated':
      console.warn('[visual] VISUAL_PROVIDER=generated is deprecated and now maps to "designed". Update your config.')
      return designedProvider

    default:
      console.warn(`[visual] unknown VISUAL_PROVIDER="${raw}" — using the designed provider.`)
      return designedProvider
  }
}
