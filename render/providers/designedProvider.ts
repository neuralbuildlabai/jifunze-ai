import { spawnSync } from 'node:child_process'
import { join, dirname } from 'node:path'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import type { ProductionBrief, VisualProvider } from '../src/types.ts'
import { fallbackProvider } from './fallbackProvider.ts'

/**
 * THE DEFAULT LOOK. A bundled, on-brand background (near-black #09090b with the
 * product's violet/blue glows — see scripts/generate-brand-bg.mjs) given a slow
 * Ken Burns push plus light temporal grain so it reads as designed motion rather
 * than a static image. Zero cost, zero API, deterministic.
 *
 * Only drops to fallbackProvider if the bundled asset is missing, and says so.
 */
const HERE = dirname(fileURLToPath(import.meta.url))
export const BRAND_BG = join(HERE, '..', 'assets', 'bg', 'brand-bg.png')

export const designedProvider: VisualProvider = {
  id: 'designed',
  async getClip(brief: ProductionBrief, workDir: string): Promise<string> {
    const dur = Math.min(Math.max(brief.duration_sec ?? 18, 8), 60)
    const out = join(workDir, 'bg-designed.mp4')

    if (!existsSync(BRAND_BG)) {
      console.warn(`[visual] designed background missing at ${BRAND_BG} — regenerate with "node scripts/generate-brand-bg.mjs". Using emergency fallback.`)
      return fallbackProvider.getClip(brief, workDir)
    }

    const frames = Math.round(dur * 30)
    const res = spawnSync('ffmpeg', [
      '-y', '-loop', '1', '-i', BRAND_BG, '-t', String(dur), '-r', '30',
      '-vf', [
        // oversample, then a slow push in — motion without visible stepping
        'scale=1350:2400:flags=lanczos',
        `zoompan=z='min(zoom+0.00035,1.12)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=${frames}:s=1080x1920:fps=30`,
        // light temporal grain: kills gradient banding after h264 without bloating git
        'noise=alls=4:allf=t',
        'format=yuv420p',
      ].join(','),
      '-pix_fmt', 'yuv420p', out,
    ], { stdio: 'inherit' })

    if (res.status !== 0) {
      console.warn('[visual] designed background render failed — falling back to flat gradient')
      return fallbackProvider.getClip(brief, workDir)
    }
    return out
  },
}
