import type { WorkspacePersona } from './signedInWelcomeCopy'

/** Stable day bucket for “prompt of the day” (UTC). */
export function utcDayBucket(): number {
  const d = new Date()
  return d.getUTCFullYear() * 1000 + d.getUTCMonth() * 50 + d.getUTCDate()
}

export type MicroTip = { kind: 'tip' | 'did'; body: string }

type PromptPools = Record<
  WorkspacePersona,
  { featured: readonly string[]; tryNext: readonly string[]; tips: readonly MicroTip[] }
>

/** Subcopy under “Today’s angle” — matches inferred workspace focus. */
export function todaysAngleHelper(persona: WorkspacePersona): string {
  const tail = ' Tap the button to place it in your generator.'
  switch (persona) {
    case 'educator':
      return `A ready-made prompt — tuned for explainers, tutorials, and beginner-friendly learning content.${tail}`
    case 'creator':
      return `A ready-made prompt — tuned for hooks, audience engagement, and post ideas.${tail}`
    case 'brand':
      return `A ready-made prompt — tuned for trust, campaigns, and conversion-friendly angles.${tail}`
    case 'explorer':
    default:
      return `A ready-made starter — keep it broad, then steer it in the generator below.${tail}`
  }
}

/** Line beside “Try this next” — keeps layout, varies emphasis. */
export function tryThisNextSubtitle(persona: WorkspacePersona): string {
  switch (persona) {
    case 'educator':
      return 'Short ideas for teaching-friendly posts'
    case 'creator':
      return 'Short ideas for scroll-stopping posts'
    case 'brand':
      return 'Short ideas for trust and campaign moments'
    case 'explorer':
    default:
      return 'Broad starters you can shape fast'
  }
}

const POOLS: PromptPools = {
  educator: {
    featured: [
      'Explain one AI tool in plain language: what it does, who it is for, and one mistake beginners make.',
      'Turn today’s AI headline into a 60-second tutorial outline your audience can follow.',
      'Break down a confusing setting (temperature, context window) with one simple analogy.',
      'Compare two tools people mix up — when to use each, in one carousel.',
      'Walk through one workflow: prompt → output → what you would change next time.',
    ],
    tryNext: [
      'Explain one AI tool plainly',
      'Turn a trend into a tutorial',
      'A beginner-friendly carousel idea',
      'Compare two confused tools',
      'Before / after a prompt “clicks”',
    ],
    tips: [
      {
        kind: 'did',
        body: 'Clear “how it works” explainers often beat vague announcement posts.',
      },
      { kind: 'tip', body: 'One concrete example usually beats five abstract bullets.' },
      {
        kind: 'tip',
        body: 'Say who the post is for in the first line — beginners feel seen faster.',
      },
    ],
  },
  creator: {
    featured: [
      'Share one behind-the-scenes moment: what you tried, what you kept, what you learned.',
      'Turn a comment or DM into a short post that helps more than one person.',
      'Write a “start here” thread for people new to your niche.',
      'Draft three hooks for the same topic — pick the voice that fits your audience.',
      'Name a question your audience argues about — then share your take.',
    ],
    tryNext: [
      'Lesson from your last post',
      'Turn a comment into a follow-up',
      'Three hooks, one topic',
      'Explain your niche to a non-expert',
      'Myth vs reality in your niche',
    ],
    tips: [
      { kind: 'tip', body: 'Specific stories often earn more saves than generic inspiration.' },
      {
        kind: 'did',
        body: 'Hooks that name the reader’s situation often beat clever but vague openers.',
      },
      { kind: 'tip', body: 'End with one clear action — even “save for later” works.' },
    ],
  },
  brand: {
    featured: [
      'Announce one improvement customers asked for — why it matters and what changes for them.',
      'Turn a product detail into a benefit: time saved, risk reduced, or outcome improved.',
      'Share a short FAQ as carousel slides customers actually read.',
      'Show before / after your offer — calm language, proof-oriented, not hype.',
      'Draft a launch angle: problem → promise → proof → next step.',
    ],
    tryNext: [
      'Product detail → customer benefit',
      'Launch: problem → promise → proof',
      'FAQs as bite-sized slides',
      'Who your offer is not for',
      'One objection, one calm reply',
    ],
    tips: [
      { kind: 'tip', body: 'Benefit-led posts often beat long feature lists in the feed.' },
      {
        kind: 'did',
        body: 'Specific outcomes (“save 20 minutes”) beat vague superlatives.',
      },
      { kind: 'tip', body: 'One CTA per post — fewer choices, more follow-through.' },
    ],
  },
  explorer: {
    featured: [
      'Pick one topic you are curious about this week — explain why it matters in three short lines.',
      'Share a small win you had recently and what you would tell a friend who is stuck.',
      'Ask your audience a thoughtful question — then share your own answer in the comments.',
      'Turn a “myth vs reality” into a simple before/after story people can reuse.',
      'Draft a five-bullet outline for a post you would actually enjoy making tomorrow.',
    ],
    tryNext: [
      'One topic, three honest lines',
      'A small win + the lesson',
      'Question for the audience',
      'Myth vs reality, plainly',
      'Outline for tomorrow’s post',
    ],
    tips: [
      { kind: 'tip', body: 'Broad prompts work best when you add one specific detail only you know.' },
      { kind: 'did', body: 'A single clear angle beats trying to cover everything at once.' },
      { kind: 'tip', body: 'If you are unsure, start with a question — it gives the post a spine.' },
    ],
  },
}

export function getFeaturedPromptOfTheDay(persona: WorkspacePersona): string {
  const pool = POOLS[persona].featured
  const i = Math.abs(utcDayBucket()) % pool.length
  return pool[i]!
}

export function getTryNextPrompts(persona: WorkspacePersona): readonly string[] {
  return POOLS[persona].tryNext
}

export function getMicroTipOfTheDay(persona: WorkspacePersona): MicroTip {
  const pool = POOLS[persona].tips
  const offset =
    persona === 'educator' ? 1 : persona === 'brand' ? 2 : persona === 'explorer' ? 3 : 0
  const i = Math.abs(utcDayBucket() + offset) % pool.length
  return pool[i]!
}
