/** Shape the render pipeline consumes. Produced by the brief generator upstream. */
export type ProductionBrief = {
  /** Stable id used for idempotency across render + publish. */
  id: string
  /** The opening line, shown big in the first ~2s. */
  hook: string
  /** Caption/on-screen text beats, shown in sequence. 3–6 words each reads best. */
  segments: string[]
  /** The Instagram caption (separate from on-screen text). */
  caption: string
  /** Topic tags used to pick a relevant stock clip. */
  topic_tags: string[]
  /** Target length in seconds (default 20, clamped 8–60). */
  duration_sec?: number
}

/** A visual provider returns a local path to a vertical background clip. */
export type VisualProvider = {
  readonly id: 'stock' | 'generated' | 'ai'
  /** Resolve a background clip for this brief; returns a local file path. */
  getClip(brief: ProductionBrief, workDir: string): Promise<string>
}
