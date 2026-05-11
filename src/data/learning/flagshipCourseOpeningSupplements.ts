/**
 * First-lesson enrichment per flagship course — adds institutional-grade orientation without duplicating whole curricula.
 * Consumed by session block generation when orderInCourse === 1.
 */

export const FLAGSHIP_OPENING_LESSON_SUPPLEMENT: Record<string, string> = {
  'ai-essentials':
    'Welcome. This module starts with how AI behaves today—often fluent, sometimes wrong—and why human judgment stays non‑negotiable. You will read outputs as hypotheses you can test, not as facts. You will name common failure modes (fabrication, omission, overconfidence, missing caveats), see why thin prompts invite thin reasoning, and practice sorting work by risk so you know when verification is mandatory. The written responses you save here become evidence you can carry into later modules and your portfolio.',

  'ai-powered-workflows-and-productivity':
    'You will practice professional prompt engineering inside real workflows—anatomy (role, context, constraints, format), multi-step prompting, critique and versioning, reusable templates and prompt libraries tied to QA lanes—so AI work is repeatable, comparable, and owned like other engineering assets.',

  'data-and-decisions':
    'Expect decision-first thinking: metrics serve questions, visuals carry uncertainty honestly, and every chart invites a “what would mislead me?” pass.',

  'web-and-software-foundations':
    'You will connect how software is structured to how it breaks—so you can collaborate with builders, scope work credibly, and debug assumptions early.',

  'digital-safety':
    'Threat modeling and proportionate controls: practical hygiene, realistic adversaries, and communication others can actually follow—not fear theater.',

  'marketing-and-growth':
    'Growth here is falsifiable demand learning—audience evidence before spend, spine before slogans, channel bets with kill rules, measurement that admits uncertainty.',

  'business-builder':
    'You build venture mechanics under scrutiny: validation thresholds, priced offers, cash-aware delivery, cadence operators actually follow—then growth sequenced responsibly.',

  'money-and-finance':
    'Rolling money clarity for real decisions: cash timing, budgets with owners, contribution sketches, scenarios, negotiation prep—precision where it earns its keep.',

  'product-thinking':
    'Evidence-led product judgment: honest discovery, falsifiable problems, accountable cuts, specs that prevent rework, shipping loops that learn without exploiting users.',

  'project-execution':
    'Delivery craft: explicit commitments, dependency realism, risk triggers, cadence that decides, quality gates, escalation with evidence, retros that transfer learning.',

  'career-launch':
    'Career design with proof: positioning, narrative, negotiation, and artifacts that demonstrate competence—not generic résumé optimism.',

  'clear-communication':
    'Communication as engineered clarity: structure, audience empathy, feedback loops, and calm authority without performing confidence.',

  'research-and-critical-thinking':
    'Evidence discipline: questions that bite, sources you can audit, synthesis without motivated reasoning, and judgment under incomplete information.',

  'leadership-and-teams':
    'Leadership as enabling performance: clarity, accountability, psychological safety within standards, and decisions teammates can repeat.',

  'teaching-and-facilitation':
    'Learning experience design: outcomes, practice design, formative checks, inclusion, and facilitation moves that respect adult learners.',
}
