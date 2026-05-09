import type { StandaloneCourseModule, StandaloneCourseQuizQuestion } from './practicalMathematicsCourseTypes'

const QUIZ_MODULE6: StandaloneCourseQuizQuestion[] = [
  {
    id: 'ba-q1',
    question:
      'GlowCare revenue grew January–June overall, but May revenue dropped sharply while costs rose. As an analyst, what is the most responsible first framing before recommending cuts?',
    type: 'scenario',
    options: [
      'Treat May as a random blip and recommend waiting another quarter',
      'Separate volume, price/mix, and cost drivers; check whether margin compression is operational, promotional, or mix-driven',
      'Recommend increasing ad spend immediately because revenue fell',
      'Assume fraud without evidence',
    ],
    correctAnswer: 'Separate volume, price/mix, and cost drivers; check whether margin compression is operational, promotional, or mix-driven',
    explanation:
      'A serious diagnosis triangulates revenue, margin, and operational signals before prescribing action. A single headline metric rarely tells the full story.',
    relatedLesson: '6',
    difficulty: 'medium',
  },
  {
    id: 'ba-q2',
    question:
      'The June KPI dashboard shows “green” on total revenue vs target, but complaints, stockouts, and late deliveries worsened in May–June. What is the best interpretation?',
    type: 'scenario',
    options: [
      'Headline KPIs are sufficient; ignore operational metrics',
      'Operational pain can coexist with revenue targets; investigate whether short-term revenue is trading off customer experience',
      'Complaints always mean marketing is failing',
      'Stockouts always mean suppliers are dishonest',
    ],
    correctAnswer:
      'Operational pain can coexist with revenue targets; investigate whether short-term revenue is trading off customer experience',
    explanation:
      'Dashboards can look “fine” while underlying execution degrades. Good analytics reads supporting and leading indicators together.',
    relatedLesson: '2',
    difficulty: 'medium',
  },
  {
    id: 'ba-q3',
    question:
      'April-to-May revenue fell while gross margin % also fell. Which combination is most consistent with “selling more discount-heavy or lower-margin mix while losing efficiency”?',
    type: 'scenario',
    options: [
      'Revenue up, margin up',
      'Revenue down, margin down',
      'Revenue flat, margin up',
      'Revenue up, margin unchanged',
    ],
    correctAnswer: 'Revenue down, margin down',
    explanation:
      'When both revenue and margin weaken together, investigate mix (products/services/channels), discounting, cost inflation, and fulfillment friction.',
    relatedLesson: '3',
    difficulty: 'hard',
  },
  {
    id: 'ba-q4',
    question:
      'Repeat customer rate declined in May while complaints rose. What is a defensible analytics statement?',
    type: 'scenario',
    options: [
      'Complaints mechanically caused all revenue loss with no other factors',
      'Rising complaints and weaker retention are aligned warning signs that deserve a joint hypothesis test with operations and service data',
      'Retention never matters for retail',
      'Complaints are subjective so they should be dropped from analysis',
    ],
    correctAnswer:
      'Rising complaints and weaker retention are aligned warning signs that deserve a joint hypothesis test with operations and service data',
    explanation:
      'Correlation supports prioritization; causation requires tighter evidence (timelines, cohorts, controls, and operational logs).',
    relatedLesson: '4',
    difficulty: 'medium',
  },
  {
    id: 'ba-q5',
    question:
      'Online conversion rate dipped in May while walk-in conversion held steady. What should you explore next?',
    type: 'scenario',
    options: [
      'Ignore channel-level conversion; only look at total revenue',
      'Compare funnel stages (traffic → cart → checkout), page errors, delivery promises, and stock availability specifically for online',
      'Assume the website was hacked without evidence',
      'Merge all channels into one average conversion',
    ],
    correctAnswer:
      'Compare funnel stages (traffic → cart → checkout), page errors, delivery promises, and stock availability specifically for online',
    explanation:
      'Funnel analysis is channel-specific. Execution issues often show up first in the weakest operational link for that channel.',
    relatedLesson: '4',
    difficulty: 'medium',
  },
  {
    id: 'ba-q6',
    question:
      'Average order value (AOV) rose in May while order count fell. What is a plausible business interpretation?',
    type: 'scenario',
    options: [
      'Higher AOV always means healthier demand',
      'Fewer, larger baskets can mask losing lighter repeat purchases—check retention, stockouts, and category mix',
      'AOV cannot move if revenue moves',
      'AOV should be ignored when analyzing retail',
    ],
    correctAnswer:
      'Fewer, larger baskets can mask losing lighter repeat purchases—check retention, stockouts, and category mix',
    explanation:
      'AOV is a diagnostic lens, not a goal by itself. Pair it with volume, retention, and margin.',
    relatedLesson: '4',
    difficulty: 'hard',
  },
  {
    id: 'ba-q7',
    question:
      'You see a time series of profit with a sharp May drop. Which visualization mistake is most common among beginners?',
    type: 'scenario',
    options: [
      'Plotting profit over time with a labeled axis',
      'Using a truncated y-axis that exaggerates small changes without disclosure',
      'Adding annotations for known operational incidents',
      'Showing both revenue and margin in a dual-axis chart with clear labels',
    ],
    correctAnswer: 'Using a truncated y-axis that exaggerates small changes without disclosure',
    explanation:
      'Scale integrity matters. Truncation can be valid for small deltas, but it must be labeled transparently to avoid misleading stakeholders.',
    relatedLesson: '5',
    difficulty: 'easy',
  },
  {
    id: 'ba-q8',
    question:
      'Stockouts increased in May and late deliveries increased. What is the strongest analytics move?',
    type: 'scenario',
    options: [
      'Conclude stockouts caused 100% of revenue decline',
      'Treat them as operational hypotheses and align timelines with revenue, margin, complaints, and channel mix shifts',
      'Ignore operations because finance owns revenue',
      'Assume logistics is irrelevant to retention',
    ],
    correctAnswer:
      'Treat them as operational hypotheses and align timelines with revenue, margin, complaints, and channel mix shifts',
    explanation:
      'Operations metrics become powerful when you align changes in time and test multiple explanations together.',
    relatedLesson: '5',
    difficulty: 'medium',
  },
  {
    id: 'ba-q9',
    question:
      'A root-cause diagram lists five factors contributing to May’s profit decline. What is the most professional conclusion to present?',
    type: 'scenario',
    options: [
      'Pick the single factor you like best',
      'Present a ranked set of contributing drivers with evidence strength, unknowns, and what data would still be needed to prove causality',
      'Avoid numbers entirely and rely on intuition',
      'Claim “root cause found” after one chart',
    ],
    correctAnswer:
      'Present a ranked set of contributing drivers with evidence strength, unknowns, and what data would still be needed to prove causality',
    explanation:
      'Executive-grade analytics distinguishes what is supported, what is plausible, and what remains unproven.',
    relatedLesson: '5',
    difficulty: 'hard',
  },
  {
    id: 'ba-q10',
    question:
      'What is the primary purpose of a decision matrix in this course’s GlowCare exercise?',
    type: 'scenario',
    options: [
      'Replace managerial judgment with a spreadsheet',
      'Compare options against weighted criteria to make tradeoffs explicit when multiple actions are partially supported',
      'Guarantee the best outcome',
      'Eliminate the need for customer research',
    ],
    correctAnswer:
      'Compare options against weighted criteria to make tradeoffs explicit when multiple actions are partially supported',
    explanation:
      'Decision matrices structure tradeoffs; they do not remove accountability for assumptions and execution risk.',
    relatedLesson: '6',
    difficulty: 'easy',
  },
  {
    id: 'ba-q11',
    question:
      'Which statement best reflects “insight” vs “recommendation”?',
    type: 'scenario',
    options: [
      'They are identical terms',
      'An insight explains what changed and why it may matter; a recommendation proposes an action with tradeoffs and owners',
      'Recommendations should never mention risks',
      'Insights must never include numbers',
    ],
    correctAnswer:
      'An insight explains what changed and why it may matter; a recommendation proposes an action with tradeoffs and owners',
    explanation:
      'Clear decision packs separate evidence (insight) from choice (recommendation) and explicitly name risks.',
    relatedLesson: '1',
    difficulty: 'medium',
  },
  {
    id: 'ba-q12',
    question:
      'You are asked to “prove” social media caused May’s revenue drop. What is the most accurate response?',
    type: 'scenario',
    options: [
      'Build a single scatter plot and declare proof',
      'Explain what attribution can and cannot show; propose tests (holdouts, cohorts, promo calendars, operational timelines) and list confounders',
      'Refuse all social metrics',
      'Assume correlation equals causation for speed',
    ],
    correctAnswer:
      'Explain what attribution can and cannot show; propose tests (holdouts, cohorts, promo calendars, operational timelines) and list confounders',
    explanation:
      'Professional analytics protects the business from over-claiming while still driving disciplined next steps.',
    relatedLesson: '5',
    difficulty: 'hard',
  },
]

export const BUSINESS_ANALYTICS_MODULES: StandaloneCourseModule[] = [
  {
    moduleNumber: 1,
    slug: 'business-analytics-foundations',
    title: 'Module 1: Business Analytics Foundations',
    durationMinutes: 10,
    level: 'Foundational',
    prerequisites: [],
    overview:
      'Establish what business analytics means in practice, introduce the GlowCare Beauty & Retail case, and frame the decision questions you will answer across the deck (slides 1–7).',
    whyThisMatters: [
      'Managers lose credibility when they confuse charts with decisions.',
      'A shared vocabulary (data → metrics → KPIs → insight → action) keeps teams aligned under pressure.',
    ],
    learningObjectives: [
      'Explain how business analytics supports practical decision-making.',
      'Distinguish raw data, metrics, KPIs, insights, and recommendations.',
      'Name the central GlowCare questions for the May performance investigation.',
    ],
    lessons: [
      {
        lessonNumber: '1.1',
        title: 'Course promise and business value',
        estimatedMinutes: 2,
        learnerGoal: 'Connect analytics work to decisions, not decoration.',
        blocks: [
          {
            type: 'concept_explanation',
            title: 'Why this course exists',
            content:
              'This is a business diagnosis and decision-making course. You will read performance data the way operating leaders do: triangulating revenue, margin, operations, and customer signals before recommending action.',
          },
        ],
      },
      {
        lessonNumber: '1.2',
        title: 'What business analytics means here',
        estimatedMinutes: 2,
        learnerGoal: 'Define analytics as disciplined inquiry for decisions.',
        blocks: [
          {
            type: 'concept_explanation',
            title: 'Analytics as inquiry',
            bullets: [
              'Translate messy reality into measurable definitions.',
              'Compare expectations vs outcomes across time and segments.',
              'Communicate uncertainty without freezing the business.',
            ],
          },
        ],
      },
      {
        lessonNumber: '1.3',
        title: 'Data, metrics, KPIs, insights, and action',
        estimatedMinutes: 2,
        learnerGoal: 'Use the vocabulary consistently in discussion and writing.',
        blocks: [
          {
            type: 'worked_example',
            title: 'GlowCare snapshot',
            content:
              'Raw rows might be daily orders. Metrics include average order value (AOV). KPIs might be gross margin % or repeat purchase rate. An insight could be: “May margin fell while complaints rose.” A recommendation proposes owners, timing, and tradeoffs.',
          },
        ],
      },
      {
        lessonNumber: '1.4',
        title: 'The analytics thinking cycle',
        estimatedMinutes: 2,
        learnerGoal: 'Apply a repeatable loop: frame → measure → diagnose → decide → monitor.',
        blocks: [
          {
            type: 'summary',
            content:
              'Use the cycle as guardrails: frame the decision first, then choose evidence, then stress-test your story with alternative explanations.',
          },
        ],
      },
      {
        lessonNumber: '1.5',
        title: 'Meet GlowCare Beauty & Retail',
        estimatedMinutes: 1,
        learnerGoal: 'Understand streams, channels, and the May problem statement.',
        blocks: [
          {
            type: 'real_world_application',
            title: 'GlowCare operating context',
            bullets: [
              'Streams: skincare, hair, nails, facials, delivery.',
              'Channels: walk-in, online store, social, referrals.',
              'May issue: revenue fell, costs rose, margin weakened, complaints rose, repeat customers softened, stockouts and late deliveries increased.',
            ],
          },
        ],
      },
      {
        lessonNumber: '1.6',
        title: 'Business questions to investigate',
        estimatedMinutes: 1,
        learnerGoal: 'List the questions your analysis must answer by Module 6.',
        blocks: [
          {
            type: 'practice_task',
            learnerTask:
              'Write three investigative questions you want answered about May using at least three different metric families (financial, customer, operational).',
            outputExpectation: 'Three questions, each naming a metric family and a decision stake.',
          },
        ],
      },
    ],
    practiceLab: {
      title: 'Lab: Map your KPI tree for one decision',
      durationMinutes: 8,
      learnerGoal: 'Practice turning a business question into a small KPI set with clear definitions.',
      scenarios: [
        {
          id: 'lab1-a',
          prompt:
            'Pick one GlowCare question (e.g., “Did online lose conversion because of stockouts?”). List 4 metrics you would track and one metric you would explicitly not use (and why).',
          answerKey:
            'Strong answers pair funnel metrics with inventory/stockout timing and margin; they avoid vanity totals that hide mix effects.',
        },
      ],
    },
    moduleQuiz: [],
    moduleSummary: 'You can now frame GlowCare’s May problem as a multi-metric diagnosis rather than a single chart reading task.',
    completionChecklist: [
      'Completed all lessons in Module 1',
      'Completed the KPI-tree lab reflection',
      'Skimmed slides 1–7 in the deck for visuals and speaker notes',
    ],
  },
  {
    moduleNumber: 2,
    slug: 'understanding-business-performance-data',
    title: 'Module 2: Understanding Business Performance Data',
    durationMinutes: 8,
    level: 'Foundational',
    prerequisites: [],
    overview:
      'Learn how to read GlowCare’s core dataset responsibly, interpret summarized views, and read KPI cards without being misled by headlines (slides 8–12).',
    whyThisMatters: [
      'Most “dashboard mistakes” are interpretation mistakes, not math mistakes.',
      'Summaries hide distributions; analysts must know what was aggregated away.',
    ],
    learningObjectives: [
      'Read a performance dataset without overwhelm.',
      'Compare raw vs summarized data for decision risk.',
      'Interpret a KPI dashboard card with supporting context.',
    ],
    lessons: [
      {
        lessonNumber: '2.1',
        title: 'Reading the core dataset',
        estimatedMinutes: 2,
        learnerGoal: 'Orient to rows, time grain, and segment keys used in the case.',
        blocks: [
          {
            type: 'concept_explanation',
            title: 'Dataset discipline',
            bullets: [
              'Confirm the time grain (day/week/month).',
              'Confirm segment keys (channel, product family, service line).',
              'Watch for missing values and definition changes across months.',
            ],
          },
        ],
      },
      {
        lessonNumber: '2.2',
        title: 'Raw data vs summarized data',
        estimatedMinutes: 2,
        learnerGoal: 'Identify when summaries distort decisions.',
        blocks: [
          {
            type: 'common_mistakes',
            title: 'Averages that lie gently',
            content:
              'A stable average can hide two opposing segment stories. When May weakens, split by channel and product/service mix before explaining “the business.”',
          },
        ],
      },
      {
        lessonNumber: '2.3',
        title: 'Metrics that matter for GlowCare',
        estimatedMinutes: 2,
        learnerGoal: 'Tie metrics to decisions: growth, profitability, reliability, retention.',
        blocks: [
          {
            type: 'worked_example',
            title: 'A compact metric map',
            bullets: ['Revenue and gross margin %', 'Conversion and funnel drop-offs', 'Repeat rate and complaints', 'Stockouts and on-time delivery'],
          },
        ],
      },
      {
        lessonNumber: '2.4',
        title: 'KPI dashboard design',
        estimatedMinutes: 1,
        learnerGoal: 'Evaluate dashboard integrity: definitions, comparisons, and freshness.',
        blocks: [
          {
            type: 'pause_and_check',
            title: 'Checklist',
            bullets: ['What denominator?', 'What period comparison?', 'What operational counterpart should be visible beside the KPI?'],
          },
        ],
      },
      {
        lessonNumber: '2.5',
        title: 'June dashboard interpretation',
        estimatedMinutes: 1,
        learnerGoal: 'Practice reading “green” KPIs alongside warning signals.',
        blocks: [
          {
            type: 'scenario',
            title: 'Headline vs health',
            content:
              'If revenue is “on target” but complaints and stockouts are worsening, your narrative should surface execution risk—not only celebrate the target.',
          },
        ],
      },
    ],
    practiceLab: {
      title: 'Lab: Dashboard critique',
      durationMinutes: 6,
      learnerGoal: 'Identify three ways a KPI card could mislead a hurried manager.',
      scenarios: [
        {
          id: 'lab2-a',
          prompt: 'Choose one KPI type from the deck (margin, conversion, repeat rate). List two supporting metrics you would place beside it on a dashboard and one footnote you would require.',
          answerKey:
            'Strong answers show paired context (e.g., margin + mix; conversion + traffic quality; repeat rate + cohort window).',
        },
      ],
    },
    moduleQuiz: [],
    moduleSummary: 'You can now read GlowCare-style performance tables and KPI cards with explicit definitions and healthy skepticism.',
    completionChecklist: ['Completed lessons', 'Completed dashboard critique lab', 'Reviewed slides 8–12'],
  },
  {
    moduleNumber: 3,
    slug: 'trend-and-variance-analysis',
    title: 'Module 3: Trend and Variance Analysis',
    durationMinutes: 10,
    level: 'Foundational to Intermediate',
    prerequisites: [],
    overview:
      'Analyze revenue, cost, profit, and margin movement over time, with emphasis on May’s deterioration and variance tools (slides 13–19).',
    whyThisMatters: [
      'Profit matters more than revenue for sustainability.',
      'Month-over-month variance and waterfalls turn “something changed” into “where it changed.”',
    ],
    learningObjectives: [
      'Interpret trendlines for revenue, cost, and profit together.',
      'Use month-over-month variance and heatmaps to localize May weakness.',
      'Read a profit waterfall as a story of drivers.',
    ],
    lessons: [
      {
        lessonNumber: '3.1',
        title: 'Revenue, cost, and profit trend',
        estimatedMinutes: 2,
        learnerGoal: 'Read combined trends without overfitting one month.',
        blocks: [{ type: 'concept_explanation', title: 'Trend triangulation', content: 'Use revenue with margin and absolute profit—not revenue alone.' }],
      },
      {
        lessonNumber: '3.2',
        title: 'Why profit matters more than revenue',
        estimatedMinutes: 2,
        learnerGoal: 'Explain margin compression scenarios in plain language.',
        blocks: [{ type: 'real_world_application', title: 'GlowCare May', content: 'May shows revenue stress plus cost pressure—a profitability diagnosis, not a sales slogan.' }],
      },
      {
        lessonNumber: '3.3',
        title: 'Revenue and margin combo analysis',
        estimatedMinutes: 2,
        learnerGoal: 'Interpret dual signals from a combo chart.',
        blocks: [{ type: 'worked_example', title: 'Combo reading', content: 'When revenue and margin diverge, prioritize mix, discounting, and variable cost drivers.' }],
      },
      {
        lessonNumber: '3.4',
        title: 'Month-over-month variance analysis',
        estimatedMinutes: 2,
        learnerGoal: 'Quantify deltas with business meaning.',
        blocks: [{ type: 'guided_practice', learnerTask: 'Write the April→May change story in three sentences: level, direction, and suspected families of drivers (not final verdict).', outputExpectation: 'Three sentences, no single-cause claim.' }],
      },
      {
        lessonNumber: '3.5',
        title: 'May performance warning signs',
        estimatedMinutes: 1,
        learnerGoal: 'List aligned indicators that raise priority.',
        blocks: [{ type: 'summary', bullets: ['Margin down', 'Complaints up', 'Repeat down', 'Ops metrics worsening'] }],
      },
      {
        lessonNumber: '3.6',
        title: 'April-to-May heatmap and profit waterfall',
        estimatedMinutes: 1,
        learnerGoal: 'Locate concentration of weakness across segments.',
        blocks: [{ type: 'concept_explanation', title: 'Localization', content: 'Heatmaps and waterfalls help you say where May broke, which informs targeted action.' }],
      },
    ],
    practiceLab: {
      title: 'Lab: Variance narrative',
      durationMinutes: 8,
      learnerGoal: 'Draft a variance paragraph suitable for a manager readout.',
      scenarios: [
        {
          id: 'lab3-a',
          prompt: 'Using the May drop framing, write 4–6 sentences separating facts, hypotheses, and unknowns.',
          answerKey: 'Strong answers keep claims proportional to evidence and propose what data would tighten the story.',
        },
      ],
    },
    moduleQuiz: [],
    moduleSummary: 'You can describe May’s financial movement with trend, variance, and waterfall lenses.',
    completionChecklist: ['Completed lessons', 'Completed variance lab', 'Reviewed slides 13–19'],
  },
  {
    moduleNumber: 4,
    slug: 'channel-product-customer-analysis',
    title: 'Module 4: Channel, Product, and Customer Analysis',
    durationMinutes: 10,
    level: 'Foundational to Intermediate',
    prerequisites: [],
    overview:
      'Break revenue and margin stories by channel, product/service mix, funnel performance, and retention/complaint relationships (slides 20–27).',
    whyThisMatters: [
      'Aggregate growth can hide channel risk and mix drag.',
      'Customer behavior metrics explain whether demand or experience broke first.',
    ],
    learningObjectives: [
      'Compare channel contribution responsibly.',
      'Interpret stacked mix charts and funnel conversion.',
      'Relate complaints and repeat rate without over-claiming causality.',
    ],
    lessons: [
      {
        lessonNumber: '4.1',
        title: 'Revenue by channel',
        estimatedMinutes: 2,
        learnerGoal: 'Read bar charts with share and growth context.',
        blocks: [{ type: 'concept_explanation', title: 'Contribution vs dependency', content: 'Large channels can be profitable but fragile if operations weaken.' }],
      },
      {
        lessonNumber: '4.2',
        title: 'Channel contribution and risk',
        estimatedMinutes: 2,
        learnerGoal: 'Name concentration and operational sensitivities.',
        blocks: [{ type: 'scenario', title: 'Online + delivery', content: 'When late deliveries rise, online reputation risk can accelerate churn.' }],
      },
      {
        lessonNumber: '4.3',
        title: 'Product/service revenue mix',
        estimatedMinutes: 2,
        learnerGoal: 'Interpret stacked bars as mix shifts.',
        blocks: [{ type: 'worked_example', title: 'Mix tells strategy', content: 'Services vs retail inventory stress different operations and margin profiles.' }],
      },
      {
        lessonNumber: '4.4',
        title: 'Funnel analysis and conversion rate interpretation',
        estimatedMinutes: 2,
        learnerGoal: 'Locate stage-level failure.',
        blocks: [{ type: 'common_mistakes', title: 'Funnel traps', content: 'Do not treat conversion alone without traffic quality and inventory constraints.' }],
      },
      {
        lessonNumber: '4.5',
        title: 'New vs returning customers',
        estimatedMinutes: 1,
        learnerGoal: 'Frame retention as a health metric.',
        blocks: [{ type: 'concept_explanation', content: 'Returning customers often drive margin; weakening repeat while complaints rise is a priority signal.' }],
      },
      {
        lessonNumber: '4.6',
        title: 'Complaints vs repeat customer rate',
        estimatedMinutes: 1,
        learnerGoal: 'Plot relationship thinking without causal overreach.',
        blocks: [{ type: 'reflection_or_application', learnerTask: 'State one plausible mechanism linking complaints to repeat rate, and one alternative explanation.', outputExpectation: 'Two labeled hypotheses.' }],
      },
    ],
    practiceLab: {
      title: 'Lab: Segment hypothesis',
      durationMinutes: 8,
      learnerGoal: 'Pick one channel and one product/service line to prioritize for deeper review.',
      scenarios: [
        {
          id: 'lab4-a',
          prompt: 'Write a hypothesis for May’s weakness tied to channel/product interactions (not a final conclusion).',
          answerKey: 'Strong answers are testable with timelines and segment cuts.',
        },
      ],
    },
    moduleQuiz: [],
    moduleSummary: 'You can decompose GlowCare performance by channel, mix, funnel, and customer health metrics.',
    completionChecklist: ['Completed lessons', 'Completed segment hypothesis lab', 'Reviewed slides 20–27'],
  },
  {
    moduleNumber: 5,
    slug: 'diagnosing-the-business-problem',
    title: 'Module 5: Diagnosing the Business Problem',
    durationMinutes: 8,
    level: 'Intermediate',
    prerequisites: [],
    overview:
      'Connect operational issues to customer and financial outcomes, avoid weak single-cause stories, and improve chart choices (slides 28–33).',
    whyThisMatters: [
      'Bad diagnostics waste money: teams ship fixes that do not match the real constraint.',
      'Professional analytics distinguishes correlation from proof.',
    ],
    learningObjectives: [
      'Align operational timelines with financial and customer metrics.',
      'State what data proves vs what it suggests.',
      'Recognize common beginner visualization mistakes.',
    ],
    lessons: [
      {
        lessonNumber: '5.1',
        title: 'Operational issue trends',
        estimatedMinutes: 2,
        learnerGoal: 'Read operational time series alongside revenue.',
        blocks: [{ type: 'worked_example', title: 'Aligned timelines', content: 'Stockouts, late deliveries, and complaint resolution time are diagnostic companions to margin and retention.' }],
      },
      {
        lessonNumber: '5.2',
        title: 'Connecting operations to customer behavior',
        estimatedMinutes: 2,
        learnerGoal: 'Build plausible mechanism chains.',
        blocks: [{ type: 'concept_explanation', title: 'Mechanism thinking', content: 'Operational failures often show up as experience failures before they fully show up as revenue losses.' }],
      },
      {
        lessonNumber: '5.3',
        title: 'Root cause diagram for May',
        estimatedMinutes: 2,
        learnerGoal: 'Organize multi-factor thinking.',
        blocks: [{ type: 'guided_practice', learnerTask: 'Sketch a small cause tree: operations → experience → financial outcomes, with at least three branches.', outputExpectation: 'Tree with labeled branches.' }],
      },
      {
        lessonNumber: '5.4',
        title: 'What the data tells us vs what it does not prove',
        estimatedMinutes: 1,
        learnerGoal: 'Write claim-safe language.',
        blocks: [{ type: 'summary', content: 'Prefer “consistent with,” “suggests,” and “requires validation” over “proves.”' }],
      },
      {
        lessonNumber: '5.5',
        title: 'Common beginner mistakes',
        estimatedMinutes: 1,
        learnerGoal: 'Avoid single-metric obsession and vanity comparisons.',
        blocks: [{ type: 'common_mistakes', bullets: ['Single cause', 'Ignoring mix', 'Scale tricks', 'Confusing correlation with proof'] }],
      },
      {
        lessonNumber: '5.6',
        title: 'Bad chart vs better chart',
        estimatedMinutes: 1,
        learnerGoal: 'Choose charts that match the decision.',
        blocks: [{ type: 'quiz_intro', content: 'Use the deck’s before/after visuals as a checklist for your own reporting.' }],
      },
    ],
    practiceLab: {
      title: 'Lab: Evidence grading',
      durationMinutes: 6,
      learnerGoal: 'Label claims as A=supported, B=plausible, C=unproven for May.',
      scenarios: [
        {
          id: 'lab5-a',
          prompt: 'Take two strong claims you might be tempted to make about May. Grade each A/B/C and add one sentence of needed evidence.',
          answerKey: 'Strong answers show intellectual honesty and next-step measurement.',
        },
      ],
    },
    moduleQuiz: [],
    moduleSummary: 'You can connect GlowCare’s operational deterioration to customer and financial signals without over-claiming proof.',
    completionChecklist: ['Completed lessons', 'Completed evidence grading lab', 'Reviewed slides 28–33'],
  },
  {
    moduleNumber: 6,
    slug: 'turning-analytics-into-action',
    title: 'Module 6: Turning Analytics Into Action',
    durationMinutes: 15,
    level: 'Intermediate',
    prerequisites: [],
    overview:
      'Move from observation to insight to recommendation, use a decision matrix, deliver an executive recommendation for GlowCare, complete the May-drop practice, pass the mini quiz, and close with a roadmap (slides 34–40).',
    whyThisMatters: [
      'Analysis without recommendation leaves the business stuck.',
      'Recommendations must carry owners, sequencing, and risk tradeoffs.',
    ],
    learningObjectives: [
      'Convert observations into insight statements.',
      'Write an executive recommendation with clear next steps.',
      'Complete the GlowCare May diagnosis practice and pass the application quiz.',
    ],
    lessons: [
      {
        lessonNumber: '6.1',
        title: 'From observation to insight',
        estimatedMinutes: 2,
        learnerGoal: 'Write insights that imply stakes and segments.',
        blocks: [{ type: 'worked_example', title: 'Template', content: '“We observe X in segment S during period T, which implies risk/opportunity R because…”' }],
      },
      {
        lessonNumber: '6.2',
        title: 'From insight to recommendation',
        estimatedMinutes: 2,
        learnerGoal: 'Pair actions with tradeoffs.',
        blocks: [{ type: 'concept_explanation', title: 'Recommendation quality bar', bullets: ['Owner', 'Time horizon', 'Cost/risk', 'What will be measured weekly'] }],
      },
      {
        lessonNumber: '6.3',
        title: 'Decision matrix',
        estimatedMinutes: 2,
        learnerGoal: 'Score options against weighted criteria.',
        blocks: [{ type: 'guided_practice', learnerTask: 'List three candidate actions for May and score each on speed, cost, and confidence based on evidence.', outputExpectation: 'Scored matrix notes (paper is fine).' }],
      },
      {
        lessonNumber: '6.4',
        title: 'Executive recommendation for GlowCare',
        estimatedMinutes: 2,
        learnerGoal: 'See a professional one-page storyline structure.',
        blocks: [{ type: 'real_world_application', title: 'Exec storyline', bullets: ['Situation', 'Complication', 'Key findings', 'Recommendation', 'Risks', 'Next 30 days'] }],
      },
      {
        lessonNumber: '6.5',
        title: 'Learner practice: analyze the May drop',
        estimatedMinutes: 3,
        learnerGoal: 'Synthesize metrics into a recommendation draft.',
        blocks: [
          {
            type: 'practice_task',
            title: 'GlowCare Business Analytics Recommendation',
            learnerTask:
              'Draft a short recommendation: what happened, likely contributors, what is not proven, and what management should do next—using revenue trend, cost trend, margin, complaints, repeat rate, stockouts, late deliveries, and AOV.',
            outputExpectation: '8–12 sentences suitable for a manager readout; label hypotheses vs facts.',
          },
        ],
      },
      {
        lessonNumber: '6.6',
        title: 'Mini quiz + final recap',
        estimatedMinutes: 2,
        learnerGoal: 'Validate interpretation skills and capture a learning roadmap.',
        blocks: [
          {
            type: 'quiz_intro',
            content: 'Take the 12-question module quiz (application-focused). Passing is 75% or higher. Explanations appear after submission.',
          },
          {
            type: 'summary',
            title: 'Analytics roadmap',
            bullets: [
              'Deepen spreadsheet modeling and forecasting next.',
              'Pair analytics with customer research for attribution discipline.',
              'Build a personal library of decision matrices for recurring tradeoffs.',
            ],
          },
        ],
      },
    ],
    practiceLab: {
      title: 'Lab: Analyze the May Performance Drop',
      durationMinutes: 20,
      learnerGoal: 'Produce the portfolio artifact: GlowCare Business Analytics Recommendation.',
      scenarios: [
        {
          id: 'lab6-core',
          prompt:
            'Using the metrics listed in the course overview, write your recommendation. Include: (1) executive summary, (2) evidence timeline for May, (3) top two prioritized actions for the next 30 days, (4) metrics you will monitor weekly, (5) what data you still need.',
          answerKey:
            'Strong answers separate facts vs hypotheses, connect operations to customer outcomes, and avoid single-cause certainty without tests.',
        },
      ],
    },
    moduleQuiz: QUIZ_MODULE6,
    moduleSummary: 'You can translate GlowCare’s May diagnosis into an executive-style recommendation and pass the interpretation quiz.',
    completionChecklist: [
      'Completed lessons including practice framing',
      'Completed the May drop lab artifact (off-platform)',
      'Passed the Module 6 mini quiz at 75%+',
      'Marked portfolio acknowledgment complete on this module page',
    ],
    safetyNote:
      'This case uses synthetic-style business numbers for learning. Do not treat it as real company data. In real work, protect confidential data and verify figures with finance/operations owners before acting.',
  },
]
