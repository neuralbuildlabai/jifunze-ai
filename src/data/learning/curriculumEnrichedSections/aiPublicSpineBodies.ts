/**
 * Authored depth for the remaining **public starter spine** in AI Foundations:
 * Practical Prompting (public modules) + Reviewing/Validating (public slice).
 */
import type { PublicStarterLessonSection } from '../../publicStarterLibraries/aiFoundations'

export const ENRICHED_AI_PUBLIC_SPINE_SECTIONS_BY_SLUG: Record<string, PublicStarterLessonSection[]> = {
  'practical-prompting-what-makes-a-prompt-good-or-weak': [
    {
      heading: 'Good prompts are executable specifications',
      paragraphs: [
        'Weak prompts hide missing constraints: audience, purpose, forbidden claims, sources, output shape, and how “done” is judged. Strong prompts read like a mini-brief an intern could execute without guessing your politics.',
        'Good prompts also name risk: what must be verified before anyone acts on the output (money, safety, reputation, grades).',
      ],
    },
    {
      heading: 'Worked rubric (quick)',
      paragraphs: [
        'Score a prompt 1–5 on: goal clarity, constraints, format, falsifiability (“what would prove this wrong?”), and verification path. Anything scoring ≤3 on verification is not “safe because internal.”',
      ],
    },
    {
      heading: 'Misconceptions',
      paragraphs: [
        '“Longer prompts are smarter.” Length often buries the objective—structure beats tokens.',
        '“If output is bad, the model is bad.” Often the task is underspecified or the risk tier demands human sources, not more adjectives.',
      ],
    },
    {
      heading: 'What good understanding looks like',
      paragraphs: [
        'You can rewrite a vague request into a brief with constraints first, and you can explain which failures are prompt bugs vs verification bugs.',
      ],
    },
  ],

  'practical-prompting-the-anatomy-of-a-useful-prompt': [
    {
      heading: 'Anatomy: goal, context, constraints, format, verification',
      paragraphs: [
        'Goal: the decision or artifact. Context: audience, constraints, inputs you can share. Constraints: exclusions, compliance boundaries, tone limits. Format: outline vs memo vs checklist. Verification: what you will check and against what evidence.',
        'Missing verification is the silent failure mode for professional work—fluency fills the gap dangerously.',
      ],
    },
    {
      heading: 'Worked rewrite',
      paragraphs: [
        'Take “Write about our roadmap” and rewrite into a one-paragraph brief that names stakeholder, timeframe, non-goals, and what claims require a human-approved source.',
      ],
    },
    {
      heading: 'Common mistakes',
      paragraphs: [
        'Mixing multiple deliverables in one prompt—split into passes (outline → draft → critique).',
        'Asking for certainty where only uncertainty is honest—better to ask for options with tradeoffs.',
      ],
    },
    {
      heading: 'Application',
      paragraphs: [
        'Template: Goal / Non-goals / Inputs / Constraints / Output shape / Verification steps—use it twice this week and compare failure rates.',
      ],
    },
  ],

  'practical-prompting-asking-for-better-outputs-in-plain-language': [
    {
      heading: 'Iteration is debugging, not vibes',
      paragraphs: [
        'Plain-language iteration works when each retry changes one variable: audience, evidence available, excluded topics, format, or rubric. If you change everything at once, you learn nothing.',
        'Ask the model to diagnose its own weaknesses *against your constraints*—not generic “be better.”',
      ],
    },
    {
      heading: 'Worked loop',
      paragraphs: [
        'Draft → identify one concrete defect (too generic, wrong audience, missing sections) → patch prompt → rerun. Keep a one-line changelog of what you changed.',
      ],
    },
    {
      heading: 'Thin habits',
      paragraphs: [
        'Rewriting prompts emotionally (“Try harder”)—non-actionable.',
        'Accepting polish when the underlying facts are still unverified.',
      ],
    },
    {
      heading: 'Self-check',
      paragraphs: [
        'After two retries, if output still fails, classify whether the bottleneck is missing inputs, missing authority, or missing verification—fix the right layer.',
      ],
    },
  ],

  'practical-prompting-the-role-of-context-constraints-and-format': [
    {
      heading: 'Context reduces ambiguity; constraints reduce harm',
      paragraphs: [
        'Context tells the model what world it is in; constraints tell it what it must not pretend to know. Format shapes how errors surface (bullets reveal gaps faster than prose).',
        'Negative constraints (“do not cite law”, “do not invent metrics”) often matter more than stylistic positives.',
      ],
    },
    {
      heading: 'Worked distinction',
      paragraphs: [
        'Compare two briefing asks: one gives background docs links (context) but no verification rule; another forbids numeric claims without quoting provided text—watch which fails safer.',
      ],
    },
    {
      heading: 'Misconceptions',
      paragraphs: [
        '“More context always helps.” Huge dumps bury objectives and may leak sensitive content—structure context instead.',
      ],
    },
    {
      heading: 'Practice',
      paragraphs: [
        'Create a “constraint ladder” for your domain: Tier A outputs need citations; Tier B needs explicit uncertainty language; Tier C cannot be drafted by AI without human review.',
      ],
    },
  ],

  'practical-prompting-prompting-for-summaries': [
    {
      heading: 'Summaries fail when fidelity rules are unstated',
      paragraphs: [
        'Say what must be preserved: decisions, obligations, dates, owners, risks. Say what can be omitted: anecdotes, nice-to-have history. Decide whether the summary is for action or orientation—different shapes.',
        'Summaries used as evidence need traceability to sources—otherwise they become polished misinformation.',
      ],
    },
    {
      heading: 'Worked summary spec',
      paragraphs: [
        'Prompt pattern: “Summarize for executives in 10 bullets; each bullet must map to a paragraph ID from the source; flag unknowns explicitly.”',
      ],
    },
    {
      heading: 'Missteps',
      paragraphs: [
        'Confusing compression with interpretation—interpretation sneaks new claims.',
      ],
    },
    {
      heading: 'Evaluation',
      paragraphs: [
        'Compare your summary against source for one random bullet—did meaning survive?',
      ],
    },
  ],

  'practical-prompting-prompting-for-brainstorming': [
    {
      heading: 'Brainstorming needs divergence rules and convergence gates',
      paragraphs: [
        'Ask for alternatives under explicit constraints (budget, ethics, timeframe). Then separate generation from evaluation—critique in a second pass with a rubric.',
        'Brainstorm outputs are drafts for selection—never confuse quantity with correctness.',
      ],
    },
    {
      heading: 'Worked structure',
      paragraphs: [
        'Two-phase prompt: (1) generate 15 ideas with labels “cheap / risky / regulatory-sensitive”; (2) pick top 3 with reasons tied to stakeholder goals.',
      ],
    },
    {
      heading: 'Misconceptions',
      paragraphs: [
        '“Creative means unconstrained.” Constraints fuel creativity by ruling out mush.',
      ],
    },
    {
      heading: 'Judgment checkpoint',
      paragraphs: [
        'Which brainstorm item would you reject immediately on ethical grounds—write the rejection sentence you’d post publicly.',
      ],
    },
  ],

  'practical-prompting-prompting-for-explanations': [
    {
      heading: 'Explanations must match the learner’s level and the stakes',
      paragraphs: [
        'Define audience expertise, desired outcome (do vs understand), and what analogies are allowed. For high-stakes domains, require uncertainty markers and “what would change this explanation.”',
        'Explanations become dangerous when they sound complete—pair with checks and sources.',
      ],
    },
    {
      heading: 'Worked explanation brief',
      paragraphs: [
        'Ask for a layered explanation: 5-year-old metaphor → practitioner version → list of common misconceptions → one practice check.',
      ],
    },
    {
      heading: 'Misconceptions',
      paragraphs: [
        '“Simple language equals simple truth.” Simple can be wrong—clarity is not accuracy.',
      ],
    },
    {
      heading: 'Capability marker',
      paragraphs: [
        'You can spot when an explanation smuggles in extra claims—highlight one sentence that should be deleted or qualified.',
      ],
    },
  ],

  'practical-prompting-prompting-for-drafts-and-rewrites': [
    {
      heading: 'Drafts are intermediate artifacts—treat them that way',
      paragraphs: [
        'Specify voice, structure, taboo phrases, and review ownership. Rewrites need a target defect (“reduce jargon”, “tighten argument”, “remove implied legal claims”).',
        'If you rewrite without diagnosing failure mode, you random-walk.',
      ],
    },
    {
      heading: 'Worked pairing',
      paragraphs: [
        'Draft with AI → human marks factual claims → AI reformats only after claims are sourced or softened.',
      ],
    },
    {
      heading: 'Anti-patterns',
      paragraphs: [
        'Shipping tone improvements while factual holes remain—customers experience that as betrayal more than awkward wording.',
      ],
    },
    {
      heading: 'Exercise',
      paragraphs: [
        'Take an AI draft and classify each paragraph: evidence-backed vs hypothesis vs fluff—delete fluff first.',
      ],
    },
  ],

  'reviewing-and-validating-ai-output-why-ai-output-must-be-reviewed': [
    {
      heading: 'Review is accountability engineering',
      paragraphs: [
        'Models optimize plausible text—not your constraints, org facts, or moral responsibilities. Review transfers ownership back to humans before consequences attach.',
        'Review intensity scales with stakes: internal scratch notes ≠ customer promises ≠ regulated advice.',
      ],
    },
    {
      heading: 'Worked stakes ladder',
      paragraphs: [
        'Classify outputs into tiers: reversible notes, operational decisions, external commitments, individualized guidance—each tier gets different reviewers and evidence bars.',
      ],
    },
    {
      heading: 'Misconceptions',
      paragraphs: [
        '“We reviewed tone.” Tone-only review misses factual and policy failures.',
      ],
    },
    {
      heading: 'Professional standard',
      paragraphs: [
        'You can justify why this output was allowed to ship—named reviewer, checks performed, known residual risks.',
      ],
    },
  ],

  'reviewing-and-validating-ai-output-the-different-ways-ai-can-be-wrong': [
    {
      heading: 'Wrongness has species—each needs different detectors',
      paragraphs: [
        'Hallucinated specifics, subtle irrelevance, outdated facts, biased framing, incomplete coverage, unsafe instructions, policy violations, and “confident vagueness.”',
        'Different detectors: spot-check facts, compare to source text, ask for missing constraints, run bias lens for impacted communities.',
      ],
    },
    {
      heading: 'Worked taxonomy drill',
      paragraphs: [
        'Pick one AI failure you’ve seen—label its species and the cheapest check that would have caught it earlier.',
      ],
    },
    {
      heading: 'Misconceptions',
      paragraphs: [
        '“If it cites links it must be true.” Citations can be irrelevant, misquoted, or stale.',
      ],
    },
    {
      heading: 'Assessment angle',
      paragraphs: [
        'Write a two-column table: failure mode → verification habit—keep it near your desk.',
      ],
    },
  ],

  'reviewing-and-validating-ai-output-fluency-versus-accuracy': [
    {
      heading: 'Fluency is the enemy of vigilance',
      paragraphs: [
        'Smooth prose lowers skepticism—especially with numbers, quotes, and causal claims. Force explicit uncertainty when evidence is thin.',
        'Accuracy checks often require external anchors— calendars, policies, primary documents—not rereading the same paragraph.',
      ],
    },
    {
      heading: 'Worked practice',
      paragraphs: [
        'Highlight every quantitative claim and date in an AI draft—each needs a source or must be softened.',
      ],
    },
    {
      heading: 'Missteps',
      paragraphs: [
        'Editing grammar while ignoring a wrong recommendation—polished wrong advice travels farther.',
      ],
    },
    {
      heading: 'Evaluation',
      paragraphs: [
        'Give the draft to someone with instructions: “Try to falsify”—collect what they challenge first.',
      ],
    },
  ],

  'reviewing-and-validating-ai-output-hidden-risk-in-good-looking-output': [
    {
      heading: '"Good-looking" hides structural risk',
      paragraphs: [
        'Risk hides in confident transitions, plausible invented examples, and subtle scope creep (“generally”, “typically”) without data.',
        'Organizationally, the risk is approval by aesthetics—train reviewers to ask for provenance, not polish.',
      ],
    },
    {
      heading: 'Worked red-team lens',
      paragraphs: [
        'Ask: what would embarrass us if quoted publicly? What would harm a vulnerable reader? What would violate policy if taken literally?',
      ],
    },
    {
      heading: 'Misconceptions',
      paragraphs: [
        '“Professional tone means responsible.” Tone is not ethics.',
      ],
    },
    {
      heading: 'Capability outcome',
      paragraphs: [
        'You can separate cosmetic edits from substantive risk edits—and prioritize the latter under time pressure.',
      ],
    },
  ],

  'reviewing-and-validating-ai-output-checking-for-accuracy': [
    {
      heading: 'Accuracy is provenance discipline',
      paragraphs: [
        'Verify names, dates, obligations, and numbers against authoritative sources. Mark everything else as provisional language.',
        'When sources conflict, document the conflict—don’t let the model “smooth” it away.',
      ],
    },
    {
      heading: 'Worked verification chain',
      paragraphs: [
        'For each claim class, define the authoritative source type (policy doc, contract, instrument reading). Refuse to publish when the chain breaks.',
      ],
    },
    {
      heading: 'Missteps',
      paragraphs: [
        'Sampling one fact correctly and generalizing trust—spot checks can miss systematic fabrication.',
      ],
    },
    {
      heading: 'Serious evaluation',
      paragraphs: [
        'Take one paragraph and rewrite it into three labeled sentences: verified / provisional / unsupported—unsupported must be cut or qualified.',
      ],
    },
  ],

  'reviewing-and-validating-ai-output-checking-for-relevance': [
    {
      heading: 'Relevance is fit to decision and audience',
      paragraphs: [
        'An answer can be true yet irrelevant—wrong scope, wrong timeframe, wrong stakeholder framing. Begin reviews with the decision the reader must make.',
        'Watch “topic relevance” traps: answering the FAQ average instead of your firm’s variant.',
      ],
    },
    {
      heading: 'Worked fit test',
      paragraphs: [
        'Ask: what changes if this paragraph is deleted? If nothing changes, delete it.',
      ],
    },
    {
      heading: 'Misconceptions',
      paragraphs: [
        '“Comprehensive equals helpful.” Comprehensive often obscures the decisive constraint.',
      ],
    },
    {
      heading: 'Professional review habit',
      paragraphs: [
        'Pair each deliverable with a one-line “decision supported” statement—if you cannot write it, the draft is not ready.',
      ],
    },
  ],
}
