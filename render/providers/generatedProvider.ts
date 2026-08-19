import { spawnSync } from 'node:child_process'
import { join, dirname } from 'node:path'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import type { ProductionBrief, VisualProvider } from '../src/types.ts'

/**
 * Zero-cost designed background: a bundled brand image (navy mesh + accent glow)
 * with a slow Ken Burns zoom for motion — far better than a flat gradient, still
 * $0 and dependency-free at render time. Falls back to an ffmpeg gradient if the
 * asset is missing, so a render never dies for lack of a clip.
 */
const HERE = dirname(fileURLToPath(import.meta.url))
const BRAND_BG = join(HERE, '..', 'assets', 'bg', 'brand-bg.png')

export const generatedProvider: VisualProvider = {
  id: 'generated',
  async getClip(brief: ProductionBrief, workDir: string): Promise<string> {
    const dur = Math.min(Math.max(brief.duration_sec ?? 18, 8), 60)
    const out = join(workDir, 'bg.mp4')

    if (existsSync(BRAND_BG)) {
      // Ken Burns: scale up then slow zoom, 1080x1920, dur seconds.
      const res = spawnSync('ffmpeg', [
        '-y', '-loop', '1', '-i', BRAND_BG, '-t', String(dur), '-r', '30',
        '-vf', `scale=1188:2112,zoompan=z='min(zoom+0.0006,1.10)':d=${dur * 30}:s=1080x1920:fps=30,format=yuv420p`,
        '-pix_fmt', 'yuv420p', out,
      ], { stdio: 'inherit' })
      if (res.status === 0) return out
    }

    // fallback: plain gradient (never fails)
    const filter = `gradients=s=1080x1920:c0=0x0B1020:c1=0x161C3A:duration=${dur}:speed=0.01,format=yuv420p`
    const res2 = spawnSync('ffmpeg', ['-y', '-f', 'lavfi', '-i', filter, '-t', String(dur), '-r', '30', '-pix_fmt', 'yuv420p', out], { stdio: 'inherit' })
    if (res2.status !== 0) throw new Error('generatedProvider: ffmpeg failed')
    return out
  },
}
