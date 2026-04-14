/** Converts a trend opportunity into directions for copy + visual teams (and future models). */
export type CreativeBrief = {
  caption_direction: string
  visual_direction: string
  animation_direction: string
  mood_style_notes: string
  recommended_aspect_ratio: string
  recommended_platform_usage: string
  /** Optional structured teaching rubric for generators (steps, progressive depth). */
  teaching_rubric?: string
}
