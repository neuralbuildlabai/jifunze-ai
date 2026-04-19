/**
 * Full reader sections for **AI Foundations** lessons that previously used skeleton HTML.
 * Lessons with migrated legacy prose remain authoritative via legacy map + resolver precedence.
 */

import type { PublicStarterLessonSection } from '../../publicStarterLibraries/aiFoundations'

export const ENRICHED_AI_FOUNDATIONS_SECTIONS_BY_SLUG: Record<string, PublicStarterLessonSection[]> = {
  'ai-foundations-the-difference-between-ai-automation-and-search': [
    {
      heading: 'Automation, search, and probabilistic helpers',
      paragraphs: [
        'Traditional automation follows explicit rules you or an engineer coded: “if X then Y.” Modern AI assistants usually learn patterns from huge datasets and guess the next plausible token or label. Search retrieves existing documents ranked by relevance; AI generation may combine retrieval with synthesis—but “sounding right” still does not mean grounded or current.',
        'Knowing which tool class you need keeps expectations realistic: automation for repeatable logic, search when you must cite sources, AI for drafting/exploration when stakes are reversible and someone will review.',
      ],
    },
    {
      heading: 'Choosing the right baseline',
      paragraphs: [
        'Ask what must be deterministic. Deterministic workflows should stay deterministic; put AI downstream as optional drafting assistance, never as silent decision-making.',
        'When comparing AI outputs to web search results, bias toward independently verifiable citations for factual claims rather than plausible paragraphs.',
      ],
    },
    {
      heading: 'Practice questions',
      paragraphs: [
        'Think of three tasks from your week. Label each as best served by deterministic automation, search/retrieval, AI drafting, or a blend—note who reviews and how errors would surface.',
      ],
    },
  ],

  'ai-foundations-inputs-patterns-and-predictions': [
    {
      heading: 'Prediction, not comprehension',
      paragraphs: [
        'Large language-style tools predict likely continuations conditioned on inputs and prompts. Given context, they may appear to “reason”—but reliability lives in correlation and coverage of training signals, not true understanding or memory of facts about you unless you explicitly provide them.',
        'Treat inputs carefully: pasted examples teach tone and boundaries; pasted secrets train future prompts by accident in some vendors—follow your employer’s acceptable-use policy.',
      ],
    },
    {
      heading: 'Same model, shifting behavior',
      paragraphs: [
        'Tiny prompt changes alter outputs drastically because the underlying task is stochastic and high-dimensional. Use this as incentive to tighten constraints—and as a caution against interpreting one lucky response as stability.',
      ],
    },
    {
      heading: 'Operational takeaway',
      paragraphs: [
        'Rewrite one repeated micro-task prompt with explicit constraints (audience, taboo topics, formatting). Run twice and compare failures—note what stabilized only after wording changed.',
      ],
    },
  ],

  'ai-foundations-why-ai-sounds-confident-even-when-it-is-wrong': [
    {
      heading: 'Fluency hides uncertainty',
      paragraphs: [
        'Fluent language cues our brains toward trust the same way confident speech does in person. Models optimize for coherence and usefulness-like tone—not calibrated truth odds.',
        'Confidence language (“clearly”, “always”, “according to”) can appear without genuine provenance unless you demanded citations you can independently verify.',
      ],
    },
    {
      heading: 'Guardrails that help',
      paragraphs: [
        'Ask for uncertainties, assumptions, unknowns. Ask it to distinguish “provided in prompt” versus “cannot verify.” Label generated numbers and dates unverified until checked.',
      ],
    },
    {
      heading: 'Anti-pattern to avoid',
      paragraphs: [
        'Avoid shipping customer-facing replies because they “feel final.” Pause on irreversible commitments: refunds, timelines, guarantees, regulated advice.',
      ],
    },
  ],

  'ai-foundations-the-limits-of-ai-knowledge': [
    {
      heading: 'Knowledge mirrors training + prompt',
      paragraphs: [
        'Systems can lack private org facts, embargoed datasets, offline documents, or post-cutoff developments. Outputs may hallucinate plausible specifics unless grounded in attachments you verified.',
        'Domain walls matter: coding advice may omit your stack’s quirks; medical/legal/financial nuances may be dangerously generic.',
      ],
    },
    {
      heading: 'Mitigations that fit everyday work',
      paragraphs: [
        'Provide excerpts and ask for citations tied to supplied text only; avoid asking for authoritative stats without attaching sources; date-stamp risky claims and downgrade confidence when sources are absent.',
      ],
    },
    {
      heading: 'Practice',
      paragraphs: [
        'Pick one AI answer you disagree with this week and list missing inputs that would change the recommendation—policy link, stakeholder goal, forbidden claims.',
      ],
    },
  ],

  'ai-foundations-why-context-changes-output-quality': [
    {
      heading: 'Context narrows ambiguity',
      paragraphs: [
        'Outputs improve when constraints reduce hypothesis space: audience, outcome, exclusions, vocabulary level, geography, timeframe, regulatory lens. Without them, models average across many plausible intents.',
        'Formatting instructions matter early: bullets vs prose, outline-first vs final draft—these steer structure before tone polish.',
      ],
    },
    {
      heading: 'But context isn’t omniscience',
      paragraphs: [
        'Paste only what policies allow; longer prompts also risk burying objectives. Prefer structured sections (Goal / Constraints / Sources / Tone) instead of sprawling paragraphs.',
      ],
    },
    {
      heading: 'Tiny experiment',
      paragraphs: [
        'Take one vague ask you made recently and rewrite constraints in five bullet lines—rerun once and capture what became less fragile.',
      ],
    },
  ],

  'ai-foundations-what-good-ai-use-looks-like': [
    {
      heading: 'Clear boundaries and owners',
      paragraphs: [
        'Healthy use assigns human accountability after AI assistance: whose name goes on an email? who verifies claims? Good workflows label AI’s role internally where policies require disclosure.',
        'Avoid using AI as an authority substitute in regulated contexts—still subject-matter escalation paths matter.',
      ],
    },
    {
      heading: 'Healthy habits',
      paragraphs: [
        'Iterate prompts like edits; checkpoint outputs against checklists for facts, inclusivity, and confidentiality; pause when novelty pressure tempts skipping review.',
      ],
    },
    {
      heading: 'Reflection',
      paragraphs: [
        'Write three sentences defining “acceptable AI help” for your outward-facing versus internal drafts this month.',
      ],
    },
  ],

  'ai-foundations-when-to-use-ai-and-when-not-to': [
    {
      heading: 'Signals AI may help',
      paragraphs: [
        'Low-to-medium stakes drafts with reversibility (brainstorm outlines, restructuring messy notes), classification with human sampling, multilingual rough drafts with human polishing.',
        'Tasks where speed yields learning cycles and errors are observable before harm.',
      ],
    },
    {
      heading: 'Signals to slow down or abstain',
      paragraphs: [
        'Unique legal/medical/regulatory reliance, individualized safety-critical instructions, quoting policies you cannot internally verify, handling sensitive identities without minimized prompts and approved tooling.',
      ],
    },
    {
      heading: 'Decision prompt',
      paragraphs: [
        'Ask: If wrong, does harm spread quickly? Are sources verifiable afterwards? Would a reviewer need domain expertise anyway? Answer honestly before accelerating.',
      ],
    },
  ],

  'ai-foundations-building-good-judgment-around-ai': [
    {
      heading: 'Judgment beats clever prompts',
      paragraphs: [
        'Judgment shows up when you diagnose failure modes—hallucinated precision, misplaced tone, missing constraints—rather than blaming “the AI.” Keeping a lightweight error journal accelerates calibration.',
        'Separate taste from correctness: eloquent drafts can still be unethical, exclusionary, or inaccurate.',
      ],
    },
    {
      heading: 'Evidence habits',
      paragraphs: [
        'Prefer primary references for facts that matter; treat cross-model summaries as unreliable evidence chains; escalate when reputational/regulatory stakes rise.',
      ],
    },
    {
      heading: 'Practice loop',
      paragraphs: [
        'Pick one flawed AI output from last week—identify failure class (facts, relevance, completeness, bias/tone). Name one preventive check next time.',
      ],
    },
  ],

  'ai-foundations-your-first-practical-ai-use-cases': [
    {
      heading: 'Starter patterns that compound',
      paragraphs: [
        'Weekly recap drafts from bullet notes; meeting-follow-up mails with tone constraints; turning dense pages into annotated outlines—each ends with explicit verification steps before send.',
        'Avoid scope creep early: narrow use-cases outperform “do everything smarter.”',
      ],
    },
    {
      heading: 'Setting success criteria without overclaiming',
      paragraphs: [
        'Define success as fewer preventable mistakes or faster review—not guaranteed external outcomes like grades, hiring, or conversions. Measurement stays qualitative until you baseline rigorously.',
      ],
    },
    {
      heading: 'Pick two experiments',
      paragraphs: [
        'Choose two repeatable tasks under your control next week—specify prompts, checkpoints, storage of outputs, and who verifies. Iterate once based on misses, not vibes.',
      ],
    },
  ],
}
