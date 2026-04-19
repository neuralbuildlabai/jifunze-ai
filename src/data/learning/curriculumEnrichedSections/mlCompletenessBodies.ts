/**
 * Completes authored ML readers for remaining curriculum slugs (Core ML Concepts, Practical Workflow, Applied Paths).
 */
import type { PublicStarterLessonSection } from '../../publicStarterLibraries/aiFoundations'

export const ENRICHED_ML_COMPLETENESS_SECTIONS_BY_SLUG: Record<string, PublicStarterLessonSection[]> = {
  'core-ml-concepts-classification': [
    {
      heading: 'Classification chooses discrete labels—costs vary by mistake type',
      paragraphs: [
        'Classification maps inputs to categories (spam/not spam, approve/deny). The operational question is asymmetric costs: false positives vs false negatives change acceptable tradeoffs.',
        'Baselines matter: naive majority-class models can look accurate under imbalance—always compare against simple rules and calibrated thresholds.',
      ],
    },
    {
      heading: 'Worked framing',
      paragraphs: [
        'Define positive class explicitly; write decision consequences for FP vs FN; choose metrics tied to those consequences—not generic accuracy.',
      ],
    },
    {
      heading: 'Serious mistakes to avoid',
      paragraphs: [
        'Optimizing accuracy without slicing rare cohorts.',
        'Treating probability outputs as calibrated when they are not.',
      ],
    },
  ],

  'core-ml-concepts-regression': [
    {
      heading: 'Regression predicts quantities—evaluate residual behavior',
      paragraphs: [
        'Regression outputs continuous values (demand, latency). Big errors often concentrate in tails—means and medians hide damage.',
        'Interpret coefficients and features cautiously outside their training regime—extrapolation is invisible until it hurts.',
      ],
    },
    {
      heading: 'Worked check',
      paragraphs: [
        'Plot errors vs cohort features; hunt systematic bias—not only average error.',
      ],
    },
    {
      heading: 'Judgment cue',
      paragraphs: [
        'Ask whether the metric punishes rare-but-critical extremes (financial loss, outages). If not, revise evaluation.',
      ],
    },
  ],

  'core-ml-concepts-common-supervised-learning-problems': [
    {
      heading: 'Supervised shapes appear everywhere',
      paragraphs: [
        'Ranking, forecasting next step, OCR, tagging—each differs in labels, leakage risk, and monitoring—don’t pretend one playbook fits all.',
      ],
    },
    {
      heading: 'Worked mapping',
      paragraphs: [
        'Pick a product ML feature—identify labels, latency requirements, and human override points.',
      ],
    },
    {
      heading: 'Misconception',
      paragraphs: [
        '“More features equals better.” Features increase maintenance and drift surface area.',
      ],
    },
  ],

  'core-ml-concepts-evaluating-supervised-models': [
    {
      heading: 'Evaluation is an operational contract',
      paragraphs: [
        'Pick metrics tied to decisions; evaluate by slices; define rollback triggers before launch.',
      ],
    },
    {
      heading: 'Worked evaluation brief',
      paragraphs: [
        'Write: goal → baseline → primary metric → guardrail metrics → known blind spots.',
      ],
    },
    {
      heading: 'Anti-pattern',
      paragraphs: [
        'Leaderboard optimization disconnected from deployment constraints.',
      ],
    },
  ],

  'core-ml-concepts-clustering': [
    {
      heading: 'Clustering finds structure—interpretation is human work',
      paragraphs: [
        'Clusters compress complexity but can encode bias from history; stability checks and qualitative inspection matter.',
      ],
    },
    {
      heading: 'Worked sanity check',
      paragraphs: [
        'If clusters cannot be actioned (policies, routing), they stay decorative.',
      ],
    },
    {
      heading: 'Risk',
      paragraphs: [
        'Using clusters as moral sorting—often illegal/unethical without rigor.',
      ],
    },
  ],

  'core-ml-concepts-dimensionality-reduction': [
    {
      heading: 'Reduction aids visualization and speed—not automatic truth',
      paragraphs: [
        'Techniques compress variance; they can hide rare-but-critical outliers—pair with slice monitoring.',
      ],
    },
    {
      heading: 'Practice',
      paragraphs: [
        'Always ask what was discarded and whether that matters for fairness or safety.',
      ],
    },
    {
      heading: 'Misstep',
      paragraphs: [
        'Trusting 2D plots as ground truth for high-stakes separation.',
      ],
    },
  ],

  'core-ml-concepts-pattern-discovery': [
    {
      heading: 'Pattern discovery is exploratory—hypothesis discipline required',
      paragraphs: [
        'Treat findings as hypotheses until validated on fresh data with pre-registered checks.',
      ],
    },
    {
      heading: 'Worked habit',
      paragraphs: [
        'Document “how we’d be wrong” before exploring—reduces p-hacking vibes.',
      ],
    },
    {
      heading: 'Trap',
      paragraphs: [
        'Storytelling after seeing clusters—confirmation bias accelerates.',
      ],
    },
  ],

  'core-ml-concepts-business-and-research-use-cases': [
    {
      heading: 'Business vs research differ in accountability',
      paragraphs: [
        'Business ML needs owners, SLAs, monitoring, and ethics review paths; research tolerates uncertainty differently.',
      ],
    },
    {
      heading: 'Worked contrast',
      paragraphs: [
        'Same algorithm—different documentation burden if users rely on outputs for money or safety.',
      ],
    },
    {
      heading: 'Evaluation lens',
      paragraphs: [
        'Ask who pays for silent failure—optimize there.',
      ],
    },
  ],

  'practical-ml-workflow-defining-the-problem': [
    {
      heading: 'Problem definition beats algorithm Twitter',
      paragraphs: [
        'Define decision, actions, constraints, acceptable errors, and what data truly represents the future deployment world.',
      ],
    },
    {
      heading: 'Worked definition sheet',
      paragraphs: [
        'Answer: what is predicted, at what granularity, with what latency, with what human gates?',
      ],
    },
    {
      heading: 'Failure mode',
      paragraphs: [
        'Optimizing proxy metrics that drift from business intent.',
      ],
    },
  ],

  'practical-ml-workflow-preparing-the-data': [
    {
      heading: 'Data prep is where ethics and leakage live',
      paragraphs: [
        'Document provenance, consent boundaries, joins, and time semantics—most “model bugs” are data bugs.',
      ],
    },
    {
      heading: 'Worked leakage hunt',
      paragraphs: [
        'For each feature ask: “could this exist at prediction time in production?” If unclear, assume danger.',
      ],
    },
    {
      heading: 'Habit',
      paragraphs: [
        'Version datasets like code—reproducibility is safety.',
      ],
    },
  ],

  'practical-ml-workflow-choosing-a-baseline': [
    {
      heading: 'Baselines prevent science-project ML',
      paragraphs: [
        'Start with simple, interpretable models or rules—prove lift with honest evaluation, not complexity for its own sake.',
      ],
    },
    {
      heading: 'Worked baseline list',
      paragraphs: [
        'Rules + logistic/linear; identical features; identical splits—compare before deep nets.',
      ],
    },
    {
      heading: 'Misconception',
      paragraphs: [
        '“Baseline is embarrassing.” Baseline is intellectual honesty.',
      ],
    },
  ],

  'practical-ml-workflow-iterating-on-a-model': [
    {
      heading: 'Iteration needs controlled experiments',
      paragraphs: [
        'Change one thing at a time; keep a lab notebook of hypotheses and outcomes; prefer error analysis over random hyperparameter sweeps.',
      ],
    },
    {
      heading: 'Worked loop',
      paragraphs: [
        'Pick top error bucket → collect examples → fix data/labels/features → re-evaluate slice.',
      ],
    },
    {
      heading: 'Anti-pattern',
      paragraphs: [
        'Retraining without addressing dominant error causes.',
      ],
    },
  ],

  'practical-ml-workflow-interpreting-model-output': [
    {
      heading: 'Interpretations are hypotheses',
      paragraphs: [
        'Feature attributions can mislead under correlation and shift—validate with slices and domain checks.',
      ],
    },
    {
      heading: 'Worked discipline',
      paragraphs: [
        'Pair explanations with targeted tests: “if this feature drives predictions, show metric shift when perturbed realistically.”',
      ],
    },
    {
      heading: 'Risk',
      paragraphs: [
        'Explaining to justify rather than to test.',
      ],
    },
  ],

  'practical-ml-workflow-risks-fairness-and-bias': [
    {
      heading: 'Fairness is stakeholder-defined and measured',
      paragraphs: [
        'Define groups and harms; measure disparities; know legality in your jurisdiction—avoid performative “fairness washing.”',
      ],
    },
    {
      heading: 'Worked question set',
      paragraphs: [
        'Who can be harmed, how, and what mitigation is feasible without breaking utility?',
      ],
    },
    {
      heading: 'Misstep',
      paragraphs: [
        'Removing protected attributes naively—often worsens proxies.',
      ],
    },
  ],

  'practical-ml-workflow-monitoring-and-drift-basics': [
    {
      heading: 'Monitoring is how models age safely',
      paragraphs: [
        'Track inputs, outputs, slice metrics, and business guardrails—set triggers for retrain/rollback/human takeover.',
      ],
    },
    {
      heading: 'Worked monitoring sketch',
      paragraphs: [
        'Pick three drift signals: label distribution shift, score shift, cohort error spikes.',
      ],
    },
    {
      heading: 'Trap',
      paragraphs: [
        'Monitoring only aggregate accuracy—minority slices die quietly.',
      ],
    },
  ],

  'practical-ml-workflow-human-oversight-in-ml-systems': [
    {
      heading: 'Oversight must be operable',
      paragraphs: [
        'Define who reviews what, when escalations fire, and how overrides are logged—fatigue breaks oversight.',
      ],
    },
    {
      heading: 'Worked policy test',
      paragraphs: [
        'When automation confidence is mid, route to human with decision-support info—not raw model dumps.',
      ],
    },
    {
      heading: 'Ethical note',
      paragraphs: [
        'Avoid “pretend automation” that hides human labor poorly paid or unprotected.',
      ],
    },
  ],

  'applied-ml-paths-recommendations': [
    {
      heading: 'Recommendations optimize objectives—often not user wellbeing',
      paragraphs: [
        'Engagement maximization can harm—pair recsys metrics with harm constraints and evaluations beyond clicks.',
      ],
    },
    {
      heading: 'Worked safeguard',
      paragraphs: [
        'Define content classes you will not optimize for exploitation—document and monitor.',
      ],
    },
    {
      heading: 'Evaluation',
      paragraphs: [
        'Measure diversity, satisfaction, and downstream outcomes—not only CTR.',
      ],
    },
  ],

  'applied-ml-paths-forecasting': [
    {
      heading: 'Forecasting fails on regime shifts',
      paragraphs: [
        'Treat COVID-like shocks and promo calendars explicitly; communicate uncertainty bands honestly to stakeholders.',
      ],
    },
    {
      heading: 'Worked practice',
      paragraphs: [
        'Backtest with realistic latency: what would you have known when?',
      ],
    },
    {
      heading: 'Misconception',
      paragraphs: [
        '“More history is always better.” Irrelevant history teaches wrong seasonality.',
      ],
    },
  ],

  'applied-ml-paths-risk-scoring': [
    {
      heading: 'Risk scoring is regulation-adjacent—design for contestability',
      paragraphs: [
        'Document features, appeal paths, and disparate impact testing where required—avoid black-box fatalism.',
      ],
    },
    {
      heading: 'Worked stakeholder brief',
      paragraphs: [
        'Explain tradeoffs between inclusion vs fraud loss in language leadership understands.',
      ],
    },
    {
      heading: 'Serious failure',
      paragraphs: [
        'Proxy discrimination via correlated features—monitor cohort outcomes.',
      ],
    },
  ],

  'applied-ml-paths-personalization': [
    {
      heading: 'Personalization amplifies preferences—and biases',
      paragraphs: [
        'Use opt-outs, exploration, and sanity caps; monitor echo-chamber metrics where relevant.',
      ],
    },
    {
      heading: 'Worked check',
      paragraphs: [
        'Ask what personalization optimizes week-to-week vs long-term user benefit.',
      ],
    },
    {
      heading: 'Risk',
      paragraphs: [
        'Hyper-personalized pricing or exclusion can become regulatory lightning rod.',
      ],
    },
  ],

  'applied-ml-paths-ml-for-analytics': [
    {
      heading: 'Analytics ML aids decisions—causal claims need caution',
      paragraphs: [
        'Correlation-heavy models recommend; experiments validate—don’t ship “insights” as facts without design.',
      ],
    },
    {
      heading: 'Worked habit',
      paragraphs: [
        'Pair ML insights with proposed experiment or human validation step.',
      ],
    },
    {
      heading: 'Misstep',
      paragraphs: [
        'Automating dashboards without ownership—noise becomes politics.',
      ],
    },
  ],

  'applied-ml-paths-ml-for-engineering': [
    {
      heading: 'Engineering ML touches production—treat like systems work',
      paragraphs: [
        'Emphasize reliability, rollbacks, observability, and cost—models are services with SLOs.',
      ],
    },
    {
      heading: 'Worked defect triage',
      paragraphs: [
        'Separate data pipeline bugs from model bugs from infra bugs—different owners.',
      ],
    },
    {
      heading: 'Mindset',
      paragraphs: [
        'Latent technical debt in notebooks becomes latent outages.',
      ],
    },
  ],

  'applied-ml-paths-ml-for-ai-product-work': [
    {
      heading: 'Product ML requires UX + safety + metrics together',
      paragraphs: [
        'Ship trust UX: uncertainty, citations, refusal behaviors; measure harm and task success—not only engagement.',
      ],
    },
    {
      heading: 'Worked review',
      paragraphs: [
        'Red-team prompts + adversarial inputs + monitor toxic outputs by cohort.',
      ],
    },
    {
      heading: 'Anti-pattern',
      paragraphs: [
        'Shipping clever demos without evaluation harnesses.',
      ],
    },
  ],

  'applied-ml-paths-next-steps-into-deeper-ml-learning': [
    {
      heading: 'Depth comes from projects with feedback loops',
      paragraphs: [
        'Pick a portfolio project with realistic data constraints; publish learned failures—employers value judgment.',
      ],
    },
    {
      heading: 'Worked roadmap',
      paragraphs: [
        'Linear algebra refresh → probability → evaluation discipline → domain specialization—avoid random course hoarding.',
      ],
    },
    {
      heading: 'Honesty',
      paragraphs: [
        'Credentials without artifacts prove little—build artifacts.',
      ],
    },
  ],
}
