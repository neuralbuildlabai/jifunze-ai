import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import type { ProductionBrief, VisualProvider } from '../src/types.ts'
import { designedProvider } from './designedProvider.ts'

/**
 * Real B-roll from Pexels (free API key: PEXELS_API_KEY, server-side only —
 * never import this from src/, it must not reach the browser bundle).
 *
 * Every failure path lands on designedProvider, so a missing key, a rate limit,
 * a bad response or an all-landscape result set degrades to the branded look
 * instead of killing the run or shipping an irrelevant clip.
 */

/**
 * Topic tag -> a search phrase that actually returns footage a career/learning
 * lesson can sit on. Raw tags like "cv" or "ai" return junk on Pexels, so we
 * translate rather than searching the tag directly.
 */
const QUERY_BY_TAG: Record<string, string> = {
  cv: 'writing notebook desk closeup',
  resume: 'writing notebook desk closeup',
  applications: 'typing laptop office',
  jobs: 'office people working',
  interview: 'business meeting handshake office',
  salary: 'counting money desk',
  money: 'counting money desk',
  freelance: 'freelancer laptop home office',
  'remote work': 'working from home laptop',
  skills: 'student studying laptop',
  learn: 'student studying laptop',
  graduate: 'young professional walking city',
  productivity: 'time lapse office work',
  ai: 'abstract technology data motion',
  kenya: 'nairobi city street',
  africa: 'african city street people',
}

const DEFAULT_QUERY = 'professional working laptop'

/** Deterministic: first tag we have a sensible phrase for, else the default. */
export function stockQueryFor(brief: ProductionBrief): string {
  for (const tag of brief.topic_tags ?? []) {
    const q = QUERY_BY_TAG[String(tag).toLowerCase().trim()]
    if (q) return q
  }
  return DEFAULT_QUERY
}

type PexelsFile = { link?: string; width?: number; height?: number; file_type?: string }
type PexelsVideo = { id?: number; duration?: number; video_files?: PexelsFile[] }

export const stockProvider: VisualProvider = {
  id: 'stock',
  async getClip(brief: ProductionBrief, workDir: string): Promise<string> {
    const key = process.env.PEXELS_API_KEY
    if (!key) {
      console.warn('[visual] VISUAL_PROVIDER=stock but PEXELS_API_KEY is not set — using the designed provider instead.')
      return designedProvider.getClip(brief, workDir)
    }

    const query = stockQueryFor(brief)
    try {
      const res = await fetch(
        `https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&orientation=portrait&size=medium&per_page=10`,
        { headers: { Authorization: key } },
      )
      if (!res.ok) {
        console.warn(`[visual] Pexels search failed (${res.status}) for "${query}" — using the designed provider.`)
        return designedProvider.getClip(brief, workDir)
      }
      const data = (await res.json()) as { videos?: PexelsVideo[] }
      const wanted = Math.min(Math.max(brief.duration_sec ?? 18, 8), 60)

      // Only genuinely vertical files, long enough not to loop visibly, and not
      // 4K (download cost). Prefer the clip closest to the target duration.
      const candidates = (data.videos ?? [])
        .filter((v) => (v.duration ?? 0) >= Math.min(wanted, 10))
        .flatMap((v) => (v.video_files ?? [])
          .filter((f) => f.link && f.width && f.height && f.height > f.width && f.width <= 1440)
          .map((f) => ({ file: f, video: v })))
      if (!candidates.length) {
        console.warn(`[visual] no portrait Pexels clip for "${query}" — using the designed provider.`)
        return designedProvider.getClip(brief, workDir)
      }
      const best = candidates.sort(
        (a, b) => Math.abs((a.video.duration ?? 0) - wanted) - Math.abs((b.video.duration ?? 0) - wanted),
      )[0]

      const clip = await fetch(best.file.link as string)
      if (!clip.ok) {
        console.warn(`[visual] Pexels download failed (${clip.status}) — using the designed provider.`)
        return designedProvider.getClip(brief, workDir)
      }
      const buf = new Uint8Array(await clip.arrayBuffer())
      const out = join(workDir, 'bg-stock.mp4')
      writeFileSync(out, buf)
      console.log(`[visual] stock clip: pexels#${best.video.id} query="${query}" ${best.file.width}x${best.file.height}`)
      return out
    } catch (err) {
      console.warn(`[visual] Pexels error (${String(err)}) — using the designed provider.`)
      return designedProvider.getClip(brief, workDir)
    }
  },
}
