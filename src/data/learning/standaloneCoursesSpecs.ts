import type { StandaloneCourseCompileSpec, StandaloneCourseLessonSpec } from './standaloneCoursesCompiler'

export function lesson(title: string, summary: string, outcomes: string[]): StandaloneCourseLessonSpec {
  return { title, summary, outcomes }
}

export const PROMPT_ENGINEERING_MODELS_SPEC: StandaloneCourseCompileSpec = {
  libraryTitle: 'Prompt Engineering Across ChatGPT, Claude, and Gemini',
  modules: [
    {
      id: 'pem-m01-foundations',
      title: 'Prompt engineering foundations',
      summary:
        'Treat prompts as specifications: intent, inputs, constraints, evaluation, and iteration—before debating “which model.”',
      lessons: [
        lesson(
          'Prompt atoms: intent, audience, deliverable, constraints',
          'Clear prompts reduce rerolls; vague prompts blame the model for ambiguity.',
          [
            'Write a prompt that names intent + audience + deliverable + exclusions.',
            'Identify missing atoms in a failed prompt you have used.',
            'Translate business language into executable constraints.',
          ],
        ),
        lesson(
          'Instructions vs context vs examples',
          'Instructions tell what to do; context supplies facts; examples teach patterns—don’t mix them blindly.',
          [
            'Separate context blocks from instruction blocks in a complex task.',
            'Choose few-shot examples without leaking sensitive content.',
            'Avoid example contamination when examples contradict instructions.',
          ],
        ),
        lesson(
          'Output contracts: format as an API',
          'JSON schemas, headings, tables, and acceptance checks reduce rework.',
          [
            'Specify an output contract for a recurring deliverable.',
            'Add acceptance checks a reviewer can apply mechanically.',
            'Explain why “write better” is not an output contract.',
          ],
        ),
        lesson(
          'Failure taxonomy: spec vs model vs task mismatch',
          'Diagnose whether you need a better prompt, better inputs, or a different approach.',
          [
            'Classify failures using a simple taxonomy.',
            'Identify tasks where prompting cannot overcome missing evidence.',
            'Choose next actions that change the smallest variable first.',
          ],
        ),
        lesson(
          'Evaluation mindset: rubrics beat vibes',
          'Define “good” with observable criteria—especially for iterative refinement.',
          [
            'Write a lightweight rubric for an output type you produce often.',
            'Use rubric failures to revise prompts systematically.',
            'Avoid chasing eloquence when correctness is the bottleneck.',
          ],
        ),
      ],
    },
    {
      id: 'pem-m02-context-design',
      title: 'Context design and disciplined inputs',
      summary:
        'Bring enough context to reduce guessing—without drowning the model or leaking sensitive material.',
      lessons: [
        lesson(
          'What to include: minimum viable context',
          'Prefer labeled facts, constraints, and unknowns over narrative sprawl.',
          [
            'Build a minimum context capsule for a real decision.',
            'Identify irrelevant details that increase variance.',
            'Use headings to reduce accidental contradictions.',
          ],
        ),
        lesson(
          'Token discipline without mysticism',
          'Put the highest-signal material where it influences answers; remove duplication.',
          [
            'Reorder a messy prompt into higher-signal-first structure.',
            'Recognize where repetition creates conflicting emphasis.',
            'Summarize long inputs safely when full text cannot be pasted.',
          ],
        ),
        lesson(
          'Structured inputs: bullets, tables, and fields',
          'Structured inputs reduce ambiguity and make diffing iterations easier.',
          [
            'Convert a paragraph brief into a fielded schema.',
            'Explain why structured inputs improve reliability for teams.',
            'Choose structure appropriate to downstream parsing needs.',
          ],
        ),
        lesson(
          'Working with excerpts: quotes vs paraphrase risks',
          'Be explicit about what is quoted, what is summarized, and what cannot be verified.',
          [
            'Draft instructions that prevent accidental “quote laundering.”',
            'Label uncertainty when excerpts are incomplete.',
            'Choose safe excerpting strategies under confidentiality constraints.',
          ],
        ),
        lesson(
          'Privacy boundaries for cross-tool workflows',
          'Assume different vendors, retention, and enterprise controls—design prompts accordingly.',
          [
            'Identify classes of data that should never enter a generic chat box.',
            'Explain why “anonymized” prompts can still be sensitive in aggregate.',
            'Choose a conservative default for client/customer information.',
          ],
        ),
      ],
    },
    {
      id: 'pem-m03-control',
      title: 'Control: constraints, rubrics, and reliable formatting',
      summary:
        'Use constraints to reduce creativity where you need reliability—especially in operational outputs.',
      lessons: [
        lesson(
          'Hard format enforcement: markdown, JSON, tables',
          'Make invalid formats visible quickly; iterate until the contract holds.',
          [
            'Specify a strict format with explicit invalid-output handling.',
            'Create a quick validation checklist for structured outputs.',
            'Recognize formatting failures as first-class failures—not cosmetic.',
          ],
        ),
        lesson(
          'Style guides without pretending “brand voice” is magic',
          'Encode tone with examples and anti-examples—not vibes.',
          [
            'Define tone using constraints and forbidden patterns.',
            'Provide short snippets showing “good vs bad” for your context.',
            'Avoid style rules that conflict with factual honesty.',
          ],
        ),
        lesson(
          'Rubrics for iterative revision loops',
          'Turn subjective taste into observable scoring dimensions.',
          [
            'Draft a rubric with 5 dimensions and anchors.',
            'Use rubric gaps to revise prompts rather than polishing prose randomly.',
            'Prevent rubric gaming by checking factual anchors separately.',
          ],
        ),
        lesson(
          'Negative constraints: what must not appear',
          'Tell the model what to exclude—legal claims, invented stats, risky medical advice—explicitly.',
          [
            'Add negative constraints matched to consequence tier.',
            'Identify exclusions that reduce hallucination incentives.',
            'Combine negatives with safer alternatives (“say unknown”).',
          ],
        ),
        lesson(
          'Length, stopping rules, and chunking strategies',
          'Avoid rambling by specifying section budgets and stopping conditions.',
          [
            'Specify max words per section and required headings.',
            'Split tasks into chunks when interactions become unstable.',
            'Define done-ness without forcing fake completeness.',
          ],
        ),
      ],
    },
    {
      id: 'pem-m04-debugging',
      title: 'Debugging prompts and improving them over time',
      summary:
        'Treat prompt libraries like code: version, diff, test, and retire prompts that encode hidden assumptions.',
      lessons: [
        lesson(
          'From symptom to spec: what failed, exactly?',
          'Separate misunderstanding from missing facts from wrong format.',
          [
            'Write a structured postmortem for a bad output.',
            'Identify whether additional evidence vs instruction change is needed.',
            'Avoid “try again harder” as a debugging strategy.',
          ],
        ),
        lesson(
          'Reduce variables: scientific iteration on prompts',
          'Change one variable at a time; keep a changelog.',
          [
            'Run an A/B comparison isolating a single constraint.',
            'Keep a prompt version note your team can understand.',
            'Recognize confounding changes that invalidate comparisons.',
          ],
        ),
        lesson(
          'Golden tests: tiny tasks that must never regress',
          'Use stable micro-tests for critical prompts—especially for recurring workflows.',
          [
            'Define three golden tasks with expected properties (not verbatim text).',
            'Establish a regression ritual before deploying prompt changes broadly.',
            'Separate flaky tests from real regressions.',
          ],
        ),
        lesson(
          'Versioning prompts for teams',
          'Names, owners, inputs, assumptions, and retirement criteria.',
          [
            'Draft a prompt README template for team use.',
            'Identify ownership for updates when policies change.',
            'Avoid “shadow prompts” circulating outside governance.',
          ],
        ),
        lesson(
          'When to stop prompting and change the workflow',
          'Sometimes you need retrieval, tools, humans, or a different system—not a cleverer paragraph.',
          [
            'Identify signals that retrieval/tooling is required.',
            'Decide escalation paths without blaming the model for missing access.',
            'Choose sustainable workflows over brittle prompt hacks.',
          ],
        ),
      ],
    },
    {
      id: 'pem-m05-comparison',
      title: 'Comparing ChatGPT, Claude, and Gemini (judgment-first)',
      summary:
        'Learn practical comparison framing—without pretending static “leaderboards” replace measurement in your workflow.',
      lessons: [
        lesson(
          'What “different models” usually means in practice',
          'Different tendencies in instruction-following, verbosity, caution, and tool ecosystems.',
          [
            'Explain why performance is task-dependent and policy-dependent.',
            'Avoid brand absolutes; use measured comparisons on your tasks.',
            'Identify what you hold constant when comparing models fairly.',
          ],
        ),
        lesson(
          'Routing tasks by risk, evidence needs, and format constraints',
          'Use simple routing rules: evidence-heavy → conservative path; creative drafting → faster iteration.',
          [
            'Create a routing table for five recurring task types.',
            'Identify tasks where cross-checking across models might help—and where it adds confusion.',
            'Guard against “ensemble wishful thinking.”',
          ],
        ),
        lesson(
          'Latency, cost, and depth tradeoffs',
          'Sometimes faster is worse; sometimes slower doesn’t help—decide with rubrics.',
            [
            'Pick a latency budget based on workflow fit, not prestige.',
            'Separate model depth from retrieval depth.',
            'Avoid optimizing eloquence when correctness dominates.',
          ],
        ),
        lesson(
          'Safety posture differences (non-authoritative overview)',
          'Policies and defaults change; anchor to organizational guidance—not forum rumors.',
          [
            'Identify categories of content that require human gatekeeping regardless of vendor.',
            'Treat vendor claims as starting points; validate with your admin policies.',
            'Avoid assuming “safe” outputs from any model.',
          ],
        ),
        lesson(
          'Migration patterns when a team switches tools',
          'Rebuild evaluation sets, rewrite contracts, retrain habits—don’t “copy prompts wholesale.”',
            [
            'Plan a migration checklist: prompts, rubrics, data handling, evaluation sets.',
            'Identify hidden assumptions embedded in old prompts.',
            'Run parallel evaluation for a limited period without doubling risk.',
          ],
        ),
      ],
    },
    {
      id: 'pem-m06-workflows',
      title: 'Workflow prompting: multi-step reliability and review gates',
      summary:
        'Chain steps with explicit checkpoints—so automation accelerates work without laundering judgment.',
      lessons: [
        lesson(
          'Multi-step prompts that don’t collapse into mush',
          'Define step outputs, intermediate artifacts, and stop conditions.',
          [
            'Write a 3-step workflow with explicit handoff objects between steps.',
            'Add a checkpoint where a human must confirm assumptions.',
            'Prevent step drift by forbidding new goals mid-chain unless escalated.',
          ],
        ),
        lesson(
          'Review gates: what must be checked before export',
          'Facts, citations, sensitive claims, numbers, names, dates, obligations.',
          [
            'Create a publish gate checklist mapped to consequence tiers.',
            'Identify claims that require primary sources by default.',
            'Separate stylistic edits from substantive verification.',
          ],
        ),
        lesson(
          'Humans in the loop without theater',
          'Make human steps meaningful: expertise, accountability, access to sources.',
          [
            'Define what humans add that models cannot.',
            'Avoid rubber-stamp approvals—design real decision rights.',
            'Document accountability without implying outcomes.',
          ],
        ),
        lesson(
          'Automation boundaries: what should never be fully automated',
          'Legal/medical/financial advice, personnel decisions, safety authorization—domain-specific gates.',
          [
            'Identify automation boundaries for your role.',
            'Write an escalation brief template.',
            'Avoid language that implies autonomous professional judgment.',
          ],
        ),
        lesson(
          'Continuous improvement for prompt libraries',
          'Telemetry without surveillance theater: improve prompts using real failures.',
          [
            'Define ethical, lightweight logging of failure categories.',
            'Turn repeated failures into prompt library updates.',
            'Retire prompts that encode outdated policies.',
          ],
        ),
      ],
    },
  ],
}

export const GEMINI_WORKSPACE_PRODUCTIVITY_SPEC: StandaloneCourseCompileSpec = {
  libraryTitle: 'Gemini for Productivity and Google Workspace',
  modules: [
    {
      id: 'gpw-m01-basics',
      title: 'Gemini basics in a Google-centered workplace',
      summary:
        'Understand what Gemini assistance can do in Workspace workflows—without treating it as an oracle or a substitute for policy.',
      lessons: [
        lesson(
          'What “Gemini in Workspace” means (and does not mean)',
          'Assistance adjacent to docs and mail—not guaranteed correctness or authorization.',
          [
            'Explain Gemini assistance as drafting/summarizing support requiring review.',
            'Separate account capabilities from organizational policy reality.',
            'Identify categories of tasks that still require human judgment.',
          ],
        ),
        lesson(
          'Accounts, boundaries, and organizational controls',
          'Enterprise settings, sharing, and retention matter more than marketing claims.',
          [
            'Describe why admin controls may restrict features regardless of personal trials.',
            'Identify sharing boundaries relevant to drafts and summaries.',
            'Avoid assumptions about confidentiality from UI comfort.',
          ],
        ),
        lesson(
          'Prompting Gemini effectively inside documents and side panels',
          'Short, explicit instructions beat vague “make it better.”',
          [
            'Draft prompts that specify audience, constraints, and section structure.',
            'Iterate using explicit failure feedback tied to missing constraints.',
            'Keep prompts aligned to the document’s purpose and unknowns.',
          ],
        ),
        lesson(
          'Review discipline: treat output as draft text',
          'Formatting can look “final” while being wrong—especially numbers and names.',
          [
            'Apply a publish gate before external sending.',
            'Verify numbers, dates, recipients, and obligations carefully.',
            'Label uncertainty instead of polishing it away.',
          ],
        ),
        lesson(
          'Trust posture: assistive learning, not guaranteed outcomes',
          'Productivity gains vary; skills still require practice and verification.',
          [
            'State claim-safe expectations for productivity improvements.',
            'Identify what success metrics are meaningful vs vanity.',
            'Plan habits that keep professional judgment central.',
          ],
        ),
      ],
    },
    {
      id: 'gpw-m02-docs',
      title: 'Docs: drafting, rewriting, and collaborative clarity',
      summary:
        'Use Gemini to accelerate structured writing while preserving accountability for accuracy and confidentiality.',
      lessons: [
        lesson(
          'Outlines before paragraphs: scaffold thinking',
          'Outlines reduce rambling and make review easier.',
          [
            'Generate an outline with explicit headings and unknowns.',
            'Turn outline gaps into questions for SMEs—not invented facts.',
            'Compare outline-first vs paragraph-first for complex docs.',
          ],
        ),
        lesson(
          'Rewriting for clarity without laundering claims',
          'Improve readability without strengthening unverified assertions.',
          [
            'Rewrite a dense paragraph into clearer language—preserving uncertainty honestly.',
            'Identify “assertiveness creep” introduced by rewriting.',
            'Separate proofreading from factual strengthening.',
          ],
        ),
        lesson(
          'Comments-as-review: turning feedback into actionable edits',
          'Translate comments into edits with explicit rationale.',
          [
            'Draft a comment-to-change loop that preserves reviewer intent.',
            'Avoid rewriting away uncomfortable risks noted by reviewers.',
            'Keep auditability for consequential documents.',
          ],
        ),
        lesson(
          'Version habits: drafts, milestones, and rollback thinking',
          'Treat AI-assisted drafts as iterations—especially for policy-sensitive writing.',
          [
            'Define naming/version habits that prevent confusion.',
            'Identify when “final” means reviewed vs merely formatted.',
            'Avoid destructive edits without history where stakes are high.',
          ],
        ),
        lesson(
          'Collaborative editing hygiene',
          'Multiple editors plus AI assistance requires explicit ownership and review lanes.',
          [
            'Define roles: drafter, reviewer, approver.',
            'Prevent contradictory edits using comment-first workflows.',
            'Establish ground rules for AI-generated inserts in shared docs.',
          ],
        ),
      ],
    },
    {
      id: 'gpw-m03-gmail',
      title: 'Gmail: drafting discipline and thread summaries',
      summary:
          'Accelerate communication while avoiding confidentiality traps and false certainty in summaries.',
      lessons: [
        lesson(
          'Drafting email with explicit audience and escalation paths',
          'Make requests and decisions crisp; avoid hidden obligations.',
          [
            'Draft an email with explicit asks, deadlines, and decision owners.',
            'Identify risky phrases that imply commitments you cannot make.',
            'Separate internal vs external tone responsibly.',
          ],
        ),
        lesson(
          'Tone matching risks: politeness vs accuracy',
          'Politeness must not obscure denial, delay, or uncertainty.',
          [
            'Rewrite polite refusal without misleading stakeholders.',
            'Preserve honest uncertainty where facts are incomplete.',
            'Avoid automated tone that disguises legal or policy risk.',
          ],
        ),
        lesson(
          'Summarizing threads without inventing agreements',
          'Summaries must label inference vs quoted agreement.',
          [
            'Summarize a thread with explicit “confirmed vs inferred.”',
            'Catch invented action items via a checklist.',
            'Escalate ambiguous commitments to humans.',
          ],
        ),
        lesson(
          'Action extraction: todos that are actually executable',
          'Owners, deadlines, dependencies—otherwise “actions” are decoration.',
          [
            'Turn a messy thread into executable tasks with owners.',
            'Separate FYI updates from blocking decisions.',
            'Avoid assigning tasks to the wrong party via ambiguous language.',
          ],
        ),
        lesson(
          'Privacy cautions for email assistance',
          'Recipients, BCC norms, sensitive metadata—assistive drafting doesn’t remove duty of care.',
          [
            'Define red lines for using assistance on sensitive HR/legal threads.',
            'Sanitize examples when asking for help drafting.',
            'Treat external sends as irreversible communications.',
          ],
        ),
      ],
    },
    {
      id: 'gpw-m04-sheets',
      title: 'Sheets & structured work: explanations, checks, and sanity habits',
      summary:
        'Use Gemini carefully around structured data—tables amplify small mistakes.',
      lessons: [
        lesson(
          'Explaining spreadsheets without inventing numbers',
          'Explain formulas and trends using sheet facts you verify.',
          [
            'Draft explanations conditioned on explicitly referenced cells/ranges.',
            'Identify hallucination patterns for numeric tables.',
            'Separate interpretation from calculation.',
          ],
        ),
        lesson(
          'Sanity checks that catch silent errors',
          'Orders of magnitude, sign, duplicates, missing categories.',
          [
            'Create a sanity checklist for common spreadsheet mistakes.',
            'Design independent checks that don’t reuse the same faulty assumption.',
            'Prefer conservative conclusions under uncertainty.',
          ],
        ),
        lesson(
          'Formula assistance limits: verify before shipping',
          'Formula suggestions can be subtly wrong—test with examples.',
          [
            'Explain a testing approach for formula suggestions.',
            'Identify edge cases your domain cares about.',
            'Avoid copying formulas without understanding dependencies.',
          ],
        ),
        lesson(
          'CSV thinking: imports, schemas, and messy reality',
          'Structured data requires schema discipline—especially across teams.',
          [
            'Define schema checks before importing messy CSVs.',
            'Document assumptions when cleaning data.',
            'Avoid automated “fixes” that hide data loss.',
          ],
        ),
        lesson(
          'Audit mindset for operational metrics',
          'Metrics drive decisions—treat definitions as first-class objects.',
          [
            'Write metric definitions that reduce ambiguity.',
            'Identify gaming vectors and blind spots.',
            'Separate descriptive analytics from causal claims.',
          ],
        ),
      ],
    },
    {
      id: 'gpw-m05-meet-notes',
      title: 'Meetings, notes, follow-ups, and planning artifacts',
      summary:
        'Turn conversations into accountable follow-through—without inventing commitments.',
      lessons: [
        lesson(
          'Meeting artifacts: decisions, owners, and unknowns',
          'Make decisions explicit; label unresolved debates honestly.',
          [
            'Draft meeting notes that distinguish decisions vs discussions.',
            'Capture owners and timelines without implying false precision.',
            'Identify where consensus was not reached.',
          ],
        ),
        lesson(
          'Planning prompts that respect dependencies',
          'Plans fail when dependencies are invisible—surface them explicitly.',
          [
            'Draft a plan with milestones, dependencies, and risks.',
            'Identify hidden assumptions that commonly break schedules.',
            'Avoid motivational planning language that substitutes for feasibility checks.',
          ],
        ),
        lesson(
          'Follow-ups that reduce coordination debt',
          'Short, actionable follow-ups beat long status essays.',
          [
            'Write follow-ups with clear asks and decision deadlines.',
            'Separate informational updates from requests.',
            'Reduce passive-aggressive follow-up patterns.',
          ],
        ),
        lesson(
          'Knowledge capture without theater',
          'Capture what future-you needs—not everything that was said.',
          [
            'Choose capture templates based on reuse value.',
            'Avoid capturing sensitive details in shared notes inappropriately.',
            'Link notes to systems of record where possible.',
          ],
        ),
        lesson(
          'Realistic limits: calendars cannot create time',
          'Assistants can draft blocks; humans still negotiate priorities.',
          [
            'Identify scheduling traps (overfull calendars, ambiguous holds).',
            'Write agenda items that enable decisions.',
            'Treat productivity assistance as planning support—not outcome guarantees.',
          ],
        ),
      ],
    },
    {
      id: 'gpw-m06-responsible',
      title: 'Responsible Workspace usage: sensitivity, verification, sustainability',
      summary:
        'Align Gemini habits with organizational reality—privacy, policy, and professional accountability.',
      lessons: [
        lesson(
          'Data sensitivity framing (human judgment first)',
          'Not all productivity wins justify increased disclosure risk.',
          [
            'Classify examples of sensitive workflows requiring tighter gates.',
            'Describe safe drafting strategies under confidentiality constraints.',
            'Avoid treating “internal” as automatically safe.',
          ],
        ),
        lesson(
          'Sharing boundaries across teams and external parties',
          'Forwarding, links, and comment visibility remain human responsibilities.',
          [
            'Draft sharing guidance for AI-assisted docs.',
            'Identify collaboration modes that leak unintentionally.',
            'Choose conservative defaults when unsure.',
          ],
        ),
        lesson(
          'Verification loops for high-impact outputs',
          'Numbers, commitments, policies, legal language—verify with authoritative sources.',
          [
            'Create a tiered verification ladder for Workspace artifacts.',
            'Identify outputs that must never be automated to external audiences.',
            'Separate drafting assistance from authorization.',
          ],
        ),
        lesson(
          'Org policy alignment without guessing',
          'When unsure, pause—use official guidance and admins—not model confidence.',
          [
            'Write an escalation pattern for unclear policy situations.',
            'Avoid presenting models as authorities on internal rules.',
            'Document assumptions transparently.',
          ],
        ),
        lesson(
          'Sustainable habits: productivity without dependency traps',
          'Keep core skills sharp; avoid outsourcing judgment you must own.',
          [
            'Pick weekly unassisted practice for a core skill.',
            'Identify dependency signals early.',
            'Maintain claim-safe expectations about productivity gains.',
          ],
        ),
      ],
    },
  ],
}
