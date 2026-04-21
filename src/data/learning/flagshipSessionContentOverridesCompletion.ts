/**
 * Completion layer: canonical learner-facing instructional blocks for flagship sessions not covered
 * by earlier override packs.
 *
 * Editorial policy: maintain this file by direct author edits in TypeScript only. Do **not**
 * regenerate final prose via scripts—the archived bulk tool is non-production (`scripts/archive/`).
 * Earlier bulk population was programmatic; lines require human editorial sign-off for a strict
 * “every line hand-crafted” standard.
 */

import type { FlagshipSessionContentBlock } from './flagshipSessionContentTypes'

export const FLAGSHIP_SESSION_CONTENT_OVERRIDES_COMPLETION: Partial<
  Record<string, FlagshipSessionContentBlock[]>
> = {
  "ai-essentials::ae-m01-practice": [
    {
      id: "ae-m01-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "ae-m01-practice-lt-task",
      type: "practice_task",
      title: "Practice · How modern AI behaves (and fails) in plain language",
      bullets: [
        "1. Cold-read three model outputs labeling fabrication, omission, overconfident tone, or missing caveats.",
        "2. Translate “Is this safe?” from a stakeholder into operational sub-questions.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "ae-m01-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Failure-mode note sheet (half page)",
    },
    {
      id: "ae-m01-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "ai-essentials::ae-m01-revision": [
    {
      id: "ae-m01-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · How modern AI behaves (and fails) in plain language",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "ae-m01-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Explain memorization mimicry vs. reasoning metaphors—and where metaphors fail.",
        "Sort tasks into verification-mandatory vs. lightweight review buckets.",
        "Describe model limits to stakeholders without buzzwords.",
      ],
    },
    {
      id: "ae-m01-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "ae-m01-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "ai-essentials::ae-m02-lesson": [
    {
      id: "ae-m02-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "What AI is not: myths, shortcuts, and harmful expectations",
      body: "Treat outputs and tools as accountable artifacts—verification lanes before speed.\n\nAnchor “What AI is not: myths, shortcuts, and harmful expectations” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nDemystify hype so effort goes to judgment, procedures, and evidence—not prompt superstition.",
    },
    {
      id: "ae-m02-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Operational truth conditions for this module",
      body: "Primary outcome lens: Replace “magic assistant” fantasies with inspectable step lists.\n\nPractice spine you will revisit: Fact-check one viral AI claim using primary documentation or reproducible tests.",
    },
    {
      id: "ae-m02-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Compress to a reviewer note",
      body: "Pick one realistic thread implied by “What AI is not: myths, shortcuts, and harmful expectations”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Replace “magic assistant” fantasies with inspectable step lists.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "ae-m02-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "ae-m02-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "ai-essentials::ae-m02-practice": [
    {
      id: "ae-m02-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "ae-m02-practice-lt-task",
      type: "practice_task",
      title: "Practice · What AI is not: myths, shortcuts, and harmful expectations",
      bullets: [
        "1. Fact-check one viral AI claim using primary documentation or reproducible tests.",
        "2. Draft a “never outsource” list with ethical and quality rationale per line.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "ae-m02-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Expectation reset memo",
    },
    {
      id: "ae-m02-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "ai-essentials::ae-m02-recap": [
    {
      id: "ae-m02-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · What AI is not: myths, shortcuts, and harmful expectations",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "ae-m02-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Replace “magic assistant” fantasies with inspectable step lists.",
        "Failure mode to watch: Demystify hype so effort goes to judgment, procedures, and evidence—not prompt superstition.…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "ae-m02-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "ae-m02-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "ai-essentials::ae-m03-lesson": [
    {
      id: "ae-m03-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Tool landscape: assistants, retrieval, models, and agents",
      body: "Treat outputs and tools as accountable artifacts—verification lanes before speed.\n\nAnchor “Tool landscape: assistants, retrieval, models, and agents” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nChoose tool classes for tasks—integrations, permissions, eval harnesses—not model bragging rights.",
    },
    {
      id: "ae-m03-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Operational truth conditions for this module",
      body: "Primary outcome lens: Map recurring work to assistants, retrieval, copilots, agents, or local tooling.\n\nPractice spine you will revisit: Score five workflows against tool categories + integration requirements.",
    },
    {
      id: "ae-m03-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Draft a decision memo spine",
      body: "Pick one realistic thread implied by “Tool landscape: assistants, retrieval, models, and agents”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Map recurring work to assistants, retrieval, copilots, agents, or local tooling.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "ae-m03-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "ae-m03-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "ai-essentials::ae-m03-practice": [
    {
      id: "ae-m03-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "ae-m03-practice-lt-task",
      type: "practice_task",
      title: "Practice · Tool landscape: assistants, retrieval, models, and agents",
      bullets: [
        "1. Score five workflows against tool categories + integration requirements.",
        "2. Document red/yellow/green data handling rules for one workflow.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "ae-m03-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Tool-fit matrix",
    },
    {
      id: "ae-m03-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "ai-essentials::ae-m04-lesson": [
    {
      id: "ae-m04-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Prompting as structured communication—not spellcasting",
      body: "Treat outputs and tools as accountable artifacts—verification lanes before speed.\n\nAnchor “Prompting as structured communication—not spellcasting” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nAuthor prompts like specs—intent, constraints, evidence policy, format, refusal behavior—then iterate with version notes.",
    },
    {
      id: "ae-m04-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Operational truth conditions for this module",
      body: "Primary outcome lens: Structure prompts so ambiguity surfaces early.\n\nPractice spine you will revisit: Run draft → critique → revise on one gnarly prompt with saved versions.",
    },
    {
      id: "ae-m04-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Evidence ladder (short)",
      body: "Pick one realistic thread implied by “Prompting as structured communication—not spellcasting”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Structure prompts so ambiguity surfaces early.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "ae-m04-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "ae-m04-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "ai-essentials::ae-m05-practice": [
    {
      id: "ae-m05-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "ae-m05-practice-lt-task",
      type: "practice_task",
      title: "Practice · Learning with AI without outsourcing cognition",
      bullets: [
        "1. Author five-step study protocol listing AI-allowed vs. forbidden moves.",
        "2. Generate quiz items then independently verify keys and rationales.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "ae-m05-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Integrity-forward study protocol",
    },
    {
      id: "ae-m05-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "ai-essentials::ae-m05-revision": [
    {
      id: "ae-m05-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Learning with AI without outsourcing cognition",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "ae-m05-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Design study loops where AI supports retrieval, not substitution.",
        "Spot when explanatory chat undermines durable understanding.",
        "Codify integrity boundaries for coursework and certifications.",
      ],
    },
    {
      id: "ae-m05-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "ae-m05-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "ai-essentials::ae-m06-lesson": [
    {
      id: "ae-m06-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Drafting, summarizing, and transforming text with review discipline",
      body: "Treat outputs and tools as accountable artifacts—verification lanes before speed.\n\nAnchor “Drafting, summarizing, and transforming text with review discipline” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nProduce knowledge work with tone control, factual traceability, and ruthless diff review.",
    },
    {
      id: "ae-m06-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Operational truth conditions for this module",
      body: "Primary outcome lens: Summarize long sources without smuggling new claims.\n\nPractice spine you will revisit: Summarize a dense article tagging each claim to a paragraph or “uncited.”",
    },
    {
      id: "ae-m06-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Trace one accountable thread",
      body: "Pick one realistic thread implied by “Drafting, summarizing, and transforming text with review discipline”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Summarize long sources without smuggling new claims.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "ae-m06-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "ae-m06-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "ai-essentials::ae-m07-practice": [
    {
      id: "ae-m07-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "ae-m07-practice-lt-task",
      type: "practice_task",
      title: "Practice · AI at work: handoffs, approvals, stakeholders, and norms",
      bullets: [
        "1. RACI map for AI-supported deliverables with explicit review owners.",
        "2. Write email templates declaring assistance, uncertainty, and verification status.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "ae-m07-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Team AI workflow norms draft",
    },
    {
      id: "ae-m07-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "ai-essentials::ae-m08-lesson": [
    {
      id: "ae-m08-lesson-lt-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Risk, privacy, confidentiality, and intellectual honesty",
      body: "Treat outputs and tools as accountable artifacts—verification lanes before speed.\n\nAnchor “Risk, privacy, confidentiality, and intellectual honesty” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nProtect people and IP with pragmatic classification—know what never leaves trusted environments.",
    },
    {
      id: "ae-m08-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Operational truth conditions for this module",
      body: "Primary outcome lens: Label sensitive data tiers tied to realistic tooling constraints.\n\nPractice spine you will revisit: Classify three real document types with paste/stay-local rules.",
    },
    {
      id: "ae-m08-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Compress to a reviewer note",
      body: "Pick one realistic thread implied by “Risk, privacy, confidentiality, and intellectual honesty”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Label sensitive data tiers tied to realistic tooling constraints.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "ae-m08-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "ae-m08-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "ai-essentials::ae-m08-practice": [
    {
      id: "ae-m08-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "ae-m08-practice-lt-task",
      type: "practice_task",
      title: "Practice · Risk, privacy, confidentiality, and intellectual honesty",
      bullets: [
        "1. Classify three real document types with paste/stay-local rules.",
        "2. Draft incident outline for suspected data exfiltration or harmful advice.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "ae-m08-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Sensitivity + escalation sheet",
    },
    {
      id: "ae-m08-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "ai-essentials::ae-m08-revision": [
    {
      id: "ae-m08-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Risk, privacy, confidentiality, and intellectual honesty",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "ae-m08-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Label sensitive data tiers tied to realistic tooling constraints.",
        "Define escalation paths for suspected leaks or unsafe outputs.",
        "Attribute ideas and AI contributions honestly.",
      ],
    },
    {
      id: "ae-m08-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "ae-m08-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "ai-essentials::ae-m09-lesson": [
    {
      id: "ae-m09-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Personal workflow architecture: triggers, stacks, fallbacks",
      body: "Treat outputs and tools as accountable artifacts—verification lanes before speed.\n\nAnchor “Personal workflow architecture: triggers, stacks, fallbacks” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nCompose resilient workflows—when to automate, throttle, escalate, or refuse based on stakes and fatigue.",
    },
    {
      id: "ae-m09-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Operational truth conditions for this module",
      body: "Primary outcome lens: Encode triggers using stakes × reversibility × blast radius.\n\nPractice spine you will revisit: Diagram three task families with decision diamonds and owners.",
    },
    {
      id: "ae-m09-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Draft a decision memo spine",
      body: "Pick one realistic thread implied by “Personal workflow architecture: triggers, stacks, fallbacks”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Encode triggers using stakes × reversibility × blast radius.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "ae-m09-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "ae-m09-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "ai-essentials::ae-m09-practice": [
    {
      id: "ae-m09-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "ae-m09-practice-lt-task",
      type: "practice_task",
      title: "Practice · Personal workflow architecture: triggers, stacks, fallbacks",
      bullets: [
        "1. Diagram three task families with decision diamonds and owners.",
        "2. Friday-afternoon tabletop: what breaks first? patch the workflow.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "ae-m09-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Workflow diagram + fallback table",
    },
    {
      id: "ae-m09-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "ai-essentials::ae-m10-lesson": [
    {
      id: "ae-m10-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Synthesis and operating playbook assembly",
      body: "Treat outputs and tools as accountable artifacts—verification lanes before speed.\n\nAnchor “Synthesis and operating playbook assembly” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nIntegrate stance, verification, workflows, and incidents into one lean, revisable playbook.",
    },
    {
      id: "ae-m10-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Operational truth conditions for this module",
      body: "Primary outcome lens: Decide what belongs in a pocket playbook vs. long training decks.\n\nPractice spine you will revisit: Cut 40% of a bloated draft while keeping safeguards explicit.",
    },
    {
      id: "ae-m10-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Evidence ladder (short)",
      body: "Pick one realistic thread implied by “Synthesis and operating playbook assembly”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Decide what belongs in a pocket playbook vs. long training decks.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "ae-m10-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "ae-m10-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "ai-essentials::ae-m10-practice": [
    {
      id: "ae-m10-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "ae-m10-practice-lt-task",
      type: "practice_task",
      title: "Practice · Synthesis and operating playbook assembly",
      bullets: [
        "1. Cut 40% of a bloated draft while keeping safeguards explicit.",
        "2. Peer dry-run capstone review with rubric + capture gaps.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "ae-m10-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Draft capstone playbook v1",
    },
    {
      id: "ae-m10-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "ai-essentials::ae-m10-recap": [
    {
      id: "ae-m10-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Synthesis and operating playbook assembly",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "ae-m10-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Decide what belongs in a pocket playbook vs. long training decks.",
        "Failure mode to watch: Integrate stance, verification, workflows, and incidents into one lean, revisable playbook.…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "ae-m10-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "ae-m10-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "ai-essentials::ae-m10-revision": [
    {
      id: "ae-m10-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Synthesis and operating playbook assembly",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "ae-m10-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Decide what belongs in a pocket playbook vs. long training decks.",
        "Author for future-you: triggers, checklists, escalation cues.",
        "Schedule quarterly refresh triggers.",
      ],
    },
    {
      id: "ae-m10-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "ae-m10-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "business-builder::bb-m01-practice": [
    {
      id: "bb-m01-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "bb-m01-practice-lt-task",
      type: "practice_task",
      title: "Practice · Venture framing: painful problems, substitutes, survivable scope",
      bullets: [
        "1. Rank five hypotheses by evidence strength + cost to learn next.",
        "2. Substitution map: why buyers stay with status quo today.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "bb-m01-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Problem framing + substitution map",
    },
    {
      id: "bb-m01-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "business-builder::bb-m01-revision": [
    {
      id: "bb-m01-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Venture framing: painful problems, substitutes, survivable scope",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "bb-m01-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Draft falsifiable problem statements with observable pain signals.",
        "Map substitutes and inertia without caricature.",
        "Choose initial scope bounded by cash and calendar reality.",
      ],
    },
    {
      id: "bb-m01-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "bb-m01-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "business-builder::bb-m02-lesson": [
    {
      id: "bb-m02-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Validation without self-deception: interviews, probes, kill criteria",
      body: "Treat this as finance- and stakeholder-ready reasoning—numbers, tradeoffs, and downside named.\n\nAnchor “Validation without self-deception: interviews, probes, kill criteria” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nSpend learning dollars before building dollars—structured interviews, cheap experiments, pre-written kill rules.",
    },
    {
      id: "bb-m02-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Decisions and tradeoffs this module must clarify",
      body: "Primary outcome lens: Ask questions that expose willingness to pay / change behavior.\n\nPractice spine you will revisit: Interview guide + synthesis memo with contradictory evidence preserved.",
    },
    {
      id: "bb-m02-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Compress to a reviewer note",
      body: "Pick one realistic thread implied by “Validation without self-deception: interviews, probes, kill criteria”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Ask questions that expose willingness to pay / change behavior.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "bb-m02-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "bb-m02-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "business-builder::bb-m02-practice": [
    {
      id: "bb-m02-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "bb-m02-practice-lt-task",
      type: "practice_task",
      title: "Practice · Validation without self-deception: interviews, probes, kill criteria",
      bullets: [
        "1. Interview guide + synthesis memo with contradictory evidence preserved.",
        "2. Experiment card: hypothesis, spend cap, metric, kill date.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "bb-m02-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Discovery interview kit + experiment cards",
    },
    {
      id: "bb-m02-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "business-builder::bb-m03-lesson": [
    {
      id: "bb-m03-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Offer design: outcome, mechanism, proof, capacity check",
      body: "Treat this as finance- and stakeholder-ready reasoning—numbers, tradeoffs, and downside named.\n\nAnchor “Offer design: outcome, mechanism, proof, capacity check” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nTurn insight into something purchasable—explicit mechanism, proof assets, delivery limits stated upfront.",
    },
    {
      id: "bb-m03-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Decisions and tradeoffs this module must clarify",
      body: "Primary outcome lens: Articulate outcome, mechanism, proof, pricing posture together.\n\nPractice spine you will revisit: Offer one-pager with proof hooks + explicit non-goals.",
    },
    {
      id: "bb-m03-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Draft a decision memo spine",
      body: "Pick one realistic thread implied by “Offer design: outcome, mechanism, proof, capacity check”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Articulate outcome, mechanism, proof, pricing posture together.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "bb-m03-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "bb-m03-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "business-builder::bb-m03-practice": [
    {
      id: "bb-m03-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "bb-m03-practice-lt-task",
      type: "practice_task",
      title: "Practice · Offer design: outcome, mechanism, proof, capacity check",
      bullets: [
        "1. Offer one-pager with proof hooks + explicit non-goals.",
        "2. Peer critique for overclaim + capacity mismatch.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "bb-m03-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Offer one-pager v1",
    },
    {
      id: "bb-m03-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "business-builder::bb-m03-recap": [
    {
      id: "bb-m03-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Offer design: outcome, mechanism, proof, capacity check",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "bb-m03-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Articulate outcome, mechanism, proof, pricing posture together.",
        "Failure mode to watch: Turn insight into something purchasable—explicit mechanism, proof assets, delivery limits stated upfront.…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "bb-m03-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "bb-m03-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "business-builder::bb-m04-lesson": [
    {
      id: "bb-m04-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Business model stress test: dependencies, cash engines, fragility",
      body: "Treat this as finance- and stakeholder-ready reasoning—numbers, tradeoffs, and downside named.\n\nAnchor “Business model stress test: dependencies, cash engines, fragility” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nUse canvas-style thinking to expose coupled assumptions—who must say yes, what breaks cash, where partners hide risk.",
    },
    {
      id: "bb-m04-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Decisions and tradeoffs this module must clarify",
      body: "Primary outcome lens: Surface hidden dependencies across channels and partners.\n\nPractice spine you will revisit: Annotated canvas with risk callouts per cell.",
    },
    {
      id: "bb-m04-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Evidence ladder (short)",
      body: "Pick one realistic thread implied by “Business model stress test: dependencies, cash engines, fragility”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Surface hidden dependencies across channels and partners.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "bb-m04-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "bb-m04-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "business-builder::bb-m04-practice": [
    {
      id: "bb-m04-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "bb-m04-practice-lt-task",
      type: "practice_task",
      title: "Practice · Business model stress test: dependencies, cash engines, fragility",
      bullets: [
        "1. Annotated canvas with risk callouts per cell.",
        "2. Kill-test two brittle dependencies with smallest possible probes.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "bb-m04-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Annotated canvas + dependency memo",
    },
    {
      id: "bb-m04-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "business-builder::bb-m06-lesson": [
    {
      id: "bb-m06-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Throughput before hype: bottlenecks, quality bar, proportional tooling",
      body: "Treat this as finance- and stakeholder-ready reasoning—numbers, tradeoffs, and downside named.\n\nAnchor “Throughput before hype: bottlenecks, quality bar, proportional tooling” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nStabilize delivery before pouring demand on it—find the constraint, define done, pick tools that match stage, and pick a tiny operating KPI set (throughput, defect/leak rate, cycle time) you can review weekly.",
    },
    {
      id: "bb-m06-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Decisions and tradeoffs this module must clarify",
      body: "Primary outcome lens: Locate bottleneck resource or policy constraint.\n\nPractice spine you will revisit: Process sketch with bottleneck marked + mitigation experiment.",
    },
    {
      id: "bb-m06-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Trace one accountable thread",
      body: "Pick one realistic thread implied by “Throughput before hype: bottlenecks, quality bar, proportional tooling”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Locate bottleneck resource or policy constraint.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "bb-m06-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "bb-m06-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "business-builder::bb-m07-practice": [
    {
      id: "bb-m07-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "bb-m07-practice-lt-task",
      type: "practice_task",
      title: "Practice · Operating rhythm: cadences owners actually attend",
      bullets: [
        "1. Cadence calendar with agenda templates including a 10-minute KPI snapshot section.",
        "2. Playbook skeleton for critical path workflow.",
        "3. Write a one-page business review outline: what numbers, what definitions, what decisions.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "bb-m07-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Operating cadence calendar + management review outline + playbook skeleton",
    },
    {
      id: "bb-m07-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "business-builder::bb-m08-lesson": [
    {
      id: "bb-m08-lesson-lt-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Judgment under overload: cuts, logs, burnout avoidance",
      body: "Treat this as finance- and stakeholder-ready reasoning—numbers, tradeoffs, and downside named.\n\nAnchor “Judgment under overload: cuts, logs, burnout avoidance” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nPrioritize ruthlessly—decision logs, transparent cuts, protective capacity for founders.",
    },
    {
      id: "bb-m08-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Decisions and tradeoffs this module must clarify",
      body: "Primary outcome lens: Keep decision logs stakeholders can replay.\n\nPractice spine you will revisit: Prioritization matrix with explicit deferred list.",
    },
    {
      id: "bb-m08-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Compress to a reviewer note",
      body: "Pick one realistic thread implied by “Judgment under overload: cuts, logs, burnout avoidance”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Keep decision logs stakeholders can replay.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "bb-m08-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "bb-m08-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "business-builder::bb-m08-practice": [
    {
      id: "bb-m08-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "bb-m08-practice-lt-task",
      type: "practice_task",
      title: "Practice · Judgment under overload: cuts, logs, burnout avoidance",
      bullets: [
        "1. Prioritization matrix with explicit deferred list.",
        "2. Decision memo on one uncomfortable trade-off.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "bb-m08-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Prioritization matrix + trade-off memo",
    },
    {
      id: "bb-m08-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "business-builder::bb-m09-lesson": [
    {
      id: "bb-m09-lesson-lt-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Early people reality: hires, contractors, norms that scale",
      body: "Treat this as finance- and stakeholder-ready reasoning—numbers, tradeoffs, and downside named.\n\nAnchor “Early people reality: hires, contractors, norms that scale” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nStaff against the constraint—contracts, incentives, communication basics that survive growth.",
    },
    {
      id: "bb-m09-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Decisions and tradeoffs this module must clarify",
      body: "Primary outcome lens: Write hire profile tied directly to bottleneck.\n\nPractice spine you will revisit: Role spec + scorecard + sourcing plan.",
    },
    {
      id: "bb-m09-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Draft a decision memo spine",
      body: "Pick one realistic thread implied by “Early people reality: hires, contractors, norms that scale”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Write hire profile tied directly to bottleneck.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "bb-m09-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "bb-m09-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "business-builder::bb-m09-practice": [
    {
      id: "bb-m09-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "bb-m09-practice-lt-task",
      type: "practice_task",
      title: "Practice · Early people reality: hires, contractors, norms that scale",
      bullets: [
        "1. Role spec + scorecard + sourcing plan.",
        "2. Contractor onboarding checklist + success signals.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "bb-m09-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Hire profile pack + onboarding checklist",
    },
    {
      id: "bb-m09-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "business-builder::bb-m10-lesson": [
    {
      id: "bb-m10-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Measured expansion: loops, cohort honesty, retention economics",
      body: "Treat this as finance- and stakeholder-ready reasoning—numbers, tradeoffs, and downside named.\n\nAnchor “Measured expansion: loops, cohort honesty, retention economics” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nSequence growth after delivery holds—pick loops that match stage; define activation/retention KPIs and cohort windows you will not cherry-pick.",
    },
    {
      id: "bb-m10-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Decisions and tradeoffs this module must clarify",
      body: "Primary outcome lens: Select growth loops consistent with promise and capacity.\n\nPractice spine you will revisit: Growth hypothesis backlog sequenced by learning/cost with KPI gate per stage.",
    },
    {
      id: "bb-m10-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Evidence ladder (short)",
      body: "Pick one realistic thread implied by “Measured expansion: loops, cohort honesty, retention economics”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Select growth loops consistent with promise and capacity.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "bb-m10-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "bb-m10-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "business-builder::bb-m10-practice": [
    {
      id: "bb-m10-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "bb-m10-practice-lt-task",
      type: "practice_task",
      title: "Practice · Measured expansion: loops, cohort honesty, retention economics",
      bullets: [
        "1. Growth hypothesis backlog sequenced by learning/cost with KPI gate per stage.",
        "2. Retention sketch: churn drivers + intervention hypotheses + metric you will watch weekly.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "bb-m10-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Growth sequencing memo + cohort KPI sketch",
    },
    {
      id: "bb-m10-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "business-builder::bb-m11-lesson": [
    {
      id: "bb-m11-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Blueprint integration: advisor-ready rehearsal",
      body: "Treat this as finance- and stakeholder-ready reasoning—numbers, tradeoffs, and downside named.\n\nAnchor “Blueprint integration: advisor-ready rehearsal” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nCompile narrative, economics, systems, growth, risks—cut duplication, invite sharp questions.",
    },
    {
      id: "bb-m11-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Decisions and tradeoffs this module must clarify",
      body: "Primary outcome lens: Merge modules into single coherent diligence story.\n\nPractice spine you will revisit: Mock advisor review with question log.",
    },
    {
      id: "bb-m11-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Concrete walkthrough",
      body: "Pick one realistic thread implied by “Blueprint integration: advisor-ready rehearsal”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Merge modules into single coherent diligence story.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "bb-m11-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "bb-m11-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "business-builder::bb-m11-practice": [
    {
      id: "bb-m11-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "bb-m11-practice-lt-task",
      type: "practice_task",
      title: "Practice · Blueprint integration: advisor-ready rehearsal",
      bullets: [
        "1. Mock advisor review with question log.",
        "2. Second pass: tighten claims, drop filler.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "bb-m11-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Operating & growth blueprint v1",
    },
    {
      id: "bb-m11-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "business-builder::bb-m11-recap": [
    {
      id: "bb-m11-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Blueprint integration: advisor-ready rehearsal",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "bb-m11-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Merge modules into single coherent diligence story.",
        "Failure mode to watch: Compile narrative, economics, systems, growth, risks—cut duplication, invite sharp questions.…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "bb-m11-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "bb-m11-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "business-builder::bb-m11-revision": [
    {
      id: "bb-m11-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Blueprint integration: advisor-ready rehearsal",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "bb-m11-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Merge modules into single coherent diligence story.",
        "Stress-test with outsider prompts.",
        "Commit to quarterly blueprint refresh.",
      ],
    },
    {
      id: "bb-m11-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "bb-m11-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "career-launch::cl-m01-practice": [
    {
      id: "cl-m01-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "cl-m01-practice-lt-task",
      type: "practice_task",
      title: "Practice · Career direction without magical thinking",
      bullets: [
        "1. Constraint inventory with mitigation or acceptance notes.",
        "2. Hypothesis list: role families + signals that would validate/pivot each.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "cl-m01-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Direction hypothesis sheet",
    },
    {
      id: "cl-m01-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "career-launch::cl-m01-revision": [
    {
      id: "cl-m01-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Career direction without magical thinking",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "cl-m01-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Separate identity romance from near-term role hypotheses.",
        "Document immovable constraints (visa, geography, caregiving, compensation floor).",
        "Pick exploration vs. exploitation ratio for this quarter.",
      ],
    },
    {
      id: "cl-m01-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "cl-m01-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "career-launch::cl-m02-lesson": [
    {
      id: "cl-m02-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Skills and value mapping with evidence",
      body: "Treat this as reputational craft—specific evidence beats generic positioning.\n\nAnchor “Skills and value mapping with evidence” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nReplace adjectives with receipts—map projects, metrics, and artifacts to specific claims so résumés, profiles, and interviews stay falsifiable under skeptical reads.",
    },
    {
      id: "cl-m02-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Evidence and positioning this module must sharpen",
      body: "Primary outcome lens: Translate activity lists into outcome bullets.\n\nPractice spine you will revisit: Evidence spreadsheet: project, outcome, metric/artifact, gap.",
    },
    {
      id: "cl-m02-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Compress to a reviewer note",
      body: "Pick one realistic thread implied by “Skills and value mapping with evidence”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Translate activity lists into outcome bullets.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "cl-m02-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might generic language hide weak evidence in your portfolio or story? Name one fix.",
    },
    {
      id: "cl-m02-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "career-launch::cl-m02-practice": [
    {
      id: "cl-m02-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "cl-m02-practice-lt-task",
      type: "practice_task",
      title: "Practice · Skills and value mapping with evidence",
      bullets: [
        "1. Evidence spreadsheet: project, outcome, metric/artifact, gap.",
        "2. Gap-closure plan for top two missing proofs with deadline.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "cl-m02-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Evidence bank v1",
    },
    {
      id: "cl-m02-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "career-launch::cl-m03-lesson": [
    {
      id: "cl-m03-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Résumé and CV as argument, not autobiography",
      body: "Treat this as reputational craft—specific evidence beats generic positioning.\n\nAnchor “Résumé and CV as argument, not autobiography” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nLine-level argument for ATS and humans—tie each bullet to outcomes, scope, and proof so credibility holds without inflation or keyword stuffing.",
    },
    {
      id: "cl-m03-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Evidence and positioning this module must sharpen",
      body: "Primary outcome lens: Align bullets to posted criteria + transferable framing.\n\nPractice spine you will revisit: Rewrite eight bullets into outcome + metric + scope pattern.",
    },
    {
      id: "cl-m03-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Draft a decision memo spine",
      body: "Pick one realistic thread implied by “Résumé and CV as argument, not autobiography”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Align bullets to posted criteria + transferable framing.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "cl-m03-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might generic language hide weak evidence in your portfolio or story? Name one fix.",
    },
    {
      id: "cl-m03-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "career-launch::cl-m03-practice": [
    {
      id: "cl-m03-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "cl-m03-practice-lt-task",
      type: "practice_task",
      title: "Practice · Résumé and CV as argument, not autobiography",
      bullets: [
        "1. Rewrite eight bullets into outcome + metric + scope pattern.",
        "2. Honesty audit: flag stretch phrases; revise or delete.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "cl-m03-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Résumé/CV rewrite draft",
    },
    {
      id: "cl-m03-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "career-launch::cl-m03-recap": [
    {
      id: "cl-m03-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Résumé and CV as argument, not autobiography",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "cl-m03-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Align bullets to posted criteria + transferable framing.",
        "Failure mode to watch: Line-level argument for ATS and humans—tie each bullet to outcomes, scope, and proof so credibility holds without inflat…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "cl-m03-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "cl-m03-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "career-launch::cl-m04-lesson": [
    {
      id: "cl-m04-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Profiles and portfolios: coherent public narrative",
      body: "Treat this as reputational craft—specific evidence beats generic positioning.\n\nAnchor “Profiles and portfolios: coherent public narrative” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nUnify headline, proof, and story so the same accountable person shows up across LinkedIn, site, GitHub, or portfolio—bounded disclosure for confidential work included.",
    },
    {
      id: "cl-m04-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Evidence and positioning this module must sharpen",
      body: "Primary outcome lens: Craft headline + about that mirror evidence bank.\n\nPractice spine you will revisit: Three headline/subtitle variants tested against target roles.",
    },
    {
      id: "cl-m04-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Evidence ladder (short)",
      body: "Pick one realistic thread implied by “Profiles and portfolios: coherent public narrative”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Craft headline + about that mirror evidence bank.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "cl-m04-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might generic language hide weak evidence in your portfolio or story? Name one fix.",
    },
    {
      id: "cl-m04-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "career-launch::cl-m04-practice": [
    {
      id: "cl-m04-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "cl-m04-practice-lt-task",
      type: "practice_task",
      title: "Practice · Profiles and portfolios: coherent public narrative",
      bullets: [
        "1. Three headline/subtitle variants tested against target roles.",
        "2. Featured-work rationale doc: why these pieces, what each proves.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "cl-m04-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Public narrative draft",
    },
    {
      id: "cl-m04-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "career-launch::cl-m06-lesson": [
    {
      id: "cl-m06-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Networking that isn’t transactional theater",
      body: "Treat this as reputational craft—specific evidence beats generic positioning.\n\nAnchor “Networking that isn’t transactional theater” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nTreat networking as disciplined relationship experiments: prepare conversations that reference real work, follow up with incremental value, and capture learning loops even when no role is open—without vague flattery or guilt-laden pings.",
    },
    {
      id: "cl-m06-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Evidence and positioning this module must sharpen",
      body: "Primary outcome lens: Prepare questions referencing recipient’s work—no generic flattery.\n\nPractice spine you will revisit: Conversation prep template: context, question, offer, close.",
    },
    {
      id: "cl-m06-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Trace one accountable thread",
      body: "Pick one realistic thread implied by “Networking that isn’t transactional theater”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Prepare questions referencing recipient’s work—no generic flattery.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "cl-m06-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might generic language hide weak evidence in your portfolio or story? Name one fix.",
    },
    {
      id: "cl-m06-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "career-launch::cl-m07-practice": [
    {
      id: "cl-m07-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "cl-m07-practice-lt-task",
      type: "practice_task",
      title: "Practice · Interviews: behavioral depth and technical storytelling",
      bullets: [
        "1. Record mock interview; score against rubric (clarity, evidence, reflection).",
        "2. Employer question bank customized to two target companies.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "cl-m07-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "STAR bank + mock critique",
    },
    {
      id: "cl-m07-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "career-launch::cl-m08-lesson": [
    {
      id: "cl-m08-lesson-lt-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Case-style and scenario thinking",
      body: "Treat this as reputational craft—specific evidence beats generic positioning.\n\nAnchor “Case-style and scenario thinking” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nPractice structured decomposition—hypotheses first, explicit tradeoffs, and quick sanity math where apt—so interview scenarios read as judgment, not brainstorming.",
    },
    {
      id: "cl-m08-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Evidence and positioning this module must sharpen",
      body: "Primary outcome lens: Frame problem before pitching solutions.\n\nPractice spine you will revisit: Timed scenario outlines with explicit assumptions column.",
    },
    {
      id: "cl-m08-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Compress to a reviewer note",
      body: "Pick one realistic thread implied by “Case-style and scenario thinking”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Frame problem before pitching solutions.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "cl-m08-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might generic language hide weak evidence in your portfolio or story? Name one fix.",
    },
    {
      id: "cl-m08-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "career-launch::cl-m08-practice": [
    {
      id: "cl-m08-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "cl-m08-practice-lt-task",
      type: "practice_task",
      title: "Practice · Case-style and scenario thinking",
      bullets: [
        "1. Timed scenario outlines with explicit assumptions column.",
        "2. Peer critique focused on logic gaps, not polish.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "cl-m08-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Scenario response templates",
    },
    {
      id: "cl-m08-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "career-launch::cl-m09-lesson": [
    {
      id: "cl-m09-lesson-lt-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Workplace readiness: norms, async, conflict hygiene",
      body: "Treat this as reputational craft—specific evidence beats generic positioning.\n\nAnchor “Workplace readiness: norms, async, conflict hygiene” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nOperate reliably in modern async teams—signal reliability without performative hustle, receive feedback without spiraling, and escalate conflicts with clarity and warmth.",
    },
    {
      id: "cl-m09-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Evidence and positioning this module must sharpen",
      body: "Primary outcome lens: Calibrate reliability signals (commit/ship/reply).\n\nPractice spine you will revisit: First 90 days plan with stakeholder map.",
    },
    {
      id: "cl-m09-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Draft a decision memo spine",
      body: "Pick one realistic thread implied by “Workplace readiness: norms, async, conflict hygiene”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Calibrate reliability signals (commit/ship/reply).",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "cl-m09-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might generic language hide weak evidence in your portfolio or story? Name one fix.",
    },
    {
      id: "cl-m09-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "career-launch::cl-m09-practice": [
    {
      id: "cl-m09-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "cl-m09-practice-lt-task",
      type: "practice_task",
      title: "Practice · Workplace readiness: norms, async, conflict hygiene",
      bullets: [
        "1. First 90 days plan with stakeholder map.",
        "2. Conflict rehearsal scripts for credit, priority, and feedback clashes.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "cl-m09-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Onboarding operating doc",
    },
    {
      id: "cl-m09-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "career-launch::cl-m10-lesson": [
    {
      id: "cl-m10-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Offers, negotiation framing, and decision quality",
      body: "Treat this as reputational craft—specific evidence beats generic positioning.\n\nAnchor “Offers, negotiation framing, and decision quality” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nNegotiate from preparation—BATNA, creative trade space, and regret minimization—so comp, role, and risk tradeoffs stay explicit before you accept, delay, or walk.",
    },
    {
      id: "cl-m10-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Evidence and positioning this module must sharpen",
      body: "Primary outcome lens: Decode offer components beyond base salary.\n\nPractice spine you will revisit: Negotiation worksheet with walk-away + package trades.",
    },
    {
      id: "cl-m10-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Evidence ladder (short)",
      body: "Pick one realistic thread implied by “Offers, negotiation framing, and decision quality”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Decode offer components beyond base salary.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "cl-m10-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might generic language hide weak evidence in your portfolio or story? Name one fix.",
    },
    {
      id: "cl-m10-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "career-launch::cl-m10-practice": [
    {
      id: "cl-m10-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "cl-m10-practice-lt-task",
      type: "practice_task",
      title: "Practice · Offers, negotiation framing, and decision quality",
      bullets: [
        "1. Negotiation worksheet with walk-away + package trades.",
        "2. Decision matrix for competing offers including non-monetary factors.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "cl-m10-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Negotiation + decision packet",
    },
    {
      id: "cl-m10-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "career-launch::cl-m11-lesson": [
    {
      id: "cl-m11-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Long-term growth and capstone readiness pack",
      body: "Treat this as reputational craft—specific evidence beats generic positioning.\n\nAnchor “Long-term growth and capstone readiness pack” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nIntegrate proof, targeting, outreach, interviews, and negotiation artifacts into one reviewer-ready folder—with traceability from capstone deliverables back to module outputs and a quarterly refresh plan.",
    },
    {
      id: "cl-m11-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Evidence and positioning this module must sharpen",
      body: "Primary outcome lens: Integrate artifacts into coherent narrative + evidence trail.\n\nPractice spine you will revisit: Capstone assembly checklist walkthrough.",
    },
    {
      id: "cl-m11-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Concrete walkthrough",
      body: "Pick one realistic thread implied by “Long-term growth and capstone readiness pack”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Integrate artifacts into coherent narrative + evidence trail.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "cl-m11-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might generic language hide weak evidence in your portfolio or story? Name one fix.",
    },
    {
      id: "cl-m11-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "career-launch::cl-m11-practice": [
    {
      id: "cl-m11-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "cl-m11-practice-lt-task",
      type: "practice_task",
      title: "Practice · Long-term growth and capstone readiness pack",
      bullets: [
        "1. Capstone assembly checklist walkthrough.",
        "2. Peer review swap with rubric + revision log.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "cl-m11-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Career readiness pack v1",
    },
    {
      id: "cl-m11-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "career-launch::cl-m11-recap": [
    {
      id: "cl-m11-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Long-term growth and capstone readiness pack",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "cl-m11-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Integrate artifacts into coherent narrative + evidence trail.",
        "Failure mode to watch: Integrate proof, targeting, outreach, interviews, and negotiation artifacts into one reviewer-ready folder—with traceabi…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "cl-m11-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "cl-m11-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "career-launch::cl-m11-revision": [
    {
      id: "cl-m11-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Long-term growth and capstone readiness pack",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "cl-m11-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Integrate artifacts into coherent narrative + evidence trail.",
        "Schedule quarterly refresh + proof backlog.",
        "Define next experiments after capstone.",
      ],
    },
    {
      id: "cl-m11-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "cl-m11-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "clear-communication::cc-m01-practice": [
    {
      id: "cc-m01-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "cc-m01-practice-lt-task",
      type: "practice_task",
      title: "Practice · Thinking in audiences, intents, and constraints",
      bullets: [
        "1. Reverse-outline an external memo; mark buried ledes + missing asks.",
        "2. Ten intent one-liners on real situations you face this month.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "cc-m01-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Audience–intent worksheet",
    },
    {
      id: "cc-m01-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "clear-communication::cc-m01-revision": [
    {
      id: "cc-m01-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Thinking in audiences, intents, and constraints",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "cc-m01-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Name reader, decision, success signal, and time budget.",
        "Calibrate depth to stakes—no accidental essays in inboxes.",
        "Surface constraints (legal, political, operational) up front.",
      ],
    },
    {
      id: "cc-m01-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "cc-m01-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "clear-communication::cc-m02-lesson": [
    {
      id: "cc-m02-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Structure before polish: outlines that survive contact",
      body: "Treat this as reputational craft—specific evidence beats generic positioning.\n\nAnchor “Structure before polish: outlines that survive contact” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nBuild skeletons reviewers can navigate—sequence, claims, evidence slots—before polishing prose.",
    },
    {
      id: "cc-m02-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Evidence and positioning this module must sharpen",
      body: "Primary outcome lens: Prototype outlines strangers can stress-test.\n\nPractice spine you will revisit: Outline swap + confusion hunt with a peer.",
    },
    {
      id: "cc-m02-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Compress to a reviewer note",
      body: "Pick one realistic thread implied by “Structure before polish: outlines that survive contact”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Prototype outlines strangers can stress-test.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "cc-m02-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might generic language hide weak evidence in your portfolio or story? Name one fix.",
    },
    {
      id: "cc-m02-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "clear-communication::cc-m02-practice": [
    {
      id: "cc-m02-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "cc-m02-practice-lt-task",
      type: "practice_task",
      title: "Practice · Structure before polish: outlines that survive contact",
      bullets: [
        "1. Outline swap + confusion hunt with a peer.",
        "2. Rewrite the same opening in three structural frames; pick winner with rationale.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "cc-m02-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Tested outline",
    },
    {
      id: "cc-m02-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "clear-communication::cc-m03-lesson": [
    {
      id: "cc-m03-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Plain language without dumbing down",
      body: "Treat this as reputational craft—specific evidence beats generic positioning.\n\nAnchor “Plain language without dumbing down” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nCut nominalizations and zombie nouns—keep precision for terms that earn their syllables.",
    },
    {
      id: "cc-m03-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Evidence and positioning this module must sharpen",
      body: "Primary outcome lens: Rewrite abstract nouns into actors + verbs where possible.\n\nPractice spine you will revisit: Jargon audit on your own writing sample; score each term: keep vs. kill.",
    },
    {
      id: "cc-m03-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Draft a decision memo spine",
      body: "Pick one realistic thread implied by “Plain language without dumbing down”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Rewrite abstract nouns into actors + verbs where possible.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "cc-m03-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might generic language hide weak evidence in your portfolio or story? Name one fix.",
    },
    {
      id: "cc-m03-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "clear-communication::cc-m03-practice": [
    {
      id: "cc-m03-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "cc-m03-practice-lt-task",
      type: "practice_task",
      title: "Practice · Plain language without dumbing down",
      bullets: [
        "1. Jargon audit on your own writing sample; score each term: keep vs. kill.",
        "2. Constraint game: rewrite dense paragraph losing no legal/technical meaning.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "cc-m03-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Plain-language pass + term bank",
    },
    {
      id: "cc-m03-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "clear-communication::cc-m03-recap": [
    {
      id: "cc-m03-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Plain language without dumbing down",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "cc-m03-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Rewrite abstract nouns into actors + verbs where possible.",
        "Failure mode to watch: Cut nominalizations and zombie nouns—keep precision for terms that earn their syllables.…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "cc-m03-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "cc-m03-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "clear-communication::cc-m04-lesson": [
    {
      id: "cc-m04-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Professional writing: emails, updates, and async hygiene",
      body: "Treat this as reputational craft—specific evidence beats generic positioning.\n\nAnchor “Professional writing: emails, updates, and async hygiene” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nMake async artifacts decision-ready—subject lines, scoped asks, timelines, escalation cues.",
    },
    {
      id: "cc-m04-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Evidence and positioning this module must sharpen",
      body: "Primary outcome lens: Write updates that force a decision or explicit deferral.\n\nPractice spine you will revisit: Rewrite three messy threads into crisp async packets.",
    },
    {
      id: "cc-m04-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Evidence ladder (short)",
      body: "Pick one realistic thread implied by “Professional writing: emails, updates, and async hygiene”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Write updates that force a decision or explicit deferral.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "cc-m04-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might generic language hide weak evidence in your portfolio or story? Name one fix.",
    },
    {
      id: "cc-m04-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "clear-communication::cc-m04-practice": [
    {
      id: "cc-m04-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "cc-m04-practice-lt-task",
      type: "practice_task",
      title: "Practice · Professional writing: emails, updates, and async hygiene",
      bullets: [
        "1. Rewrite three messy threads into crisp async packets.",
        "2. Draft update template pack (daily/weekly/blocker).",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "cc-m04-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Async update template suite",
    },
    {
      id: "cc-m04-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "clear-communication::cc-m06-lesson": [
    {
      id: "cc-m06-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Reports and memos: recommendations with evidence lanes",
      body: "Treat this as reputational craft—specific evidence beats generic positioning.\n\nAnchor “Reports and memos: recommendations with evidence lanes” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nSeparate facts, interpretations, and bets—appendices carry receipts executives can inspect.",
    },
    {
      id: "cc-m06-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Evidence and positioning this module must sharpen",
      body: "Primary outcome lens: Lane facts vs. interpretations vs. recommendations visually.\n\nPractice spine you will revisit: Memo skeleton with appendix plan + owner per exhibit.",
    },
    {
      id: "cc-m06-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Trace one accountable thread",
      body: "Pick one realistic thread implied by “Reports and memos: recommendations with evidence lanes”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Lane facts vs. interpretations vs. recommendations visually.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "cc-m06-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might generic language hide weak evidence in your portfolio or story? Name one fix.",
    },
    {
      id: "cc-m06-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "clear-communication::cc-m07-practice": [
    {
      id: "cc-m07-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "cc-m07-practice-lt-task",
      type: "practice_task",
      title: "Practice · Persuasion with integrity: stakes, ethics, and proof",
      bullets: [
        "1. Argument map including strongest counter-case.",
        "2. Rewrite pushy passage with ethical markers + proof hooks.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "cc-m07-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Ethical argument map",
    },
    {
      id: "cc-m07-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "clear-communication::cc-m08-lesson": [
    {
      id: "cc-m08-lesson-lt-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Speaking and presentation thinking (writing-first)",
      body: "Treat this as reputational craft—specific evidence beats generic positioning.\n\nAnchor “Speaking and presentation thinking (writing-first)” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nStory beats slides—design narratives that survive without projector mercy.",
    },
    {
      id: "cc-m08-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Evidence and positioning this module must sharpen",
      body: "Primary outcome lens: Draft talk track before any slide pixels.\n\nPractice spine you will revisit: Ten-point storyline with decision ask—no slides yet.",
    },
    {
      id: "cc-m08-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Compress to a reviewer note",
      body: "Pick one realistic thread implied by “Speaking and presentation thinking (writing-first)”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Draft talk track before any slide pixels.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "cc-m08-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might generic language hide weak evidence in your portfolio or story? Name one fix.",
    },
    {
      id: "cc-m08-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "clear-communication::cc-m08-practice": [
    {
      id: "cc-m08-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "cc-m08-practice-lt-task",
      type: "practice_task",
      title: "Practice · Speaking and presentation thinking (writing-first)",
      bullets: [
        "1. Ten-point storyline with decision ask—no slides yet.",
        "2. Q&A matrix: question → fact → stance → defer/research.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "cc-m08-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Talk track + Q&A matrix",
    },
    {
      id: "cc-m08-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "clear-communication::cc-m09-lesson": [
    {
      id: "cc-m09-lesson-lt-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Editing and refinement: systems for revision",
      body: "Treat this as reputational craft—specific evidence beats generic positioning.\n\nAnchor “Editing and refinement: systems for revision” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nCool-off passes, rubrics, structural feedback—revision as engineering, not mood.",
    },
    {
      id: "cc-m09-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Evidence and positioning this module must sharpen",
      body: "Primary outcome lens: Self-edit using hierarchy: logic → clarity → polish.\n\nPractice spine you will revisit: Two-pass edit with rubric + timed cool-off between passes.",
    },
    {
      id: "cc-m09-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Draft a decision memo spine",
      body: "Pick one realistic thread implied by “Editing and refinement: systems for revision”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Self-edit using hierarchy: logic → clarity → polish.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "cc-m09-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might generic language hide weak evidence in your portfolio or story? Name one fix.",
    },
    {
      id: "cc-m09-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "clear-communication::cc-m09-practice": [
    {
      id: "cc-m09-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "cc-m09-practice-lt-task",
      type: "practice_task",
      title: "Practice · Editing and refinement: systems for revision",
      bullets: [
        "1. Two-pass edit with rubric + timed cool-off between passes.",
        "2. Structured feedback exchange with revision log.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "cc-m09-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Revision rubric + annotated draft",
    },
    {
      id: "cc-m09-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "clear-communication::cc-m10-lesson": [
    {
      id: "cc-m10-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Portfolio assembly and capstone polish",
      body: "Treat this as reputational craft—specific evidence beats generic positioning.\n\nAnchor “Portfolio assembly and capstone polish” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nCurate artifacts across stakes ladder—portfolio tells a coherent professional story.",
    },
    {
      id: "cc-m10-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Evidence and positioning this module must sharpen",
      body: "Primary outcome lens: Pick pieces that prove range + judgment, not volume.\n\nPractice spine you will revisit: 150-word portfolio narrative tying pieces together.",
    },
    {
      id: "cc-m10-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Evidence ladder (short)",
      body: "Pick one realistic thread implied by “Portfolio assembly and capstone polish”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Pick pieces that prove range + judgment, not volume.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "cc-m10-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might generic language hide weak evidence in your portfolio or story? Name one fix.",
    },
    {
      id: "cc-m10-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "clear-communication::cc-m10-practice": [
    {
      id: "cc-m10-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "cc-m10-practice-lt-task",
      type: "practice_task",
      title: "Practice · Portfolio assembly and capstone polish",
      bullets: [
        "1. 150-word portfolio narrative tying pieces together.",
        "2. Polish sprint with critique partner + changelog.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "cc-m10-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Portfolio v1",
    },
    {
      id: "cc-m10-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "clear-communication::cc-m10-recap": [
    {
      id: "cc-m10-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Portfolio assembly and capstone polish",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "cc-m10-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Pick pieces that prove range + judgment, not volume.",
        "Failure mode to watch: Curate artifacts across stakes ladder—portfolio tells a coherent professional story.…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "cc-m10-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "cc-m10-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "clear-communication::cc-m10-revision": [
    {
      id: "cc-m10-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Portfolio assembly and capstone polish",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "cc-m10-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Pick pieces that prove range + judgment, not volume.",
        "Harmonize voice without sanding off personality.",
        "Publish editorial doctrine others could apply.",
      ],
    },
    {
      id: "cc-m10-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "cc-m10-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "data-and-decisions::dd-m01-practice": [
    {
      id: "dd-m01-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "dd-m01-practice-lt-task",
      type: "practice_task",
      title: "Practice · Data types, measurement, and honest skepticism",
      bullets: [
        "1. Annotate three real charts or KPI tiles: measured quantity, exclusions, wrong decision each could trigger.",
        "2. Rewrite one squishy KPI into an operational definition a teammate could audit.",
        "3. List three common vanity metrics in your domain and the healthier substitute signal for each.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "dd-m01-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Metric autopsy + vanity-metric substitution sheet",
    },
    {
      id: "dd-m01-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "data-and-decisions::dd-m01-revision": [
    {
      id: "dd-m01-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Data types, measurement, and honest skepticism",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "dd-m01-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Classify descriptive vs. inferential claims in everyday metrics and KPI exports.",
        "Spot misleading axes, truncated scales, cherry-picked windows, and vanity dashboard tiles.",
        "Ask “what is missing from this dataset?” and “who would game this metric?” before acting.",
      ],
    },
    {
      id: "dd-m01-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "dd-m01-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "data-and-decisions::dd-m02-lesson": [
    {
      id: "dd-m02-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "KPI selection, metric hierarchies, and performance questions",
      body: "Treat this as finance- and stakeholder-ready reasoning—numbers, tradeoffs, and downside named.\n\nAnchor “KPI selection, metric hierarchies, and performance questions” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nStart from the performance question and decision, not the dashboard—derive a KPI tree (primary → drivers → diagnostics) where every node has a definition, owner, and falsifier.",
    },
    {
      id: "dd-m02-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Decisions and tradeoffs this module must clarify",
      body: "Primary outcome lens: Draft operational definitions so two teams cannot talk past each other using the same acronym.\n\nPractice spine you will revisit: For one strategic goal, sketch a three-level KPI tree with definitions + data source class (raw, modeled, survey).",
    },
    {
      id: "dd-m02-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Compress to a reviewer note",
      body: "Pick one realistic thread implied by “KPI selection, metric hierarchies, and performance questions”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Draft operational definitions so two teams cannot talk past each other using the same acronym.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "dd-m02-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "dd-m02-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "data-and-decisions::dd-m02-practice": [
    {
      id: "dd-m02-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "dd-m02-practice-lt-task",
      type: "practice_task",
      title: "Practice · KPI selection, metric hierarchies, and performance questions",
      bullets: [
        "1. For one strategic goal, sketch a three-level KPI tree with definitions + data source class (raw, modeled, survey).",
        "2. Pick one recurring decision; list three candidate metrics with gaming risks + mitigations.",
        "3. Peer critique a dashboard screenshot: name the implicit performance question and what is still ambiguous.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "dd-m02-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "KPI tree + metric definitions sheet",
    },
    {
      id: "dd-m02-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "data-and-decisions::dd-m03-lesson": [
    {
      id: "dd-m03-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Dashboards, visualization as argument—and misread risks",
      body: "Treat this as finance- and stakeholder-ready reasoning—numbers, tradeoffs, and downside named.\n\nAnchor “Dashboards, visualization as argument—and misread risks” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nMatch visuals and dashboard panels to decisions: filters, cohorts, and time windows are part of the argument. Show variance and uncertainty ethically—executive packs and self-serve BI both fail when definitions drift.",
    },
    {
      id: "dd-m03-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Decisions and tradeoffs this module must clarify",
      body: "Primary outcome lens: Read a multi-metric dashboard and state the decision it supports (and decisions it cannot support).\n\nPractice spine you will revisit: Critique a real or sample business dashboard: list filters applied, cohort definition, and three ways a busy reader could misinterpret it.",
    },
    {
      id: "dd-m03-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Draft a decision memo spine",
      body: "Pick one realistic thread implied by “Dashboards, visualization as argument—and misread risks”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Read a multi-metric dashboard and state the decision it supports (and decisions it cannot support).",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "dd-m03-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "dd-m03-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "data-and-decisions::dd-m03-practice": [
    {
      id: "dd-m03-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "dd-m03-practice-lt-task",
      type: "practice_task",
      title: "Practice · Dashboards, visualization as argument—and misread risks",
      bullets: [
        "1. Critique a real or sample business dashboard: list filters applied, cohort definition, and three ways a busy reader could misinterpret it.",
        "2. Redesign one misleading executive chart; document three intentional design choices + one guardrail annotation.",
        "3. Write a five-line caption for a KPI tile stating numerator, denominator, exclusions, and what would change your mind.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "dd-m03-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Dashboard critique worksheet + honest viz + caption",
    },
    {
      id: "dd-m03-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "data-and-decisions::dd-m03-recap": [
    {
      id: "dd-m03-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Dashboards, visualization as argument—and misread risks",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "dd-m03-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Read a multi-metric dashboard and state the decision it supports (and decisions it cannot support).",
        "Failure mode to watch: Match visuals and dashboard panels to decisions: filters, cohorts, and time windows are part of the argument. Show varia…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "dd-m03-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "dd-m03-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "data-and-decisions::dd-m04-lesson": [
    {
      id: "dd-m04-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Baselines, comparisons, and segments",
      body: "Treat this as finance- and stakeholder-ready reasoning—numbers, tradeoffs, and downside named.\n\nAnchor “Baselines, comparisons, and segments” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nCompare fairly—seasonality, cohort discipline, ethics of segmentation when people are involved.",
    },
    {
      id: "dd-m04-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Decisions and tradeoffs this module must clarify",
      body: "Primary outcome lens: Define baselines that match the decision horizon.\n\nPractice spine you will revisit: Segment drill with ethical guardrails written first.",
    },
    {
      id: "dd-m04-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Evidence ladder (short)",
      body: "Pick one realistic thread implied by “Baselines, comparisons, and segments”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Define baselines that match the decision horizon.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "dd-m04-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "dd-m04-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "data-and-decisions::dd-m04-practice": [
    {
      id: "dd-m04-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "dd-m04-practice-lt-task",
      type: "practice_task",
      title: "Practice · Baselines, comparisons, and segments",
      bullets: [
        "1. Segment drill with ethical guardrails written first.",
        "2. Write comparison rules for a KPI you actually track.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "dd-m04-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Comparison protocol note",
    },
    {
      id: "dd-m04-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "data-and-decisions::dd-m06-lesson": [
    {
      id: "dd-m06-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Trends, noise, and regime changes",
      body: "Treat this as finance- and stakeholder-ready reasoning—numbers, tradeoffs, and downside named.\n\nAnchor “Trends, noise, and regime changes” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nDetect drift vs. noise in KPI strips and rollups; decide when to escalate vs. wait—without narrative overfitting or panic on every dip.",
    },
    {
      id: "dd-m06-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Decisions and tradeoffs this module must clarify",
      body: "Primary outcome lens: Apply smoothing without hiding spikes that matter for the next resource decision.\n\nPractice spine you will revisit: Annotate a volatile KPI series (or screenshot) with if/then rules: noise vs. investigate vs. escalate.",
    },
    {
      id: "dd-m06-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Trace one accountable thread",
      body: "Pick one realistic thread implied by “Trends, noise, and regime changes”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Apply smoothing without hiding spikes that matter for the next resource decision.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "dd-m06-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "dd-m06-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "data-and-decisions::dd-m07-practice": [
    {
      id: "dd-m07-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "dd-m07-practice-lt-task",
      type: "practice_task",
      title: "Practice · Reporting cadence, dashboards-in-context, and decision logs",
      bullets: [
        "1. Draft a one-page reporting cadence: what is reviewed when, by whom, and what triggers an ad-hoc drill-in.",
        "2. Take one dashboard KPI; write the two-sentence exec summary vs. five-bullet operator appendix for the same week.",
        "3. Backfill one messy past decision with a decision log entry that names the metric snapshot you should have preserved.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "dd-m07-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Reporting cadence brief + dashboard-to-decision log template",
    },
    {
      id: "dd-m07-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "data-and-decisions::dd-m08-lesson": [
    {
      id: "dd-m08-lesson-lt-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Stakeholder narratives: from KPI pack to decision-ready story",
      body: "Treat this as finance- and stakeholder-ready reasoning—numbers, tradeoffs, and downside named.\n\nAnchor “Stakeholder narratives: from KPI pack to decision-ready story” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nTurn dashboard exports and KPI commentary into narratives executives can act on—executive clarity, explicit risks, recommended next decision, no hidden footnotes.",
    },
    {
      id: "dd-m08-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Decisions and tradeoffs this module must clarify",
      body: "Primary outcome lens: Chain KPI movement → plausible drivers → proposed intervention → needed follow-up read.\n\nPractice spine you will revisit: Given a short performance summary (real or drafted), produce a one-page narrative: headline, KPI moves, interpretation limits, recommended decision.",
    },
    {
      id: "dd-m08-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Compress to a reviewer note",
      body: "Pick one realistic thread implied by “Stakeholder narratives: from KPI pack to decision-ready story”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Chain KPI movement → plausible drivers → proposed intervention → needed follow-up read.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "dd-m08-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "dd-m08-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "data-and-decisions::dd-m08-practice": [
    {
      id: "dd-m08-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "dd-m08-practice-lt-task",
      type: "practice_task",
      title: "Practice · Stakeholder narratives: from KPI pack to decision-ready story",
      bullets: [
        "1. Given a short performance summary (real or drafted), produce a one-page narrative: headline, KPI moves, interpretation limits, recommended decision.",
        "2. Peer omission hunt: hunt for cherry-picked windows, silent cohort changes, and metric-definition drift.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "dd-m08-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Stakeholder KPI narrative one-pager",
    },
    {
      id: "dd-m08-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "data-and-decisions::dd-m09-lesson": [
    {
      id: "dd-m09-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Thin data, priors, and escalation",
      body: "Treat this as finance- and stakeholder-ready reasoning—numbers, tradeoffs, and downside named.\n\nAnchor “Thin data, priors, and escalation” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nOperate with transparent priors when dashboards go flat or contradictory—buy-information thresholds, deeper slices vs. false precision, early escalation when stakes outrun proof.",
    },
    {
      id: "dd-m09-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Decisions and tradeoffs this module must clarify",
      body: "Primary outcome lens: State priors and how new evidence (including fresh KPI cuts) should update them.\n\nPractice spine you will revisit: Complete thin-data worksheet for a live ambiguous call tied to a KPI you own.",
    },
    {
      id: "dd-m09-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Draft a decision memo spine",
      body: "Pick one realistic thread implied by “Thin data, priors, and escalation”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: State priors and how new evidence (including fresh KPI cuts) should update them.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "dd-m09-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "dd-m09-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "data-and-decisions::dd-m09-practice": [
    {
      id: "dd-m09-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "dd-m09-practice-lt-task",
      type: "practice_task",
      title: "Practice · Thin data, priors, and escalation",
      bullets: [
        "1. Complete thin-data worksheet for a live ambiguous call tied to a KPI you own.",
        "2. Draft escalation memo with options + unknowns + the smallest extra dataset that would reduce variance.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "dd-m09-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Thin-data decision packet",
    },
    {
      id: "dd-m09-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "data-and-decisions::dd-m09-revision": [
    {
      id: "dd-m09-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Thin data, priors, and escalation",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "dd-m09-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "State priors and how new evidence (including fresh KPI cuts) should update them.",
        "Define when to drill deeper in BI vs. decide under uncertainty vs. stop the metric theater.",
        "Escalate early when harm potential exceeds evidence quality—even when charts look fine.",
      ],
    },
    {
      id: "dd-m09-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "dd-m09-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "data-and-decisions::dd-m10-lesson": [
    {
      id: "dd-m10-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Reusable frameworks for recurring decisions",
      body: "Treat this as finance- and stakeholder-ready reasoning—numbers, tradeoffs, and downside named.\n\nAnchor “Reusable frameworks for recurring decisions” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nCodify recurring contexts into living playbooks—triggers, KPI set, reporting review ritual, owners, kill criteria—not dashboard wallpaper that nobody opens.",
    },
    {
      id: "dd-m10-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Decisions and tradeoffs this module must clarify",
      body: "Primary outcome lens: Extract patterns without overfitting past luck; tie each playbook step to observable KPI movement.\n\nPractice spine you will revisit: Package framework v1 with triggers, inputs, KPI sheet references, outputs, kill criteria.",
    },
    {
      id: "dd-m10-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Evidence ladder (short)",
      body: "Pick one realistic thread implied by “Reusable frameworks for recurring decisions”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Extract patterns without overfitting past luck; tie each playbook step to observable KPI movement.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "dd-m10-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "dd-m10-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "data-and-decisions::dd-m10-practice": [
    {
      id: "dd-m10-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "dd-m10-practice-lt-task",
      type: "practice_task",
      title: "Practice · Reusable frameworks for recurring decisions",
      bullets: [
        "1. Package framework v1 with triggers, inputs, KPI sheet references, outputs, kill criteria.",
        "2. Dry-run with skeptical colleague: they role-play exec reading only your one-page KPI summary—log gaps.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "dd-m10-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Decision framework draft + KPI review checklist",
    },
    {
      id: "dd-m10-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "data-and-decisions::dd-m10-recap": [
    {
      id: "dd-m10-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Reusable frameworks for recurring decisions",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "dd-m10-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Extract patterns without overfitting past luck; tie each playbook step to observable KPI movement.",
        "Failure mode to watch: Codify recurring contexts into living playbooks—triggers, KPI set, reporting review ritual, owners, kill criteria—not da…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "dd-m10-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "dd-m10-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "data-and-decisions::dd-m10-revision": [
    {
      id: "dd-m10-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Reusable frameworks for recurring decisions",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "dd-m10-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Extract patterns without overfitting past luck; tie each playbook step to observable KPI movement.",
        "Version frameworks when markets, tooling, or metric definitions shift.",
        "Teach others to run the monthly/quarterly BI review without you.",
      ],
    },
    {
      id: "dd-m10-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "dd-m10-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "digital-safety::ds-m01-practice": [
    {
      id: "ds-m01-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "ds-m01-practice-lt-task",
      type: "practice_task",
      title: "Practice · Assets, adversaries, and proportionate defense",
      bullets: [
        "1. Build asset/risk matrix with impact × likelihood verbal scores.",
        "2. Rewrite one alarmist security tip into proportional controls + explicit non-goals.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "ds-m01-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Threat framing draft",
    },
    {
      id: "ds-m01-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "digital-safety::ds-m01-revision": [
    {
      id: "ds-m01-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Assets, adversaries, and proportionate defense",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "ds-m01-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Inventory digital assets tied to livelihood, legal duty, or reputation.",
        "Name plausible adversaries (crime, insiders, negligence) without movie plots.",
        "Reject checkbox theater—tie controls to assets and appetite for loss.",
      ],
    },
    {
      id: "ds-m01-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "ds-m01-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "digital-safety::ds-m02-lesson": [
    {
      id: "ds-m02-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Identity starts with MFA and recovery",
      body: "Treat outputs and tools as accountable artifacts—verification lanes before speed.\n\nAnchor “Identity starts with MFA and recovery” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nCredential hygiene your future self keeps—MFA choices, backup codes, recovery flows that survive stress.",
    },
    {
      id: "ds-m02-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Operational truth conditions for this module",
      body: "Primary outcome lens: Choose MFA factors appropriate to stakes and usability.\n\nPractice spine you will revisit: Audit MFA on five critical accounts; document gaps + fix dates.",
    },
    {
      id: "ds-m02-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Compress to a reviewer note",
      body: "Pick one realistic thread implied by “Identity starts with MFA and recovery”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Choose MFA factors appropriate to stakes and usability.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "ds-m02-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "ds-m02-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "digital-safety::ds-m02-practice": [
    {
      id: "ds-m02-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "ds-m02-practice-lt-task",
      type: "practice_task",
      title: "Practice · Identity starts with MFA and recovery",
      bullets: [
        "1. Audit MFA on five critical accounts; document gaps + fix dates.",
        "2. Draft recovery snippet for household or tiny team handbook.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "ds-m02-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "MFA + recovery audit",
    },
    {
      id: "ds-m02-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "digital-safety::ds-m03-lesson": [
    {
      id: "ds-m03-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Phishing judgment and verification habits",
      body: "Treat outputs and tools as accountable artifacts—verification lanes before speed.\n\nAnchor “Phishing judgment and verification habits” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nSlow down without freezing—patterns over panic, shame-free reporting, escalation paths.",
    },
    {
      id: "ds-m03-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Operational truth conditions for this module",
      body: "Primary outcome lens: Identify high-signal phishing cues beyond obvious typos.\n\nPractice spine you will revisit: Annotate three sanitized phishing samples: cues, intent, safe response.",
    },
    {
      id: "ds-m03-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Draft a decision memo spine",
      body: "Pick one realistic thread implied by “Phishing judgment and verification habits”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Identify high-signal phishing cues beyond obvious typos.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "ds-m03-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "ds-m03-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "digital-safety::ds-m03-practice": [
    {
      id: "ds-m03-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "ds-m03-practice-lt-task",
      type: "practice_task",
      title: "Practice · Phishing judgment and verification habits",
      bullets: [
        "1. Annotate three sanitized phishing samples: cues, intent, safe response.",
        "2. Write verification script for finance/wire requests your org could follow.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "ds-m03-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Verification playbook snippet",
    },
    {
      id: "ds-m03-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "digital-safety::ds-m03-recap": [
    {
      id: "ds-m03-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Phishing judgment and verification habits",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "ds-m03-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Identify high-signal phishing cues beyond obvious typos.",
        "Failure mode to watch: Slow down without freezing—patterns over panic, shame-free reporting, escalation paths.…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "ds-m03-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "ds-m03-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "digital-safety::ds-m04-lesson": [
    {
      id: "ds-m04-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Password managers, secrets, and sharing boundaries",
      body: "Treat outputs and tools as accountable artifacts—verification lanes before speed.\n\nAnchor “Password managers, secrets, and sharing boundaries” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nOperationalize secrets for humans—managers, rotation discipline, safe collaboration without screenshot culture.",
    },
    {
      id: "ds-m04-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Operational truth conditions for this module",
      body: "Primary outcome lens: Separate secrets from configuration values in discussion.\n\nPractice spine you will revisit: Secrets audit: where keys/passwords live vs. where they should.",
    },
    {
      id: "ds-m04-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Evidence ladder (short)",
      body: "Pick one realistic thread implied by “Password managers, secrets, and sharing boundaries”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Separate secrets from configuration values in discussion.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "ds-m04-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "ds-m04-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "digital-safety::ds-m04-practice": [
    {
      id: "ds-m04-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "ds-m04-practice-lt-task",
      type: "practice_task",
      title: "Practice · Password managers, secrets, and sharing boundaries",
      bullets: [
        "1. Secrets audit: where keys/passwords live vs. where they should.",
        "2. Draft safe-sharing playbook for contractors + partners.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "ds-m04-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Secrets hygiene memo",
    },
    {
      id: "ds-m04-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "digital-safety::ds-m05-practice": [
    {
      id: "ds-m05-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "ds-m05-practice-lt-task",
      type: "practice_task",
      title: "Practice · Devices, updates, and backups that survive reality",
      bullets: [
        "1. Outline restore drill for primary devices + cloud data.",
        "2. Draft lightweight update policy individuals can keep.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "ds-m05-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Backup sanity checklist",
    },
    {
      id: "ds-m05-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "digital-safety::ds-m06-lesson": [
    {
      id: "ds-m06-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Data handling: classification and least privilege",
      body: "Treat outputs and tools as accountable artifacts—verification lanes before speed.\n\nAnchor “Data handling: classification and least privilege” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nStop accidental oversharing—simple tiers, link audits, culture of least privilege in SaaS sprawl.",
    },
    {
      id: "ds-m06-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Operational truth conditions for this module",
      body: "Primary outcome lens: Define 2–3 classification tiers your team will actually use.\n\nPractice spine you will revisit: Complete access review worksheet with owners per asset.",
    },
    {
      id: "ds-m06-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Trace one accountable thread",
      body: "Pick one realistic thread implied by “Data handling: classification and least privilege”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Define 2–3 classification tiers your team will actually use.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "ds-m06-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "ds-m06-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "digital-safety::ds-m08-lesson": [
    {
      id: "ds-m08-lesson-lt-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Incidents: triage, containment, communication",
      body: "Treat outputs and tools as accountable artifacts—verification lanes before speed.\n\nAnchor “Incidents: triage, containment, communication” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nCalm mechanics—triage scripts, preserve evidence, communicate without leaking investigations.",
    },
    {
      id: "ds-m08-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Operational truth conditions for this module",
      body: "Primary outcome lens: Follow triage checklist under time pressure.\n\nPractice spine you will revisit: Draft incident comms templates for leak vs. ransomware vs. credential loss.",
    },
    {
      id: "ds-m08-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Compress to a reviewer note",
      body: "Pick one realistic thread implied by “Incidents: triage, containment, communication”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Follow triage checklist under time pressure.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "ds-m08-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "ds-m08-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "digital-safety::ds-m08-practice": [
    {
      id: "ds-m08-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "ds-m08-practice-lt-task",
      type: "practice_task",
      title: "Practice · Incidents: triage, containment, communication",
      bullets: [
        "1. Draft incident comms templates for leak vs. ransomware vs. credential loss.",
        "2. Tabletop scenario with timeline + owners.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "ds-m08-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Incident triage one-pager",
    },
    {
      id: "ds-m08-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "digital-safety::ds-m09-lesson": [
    {
      id: "ds-m09-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Team rituals: onboarding, offboarding, audits",
      body: "Treat outputs and tools as accountable artifacts—verification lanes before speed.\n\nAnchor “Team rituals: onboarding, offboarding, audits” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nBake hygiene into rituals—joiners get least privilege, leavers lose access predictably, audits stay lightweight.",
    },
    {
      id: "ds-m09-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Operational truth conditions for this module",
      body: "Primary outcome lens: Design onboarding moments that teach security without lecture.\n\nPractice spine you will revisit: Rewrite onboarding checklist with owners + timelines.",
    },
    {
      id: "ds-m09-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Draft a decision memo spine",
      body: "Pick one realistic thread implied by “Team rituals: onboarding, offboarding, audits”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Design onboarding moments that teach security without lecture.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "ds-m09-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "ds-m09-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "digital-safety::ds-m09-practice": [
    {
      id: "ds-m09-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "ds-m09-practice-lt-task",
      type: "practice_task",
      title: "Practice · Team rituals: onboarding, offboarding, audits",
      bullets: [
        "1. Rewrite onboarding checklist with owners + timelines.",
        "2. Simulate offboarding for a persona; note gaps.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "ds-m09-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "On/offboarding security addendum",
    },
    {
      id: "ds-m09-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "digital-safety::ds-m10-lesson": [
    {
      id: "ds-m10-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Safety pack assembly and reinforcement cadence",
      body: "Treat outputs and tools as accountable artifacts—verification lanes before speed.\n\nAnchor “Safety pack assembly and reinforcement cadence” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nIntegrate framing, hygiene, vendor, incident artifacts into an adoptable pack with revisit rhythm.",
    },
    {
      id: "ds-m10-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Operational truth conditions for this module",
      body: "Primary outcome lens: Merge modules without duplication or jargon walls.\n\nPractice spine you will revisit: Facilitate 20-minute review with teammates; capture objections.",
    },
    {
      id: "ds-m10-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Evidence ladder (short)",
      body: "Pick one realistic thread implied by “Safety pack assembly and reinforcement cadence”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Merge modules without duplication or jargon walls.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "ds-m10-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "ds-m10-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "digital-safety::ds-m10-practice": [
    {
      id: "ds-m10-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "ds-m10-practice-lt-task",
      type: "practice_task",
      title: "Practice · Safety pack assembly and reinforcement cadence",
      bullets: [
        "1. Facilitate 20-minute review with teammates; capture objections.",
        "2. Iterate pack based on feedback + cut fluff ruthlessly.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "ds-m10-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Safety pack v1",
    },
    {
      id: "ds-m10-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "digital-safety::ds-m10-recap": [
    {
      id: "ds-m10-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Safety pack assembly and reinforcement cadence",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "ds-m10-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Merge modules without duplication or jargon walls.",
        "Failure mode to watch: Integrate framing, hygiene, vendor, incident artifacts into an adoptable pack with revisit rhythm.…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "ds-m10-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "ds-m10-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "digital-safety::ds-m10-revision": [
    {
      id: "ds-m10-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Safety pack assembly and reinforcement cadence",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "ds-m10-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Merge modules without duplication or jargon walls.",
        "Define quarterly revisit triggers tied to risk changes.",
        "Measure adoption honestly (completion + friction notes).",
      ],
    },
    {
      id: "ds-m10-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "ds-m10-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "leadership-and-teams::lat-m01-practice": [
    {
      id: "lat-m01-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "lat-m01-practice-lt-task",
      type: "practice_task",
      title: "Practice · Leadership outcomes vs leadership theater",
      bullets: [
        "1. Score your last month: three outcomes vs. three theater patterns with evidence.",
        "2. Draft a leadership experiment card: intervention, signal, kill date.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "lat-m01-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Observable leadership goals sheet",
    },
    {
      id: "lat-m01-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "leadership-and-teams::lat-m01-revision": [
    {
      id: "lat-m01-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Leadership outcomes vs leadership theater",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "lat-m01-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Rewrite vague leadership goals into measurable signals over 30–60 days.",
        "Pick one leadership experiment with hypothesis and review date.",
        "Identify theater habits (performative urgency, vanity metrics) to drop or constrain.",
      ],
    },
    {
      id: "lat-m01-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "lat-m01-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "leadership-and-teams::lat-m02-lesson": [
    {
      id: "lat-m02-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Expectations, accountability, and psychological safety",
      body: "Treat this as role modeling—behavior others can cite and audit.\n\nAnchor “Expectations, accountability, and psychological safety” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nPair psychological safety with standards—clarity on what “good” means before empathy can land.",
    },
    {
      id: "lat-m02-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Observable behaviors this module targets",
      body: "Primary outcome lens: Write expectations as behaviors others can witness.\n\nPractice spine you will revisit: Expectations doc for one role: outcomes, cadence, escalation if missed.",
    },
    {
      id: "lat-m02-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Compress to a reviewer note",
      body: "Pick one realistic thread implied by “Expectations, accountability, and psychological safety”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Write expectations as behaviors others can witness.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "lat-m02-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might optimism hide missing evidence in your facilitation or leadership narrative? Name one patch.",
    },
    {
      id: "lat-m02-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "leadership-and-teams::lat-m02-practice": [
    {
      id: "lat-m02-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "lat-m02-practice-lt-task",
      type: "practice_task",
      title: "Practice · Expectations, accountability, and psychological safety",
      bullets: [
        "1. Expectations doc for one role: outcomes, cadence, escalation if missed.",
        "2. Outline an accountability conversation using facts → impact → next step.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "lat-m02-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Expectations + accountability outline",
    },
    {
      id: "lat-m02-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "leadership-and-teams::lat-m03-lesson": [
    {
      id: "lat-m03-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Decision rights and delegation that scales",
      body: "Treat this as role modeling—behavior others can cite and audit.\n\nAnchor “Decision rights and delegation that scales” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nMap who decides what, with escalation rails—delegation as outcomes + guardrails, not task dumping.",
    },
    {
      id: "lat-m03-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Observable behaviors this module targets",
      body: "Primary outcome lens: Assign decision owners for recurring classes of choices.\n\nPractice spine you will revisit: First-pass decision-rights map with escalation ladder.",
    },
    {
      id: "lat-m03-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Draft a decision memo spine",
      body: "Pick one realistic thread implied by “Decision rights and delegation that scales”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Assign decision owners for recurring classes of choices.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "lat-m03-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might optimism hide missing evidence in your facilitation or leadership narrative? Name one patch.",
    },
    {
      id: "lat-m03-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "leadership-and-teams::lat-m03-practice": [
    {
      id: "lat-m03-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "lat-m03-practice-lt-task",
      type: "practice_task",
      title: "Practice · Decision rights and delegation that scales",
      bullets: [
        "1. First-pass decision-rights map with escalation ladder.",
        "2. Delegation experiment: one outcome delegated with review gate written down.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "lat-m03-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Decision rights draft v1",
    },
    {
      id: "lat-m03-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "leadership-and-teams::lat-m03-recap": [
    {
      id: "lat-m03-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Decision rights and delegation that scales",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "lat-m03-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Assign decision owners for recurring classes of choices.",
        "Failure mode to watch: Map who decides what, with escalation rails—delegation as outcomes + guardrails, not task dumping.…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "lat-m03-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "lat-m03-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "leadership-and-teams::lat-m04-lesson": [
    {
      id: "lat-m04-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "1:1s that produce movement",
      body: "Treat this as role modeling—behavior others can cite and audit.\n\nAnchor “1:1s that produce movement” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nStructure conversations for truth and follow-through—agendas, notes, commitments with dates.",
    },
    {
      id: "lat-m04-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Observable behaviors this module targets",
      body: "Primary outcome lens: Design agendas that surface reality without ambushing.\n\nPractice spine you will revisit: Build a 1:1 template + run one trial; capture commitments log.",
    },
    {
      id: "lat-m04-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Evidence ladder (short)",
      body: "Pick one realistic thread implied by “1:1s that produce movement”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Design agendas that surface reality without ambushing.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "lat-m04-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might optimism hide missing evidence in your facilitation or leadership narrative? Name one patch.",
    },
    {
      id: "lat-m04-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "leadership-and-teams::lat-m04-practice": [
    {
      id: "lat-m04-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "lat-m04-practice-lt-task",
      type: "practice_task",
      title: "Practice · 1:1s that produce movement",
      bullets: [
        "1. Build a 1:1 template + run one trial; capture commitments log.",
        "2. Review past notes: where did follow-through drop—fix the system.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "lat-m04-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "1:1 system draft",
    },
    {
      id: "lat-m04-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "leadership-and-teams::lat-m06-lesson": [
    {
      id: "lat-m06-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Conflict repair and hard conversations",
      body: "Treat this as role modeling—behavior others can cite and audit.\n\nAnchor “Conflict repair and hard conversations” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nMove from drama to repair—plans, scripts, follow-up dates; know when HR/legal enters the frame.",
    },
    {
      id: "lat-m06-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Observable behaviors this module targets",
      body: "Primary outcome lens: De-escalate without abandoning standards.\n\nPractice spine you will revisit: Hard conversation plan: facts, impact, request, follow-up.",
    },
    {
      id: "lat-m06-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Trace one accountable thread",
      body: "Pick one realistic thread implied by “Conflict repair and hard conversations”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: De-escalate without abandoning standards.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "lat-m06-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might optimism hide missing evidence in your facilitation or leadership narrative? Name one patch.",
    },
    {
      id: "lat-m06-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "leadership-and-teams::lat-m07-practice": [
    {
      id: "lat-m07-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "lat-m07-practice-lt-task",
      type: "practice_task",
      title: "Practice · Team learning: retros, postmortems, blameless analysis",
      bullets: [
        "1. Draft retro facilitation guide with prompt list + anti-patterns.",
        "2. Complete postmortem template on a past team failure (real or realistic).",
        "3. Add a “signals to watch” section tying actions to observable metrics or proxies.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "lat-m07-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Retro + postmortem templates + signal follow-through notes",
    },
    {
      id: "lat-m07-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "leadership-and-teams::lat-m08-lesson": [
    {
      id: "lat-m08-lesson-lt-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Cross-team coordination without matrix swamp",
      body: "Treat this as role modeling—behavior others can cite and audit.\n\nAnchor “Cross-team coordination without matrix swamp” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nDefine interfaces between teams—handshake tests, lightweight SLA-style expectations (response windows, throughput), and escalation when interface KPIs slip.",
    },
    {
      id: "lat-m08-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Observable behaviors this module targets",
      body: "Primary outcome lens: Document interfaces with acceptance checks, not vibes.\n\nPractice spine you will revisit: Interface agreement for one messy cross-team dependency.",
    },
    {
      id: "lat-m08-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Compress to a reviewer note",
      body: "Pick one realistic thread implied by “Cross-team coordination without matrix swamp”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Document interfaces with acceptance checks, not vibes.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "lat-m08-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might optimism hide missing evidence in your facilitation or leadership narrative? Name one patch.",
    },
    {
      id: "lat-m08-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "leadership-and-teams::lat-m08-practice": [
    {
      id: "lat-m08-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "lat-m08-practice-lt-task",
      type: "practice_task",
      title: "Practice · Cross-team coordination without matrix swamp",
      bullets: [
        "1. Interface agreement for one messy cross-team dependency.",
        "2. Coordination cost audit: kill / merge / clarify meetings.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "lat-m08-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Interface agreement draft + interface health signals",
    },
    {
      id: "lat-m08-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "leadership-and-teams::lat-m09-lesson": [
    {
      id: "lat-m09-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Performance management with dignity",
      body: "Treat this as role modeling—behavior others can cite and audit.\n\nAnchor “Performance management with dignity” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nEarly signals, fair process, documented path—pair qualitative judgment with lightweight performance indicators (delivery, collaboration, quality of participation) appropriate to role.",
    },
    {
      id: "lat-m09-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Observable behaviors this module targets",
      body: "Primary outcome lens: Catch drift early with evidence trails—not single-number stack ranks.\n\nPractice spine you will revisit: Performance narrative tied to outcomes + behaviors + examples.",
    },
    {
      id: "lat-m09-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Draft a decision memo spine",
      body: "Pick one realistic thread implied by “Performance management with dignity”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Catch drift early with evidence trails—not single-number stack ranks.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "lat-m09-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might optimism hide missing evidence in your facilitation or leadership narrative? Name one patch.",
    },
    {
      id: "lat-m09-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "leadership-and-teams::lat-m09-practice": [
    {
      id: "lat-m09-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "lat-m09-practice-lt-task",
      type: "practice_task",
      title: "Practice · Performance management with dignity",
      bullets: [
        "1. Performance narrative tied to outcomes + behaviors + examples.",
        "2. Improvement plan outline with milestones, support offered, and review dates.",
        "3. Draft a humane metric/proxy policy: what you will never use as a blunt KPI.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "lat-m09-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Performance narrative + plan skeleton + review cadence note",
    },
    {
      id: "lat-m09-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "leadership-and-teams::lat-m10-lesson": [
    {
      id: "lat-m10-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Capstone rehearsal: operating system integration",
      body: "Treat this as role modeling—behavior others can cite and audit.\n\nAnchor “Capstone rehearsal: operating system integration” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nFold charter, decision rights, cadence, feedback, conflict repair into one pilotable operating system.",
    },
    {
      id: "lat-m10-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Observable behaviors this module targets",
      body: "Primary outcome lens: Merge artifacts into non-contradictory bundle.\n\nPractice spine you will revisit: Pilot plan with 30-day adoption experiment + success signals.",
    },
    {
      id: "lat-m10-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Evidence ladder (short)",
      body: "Pick one realistic thread implied by “Capstone rehearsal: operating system integration”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Merge artifacts into non-contradictory bundle.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "lat-m10-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might optimism hide missing evidence in your facilitation or leadership narrative? Name one patch.",
    },
    {
      id: "lat-m10-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "leadership-and-teams::lat-m10-practice": [
    {
      id: "lat-m10-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "lat-m10-practice-lt-task",
      type: "practice_task",
      title: "Practice · Capstone rehearsal: operating system integration",
      bullets: [
        "1. Pilot plan with 30-day adoption experiment + success signals.",
        "2. Synthesize feedback into v1.1 edits with rationale log.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "lat-m10-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Team health pack v1",
    },
    {
      id: "lat-m10-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "leadership-and-teams::lat-m10-recap": [
    {
      id: "lat-m10-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Capstone rehearsal: operating system integration",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "lat-m10-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Merge artifacts into non-contradictory bundle.",
        "Failure mode to watch: Fold charter, decision rights, cadence, feedback, conflict repair into one pilotable operating system.…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "lat-m10-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "lat-m10-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "leadership-and-teams::lat-m10-revision": [
    {
      id: "lat-m10-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Capstone rehearsal: operating system integration",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "lat-m10-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Merge artifacts into non-contradictory bundle.",
        "Run pilot plan with friction log.",
        "Iterate from feedback without scope explosion.",
      ],
    },
    {
      id: "lat-m10-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "lat-m10-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "marketing-and-growth::mg-m01-practice": [
    {
      id: "mg-m01-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "mg-m01-practice-lt-task",
      type: "practice_task",
      title: "Practice · Growth as disciplined demand learning—not vanity activity",
      bullets: [
        "1. Rewrite five vague KPIs into hypotheses + metric + timeframe + falsifier.",
        "2. Pick one lagging KPI; derive three leading indicators with data you could plausibly collect.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "mg-m01-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Demand-learning hypothesis sheet",
    },
    {
      id: "mg-m01-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "marketing-and-growth::mg-m01-revision": [
    {
      id: "mg-m01-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Growth as disciplined demand learning—not vanity activity",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "mg-m01-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Write three falsifiable hypotheses with measurable outcomes and falsifiers.",
        "Differentiate lagging KPIs from leading indicators you actually control.",
        "Expose vanity framing (“awareness”) and replace it with observable signals.",
      ],
    },
    {
      id: "mg-m01-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "mg-m01-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "marketing-and-growth::mg-m02-lesson": [
    {
      id: "mg-m02-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Audience evidence: substitutions, objections, proofs you already hold",
      body: "Treat this as finance- and stakeholder-ready reasoning—numbers, tradeoffs, and downside named.\n\nAnchor “Audience evidence: substitutions, objections, proofs you already hold” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nSegments from behavior—what people do, buy instead, stall on—not idealized personas. Compile proof assets honestly before spending creative.",
    },
    {
      id: "mg-m02-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Decisions and tradeoffs this module must clarify",
      body: "Primary outcome lens: Segment by buying situation and objection pattern—not demographics alone.\n\nPractice spine you will revisit: Five-row evidence table: datapoint, implication, credibility risk, next question.",
    },
    {
      id: "mg-m02-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Compress to a reviewer note",
      body: "Pick one realistic thread implied by “Audience evidence: substitutions, objections, proofs you already hold”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Segment by buying situation and objection pattern—not demographics alone.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "mg-m02-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "mg-m02-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "marketing-and-growth::mg-m02-practice": [
    {
      id: "mg-m02-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "mg-m02-practice-lt-task",
      type: "practice_task",
      title: "Practice · Audience evidence: substitutions, objections, proofs you already hold",
      bullets: [
        "1. Five-row evidence table: datapoint, implication, credibility risk, next question.",
        "2. Objection library with counter-message + proof requirement per objection.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "mg-m02-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Audience evidence appendix",
    },
    {
      id: "mg-m02-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "marketing-and-growth::mg-m03-lesson": [
    {
      id: "mg-m03-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Positioning spine: promise, wedge, refusal to pretend",
      body: "Treat this as finance- and stakeholder-ready reasoning—numbers, tradeoffs, and downside named.\n\nAnchor “Positioning spine: promise, wedge, refusal to pretend” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nArticulate category context, differentiated promise, and proof doctrine—explicitly naming what you will not claim.",
    },
    {
      id: "mg-m03-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Decisions and tradeoffs this module must clarify",
      body: "Primary outcome lens: Stress-test positioning against named competitors—not generic uniqueness.\n\nPractice spine you will revisit: Written critique: competitor comparison table → positioning adjustment.",
    },
    {
      id: "mg-m03-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Draft a decision memo spine",
      body: "Pick one realistic thread implied by “Positioning spine: promise, wedge, refusal to pretend”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Stress-test positioning against named competitors—not generic uniqueness.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "mg-m03-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "mg-m03-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "marketing-and-growth::mg-m03-practice": [
    {
      id: "mg-m03-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "mg-m03-practice-lt-task",
      type: "practice_task",
      title: "Practice · Positioning spine: promise, wedge, refusal to pretend",
      bullets: [
        "1. Written critique: competitor comparison table → positioning adjustment.",
        "2. Rewrite hero/header copy into spine + proof hook + disqualifier line.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "mg-m03-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Positioning spine + proof wedge draft",
    },
    {
      id: "mg-m03-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "marketing-and-growth::mg-m03-recap": [
    {
      id: "mg-m03-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Positioning spine: promise, wedge, refusal to pretend",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "mg-m03-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Stress-test positioning against named competitors—not generic uniqueness.",
        "Failure mode to watch: Articulate category context, differentiated promise, and proof doctrine—explicitly naming what you will not claim.…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "mg-m03-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "mg-m03-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "marketing-and-growth::mg-m04-lesson": [
    {
      id: "mg-m04-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Messaging architecture: claim ladder, proofs, tone guardrails",
      body: "Treat this as finance- and stakeholder-ready reasoning—numbers, tradeoffs, and downside named.\n\nAnchor “Messaging architecture: claim ladder, proofs, tone guardrails” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nTranslate positioning into layers—through-line, pillars, proofs—so creative diverges safely and compliance stays sane.",
    },
    {
      id: "mg-m04-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Decisions and tradeoffs this module must clarify",
      body: "Primary outcome lens: Sequence claims so variants stay on-brand and falsifiable.\n\nPractice spine you will revisit: Message matrix: segment × pillar × proof hook × risk flag.",
    },
    {
      id: "mg-m04-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Evidence ladder (short)",
      body: "Pick one realistic thread implied by “Messaging architecture: claim ladder, proofs, tone guardrails”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Sequence claims so variants stay on-brand and falsifiable.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "mg-m04-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "mg-m04-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "marketing-and-growth::mg-m04-practice": [
    {
      id: "mg-m04-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "mg-m04-practice-lt-task",
      type: "practice_task",
      title: "Practice · Messaging architecture: claim ladder, proofs, tone guardrails",
      bullets: [
        "1. Message matrix: segment × pillar × proof hook × risk flag.",
        "2. Proof gap sheet: claim → proof needed → owner → deadline.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "mg-m04-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Messaging architecture one-pager",
    },
    {
      id: "mg-m04-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "marketing-and-growth::mg-m06-lesson": [
    {
      id: "mg-m06-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Channel economics: fit, workload, sequencing experiments",
      body: "Treat this as finance- and stakeholder-ready reasoning—numbers, tradeoffs, and downside named.\n\nAnchor “Channel economics: fit, workload, sequencing experiments” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nPick channels as capital-limited bets—creative load, cash timing, and the KPI set (efficiency, volume, quality) you will watch per channel, with kill criteria explicit.",
    },
    {
      id: "mg-m06-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Decisions and tradeoffs this module must clarify",
      body: "Primary outcome lens: Score channel fit vs. audience behavior and proof needs.\n\nPractice spine you will revisit: Channel scorecard: fit, core KPIs, cost envelope, creative burden, kill rule when KPIs breach.",
    },
    {
      id: "mg-m06-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Trace one accountable thread",
      body: "Pick one realistic thread implied by “Channel economics: fit, workload, sequencing experiments”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Score channel fit vs. audience behavior and proof needs.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "mg-m06-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "mg-m06-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "marketing-and-growth::mg-m07-practice": [
    {
      id: "mg-m07-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "mg-m07-practice-lt-task",
      type: "practice_task",
      title: "Practice · Integrated campaign design: offer logic, narrative arc, landing story",
      bullets: [
        "1. Campaign brief: KPI targets + unknowns listed + smallest test next + owners named.",
        "2. Landing outline mapped to objections with proof placement + funnel-stage success metric per step.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "mg-m07-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Campaign brief v1 + campaign KPI ladder",
    },
    {
      id: "mg-m07-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "marketing-and-growth::mg-m08-lesson": [
    {
      id: "mg-m08-lesson-lt-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Conversion systems: friction, trust, ethics, follow-through",
      body: "Treat this as finance- and stakeholder-ready reasoning—numbers, tradeoffs, and downside named.\n\nAnchor “Conversion systems: friction, trust, ethics, follow-through” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nRaise conversion through clarity and trust—map funnel-stage KPIs (visit → intent → signup → activation) so fixes target measurable leaks, not opinions.",
    },
    {
      id: "mg-m08-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Decisions and tradeoffs this module must clarify",
      body: "Primary outcome lens: Qualitative funnel diagnosis anchored to conversion metrics and segment slices.\n\nPractice spine you will revisit: Heuristic walkthrough of live funnel: annotate friction points + hypothesized KPI impact.",
    },
    {
      id: "mg-m08-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Compress to a reviewer note",
      body: "Pick one realistic thread implied by “Conversion systems: friction, trust, ethics, follow-through”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Qualitative funnel diagnosis anchored to conversion metrics and segment slices.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "mg-m08-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "mg-m08-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "marketing-and-growth::mg-m08-practice": [
    {
      id: "mg-m08-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "mg-m08-practice-lt-task",
      type: "practice_task",
      title: "Practice · Conversion systems: friction, trust, ethics, follow-through",
      bullets: [
        "1. Heuristic walkthrough of live funnel: annotate friction points + hypothesized KPI impact.",
        "2. Rewrite three microcopy moments with ethics + rationale notes + expected metric direction.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "mg-m08-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Conversion friction audit + funnel KPI notes + ethical microcopy sheet",
    },
    {
      id: "mg-m08-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "marketing-and-growth::mg-m09-lesson": [
    {
      id: "mg-m09-lesson-lt-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Growth KPIs, dashboards, and analytics under uncertainty",
      body: "Treat this as finance- and stakeholder-ready reasoning—numbers, tradeoffs, and downside named.\n\nAnchor “Growth KPIs, dashboards, and analytics under uncertainty” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nOwn the growth performance story: pick campaign and channel KPIs deliberately, read dashboard and export views skeptically (filters, cohorts, windows), translate weekly metrics into decisions—not vanity recap—with incrementality humility.",
    },
    {
      id: "mg-m09-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Decisions and tradeoffs this module must clarify",
      body: "Primary outcome lens: Build a compact growth KPI tree (north-star growth outcome → channel/campaign drivers → diagnostics).\n\nPractice spine you will revisit: Experiment brief: hypothesis, unit of randomization, ethics, minimum detectable effect, primary KPI + guardrails.",
    },
    {
      id: "mg-m09-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Draft a decision memo spine",
      body: "Pick one realistic thread implied by “Growth KPIs, dashboards, and analytics under uncertainty”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Build a compact growth KPI tree (north-star growth outcome → channel/campaign drivers → diagnostics).",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "mg-m09-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "mg-m09-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "marketing-and-growth::mg-m09-practice": [
    {
      id: "mg-m09-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "mg-m09-practice-lt-task",
      type: "practice_task",
      title: "Practice · Growth KPIs, dashboards, and analytics under uncertainty",
      bullets: [
        "1. Experiment brief: hypothesis, unit of randomization, ethics, minimum detectable effect, primary KPI + guardrails.",
        "2. Annotate a growth dashboard or export pack: write the decision each chart supports and three misread risks.",
        "3. Weekly growth metrics memo: learning, surprises, kill/pivot triggers, next action—not activity recap.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "mg-m09-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Growth KPI tree + experiment brief + weekly dashboard review memo template",
    },
    {
      id: "mg-m09-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "marketing-and-growth::mg-m09-revision": [
    {
      id: "mg-m09-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Growth KPIs, dashboards, and analytics under uncertainty",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "mg-m09-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Build a compact growth KPI tree (north-star growth outcome → channel/campaign drivers → diagnostics).",
        "Explain attribution ceilings, platform bias, and confounders to executives plainly.",
        "Design experiments sized to decisions—kill rules when KPIs or guardrails breach.",
      ],
    },
    {
      id: "mg-m09-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "mg-m09-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "marketing-and-growth::mg-m10-lesson": [
    {
      id: "mg-m10-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "AI in the growth stack: amplification with verification",
      body: "Treat this as finance- and stakeholder-ready reasoning—numbers, tradeoffs, and downside named.\n\nAnchor “AI in the growth stack: amplification with verification” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nUse AI for drafts, variants, and research support only under explicit QA—rubric-first review, proof-doctrine checks, and incident-style logging when claims or tone drift, so amplification never outruns evidence you can show in the dossier.",
    },
    {
      id: "mg-m10-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Decisions and tradeoffs this module must clarify",
      body: "Primary outcome lens: Insert rubric-based QA before anything ships.\n\nPractice spine you will revisit: Score a variant batch against rubric + revise weakest.",
    },
    {
      id: "mg-m10-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Evidence ladder (short)",
      body: "Pick one realistic thread implied by “AI in the growth stack: amplification with verification”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Insert rubric-based QA before anything ships.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "mg-m10-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "mg-m10-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "marketing-and-growth::mg-m10-practice": [
    {
      id: "mg-m10-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "mg-m10-practice-lt-task",
      type: "practice_task",
      title: "Practice · AI in the growth stack: amplification with verification",
      bullets: [
        "1. Score a variant batch against rubric + revise weakest.",
        "2. Red-team AI-generated claims against proof doctrine.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "mg-m10-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "AI-assisted QA checklist",
    },
    {
      id: "mg-m10-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "marketing-and-growth::mg-m10-revision": [
    {
      id: "mg-m10-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · AI in the growth stack: amplification with verification",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "mg-m10-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Insert rubric-based QA before anything ships.",
        "Maintain guardrails on claims and tone.",
        "Red-team outputs for hallucinated proof.",
      ],
    },
    {
      id: "mg-m10-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "mg-m10-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "marketing-and-growth::mg-m11-lesson": [
    {
      id: "mg-m11-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Campaign dossier rehearsal: critique, tighten, ship v1",
      body: "Treat this as finance- and stakeholder-ready reasoning—numbers, tradeoffs, and downside named.\n\nAnchor “Campaign dossier rehearsal: critique, tighten, ship v1” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nMerge spine, experiments, assets, measurement, and risk sections into one CFO- and customer-credible dossier—trace each deliverable to prior module outputs, then cut scope until every claim maps to proof or an honest gap.",
    },
    {
      id: "mg-m11-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Decisions and tradeoffs this module must clarify",
      body: "Primary outcome lens: Integrate artifacts into single narrative arc.\n\nPractice spine you will revisit: Structured peer critique using dossier rubric.",
    },
    {
      id: "mg-m11-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Concrete walkthrough",
      body: "Pick one realistic thread implied by “Campaign dossier rehearsal: critique, tighten, ship v1”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Integrate artifacts into single narrative arc.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "mg-m11-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "mg-m11-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "marketing-and-growth::mg-m11-practice": [
    {
      id: "mg-m11-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "mg-m11-practice-lt-task",
      type: "practice_task",
      title: "Practice · Campaign dossier rehearsal: critique, tighten, ship v1",
      bullets: [
        "1. Structured peer critique using dossier rubric.",
        "2. Revision log: cuts, additions, deferred ideas.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "mg-m11-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Growth dossier v1",
    },
    {
      id: "mg-m11-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "marketing-and-growth::mg-m11-recap": [
    {
      id: "mg-m11-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Campaign dossier rehearsal: critique, tighten, ship v1",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "mg-m11-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Integrate artifacts into single narrative arc.",
        "Failure mode to watch: Merge spine, experiments, assets, measurement, and risk sections into one CFO- and customer-credible dossier—trace each …",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "mg-m11-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "mg-m11-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "marketing-and-growth::mg-m11-revision": [
    {
      id: "mg-m11-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Campaign dossier rehearsal: critique, tighten, ship v1",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "mg-m11-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Integrate artifacts into single narrative arc.",
        "Accept critique without expanding scope blindly.",
        "Ship v1 strong enough to learn from.",
      ],
    },
    {
      id: "mg-m11-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "mg-m11-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "money-and-finance::mf-m01-practice": [
    {
      id: "mf-m01-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "mf-m01-practice-lt-task",
      type: "practice_task",
      title: "Practice · Cash vs. profit vs. runway—language tied to decisions",
      bullets: [
        "1. Sanity-pass a simple P&L against a rolling cash planner for same month.",
        "2. Diagram timing for three recurring obligations with due dates.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "mf-m01-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Cash vs accrual reconciliation sheet",
    },
    {
      id: "mf-m01-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "money-and-finance::mf-m01-revision": [
    {
      id: "mf-m01-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Cash vs. profit vs. runway—language tied to decisions",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "mf-m01-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Translate cash in/out vs. accrual snapshots for one context.",
        "Identify timing traps (payroll, deposits, inventory, net terms).",
        "Ask finance questions anchored to upcoming decisions—not vague worry.",
      ],
    },
    {
      id: "mf-m01-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "mf-m01-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "money-and-finance::mf-m02-lesson": [
    {
      id: "mf-m02-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Budget as operating instrument: envelopes, variance, owners",
      body: "Treat this as finance- and stakeholder-ready reasoning—numbers, tradeoffs, and downside named.\n\nAnchor “Budget as operating instrument: envelopes, variance, owners” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nDesign categories people behave against—trigger rules when reality diverges, owners per line.",
    },
    {
      id: "mf-m02-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Decisions and tradeoffs this module must clarify",
      body: "Primary outcome lens: Pick categories that change behavior—not too aggregate, not too granular.\n\nPractice spine you will revisit: Budget draft with variance triggers + escalation owner per category.",
    },
    {
      id: "mf-m02-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Compress to a reviewer note",
      body: "Pick one realistic thread implied by “Budget as operating instrument: envelopes, variance, owners”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Pick categories that change behavior—not too aggregate, not too granular.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "mf-m02-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "mf-m02-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "money-and-finance::mf-m02-practice": [
    {
      id: "mf-m02-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "mf-m02-practice-lt-task",
      type: "practice_task",
      title: "Practice · Budget as operating instrument: envelopes, variance, owners",
      bullets: [
        "1. Budget draft with variance triggers + escalation owner per category.",
        "2. Rewrite one mushy category into measurable definition.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "mf-m02-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Category budget draft + variance triggers",
    },
    {
      id: "mf-m02-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "money-and-finance::mf-m03-lesson": [
    {
      id: "mf-m03-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Contribution and payback thinking without spreadsheet idolatry",
      body: "Treat this as finance- and stakeholder-ready reasoning—numbers, tradeoffs, and downside named.\n\nAnchor “Contribution and payback thinking without spreadsheet idolatry” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nEstimate unit contribution at legible fidelity—stress-test assumptions manually before trusting models.",
    },
    {
      id: "mf-m03-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Decisions and tradeoffs this module must clarify",
      body: "Primary outcome lens: Sketch contribution for one priced offer.\n\nPractice spine you will revisit: Manual contribution sketch + sensitivity grid.",
    },
    {
      id: "mf-m03-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Draft a decision memo spine",
      body: "Pick one realistic thread implied by “Contribution and payback thinking without spreadsheet idolatry”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Sketch contribution for one priced offer.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "mf-m03-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "mf-m03-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "money-and-finance::mf-m03-practice": [
    {
      id: "mf-m03-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "mf-m03-practice-lt-task",
      type: "practice_task",
      title: "Practice · Contribution and payback thinking without spreadsheet idolatry",
      bullets: [
        "1. Manual contribution sketch + sensitivity grid.",
        "2. Write kill criteria for when to revisit pricing or cost structure.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "mf-m03-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Contribution sketch + sensitivity grid",
    },
    {
      id: "mf-m03-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "money-and-finance::mf-m04-lesson": [
    {
      id: "mf-m04-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Forecasting as scenario chore, not prophecy",
      body: "Treat this as finance- and stakeholder-ready reasoning—numbers, tradeoffs, and downside named.\n\nAnchor “Forecasting as scenario chore, not prophecy” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nBest/base/stress stories with named drivers—schedule revisions when facts change.",
    },
    {
      id: "mf-m04-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Decisions and tradeoffs this module must clarify",
      body: "Primary outcome lens: Build narratives with explicit driver list.\n\nPractice spine you will revisit: Three-scenario worksheet with driver sensitivity notes.",
    },
    {
      id: "mf-m04-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Evidence ladder (short)",
      body: "Pick one realistic thread implied by “Forecasting as scenario chore, not prophecy”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Build narratives with explicit driver list.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "mf-m04-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "mf-m04-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "money-and-finance::mf-m04-practice": [
    {
      id: "mf-m04-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "mf-m04-practice-lt-task",
      type: "practice_task",
      title: "Practice · Forecasting as scenario chore, not prophecy",
      bullets: [
        "1. Three-scenario worksheet with driver sensitivity notes.",
        "2. Pre-mortem on optimistic scenario—what breaks first?",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "mf-m04-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Scenario memo v1",
    },
    {
      id: "mf-m04-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "money-and-finance::mf-m06-lesson": [
    {
      id: "mf-m06-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Debt, leverage, risk appetite—without catastrophizing",
      body: "Treat this as finance- and stakeholder-ready reasoning—numbers, tradeoffs, and downside named.\n\nAnchor “Debt, leverage, risk appetite—without catastrophizing” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nUnderstand obligations as structured choices—know when DIY ends and professionals enter.",
    },
    {
      id: "mf-m06-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Decisions and tradeoffs this module must clarify",
      body: "Primary outcome lens: Compare instruments by payment shape, covenant risk, optionality.\n\nPractice spine you will revisit: Leverage scenario sketch with stress payments.",
    },
    {
      id: "mf-m06-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Trace one accountable thread",
      body: "Pick one realistic thread implied by “Debt, leverage, risk appetite—without catastrophizing”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Compare instruments by payment shape, covenant risk, optionality.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "mf-m06-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "mf-m06-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "money-and-finance::mf-m06-revision": [
    {
      id: "mf-m06-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Debt, leverage, risk appetite—without catastrophizing",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "mf-m06-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Compare instruments by payment shape, covenant risk, optionality.",
        "State risk appetite as numbers + emotional facts.",
        "Escalate to qualified help with crisp questions.",
      ],
    },
    {
      id: "mf-m06-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "mf-m06-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "money-and-finance::mf-m07-practice": [
    {
      id: "mf-m07-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "mf-m07-practice-lt-task",
      type: "practice_task",
      title: "Practice · Negotiating money: packages, trade space, calm process",
      bullets: [
        "1. Prep sheet for next real money conversation.",
        "2. Short role-play debrief on tone + clarity.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "mf-m07-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Money negotiation prep sheet",
    },
    {
      id: "mf-m07-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "money-and-finance::mf-m08-lesson": [
    {
      id: "mf-m08-lesson-lt-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Numbers that earn trust: reporting rhythm and definitions",
      body: "Treat this as finance- and stakeholder-ready reasoning—numbers, tradeoffs, and downside named.\n\nAnchor “Numbers that earn trust: reporting rhythm and definitions” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nDeliver finance updates people read—definitions attached, bad news early, cadence predictable.",
    },
    {
      id: "mf-m08-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Decisions and tradeoffs this module must clarify",
      body: "Primary outcome lens: Design lightweight reporting rhythm for your audience.\n\nPractice spine you will revisit: Critique a noisy report; propose cleaner structure.",
    },
    {
      id: "mf-m08-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Compress to a reviewer note",
      body: "Pick one realistic thread implied by “Numbers that earn trust: reporting rhythm and definitions”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Design lightweight reporting rhythm for your audience.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "mf-m08-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "mf-m08-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "money-and-finance::mf-m08-practice": [
    {
      id: "mf-m08-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "mf-m08-practice-lt-task",
      type: "practice_task",
      title: "Practice · Numbers that earn trust: reporting rhythm and definitions",
      bullets: [
        "1. Critique a noisy report; propose cleaner structure.",
        "2. Rewrite anxious metrics paragraph into calm story + actions.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "mf-m08-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Finance narrative + definitions appendix",
    },
    {
      id: "mf-m08-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "money-and-finance::mf-m09-lesson": [
    {
      id: "mf-m09-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Systems for recurring money decisions",
      body: "Treat this as finance- and stakeholder-ready reasoning—numbers, tradeoffs, and downside named.\n\nAnchor “Systems for recurring money decisions” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nAutomate safe parts; escalate judgment calls—calendar triggers, minimal instrumentation, anti-gaming habits.",
    },
    {
      id: "mf-m09-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Decisions and tradeoffs this module must clarify",
      body: "Primary outcome lens: Define triggers that force reviews without alarm fatigue.\n\nPractice spine you will revisit: Finance calendar with triggers + owners.",
    },
    {
      id: "mf-m09-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Draft a decision memo spine",
      body: "Pick one realistic thread implied by “Systems for recurring money decisions”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Define triggers that force reviews without alarm fatigue.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "mf-m09-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "mf-m09-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "money-and-finance::mf-m09-practice": [
    {
      id: "mf-m09-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "mf-m09-practice-lt-task",
      type: "practice_task",
      title: "Practice · Systems for recurring money decisions",
      bullets: [
        "1. Finance calendar with triggers + owners.",
        "2. Quarterly review ritual outline with agenda.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "mf-m09-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Finance operating calendar",
    },
    {
      id: "mf-m09-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "money-and-finance::mf-m10-lesson": [
    {
      id: "mf-m10-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Capstone rehearsal: integrate the pack",
      body: "Treat this as finance- and stakeholder-ready reasoning—numbers, tradeoffs, and downside named.\n\nAnchor “Capstone rehearsal: integrate the pack” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nMerge artifacts into one reusable pack—plain language, dated snapshots, critique, refresh plan.",
    },
    {
      id: "mf-m10-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Decisions and tradeoffs this module must clarify",
      body: "Primary outcome lens: Assemble outputs into coherent narrative.\n\nPractice spine you will revisit: Walkthrough with reviewer using rubric.",
    },
    {
      id: "mf-m10-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Evidence ladder (short)",
      body: "Pick one realistic thread implied by “Capstone rehearsal: integrate the pack”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Assemble outputs into coherent narrative.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "mf-m10-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "mf-m10-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "money-and-finance::mf-m10-practice": [
    {
      id: "mf-m10-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "mf-m10-practice-lt-task",
      type: "practice_task",
      title: "Practice · Capstone rehearsal: integrate the pack",
      bullets: [
        "1. Walkthrough with reviewer using rubric.",
        "2. Second pass tightening numbers + narrative.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "mf-m10-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Finance action pack v1",
    },
    {
      id: "mf-m10-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "money-and-finance::mf-m10-recap": [
    {
      id: "mf-m10-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Capstone rehearsal: integrate the pack",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "mf-m10-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Assemble outputs into coherent narrative.",
        "Failure mode to watch: Merge artifacts into one reusable pack—plain language, dated snapshots, critique, refresh plan.…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "mf-m10-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "mf-m10-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "money-and-finance::mf-m10-revision": [
    {
      id: "mf-m10-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Capstone rehearsal: integrate the pack",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "mf-m10-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Assemble outputs into coherent narrative.",
        "Invite trusted reviewer; log revisions.",
        "Commit to monthly refresh ritual.",
      ],
    },
    {
      id: "mf-m10-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "mf-m10-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "product-thinking::prd-m01-practice": [
    {
      id: "prd-m01-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "prd-m01-practice-lt-task",
      type: "practice_task",
      title: "Practice · Outcomes before outputs: behaviors, pains, proof gaps",
      bullets: [
        "1. Rewrite five “features” into outcome statements with measures.",
        "2. Journal last purchase: job, anxiety, alternate solutions.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "prd-m01-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Outcome rewrite sheet + jobs-to-be-done journal",
    },
    {
      id: "prd-m01-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "product-thinking::prd-m01-revision": [
    {
      id: "prd-m01-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Outcomes before outputs: behaviors, pains, proof gaps",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "prd-m01-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Rewrite feature ideas into measurable user or business outcomes.",
        "Separate problem diagnosis from favored solution.",
        "Catch solution attachment early.",
      ],
    },
    {
      id: "prd-m01-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "prd-m01-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "product-thinking::prd-m02-lesson": [
    {
      id: "prd-m02-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Discovery conversations that stay honest",
      body: "Treat this as finance- and stakeholder-ready reasoning—numbers, tradeoffs, and downside named.\n\nAnchor “Discovery conversations that stay honest” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nPrompts that reveal reality; synthesis that preserves contradiction and uncertainty.",
    },
    {
      id: "prd-m02-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Decisions and tradeoffs this module must clarify",
      body: "Primary outcome lens: Draft non-leading discovery prompts.\n\nPractice spine you will revisit: Interview guide + bias checklist.",
    },
    {
      id: "prd-m02-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Compress to a reviewer note",
      body: "Pick one realistic thread implied by “Discovery conversations that stay honest”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Draft non-leading discovery prompts.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "prd-m02-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "prd-m02-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "product-thinking::prd-m02-practice": [
    {
      id: "prd-m02-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "prd-m02-practice-lt-task",
      type: "practice_task",
      title: "Practice · Discovery conversations that stay honest",
      bullets: [
        "1. Interview guide + bias checklist.",
        "2. Mock interview + critique on neutrality.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "prd-m02-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Discovery interview guide + synthesis notes",
    },
    {
      id: "prd-m02-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "product-thinking::prd-m03-lesson": [
    {
      id: "prd-m03-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Problem statements investors and builders can argue with",
      body: "Treat this as finance- and stakeholder-ready reasoning—numbers, tradeoffs, and downside named.\n\nAnchor “Problem statements investors and builders can argue with” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nFrame problems tightly enough to prioritize—who hurts, how you know, what proof would falsify.",
    },
    {
      id: "prd-m03-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Decisions and tradeoffs this module must clarify",
      body: "Primary outcome lens: Produce falsifiable problem formulations.\n\nPractice spine you will revisit: Problem matrix across segments + severity signals.",
    },
    {
      id: "prd-m03-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Draft a decision memo spine",
      body: "Pick one realistic thread implied by “Problem statements investors and builders can argue with”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Produce falsifiable problem formulations.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "prd-m03-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "prd-m03-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "product-thinking::prd-m03-practice": [
    {
      id: "prd-m03-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "prd-m03-practice-lt-task",
      type: "practice_task",
      title: "Practice · Problem statements investors and builders can argue with",
      bullets: [
        "1. Problem matrix across segments + severity signals.",
        "2. Structured peer tear-down.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "prd-m03-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Problem matrix + falsifiable problem brief",
    },
    {
      id: "prd-m03-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "product-thinking::prd-m03-recap": [
    {
      id: "prd-m03-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Problem statements investors and builders can argue with",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "prd-m03-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Produce falsifiable problem formulations.",
        "Failure mode to watch: Frame problems tightly enough to prioritize—who hurts, how you know, what proof would falsify.…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "prd-m03-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "prd-m03-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "product-thinking::prd-m04-lesson": [
    {
      id: "prd-m04-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Prioritization with accountable trade-offs",
      body: "Treat this as finance- and stakeholder-ready reasoning—numbers, tradeoffs, and downside named.\n\nAnchor “Prioritization with accountable trade-offs” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nPick frameworks deliberately—every priority implies deprioritized work surfaced explicitly—and tie bets to measurable signals (leading indicators, guardrails) you will review after ship.",
    },
    {
      id: "prd-m04-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Decisions and tradeoffs this module must clarify",
      body: "Primary outcome lens: Document scoring assumptions others can inspect.\n\nPractice spine you will revisit: Rank five initiatives with explicit cuts + rationale + signal you would watch per item.",
    },
    {
      id: "prd-m04-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Evidence ladder (short)",
      body: "Pick one realistic thread implied by “Prioritization with accountable trade-offs”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Document scoring assumptions others can inspect.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "prd-m04-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "prd-m04-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "product-thinking::prd-m04-practice": [
    {
      id: "prd-m04-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "prd-m04-practice-lt-task",
      type: "practice_task",
      title: "Practice · Prioritization with accountable trade-offs",
      bullets: [
        "1. Rank five initiatives with explicit cuts + rationale + signal you would watch per item.",
        "2. Deprioritization note stakeholders can forward.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "prd-m04-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Prioritized backlog + prioritization signals memo",
    },
    {
      id: "prd-m04-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "product-thinking::prd-m06-lesson": [
    {
      id: "prd-m06-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Partnering with design & engineering without ping-pong",
      body: "Treat this as finance- and stakeholder-ready reasoning—numbers, tradeoffs, and downside named.\n\nAnchor “Partnering with design & engineering without ping-pong” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nShip specs with crisp acceptance criteria and feasibility empathy—joint sketches, explicit tradeoffs, and decision logs so design and engineering stop ping-ponging rework.",
    },
    {
      id: "prd-m06-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Decisions and tradeoffs this module must clarify",
      body: "Primary outcome lens: Author acceptance criteria testable without interpretation fights.\n\nPractice spine you will revisit: Spec critique with designers/engineers role-play.",
    },
    {
      id: "prd-m06-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Trace one accountable thread",
      body: "Pick one realistic thread implied by “Partnering with design & engineering without ping-pong”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Author acceptance criteria testable without interpretation fights.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "prd-m06-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "prd-m06-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "product-thinking::prd-m07-practice": [
    {
      id: "prd-m07-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "prd-m07-practice-lt-task",
      type: "practice_task",
      title: "Practice · Shipping to learn: launches, instrumentation discipline",
      bullets: [
        "1. Launch checklist + kill switch + primary KPI & guardrail definitions.",
        "2. Learning plan template for post-launch window with weekly metric read agenda.",
        "3. Draft a “metric dictionary” snippet engineers/analytics can align to.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "prd-m07-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Launch readiness + KPI dictionary slice + learning plan",
    },
    {
      id: "prd-m07-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "product-thinking::prd-m08-lesson": [
    {
      id: "prd-m08-lesson-lt-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Stakeholder alignment without status theater",
      body: "Treat this as finance- and stakeholder-ready reasoning—numbers, tradeoffs, and downside named.\n\nAnchor “Stakeholder alignment without status theater” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nReplace noisy status with metric-grounded narratives—exec updates tie roadmap bets to KPI movement, risks, and decisions needed; async-first with explicit escalation rails.",
    },
    {
      id: "prd-m08-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Decisions and tradeoffs this module must clarify",
      body: "Primary outcome lens: Compress sprawling updates into exec narrative: bets, KPI variance vs. hypothesis, asks.\n\nPractice spine you will revisit: Rewrite sprawling status doc into crisp update with KPI lines + decision ask.",
    },
    {
      id: "prd-m08-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Compress to a reviewer note",
      body: "Pick one realistic thread implied by “Stakeholder alignment without status theater”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Compress sprawling updates into exec narrative: bets, KPI variance vs. hypothesis, asks.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "prd-m08-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "prd-m08-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "product-thinking::prd-m08-practice": [
    {
      id: "prd-m08-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "prd-m08-practice-lt-task",
      type: "practice_task",
      title: "Practice · Stakeholder alignment without status theater",
      bullets: [
        "1. Rewrite sprawling status doc into crisp update with KPI lines + decision ask.",
        "2. Conflict rehearsal with facilitator notes.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "prd-m08-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Executive-ready status update + KPI variance snippet",
    },
    {
      id: "prd-m08-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "product-thinking::prd-m09-lesson": [
    {
      id: "prd-m09-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Ethics, consent, proportionality in research and UX",
      body: "Treat this as finance- and stakeholder-ready reasoning—numbers, tradeoffs, and downside named.\n\nAnchor “Ethics, consent, proportionality in research and UX” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nResearch and ship respectfully—consent boundaries, dark-pattern vigilance, proportionate data.",
    },
    {
      id: "prd-m09-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Decisions and tradeoffs this module must clarify",
      body: "Primary outcome lens: Outline consent posture for discovery.\n\nPractice spine you will revisit: Ethics worksheet applied to live flow.",
    },
    {
      id: "prd-m09-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Draft a decision memo spine",
      body: "Pick one realistic thread implied by “Ethics, consent, proportionality in research and UX”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Outline consent posture for discovery.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "prd-m09-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "prd-m09-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "product-thinking::prd-m09-practice": [
    {
      id: "prd-m09-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "prd-m09-practice-lt-task",
      type: "practice_task",
      title: "Practice · Ethics, consent, proportionality in research and UX",
      bullets: [
        "1. Ethics worksheet applied to live flow.",
        "2. Rewrite manipulative microcopy responsibly.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "prd-m09-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Ethics & consent review sheet",
    },
    {
      id: "prd-m09-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "product-thinking::prd-m10-lesson": [
    {
      id: "prd-m10-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Concept package rehearsal: critique + versioning",
      body: "Treat this as finance- and stakeholder-ready reasoning—numbers, tradeoffs, and downside named.\n\nAnchor “Concept package rehearsal: critique + versioning” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nMerge discovery, bets, roadmap, metrics, and ethics notes into one concept package—pressure-test with a skeptical panel, then version changes so capstone reviewers can trace every shift.",
    },
    {
      id: "prd-m10-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Decisions and tradeoffs this module must clarify",
      body: "Primary outcome lens: Unify artifacts into single storyline.\n\nPractice spine you will revisit: Dry-run review with rubric.",
    },
    {
      id: "prd-m10-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Evidence ladder (short)",
      body: "Pick one realistic thread implied by “Concept package rehearsal: critique + versioning”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Unify artifacts into single storyline.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "prd-m10-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "prd-m10-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "product-thinking::prd-m10-practice": [
    {
      id: "prd-m10-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "prd-m10-practice-lt-task",
      type: "practice_task",
      title: "Practice · Concept package rehearsal: critique + versioning",
      bullets: [
        "1. Dry-run review with rubric.",
        "2. Revision pass from consolidated feedback log.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "prd-m10-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Product concept package v1",
    },
    {
      id: "prd-m10-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "product-thinking::prd-m10-recap": [
    {
      id: "prd-m10-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Concept package rehearsal: critique + versioning",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "prd-m10-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Unify artifacts into single storyline.",
        "Failure mode to watch: Merge discovery, bets, roadmap, metrics, and ethics notes into one concept package—pressure-test with a skeptical panel,…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "prd-m10-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "prd-m10-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "product-thinking::prd-m10-revision": [
    {
      id: "prd-m10-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Concept package rehearsal: critique + versioning",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "prd-m10-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Unify artifacts into single storyline.",
        "Invite sharp critique; triage feedback.",
        "Maintain version history for accountable change.",
      ],
    },
    {
      id: "prd-m10-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "prd-m10-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "project-execution::pex-m01-practice": [
    {
      id: "pex-m01-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "pex-m01-practice-lt-task",
      type: "practice_task",
      title: "Practice · Intent, scope, success signals, and explicit non-goals",
      bullets: [
        "1. Charter skeleton for live initiative with assumption table.",
        "2. Non-goals list with rationale each line.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "pex-m01-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Charter skeleton + assumption / non-goals table",
    },
    {
      id: "pex-m01-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "project-execution::pex-m01-revision": [
    {
      id: "pex-m01-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Intent, scope, success signals, and explicit non-goals",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "pex-m01-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Draft measurable success signals stakeholders can inspect.",
        "List scope boundaries and explicit non-goals.",
        "Expose hidden commitments masquerading as tasks.",
      ],
    },
    {
      id: "pex-m01-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "pex-m01-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "project-execution::pex-m02-lesson": [
    {
      id: "pex-m02-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Stakeholders, decisions, and authority clarity",
      body: "Treat this as finance- and stakeholder-ready reasoning—numbers, tradeoffs, and downside named.\n\nAnchor “Stakeholders, decisions, and authority clarity” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nMap who decides what—trim approval theater, surface silent stakeholders early.",
    },
    {
      id: "pex-m02-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Decisions and tradeoffs this module must clarify",
      body: "Primary outcome lens: Assign decision rights with escalation paths.\n\nPractice spine you will revisit: Decision-rights map + RACI where it earns its keep.",
    },
    {
      id: "pex-m02-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Compress to a reviewer note",
      body: "Pick one realistic thread implied by “Stakeholders, decisions, and authority clarity”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Assign decision rights with escalation paths.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "pex-m02-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "pex-m02-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "project-execution::pex-m02-practice": [
    {
      id: "pex-m02-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "pex-m02-practice-lt-task",
      type: "practice_task",
      title: "Practice · Stakeholders, decisions, and authority clarity",
      bullets: [
        "1. Decision-rights map + RACI where it earns its keep.",
        "2. Two-week decision log trial.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "pex-m02-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Stakeholder + decision-rights map",
    },
    {
      id: "pex-m02-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "project-execution::pex-m03-lesson": [
    {
      id: "pex-m03-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Plans as hypotheses: milestones, buffers, assumptions",
      body: "Treat this as finance- and stakeholder-ready reasoning—numbers, tradeoffs, and downside named.\n\nAnchor “Plans as hypotheses: milestones, buffers, assumptions” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nMilestones admit unknowns—buffers justified, assumptions visible, pivot triggers explicit.",
    },
    {
      id: "pex-m03-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Decisions and tradeoffs this module must clarify",
      body: "Primary outcome lens: Choose fidelity fit to horizon.\n\nPractice spine you will revisit: Milestone map v1 with buffer rationale.",
    },
    {
      id: "pex-m03-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Draft a decision memo spine",
      body: "Pick one realistic thread implied by “Plans as hypotheses: milestones, buffers, assumptions”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Choose fidelity fit to horizon.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "pex-m03-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "pex-m03-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "project-execution::pex-m03-practice": [
    {
      id: "pex-m03-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "pex-m03-practice-lt-task",
      type: "practice_task",
      title: "Practice · Plans as hypotheses: milestones, buffers, assumptions",
      bullets: [
        "1. Milestone map v1 with buffer rationale.",
        "2. Assumption table with owners + review dates.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "pex-m03-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Milestone map + assumption register",
    },
    {
      id: "pex-m03-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "project-execution::pex-m03-recap": [
    {
      id: "pex-m03-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Plans as hypotheses: milestones, buffers, assumptions",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "pex-m03-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Choose fidelity fit to horizon.",
        "Failure mode to watch: Milestones admit unknowns—buffers justified, assumptions visible, pivot triggers explicit.…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "pex-m03-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "pex-m03-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "project-execution::pex-m04-lesson": [
    {
      id: "pex-m04-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Dependencies, interfaces, integration risk",
      body: "Treat this as finance- and stakeholder-ready reasoning—numbers, tradeoffs, and downside named.\n\nAnchor “Dependencies, interfaces, integration risk” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nModel the dependency graph across teams, systems, and approvals—then lock handshake agreements with acceptance checks so integration risk surfaces before dates turn into blame.",
    },
    {
      id: "pex-m04-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Decisions and tradeoffs this module must clarify",
      body: "Primary outcome lens: Model dependencies without fantasy sequentialism.\n\nPractice spine you will revisit: Dependency graph with critical handshakes highlighted.",
    },
    {
      id: "pex-m04-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Evidence ladder (short)",
      body: "Pick one realistic thread implied by “Dependencies, interfaces, integration risk”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Model dependencies without fantasy sequentialism.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "pex-m04-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "pex-m04-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "project-execution::pex-m04-practice": [
    {
      id: "pex-m04-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "pex-m04-practice-lt-task",
      type: "practice_task",
      title: "Practice · Dependencies, interfaces, integration risk",
      bullets: [
        "1. Dependency graph with critical handshakes highlighted.",
        "2. Interface agreement draft for one messy edge.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "pex-m04-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Dependency graph + interface agreement",
    },
    {
      id: "pex-m04-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "project-execution::pex-m06-lesson": [
    {
      id: "pex-m06-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Execution cadence: ceremonies, async, checkpoints",
      body: "Treat this as finance- and stakeholder-ready reasoning—numbers, tradeoffs, and downside named.\n\nAnchor “Execution cadence: ceremonies, async, checkpoints” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nTune ceremonies and async norms—embed a concise project status model: milestones, blocked work, dependency readiness, burn vs. buffer—so checkpoints produce decisions from signals, not storytelling.",
    },
    {
      id: "pex-m06-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Decisions and tradeoffs this module must clarify",
      body: "Primary outcome lens: Pick a minimal status KPI set appropriate to initiative size (e.g., milestone variance, WIP limits, blocker count).\n\nPractice spine you will revisit: Critique existing cadence; redesign with rationale + status strip.",
    },
    {
      id: "pex-m06-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Trace one accountable thread",
      body: "Pick one realistic thread implied by “Execution cadence: ceremonies, async, checkpoints”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Pick a minimal status KPI set appropriate to initiative size (e.g., milestone variance, WIP limits, blocker count).",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "pex-m06-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "pex-m06-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "project-execution::pex-m07-practice": [
    {
      id: "pex-m07-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "pex-m07-practice-lt-task",
      type: "practice_task",
      title: "Practice · Change leadership without buzzword soup",
      bullets: [
        "1. Change communications outline + FAQ.",
        "2. Office-hours / listening plan.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "pex-m07-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Change comms outline + FAQ",
    },
    {
      id: "pex-m07-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "project-execution::pex-m08-lesson": [
    {
      id: "pex-m08-lesson-lt-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Quality, definition of done, review gates",
      body: "Treat this as finance- and stakeholder-ready reasoning—numbers, tradeoffs, and downside named.\n\nAnchor “Quality, definition of done, review gates” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nStop infinite polish—DoD contracts, review ethics, balance product vs. technical quality—and define quality signals (defect/rework rates, escaped issues) you will watch in delivery reviews.",
    },
    {
      id: "pex-m08-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Decisions and tradeoffs this module must clarify",
      body: "Primary outcome lens: Author DoD templates stakeholders sign.\n\nPractice spine you will revisit: DoD + gate checklist for initiative.",
    },
    {
      id: "pex-m08-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Compress to a reviewer note",
      body: "Pick one realistic thread implied by “Quality, definition of done, review gates”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Author DoD templates stakeholders sign.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "pex-m08-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "pex-m08-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "project-execution::pex-m08-practice": [
    {
      id: "pex-m08-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "pex-m08-practice-lt-task",
      type: "practice_task",
      title: "Practice · Quality, definition of done, review gates",
      bullets: [
        "1. DoD + gate checklist for initiative.",
        "2. Simulate gate review with notes + quality signal line items.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "pex-m08-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "DoD + gate checklist + quality signal definitions",
    },
    {
      id: "pex-m08-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "project-execution::pex-m09-lesson": [
    {
      id: "pex-m09-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Pressure delivery: scope trades, escalation, protection",
      body: "Treat this as finance- and stakeholder-ready reasoning—numbers, tradeoffs, and downside named.\n\nAnchor “Pressure delivery: scope trades, escalation, protection” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nNegotiate cuts transparently; escalate early with evidence-backed status (schedule impact, risk indicators); shield teams from thrash.",
    },
    {
      id: "pex-m09-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Decisions and tradeoffs this module must clarify",
      body: "Primary outcome lens: Run structured scope trade conversations tied to milestone and quality signals.\n\nPractice spine you will revisit: Escalation memo with options + recommendation + embedded status facts.",
    },
    {
      id: "pex-m09-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Draft a decision memo spine",
      body: "Pick one realistic thread implied by “Pressure delivery: scope trades, escalation, protection”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Run structured scope trade conversations tied to milestone and quality signals.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "pex-m09-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "pex-m09-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "project-execution::pex-m09-practice": [
    {
      id: "pex-m09-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "pex-m09-practice-lt-task",
      type: "practice_task",
      title: "Practice · Pressure delivery: scope trades, escalation, protection",
      bullets: [
        "1. Escalation memo with options + recommendation + embedded status facts.",
        "2. Scope trade scenario walkthrough with KPI impact notes.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "pex-m09-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Escalation memo + scope trade playbook",
    },
    {
      id: "pex-m09-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "project-execution::pex-m10-lesson": [
    {
      id: "pex-m10-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Closeout, retro, knowledge handoff",
      body: "Treat this as finance- and stakeholder-ready reasoning—numbers, tradeoffs, and downside named.\n\nAnchor “Closeout, retro, knowledge handoff” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nFinish with artifacts someone else could run from—learning captured, celebration grounded.",
    },
    {
      id: "pex-m10-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Decisions and tradeoffs this module must clarify",
      body: "Primary outcome lens: Facilitate retro producing dated actions.\n\nPractice spine you will revisit: Retro facilitation plan + follow-through tracker.",
    },
    {
      id: "pex-m10-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Evidence ladder (short)",
      body: "Pick one realistic thread implied by “Closeout, retro, knowledge handoff”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Facilitate retro producing dated actions.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "pex-m10-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "pex-m10-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "project-execution::pex-m10-practice": [
    {
      id: "pex-m10-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "pex-m10-practice-lt-task",
      type: "practice_task",
      title: "Practice · Closeout, retro, knowledge handoff",
      bullets: [
        "1. Retro facilitation plan + follow-through tracker.",
        "2. Learning log consolidated into playbook updates.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "pex-m10-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Delivery playbook v1",
    },
    {
      id: "pex-m10-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "project-execution::pex-m10-recap": [
    {
      id: "pex-m10-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Closeout, retro, knowledge handoff",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "pex-m10-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Facilitate retro producing dated actions.",
        "Failure mode to watch: Finish with artifacts someone else could run from—learning captured, celebration grounded.…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "pex-m10-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "pex-m10-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "project-execution::pex-m10-revision": [
    {
      id: "pex-m10-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Closeout, retro, knowledge handoff",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "pex-m10-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Facilitate retro producing dated actions.",
        "Capture knowledge for future initiatives.",
        "Acknowledge wins without vanity metrics.",
      ],
    },
    {
      id: "pex-m10-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "pex-m10-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "research-and-critical-thinking::rtc-m01-practice": [
    {
      id: "rtc-m01-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "rtc-m01-practice-lt-task",
      type: "practice_task",
      title: "Practice · Questions, falsifiability, and scope discipline",
      bullets: [
        "1. Take three headlines or debate prompts; rewrite each into a precise research question + falsifier.",
        "2. Write a half-page scope memo: stakes, audience, stopping rule, non-goals.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "rtc-m01-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Scope one-pager v1",
    },
    {
      id: "rtc-m01-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "research-and-critical-thinking::rtc-m01-revision": [
    {
      id: "rtc-m01-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Questions, falsifiability, and scope discipline",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "rtc-m01-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Rewrite mushy questions into falsifiable claims with observable implications.",
        "Draw scope boundaries: inclusions, exclusions, and “not answering yet.”",
        "Detect loaded framing that smuggles conclusions into the question.",
      ],
    },
    {
      id: "rtc-m01-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "rtc-m01-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "research-and-critical-thinking::rtc-m02-lesson": [
    {
      id: "rtc-m02-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Sources: types, incentives, and triangulation",
      body: "Treat this as reputational craft—specific evidence beats generic positioning.\n\nAnchor “Sources: types, incentives, and triangulation” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nBuild a basket of evidence—primary where possible—and read every source for incentives, not just tone.",
    },
    {
      id: "rtc-m02-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Evidence and positioning this module must sharpen",
      body: "Primary outcome lens: Classify sources (data, testimony, analysis, advocacy) and weight them appropriately.\n\nPractice spine you will revisit: Assemble a five-source portfolio on one topic with one-line incentive notes per source.",
    },
    {
      id: "rtc-m02-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Compress to a reviewer note",
      body: "Pick one realistic thread implied by “Sources: types, incentives, and triangulation”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Classify sources (data, testimony, analysis, advocacy) and weight them appropriately.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "rtc-m02-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might generic language hide weak evidence in your portfolio or story? Name one fix.",
    },
    {
      id: "rtc-m02-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "research-and-critical-thinking::rtc-m02-practice": [
    {
      id: "rtc-m02-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "rtc-m02-practice-lt-task",
      type: "practice_task",
      title: "Practice · Sources: types, incentives, and triangulation",
      bullets: [
        "1. Assemble a five-source portfolio on one topic with one-line incentive notes per source.",
        "2. Mark which claims in a popular article are supported vs. asserted; list what evidence is missing.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "rtc-m02-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Source portfolio + incentive sketch",
    },
    {
      id: "rtc-m02-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "research-and-critical-thinking::rtc-m03-lesson": [
    {
      id: "rtc-m03-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Notes that enable synthesis, not hoarding",
      body: "Treat this as reputational craft—specific evidence beats generic positioning.\n\nAnchor “Notes that enable synthesis, not hoarding” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nCapture quotations with provenance, paraphrase with discipline, cluster by claim—not by author—so writing becomes possible.",
    },
    {
      id: "rtc-m03-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Evidence and positioning this module must sharpen",
      body: "Primary outcome lens: Separate verbatim quotes from paraphrase with page/section anchors.\n\nPractice spine you will revisit: Migrate messy notes into a template: claim → evidence → conflict → open question.",
    },
    {
      id: "rtc-m03-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Draft a decision memo spine",
      body: "Pick one realistic thread implied by “Notes that enable synthesis, not hoarding”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Separate verbatim quotes from paraphrase with page/section anchors.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "rtc-m03-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might generic language hide weak evidence in your portfolio or story? Name one fix.",
    },
    {
      id: "rtc-m03-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "research-and-critical-thinking::rtc-m03-practice": [
    {
      id: "rtc-m03-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "rtc-m03-practice-lt-task",
      type: "practice_task",
      title: "Practice · Notes that enable synthesis, not hoarding",
      bullets: [
        "1. Migrate messy notes into a template: claim → evidence → conflict → open question.",
        "2. Cluster notes into a working outline with explicit gaps highlighted.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "rtc-m03-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Structured note packet",
    },
    {
      id: "rtc-m03-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "research-and-critical-thinking::rtc-m03-recap": [
    {
      id: "rtc-m03-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Notes that enable synthesis, not hoarding",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "rtc-m03-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Separate verbatim quotes from paraphrase with page/section anchors.",
        "Failure mode to watch: Capture quotations with provenance, paraphrase with discipline, cluster by claim—not by author—so writing becomes possib…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "rtc-m03-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "rtc-m03-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "research-and-critical-thinking::rtc-m04-lesson": [
    {
      id: "rtc-m04-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Logic, rhetoric, and common fallacies",
      body: "Treat this as reputational craft—specific evidence beats generic positioning.\n\nAnchor “Logic, rhetoric, and common fallacies” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nName rhetorical moves and informal fallacies in live arguments—then steel-man the strongest opposing case.",
    },
    {
      id: "rtc-m04-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Evidence and positioning this module must sharpen",
      body: "Primary outcome lens: Tag fallacy-shaped moves without dismissing arguments by label alone.\n\nPractice spine you will revisit: Annotate one editorial or thread: each paragraph gets rhetoric tag + evidence strength.",
    },
    {
      id: "rtc-m04-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Evidence ladder (short)",
      body: "Pick one realistic thread implied by “Logic, rhetoric, and common fallacies”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Tag fallacy-shaped moves without dismissing arguments by label alone.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "rtc-m04-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might generic language hide weak evidence in your portfolio or story? Name one fix.",
    },
    {
      id: "rtc-m04-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "research-and-critical-thinking::rtc-m04-practice": [
    {
      id: "rtc-m04-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "rtc-m04-practice-lt-task",
      type: "practice_task",
      title: "Practice · Logic, rhetoric, and common fallacies",
      bullets: [
        "1. Annotate one editorial or thread: each paragraph gets rhetoric tag + evidence strength.",
        "2. Write steel-man + steel-woman summary of a view you reject; list where it still bites.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "rtc-m04-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Rhetoric annotation sheet + steel-man paragraph",
    },
    {
      id: "rtc-m04-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "research-and-critical-thinking::rtc-m06-lesson": [
    {
      id: "rtc-m06-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Synthesis under disagreement",
      body: "Treat this as reputational craft—specific evidence beats generic positioning.\n\nAnchor “Synthesis under disagreement” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nMap where experts agree, where they clash, and what evidence would adjudicate—without both-sides mush.",
    },
    {
      id: "rtc-m06-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Evidence and positioning this module must sharpen",
      body: "Primary outcome lens: Produce agreement/disagreement maps with cited anchors.\n\nPractice spine you will revisit: Draft adversarial synthesis outline with contradiction table.",
    },
    {
      id: "rtc-m06-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Trace one accountable thread",
      body: "Pick one realistic thread implied by “Synthesis under disagreement”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Produce agreement/disagreement maps with cited anchors.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "rtc-m06-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might generic language hide weak evidence in your portfolio or story? Name one fix.",
    },
    {
      id: "rtc-m06-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "research-and-critical-thinking::rtc-m07-practice": [
    {
      id: "rtc-m07-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "rtc-m07-practice-lt-task",
      type: "practice_task",
      title: "Practice · Writing judgments: thesis, limitations, recommendations",
      bullets: [
        "1. Outline a decision memo with limitation blocks tied to evidence gaps.",
        "2. Peer swap: hunt for inference leakage and recommendation-overreach.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "rtc-m07-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Judgment memo outline",
    },
    {
      id: "rtc-m07-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "research-and-critical-thinking::rtc-m08-lesson": [
    {
      id: "rtc-m08-lesson-lt-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Time-boxed research and stopping rules",
      body: "Treat this as reputational craft—specific evidence beats generic positioning.\n\nAnchor “Time-boxed research and stopping rules” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nFinish under real clocks—explicit stopping rules, captured unknowns, scheduled revisits instead of infinite drift.",
    },
    {
      id: "rtc-m08-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Evidence and positioning this module must sharpen",
      body: "Primary outcome lens: Define maximum time and minimum acceptable depth before you start.\n\nPractice spine you will revisit: Run a 90-minute bounded sprint: deliver outline + unknowns log + next evidence fetch.",
    },
    {
      id: "rtc-m08-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Compress to a reviewer note",
      body: "Pick one realistic thread implied by “Time-boxed research and stopping rules”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Define maximum time and minimum acceptable depth before you start.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "rtc-m08-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might generic language hide weak evidence in your portfolio or story? Name one fix.",
    },
    {
      id: "rtc-m08-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "research-and-critical-thinking::rtc-m08-practice": [
    {
      id: "rtc-m08-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "rtc-m08-practice-lt-task",
      type: "practice_task",
      title: "Practice · Time-boxed research and stopping rules",
      bullets: [
        "1. Run a 90-minute bounded sprint: deliver outline + unknowns log + next evidence fetch.",
        "2. Write stopping-rule statement for a recurring decision at work or home.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "rtc-m08-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Stopping rules + revisit sheet",
    },
    {
      id: "rtc-m08-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "research-and-critical-thinking::rtc-m09-lesson": [
    {
      id: "rtc-m09-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Bias, identity, and intellectual honesty",
      body: "Treat this as reputational craft—specific evidence beats generic positioning.\n\nAnchor “Bias, identity, and intellectual honesty” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nSurface motivated reasoning, identity protection, and incentive gradients—then invite critique before you cement belief.",
    },
    {
      id: "rtc-m09-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Evidence and positioning this module must sharpen",
      body: "Primary outcome lens: List identity and reputation pressures that skew your reading.\n\nPractice spine you will revisit: Bias journal: three recent reads—where did you cheer vs. scrutinize?",
    },
    {
      id: "rtc-m09-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Draft a decision memo spine",
      body: "Pick one realistic thread implied by “Bias, identity, and intellectual honesty”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: List identity and reputation pressures that skew your reading.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "rtc-m09-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might generic language hide weak evidence in your portfolio or story? Name one fix.",
    },
    {
      id: "rtc-m09-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "research-and-critical-thinking::rtc-m09-practice": [
    {
      id: "rtc-m09-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "rtc-m09-practice-lt-task",
      type: "practice_task",
      title: "Practice · Bias, identity, and intellectual honesty",
      bullets: [
        "1. Bias journal: three recent reads—where did you cheer vs. scrutinize?",
        "2. Write critique invitation to a trusted antagonist with concrete questions.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "rtc-m09-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Integrity self-review",
    },
    {
      id: "rtc-m09-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "research-and-critical-thinking::rtc-m10-lesson": [
    {
      id: "rtc-m10-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Capstone rehearsal: defense-ready brief integration",
      body: "Treat this as reputational craft—specific evidence beats generic positioning.\n\nAnchor “Capstone rehearsal: defense-ready brief integration” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nMerge evidence table, synthesis, limitations, and mock-defense appendix into one arc a skeptical reader can stress-test.",
    },
    {
      id: "rtc-m10-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Evidence and positioning this module must sharpen",
      body: "Primary outcome lens: Integrate artifacts into single narrative without duplicate claims.\n\nPractice spine you will revisit: Record or write mock defense; log stumbles → revision tasks.",
    },
    {
      id: "rtc-m10-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Evidence ladder (short)",
      body: "Pick one realistic thread implied by “Capstone rehearsal: defense-ready brief integration”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Integrate artifacts into single narrative without duplicate claims.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "rtc-m10-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might generic language hide weak evidence in your portfolio or story? Name one fix.",
    },
    {
      id: "rtc-m10-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "research-and-critical-thinking::rtc-m10-practice": [
    {
      id: "rtc-m10-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "rtc-m10-practice-lt-task",
      type: "practice_task",
      title: "Practice · Capstone rehearsal: defense-ready brief integration",
      bullets: [
        "1. Record or write mock defense; log stumbles → revision tasks.",
        "2. Revision pass using capstone rubric + colleague read if available.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "rtc-m10-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Research brief v1",
    },
    {
      id: "rtc-m10-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "research-and-critical-thinking::rtc-m10-recap": [
    {
      id: "rtc-m10-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Capstone rehearsal: defense-ready brief integration",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "rtc-m10-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Integrate artifacts into single narrative without duplicate claims.",
        "Failure mode to watch: Merge evidence table, synthesis, limitations, and mock-defense appendix into one arc a skeptical reader can stress-test.…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "rtc-m10-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "rtc-m10-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "research-and-critical-thinking::rtc-m10-revision": [
    {
      id: "rtc-m10-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Capstone rehearsal: defense-ready brief integration",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "rtc-m10-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Integrate artifacts into single narrative without duplicate claims.",
        "Tighten limitations until they earn trust instead of sounding defensive.",
        "Prepare Q&A cards for hostile but fair challenges.",
      ],
    },
    {
      id: "rtc-m10-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "rtc-m10-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "smart-workflows-with-ai::sw-m01-practice": [
    {
      id: "sw-m01-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "sw-m01-practice-lt-task",
      type: "practice_task",
      title: "Practice · Workflow thinking: decomposition, interfaces, and ownership",
      bullets: [
        "1. Swimlane sketch for one recurring mess: inbox triage, support, hiring, or reporting.",
        "2. Per lane: list top three failure modes + earliest signal each gives.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "sw-m01-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Swimlane + failure-mode sheet",
    },
    {
      id: "sw-m01-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "smart-workflows-with-ai::sw-m01-revision": [
    {
      id: "sw-m01-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Workflow thinking: decomposition, interfaces, and ownership",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "sw-m01-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Decompose messy work into substeps another person could execute from notes.",
        "Define owners, SLAs, and escalation for each interface.",
        "Flag steps that must stay human vs. candidates for augmentation.",
      ],
    },
    {
      id: "sw-m01-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "sw-m01-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "smart-workflows-with-ai::sw-m02-lesson": [
    {
      id: "sw-m02-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Prompt anatomy: roles, constraints, evidence policy, formats",
      body: "Treat outputs and tools as accountable artifacts—verification lanes before speed.\n\nAnchor “Prompt anatomy: roles, constraints, evidence policy, formats” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nBuild reusable prompt components that behave under stress and iteration.",
    },
    {
      id: "sw-m02-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Operational truth conditions for this module",
      body: "Primary outcome lens: Separate role, audience, constraints, and output schema.\n\nPractice spine you will revisit: Refactor a vague prompt into a structured spec.",
    },
    {
      id: "sw-m02-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Compress to a reviewer note",
      body: "Pick one realistic thread implied by “Prompt anatomy: roles, constraints, evidence policy, formats”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Separate role, audience, constraints, and output schema.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "sw-m02-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "sw-m02-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "smart-workflows-with-ai::sw-m02-practice": [
    {
      id: "sw-m02-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "sw-m02-practice-lt-task",
      type: "practice_task",
      title: "Practice · Prompt anatomy: roles, constraints, evidence policy, formats",
      bullets: [
        "1. Refactor a vague prompt into a structured spec.",
        "2. Diff two versions and explain behavioral changes.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "sw-m02-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Versioned prompt spec v0.2",
    },
    {
      id: "sw-m02-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "smart-workflows-with-ai::sw-m03-lesson": [
    {
      id: "sw-m03-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Structured outputs: schemas, tables, JSON-shaped thinking",
      body: "Treat outputs and tools as accountable artifacts—verification lanes before speed.\n\nAnchor “Structured outputs: schemas, tables, JSON-shaped thinking” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nDesign schemas downstream systems can consume—contracts that fail loudly instead of silently.",
    },
    {
      id: "sw-m03-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Operational truth conditions for this module",
      body: "Primary outcome lens: Pick schema shapes matched to consumers (human review vs. automation).\n\nPractice spine you will revisit: Design schema for intake → triage → recommendation with explicit null semantics.",
    },
    {
      id: "sw-m03-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Draft a decision memo spine",
      body: "Pick one realistic thread implied by “Structured outputs: schemas, tables, JSON-shaped thinking”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Pick schema shapes matched to consumers (human review vs. automation).",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "sw-m03-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "sw-m03-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "smart-workflows-with-ai::sw-m03-practice": [
    {
      id: "sw-m03-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "sw-m03-practice-lt-task",
      type: "practice_task",
      title: "Practice · Structured outputs: schemas, tables, JSON-shaped thinking",
      bullets: [
        "1. Design schema for intake → triage → recommendation with explicit null semantics.",
        "2. Adversarial test: ambiguous user text, typos, missing IDs—what breaks?",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "sw-m03-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Schema + validation story",
    },
    {
      id: "sw-m03-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "smart-workflows-with-ai::sw-m04-lesson": [
    {
      id: "sw-m04-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Multi-step prompting: chains, checkpoints, and rollback",
      body: "Treat outputs and tools as accountable artifacts—verification lanes before speed.\n\nAnchor “Multi-step prompting: chains, checkpoints, and rollback” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nChain reasoning without mystery—explicit checkpoints where humans intervene.",
    },
    {
      id: "sw-m04-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Operational truth conditions for this module",
      body: "Primary outcome lens: Design chains that fail safely.\n\nPractice spine you will revisit: Build a 4-step chain with explicit verification gates.",
    },
    {
      id: "sw-m04-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Evidence ladder (short)",
      body: "Pick one realistic thread implied by “Multi-step prompting: chains, checkpoints, and rollback”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Design chains that fail safely.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "sw-m04-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "sw-m04-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "smart-workflows-with-ai::sw-m04-practice": [
    {
      id: "sw-m04-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "sw-m04-practice-lt-task",
      type: "practice_task",
      title: "Practice · Multi-step prompting: chains, checkpoints, and rollback",
      bullets: [
        "1. Build a 4-step chain with explicit verification gates.",
        "2. Simulate drift and rollback.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "sw-m04-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Chain spec + checkpoint & rollback log",
    },
    {
      id: "sw-m04-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "smart-workflows-with-ai::sw-m06-lesson": [
    {
      id: "sw-m06-lesson-lt-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Writing and editorial pipelines with QA hooks",
      body: "Treat outputs and tools as accountable artifacts—verification lanes before speed.\n\nAnchor “Writing and editorial pipelines with QA hooks” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nSeparate structure, factual review, tone, and release authorization—AI assists lane by lane.",
    },
    {
      id: "sw-m06-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Operational truth conditions for this module",
      body: "Primary outcome lens: Tailor QA depth to stakes (blog vs. financial vs. regulated).\n\nPractice spine you will revisit: Author tiered editorial checklists (fast vs. high-stakes).",
    },
    {
      id: "sw-m06-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Trace one accountable thread",
      body: "Pick one realistic thread implied by “Writing and editorial pipelines with QA hooks”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Tailor QA depth to stakes (blog vs. financial vs. regulated).",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "sw-m06-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "sw-m06-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "smart-workflows-with-ai::sw-m07-practice": [
    {
      id: "sw-m07-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "sw-m07-practice-lt-task",
      type: "practice_task",
      title: "Practice · Operational workflows: routing, SLAs, and exception handling",
      bullets: [
        "1. Draw ops diagram with AI touchpoints + required human checkpoints.",
        "2. Author exception playbook for volume spike, bad model day, vendor outage.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "sw-m07-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Ops diagram + exception playbook",
    },
    {
      id: "sw-m07-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "smart-workflows-with-ai::sw-m08-lesson": [
    {
      id: "sw-m08-lesson-lt-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Reusable libraries: naming, versioning, deprecation",
      body: "Treat outputs and tools as accountable artifacts—verification lanes before speed.\n\nAnchor “Reusable libraries: naming, versioning, deprecation” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nTreat prompts and subflows as catalogued assets—discoverable and maintainable.",
    },
    {
      id: "sw-m08-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Operational truth conditions for this module",
      body: "Primary outcome lens: Create naming conventions that teams adopt.\n\nPractice spine you will revisit: Mini catalog of 5 assets with owners.",
    },
    {
      id: "sw-m08-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Compress to a reviewer note",
      body: "Pick one realistic thread implied by “Reusable libraries: naming, versioning, deprecation”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Create naming conventions that teams adopt.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "sw-m08-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "sw-m08-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "smart-workflows-with-ai::sw-m08-practice": [
    {
      id: "sw-m08-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "sw-m08-practice-lt-task",
      type: "practice_task",
      title: "Practice · Reusable libraries: naming, versioning, deprecation",
      bullets: [
        "1. Mini catalog of 5 assets with owners.",
        "2. Deprecation note for one legacy asset.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "sw-m08-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Workflow asset catalog sheet + deprecation note",
    },
    {
      id: "sw-m08-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "smart-workflows-with-ai::sw-m08-revision": [
    {
      id: "sw-m08-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Reusable libraries: naming, versioning, deprecation",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "sw-m08-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Create naming conventions that teams adopt.",
        "Document assumptions and dependencies.",
        "Sunset cruft safely.",
      ],
    },
    {
      id: "sw-m08-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "sw-m08-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "smart-workflows-with-ai::sw-m09-lesson": [
    {
      id: "sw-m09-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Automation design: triggers, tools, limits, kill switches",
      body: "Treat outputs and tools as accountable artifacts—verification lanes before speed.\n\nAnchor “Automation design: triggers, tools, limits, kill switches” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nAutomate only where upside clears operational risk—human judgment on triggers.",
    },
    {
      id: "sw-m09-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Operational truth conditions for this module",
      body: "Primary outcome lens: Specify triggers with false-positive tolerance.\n\nPractice spine you will revisit: FMEA-lite for one automated branch.",
    },
    {
      id: "sw-m09-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Draft a decision memo spine",
      body: "Pick one realistic thread implied by “Automation design: triggers, tools, limits, kill switches”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Specify triggers with false-positive tolerance.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "sw-m09-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "sw-m09-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "smart-workflows-with-ai::sw-m09-practice": [
    {
      id: "sw-m09-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "sw-m09-practice-lt-task",
      type: "practice_task",
      title: "Practice · Automation design: triggers, tools, limits, kill switches",
      bullets: [
        "1. FMEA-lite for one automated branch.",
        "2. Kill-switch drill narrative.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "sw-m09-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Automation one-pager with risks",
    },
    {
      id: "sw-m09-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "smart-workflows-with-ai::sw-m10-lesson": [
    {
      id: "sw-m10-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Measuring workflow quality without vanity metrics",
      body: "Treat outputs and tools as accountable artifacts—verification lanes before speed.\n\nAnchor “Measuring workflow quality without vanity metrics” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nChoose a small signal set tied to rework, latency, errors, and risk—then defend it against gaming.",
    },
    {
      id: "sw-m10-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Operational truth conditions for this module",
      body: "Primary outcome lens: Define operational definitions reviewers can audit.\n\nPractice spine you will revisit: Pick three workflow metrics; write definitions + failure interpretations.",
    },
    {
      id: "sw-m10-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Evidence ladder (short)",
      body: "Pick one realistic thread implied by “Measuring workflow quality without vanity metrics”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Define operational definitions reviewers can audit.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "sw-m10-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "sw-m10-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "smart-workflows-with-ai::sw-m10-practice": [
    {
      id: "sw-m10-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "sw-m10-practice-lt-task",
      type: "practice_task",
      title: "Practice · Measuring workflow quality without vanity metrics",
      bullets: [
        "1. Pick three workflow metrics; write definitions + failure interpretations.",
        "2. Red-team how each metric could be gamed; add guardrails.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "sw-m10-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Workflow metrics spec + gaming guardrails",
    },
    {
      id: "sw-m10-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "smart-workflows-with-ai::sw-m11-lesson": [
    {
      id: "sw-m11-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Capstone assembly: workflow library packaging",
      body: "Treat outputs and tools as accountable artifacts—verification lanes before speed.\n\nAnchor “Capstone assembly: workflow library packaging” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nMerge named workflow packages, rubrics, catalog sheet, and rollout memo into one library a peer could pilot—cut tacit steps until failure modes, owners, and kill switches read without you in the room.",
    },
    {
      id: "sw-m11-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Operational truth conditions for this module",
      body: "Primary outcome lens: Externalize tacit knowledge without drowning readers.\n\nPractice spine you will revisit: Walkthrough with colleague or recorded self-review.",
    },
    {
      id: "sw-m11-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Concrete walkthrough",
      body: "Pick one realistic thread implied by “Capstone assembly: workflow library packaging”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Externalize tacit knowledge without drowning readers.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "sw-m11-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "sw-m11-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "smart-workflows-with-ai::sw-m11-practice": [
    {
      id: "sw-m11-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "sw-m11-practice-lt-task",
      type: "practice_task",
      title: "Practice · Capstone assembly: workflow library packaging",
      bullets: [
        "1. Walkthrough with colleague or recorded self-review.",
        "2. Cut ambiguity until failure modes are enumerated.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "sw-m11-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Workflow library pack v1",
    },
    {
      id: "sw-m11-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "smart-workflows-with-ai::sw-m11-recap": [
    {
      id: "sw-m11-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Capstone assembly: workflow library packaging",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "sw-m11-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Externalize tacit knowledge without drowning readers.",
        "Failure mode to watch: Merge named workflow packages, rubrics, catalog sheet, and rollout memo into one library a peer could pilot—cut tacit st…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "sw-m11-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "sw-m11-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "smart-workflows-with-ai::sw-m11-revision": [
    {
      id: "sw-m11-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Capstone assembly: workflow library packaging",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "sw-m11-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Externalize tacit knowledge without drowning readers.",
        "Peer walkthrough dry run.",
        "Finalize rollout narrative.",
      ],
    },
    {
      id: "sw-m11-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "sw-m11-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "teaching-and-facilitation::taf-m01-practice": [
    {
      id: "taf-m01-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "taf-m01-practice-lt-task",
      type: "practice_task",
      title: "Practice · Objectives, outcomes, and measurable understanding",
      bullets: [
        "1. Rewrite five vague objectives into measurable outcomes + evidence of mastery.",
        "2. Design two formative checks (one fast signal, one deeper) for the same lesson.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "taf-m01-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Outcomes + checks draft",
    },
    {
      id: "taf-m01-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "teaching-and-facilitation::taf-m01-revision": [
    {
      id: "taf-m01-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Objectives, outcomes, and measurable understanding",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "taf-m01-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Draft objectives using action verbs tied to observable behaviors.",
        "Pick formative checks matched to cognitive demands—not trivia.",
        "Trim coverage plans that exceed attention budgets.",
      ],
    },
    {
      id: "taf-m01-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "taf-m01-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "teaching-and-facilitation::taf-m02-lesson": [
    {
      id: "taf-m02-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Cognitive load, sequencing, and misconceptions",
      body: "Treat this as role modeling—behavior others can cite and audit.\n\nAnchor “Cognitive load, sequencing, and misconceptions” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nChunk concepts so working memory survives; predict naive models and attack them early.",
    },
    {
      id: "taf-m02-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Observable behaviors this module targets",
      body: "Primary outcome lens: Sequence prerequisites without hidden leaps.\n\nPractice spine you will revisit: Critique a dense outline; reorder for load + add misconception checkpoints.",
    },
    {
      id: "taf-m02-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Compress to a reviewer note",
      body: "Pick one realistic thread implied by “Cognitive load, sequencing, and misconceptions”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Sequence prerequisites without hidden leaps.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "taf-m02-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might optimism hide missing evidence in your facilitation or leadership narrative? Name one patch.",
    },
    {
      id: "taf-m02-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "teaching-and-facilitation::taf-m02-practice": [
    {
      id: "taf-m02-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "taf-m02-practice-lt-task",
      type: "practice_task",
      title: "Practice · Cognitive load, sequencing, and misconceptions",
      bullets: [
        "1. Critique a dense outline; reorder for load + add misconception checkpoints.",
        "2. Write “predict wrong answers” list for one tricky concept.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "taf-m02-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Sequence + misconception map",
    },
    {
      id: "taf-m02-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "teaching-and-facilitation::taf-m03-lesson": [
    {
      id: "taf-m03-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Explanations that land: analogies, examples, precision",
      body: "Treat this as role modeling—behavior others can cite and audit.\n\nAnchor “Explanations that land: analogies, examples, precision” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nLayer concrete → abstract; choose analogies that fail gracefully when stretched.",
    },
    {
      id: "taf-m03-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Observable behaviors this module targets",
      body: "Primary outcome lens: Test analogies for leakage and false mappings.\n\nPractice spine you will revisit: Explain-it-three-ways drill with explicit limits of each metaphor.",
    },
    {
      id: "taf-m03-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Draft a decision memo spine",
      body: "Pick one realistic thread implied by “Explanations that land: analogies, examples, precision”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Test analogies for leakage and false mappings.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "taf-m03-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might optimism hide missing evidence in your facilitation or leadership narrative? Name one patch.",
    },
    {
      id: "taf-m03-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "teaching-and-facilitation::taf-m03-practice": [
    {
      id: "taf-m03-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "taf-m03-practice-lt-task",
      type: "practice_task",
      title: "Practice · Explanations that land: analogies, examples, precision",
      bullets: [
        "1. Explain-it-three-ways drill with explicit limits of each metaphor.",
        "2. Precision edit pass on a jargon-heavy paragraph.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "taf-m03-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Explanation ladder draft",
    },
    {
      id: "taf-m03-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "teaching-and-facilitation::taf-m03-recap": [
    {
      id: "taf-m03-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Explanations that land: analogies, examples, precision",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "taf-m03-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Test analogies for leakage and false mappings.",
        "Failure mode to watch: Layer concrete → abstract; choose analogies that fail gracefully when stretched.…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "taf-m03-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "taf-m03-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "teaching-and-facilitation::taf-m04-lesson": [
    {
      id: "taf-m04-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Practice design: reps, constraints, feedback",
      body: "Treat this as role modeling—behavior others can cite and audit.\n\nAnchor “Practice design: reps, constraints, feedback” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nDesign deliberate practice—progressive constraints, timely feedback, retrieval—not worksheets for volume.",
    },
    {
      id: "taf-m04-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Observable behaviors this module targets",
      body: "Primary outcome lens: Sequence reps from guided → constrained → independent.\n\nPractice spine you will revisit: Design one practice arc with success criteria per rep.",
    },
    {
      id: "taf-m04-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Evidence ladder (short)",
      body: "Pick one realistic thread implied by “Practice design: reps, constraints, feedback”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Sequence reps from guided → constrained → independent.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "taf-m04-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might optimism hide missing evidence in your facilitation or leadership narrative? Name one patch.",
    },
    {
      id: "taf-m04-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "teaching-and-facilitation::taf-m04-practice": [
    {
      id: "taf-m04-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "taf-m04-practice-lt-task",
      type: "practice_task",
      title: "Practice · Practice design: reps, constraints, feedback",
      bullets: [
        "1. Design one practice arc with success criteria per rep.",
        "2. Peer teach-back with observer rubric focused on skill, not polish.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "taf-m04-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Practice arc plan",
    },
    {
      id: "taf-m04-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "teaching-and-facilitation::taf-m06-lesson": [
    {
      id: "taf-m06-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Inclusive rooms: access, norms, and repair",
      body: "Treat this as role modeling—behavior others can cite and audit.\n\nAnchor “Inclusive rooms: access, norms, and repair” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nDesign norms and materials for disability, language access, power dynamics—with repair scripts.",
    },
    {
      id: "taf-m06-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Observable behaviors this module targets",
      body: "Primary outcome lens: Co-create norms learners can cite when friction appears.\n\nPractice spine you will revisit: Norm design workshop notes + peer reactions.",
    },
    {
      id: "taf-m06-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Trace one accountable thread",
      body: "Pick one realistic thread implied by “Inclusive rooms: access, norms, and repair”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Co-create norms learners can cite when friction appears.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "taf-m06-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might optimism hide missing evidence in your facilitation or leadership narrative? Name one patch.",
    },
    {
      id: "taf-m06-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "teaching-and-facilitation::taf-m07-practice": [
    {
      id: "taf-m07-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "taf-m07-practice-lt-task",
      type: "practice_task",
      title: "Practice · Assessment that informs teaching, not ranking obsession",
      bullets: [
        "1. Assessment blueprint with item-objective matrix.",
        "2. Draft rubric with student-facing language + exemplars.",
        "3. One-page instructional review sheet: signals to watch weekly + intervention triggers.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "taf-m07-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Assessment blueprint + rubric + instructional review strip",
    },
    {
      id: "taf-m07-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "teaching-and-facilitation::taf-m08-lesson": [
    {
      id: "taf-m08-lesson-lt-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Async teaching: docs, recordings, office hours",
      body: "Treat this as role modeling—behavior others can cite and audit.\n\nAnchor “Async teaching: docs, recordings, office hours” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nStructure async paths learners can navigate—office hours that solve bottlenecks, norms that reduce ghosting.",
    },
    {
      id: "taf-m08-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Observable behaviors this module targets",
      body: "Primary outcome lens: Chunk async modules with checkpoints and estimated effort.\n\nPractice spine you will revisit: Async module outline with checkpoints + links.",
    },
    {
      id: "taf-m08-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Compress to a reviewer note",
      body: "Pick one realistic thread implied by “Async teaching: docs, recordings, office hours”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Chunk async modules with checkpoints and estimated effort.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "taf-m08-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might optimism hide missing evidence in your facilitation or leadership narrative? Name one patch.",
    },
    {
      id: "taf-m08-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "teaching-and-facilitation::taf-m08-practice": [
    {
      id: "taf-m08-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "taf-m08-practice-lt-task",
      type: "practice_task",
      title: "Practice · Async teaching: docs, recordings, office hours",
      bullets: [
        "1. Async module outline with checkpoints + links.",
        "2. FAQ seed list from anticipated misconceptions.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "taf-m08-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Async path outline",
    },
    {
      id: "taf-m08-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "teaching-and-facilitation::taf-m09-lesson": [
    {
      id: "taf-m09-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Handling difficult participants and edge cases",
      body: "Treat this as role modeling—behavior others can cite and audit.\n\nAnchor “Handling difficult participants and edge cases” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nDe-escalate disruption while protecting learning—scripts, breaks, escalation paths.",
    },
    {
      id: "taf-m09-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Observable behaviors this module targets",
      body: "Primary outcome lens: Prepare scripts for typical disruptions without humiliation.\n\nPractice spine you will revisit: Edge-case playbook with triggers + responses.",
    },
    {
      id: "taf-m09-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Draft a decision memo spine",
      body: "Pick one realistic thread implied by “Handling difficult participants and edge cases”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Prepare scripts for typical disruptions without humiliation.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "taf-m09-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might optimism hide missing evidence in your facilitation or leadership narrative? Name one patch.",
    },
    {
      id: "taf-m09-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "teaching-and-facilitation::taf-m09-practice": [
    {
      id: "taf-m09-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "taf-m09-practice-lt-task",
      type: "practice_task",
      title: "Practice · Handling difficult participants and edge cases",
      bullets: [
        "1. Edge-case playbook with triggers + responses.",
        "2. Scenario triage table: behavior → first move → escalation.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "taf-m09-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Edge-case playbook",
    },
    {
      id: "taf-m09-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "teaching-and-facilitation::taf-m10-lesson": [
    {
      id: "taf-m10-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Capstone rehearsal: kit integration",
      body: "Treat this as role modeling—behavior others can cite and audit.\n\nAnchor “Capstone rehearsal: kit integration” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nIntegrate objectives map, session plan, facilitation guide, materials, assessments into one pilot-ready kit.",
    },
    {
      id: "taf-m10-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Observable behaviors this module targets",
      body: "Primary outcome lens: Cross-check objectives ↔ activities ↔ assessments for gaps.\n\nPractice spine you will revisit: Pilot micro-session with observer notes.",
    },
    {
      id: "taf-m10-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Evidence ladder (short)",
      body: "Pick one realistic thread implied by “Capstone rehearsal: kit integration”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Cross-check objectives ↔ activities ↔ assessments for gaps.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "taf-m10-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might optimism hide missing evidence in your facilitation or leadership narrative? Name one patch.",
    },
    {
      id: "taf-m10-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "teaching-and-facilitation::taf-m10-practice": [
    {
      id: "taf-m10-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "taf-m10-practice-lt-task",
      type: "practice_task",
      title: "Practice · Capstone rehearsal: kit integration",
      bullets: [
        "1. Pilot micro-session with observer notes.",
        "2. Revision log tying changes back to learner confusion signals.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "taf-m10-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Teaching kit v1",
    },
    {
      id: "taf-m10-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "teaching-and-facilitation::taf-m10-recap": [
    {
      id: "taf-m10-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Capstone rehearsal: kit integration",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "taf-m10-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Cross-check objectives ↔ activities ↔ assessments for gaps.",
        "Failure mode to watch: Integrate objectives map, session plan, facilitation guide, materials, assessments into one pilot-ready kit.…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "taf-m10-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "taf-m10-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "teaching-and-facilitation::taf-m10-revision": [
    {
      id: "taf-m10-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Capstone rehearsal: kit integration",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "taf-m10-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Cross-check objectives ↔ activities ↔ assessments for gaps.",
        "Dry-run micro-session; capture friction log.",
        "Revise materials from feedback without scope creep.",
      ],
    },
    {
      id: "taf-m10-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "taf-m10-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "web-and-software-foundations::wf-m01-practice": [
    {
      id: "wf-m01-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "wf-m01-practice-lt-task",
      type: "practice_task",
      title: "Practice · How the web moves: requests, responses, browsers",
      bullets: [
        "1. Trace one login or checkout flow with browser devtools; annotate each hop.",
        "2. Record a two-minute ELI12 voice memo for a non-technical stakeholder.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "wf-m01-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Request trace notes",
    },
    {
      id: "wf-m01-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "web-and-software-foundations::wf-m01-revision": [
    {
      id: "wf-m01-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · How the web moves: requests, responses, browsers",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "wf-m01-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Explain DNS, TLS, and HTTP at a level sufficient for tradeoff discussions.",
        "Differentiate clients, servers, CDNs, and where latency hides.",
        "Name user-visible failure modes (TLS errors, stale assets, blocked requests).",
      ],
    },
    {
      id: "wf-m01-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "wf-m01-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "web-and-software-foundations::wf-m02-lesson": [
    {
      id: "wf-m02-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Apps, hosting, environments, and releases",
      body: "Treat outputs and tools as accountable artifacts—verification lanes before speed.\n\nAnchor “Apps, hosting, environments, and releases” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nSee where code runs across environments—why deploys, rollbacks, and config drift matter for reliability.",
    },
    {
      id: "wf-m02-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Operational truth conditions for this module",
      body: "Primary outcome lens: Map dev / stage / prod and what “promotion” means for risk.\n\nPractice spine you will revisit: Interview a builder (or research a stack you use); draw deploy path end-to-end.",
    },
    {
      id: "wf-m02-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Compress to a reviewer note",
      body: "Pick one realistic thread implied by “Apps, hosting, environments, and releases”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Map dev / stage / prod and what “promotion” means for risk.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "wf-m02-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "wf-m02-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "web-and-software-foundations::wf-m02-practice": [
    {
      id: "wf-m02-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "wf-m02-practice-lt-task",
      type: "practice_task",
      title: "Practice · Apps, hosting, environments, and releases",
      bullets: [
        "1. Interview a builder (or research a stack you use); draw deploy path end-to-end.",
        "2. Write ten vendor questions spanning uptime, backups, egress, access logs.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "wf-m02-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Deploy path sketch",
    },
    {
      id: "wf-m02-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "web-and-software-foundations::wf-m03-lesson": [
    {
      id: "wf-m03-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Data shapes on the wire: JSON, schemas, validation",
      body: "Treat outputs and tools as accountable artifacts—verification lanes before speed.\n\nAnchor “Data shapes on the wire: JSON, schemas, validation” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nTreat payloads as contracts—schemas prevent silent breakage when teams iterate quickly.",
    },
    {
      id: "wf-m03-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Operational truth conditions for this module",
      body: "Primary outcome lens: Read JSON documents and spot risky null/missing ambiguity.\n\nPractice spine you will revisit: Compare two documented API versions; list behavioral risks per change.",
    },
    {
      id: "wf-m03-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Draft a decision memo spine",
      body: "Pick one realistic thread implied by “Data shapes on the wire: JSON, schemas, validation”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Read JSON documents and spot risky null/missing ambiguity.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "wf-m03-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "wf-m03-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "web-and-software-foundations::wf-m03-practice": [
    {
      id: "wf-m03-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "wf-m03-practice-lt-task",
      type: "practice_task",
      title: "Practice · Data shapes on the wire: JSON, schemas, validation",
      bullets: [
        "1. Compare two documented API versions; list behavioral risks per change.",
        "2. Draft validation rules for three critical fields in a payload you rely on.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "wf-m03-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Schema risk memo",
    },
    {
      id: "wf-m03-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "web-and-software-foundations::wf-m03-recap": [
    {
      id: "wf-m03-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Data shapes on the wire: JSON, schemas, validation",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "wf-m03-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Read JSON documents and spot risky null/missing ambiguity.",
        "Failure mode to watch: Treat payloads as contracts—schemas prevent silent breakage when teams iterate quickly.…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "wf-m03-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "wf-m03-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "web-and-software-foundations::wf-m04-lesson": [
    {
      id: "wf-m04-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "REST-ish APIs: resources, auth, scopes",
      body: "Treat outputs and tools as accountable artifacts—verification lanes before speed.\n\nAnchor “REST-ish APIs: resources, auth, scopes” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nConsume APIs with least privilege—tokens, scopes, rotation, and logging that does not leak secrets.",
    },
    {
      id: "wf-m04-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Operational truth conditions for this module",
      body: "Primary outcome lens: Sketch OAuth-style flows at a whiteboard level.\n\nPractice spine you will revisit: Walk an OpenAPI summary; note auth, scopes, pagination, rate limits.",
    },
    {
      id: "wf-m04-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Evidence ladder (short)",
      body: "Pick one realistic thread implied by “REST-ish APIs: resources, auth, scopes”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Sketch OAuth-style flows at a whiteboard level.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "wf-m04-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "wf-m04-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "web-and-software-foundations::wf-m05-practice": [
    {
      id: "wf-m05-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "wf-m05-practice-lt-task",
      type: "practice_task",
      title: "Practice · Databases and consistency intuition",
      bullets: [
        "1. Before/after: write five questions you would ask before approving a schema change.",
        "2. Sketch entity-relationship diagram for an app you use daily.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "wf-m05-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Schema question list",
    },
    {
      id: "wf-m05-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "web-and-software-foundations::wf-m06-lesson": [
    {
      id: "wf-m06-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Performance, caching, and perceived speed",
      body: "Treat outputs and tools as accountable artifacts—verification lanes before speed.\n\nAnchor “Performance, caching, and perceived speed” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nSeparate perceived slowness from root causes—measure before optimizing; watch caching hazards.",
    },
    {
      id: "wf-m06-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Operational truth conditions for this module",
      body: "Primary outcome lens: Hypothesize compute vs. IO bottlenecks with falsifiable signals.\n\nPractice spine you will revisit: Pick a slow screen you use; hypothesize bottleneck + measurement to validate.",
    },
    {
      id: "wf-m06-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Trace one accountable thread",
      body: "Pick one realistic thread implied by “Performance, caching, and perceived speed”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Hypothesize compute vs. IO bottlenecks with falsifiable signals.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "wf-m06-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "wf-m06-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "web-and-software-foundations::wf-m07-practice": [
    {
      id: "wf-m07-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "wf-m07-practice-lt-task",
      type: "practice_task",
      title: "Practice · Security literacy for collaborators",
      bullets: [
        "1. Red-team a feature spec: blind spots + questions for engineering.",
        "2. Draft a non-technical risk summary leadership can act on.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "wf-m07-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Collaborator security review",
    },
    {
      id: "wf-m07-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "web-and-software-foundations::wf-m08-lesson": [
    {
      id: "wf-m08-lesson-lt-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Reliability: outages, retries, idempotency",
      body: "Treat outputs and tools as accountable artifacts—verification lanes before speed.\n\nAnchor “Reliability: outages, retries, idempotency” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nDiscuss retries, double-submit, and customer comms credibly—enough to partner in incidents.",
    },
    {
      id: "wf-m08-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Operational truth conditions for this module",
      body: "Primary outcome lens: Explain why retries need idempotency for payments and writes.\n\nPractice spine you will revisit: Write incident customer email for a fictional outage with known unknowns.",
    },
    {
      id: "wf-m08-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Compress to a reviewer note",
      body: "Pick one realistic thread implied by “Reliability: outages, retries, idempotency”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Explain why retries need idempotency for payments and writes.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "wf-m08-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "wf-m08-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "web-and-software-foundations::wf-m08-practice": [
    {
      id: "wf-m08-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "wf-m08-practice-lt-task",
      type: "practice_task",
      title: "Practice · Reliability: outages, retries, idempotency",
      bullets: [
        "1. Write incident customer email for a fictional outage with known unknowns.",
        "2. Walk a retry/idempotency scenario and list what breaks without safeguards.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "wf-m08-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Reliability question list for vendors",
    },
    {
      id: "wf-m08-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "web-and-software-foundations::wf-m09-lesson": [
    {
      id: "wf-m09-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Vendor evaluation without buzzword bingo",
      body: "Treat outputs and tools as accountable artifacts—verification lanes before speed.\n\nAnchor “Vendor evaluation without buzzword bingo” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nEvaluate vendors with exit criteria, data portability, and proof milestones—not slide aesthetics.",
    },
    {
      id: "wf-m09-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Operational truth conditions for this module",
      body: "Primary outcome lens: Extract contractual and operational risks from vendor decks.\n\nPractice spine you will revisit: Score two real or hypothetical vendors on a rubric you design.",
    },
    {
      id: "wf-m09-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Draft a decision memo spine",
      body: "Pick one realistic thread implied by “Vendor evaluation without buzzword bingo”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Extract contractual and operational risks from vendor decks.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "wf-m09-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "wf-m09-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "web-and-software-foundations::wf-m09-practice": [
    {
      id: "wf-m09-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "wf-m09-practice-lt-task",
      type: "practice_task",
      title: "Practice · Vendor evaluation without buzzword bingo",
      bullets: [
        "1. Score two real or hypothetical vendors on a rubric you design.",
        "2. Write kill criteria that would stop the deal.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "wf-m09-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Vendor scorecard + kill criteria",
    },
    {
      id: "wf-m09-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "web-and-software-foundations::wf-m10-lesson": [
    {
      id: "wf-m10-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Capstone rehearsal: diagram, narrative, review",
      body: "Treat outputs and tools as accountable artifacts—verification lanes before speed.\n\nAnchor “Capstone rehearsal: diagram, narrative, review” to a concrete situation you can revisit in 48 hours—not abstract interest.\n\nMerge narrative, diagrams, risks, and vendor notes into a collaboration brief engineers could schedule work from.",
    },
    {
      id: "wf-m10-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Instructional standard",
      title: "Operational truth conditions for this module",
      body: "Primary outcome lens: Align diagram and prose so both tell one story.\n\nPractice spine you will revisit: Dry-run walkthrough with a skeptical peer; log confusion points.",
    },
    {
      id: "wf-m10-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Evidence ladder (short)",
      body: "Pick one realistic thread implied by “Capstone rehearsal: diagram, narrative, review”.\nState: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.\nTie explicitly to: Align diagram and prose so both tell one story.",
      example: "Keep under ~200 words unless your reviewer explicitly asked for depth.",
    },
    {
      id: "wf-m10-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "wf-m10-lesson-lt-next",
      type: "next_step",
      body: "Ship a short artifact now—half a page beats a polished blank page.",
    }
  ],

  "web-and-software-foundations::wf-m10-practice": [
    {
      id: "wf-m10-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "wf-m10-practice-lt-task",
      type: "practice_task",
      title: "Practice · Capstone rehearsal: diagram, narrative, review",
      bullets: [
        "1. Dry-run walkthrough with a skeptical peer; log confusion points.",
        "2. Revise diagram until flows are obvious without verbal narration.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "wf-m10-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Collaboration brief v1",
    },
    {
      id: "wf-m10-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "web-and-software-foundations::wf-m10-recap": [
    {
      id: "wf-m10-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Capstone rehearsal: diagram, narrative, review",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "wf-m10-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Align diagram and prose so both tell one story.",
        "Failure mode to watch: Merge narrative, diagrams, risks, and vendor notes into a collaboration brief engineers could schedule work from.…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "wf-m10-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "wf-m10-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "web-and-software-foundations::wf-m10-revision": [
    {
      id: "wf-m10-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Capstone rehearsal: diagram, narrative, review",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "wf-m10-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Align diagram and prose so both tell one story.",
        "Invite critique on ambiguity + risk.",
        "Iterate once with tracked changes.",
      ],
    },
    {
      id: "wf-m10-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "wf-m10-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

}
