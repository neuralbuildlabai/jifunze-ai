import { spawnSync } from 'node:child_process'
import { join } from 'node:path'
import type { ProductionBrief, VisualProvider } from '../src/types.ts'

/**
 * Zero-dependency, zero-cost background: an animated gradient rendered by FFmpeg.
 * No API, no key. Always available — this is the fallback when stock/ai fail, so
 * a render never dies for lack of a clip.
 *
 * Deterministic hue from the brief id so the same brief looks the same on retry
 * (no Math.random — keeps renders reproducible).
 */
function hueFromId(id: string): number {
  let h = 0
  for (const c of id) h = (h * 31 + c.charCodeAt(0)) % 360
  return h
}

export const generatedProvider: VisualProvider = {
  id: 'generated',
  async getClip(brief: ProductionBrief, workDir: string): Promise<string> {
    const dur = Math.min(Math.max(brief.duration_sec ?? 20, 8), 60)
    const out = join(workDir, 'bg.mp4')
    const hue = hueFromId(brief.id)
    // Two-colour vertical gradient with a slow drift, dark enough for white captions.
    const c1 = `0x${hslToHex(hue, 55, 18)}`
    const c2 = `0x${hslToHex((hue + 40) % 360, 60, 8)}`
    const filter =
      `gradients=s=1080x1920:c0=${c1}:c1=${c2}:x0=0:y0=0:x1=1080:y1=1920:` +
      `duration=${dur}:speed=0.01,format=yuv420p`
    const res = spawnSync('ffmpeg', [
      '-y', '-f', 'lavfi', '-i', filter, '-t', String(dur),
      '-r', '30', '-pix_fmt', 'yuv420p', out,
    ], { stdio: 'inherit' })
    if (res.status !== 0) throw new Error('generatedProvider: ffmpeg failed')
    return out
  },
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100; l /= 100
  const k = (n: number) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => {
    const col = l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
    return Math.round(255 * col).toString(16).padStart(2, '0')
  }
  return `${f(0)}${f(8)}${f(4)}`
}
