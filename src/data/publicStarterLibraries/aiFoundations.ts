/**
 * Public starter library: browsable without sign-in. Instructional, assistive framing only—no outcome guarantees.
 * Post-signup workspace library (`/library`) links here and surfaces deeper-track previews with subscription entry points.
 */

import type { CurriculumLesson, CurriculumModule } from '../learning/aiEverydayWorkCurriculum'
import {
  AI_FOUNDATIONS_FAMILY,
  flattenAiCurriculumLessons,
  getAdjacentAiCurriculumLessons,
  getAiCurriculumLesson,
  getAiCurriculumPlacement,
} from '../learning/aiEverydayWorkCurriculum'

export type PublicStarterLessonSection = {
  heading: string
  paragraphs: string[]
}

export type PublicStarterLesson = {
  slug: string
  order: number
  shortTitle: string
  title: string
  summary: string
  outcomes: string[]
  sections: PublicStarterLessonSection[]
}

export type PublicStarterModule = {
  slug: string
  order: number
  title: string
  summary: string
  lessons: PublicStarterLesson[]
}

export const AI_FOUNDATIONS_LIBRARY_SLUG = 'ai-foundations'

/** Canonical public URL for browsing this starter library (no sign-in required). Legacy `/libraries/ai-foundations` redirects here. */
export const PUBLIC_AI_FOUNDATIONS_BASE_PATH = '/library/ai-foundations'

export const AI_FOUNDATIONS_LIBRARY = {
  slug: AI_FOUNDATIONS_LIBRARY_SLUG,
  title: AI_FOUNDATIONS_FAMILY.title,
  subtitle: AI_FOUNDATIONS_FAMILY.subtitle,
  description: AI_FOUNDATIONS_FAMILY.description,
  audience:
    'For first-time visitors who want calm judgment (not hype): everyday knowledge work, study, and light content drafting—especially email, notes, summaries, and social copy.',
  progressionCue: AI_FOUNDATIONS_FAMILY.progressionCue,
} as const

/** Snapshot of the legacy six-module starter used to migrate reader bodies onto the expanded curriculum skeleton. */
export const LEGACY_AI_FOUNDATIONS_MODULES_SNAPSHOT: PublicStarterModule[] = [
  {
    slug: 'what-ai-is-and-is-not',
    order: 1,
    title: 'What AI Is and What It Is Not',
    summary: 'Ground truth, myths, and where AI realistically fits in daily work.',
    lessons: [
      {
        slug: 'what-ai-is-and-isnt',
        order: 1,
        shortTitle: 'What AI means here',
        title: 'What AI is and is not',
        summary:
          'Ground expectations: pattern-based tools that can be impressively useful—and still require human judgment.',
        outcomes: [
          'Describe what “AI” usually refers to in modern workplace tools.',
          'Separate realistic strengths from common misunderstandings.',
          'Explain why verification remains your responsibility.',
        ],
        sections: [
          {
            heading: 'A practical definition',
            paragraphs: [
              'In most workplace tools today, “AI” refers to models trained on large datasets to predict plausible next tokens, labels, or actions. They can summarize, draft, classify, route, and generate suggestions—but they do not “know” your workplace truth in the way a colleague does.',
              'Treat these systems as assistive: they can speed up drafting and exploration, but they can also be confidently wrong, outdated, or misaligned with your policies.',
            ],
          },
          {
            heading: 'What this library will (and won’t) do',
            paragraphs: [
              'These lessons teach structured habits and language—how to prompt, review, and integrate AI into everyday tasks. They do not certify competence, guarantee job outcomes, or replace policies, legal review, or expert judgment where your context requires it.',
              'If a claim sounds like a guarantee (“always correct”, “fully automated compliance”), that’s a red flag—inside AI outputs and in vendor marketing alike.',
            ],
          },
        ],
      },
      {
        slug: 'common-myths-about-ai',
        order: 2,
        shortTitle: 'Common myths',
        title: 'Common myths and misconceptions',
        summary:
          'Spot overclaims about “understanding”, omniscience, and neutrality—so you don’t outsource thinking by accident.',
        outcomes: [
          'Recognize common myths about AI “knowing facts” or being unbiased by default.',
          'Explain why fluency can mask errors.',
          'Choose safer mental models for daily use.',
        ],
        sections: [
          {
            heading: 'Myth: AI “understands” like a person',
            paragraphs: [
              'Models can sound insightful because fluent language feels like comprehension. In practice, they are predicting plausible continuations—not verifying truth against your organization’s reality.',
              'When stakes matter, treat fluency as formatting, not evidence.',
            ],
          },
          {
            heading: 'Myth: AI is neutral or objective',
            paragraphs: [
              'Outputs can reflect biases present in data and prompts. “Please be unbiased” is not a reliable fix without explicit criteria, diverse sources, and human review—especially for people-facing language.',
              'If you need fairness and inclusion, pair AI drafts with human editing and policy checks.',
            ],
          },
        ],
      },
      {
        slug: 'ai-in-everyday-work',
        order: 3,
        shortTitle: 'Where AI fits',
        title: 'Where AI fits in daily work',
        summary:
          'See where AI commonly shows up—communication, research support, organization—without over-promising coverage.',
        outcomes: [
          'Recognize common categories of AI assistance (drafting, extraction, classification, routing).',
          'Choose realistic first use-cases based on risk and reversibility.',
          'Keep human review boundaries clear for higher-stakes tasks.',
        ],
        sections: [
          {
            heading: 'Where AI tends to help first',
            paragraphs: [
              'Many teams start with low-to-medium stakes workflows: first drafts of messages, meeting summaries from notes you already have, brainstorming lists, turning bullets into clearer paragraphs, and sorting messy text into outlines.',
              'Higher stakes—anything affecting safety, legal obligations, regulated advice, medical decisions, or public claims—needs tighter review workflows. AI can still assist preparation, but should not replace accountable review.',
            ],
          },
          {
            heading: 'A simple risk lens',
            paragraphs: [
              'Ask: If this output were wrong, what breaks? For reversible tasks (internal drafts), you can iterate quickly. For irreversible tasks (customer commitments), slow down and add checks: citations, policy review, and owner sign-off.',
              'Your organization may have additional rules—this lesson is general scaffolding, not workplace policy.',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'prompting-fundamentals',
    order: 2,
    title: 'Prompting Fundamentals',
    summary: 'Ask better questions, structure prompts clearly, and iterate when outputs miss the mark.',
    lessons: [
      {
        slug: 'prompting-fundamentals',
        order: 4,
        shortTitle: 'Prompting basics',
        title: 'Prompting fundamentals',
        summary:
          'Write prompts that give models a fair chance: clear goals, constraints, and examples—without magical thinking.',
        outcomes: [
          'Structure prompts with goal, audience, constraints, and desired format.',
          'Use examples responsibly (avoid leaking secrets).',
          'Iterate like editing: refine prompts based on failure modes.',
        ],
        sections: [
          {
            heading: 'The minimum viable prompt',
            paragraphs: [
              'Start with: what you want, who it is for, what must be true, and what format you need. Example shape: “Draft a 120-word email to a non-technical executive explaining X; include two risks; avoid jargon; bullet points first.”',
              'If output is vague, don’t only retry—tighten constraints: define terms, specify exclusions, or ask for an outline before prose.',
            ],
          },
          {
            heading: 'Examples and safety',
            paragraphs: [
              'Few-shot examples can steer tone and structure, but avoid pasting confidential data into tools your organization hasn’t approved for sensitive content.',
              'When examples aren’t possible, specify evaluation criteria (“mark assumptions”, “flag uncertainties”) so the model shows its seams.',
            ],
          },
        ],
      },
      {
        slug: 'improving-weak-prompts',
        order: 5,
        shortTitle: 'Strengthen weak prompts',
        title: 'How to improve weak prompts',
        summary:
          'Turn vague asks into usable instructions—by diagnosing failure modes and tightening requirements.',
        outcomes: [
          'Tell the difference between “wrong tone” vs “missing constraints”.',
          'Use a short rewrite loop: diagnose → constrain → re-run.',
          'Avoid prompt stuffing that hides the real goal.',
        ],
        sections: [
          {
            heading: 'How to ask better questions',
            paragraphs: [
              'Weak prompts often hide the real decision: Are you seeking brainstorming, a final draft, or an outline? Say which one. If you need critique, ask for “what could be wrong” and “what’s missing”—not only a polished rewrite.',
              'If the model drifts, add guardrails: audience, forbidden claims, region/time constraints, and what evidence should be treated as unknown.',
            ],
          },
          {
            heading: 'Prompt structure basics (repeatable)',
            paragraphs: [
              'Use a consistent skeleton: Context → Task → Constraints → Output format → Quality bar. Even three lines of constraints can dramatically reduce rambling.',
              'If output quality jumps around between retries, your prompt may be under-specified; stabilize format first, then refine tone.',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'reviewing-and-validating-output',
    order: 3,
    title: 'Reviewing and Validating AI Output',
    summary: 'Build review habits for correctness, relevance, and appropriate skepticism.',
    lessons: [
      {
        slug: 'evaluating-ai-outputs',
        order: 6,
        shortTitle: 'Validate outputs',
        title: 'Reviewing and validating AI output',
        summary:
          'Review for correctness, completeness, tone, and policy fit—using repeatable checks rather than vibes.',
        outcomes: [
          'Apply a lightweight verification checklist before shipping text.',
          'Catch common failure modes: hallucinated specifics, outdated facts, misplaced confidence.',
          'Know when to discard versus revise versus escalate for expert review.',
        ],
        sections: [
          {
            heading: 'Why outputs must be reviewed',
            paragraphs: [
              'Treat AI drafts like a talented intern: fast, helpful, sometimes wrong. Your job is to validate claims that matter: names, dates, quotes, regulatory statements, metrics, and anything that could embarrass the organization if incorrect.',
              'Separate style from substance. Good writing can still be wrong.',
            ],
          },
          {
            heading: 'Checking for correctness, relevance, and bias',
            paragraphs: [
              'Correctness: verify facts that matter. Relevance: ensure the answer matches your actual goal (not just a plausible nearby topic). Bias: watch for stereotypes, exclusionary language, and uneven treatment across groups—especially in people-facing content.',
              'For factual assertions, prefer verification against trusted sources—not another AI summary. For internal claims, confirm against your systems of record.',
            ],
          },
        ],
      },
      {
        slug: 'when-not-to-trust-first-answers',
        order: 7,
        shortTitle: 'First answers',
        title: 'When not to trust the first answer',
        summary:
          'Know when to pause, verify, or escalate—especially with numbers, policies, and anything customer-facing.',
        outcomes: [
          'Recognize high-risk categories where first drafts need extra scrutiny.',
          'Use “confidence framing” in your prompts and still verify externally.',
          'Avoid automation bias: fluency is not probability of correctness.',
        ],
        sections: [
          {
            heading: 'Fast answers, slow topics',
            paragraphs: [
              'Be especially cautious with legal/medical/financial regulatory claims, security instructions, and anything that could affect safety. First answers can be confidently structured while still being incomplete or inapplicable to your jurisdiction or organization.',
              'If the model cites specifics (stats, names, URLs), treat them as unverified until checked—unless you supplied them yourself.',
            ],
          },
          {
            heading: 'Practical skepticism without cynicism',
            paragraphs: [
              'Skepticism means process: verify what matters, label uncertainty, and choose human owners for accountability.',
              'This lesson does not teach domain expertise—it teaches review discipline you can pair with your own subject-matter judgment.',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'ai-for-everyday-knowledge-work',
    order: 4,
    title: 'AI for Everyday Knowledge Work',
    summary: 'Notes, drafts, learning support, content drafting, and productivity habits that stay grounded.',
    lessons: [
      {
        slug: 'notes-drafts-summaries-ideas',
        order: 8,
        shortTitle: 'Notes & drafts',
        title: 'Using AI for notes, summaries, drafts, outlines, and ideas',
        summary:
          'Turn messy thinking into scaffolding: outlines, drafts, and iterations—without skipping verification.',
        outcomes: [
          'Choose workflows where iteration adds value without encouraging fabrication.',
          'Summarize responsibly: distinguish excerpting from reinterpretation.',
          'Use AI to clarify your thinking while keeping ownership of decisions.',
        ],
        sections: [
          {
            heading: 'From notes to structure',
            paragraphs: [
              'A strong pattern is “outline first”: generate sections and bullets, rearrange manually, then expand chosen parts. This keeps you in control of structure and reduces rambling prose.',
              'For summaries, provide the source text when possible. Ask for missing-info flags rather than forcing completeness when the source is thin.',
            ],
          },
          {
            heading: 'Idea generation without overconfidence',
            paragraphs: [
              'Brainstorming benefits from quantity and variation, but treat suggestions as hypotheses. Label speculative ideas explicitly when sharing with others.',
              'If you’re preparing learning notes, pair AI explanations with practice you can perform without assistance to reduce illusion-of-knowledge.',
            ],
          },
        ],
      },
      {
        slug: 'ai-for-learning-and-revision',
        order: 9,
        shortTitle: 'Learning & revision',
        title: 'AI for learning and revision',
        summary:
          'Use AI as a tutor-like assistant while staying grounded in practice and primary sources.',
        outcomes: [
          'Ask for explanations at multiple levels of depth.',
          'Use retrieval practice prompts instead of only re-reading AI summaries.',
          'Recognize that AI tutoring is assistive—not a substitute for accredited instruction where that matters.',
        ],
        sections: [
          {
            heading: 'Explain, then test',
            paragraphs: [
              'A useful loop is: explain a concept → generate practice questions → attempt answers → compare with references. The practice step is essential; summaries alone feel fluent without building skill.',
              'When preparing for credentials, prioritize official syllabi and authorized materials; treat AI explanations as secondary aids that need verification.',
            ],
          },
          {
            heading: 'Revision without shortcuts',
            paragraphs: [
              'Ask AI to identify common misconceptions and give self-check prompts. Use it to reorganize notes—but rebuild understanding through examples you can explain in your own words.',
              'Software does not guarantee exam outcomes; learning gains depend on your effort, context, and assessment design outside any tool.',
            ],
          },
        ],
      },
      {
        slug: 'ai-assisted-content-creation',
        order: 10,
        shortTitle: 'Content creation',
        title: 'AI-assisted content creation',
        summary:
          'Draft posts and explainers with voice constraints and publishing discipline.',
        outcomes: [
          'Define voice, audience, and non-negotiables before generating copy.',
          'Avoid plagiarism and unclear attribution; prefer original framing.',
          'Review for accuracy, rights, and brand safety before publishing.',
        ],
        sections: [
          {
            heading: 'Voice and constraints',
            paragraphs: [
              'Give the model a style guide in miniature: tone (warm/neutral), reading level, taboo topics, claims you will not make, and required disclosures.',
              'For public posts, assume scrutiny—avoid unverifiable statistics and sensational claims.',
            ],
          },
          {
            heading: 'Publishing discipline',
            paragraphs: [
              'AI can accelerate drafting, but accountability remains human. Ensure you have rights to any examples or media you reference.',
              'When posting educational content, encourage readers to verify critical facts—especially where guidance changes over time.',
            ],
          },
        ],
      },
      {
        slug: 'productivity-without-overreliance',
        order: 11,
        shortTitle: 'Productivity habits',
        title: 'Productivity without overreliance',
        summary:
          'Use AI to reduce friction while keeping agency: templates, checklists, and boundaries that prevent autopilot mistakes.',
        outcomes: [
          'Design small workflows that end with a human checkpoint.',
          'Recognize overreliance signals (skipping verification when rushed).',
          'Balance speed with accountability on outward-facing work.',
        ],
        sections: [
          {
            heading: 'Templates that keep you in control',
            paragraphs: [
              'Good productivity patterns reuse structure, not judgment: store prompt skeletons for recurring tasks (status updates, weekly summaries) and require a final “facts verified” step before sending.',
              'If AI becomes your default for thinking, reintroduce manual steps: bullet outline first, time-boxed drafting, and a rule for when you must consult a primary source.',
            ],
          },
          {
            heading: 'Everyday knowledge work boundaries',
            paragraphs: [
              'Use AI for compression and clarity; avoid using it to invent obligations, commitments, or metrics you cannot defend.',
              'When workload spikes, shrink scope—don’t skip review on high-impact outputs.',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'risks-limits-responsible-use',
    order: 5,
    title: 'Risks, Limits, and Responsible Use',
    summary: 'Understand failure modes, privacy cautions, and safety-minded habits.',
    lessons: [
      {
        slug: 'risks-limits-review-habits',
        order: 12,
        shortTitle: 'Risks & limits',
        title: 'Hallucinations, limits, and weak outputs',
        summary:
          'Understand recurring limitations—bias, drift, misuse—and build habits that reduce harm.',
        outcomes: [
          'Identify categories of harm relevant to workplace text (misinformation, exclusionary language, privacy leakage).',
          'Know why “please be unbiased” is insufficient without process.',
          'Adopt conservative defaults for sensitive topics.',
        ],
        sections: [
          {
            heading: 'Hallucinations and weak outputs',
            paragraphs: [
              'Models can produce plausible specifics that are wrong or ungrounded—especially when asked for citations, quotes, or precise figures without a provided source.',
              'Outputs may be outdated relative to fast-changing domains; treat “latest” claims cautiously unless verified.',
            ],
          },
          {
            heading: 'Privacy, confidentiality, and caution',
            paragraphs: [
              'Uploading confidential material to the wrong tool can create retention and compliance risk. Follow your organization’s AI/data policies and prefer minimization: remove identifiers, strip secrets, and use approved tools.',
              'Don’t use AI to bypass access controls (e.g., summarizing content you shouldn’t possess).',
            ],
          },
        ],
      },
      {
        slug: 'responsible-safe-use',
        order: 13,
        shortTitle: 'Responsible use',
        title: 'Safe use and good judgment',
        summary:
          'Operational safety: consent, transparency norms, accessibility, and refusing harmful requests.',
        outcomes: [
          'Apply basic data minimization when using AI tools.',
          'Understand transparency norms: disclosure expectations depend on context and policy.',
          'Avoid generating harmful or deceptive content—even if prompted.',
        ],
        sections: [
          {
            heading: 'Responsible habits',
            paragraphs: [
              'Minimize sensitive personal data in prompts. If you must process personal data, do so under policies that apply to you (workplace rules, regional privacy laws, contractual obligations).',
              'Disclosure expectations vary by domain (education, journalism, marketing). When in doubt, follow your organization’s communications standards.',
            ],
          },
          {
            heading: 'Accessibility and inclusion',
            paragraphs: [
              'Generated content may still need human editing for clarity, accurate alt text, and inclusive language—especially for public audiences.',
              'Safety includes refusing requests intended for deception, harassment, or policy violations—even when the model might comply.',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'beginner-to-practical-confidence',
    order: 6,
    title: 'From Beginner to Practical Confidence',
    summary: 'Reusable workflows, practice patterns, and what “good enough to ship” means for you.',
    lessons: [
      {
        slug: 'reusable-workflows-and-practice-patterns',
        order: 14,
        shortTitle: 'Reusable workflows',
        title: 'Reusable workflows and practice patterns',
        summary:
          'Turn lessons into repeatable playbooks: light templates, review gates, and steady iteration.',
        outcomes: [
          'Build three reusable prompt templates for recurring tasks.',
          'Pick two verification gates appropriate to your role.',
          'Measure improvement by fewer repeated mistakes—not by speed alone.',
        ],
        sections: [
          {
            heading: 'Reusable workflows',
            paragraphs: [
              'Pick two recurring tasks (e.g., weekly recap, stakeholder email, study summary) and standardize: prompt skeleton + verification checklist + where outputs are stored.',
              'Workflows should reduce cognitive load without removing accountability—especially for external communication.',
            ],
          },
          {
            heading: 'Practice patterns',
            paragraphs: [
              'Short, frequent practice beats occasional marathons: 20 minutes reviewing one failure mode (facts, tone, scope) beats reading more generic advice.',
              'Keep a personal “error log” for AI-assisted work: what went wrong, what check would catch it next time.',
            ],
          },
        ],
      },
      {
        slug: 'beginner-to-practical-confidence',
        order: 15,
        shortTitle: 'Practical confidence',
        title: 'What you can do after this starter path',
        summary:
          'Define practical confidence as predictable review—not blind trust—and map sensible next steps inside Jifunze.',
        outcomes: [
          'State what you will verify for outward-facing vs internal drafts.',
          'Know when to move from experimentation to team norms responsibly.',
          'Understand how deeper library materials can extend this foundation (availability varies by plan).',
        ],
        sections: [
          {
            heading: 'From beginner habits to practical confidence',
            paragraphs: [
              'Practical confidence means predictable review: you know what you verify and how fast you can do it. It does not mean blind trust.',
              'Improvement comes from iteration: prompt refinement, better source discipline, and tighter templates for recurring tasks.',
            ],
          },
          {
            heading: 'What “done” looks like (for this starter library)',
            paragraphs: [
              'A reasonable bar is: you can explain when AI is appropriate, what you must verify, and how outputs will be checked before they affect others.',
              'This starter library offers scaffolding—not certification of professional readiness. In the workspace library, you may find deeper tracks and additional materials depending on your plan and feature access.',
            ],
          },
        ],
      },
    ],
  },
]

export const LEGACY_AI_LESSON_SECTIONS_BY_LEGACY_SLUG: Record<string, PublicStarterLessonSection[]> =
  Object.fromEntries(
    LEGACY_AI_FOUNDATIONS_MODULES_SNAPSHOT.flatMap((mod) =>
      mod.lessons.map((lesson) => [lesson.slug, lesson.sections] as const),
    ),
  )

if (import.meta.env.DEV) {
  if (AI_FOUNDATIONS_LIBRARY.title !== AI_FOUNDATIONS_FAMILY.title) {
    throw new Error('AI library title drift between marketing metadata and curriculum family title.')
  }
}

export function flattenAiFoundationsLessons(): CurriculumLesson[] {
  return flattenAiCurriculumLessons()
}

/** Flattened curriculum lessons for analytics / legacy imports */
export const AI_FOUNDATIONS_LESSONS = flattenAiCurriculumLessons()

export function getAiFoundationsLesson(slug: string | undefined): CurriculumLesson | null {
  return getAiCurriculumLesson(slug)
}

export function getAiFoundationsModuleForLesson(slug: string): CurriculumModule | null {
  return getAiCurriculumPlacement(slug)?.module ?? null
}

export function getAdjacentAiFoundationsLessons(slug: string): {
  prev: CurriculumLesson | null
  next: CurriculumLesson | null
} {
  return getAdjacentAiCurriculumLessons(slug)
}
