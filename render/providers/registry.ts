import type { VisualProvider } from '../src/types.ts'
import { stockProvider } from './stockProvider.ts'
import { generatedProvider } from './generatedProvider.ts'
import { aiProvider } from './aiProvider.ts'

/** Pick the visual provider from env. Default free stock; generated as the safety net. */
export function selectVisualProvider(): VisualProvider {
  switch (process.env.VISUAL_PROVIDER) {
    case 'ai': return aiProvider          // opt-in, paid
    case 'generated': return generatedProvider
    case 'stock':
    default: return stockProvider          // free, default
  }
}
