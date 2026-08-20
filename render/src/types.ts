/** Shape the render pipeline consumes. Produced by the brief generator upstream. */
export type ProductionBrief = {
  /** Stable id used for idempotency across render + publish. */
  id: string
  /** The opening line, shown big in the first beat. */
  hook: string
  /** Caption/on-screen text beats, shown in sequence. 3–6 words each reads best. */
  segments: string[]
  /** The Instagram caption (separate from on-screen text). */
  caption: string
  /** Topic tags used to pick a relevant stock clip. */
  topic_tags: string[]
  /** Target length in seconds (default 20, clamped 8–60). */
  duration_sec?: number
  /** Which side of the hybrid engine produced this. Optional: the render CLI
   *  can be driven from a hand-written brief.json that has no mode. */
  mode?: 'evergreen' | 'news'
  /** Source article, when mode === 'news'. */
  source_url?: string
}

/**
 * Visual tiers, cheapest-looking to best-looking:
 *   fallback — flat ffmpeg gradient. EMERGENCY ONLY, never a default.
 *   designed — branded background + motion + brand mark + end card. THE DEFAULT.
 *   stock    — designed treatment over real Pexels B-roll (needs PEXELS_API_KEY).
 *   ai       — opt-in paid text-to-video. Stub; falls back to designed.
 */
export type VisualProviderId = 'fallback' | 'designed' | 'stock' | 'ai'

/** A visual provider returns a local path to a vertical background clip. */
export type VisualProvider = {
  readonly id: VisualProviderId
  /** Resolve a background clip for this brief; returns a local file path. */
  getClip(brief: ProductionBrief, workDir: string): Promise<string>
}
