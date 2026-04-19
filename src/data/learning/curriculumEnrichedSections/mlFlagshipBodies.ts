/**
 * Hand-authored reader depth for flagship Machine Learning paths (Foundations + Model Quality).
 * Complements generic composed depth; these blocks are domain-specific, not title-substitution templates.
 */
import type { PublicStarterLessonSection } from '../../publicStarterLibraries/aiFoundations'

export const ENRICHED_ML_FLAGSHIP_SECTIONS_BY_SLUG: Record<string, PublicStarterLessonSection[]> = {
  'machine-learning-foundations-what-machine-learning-means': [
    {
      heading: 'What “learning from data” really means',
      paragraphs: [
        'In product and analytics work, “machine learning” usually means: a system improves a task by using data to adjust internal parameters—so its behavior is not hand-written rule-by-rule for every case.',
        'The important move is to separate the *claim* (this can help) from the *mechanism* (how it could be wrong). Good teams name the target output, the data that could plausibly support it, and the cost of being wrong before they talk about models or tools.',
      ],
    },
    {
      heading: 'Worked example: a support-ticket triage story',
      paragraphs: [
        'Imagine routing support tickets. A learning system might map free text to a category. A non-ML approach is a fixed keyword list. An ML approach can catch phrasing variety—but it can also learn spurious shortcuts (e.g., time-of-day) if the training data is messy.',
        'Write a one-paragraph “operating spec” for the system: what the model is allowed to decide, what a human must confirm, and what would make you distrust the model (e.g., new product names, new customer segment).',
      ],
    },
    {
      heading: 'Misconceptions to avoid',
      paragraphs: [
        '“If it is ML, it is more accurate.” Accuracy is not a property of the label; it is a property of a system in a context, with a chosen metric, and a failure cost structure.',
        '“The model learned the real world.” It approximated regularities in a dataset. If the dataset is biased, shallow, or mislabeled, the model can be fluent and still wrong in high-stakes ways.',
      ],
    },
    {
      heading: 'Checks that go beyond definitions',
      paragraphs: [
        'Reasoning task: name a business problem where you would *not* start with ML. Defend the choice in two sentences (data cost, risk, or need for explainable policy).',
        'Application task: for a system you use weekly, name the *input* the model likely uses, the *output* it produces, and the *human review step* (if any) that makes the output shippable.',
      ],
    },
  ],

  'machine-learning-foundations-ai-vs-machine-learning-vs-deep-learning': [
    {
      heading: 'A useful stack, not a status hierarchy',
      paragraphs: [
        '“AI” is a broad goal (machines doing tasks that look intelligent). “Machine learning” is a method family: learn from data. “Deep learning” is a sub-family of ML that uses large, layered models—strong in perception and language, not automatic for every business table problem.',
        'In practice, the right question is: *What is the decision, what is the data, and what is the cost of error?* The best system is often a small model, a rules layer, and a human approval step—not the largest possible network.',
      ],
    },
    {
      heading: 'Distinction practice: two product stories',
      paragraphs: [
        'Search + ranking: you may use ML to score items, but the “AI” product still needs trust UI, safety rules, and logging. The learning part is not the whole system.',
        'Image recognition: deep learning is a natural tool, but you still need label quality, edge cases, and monitoring for lighting, device, and fraud—where the world drifts away from training.',
      ],
    },
    {
      heading: 'Common mix-ups',
      paragraphs: [
        '“We have deep learning, so we do not need data quality.” The opposite: high-dimensional models can overfit memes in the data even faster.',
        '“If it is not deep learning, it is not real ML.” Many production systems are trees, linear models, or simple baselines with clear behavior and easier compliance review.',
      ],
    },
    {
      heading: 'Short assessment (no looking up definitions)',
      paragraphs: [
        'Write a 3-line explanation to a teammate: why “more AI” might be the wrong framing for improving a spreadsheet forecast.',
        'Pick one headline you have seen (“AI discovers…”) and rewrite it into restrained language that states capability *and* limits.',
      ],
    },
  ],

  'machine-learning-foundations-supervised-unsupervised-and-reinforcement-learning': [
    {
      heading: 'Three families, three different success criteria',
      paragraphs: [
        'Supervised learning: learn input→output pairs (labels). Success is usually measured against held-out labels—so label noise becomes model noise.',
        'Unsupervised learning: find structure without labels (clusters, embeddings). Success is interpretive: does the structure help decisions and remain stable over time?',
        'Reinforcement learning: learn by trial with rewards/penalties. Success depends on whether the reward matches real harm/benefit—misaligned rewards produce clever failure modes.',
      ],
    },
    {
      heading: 'Worked contrast: churn vs segmentation',
      paragraphs: [
        'Supervised churn prediction maps customer features to “left/stayed.” Unsupervised clustering maps customers into segments without naming churn—then humans interpret clusters.',
        'Ask: which setup matches how decisions are made today? If decision-makers cannot act on opaque clusters, unsupervised insights remain decorative.',
      ],
    },
    {
      heading: 'Thin reasoning traps',
      paragraphs: [
        '“Unsupervised means no bias.” Structure discovery still reflects what was frequent in history—often inequitable history.',
        '“RL is like human learning.” RL often optimizes proxies; humans carry ethics and priors RL systems only get if you engineer them in.',
      ],
    },
    {
      heading: 'Mini scenario',
      paragraphs: [
        'Your team wants “AI grouping” for tickets. Decide whether supervised routing or clustering is closer to the operational loop. List two facts you must verify (label availability, escalation ownership, drift).',
      ],
    },
  ],

  'machine-learning-foundations-real-world-ml-use-cases': [
    {
      heading: 'Where ML shows up without sci-fi packaging',
      paragraphs: [
        'Common shapes: ranking (search, feeds), risk scoring (fraud, credit-style decisions—often regulated), perception (vision/audio), forecasting, recommendation, and assistants that draft under supervision.',
        'What makes these “real” is not novelty—it is integration: telemetry, evaluation cadence, governance, and explicit failure handling when the model is uncertain.',
      ],
    },
    {
      heading: 'Worked example: recommendation without magical thinking',
      paragraphs: [
        'A retail recommender might maximize click-through. That can conflict with margin, inventory, or brand safety. “Good ML” here includes defining competing objectives and constraints—and measuring side effects.',
        'Write two metrics: one short-term engagement metric and one harm/risk metric you would monitor weekly if you owned the system.',
      ],
    },
    {
      heading: 'Anti-patterns in everyday conversations',
      paragraphs: [
        '“We will automate decisions end-to-end.” Often illegal, unsafe, or operationally naive without human gates for edge cases.',
        '“Accuracy is high, ship it.” Without slices and operational costs, headline accuracy can hide catastrophic failures on small groups.',
      ],
    },
    {
      heading: 'Capability check',
      paragraphs: [
        'Pick a product you use that likely uses ML. Name what you think is optimized (time-on-screen, latency, fraud loss, …) and what might be left unoptimized.',
      ],
    },
  ],

  'machine-learning-foundations-features-labels-and-training-data': [
    {
      heading: 'Features are not “columns”—they are commitments',
      paragraphs: [
        'Features are measurable inputs your model may use: counts, embeddings, timestamps, categorical codes. Each feature carries assumptions: availability at prediction time, privacy constraints, and stability across releases.',
        'Labels are the supervision signal. Label definitions are where teams accidentally bake politics and shortcuts into math (“approved” labels that reflect old biased decisions).',
      ],
    },
    {
      heading: 'Worked example: leakage smell test',
      paragraphs: [
        'If a feature includes information that would not exist at decision time in production (future timestamps, post-outcome fields), you can get unrealistically strong offline metrics.',
        'Describe one plausible leakage story for your domain (even hypothetical): what column would accidentally encode the answer?',
      ],
    },
    {
      heading: 'Misconceptions',
      paragraphs: [
        '“More features always helps.” More features increase variance, engineering burden, and monitoring surface area.',
        '“Labels are objective.” Labels are operational definitions—two teams can label the same event differently.',
      ],
    },
    {
      heading: 'Explain-your-reasoning drill',
      paragraphs: [
        'Given a churn label “customer canceled within 30 days,” list two ambiguous cases your policy must define (trial users, refunds, seasonal buyers).',
      ],
    },
  ],

  'machine-learning-foundations-patterns-generalization-and-overfitting': [
    {
      heading: 'Generalization is the entire game',
      paragraphs: [
        'Training fits patterns in one dataset; deployment needs patterns that hold in new traffic, seasons, markets, and adversaries. Overfitting means learning noise as if it were signal.',
        'Signs include: train metric much better than validation, brittle performance on slices, and sensitivity to tiny input changes—especially with flexible models.',
      ],
    },
    {
      heading: 'Worked illustration: memorization vs structure',
      paragraphs: [
        'Imagine fitting exam-like questions where answers appear in duplicate forms in training. The model can “memorize” superficial cues instead of learning the rule.',
        'Your mitigation starts with better splits and honest evaluation—not only “more epochs.”',
      ],
    },
    {
      heading: 'Weak reasoning patterns',
      paragraphs: [
        '“We regularized, so we are fine.” Regularization helps; it does not replace monitoring and representative evaluation slices.',
        '“Validation loss increased—bad.” Sometimes a simpler model generalizes better; metric curves need decisions, not vibes.',
      ],
    },
    {
      heading: 'Beyond-recall checkpoint',
      paragraphs: [
        'Explain overfitting using a non-technical analogy suitable for an executive—without saying “parameters.” Then name one falsifiable check you would run before promoting a model.',
      ],
    },
  ],

  'machine-learning-foundations-training-validation-and-testing': [
    {
      heading: 'Splits are epistemology, not bookkeeping',
      paragraphs: [
        'Training adjusts parameters; validation guides choices during development (architecture, thresholds); test is a final honesty check held out from those decisions.',
        'If information leaks across splits—duplicate users, time leakage, repeated near-duplicates—you will trust metrics that dissolve in production.',
      ],
    },
    {
      heading: 'Worked example: time-based splitting',
      paragraphs: [
        'For forecasting customer behavior, random splits can leak the future into the past. A time-based split better matches deployment—at the cost of fewer train rows.',
        'Write one sentence on what split strategy matches “we deploy weekly retrained models.”',
      ],
    },
    {
      heading: 'Common mistakes',
      paragraphs: [
        '“We tune on test.” That turns test into train; keep a untouched holdout or external benchmark discipline.',
        '“Cross-validation fixes everything.” CV helps when data is exchangeable—not when entities repeat across folds.',
      ],
    },
    {
      heading: 'Approve / revise / reject mini-task',
      paragraphs: [
        'Proposal: “Use random 80/20 split for fraud detection.” Draft three bullets: approve parts, revise parts, reject parts—with reasons tied to leakage and deployment timing.',
      ],
    },
  ],

  'machine-learning-foundations-why-data-quality-matters': [
    {
      heading: 'Garbage in, confident garbage out',
      paragraphs: [
        'Modern models can fit noisy labels tightly—so poor labels become polished-looking mistakes. Quality issues include missingness patterns, stale joins, inconsistent definitions, and pipelines that silently change upstream.',
        'Treat data quality like code quality: version it, monitor drift, and define expected ranges with alerts—not occasional manual spot checks.',
      ],
    },
    {
      heading: 'Worked example: silent schema drift',
      paragraphs: [
        'If a column changes meaning (units, timezone, defaults), models may keep “working” while silently becoming wrong on a cohort.',
        'List three cheap monitors you could require before deployment (null rate spikes, cardinality jumps, distribution shift summaries).',
      ],
    },
    {
      heading: 'Thin excuses',
      paragraphs: [
        '“We will fix labels later.” Later rarely arrives before launch pressure.',
        '“More data washes noise.” Volume can amplify systematic bias.',
      ],
    },
    {
      heading: 'Remediation loop',
      paragraphs: [
        'Pick a dataset you know well. Identify one labeling ambiguity and propose a governance fix (owner, rubric, audit cadence)—even if hypothetical.',
      ],
    },
  ],

  'model-quality-and-evaluation-accuracy-precision-recall-and-f1': [
    {
      heading: 'Precision and recall encode asymmetric costs',
      paragraphs: [
        'Precision asks: among predicted positives, how many were truly positive? Recall asks: among true positives, how many did we catch? Accuracy can hide imbalance: predicting “no fraud” always can look accurate when fraud is rare.',
        'Before computing metrics, define positive class and decision threshold. Changing threshold moves precision/recall against each other.',
      ],
    },
    {
      heading: 'Worked tradeoff story',
      paragraphs: [
        'Spam filtering: high precision protects users from missing real mail; high recall protects from inbox harm—pick based on product pain.',
        'Write two sentences that justify different precision/recall targets for medical screening vs marketing outreach—without using jargon.',
      ],
    },
    {
      heading: 'Misconceptions',
      paragraphs: [
        '“F1 is always the right balance.” F1 assumes a particular tradeoff between precision/recall; domain costs may not match.',
        '“Accuracy 99% means safe.” Base rate can make accuracy meaningless; slice metrics matter.',
      ],
    },
    {
      heading: 'Scenario reasoning',
      paragraphs: [
        'You have 1% fraud base rate. Model A: 98% accuracy. Model B: 92% accuracy but catches more fraud with bounded false positives. Argue which metric table you need before choosing.',
      ],
    },
  ],

  'model-quality-and-evaluation-confusion-matrices': [
    {
      heading: 'Confusion matrices make errors concrete',
      paragraphs: [
        'Off-diagonal cells are where money and harm live: false positives waste resources and erode trust; false negatives miss risks you promised to catch.',
        'Use matrices per slice (region, device, language) when failure is not uniform—global averages lie politely.',
      ],
    },
    {
      heading: 'Worked walkthrough (binary)',
      paragraphs: [
        'Sketch counts: TP, FP, TN, FN. Translate FP into customer impact and FN into risk impact for your domain.',
        'If FN is worse, what threshold direction typically helps recall—at what precision cost?',
      ],
    },
    {
      heading: 'Confusion traps',
      paragraphs: [
        '“Balanced accuracy fixes imbalance.” It may still ignore stakeholder costs.',
        '“Matrix looks good overall.” Inspect smallest slices—often where fairness and liability concentrate.',
      ],
    },
    {
      heading: 'Assessment',
      paragraphs: [
        'Given FP-heavy vs FN-heavy harms, draft an escalation rule: when model scores mid-range, route to human review instead of auto-deciding.',
      ],
    },
  ],

  'model-quality-and-evaluation-error-analysis': [
    {
      heading: 'Error analysis is where professionals earn trust',
      paragraphs: [
        'Aggregate metrics answer “how much.” Error analysis answers “where and why”—by cohort, input pattern, label ambiguity, or model blind spots.',
        'Good error buckets become tickets: data fixes, feature constraints, policy updates—not endless retuning.',
      ],
    },
    {
      heading: 'Worked method (lightweight)',
      paragraphs: [
        'Sample errors stratified by confidence: high-confidence mistakes are scary; low-confidence might be calibration or thresholds.',
        'For each sampled error, tag root cause: label noise, rare language, sensor glitch, distribution shift, policy gap.',
      ],
    },
    {
      heading: 'Anti-patterns',
      paragraphs: [
        '“Error analysis = eyeball 10 examples.” Useful start, not a stopping point—need systematic sampling.',
        '“Retrain until errors disappear.” Without addressing causes, you may rotate failures.',
      ],
    },
    {
      heading: 'Deliverable-style prompt',
      paragraphs: [
        'Draft a one-page error report outline: summary metrics, top 3 buckets, proposed actions with owners, and what would falsify your hypothesis next week.',
      ],
    },
  ],

  'model-quality-and-evaluation-when-accuracy-misleads': [
    {
      heading: 'Accuracy is a vanity metric under imbalance',
      paragraphs: [
        'When positives are rare, trivial classifiers win accuracy. Leadership-ready reporting leads with base rate, cost matrix, and slice metrics—not a single percentage.',
        'Ask: what would a naive baseline achieve (majority class, simple rule)? Beat that story, not a buzzword.',
      ],
    },
    {
      heading: 'Worked comparison task',
      paragraphs: [
        'Problem A: 50/50 classes. Problem B: 99/1 classes. Explain why identical accuracy numbers imply different safety.',
        'Add one line on what chart/table you would show an executive instead of accuracy alone.',
      ],
    },
    {
      heading: 'Thin reasoning',
      paragraphs: [
        '“We balanced the dataset.” Balancing techniques change the question—ensure everyone agrees what deployment distribution is.',
        '“AUC solves it.” AUC summarizes ranking ability; operational decisions still need thresholds and costs.',
      ],
    },
    {
      heading: 'Decision drill',
      paragraphs: [
        'Pick a domain with asymmetric harm. State which errors are tolerable at higher volume vs which require near-zero tolerance.',
      ],
    },
  ],

  'model-quality-and-evaluation-bias-and-variance': [
    {
      heading: 'Bias/variance is diagnostic, not moral language',
      paragraphs: [
        'High bias: underfitting—too simple to capture signal. High variance: overfitting—too sensitive to training noise. Tradeoffs shift with model complexity, data amount, and regularization.',
        'Keep separate from fairness “bias”: same word, different concept—watch confusion in cross-team meetings.',
      ],
    },
    {
      heading: 'Worked intuition',
      paragraphs: [
        'Tiny data + huge model often equals variance. Lots of diverse data + controlled capacity often equals stable generalization—when labels are trustworthy.',
        'Give an example from your work where adding data helped more than tweaking hyperparameters.',
      ],
    },
    {
      heading: 'Missteps',
      paragraphs: [
        '“Always use the biggest model.” Capacity without data discipline increases variance and ops burden.',
        '“Bias/variance explains fairness gaps.” Social bias often lives in data and labels—needs governance, not only capacity tweaks.',
      ],
    },
    {
      heading: 'Concept check',
      paragraphs: [
        'Describe underfitting vs overfitting using a curve sketch narrative (train vs validation error) for a non-modeling stakeholder.',
      ],
    },
  ],

  'model-quality-and-evaluation-overfitting-and-underfitting': [
    {
      heading: 'Fit level must match signal and monitoring',
      paragraphs: [
        'Underfitting leaves performance on the table; overfitting chases noise. The right complexity depends on dataset size, noise level, and need for stability.',
        'Operational reality: simpler models can be easier to debug, explain to regulators, and monitor—complexity has a tax.',
      ],
    },
    {
      heading: 'Worked scenario',
      paragraphs: [
        'You see train accuracy rising while validation stalls. List three distinct causes (noise, leakage suspicion, insufficient regularization) and what evidence would support each.',
      ],
    },
    {
      heading: 'Weak shortcuts',
      paragraphs: [
        '“Add dropout and ship.” Regularization needs validation discipline and matched evaluation.',
        '“Underfitting is safe.” Being systematically wrong can still harm customers—just consistently.',
      ],
    },
    {
      heading: 'Remediation checklist',
      paragraphs: [
        'Before adding model complexity: verify labels, validate leakage, strengthen baselines, expand representative data—rank two actions for your scenario.',
      ],
    },
  ],

  'model-quality-and-evaluation-data-leakage': [
    {
      heading: 'Leakage makes offline winners and online losers',
      paragraphs: [
        'Leakage sneaks in through features that encode the label indirectly, duplicated examples across splits, group leakage (same user), or temporal inversion.',
        'Strong suspicion: metrics “too good to be true,” especially with rich feature sets and flexible models.',
      ],
    },
    {
      heading: 'Worked leakage stories',
      paragraphs: [
        'Including a column only populated after the outcome happens. Including identifiers that correlate perfectly with labels in historical data but will not generalize.',
        'Write a leakage hypothesis for a dataset you know—what column would you audit first?',
      ],
    },
    {
      heading: 'Misconceptions',
      paragraphs: [
        '“Cross-validation prevents leakage.” Wrong if groups leak across folds.',
        '“Removing one feature fixes it.” Leakage can be systemic to pipeline timing.',
      ],
    },
    {
      heading: 'Hard assessment',
      paragraphs: [
        'Design a “time-travel test”: what decision timestamp defines features vs labels in production? Compare that to your training join—flag mismatches.',
      ],
    },
  ],

  'model-quality-and-evaluation-why-production-ml-fails': [
    {
      heading: 'Production is not a longer notebook',
      paragraphs: [
        'Failure modes: train/serve skew, drift, silent data contract changes, human loops that behave differently under load, and incentives that optimize a proxy metric that diverges from real harm/benefit.',
        'Healthy teams ship monitoring, rollback plans, and explicit uncertainty handling—not only models.',
      ],
    },
    {
      heading: 'Worked postmortem outline',
      paragraphs: [
        'Incident: metric degrades after marketing campaign shifts user mix. Hypothesis: slice drift + threshold wrong for new cohort. Actions: slice dashboards, conditional thresholds, slower rollout.',
        'Draft three monitoring metrics you would attach to the business event stream, not only model scores.',
      ],
    },
    {
      heading: 'Flimsy narratives',
      paragraphs: [
        '“We will retrain monthly.” Without triggers, monthly retraining can miss fast drift and waste compute when stable.',
        '“Engineers own it now.” Ownership without playbooks becomes silent failure.',
      ],
    },
    {
      heading: 'Capstone-style reflection',
      paragraphs: [
        'Write a “pre-mortem”: if this deployment fails in six months, what are the top five plausible causes—rank them and assign mitigations.',
      ],
    },
  ],
}
