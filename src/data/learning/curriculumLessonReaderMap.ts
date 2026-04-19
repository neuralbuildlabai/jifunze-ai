/**
 * Maps canonical curriculum lesson slugs → legacy reader bodies (where migrated from the early AI Foundations snapshot).
 * Lessons without a mapping use structured skeleton sections derived from curriculum metadata.
 */

export const CURRICULUM_LESSON_LEGACY_READER_SLUG: Record<string, string> = {
  'ai-foundations-what-ai-is-and-what-it-is-not': 'what-ai-is-and-isnt',
  'ai-foundations-common-myths-about-ai': 'common-myths-about-ai',
  'ai-foundations-where-ai-shows-up-in-everyday-life-and-work': 'ai-in-everyday-work',

  'practical-prompting-what-makes-a-prompt-good-or-weak': 'prompting-fundamentals',
  'practical-prompting-asking-for-better-outputs-in-plain-language': 'improving-weak-prompts',

  'reviewing-and-validating-ai-output-why-ai-output-must-be-reviewed': 'evaluating-ai-outputs',
  'reviewing-and-validating-ai-output-the-different-ways-ai-can-be-wrong': 'when-not-to-trust-first-answers',

  'ai-for-everyday-knowledge-work-summarizing-long-material': 'notes-drafts-summaries-ideas',
  'ai-for-everyday-knowledge-work-using-ai-without-becoming-dependent-on-it': 'productivity-without-overreliance',
  'ai-for-everyday-knowledge-work-building-reusable-ai-workflows': 'reusable-workflows-and-practice-patterns',

  'ai-for-learning-and-revision-using-ai-to-understand-new-topics': 'ai-for-learning-and-revision',
  'ai-for-learning-and-revision-building-real-understanding-over-time': 'beginner-to-practical-confidence',

  'ai-content-creation-generating-content-ideas-with-ai': 'ai-assisted-content-creation',

  'reviewing-and-validating-ai-output-checking-for-bias-tone-and-risk': 'risks-limits-review-habits',
  'reviewing-and-validating-ai-output-responsible-reliance-on-ai': 'responsible-safe-use',
}

/** Old public lesson URLs → canonical curriculum slugs (permanent redirects). */
export const LEGACY_PUBLIC_AI_FOUNDATIONS_LESSON_SLUG_REDIRECTS: Record<string, string> = {
  'what-ai-is-and-isnt': 'ai-foundations-what-ai-is-and-what-it-is-not',
  'common-myths-about-ai': 'ai-foundations-common-myths-about-ai',
  'ai-in-everyday-work': 'ai-foundations-where-ai-shows-up-in-everyday-life-and-work',

  'prompting-fundamentals': 'practical-prompting-what-makes-a-prompt-good-or-weak',
  'improving-weak-prompts': 'practical-prompting-asking-for-better-outputs-in-plain-language',

  'evaluating-ai-outputs': 'reviewing-and-validating-ai-output-why-ai-output-must-be-reviewed',
  'when-not-to-trust-first-answers': 'reviewing-and-validating-ai-output-the-different-ways-ai-can-be-wrong',

  'notes-drafts-summaries-ideas': 'ai-for-everyday-knowledge-work-summarizing-long-material',
  'productivity-without-overreliance': 'ai-for-everyday-knowledge-work-using-ai-without-becoming-dependent-on-it',
  'reusable-workflows-and-practice-patterns': 'ai-for-everyday-knowledge-work-building-reusable-ai-workflows',

  'ai-for-learning-and-revision': 'ai-for-learning-and-revision-using-ai-to-understand-new-topics',
  'beginner-to-practical-confidence': 'ai-for-learning-and-revision-building-real-understanding-over-time',

  'ai-assisted-content-creation': 'ai-content-creation-generating-content-ideas-with-ai',

  'risks-limits-review-habits': 'reviewing-and-validating-ai-output-checking-for-bias-tone-and-risk',
  'responsible-safe-use': 'reviewing-and-validating-ai-output-responsible-reliance-on-ai',
}
