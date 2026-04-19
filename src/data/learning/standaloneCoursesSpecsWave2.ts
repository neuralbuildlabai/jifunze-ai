import type { StandaloneCourseCompileSpec } from './standaloneCoursesCompiler'
import { lesson } from './standaloneCoursesSpecs'

/** Claude-focused writing + research workflows—assistive literacy, not citation guarantees or outcomes. */
export const CLAUDE_WRITING_RESEARCH_SPEC: StandaloneCourseCompileSpec = {
  libraryTitle: 'Claude for Writing, Research, and Deep Thinking',
  modules: [
    {
      id: 'clw-m01-foundations',
      title: 'Foundations: Claude as a drafting and thinking partner',
      summary:
        'Separate fluency from verification, choose roles that fit work tasks, and keep accountability with human owners—especially for writing and synthesis.',
      lessons: [
        lesson(
          'What Claude-style assistance means in writing and research',
          'Treat long-context drafting help as editable material: useful structure and language that still requires review for facts, policy, and attribution.',
          [
            'Explain why fluent prose can increase harm when facts are uncertain.',
            'Pick two tasks suited to drafting assistance versus tasks requiring primary sources.',
            'Name one boundary your organization would care about (privacy, claims, citations).',
          ],
        ),
        lesson(
          'Voice, tone, and credibility—without confusing polish for proof',
          'Tone can clarify intent; it cannot substitute for evidence. Learn to preserve uncertainty explicitly.',
          [
            'Rewrite a paragraph to separate claims from assumptions.',
            'Identify where tone makes weak evidence sound stronger than it is.',
            'Choose a reviewer checkpoint matched to audience risk.',
          ],
        ),
        lesson(
          'Context packaging for long documents and threads',
          'Bring summaries, excerpts, and constraints—not secrets—and label what the model cannot know.',
          [
            'Build a minimal context capsule for a realistic writing task.',
            'Redact or summarize sensitive details appropriately.',
            'State two unknowns the assistant should not pretend to resolve.',
          ],
        ),
        lesson(
          'Iteration loops that improve substance, not just wording',
          'Prompt revisions by specifying missing evidence, structural gaps, or logical leaps.',
            [
            'Turn vague feedback into a structured revision brief.',
            'Compare two edits: cosmetic versus substantive.',
            'Define “done enough to review” versus “done enough to publish.”',
          ],
        ),
        lesson(
          'Responsible baseline for workplace writing assistance',
          'Assistive drafting still needs ownership, escalation, and explicit limits—especially externally.',
          [
            'Draft a short accountability note you could attach to an AI-assisted draft.',
            'Identify when to stop automation and involve a domain expert.',
            'List three claims that must never ship without verification.',
          ],
        ),
      ],
    },
    {
      id: 'clw-m02-writing-workflows',
      title: 'Writing workflows: outlines, revisions, and editorial discipline',
      summary:
        'Move from prompts to repeatable writing systems: outlines, section contracts, critique passes, and editorial gates.',
      lessons: [
        lesson(
          'Outline-first drafting for memos and long-form pieces',
          'Use outlines to constrain rambling and surface missing sections early.',
          [
            'Produce an outline with explicit audience and decision ask.',
            'Mark sections that require evidence versus opinion.',
            'Identify one structural risk before drafting body text.',
          ],
        ),
        lesson(
          'Revision passes: clarity, correctness, and kindness',
          'Separate passes for clarity, factual checks, and tone alignment—without mixing goals.',
          [
            'Run a three-pass checklist on a sample paragraph.',
            'Catch “confident hedge” language that hides uncertainty poorly.',
            'Choose a kindness constraint without weakening accountability.',
          ],
        ),
        lesson(
          'Stakeholder updates that survive scrutiny',
          'Make timelines, risks, and decisions explicit—avoid narrative smoothing.',
          [
            'Rewrite an update with explicit status classes (done/blocked/at risk).',
            'Surface one uncomfortable unknown early rather than late.',
            'Define what evidence would change your recommendation.',
          ],
        ),
        lesson(
          'Editing for decision quality under time pressure',
          'Prioritize edits by consequence: obligations, commitments, safety, then polish.',
          [
            'Rank issues in a draft by downstream harm if wrong.',
            'Produce a minimal safe edit when you cannot verify everything.',
            'Document residual risk responsibly.',
          ],
        ),
        lesson(
          'Templates that teams can reuse without drift',
          'Stable headings, repeated prompts, and explicit placeholders reduce inconsistency.',
          [
            'Design a reusable template with explicit “human-owned fields.”',
            'Add guardrails that prevent accidental authorization language.',
            'Define retirement criteria when a template stops matching reality.',
          ],
        ),
      ],
    },
    {
      id: 'clw-m03-research-discipline',
      title: 'Research discipline: synthesis without pretending you cited sources',
      summary:
        'Use assistants to organize thinking and questions—not as citation machines. Pair synthesis with retrieval habits suited to stakes.',
      lessons: [
        lesson(
          'Synthesis vs verification: two different jobs',
          'Synthesis organizes ideas; verification confirms claims against sources you can access.',
          [
            'List claims in a synthesis that require external confirmation.',
            'Choose a proportion of effort for retrieval versus drafting at medium stakes.',
            'Identify “sounds sourced” traps in model prose.',
          ],
        ),
        lesson(
          'Question framing that improves literature scanning',
          'Ask questions that guide reading: definitions, disagreements, mechanisms, and limits.',
          [
            'Rewrite a vague research question into operational subquestions.',
            'Separate empirical questions from interpretive ones.',
            'Define what would change your conclusion.',
          ],
        ),
        lesson(
          'Notes systems that preserve provenance intention',
          'Even when models summarize, your notes should record what you actually read.',
          [
            'Design a note format with quote/excerpt boundaries.',
            'Describe a habit that prevents accidental plagiarism risk.',
            'Pick a citation workflow appropriate to your environment.',
          ],
        ),
        lesson(
          'Handling disagreement: competing claims without forced certainty',
          'Train outputs to preserve tension and alternatives—especially for stakeholders.',
          [
            'Produce a balanced summary that labels conflicts explicitly.',
            'Recommend next evidence steps instead of faux conclusions.',
            'Avoid false precision when evidence is thin.',
          ],
        ),
        lesson(
          'When research stakes require human-led sourcing',
          'Medical, legal, financial, and safety contexts need domain gates—automation assists prep, not approval.',
          [
            'Identify triggers that require licensed professionals or internal experts.',
            'Draft an escalation email with facts vs unknowns separated.',
            'Define what “reviewed” means for your context.',
          ],
        ),
      ],
    },
    {
      id: 'clw-m04-deep-thinking',
      title: 'Deep thinking: structured reasoning without magical guarantees',
      summary:
        'Use structured prompts for exploration—counterarguments, pre-mortems, constraints—but keep judgment human-owned.',
      lessons: [
        lesson(
          'Steel-manning and critique loops',
          'Stress-test ideas by forcing strongest opposing views—without pretending debate equals truth.',
          [
            'Generate a steel-man counterargument for a proposal you care about.',
            'Extract two assumptions that deserve empirical checks.',
            'Stop when rhetoric outruns evidence.',
          ],
        ),
        lesson(
          'Scenario planning that stays grounded',
          'Explore futures with explicit assumptions and triggers—avoid narrative certainty.',
          [
            'Write three scenarios with labeled assumptions.',
            'Identify leading indicators you could monitor.',
            'Flag where the model invented detail.',
          ],
        ),
        lesson(
          'Decision journals: recording reasoning for future-you',
          'Capture decisions, alternatives considered, and uncertainties—especially for ambiguous calls.',
          [
            'Draft a decision memo skeleton with reversible vs irreversible sections.',
            'Define what evidence would invalidate the choice.',
            'Avoid rewriting history with polished hindsight.',
          ],
        ),
        lesson(
          'Ethical and stakeholder lenses without theater',
          'Use lenses as prompts, not reputational shields—tie concerns to observable impacts.',
          [
            'Apply two stakeholder lenses to a workplace change.',
            'Identify concrete mitigations versus vague pledges.',
            'Choose metrics or signals that matter—not buzzwords.',
          ],
        ),
        lesson(
          'Knowing when “more reasoning text” won’t help',
          'Recognize diminishing returns: missing data, unclear goals, political constraints.',
          [
            'Diagnose whether the bottleneck is evidence, incentives, or alignment.',
            'Pick a non-AI next step that unlocks progress.',
            'Communicate limits without blame.',
          ],
        ),
      ],
    },
    {
      id: 'clw-m05-collaboration',
      title: 'Collaboration: async review, comments, and handoffs',
      summary:
        'Make AI-assisted drafts reviewable: comments that explain intent, diffs that show risk, and handoffs that preserve accountability.',
      lessons: [
        lesson(
          'Commenting patterns reviewers actually use',
          'Translate suggestions into decisions: accept, revise with reason, or escalate.',
          [
            'Write review comments that specify risk class and needed evidence.',
            'Separate style edits from substantive edits.',
            'Provide a reviewer checklist for external-facing drafts.',
          ],
        ),
        lesson(
          'Handoff packets: what the next person needs',
          'Include goal, constraints, unknowns, and verification status—avoid “finished” illusions.',
          [
            'Build a handoff template for cross-team edits.',
            'Label what was generated versus verified.',
            'Define owners for remaining risks.',
          ],
        ),
        lesson(
          'Pairing AI drafts with meeting discipline',
          'Meetings should decide; drafts should prepare options—don’t let prose replace decisions.',
          [
            'Turn a draft into a decision agenda with explicit choices.',
            'Identify decisions that require synchronous alignment.',
            'Prevent “beautiful doc, unclear authority.”',
          ],
        ),
        lesson(
          'Working across time zones without losing truth',
          'Use explicit status markers and version notes so async speed doesn’t erode verification.',
          [
            'Write a version note that helps remote collaborators.',
            'Define SLAs for verification on sensitive sections.',
            'Catch ambiguous pronouns and missing referents in revisions.',
          ],
        ),
        lesson(
          'Collaboration failures that look like communication problems',
          'Often they’re ownership gaps: who verifies, who signs, who maintains the doc.',
          [
            'Map RACI for a realistic publishing workflow.',
            'Identify one ownership hole in a shared draft scenario.',
            'Propose a fix that doesn’t add bureaucracy theater.',
          ],
        ),
      ],
    },
    {
      id: 'clw-m06-boundaries',
      title: 'Boundaries: privacy, attribution, and professional safety',
      summary:
        'Keep sensitive content out of prompts when needed, align with policy, and avoid overstating what automation contributed.',
      lessons: [
        lesson(
          'Data minimization for drafting assistance',
          'Share the smallest viable context; use synthetic examples when teaching patterns.',
          [
            'Redact a real prompt into a safe training example.',
            'Identify metadata that should never be pasted.',
            'Choose local review steps for confidential drafts.',
          ],
        ),
        lesson(
          'Attribution and transparency without overclaiming',
          'Be honest about assistance; don’t imply human originality where it wasn’t.',
          [
            'Draft a short transparency statement suitable for your environment.',
            'Avoid misleading “authorship” signals for regulated contexts.',
            'Separate assistance from endorsement.',
          ],
        ),
        lesson(
          'Copyright, rights, and organizational rules (non-legal framing)',
          'Assistive tools don’t replace legal review—respect rights and contracts.',
          [
            'List questions you’d ask legal/compliance for external publication.',
            'Identify assets that require explicit permissions.',
            'Treat model outputs as unvetted drafts by default.',
          ],
        ),
        lesson(
          'Professional reputation risk: what not to ship',
          'Personal attacks, unverified allegations, and confidential leaks remain human failures—not model quirks.',
          [
            'Create a “stop list” for content that requires human-only handling.',
            'Practice refusing automation for a realistic risky ask.',
            'Escalate instead of improvising.',
          ],
        ),
        lesson(
          'Sustainable habits: speed without recklessness',
          'Build defaults: pause, verify, label uncertainty, and keep learning cumulative.',
          [
            'Design a weekly habit stack for writing quality.',
            'Choose one metric of review quality rather than output volume.',
            'Reflect on a mistake pattern you want to reduce next month.',
          ],
        ),
      ],
    },
  ],
}

/** Agentic AI literacy for real workflows—tool use, supervision, checkpoints, governance—without promising autonomy or outcomes. */
export const AGENTIC_AI_REAL_WORK_SPEC: StandaloneCourseCompileSpec = {
  libraryTitle: 'Agentic AI and AI Agents for Real Work',
  modules: [
    {
      id: 'aar-m01-foundations',
      title: 'Foundations: what “agents” are in real workplaces',
      summary:
        'Define agentic systems as loops with tools, policies, and humans in the loop—reject hype and magical autonomy framing.',
      lessons: [
        lesson(
          'Agents as loops: plan → act → observe → revise',
          'Separate one-shot chat from multi-step loops with memory, tools, and stopping rules.',
          [
            'Sketch a loop diagram for a realistic office task.',
            'Identify where human approval must exist.',
            'Name one failure mode specific to loops (drift, tool misuse).',
          ],
        ),
        lesson(
          'Tools, permissions, and blast radius',
          'Every tool expands capability and risk—map permissions explicitly.',
          [
            'List tools an agent might use and what each could break.',
            'Define least privilege for a sample workflow.',
            'Choose monitoring signals that detect misuse early.',
          ],
        ),
        lesson(
          'What agents are not: coworkers with judgment',
          'They don’t “understand” obligations; they optimize patterns—accountability stays with people.',
          [
            'Rewrite an over-trust sentence into a bounded statement.',
            'Identify decisions that must never be automated without review.',
            'Describe responsible ownership for outcomes.',
          ],
        ),
        lesson(
          'Human-in-the-loop patterns that actually work',
          'Approvals at high stakes, sampling checks at medium stakes, logging always.',
          [
            'Design approval gates for financial or customer-facing actions.',
            'Pick a sampling strategy for lower-risk bulk tasks.',
            'Define rollback for a failed agent step.',
          ],
        ),
        lesson(
          'Evaluation basics: tasks, rubrics, and regression discipline',
          'Compare behaviors with explicit tests—not vibes.',
          [
            'Draft five golden tasks for a workflow agent.',
            'Define pass/fail criteria tied to safety.',
            'Plan how you’d detect regressions after changes.',
          ],
        ),
      ],
    },
    {
      id: 'aar-m02-tooling',
      title: 'Tooling reality: APIs, browsers, files, and enterprise constraints',
      summary:
        'Understand how agent tooling intersects with SSO, audit logs, data residency, and least-privilege realities.',
      lessons: [
        lesson(
          'Tool interfaces: structured outputs and schema discipline',
          'Reliability often comes from schemas and validators—not longer prompts.',
          [
            'Explain why JSON/schema constraints reduce silent mistakes.',
            'Pick validation checks before trusting a tool call.',
            'Identify ambiguous fields that caused bugs in examples.',
          ],
        ),
        lesson(
          'Browser automation risks: fragile selectors and unsafe actions',
          'Treat browser agents as high-variance; add confirmations and bounded scopes.',
          [
            'List actions that should require explicit human confirmation.',
            'Propose guardrails for navigation scope.',
            'Identify observability needs for browser steps.',
          ],
        ),
        lesson(
          'Files, attachments, and data exfiltration mindset',
          'Agents can accidentally move sensitive data—design boundaries and egress controls.',
          [
            'Define what data classes may enter an agent loop.',
            'Describe an egress review habit for outputs.',
            'Choose logging that helps audits without leaking secrets.',
          ],
        ),
        lesson(
          'Enterprise controls: SSO, policies, and allowlists',
          'Your agent is only as safe as the platform policies around it.',
          [
            'Map your org’s likely constraints onto an agent design.',
            'Explain allowlisting versus prompt-only safety.',
            'Identify where IT/security review is mandatory.',
          ],
        ),
        lesson(
          'Third-party plugins and supply-chain caution',
          'Plugins expand capability and attack surface—treat them like dependencies.',
          [
            'Draft questions to evaluate a plugin before enabling it.',
            'Separate vendor marketing from measurable behavior.',
            'Plan rollback if a plugin misbehaves.',
          ],
        ),
      ],
    },
    {
      id: 'aar-m03-workflows',
      title: 'Workflow design: checkpoints, retries, and operational clarity',
      summary:
        'Build durable workflows with explicit states, idempotency thinking, and operator-readable logs.',
      lessons: [
        lesson(
          'State machines beat vibes: draft → verify → publish',
          'Make transitions explicit so teams can reason about failures.',
          [
            'Draw states for a customer support triage workflow.',
            'Define transitions that require human approval.',
            'Identify ambiguous states that cause duplicate work.',
          ],
        ),
        lesson(
          'Idempotency and duplicate-action prevention',
          'Agents retry; systems must tolerate repeats without double charging or double posting.',
          [
            'Explain idempotency keys in plain language.',
            'Pick a workflow where duplicates are catastrophic.',
            'Design a safe retry policy.',
          ],
        ),
        lesson(
          'Observability for agents: traces, spans, and human-readable logs',
          'Operators need to reconstruct what happened—especially after incidents.',
          [
            'List fields you’d log for each tool call.',
            'Separate developer traces from user-visible summaries.',
            'Define an incident timeline artifact.',
          ],
        ),
        lesson(
          'SLAs, queues, and capacity: automation meets operations',
          'Throughput promises fail without backoff, concurrency limits, and staffing reality.',
          [
            'Identify bottlenecks in a semi-automated workflow.',
            'Choose limits that prevent runaway loops.',
            'Communicate realistic turnaround without hype.',
          ],
        ),
        lesson(
          'Playbooks: when to pause automation',
          'Define halting conditions: uncertainty spikes, policy triggers, anomaly signals.',
          [
            'Write halt rules for a realistic workflow.',
            'Define what “resume” requires.',
            'Practice communicating a controlled stop to stakeholders.',
          ],
        ),
      ],
    },
    {
      id: 'aar-m04-real-work-scenarios',
      title: 'Real-work scenarios: triage, research ops, coding assistance, ops tasks',
      summary:
        'Translate agent patterns into realistic scenarios—always with verification and ownership.',
      lessons: [
        lesson(
          'Triage and routing: reducing load without hiding uncertainty',
          'Use agents to classify and gather context—humans decide sensitive routing.',
          [
            'Draft triage labels with explicit confidence notes.',
            'Identify cases that must never be auto-closed.',
            'Define escalation triggers.',
          ],
        ),
        lesson(
          'Research operations: gather, summarize, verify',
          'Agents can compile notes; humans verify claims and provenance discipline.',
          [
            'Define what “verified” means for your research pack.',
            'Separate internal notes from external claims.',
            'Choose tools appropriate to sensitivity.',
          ],
        ),
        lesson(
          'Coding assistance agents: tests, diffs, and review gates',
          'Treat generated code as untrusted until reviewed—especially security-sensitive changes.',
          [
            'Define review rules by area (auth, payments, data).',
            'Pick tests that catch regressions cheaply.',
            'Identify risky refactors that need deeper review.',
          ],
        ),
        lesson(
          'Operations tasks: runbooks, incident drafts, follow-ups',
          'Agents can accelerate documentation—humans remain accountable for actions taken.',
          [
            'Turn an incident into a runbook skeleton with explicit unknowns.',
            'Define what must be confirmed before executing commands.',
            'Practice conservative communication under pressure.',
          ],
        ),
        lesson(
          'Customer-facing risks: tone, policy, and truth',
          'External messaging needs tight constraints—agents require strong guardrails.',
          [
            'Write policy constraints for customer replies.',
            'Insert verification steps before send.',
            'Define banned behaviors (promises, legal claims).',
          ],
        ),
      ],
    },
    {
      id: 'aar-m05-failure-modes',
      title: 'Failure modes: drift, tool misuse, overconfidence, and silent corruption',
      summary:
        'Recognize how agent loops fail differently from single prompts—and build defenses that match.',
      lessons: [
        lesson(
          'Goal drift across steps',
          'Long loops lose intent—use checkpoints and restated objectives.',
          [
            'Detect drift in a sample multi-step transcript.',
            'Add a checkpoint prompt that recenters the objective.',
            'Define when to restart versus continue.',
          ],
        ),
        lesson(
          'Tool misuse and ambiguous parameters',
          'Small parameter mistakes become big incidents under automation.',
          [
            'List dangerous parameter errors for your domain.',
            'Add validation layers around tool calls.',
            'Choose human confirmation thresholds.',
          ],
        ),
        lesson(
          'Silent corruption: subtle wrong facts accumulating',
          'Errors compound across steps—introduce sampling verification.',
          [
            'Design spot checks for a workflow producing many artifacts.',
            'Pick independent verification sources.',
            'Detect when summaries diverge from sources.',
          ],
        ),
        lesson(
          'Adversarial inputs and prompt injection (workplace framing)',
          'Untrusted content can steer tools—treat inbound text as hostile-by-default in sensitive pipelines.',
          [
            'Identify injection surfaces in a workflow.',
            'Propose isolation strategies for untrusted content.',
            'Define escalation for suspicious behavior.',
          ],
        ),
        lesson(
          'Incident response for agent failures',
          'Contain, notify, rollback, and learn—without blaming “the model” abstractly.',
          [
            'Draft an incident checklist for an agent misfire.',
            'Separate user impact from internal debugging needs.',
            'Capture learning as process changes, not slogans.',
          ],
        ),
      ],
    },
    {
      id: 'aar-m06-governance',
      title: 'Governance: rollout, audits, and proportionate controls',
      summary:
        'Roll out agentic automation with staged pilots, measurable criteria, and clear accountability lines.',
      lessons: [
        lesson(
          'Pilot design: narrow scope, measurable outcomes, explicit stop rules',
          'Pilot means learning—not production-by-stealth.',
          [
            'Define a pilot scope too small to cause catastrophic harm.',
            'Pick metrics that reflect quality and safety—not vanity throughput.',
            'Schedule review milestones.',
          ],
        ),
        lesson(
          'Risk tiers and proportional human oversight',
          'Match oversight depth to blast radius—avoid one-size-fits-all theater.',
          [
            'Classify workflows into tiers with oversight requirements.',
            'Identify tiering mistakes common in hype cycles.',
            'Communicate tier decisions to stakeholders.',
          ],
        ),
        lesson(
          'Documentation and accountability artifacts',
          'Owners, policies, runbooks, and decision logs beat “we have an agent.”',
          [
            'Draft an ownership matrix for an agent workflow.',
            'Define what gets audited—and how often.',
            'Capture limitations explicitly for users.',
          ],
        ),
        lesson(
          'Vendor evaluation without magical checklists',
          'Ask for behaviors, logs, controls, and incident history—not buzzwords.',
          [
            'Write vendor questions grounded in your workflows.',
            'Separate demo polish from operational proof.',
            'Define exit criteria if a vendor fails.',
          ],
        ),
        lesson(
          'Ethical and organizational alignment: transparency without theater',
          'Be honest about uncertainty; avoid claiming responsible AI via branding alone.',
          [
            'Draft user-facing transparency that is accurate and non-marketing.',
            'Identify stakeholder fears and address with controls.',
            'Choose sustainable governance habits for your team.',
          ],
        ),
      ],
    },
  ],
}
