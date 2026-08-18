import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import type { ProductionBrief, VisualProvider } from '../src/types.ts'
import { generatedProvider } from './generatedProvider.ts'

/**
 * Free stock B-roll from Pexels (free API key: PEXELS_API_KEY).
 * Searches by the brief's topic tags, picks the first portrait video, downloads
 * it. Falls back to the generated gradient on any miss so a render never fails.
 *
 * Pexels licence: free for commercial use, attribution appreciated not required.
 * We respect it by tagging the source clip id in the publish log.
 */
export const stockProvider: VisualProvider = {
  id: 'stock',
  async getClip(brief: ProductionBrief, workDir: string): Promise<string> {
    const key = process.env.PEXELS_API_KEY
    if (!key) return generatedProvider.getClip(brief, workDir)

    const query = (brief.topic_tags[0] ?? 'technology').replace(/[^a-z0-9 ]/gi, '')
    try {
      const res = await fetch(
        `https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&orientation=portrait&size=medium&per_page=5`,
        { headers: { Authorization: key } },
      )
      if (!res.ok) return generatedProvider.getClip(brief, workDir)
      const data = await res.json()
      const video = data.videos?.[0]
      const file = video?.video_files?.find((f: any) => f.width < f.height) ?? video?.video_files?.[0]
      if (!file?.link) return generatedProvider.getClip(brief, workDir)

      const clip = await fetch(file.link)
      const buf = new Uint8Array(await clip.arrayBuffer())
      const out = join(workDir, 'bg_stock.mp4')
      writeFileSync(out, buf)
      return out
    } catch {
      return generatedProvider.getClip(brief, workDir)
    }
  },
}
