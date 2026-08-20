import type { ProductionBrief, VisualProvider } from '../src/types.ts'
import { designedProvider } from './designedProvider.ts'

/**
 * AI text-to-video — OPT-IN AND PAID. This is the ONLY visual source that costs
 * money. It is deliberately a stub: it does not call any paid API and falls back
 * to the free designed background unless BOTH:
 *   - VISUAL_PROVIDER=ai
 *   - AI_VIDEO_API_KEY is set
 * Wire a specific vendor here when you decide the spend is worth it. Until then
 * this cannot bill you.
 */
export const aiProvider: VisualProvider = {
  id: 'ai',
  async getClip(brief: ProductionBrief, workDir: string): Promise<string> {
    const enabled = process.env.VISUAL_PROVIDER === 'ai' && !!process.env.AI_VIDEO_API_KEY
    if (!enabled) {
      console.warn('[visual] aiProvider not enabled (needs VISUAL_PROVIDER=ai + AI_VIDEO_API_KEY) — using the designed provider.')
      return designedProvider.getClip(brief, workDir)
    }
    console.warn('[visual] aiProvider enabled but no vendor wired — using the designed provider. Implement the vendor call here.')
    return designedProvider.getClip(brief, workDir)
  },
}
