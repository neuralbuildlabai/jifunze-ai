/**
 * Course 1 (AI Essentials) module quiz bank — scenario-based questions tied
 * to each module's real learning goals and practice activities. Question ids
 * (ae-mNN::MNN-QXX) are intentionally stable so existing learner progress and
 * upstream quiz-pool merging in `flagshipModuleQuizPools.ts` keep working.
 *
 * Each module has 8 questions. Prompts include a brief "Why:" rationale at
 * the end so the explanation surfaces with feedback. No prices, no platform
 * trivia, no template stems repeated across modules.
 */

export type Course1QuizQuestion = {
  id: string
  prompt: string
  choices: readonly string[]
  correctIndex: number
}

const AE_M01: readonly Course1QuizQuestion[] = [
  {
    id: 'ae-m01::M01-Q01',
    prompt:
      'A colleague pastes a 30-page contract and asks the model to "summarise key obligations." Which of the five task types from this module does that mostly use?\n\nWhy: Summarising structured input you supply is transformation/extraction—not retrieval of facts the model "knows" and not pure generation.',
    choices: [
      'Pure generation, because the output text is new',
      'Retrieval, because the model is looking up the contract online',
      'Transformation/extraction over content you supplied',
      'Reasoning support, because contracts require legal reasoning',
    ] as const,
    correctIndex: 2,
  },
  {
    id: 'ae-m01::M01-Q02',
    prompt:
      'A medical-claims summary the model produced reads beautifully but cites no sources. A reviewer says, "It sounds confident, ship it." What is the right next move under this module\'s mental model?\n\nWhy: Fluency is not truth. High-stakes claims require verification before they leave your hands, regardless of tone.',
    choices: [
      'Ship it—reading well is a quality signal that justifies sending',
      'Treat the polish as a warning sign, demand source paragraphs, and downgrade the claim to "unverified" in the cover note',
      'Rewrite the tone to be less confident and ship the same content',
      'Ask the model to "double-check itself" and ship whatever it returns',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m01::M01-Q03',
    prompt:
      'You have three tasks today: (a) brainstorm a team off-site theme, (b) draft a board update for a regulator, (c) generate a polite reply to a routine vendor email. Which gets verification-heavy review and which is minimum-stakes?\n\nWhy: Stakes lens is the heart of Module 1. Reversible, low-impact tasks deserve fast use; regulator-facing claims do not.',
    choices: [
      'All three deserve identical review—stakes do not change process',
      '(a) and (c) are minimum-stakes; (b) is verification-heavy because regulators rely on the claims',
      '(b) is minimum-stakes because the model has read many board updates',
      '(c) is verification-heavy because vendors are external',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m01::M01-Q04',
    prompt:
      'A peer says, "AI knows everything because it read the whole internet." Which correction is most accurate?\n\nWhy: The model predicts likely tokens given training data and prompts. It does not "know" or look up live facts unless a retrieval tool is wired in.',
    choices: [
      'Yes, but only English content; everything else is unreliable',
      'It is a prediction system trained on text—it pattern-completes, can be confidently wrong, and does not "know" facts the way a database does',
      'Correct—if it returns an answer, the answer is in its memory verbatim',
      'It only repeats what experts wrote, so claims are vetted by definition',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m01::M01-Q05',
    prompt:
      'Which "AI Use Boundary" one-pager is credible rather than cosmetic?\n\nWhy: A real boundary names contexts and stakes; a cosmetic one repeats general principles without applying them to the learner\'s real work.',
    choices: [
      '"Use AI responsibly" repeated three times in different fonts',
      'Two-column will/will-not table tied to specific tasks the learner does, with a rationale paragraph naming stakes and verification habits',
      'A list of company values with no examples',
      'A screenshot of the AI tool\'s terms of service',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m01::M01-Q06',
    prompt:
      'An assistant invents a court ruling and a citation that does not exist. In this module\'s vocabulary, what failure mode is that primarily?\n\nWhy: Confident fabrication of plausible-sounding facts is the canonical hallucination/fabrication failure mode—different from omission or bias.',
    choices: [
      'Bias',
      'Omission',
      'Confident fabrication (a.k.a. hallucination)',
      'Latency',
    ] as const,
    correctIndex: 2,
  },
  {
    id: 'ae-m01::M01-Q07',
    prompt:
      'It is 2 a.m. You are drafting a public-health crisis memo. No reviewer is available. The model produces a polished draft that names specific contraindications. What does the boundary you built in this module suggest?\n\nWhy: When stakes are high, reviewers are unavailable, and the model has known limits, the right move is pause/escalate—not press send.',
    choices: [
      'Send it—lives are at stake and any draft is better than none',
      'Hold the AI-generated specifics, escalate to a clinician or duty officer, and ship only what you can verify yourself',
      'Ask the model to mark itself as "checked" and send',
      'Send it but cc the model output as a disclaimer',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m01::M01-Q08',
    prompt:
      'A learner submits a single sentence as their Module 1 artifact: "I will use AI for ideas." How should this module evaluate that?\n\nWhy: A reviewable artifact shows applied judgment—task lists, stakes, will/will-not items, and rationale—not a slogan.',
    choices: [
      'Mark complete—boundaries are personal and short is fine',
      'Reject as insufficient evidence; require the will/will-not table tied to actual tasks, with rationale and failure-mode notes',
      'Mark complete only if the sentence has perfect grammar',
      'Mark complete if the learner spent more than 30 minutes on the page',
    ] as const,
    correctIndex: 1,
  },
]

const AE_M02: readonly Course1QuizQuestion[] = [
  {
    id: 'ae-m02::M02-Q01',
    prompt:
      'A LinkedIn post claims "GPTs are unbiased because math is neutral." Which response best matches Module 2\'s reality check?\n\nWhy: Bias enters via training data, labelers, prompt framing, deployment context, and reinforcement choices. Math being involved does not neutralise any of that.',
    choices: [
      'Agreed—anything mathematical is inherently fair',
      'Models inherit bias from data, labels, prompts, and deployment choices; calling the pipeline "math" hides where bias actually lives',
      'Bias only matters for image models, not text',
      'Bias is solved as long as the model is large enough',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m02::M02-Q02',
    prompt:
      'You are about to send an AI-drafted client email. Which order best matches T–R–E–J (Task, Risk, Evidence, Judgment) before you click send?\n\nWhy: T–R–E–J is the operating habit Module 2 trains: name what you\'re doing, what could go wrong, what backs the claim, and what the human owner concludes.',
    choices: [
      'Judgment first, then Task, Risk, Evidence',
      'Task → Risk → Evidence → Judgment, in that order',
      'Risk → Judgment → Task → Evidence',
      'Evidence is optional if the email is short',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m02::M02-Q03',
    prompt:
      'A model summarises ten case studies, all from one consultancy\'s website. Which bias is most likely to be present?\n\nWhy: Pulling only from one source/vendor is a textbook selection bias—the sample is not representative of the underlying population of cases.',
    choices: [
      'Confirmation bias',
      'Selection bias—the source pool is not representative',
      'Anchoring',
      'Survivorship bias of the prompt-writer',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m02::M02-Q04',
    prompt:
      'You write a memo claiming "Most teams using AI saw 30% productivity gains." What falsifier should you state up front?\n\nWhy: A falsifier names what evidence would change your conclusion; without one, the claim is unfalsifiable rhetoric.',
    choices: [
      '"This is true unless someone disagrees"',
      '"If a controlled study with comparable teams showed under 5% sustained gains over six months, I would withdraw this claim"',
      '"This is true because the model wrote it"',
      'No falsifier needed—percentages are facts',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m02::M02-Q05',
    prompt:
      'Match each task to the right depth of review on the risk ladder: (i) team off-site invitation, (ii) public investor disclosure, (iii) internal Slack joke.\n\nWhy: Module 2 trains proportionate review. Investor disclosures sit at the top; jokes sit at the bottom; team logistics sit in the middle.',
    choices: [
      'All three deserve full legal review',
      '(i) light review, (ii) heavy verification + named reviewer, (iii) self-check only',
      '(i) heavy verification, (ii) self-check, (iii) full legal review',
      'No review is needed if you trust the model',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m02::M02-Q06',
    prompt:
      'An AI-assisted compliance report contains an error that costs the company a fine. Who is accountable, in this module\'s framing?\n\nWhy: Module 2 is explicit that human accountability does not transfer to the model. The signer/owner is responsible.',
    choices: [
      'The model vendor, in all cases',
      'The human owner who reviewed/signed off—accountability does not migrate to the model',
      'No one—models can be wrong',
      'The intern who pasted the prompt',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m02::M02-Q07',
    prompt:
      'A model says "studies show that X" with no specific study cited. What confidence should this carry in your synthesis?\n\nWhy: "Studies show" without provenance is a known fluency-without-evidence pattern. Treat it as low-confidence until verified.',
    choices: [
      'High confidence—the model is reliable',
      'Low confidence; flag the claim as unsourced and either find the study or downgrade the claim',
      'Medium confidence, because the wording is academic',
      'No confidence—delete the entire output',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m02::M02-Q08',
    prompt:
      'A teammate sends you a fluent, polished AI-generated argument with no sources, framed as "definitive." How should you respond responsibly?\n\nWhy: Polished prose with no provenance is exactly where Module 2 trains learners to push back. The right move is request evidence, not capitulate to confidence.',
    choices: [
      'Trust it—polish implies depth',
      'Ask for sources, request the falsifier, and treat it as a hypothesis until evidence lands',
      'Forward it to leadership unchanged',
      'Reject it without explanation',
    ] as const,
    correctIndex: 1,
  },
]

const AE_M03: readonly Course1QuizQuestion[] = [
  {
    id: 'ae-m03::M03-Q01',
    prompt:
      'A teammate prompts the model with "Write me something about marketing." Using T–C–C–F–A (Task, Context, Constraints, Format, Audience), which element is most clearly missing?\n\nWhy: All five are weak, but the task itself is undefined ("something"). Without a clear Task, Constraints/Format cannot pin a usable output.',
    choices: [
      'Audience only',
      'Format only',
      'Task is unspecified—"something" is not an action verb tied to an outcome',
      'Nothing is missing; the model will figure it out',
    ] as const,
    correctIndex: 2,
  },
  {
    id: 'ae-m03::M03-Q02',
    prompt:
      'You add the constraints "150 words max, two bullets, no jargon" to a vague prompt. What predictable shift should you expect in the output?\n\nWhy: Tight constraints force compression and reduce filler. They will not magically fix factual gaps but they tighten shape and tone.',
    choices: [
      'Factual claims will become more accurate',
      'The output will get shorter and tighter, but factual quality depends on context and verification—not on word count',
      'The model will refuse to answer',
      'The model will invent more facts to fit the limit',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m03::M03-Q03',
    prompt:
      'The same prompt is sent for an internal team and for an external client. What changes in T–C–C–F–A when audience flips?\n\nWhy: Audience drives tone, vocabulary, level of internal jargon, sensitive disclosures, and what counts as a defensible claim.',
    choices: [
      'Nothing—audience is cosmetic',
      'Tone, vocabulary, evidence rigor, and what disclosures are appropriate—even with the same task',
      'Only the greeting line',
      'Only the file format',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m03::M03-Q04',
    prompt:
      'You ask the model to draft a board memo. Version A gives no context. Version B pastes the company\'s last quarterly summary, the audience profile, and the open questions the board cares about. What changes?\n\nWhy: Rich, relevant context is the highest-leverage T–C–C–F–A change. It does not guarantee truth, but it dramatically reduces guesswork.',
    choices: [
      'No difference—context is filler',
      'Version B will produce a more grounded, audience-fit draft, though both still need verification before sending',
      'Version A is better because shorter prompts are clearer',
      'Both versions produce identical output every time',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m03::M03-Q05',
    prompt:
      'You add "Return as a markdown table with columns Risk, Likelihood, Impact, Owner" to a risk-review prompt. Which T–C–C–F–A element does that primarily strengthen?\n\nWhy: This is a Format specification. It does not change the Task or Audience—it shapes the output structure.',
    choices: [
      'Task',
      'Constraints (length only)',
      'Format—you specified the output shape',
      'Audience',
    ] as const,
    correctIndex: 2,
  },
  {
    id: 'ae-m03::M03-Q06',
    prompt:
      'Original: "Write a follow-up email." Which rewrite best applies T–C–C–F–A?\n\nWhy: A strong rewrite names task, audience, context, constraints, and format together; vague verbs and no audience are the weak hallmark.',
    choices: [
      '"Write a really good follow-up email please"',
      '"Draft a 120-word follow-up email to a procurement lead at ACME after our 30-min Tuesday call. Reference the pricing question they raised, propose two next steps with dates, no marketing language, plain text."',
      '"Write me an email about the ACME thing"',
      '"Write an email"',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m03::M03-Q07',
    prompt:
      'Which is the strongest sign that a prompt contract is reusable, not single-shot?\n\nWhy: A reusable contract names slots/inputs the user fills in, plus stable constraints and format—so the third Tuesday is faster than the first.',
    choices: [
      'It is at least 500 words long',
      'It names input slots ("[audience]", "[deadline]", "[risk constraints]") plus stable constraints/format that survive across runs',
      'It mentions the model name',
      'It uses many emojis',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m03::M03-Q08',
    prompt:
      'A weak prompt yields rambling output that mixes facts with marketing fluff. Which single fix is most likely to give the biggest improvement before iterating further?\n\nWhy: Naming Audience + adding a Format and a "no marketing language" Constraint are highest-leverage. Adding more detail to a vague Task without those still rambles.',
    choices: [
      'Add more synonyms in the task line',
      'Specify Audience, add a Format (length + structure), and add a "no marketing language" Constraint',
      'Switch to a different model and resend the same prompt',
      'Ask the model to be "smarter"',
    ] as const,
    correctIndex: 1,
  },
]

const AE_M04: readonly Course1QuizQuestion[] = [
  {
    id: 'ae-m04::M04-Q01',
    prompt:
      'You are designing a prompt as a spec. Which combination most reliably reduces failure modes?\n\nWhy: Module 4 treats role, goal, constraints, evidence policy, output schema, and refusal behavior as first-class. Adding "be smart" is not a spec.',
    choices: [
      'Role + goal + "be smart"',
      'Role, goal, constraints, evidence policy (cite vs infer vs refuse), output schema, refusal behavior on disallowed/uncertain content',
      'Output schema only',
      'A long role description and nothing else',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m04::M04-Q02',
    prompt:
      'A research prompt asks for "the current CEO of company X." How should the evidence policy be written so the model behaves well when it does not know?\n\nWhy: Cite-vs-infer-vs-refuse policy makes uncertainty visible. The model should refuse to invent or be told to label what is inferred vs cited.',
    choices: [
      '"Always answer confidently"',
      '"Cite an explicit source for the claim; if no source is supplied, refuse and say so—do not infer or invent"',
      '"Make your best guess and move on"',
      '"Write in a confident tone regardless of evidence"',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m04::M04-Q03',
    prompt:
      'For a customer support assistant, you want it to refuse to give legal advice. What is the strongest way to encode that?\n\nWhy: Refusal behavior must be explicit, name the disallowed category, and route to a human—not be a vague disclaimer.',
    choices: [
      '"Try to be helpful"',
      '"On legal-advice questions, do not give an answer; reply with the routing template and escalate to a licensed reviewer—name the category in the response"',
      '"Use a softer tone for legal questions"',
      '"Add a disclaimer at the end of every response"',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m04::M04-Q04',
    prompt:
      'A prompt feeds a downstream pipeline that expects strict JSON. The model keeps returning prose. Which spec change is most defensible?\n\nWhy: Output shape needs to be explicit, machine-checkable, and paired with an example. "Be clearer" is not a spec.',
    choices: [
      '"Be clearer"',
      'Specify the JSON schema, give a worked example, and say "If you cannot produce valid JSON, return {\\"error\\": <reason>} only"',
      'Trust the model to figure it out',
      'Add three exclamation marks',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m04::M04-Q05',
    prompt:
      'You add an explicit negative: "Do not include marketing language." When does that matter most?\n\nWhy: Negatives matter when the model would otherwise default to it. They name what to exclude, not just what to include.',
    choices: [
      'Never—negatives confuse the model',
      'When the default behavior leans toward the failure mode—negatives steer it explicitly away',
      'Only on Friday afternoons',
      'Only for poetry',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m04::M04-Q06',
    prompt:
      'You compare two outputs A and B against a rubric. A is more polished; B is duller but every claim is sourced. The rubric weighs faithfulness highest. Which wins, and why?\n\nWhy: Module 4 trains rubric-driven comparison, not likability. Faithfulness > polish when the rubric says so.',
    choices: [
      'A wins because it reads better',
      'B wins because the rubric weighted faithfulness highest and B meets it; polish is a downstream edit on B',
      'Tie—pick whichever the team likes',
      'A wins because it took longer to write',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m04::M04-Q07',
    prompt:
      'A research output reads correctly but is pitched at a lay audience when the spec asked for a technical reviewer. Which Module 4 failure mode is that?\n\nWhy: Wrong-audience is a first-class failure mode in Module 4. The fix is the Audience field, not more facts.',
    choices: [
      'Hallucination',
      'Wrong audience—the spec\'s audience field was not honored',
      'Refusal',
      'Latency',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m04::M04-Q08',
    prompt:
      'Which changelog entry is strongest for a versioned prompt spec going from v0.2 → v0.3?\n\nWhy: A strong entry names what changed, why, and what behavioral effect was sought—so a future you (or teammate) can audit and revert.',
    choices: [
      '"v0.3: improvements"',
      '"v0.3: tightened evidence policy from \'try to cite\' to \'refuse if no source is supplied\'; tested on five contested-fact prompts; reduced fabricated citations from 3/5 to 0/5"',
      '"v0.3: cleanup"',
      '"v0.3: see commit"',
    ] as const,
    correctIndex: 1,
  },
]

const AE_M05: readonly Course1QuizQuestion[] = [
  {
    id: 'ae-m05::M05-Q01',
    prompt:
      'You compare two prompt variants for the same task. What makes the comparison fair?\n\nWhy: Module 5 trains hypothesis-driven A/B—same input, fixed evaluation criteria, multiple runs, locked seed when available. Anything else is fiddling.',
    choices: [
      'Use a different input for each variant to "stretch" them',
      'Use the same input(s), fixed evaluation criteria, multiple runs to control variance, and log failure signatures',
      'Whichever you read first wins',
      'Compare only on output length',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m05::M05-Q02',
    prompt:
      'A "winning" prompt reads more elegantly but its outputs lost the citations the previous version included. What is the right Module 5 reaction?\n\nWhy: That is a regression on faithfulness. Style gains do not overrule loss of safety/faithfulness anchors—revert or pin them.',
    choices: [
      'Adopt the new prompt; elegance is a quality signal',
      'Treat the citation loss as a regression—pin the citation anchor in the spec, retest, and only adopt the new prompt if both elegance and citations hold',
      'Adopt it and add a generic disclaimer',
      'Switch back permanently and never iterate again',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m05::M05-Q03',
    prompt:
      'Match iteration depth to use case: (i) graded coursework draft, (ii) external client copy, (iii) a one-off internal Slack note.\n\nWhy: Iteration depth scales with stakes and audience. Internal notes can ship fast; client copy needs structured iteration; graded work needs documented iteration plus integrity rules from Module 8.',
    choices: [
      'Identical iteration depth for all three',
      '(i) documented iteration with integrity guardrails, (ii) structured iteration with rubric review, (iii) fast single-pass with self-check',
      '(iii) deepest iteration of the three',
      '(ii) zero iteration',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m05::M05-Q04',
    prompt:
      'A "winning" customer-comms prompt subtly turns negative reviews into "growth opportunities" before responses are sent. What is the red-team finding?\n\nWhy: Subtle harm hides in tone-shaping wording. Module 5 trains learners to red-team for harm/spin even when output looks fine.',
    choices: [
      'No issue—language is subjective',
      'The wording shapes spin into the workflow; flag it as a faithfulness/spin risk and rewrite to preserve the customer\'s framing',
      'Rename the prompt and ship',
      'Let the customer service team decide later',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m05::M05-Q05',
    prompt:
      'You have five minutes before a deadline. Which 8–12 line QA checklist item is least dispensable from your Module 5 checklist?\n\nWhy: Fact/citation check + privacy + audience are non-negotiable even under time pressure. Tone polish is dispensable.',
    choices: [
      'Fact/citation check on at least the load-bearing claim',
      'Tone polish to make it sound more "professional"',
      'Adding emojis',
      'Switching font',
    ] as const,
    correctIndex: 0,
  },
  {
    id: 'ae-m05::M05-Q06',
    prompt:
      'When comparing prompt variants, which row best belongs in a failure-signature table?\n\nWhy: The table captures observable defects so the team can see the pattern, not just an aggregate "better/worse" feeling.',
    choices: [
      '"Vibes: B is nicer"',
      '"Variant B fabricates citations on contested-fact prompts in 2/5 runs; Variant A fabricates 0/5"',
      '"B is shorter so it\'s better"',
      '"A is older, ignore"',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m05::M05-Q07',
    prompt:
      'Which version note makes a prompt change auditable a quarter from now?\n\nWhy: Auditable notes name the hypothesis, the test, and the result. "Cleanup" tells future you nothing.',
    choices: [
      '"Refactor"',
      '"Hypothesis: stricter evidence policy reduces fabricated cites. Test: 10 contested-fact prompts. Result: fabrication dropped 3→0; faithfulness held; latency unchanged."',
      '"Various improvements"',
      '"Tweaks per Slack thread"',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m05::M05-Q08',
    prompt:
      'A teammate iterates by changing five things at once and declaring the new prompt better. How do you push back productively?\n\nWhy: Hypothesis-driven iteration changes one variable at a time so the cause of the gain is clear. Five-at-once is fiddling, not iteration.',
    choices: [
      'Accept it—shipping faster matters most',
      'Ask which single change is responsible; propose isolating one variable per iteration so the win is attributable and reversible',
      'Reject all of it without testing',
      'Add five more changes of your own',
    ] as const,
    correctIndex: 1,
  },
]

const AE_M06: readonly Course1QuizQuestion[] = [
  {
    id: 'ae-m06::M06-Q01',
    prompt:
      'A reversible Slack reply and an irreversible regulatory filing both involve AI assistance. How do verification lanes differ?\n\nWhy: Module 6 ties verification depth to reversibility and blast radius. Identical lanes for both is the wrong default.',
    choices: [
      'Identical lanes—stakes do not affect verification',
      'Reversible/low-blast: self-check is enough; irreversible/high-blast: source-by-source verification, named reviewer, and refusal of unverifiable claims',
      'Heavier lane on the Slack reply because it is faster',
      'No verification needed when the model is confident',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m06::M06-Q02',
    prompt:
      'Three sources disagree on a key statistic in your synthesis. The model "averages" them silently. What is the correct Module 6 move?\n\nWhy: Averaging hides disagreement. Module 6 trains conflict-preserving synthesis so the reader can see what is contested.',
    choices: [
      'Accept the average—readers prefer one number',
      'Surface the disagreement, attribute each estimate to its source, and tell the reader why a single number would be misleading',
      'Pick the highest number for impact',
      'Pick the lowest number for safety',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m06::M06-Q03',
    prompt:
      'Two sources are peer-reviewed; one is a personal blog post. The model marks all three "Strong." How do you correct the evidence table?\n\nWhy: Module 6 explicitly warns against false precision. Strength scores must reflect provenance, sample, and reproducibility.',
    choices: [
      'Trust the model and ship',
      'Downgrade the blog post to "Weak/Anecdotal," note its provenance limits, and recompute any conclusions accordingly',
      'Promote all three to "Very Strong" so the brief sounds confident',
      'Delete the blog post without noting it',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m06::M06-Q04',
    prompt:
      'A model returns DOIs and author names that you cannot find in any database. What does Module 6 say to do?\n\nWhy: Unverifiable citations are likely fabricated. Treat them as missing evidence; refuse to use the claim until a real source is found.',
    choices: [
      'Cite them anyway—DOIs look authoritative',
      'Treat the claim as unsourced; either find a real source or refuse the claim and remove it from the brief',
      'Make up a year of publication to match',
      'Cite them with a footnote that says "TBD"',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m06::M06-Q05',
    prompt:
      'An honest executive synthesis includes which section explicitly?\n\nWhy: Module 6 requires an "unknowns" section so reviewers see the limits of what was checked—and the next information buys.',
    choices: [
      'Only the answer—no unknowns',
      'A short "What we still don\'t know / next information buys" section listing what evidence would change the recommendation',
      'A list of model names used',
      'A list of synonyms for the topic',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m06::M06-Q06',
    prompt:
      'You need a quick gist of a long article in 2 minutes for a colleague who will use it as background only. Which mode is appropriate?\n\nWhy: Module 6 distinguishes "summarize fast" (low-stakes orientation) from evidence-disciplined synthesis (decisions). Both are valid in their lane.',
    choices: [
      'Always run full evidence-disciplined synthesis',
      '"Summarize fast" is fine for low-stakes orientation; switch to evidence-disciplined synthesis when a decision rides on it',
      'Always summarize fast and treat as final',
      'Refuse to summarize anything ever',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m06::M06-Q07',
    prompt:
      'Your evidence table includes a column called "Provenance." What belongs in it?\n\nWhy: Provenance ties a claim to its source, date, sample, and method—so a reviewer can trace it. "Looks legit" is not provenance.',
    choices: [
      '"Looks legit"',
      'Source, date, sample size or N/A, method or "anecdote," link or document id where the claim originated',
      'A confidence percent only',
      'The model that retrieved it',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m06::M06-Q08',
    prompt:
      'For a $50 office-supplies decision and a $5M procurement decision, the next information buys differ. What is the principle?\n\nWhy: Information buys should be proportional to decision stakes. Spending $5K on diligence for a $50 buy is wasteful; spending $50 on a $5M buy is reckless.',
    choices: [
      'Buy the same depth of evidence for both',
      'Information buys scale with decision stakes—buy more diligence on irreversible high-stakes calls; buy less on cheap reversible ones',
      'Always buy maximum evidence',
      'Never buy any evidence—trust the model',
    ] as const,
    correctIndex: 1,
  },
]

const AE_M07: readonly Course1QuizQuestion[] = [
  {
    id: 'ae-m07::M07-Q01',
    prompt:
      'You ask the model to summarize a dense article. Which prompt sentence best forbids invention?\n\nWhy: Anti-invention is explicit. Module 7 wants the model to refuse to add facts not present in the source.',
    choices: [
      '"Be accurate"',
      '"Use only claims supported by paragraphs in the supplied article. Do not add facts, statistics, or examples that are not in the article. If unsure, write \'not in source.\'"',
      '"Make it interesting"',
      '"Add helpful context from your own training data"',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m07::M07-Q02',
    prompt:
      'You shift tone from technical to friendly for a customer email. What must you watch so the rewrite stays faithful?\n\nWhy: Tone changes can smuggle new claims (e.g., adding warmth becomes "we promise X"). Module 7 trains the discipline of tone-without-claim-drift.',
    choices: [
      'Nothing—tone is cosmetic',
      'That no factual claim is added, removed, or softened away from what the customer was actually told; tone moves, content does not',
      'That the email is shorter no matter what',
      'That you remove all customer-specific details',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m07::M07-Q03',
    prompt:
      'You edit an AI draft with margin notes "verify / cut / escalate." Which note belongs on a claim that names a specific dollar figure with no provenance?\n\nWhy: Specific numbers without provenance are exactly the verify-or-cut targets. Escalate when stakes warrant a named human reviewer.',
    choices: [
      '"Polish"',
      '"Verify against source data; if unverifiable, cut. Escalate to finance reviewer if number is load-bearing for the audience."',
      '"Make bold"',
      '"Add emoji"',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m07::M07-Q04',
    prompt:
      'After an AI rewrite, the citations in the original source paragraphs disappeared. What does Module 7 require?\n\nWhy: Citation pathways must survive transformation. If they break, the rewrite is downgraded until they are restored or claims are removed.',
    choices: [
      'Ignore it—citations are clutter',
      'Reattach citations to the relevant paragraphs or remove the claims; faithfulness is non-negotiable for contested facts',
      'Add fake citations to fill the gap',
      'Forward the broken draft to legal anyway',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m07::M07-Q05',
    prompt:
      'A summary is technically accurate but quietly omits the article\'s strongest counter-argument. What kind of red-team is this Module 7 issue?\n\nWhy: Omission is a faithfulness failure even when accuracy is preserved. Red-teaming for omission is part of the writing discipline.',
    choices: [
      'Hallucination only',
      'Omission—true claims plus a quiet cut of the counter-argument changes the meaning',
      'Length problem only',
      'Tone problem only',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m07::M07-Q06',
    prompt:
      'A summary keeps every claim but tilts framing toward the author\'s favored option. What is this called and what is the fix?\n\nWhy: Spin via framing is subtle and common in AI rewrites. The Module 7 fix is rewriting framing to mirror the source\'s own balance.',
    choices: [
      'Hallucination; rewrite from scratch',
      'Spin via framing; rewrite section openings/closings to mirror the source\'s own balance and surface contested points',
      'Translation error; switch language',
      'Audience mismatch; just shorten',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m07::M07-Q07',
    prompt:
      'You are tagging each summary claim back to its source paragraph. The model emits a strong claim with no paragraph reference. What do you do?\n\nWhy: Module 7 requires either a paragraph anchor or an "uncited" tag—no quiet promotion to fact.',
    choices: [
      'Mark it "uncited" and either find the paragraph or cut the claim',
      'Promote it to a fact and move on',
      'Rewrite it more confidently',
      'Mark it "verified" by default',
    ] as const,
    correctIndex: 0,
  },
  {
    id: 'ae-m07::M07-Q08',
    prompt:
      'You write two prompt variants: (A) "extract the load-bearing facts from this article into a table" and (B) "write a 200-word executive brief from this article." What failure mode is each most prone to?\n\nWhy: Extraction tends to over-cite and under-narrate; exec briefs tend to over-narrate and under-cite. Naming the failure mode lets you pre-empt it in the prompt.',
    choices: [
      'Both are equally prone to invention; pick whichever',
      '(A) over-extracts unimportant facts and may double-count; (B) tends to lose citations and can smuggle in unsupported framing',
      '(A) is always wrong, (B) is always right',
      'Neither has any failure modes',
    ] as const,
    correctIndex: 1,
  },
]

const AE_M08: readonly Course1QuizQuestion[] = [
  {
    id: 'ae-m08::M08-Q01',
    prompt:
      'You are studying for a graded take-home exam at a university. Which AI use is most clearly integrity-safe under Module 8?\n\nWhy: Module 8 trains scaffold-not-substitute use. Generating an essay you will submit is substitution; using AI to drill recall and then producing your own answer is scaffold.',
    choices: [
      'Asking the model to write the essay you submit',
      'Asking the model to quiz you on the material with answer-blind questions, then writing the essay yourself and citing your own evidence',
      'Pasting the prompt and submitting the model\'s first reply',
      'Asking the model to "write it like me"',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m08::M08-Q02',
    prompt:
      'A student says, "AI explains it perfectly to me, so I don\'t need to practice." Why does Module 8 push back?\n\nWhy: Comprehension while reading is illusory. Durable understanding comes from retrieval and application, not passive explanation.',
    choices: [
      'AI explanations are illegal',
      'Understanding-on-read is shallow; durable knowledge requires retrieval, application, and feedback the learner produces themselves',
      'Explanations are always wrong',
      'You should never use AI for study',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m08::M08-Q03',
    prompt:
      'Compare "do my homework" prompts to Socratic-tutoring prompts. What is the most common failure of the first?\n\nWhy: Substitution prompts produce polished answers that the learner cannot reconstruct or defend, undermining real learning and integrity.',
    choices: [
      'They are slower',
      'They produce a polished answer the learner cannot rebuild from scratch—integrity risk plus zero durable learning',
      'They use too much electricity',
      'They are too short',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m08::M08-Q04',
    prompt:
      'You ask the model to generate practice questions on a topic, then verify each key against a textbook. What does Module 8 explicitly forbid in this loop?\n\nWhy: Substituting "trust the model\'s answer key" for actual verification is the failure mode. Practice items are fine; rationale-by-fiat is not.',
    choices: [
      'Generating questions',
      'Trusting the model\'s answer key without verifying against a real source—even if the rationale "sounds right"',
      'Saving the questions for later use',
      'Showing the questions to peers',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m08::M08-Q05',
    prompt:
      'You bombed a quiz on a topic. Build the strongest Module 8 repair plan.\n\nWhy: Repair plans diagnose what was missed, choose retrieval drills, and re-test with feedback—not "read it again."',
    choices: [
      '"Read the chapter once more"',
      'Diagnose missed concepts; build retrieval prompts; do timed self-tests blind to keys; verify keys; track the gap until two consecutive clean retests',
      '"Watch a YouTube video"',
      '"Skip the topic"',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m08::M08-Q06',
    prompt:
      'You are preparing for a regulated professional certification with strict AI-use rules. What is the right policy for your study workflow?\n\nWhy: Certified contexts have explicit rules. Module 8 says read the rules first, codify allowed/forbidden moves, and keep evidence of your own reasoning.',
    choices: [
      'Use AI freely—no one will know',
      'Read the cert\'s explicit AI rules first; codify allowed/forbidden moves; keep a personal evidence trail of your own reasoning',
      'Avoid all study tools',
      'Use AI only for grammar fixes',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m08::M08-Q07',
    prompt:
      'Which is a strong retrieval-practice prompt?\n\nWhy: Retrieval prompts ask you to produce an answer from memory first, then check—not read first then ask.',
    choices: [
      '"Explain X to me again in detail"',
      '"Without showing me the answer, ask me five answer-blind questions on X. After each, I\'ll answer; only then reveal the key and a one-line rationale."',
      '"Write the answer for me"',
      '"Make me a summary I can read passively"',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m08::M08-Q08',
    prompt:
      'For a course final paper, which authorship/disclosure stance is defensible under typical university policy?\n\nWhy: Disclosure norms vary—but a stance that names what AI did, what you did, and that the analysis/argument is yours is widely defensible. "It\'s all me" is not.',
    choices: [
      '"All AI, no disclosure"',
      '"AI used for outlining and recall practice; argument, evidence selection, and final writing are mine; AI use disclosed per course policy"',
      '"Pretend it is all my own"',
      '"Disclose nothing because the model is just a tool"',
    ] as const,
    correctIndex: 1,
  },
]

const AE_M09: readonly Course1QuizQuestion[] = [
  {
    id: 'ae-m09::M09-Q01',
    prompt:
      'Which disclosure on a deliverable is credible under Module 9?\n\nWhy: A credible disclosure names what AI did, what the human did, and what was verified—not a generic "AI was used."',
    choices: [
      '"AI may have helped"',
      '"AI was used for outline and first-draft prose. Author verified all factual claims, sources, and figures; final wording and recommendations are author\'s own."',
      '"Powered by AI™"',
      'No disclosure at all',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m09::M09-Q02',
    prompt:
      'On an AI-assisted pull request, who is Responsible vs Accountable?\n\nWhy: Module 9 separates Responsible (does the work, including AI runs) from Accountable (signs off, owns the outcome). Both must be named, not implied.',
    choices: [
      'Same person, always',
      'Responsible: the person running the AI step + author edits. Accountable: a named reviewer who signs off and owns the outcome.',
      'The model is Responsible; no one is Accountable',
      'No one—merging speaks for itself',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m09::M09-Q03',
    prompt:
      'Which task should be inside a "forbidden automation zone" by default for a small team using AI?\n\nWhy: Irreversible/high-blast actions (firings, legal sends, regulatory filings) need human gates, not auto-execution. Module 9 names this explicitly.',
    choices: [
      'Drafting an internal sprint update',
      'Auto-firing employees, auto-sending legal letters, or auto-filing regulatory submissions',
      'Translating internal docs to a second language',
      'Generating meeting notes from transcripts',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m09::M09-Q04',
    prompt:
      'What makes a "review owner" real rather than nominal?\n\nWhy: Real ownership has a named person, a defined what-they-checked, and authority to block release—not just a checkbox.',
    choices: [
      'A checkbox in a tool',
      'A named individual, a defined scope of what they checked, and authority to block release if their criteria are not met',
      'Anyone on the team',
      'The model itself',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m09::M09-Q05',
    prompt:
      'You email a client a deliverable AI helped draft. Which version balances disclosure with trust?\n\nWhy: Disclosure should be specific, calm, and competence-signalling. Vague disclosure or hiding the assistance both erode trust.',
    choices: [
      '"Don\'t worry, only a tiny bit of AI"',
      '"AI assisted with outline and rephrasing; I verified every claim and figure against the source documents you shared, and the recommendations are mine."',
      '"All AI, you\'re welcome"',
      'No mention at all',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m09::M09-Q06',
    prompt:
      'When does disclosure alone become insufficient, requiring escalation?\n\nWhy: Disclosure handles ordinary use. When stakes shift (regulator, customer harm, irreversible decisions), escalation to a named approver is the rule.',
    choices: [
      'Never; disclosure always suffices',
      'When the deliverable affects regulators, safety, irreversible legal/financial actions, or named third parties—escalate to an approver beyond the immediate author',
      'When the deliverable is short',
      'When the deliverable is long',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m09::M09-Q07',
    prompt:
      'A team lead worries that disclosing AI assistance will undermine trust with a key client. How should Module 9 reframe that?\n\nWhy: Hidden AI use that surfaces later breaks trust harder than confident disclosure. Calm, specific disclosure tends to build credibility.',
    choices: [
      'Hide the AI use to protect trust',
      'Hidden assistance found later does more damage than confident, specific disclosure done up front; lead with what was verified and by whom',
      'Tell the client AI is "100% accurate"',
      'Cut all disclosure to be safe',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m09::M09-Q08',
    prompt:
      'A team writes a one-time AI policy and never revisits it. What is the Module 9 critique?\n\nWhy: Module 9 favors operational habits—rituals, checklists, named owners—over framed policy posters that no one runs.',
    choices: [
      'No critique—policies should not change',
      'A static policy is theater; Module 9 asks for operational habits (review owners, disclosure templates, escalation triggers) that survive day-to-day pressure and get revised',
      'The policy should be longer',
      'The policy should be removed entirely',
    ] as const,
    correctIndex: 1,
  },
]

const AE_M10: readonly Course1QuizQuestion[] = [
  {
    id: 'ae-m10::M10-Q01',
    prompt:
      'You are about to paste a list of 8 patient initials with diagnoses into a general AI tool to "summarize the patterns." Which Module 10 tier applies?\n\nWhy: Identifiable health information is restricted/never-enter under typical privacy law and Module 10 framing—even initials plus diagnoses can re-identify.',
    choices: [
      'Safe',
      'Caution',
      'Restricted/never-enter for general-purpose tools—use a sanctioned environment or refuse',
      'Public',
    ] as const,
    correctIndex: 2,
  },
  {
    id: 'ae-m10::M10-Q02',
    prompt:
      'Original prompt: "Here\'s the full client contract with names, fees, and clauses—summarize obligations." Which rewrite passes the minimum-necessary test?\n\nWhy: Minimum-necessary keeps the smallest set of details required to do the task. Names, fees, and counterparties are usually unnecessary for an obligation summary.',
    choices: [
      'Paste the full contract again with even more detail',
      'Replace party names with "[Counterparty]" and fee specifics with "[redacted fee]," keep the obligation language and dates, and ask only for an obligations summary',
      'Add the social security number for context',
      'Skip the rewrite—it sounds the same',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m10::M10-Q03',
    prompt:
      'You need help debugging code that includes an API key string. What\'s the Module 10 move?\n\nWhy: Secrets must be abstracted, not redacted half-heartedly. Treat any leaked key as compromised and rotate.',
    choices: [
      'Paste it as-is and ask the model to "ignore" the key',
      'Replace the key with a placeholder ("<API_KEY>"), share only the failing function and stack trace; assume any previously pasted key is compromised and rotate it',
      'Paste only the first half of the key',
      'Email the key to yourself first',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m10::M10-Q04',
    prompt:
      'A teammate wants to paste a list of employees with protected-class attributes (race, religion) for "fairness analysis." What is the Module 10 stance?\n\nWhy: Protected-class data with identifiable individuals is typically never-enter for general-purpose tools and needs sanctioned environments plus legal review—not a quick paste.',
    choices: [
      'Sure, paste it',
      'Stop. Protected-class data with identifiers is never-enter for general-purpose tools—route to a sanctioned environment with legal/privacy approval and aggregate first',
      'Just remove names and paste the rest',
      'Use a different model and proceed',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m10::M10-Q05',
    prompt:
      'You are asked to paste a confidential financial model the CEO has not yet shared with the board. Which trigger does Module 10 say should fire?\n\nWhy: Pre-disclosure financials = pause/escalate. Confidentiality is a hard boundary even if the tool is "private."',
    choices: [
      'Paste away—you have access',
      'Pause; verify the disclosure boundary; escalate to whoever owns the materiality call before any AI use',
      'Paste it but ask the model to "delete it after"',
      'Paste only the headline number',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m10::M10-Q06',
    prompt:
      'What makes a "Safe-Use Decision Card" operational rather than decorative?\n\nWhy: Operational cards are short, decision-shaped, and live in the workflow. Decorative ones live in a Notion page nobody opens.',
    choices: [
      'It is laminated and pinned to the wall only',
      'It fits on one card, names tier prompts ("Is this safe/caution/restricted/never-enter?"), the next action per tier, and a single escalation contact—and it lives in the workflow',
      'It is a 30-page PDF',
      'It is hidden in HR documents',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m10::M10-Q07',
    prompt:
      'Before pasting into a new AI tool, what data-handling questions does Module 10 say to ask?\n\nWhy: Vendors differ on retention, training, sharing, region, and breach norms. These are pre-paste questions, not post-paste regrets.',
    choices: [
      'No questions—if it\'s online, it\'s fine',
      'Retention period, whether prompts/outputs train future models, data residency/region, sub-processors, and breach notification norms',
      'Only the price',
      'Whether the logo is nice',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m10::M10-Q08',
    prompt:
      'A "before" prompt: "Here is our customer list with emails and phone numbers; segment them by likely churn risk." Which "after" rewrite is best per Module 10?\n\nWhy: Strip identifiers; keep behavior signals. The task does not need names/contact details to model churn risk in this exploratory step.',
    choices: [
      'Paste it as-is plus payment data',
      'Replace identifiers with anonymous IDs; share only behavior columns (recency, frequency, support tickets, plan); reattach identifiers locally only if action is taken',
      'Paste only the phone numbers',
      'Add CC numbers for "context"',
    ] as const,
    correctIndex: 1,
  },
]

const AE_M11: readonly Course1QuizQuestion[] = [
  {
    id: 'ae-m11::M11-Q01',
    prompt:
      'You have 90 minutes to brief leadership on a contested topic. How should Module 11 set the depth of your synthesis?\n\nWhy: Time-boxing depth to deadlines is a Module 11 discipline; depth proportional to time, with explicit unknowns where time ran out.',
    choices: [
      'Always go to maximum depth regardless of deadline',
      'Time-box depth to fit the 90 minutes; mark "out-of-scope" what could not be examined; surface unknowns honestly',
      'Skip evidence and write fast',
      'Refuse to brief on contested topics',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m11::M11-Q02',
    prompt:
      'Five sources disagree on a key statistic central to your brief. What does Module 11 require in the synthesis?\n\nWhy: Conflict must remain visible. Smoothing it into one number or splitting the difference creates false middle ground.',
    choices: [
      'Pick one and present it',
      'Show each source\'s estimate with provenance; explain why a single number is misleading; recommend what evidence would resolve it',
      'Average them silently',
      'Drop the statistic without saying',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m11::M11-Q03',
    prompt:
      'What is a sign that an "extract" prompt preserves provenance well?\n\nWhy: Provenance preservation forces the model to attach source pointers—paragraphs, dates, document ids—so claims can be re-checked.',
    choices: [
      'It returns a single tidy paragraph',
      'It returns claims with source pointers (paragraph or document id), notes confidence, and refuses to invent missing sources',
      'It hides sources for readability',
      'It rephrases everything',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m11::M11-Q04',
    prompt:
      'Two viewpoints disagree sharply, but the model proposes "a balanced middle ground." What does Module 11 caution against?\n\nWhy: False middle ground is a research failure mode. If evidence supports one side more, the brief should say so, not split tokens.',
    choices: [
      'Nothing—balance is always good',
      'False middle ground when evidence is asymmetric; report the disagreement, the strength of evidence on each side, and your considered judgment',
      'Always pick the middle anyway',
      'Pick the louder side',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m11::M11-Q05',
    prompt:
      'A "where this breaks" note belongs in the synthesis. Which is the strongest example?\n\nWhy: Where-this-breaks notes name the conditions under which the analysis no longer holds—what assumption shift would invalidate the brief.',
    choices: [
      '"This is the truth"',
      '"This holds if churn drivers in Q2 mirror Q1; if a new pricing tier launches, the model breaks and we should rerun against fresh data."',
      '"Trust me"',
      '"It works because the model said so"',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m11::M11-Q06',
    prompt:
      'A mini research prompt library should include extract, compare, brief. What else does Module 11 ask you to log per pattern?\n\nWhy: Failure notes per pattern are what make the library reusable. Without them, the next user repeats the same mistakes.',
    choices: [
      'A mascot for each pattern',
      'Failure-mode notes per pattern (what tends to go wrong) and the inputs/audience the pattern fits',
      'A logo only',
      'Nothing—prompts are self-explanatory',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m11::M11-Q07',
    prompt:
      'A 1-page brief vs a 10-page report on the same topic. Module 11 says length should be driven by what?\n\nWhy: Length is a function of evidence depth and audience need—not a default. A 10-page report on thin evidence is overreach; a 1-page brief on a complex regulatory call may be irresponsible.',
    choices: [
      'Whichever the writer enjoys',
      'Length proportional to the evidence supporting decisions and to what the audience must do—not a fixed default',
      'Always 10 pages',
      'Always 1 page',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m11::M11-Q08',
    prompt:
      'What belongs in the "honest unknowns" section of a brief?\n\nWhy: Honest unknowns name what you couldn\'t check, why, and what evidence would resolve it. Vague disclaimers don\'t qualify.',
    choices: [
      '"There may be unknowns"',
      'Specific unknowns (e.g., "Q4 cohort retention not yet observable"), why they remain (data lag), and what would resolve them (the next data refresh)',
      'A blanket disclaimer',
      'Nothing—looking strong matters',
    ] as const,
    correctIndex: 1,
  },
]

const AE_M12: readonly Course1QuizQuestion[] = [
  {
    id: 'ae-m12::M12-Q01',
    prompt:
      'Which framing best names a workflow trigger under Module 12?\n\nWhy: Triggers should be encoded by stakes × reversibility × blast radius—so high-stakes, irreversible, broad-blast steps demand human gates regardless of speed gains.',
    choices: [
      '"Run the AI step whenever it\'s convenient"',
      '"Run the AI step when stakes are low, the action is reversible, and blast radius is small; route to a human gate otherwise."',
      '"Run automatically always"',
      '"Manual always, no AI"',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m12::M12-Q02',
    prompt:
      'A workflow auto-sends procurement approval emails to vendors based on AI suggestions, with no human gate. What change does Module 12 recommend?\n\nWhy: Irreversible external commitments need human gates upstream of send. Speed is no excuse for skipping gates on contractually-binding actions.',
    choices: [
      'Add more AI to make it faster',
      'Insert a named human gate before send for any approval over a stakes threshold; AI drafts, human commits',
      'Skip all gates—speed is everything',
      'Remove the email step entirely',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m12::M12-Q03',
    prompt:
      'Your AI vendor goes down at 4 p.m. on a Friday. Which is the strongest fallback plan?\n\nWhy: Fallbacks must be human-executable without the model. "Wait for the model" is not a fallback.',
    choices: [
      'Wait for the model to come back up',
      'A documented manual run-book a human can execute (templates, key contacts, decision rules) so the workflow continues at degraded speed but does continue',
      'Cancel all work',
      'Switch to an unvetted vendor immediately',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m12::M12-Q04',
    prompt:
      'Before handing a step to an autonomous agent, which precondition is non-negotiable in Module 12?\n\nWhy: Agent readiness requires bounded scope, reversible actions, observable outcomes, and clear stop conditions. Without those, the agent should remain in suggest-only mode.',
    choices: [
      '"It\'s 2025—agents are mature"',
      'Bounded scope, reversible actions, observable outcomes, named owner, defined stop conditions, and a human approval gate for irreversible side effects',
      '"Just try it"',
      '"As long as it\'s fast"',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m12::M12-Q05',
    prompt:
      'What makes an SOP slice usable rather than aspirational?\n\nWhy: Usable SOP slices have named owners, inputs/outputs, and decision diamonds—not "best efforts." Module 12 trains the discipline of executable SOP language.',
    choices: [
      'Aesthetic diagrams only',
      'Named owners per step, defined inputs/outputs, decision diamonds with criteria, AI vs human steps labeled, and fallbacks listed',
      '"Try your best"',
      '"Whoever has time"',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m12::M12-Q06',
    prompt:
      'In a tabletop, what tends to "break first under fatigue"?\n\nWhy: Implicit handoffs, undefined fallbacks, and steps where the prompt assumes high focus collapse first under fatigue—Module 12 trains learners to find these before reality does.',
    choices: [
      'The AI vendor\'s logo',
      'Implicit handoffs, ambiguous owners, prompts that assume high focus, and steps with no fallback when an upstream output is missing',
      'The font in the SOP',
      'Nothing—workflows are self-healing',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m12::M12-Q07',
    prompt:
      'A workflow diagram has every step but no owners. Module 12 says what?\n\nWhy: Without named owners, the diagram is theater. Real workflows survive because someone is accountable per step.',
    choices: [
      'Owners are optional in modern systems',
      'A diagram without named owners is theater; assign a person (not a team) per step and record on-call/backup for AI-assisted steps',
      'Diagrams should never name owners',
      'Owners only matter for finance',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m12::M12-Q08',
    prompt:
      'Module 12 distinguishes solo creator vs team-lead artifacts. What\'s the practical difference?\n\nWhy: Solo creators ship lighter SOPs but still need fallbacks; team leads need explicit responsibility maps because more people break implicit norms faster.',
    choices: [
      'No difference—same artifact for both',
      'Solo: lighter SOP + personal fallbacks. Team-lead: explicit responsibility map, named owners, escalation paths, prompt library with review owners',
      'Team-leads need no documentation',
      'Solo creators need legal review for every prompt',
    ] as const,
    correctIndex: 1,
  },
]

const AE_M13: readonly Course1QuizQuestion[] = [
  {
    id: 'ae-m13::M13-Q01',
    prompt:
      'A two-page decision memo under Module 13 must include which structure?\n\nWhy: Module 13 trains decision memos with explicit assumptions, options, tradeoffs, recommendation, falsifiers, and next information buys—not a vibe summary.',
    choices: [
      'A long preamble and a single recommendation',
      'Assumptions, options with tradeoffs, recommendation with rationale, falsifiers (what would change the recommendation), and next information buys',
      'Just the recommendation',
      'A list of opinions only',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m13::M13-Q02',
    prompt:
      'In a pre-mortem, what is the right question to ask?\n\nWhy: Pre-mortems imagine the project has failed and ask why. Module 13 uses AI as adversary to surface failure modes before launch—not after.',
    choices: [
      '"Why will this succeed?"',
      '"Imagine it is six months later and this failed badly. List the most plausible reasons; for each, what early indicator would we now wish we had tracked?"',
      '"Why is everyone wrong but us?"',
      '"How do we celebrate the win?"',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m13::M13-Q03',
    prompt:
      'A model proposes three scenarios with confident percentages. How should Module 13 frame these in the memo?\n\nWhy: Model scenarios are hypotheses, not evidence. Label them as such and tie each to assumptions and disconfirming signals.',
    choices: [
      'Treat them as facts',
      'Label them as hypotheses; attach assumptions, disconfirming signals, and the human owner\'s confidence; do not promote them to claims',
      'Pick the highest probability and ignore the rest',
      'Hide them from the reader',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m13::M13-Q04',
    prompt:
      'What incentives or missing data should a memo on a vendor pick surface explicitly?\n\nWhy: Surfacing incentives and missing data is what turns a memo into something a busy reviewer can challenge. Hidden incentives is the classic failure.',
    choices: [
      '"None worth mentioning"',
      'Vendor relationships of the recommender, missing comparator quotes, missing reference checks, and what data would flip the call',
      'A signed loyalty oath',
      'Only the recommended vendor\'s perspective',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m13::M13-Q05',
    prompt:
      'A reviewer asks, "What would change your mind?" Why does Module 13 expect a one-line answer?\n\nWhy: A clear falsifier is a litmus test of accountable thinking. "Nothing" is unfalsifiable; "I don\'t know" suggests the analysis isn\'t finished.',
    choices: [
      'Because reviewers like brevity',
      'Because a one-line falsifier is the litmus test of accountable analysis—it forces evidence-shaped thinking',
      'Because falsifiers don\'t matter',
      'Because the model can answer for the human',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m13::M13-Q06',
    prompt:
      'Using AI as adversary in a pre-mortem—what is the productive use?\n\nWhy: AI as adversary widens failure modes you might miss. Trusting it as oracle is the failure mode Module 13 warns against.',
    choices: [
      'Trust the AI as oracle and accept its judgment',
      'Use it to widen the failure-mode space; the human owner reconciles which risks are real and ranks them honestly',
      'Use it only for moral support',
      'Skip pre-mortems—too pessimistic',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m13::M13-Q07',
    prompt:
      'Who owns the recommendation in a Module 13 memo?\n\nWhy: Authorship, evidence standards, and accountability remain with the human owner. The model can widen options, but it cannot sign.',
    choices: [
      'The model',
      'The human author/owner—authorship, evidence standards, and accountability stay with them; the model can widen options but cannot sign',
      'No one in particular',
      'The reviewer',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m13::M13-Q08',
    prompt:
      'For a high-stakes irreversible call (e.g., shutting a product line), which "next information buy" makes most sense?\n\nWhy: Information buys are proportional to stakes. Cheap quick checks first; deeper diligence next; never "trust the model."',
    choices: [
      'Just trust the model',
      'A short ordered list: cheap checks first (existing data, key stakeholder interviews), then targeted diligence (cohort study, customer panel), then full review—each with cost/time/decision-impact',
      'Bypass all checks—act now',
      'Wait indefinitely',
    ] as const,
    correctIndex: 1,
  },
]

const AE_M14: readonly Course1QuizQuestion[] = [
  {
    id: 'ae-m14::M14-Q01',
    prompt:
      'Which is a coordination risk Module 14 warns small teams about?\n\nWhy: Module 14 lists six concrete risks—uneven disclosure, inconsistent review ownership, leaked data via shared prompts, prompt-library drift, escalation gaps, approval ambiguity. "Vibes" is not on the list.',
    choices: [
      'Vibes mismatch',
      'Inconsistent disclosure, unclear review ownership, data boundary leaks via shared prompts, prompt-library drift, escalation gaps, approval ambiguity',
      'Snack preferences',
      'Calendar color choices',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m14::M14-Q02',
    prompt:
      'A workable team disclosure norm looks like what?\n\nWhy: Workable norms are short, decision-shaped, and run-able by peers without a manager present. "Always disclose somehow" is too vague to enforce.',
    choices: [
      '"Always disclose somehow"',
      '"On any external deliverable, name what AI did + what the human verified, in one paragraph; on internal-only artifacts, a one-line tag suffices."',
      '"Hide all AI use"',
      '"No rules"',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m14::M14-Q03',
    prompt:
      'A responsibility map for an AI-assisted release names what?\n\nWhy: Maps name people per step (drafter, verifier, approver) and what each checks—not just stages.',
    choices: [
      'Just the stages with no people',
      'Per step: drafter, verifier (what they check), approver (what they sign off), escalation contact—as people, not roles in the abstract',
      'Only the deadline',
      'Only the model name',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m14::M14-Q04',
    prompt:
      'A shared prompt library has 60 prompts and no review owners. What does Module 14 require?\n\nWhy: Without a review owner per prompt, libraries decay. Every prompt needs a person responsible for keeping it correct, current, and safe.',
    choices: [
      'Leave it; libraries are self-organising',
      'Each entry needs an owner accountable for currency, correctness, boundaries, and version notes; entries without owners are quarantined',
      'Delete the library',
      'Add 60 more prompts to dilute the problem',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m14::M14-Q05',
    prompt:
      'A small team\'s "data boundary" rule—what makes it operational?\n\nWhy: Operational boundaries name explicit do-not-enter categories, sanctioned environments for sensitive work, and a single person to ask when in doubt.',
    choices: [
      '"Be careful"',
      '"Customer PII, contracts before signature, salary data, and unfiled financials never go into general-purpose tools; for those, use [sanctioned env]; ask [person] if unsure."',
      '"It depends on the day"',
      '"Whatever the model thinks is safe"',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m14::M14-Q06',
    prompt:
      'When is escalation the right move for an AI-assisted deliverable?\n\nWhy: Escalation triggers are explicit—novel/contested data class, deliverable affecting regulators or named customers, or first-of-kind use of a new tool. Module 14 codifies these so peers don\'t guess.',
    choices: [
      'Whenever you feel like it',
      'On novel data classes, regulator/customer-facing impact, irreversible commitments, or first-of-kind use of a new tool—route to the named approver',
      'Never escalate; it slows things',
      'Only on Mondays',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m14::M14-Q07',
    prompt:
      'Governance-lite for a team of 8 means what under Module 14?\n\nWhy: Governance-lite is one page, decision-shaped, and revisited monthly. It is not a 30-page binder.',
    choices: [
      'A 30-page binder',
      'A one-page agreement covering disclosure, review ownership, data boundaries, escalation, and approval—reviewed monthly and editable by the team',
      'A signed contract per use',
      'No documentation',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m14::M14-Q08',
    prompt:
      'A team\'s output quality is wildly uneven across people for the same task. What single coordination move is highest leverage in Module 14?\n\nWhy: Shared prompts plus a review owner anchor consistency. Skill differences fade when the prompt is shared and a verifier checks the same things every time.',
    choices: [
      'Hire more people',
      'Build a shared prompt for the task, name a review owner who checks the same criteria every time, and store version notes in the library',
      'Tell people to "just be better"',
      'Shorten meetings',
    ] as const,
    correctIndex: 1,
  },
]

const AE_M15: readonly Course1QuizQuestion[] = [
  {
    id: 'ae-m15::M15-Q01',
    prompt:
      'A prompt-pack entry under Module 15 must include which fields at minimum?\n\nWhy: Module 15 specifies purpose, audience, inputs, boundaries, review criteria, ownership, version notes—every entry, every time. Less is hobby-level; more is fine.',
    choices: [
      'Just the prompt text',
      'Purpose, audience, inputs, boundaries (data + refusal), review criteria, owner, version notes',
      'A logo and tagline only',
      'A list of synonyms',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m15::M15-Q02',
    prompt:
      'A playbook differs from a prompt by including what?\n\nWhy: Playbooks include when-to-use, steps, prompts at each step, checkpoints, safety rules, expected outputs, and failure signs—linked back to the SOP discipline of Module 12.',
    choices: [
      'A photo of the team',
      'When to use, steps, prompts per step, checkpoints, safety rules, expected outputs, and failure signs—linked to SOPs from Module 12',
      'Only the prompts',
      'Only the outputs',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m15::M15-Q03',
    prompt:
      'A "quality test" of a prompt pack means what under Module 15?\n\nWhy: Tests run the pack on a fresh, realistic scenario it was not optimized on—not a beloved demo case. Then you log gaps and revise.',
    choices: [
      'Run the favorite example again',
      'Run the pack on a fresh, realistic scenario it was not built around; capture gaps; log a version note tying changes to the gap found',
      'Skip testing—prompts are intuitive',
      'Test only on synthetic data',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m15::M15-Q04',
    prompt:
      'Which version note is strong on a prompt-pack update?\n\nWhy: Strong notes name what changed, why, and what behavior is expected to change. "Tweaks" is not auditable.',
    choices: [
      '"v1.2: tweaks"',
      '"v1.2: tightened refusal-on-protected-class language; prior version softened language under pressure in 2/5 tests; this version refused 5/5; reviewer: A. Owner."',
      '"v1.2: see PR"',
      '"v1.2: minor"',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m15::M15-Q05',
    prompt:
      'A pack entry\'s "boundaries" field should specify what?\n\nWhy: Boundaries name data classes, refusal cases, audience limits, and escalation rules. Without these, packs spread blast radius silently.',
    choices: [
      'Nothing—boundaries are personal',
      'Data classes the prompt must not be used on, refusal cases, audience limits, and escalation rules when the user is unsure',
      'Aesthetic preferences only',
      'Brand guidelines only',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m15::M15-Q06',
    prompt:
      'What does naming an "owner" on each pack entry actually do?\n\nWhy: Ownership creates accountability for currency, correctness, and safety—and a single contact when someone is unsure. Without an owner, decay is invisible.',
    choices: [
      'Nothing—ownership is symbolic',
      'Creates accountability for currency, correctness, boundary enforcement, and a contact for questions—and a deadline for review on a cadence',
      'Only credits the author for fame',
      'Slows the team down on purpose',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m15::M15-Q07',
    prompt:
      'When should a pack be updated rather than reused as-is?\n\nWhy: Update triggers include new data classes, behavioral regression in tests, change in audience, change in policy, or any failure surfaced during use.',
    choices: [
      'Never—stability is the goal',
      'On new data classes, regression in tests, audience changes, policy changes, or any user-surfaced failure—each tied to a version note',
      'Only when leadership asks',
      'Only at year-end',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m15::M15-Q08',
    prompt:
      '"Review criteria" in a pack entry serve which purpose under Module 15?\n\nWhy: Review criteria let any verifier check the same things consistently—turning verification from craft to a checklist that runs without the original author.',
    choices: [
      'Decoration',
      'Standardise verification so any reviewer can check the same dimensions (faithfulness, audience fit, privacy, refusal behavior, format) without depending on the author',
      'Replace human review entirely',
      'Make the pack longer',
    ] as const,
    correctIndex: 1,
  },
]

const AE_M16: readonly Course1QuizQuestion[] = [
  {
    id: 'ae-m16::M16-Q01',
    prompt:
      'Which is the strongest capstone task choice under Module 16?\n\nWhy: A bounded, real, reviewable task tied to your pathway is the right scope—not a giant unreviewable project or a toy task with no stakes.',
    choices: [
      'A toy task with no stakes',
      'A bounded, real task on your pathway with a real reviewer, achievable in the time, and producing a reviewer-ready bundle',
      'A six-month research project',
      '"Whatever the AI suggests"',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m16::M16-Q02',
    prompt:
      'Mid-capstone, you realise the workflow needs real customer data. What does Module 16 say to do?\n\nWhy: Capstone runs Module 10 privacy discipline alongside Module 16 execution. If real PII is needed, redact/abstract or move to a sanctioned environment before proceeding.',
    choices: [
      'Paste the data into the public AI tool—"it\'s for learning"',
      'Stop; apply Module 10 (minimum-necessary, redact/abstract, sanctioned env if needed) before proceeding; document the decision in the bundle',
      'Skip privacy because deadlines are tight',
      'Use synthetic data only and ignore the privacy step',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m16::M16-Q03',
    prompt:
      'You self-score the seven-criterion rubric. One criterion is honestly "Not ready." What does Module 16 expect?\n\nWhy: Honest gap-naming beats inflated scores. Rubric self-score plus a named gaps list is the credibility move.',
    choices: [
      'Inflate it to "Strong" so the bundle looks complete',
      'Mark it "Not ready," name the gap precisely, and either close it before submission or submit with a clear gap-and-next-step plan',
      'Hide that criterion',
      'Skip the rubric entirely',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m16::M16-Q04',
    prompt:
      'A reviewer-ready capstone bundle includes filenames, disclosure, self-critique, and rubric self-score. Which addition makes it most reviewable?\n\nWhy: Module 16 expects an end-to-end trail: prompts, verification notes, revision log, privacy decisions, and a one-page reflection on judgment. Polish without trail is incomplete.',
    choices: [
      'A glossy cover image',
      'The prompts used (versioned), verification notes, revision log, privacy decisions, and a one-page reflection on judgment',
      'Just the final document with no trail',
      'A list of synonyms',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m16::M16-Q05',
    prompt:
      'Before "submitting" the capstone, you run the self-critique fallback (pause, named-reader, claim-trace, privacy, usefulness, prompts, revision log, confidence note). Why?\n\nWhy: The fallback catches the failure modes the rubric won\'t—someone with no context picks it up later and must understand it. Module 16 explicitly trains this habit.',
    choices: [
      'It\'s a ritual with no purpose',
      'It surfaces what a fresh reader would not understand—missing trace, weak privacy decisions, hand-wavy confidence—before the work is signed off',
      'It is only for first-time learners',
      'It replaces all earlier checks',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m16::M16-Q06',
    prompt:
      'You bring your Module 15 prompt pack into the capstone. Which use is most appropriate?\n\nWhy: The pack is the toolkit. Use it as the starting set with version notes; iterate within the capstone task; record changes back to the pack.',
    choices: [
      'Throw the pack out and start fresh',
      'Use the pack as a starting toolkit; iterate prompts inside the capstone with version notes; flow improvements back to the pack with new version notes',
      'Copy-paste outputs without iteration',
      'Pretend the pack does not exist',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m16::M16-Q07',
    prompt:
      'A credible one-page reflection on judgment is which kind of writing?\n\nWhy: The reflection names where you used judgment, where you deferred to a model, where you pushed back on it, and what you would do differently—in concrete language, not slogans.',
    choices: [
      'A motivational essay with slogans',
      'A short concrete piece naming where you exercised judgment, where you deferred, where you pushed back on the model, and what you would do differently next time',
      'A summary of the course',
      'A bullet list of features',
    ] as const,
    correctIndex: 1,
  },
  {
    id: 'ae-m16::M16-Q08',
    prompt:
      'A peer hands in a capstone with no privacy notes, no prompt versions, and a "Strong" self-score across all seven rubric criteria. What does Module 16 say to do?\n\nWhy: Capstones are judged on evidence, not optimism. A bundle missing privacy notes and prompt trail is not reviewer-ready, regardless of self-score.',
    choices: [
      'Approve—self-scores are personal',
      'Send back: missing privacy decisions, missing prompt/version trail, unjustified rubric scores—name the specific gaps and ask for the missing evidence',
      'Approve only if the prose reads well',
      'Reject the whole module forever',
    ] as const,
    correctIndex: 1,
  },
]

const BY_MODULE: Record<string, readonly Course1QuizQuestion[]> = {
  'ae-m01': AE_M01,
  'ae-m02': AE_M02,
  'ae-m03': AE_M03,
  'ae-m04': AE_M04,
  'ae-m05': AE_M05,
  'ae-m06': AE_M06,
  'ae-m07': AE_M07,
  'ae-m08': AE_M08,
  'ae-m09': AE_M09,
  'ae-m10': AE_M10,
  'ae-m11': AE_M11,
  'ae-m12': AE_M12,
  'ae-m13': AE_M13,
  'ae-m14': AE_M14,
  'ae-m15': AE_M15,
  'ae-m16': AE_M16,
}

export function course1AiEssentialsQuizQuestionsForModule(moduleId: string): readonly Course1QuizQuestion[] {
  return BY_MODULE[moduleId] ?? []
}
