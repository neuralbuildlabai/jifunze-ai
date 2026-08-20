import { spawnSync } from 'node:child_process'
import { join } from 'node:path'
import type { ProductionBrief, VisualProvider } from '../src/types.ts'

/**
 * EMERGENCY ONLY. A flat animated gradient with no brand asset — this is the
 * "cheap" look the brand explicitly does not want. It exists so a render can
 * still complete if the bundled designed background is missing or unreadable.
 * Never select this as a default; `VISUAL_PROVIDER=fallback` is a manual escape
 * hatch and the loop logs loudly when it is used.
 */
export const fallbackProvider: VisualProvider = {
  id: 'fallback',
  async getClip(brief: ProductionBrief, workDir: string): Promise<string> {
    const dur = Math.min(Math.max(brief.duration_sec ?? 18, 8), 60)
    const out = join(workDir, 'bg-fallback.mp4')
    console.warn('[visual] fallbackProvider in use — flat gradient, off-brand. This should never be the daily default.')
    const filter = `gradients=s=1080x1920:c0=0x09090B:c1=0x241A44:duration=${dur}:speed=0.01,format=yuv420p`
    const res = spawnSync('ffmpeg', ['-y', '-f', 'lavfi', '-i', filter, '-t', String(dur), '-r', '30', '-pix_fmt', 'yuv420p', out], { stdio: 'inherit' })
    if (res.status !== 0) throw new Error('fallbackProvider: ffmpeg failed')
    return out
  },
}
