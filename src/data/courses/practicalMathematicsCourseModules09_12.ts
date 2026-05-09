/**
 * Practical Mathematics — Modules 9–12 (data, time, projects, advanced business).
 * Internal split for readability; combined in `practicalMathematicsCourse.ts`.
 */

import type { StandaloneCourseModule } from './practicalMathematicsCourseTypes'

export const PRACTICAL_MATH_MODULES_09_12: StandaloneCourseModule[] = [
  // ============================================================
  // MODULE 9 — Data Interpretation and Statistics
  // ============================================================
  {
    moduleNumber: 9,
    slug: 'data-interpretation-statistics',
    title: 'Data Interpretation and Statistics',
    durationMinutes: 160,
    level: 'Intermediate',
    prerequisites: ['workplace-math-problem-solving'],
    overview:
      'Turn numbers into decisions. Read every common chart, choose the right average for the question (mean vs median vs mode), use weighted averages, summarise variability, interpret percentages and rates correctly, recognise misleading statistics, and write a short data-driven recommendation.',
    whyThisMatters: [
      'Most adult misreadings of data are average-shaped (mean used where median is right).',
      'Misleading charts — truncated axes, cherry-picked windows — are everywhere.',
      'Percentage points vs percentage change is the single most important statistical distinction.',
      'Outliers and small samples bend conclusions.',
      'A clean data-driven recommendation beats a slick chart in almost every meeting.',
    ],
    learningObjectives: [
      'Read bar, line, pie, scatter, table, and dashboard visuals',
      'Compute mean, median, and mode and choose the right one',
      'Compute weighted averages',
      'Describe variability with range, simple spread, and outlier flags',
      'Distinguish percentage points from percentage change',
      'Recognise common misleading statistics',
      'Write a short data-driven recommendation grounded in the right metric',
    ],
    lessons: [
      {
        lessonNumber: '9.1',
        title: 'Reading Data Visualisations',
        estimatedMinutes: 30,
        learnerGoal: 'Read bar, line, pie, scatter, dashboard visuals and pull out the actual insight.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Match chart to message',
            title: 'Each chart answers one question well',
            content:
              'Bar/column for compare; line for trend; pie for composition; scatter for relationship; dashboard combines.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'Bar chart: regional sales',
            content:
              'East $450k, West $620k, North $380k, South $550k. West leads by 63% over North.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'Line chart: 6-month revenue trend',
            content: '$100k → $125k. Total growth 25%; average ≈4.5% MoM compounded.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Reading a dashboard',
            title: 'Three or four numbers per page',
            content: 'Read in order: headline, comparison, supporting context.',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice — Spot the misleading chart',
            title: 'Read four real chart traps and state the honest takeaway',
            content:
              'Goal: practise reading a chart for what it actually shows vs what its design suggests.\n\n(1) Truncated y-axis on a sales bar chart. The chart shows two bars: Q1 = $1,020k, Q2 = $1,060k. The y-axis starts at $1,000k. Visually the Q2 bar looks 3× the size of the Q1 bar.\nHonest read: the actual difference is $40k on a $1,020k base = 3.9% growth — modest, not dramatic. The visual impression is created by the truncated axis.\nTakeaway: "Q2 sales grew 3.9% over Q1." Always check the y-axis baseline before believing visual proportions.\n\n(2) Cherry-picked line chart window. Stock price chart shows "+45% last 3 months!" but cuts off the prior 12 months where the price fell 60%.\nHonest read: the 3-month gain is real but does NOT recover the prior loss. Net 15-month return is still deeply negative.\nTakeaway: "Recent 3-month gain of 45% offsets only part of the prior 12-month decline." Always ask "what window is shown — and what was happening before that?"\n\n(3) Pie chart with 12 slices. Marketing channel breakdown crammed into a pie — the eye cannot rank the slices reliably.\nHonest read: pie charts work for 3–5 categories where one or two clearly dominate. With 12 slices, switch to a sorted horizontal bar chart so the reader can rank visually.\nTakeaway: redraw the data as a sorted bar chart; pie charts mislead when the categories are many and similar in size.\n\n(4) Comparison without consistent denominator. "Region A sales grew 20%; Region B sales grew 5%."\nHonest read: 20% of what base? If A started at $50k and grew to $60k (+$10k), and B started at $1,000k and grew to $1,050k (+$50k), then B added 5× more dollars despite the smaller percentage.\nTakeaway: when comparing growth across groups, always show absolute base AND change — not just percentage change.',
            learnerTask:
              'Pull a real chart from a recent news article, business deck, or social media post. Write three sentences: (1) what the chart visually suggests, (2) what the chart actually shows when read carefully (axis baseline, window, denominator), (3) one sentence interpreting the data honestly.',
            answerKey:
              'Sample done well: a news headline shows a chart titled "Crime up 25% this year!" with a bar chart of incidents 100 → 125. Reading carefully: the y-axis starts at 90 (truncated), making the bar look 5× taller than it should. The 25-incident absolute increase is on a base of 100 — 25% relative, but only 25 incidents in absolute terms. Honest interpretation: "Reported incidents rose from 100 to 125 (a 25% relative increase, 25 incidents in absolute terms); the visual exaggeration comes from a truncated y-axis." Strong answers always separate visual impression from numerical fact and call out the design choice (baseline, window, denominator). Weak answers report only the headline percentage.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'What is this chart for?',
            content: 'A pie chart with 12 slices. Better: a sorted bar chart.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Reading traps',
            content: 'Trusting truncated y-axes that exaggerate small differences.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Reports, decks, news',
            content: 'A weekly business review uses a small number of dashboards.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Read three real charts',
            content: 'Pull three charts. State purpose and takeaway in plain language.',
            answerKey:
              'Lesson anchors: (1) Bar East/West — purpose: compare regions; takeaway: West highest at $620k. (2) Line revenue — purpose: trend; takeaway: +25% over 6 months. (3) Pie with >6 slices — purpose unclear; prefer sorted bar for readability.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 9.1 summary',
            title: 'Read for the question, then the answer',
            content: 'Match chart to question; read axes; state takeaway in one sentence.',
          },
        ],
      },
      {
        lessonNumber: '9.2',
        title: 'Mean, Median, Mode, and Weighted Averages',
        estimatedMinutes: 35,
        learnerGoal:
          'Compute three averages from a dataset, decide which one fits the situation, and apply weighted averages where some values count more than others.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Three averages, three jobs',
            title: 'Mean, median, mode',
            content:
              'Mean (arithmetic average) uses every value: sum ÷ count. It is sensitive to outliers — one extreme value can pull the mean far from the typical observation. Median is the middle value when the data is sorted (or the average of the two middle values for an even-count list). It is robust to outliers. Mode is the most frequent value — useful for categorical or repeating data, less useful for continuous data with no repeats. Mean is for symmetric data; median for skewed; mode for categorical.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Weighted average',
            title: 'When some items count more',
            content:
              'Weighted average = Σ(value × weight) ÷ Σ(weights). Use weights when items contribute unequally — e.g. course grades where assignments weigh 30% and the final exam weighs 40%; or portfolio returns where each asset has a different dollar size. Always confirm weights sum to the expected total (often 1.0 or 100%) before plugging in.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 1 — Outliers skew the mean',
            title: 'Five salaries, one CEO',
            content:
              'Given: salaries 40,000; 42,000; 43,000; 45,000; 200,000.\n\nMean: (40 + 42 + 43 + 45 + 200) ÷ 5 = 370 ÷ 5 = 74 (in thousands) = $74,000.\n\nMedian: sort → 40, 42, 43, 45, 200. Middle (3rd of 5) = $43,000.\n\nMode: no value repeats — no mode.\n\nAnswer: mean $74,000, median $43,000.\n\nReasonableness: the median ($43k) reflects the typical employee far better than the mean ($74k). Reporting the mean would mislead anyone making salary comparisons. Use median for skewed data (income, home prices, time on website) by default.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 2 — Weighted course grade',
            title: 'Three components with three weights',
            content:
              'Given: assignments 85 (weight 30%); midterm 78 (weight 30%); final 92 (weight 40%).\n\nFormula: weighted = Σ(score × weight).\n\nEstimate: each component near 85 with similar weights → expect somewhere in 80–90.\n\nCalculate: 85 × 0.30 = 25.5; 78 × 0.30 = 23.4; 92 × 0.40 = 36.8. Sum = 85.7.\n\nAnswer: weighted grade = 85.7 (B+ in most US scales).\n\nReasonableness: the strong final (92, weighted heaviest) pulls the average above the midterm; the result lands between the midterm 78 and final 92, closer to the final because of its heavier weight. Verify weights sum to 1.00 (0.30 + 0.30 + 0.40 = 1.00 ✓).',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice',
            title: 'Read a small payroll dataset honestly',
            content:
              'Goal: a small business has 7 employees with annual salaries: 38,000; 42,000; 44,000; 47,000; 51,000; 58,000; 165,000 (founder).\n\nStep 1 — Mean: sum = 38 + 42 + 44 + 47 + 51 + 58 + 165 = 445 (in thousands). 445 ÷ 7 = 63.57 → $63,571.\n\nStep 2 — Median: 7 values sorted; the 4th = $47,000.\n\nStep 3 — Mode: no repeats — none.\n\nStep 4 — Honest reporting: median $47,000 represents typical pay; mean $63,571 is misleading because the founder skews it up. Reporting "average salary $63,571" overstates typical pay by ~35%.\n\nStep 5 — Weighted view (head-count adjusted): if we report mean only for non-founder roles (excluding the 165k outlier): 280 ÷ 6 = $46,667 — close to the median, confirming the median is the honest signal.',
            learnerTask:
              'Compute mean, median, and mode of the test scores 72, 75, 79, 82, 82, 88, 95. Then compute a weighted average where assignments (avg of those scores) weight 60% and a final exam of 90 weights 40%. State which average best summarises the class and why.',
            answerKey:
              'Mean = (72 + 75 + 79 + 82 + 82 + 88 + 95) ÷ 7 = 573 ÷ 7 = 81.86. Median = 4th value (sorted) = 82. Mode = 82 (appears twice). Best summary: median 82 — robust and aligns with the mode; mean 81.86 is essentially the same here because the data is roughly symmetric. Weighted: assignment avg 81.86 × 0.60 = 49.12; final 90 × 0.40 = 36.00; weighted grade = 85.12. Verify weights sum to 1.00 ✓. Weak answer: skipping the median or weighting check.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Three averages on one dataset',
            content:
              'Dataset: 78, 82, 85, 85, 88, 90, 92.\nSum = 600; count 7 → mean ≈ 85.71.\nSorted middle (4th) = 85 → median.\nMost frequent = 85 (appears twice) → mode.\nAll three averages near 85 → data is roughly symmetric and well-behaved.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Average traps',
            content:
              'Reporting mean on skewed data (income, home price, response time) — median is honest there; forgetting weights when items don\'t count equally; weights not summing to 1 (or 100%); using mode on continuous data with no real repeats; computing the median of an even-count list without averaging the two middle values.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'HR, real estate, education, surveys',
            content:
              'HR reports median salary in offer letters and pay-equity reports. Real estate listings cite median home price (mean is distorted by mansions). Universities compute weighted GPAs. Survey reporting cites mode for categorical responses ("most common") and median for skewed numeric responses (response time, age).',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Three problems',
            content:
              '(1) Mean and median of salaries $40,000; $42,000; $43,000; $45,000; $200,000.\n(2) Weighted grade with assignments 30% × 85, midterm 30% × 78, final 40% × 92.\n(3) Mode of 7, 8, 8, 8, 9, 9, 10, 11.',
            answerKey:
              '(1) Mean = 370 ÷ 5 = $74,000; median = $43,000. Honest report: median.\n(2) 85 × 0.30 + 78 × 0.30 + 92 × 0.40 = 25.5 + 23.4 + 36.8 = 85.7.\n(3) Mode = 8 (appears three times).',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 9.2 summary',
            title: 'Pick the average that fits',
            content:
              'Mean for symmetric, median for skewed, mode for categorical. Weighted average when items count unequally — and verify weights sum to 1.',
          },
        ],
      },
      {
        lessonNumber: '9.3',
        title: 'Variability, Outliers, and Honest Comparison',
        estimatedMinutes: 30,
        learnerGoal: 'Describe spread, recognise outliers, and compare groups honestly.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Spread matters',
            title: 'Range, IQR, and a feel for SD',
            content:
              'Range = max − min. Two groups can have the same mean and very different stories.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'Same mean, different spread',
            content:
              'A: 70, 72, 74, 76, 78. B: 50, 60, 75, 90, 100. Both mean 74; A range 8, B range 50.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Outliers',
            title: 'Flag them; do not silently delete',
            content: 'Real signal or data error — investigate, do not silently drop.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Comparing groups',
            title: 'Same denominators, windows, definitions',
            content: 'A 20% jump on a small region might be smaller than a 5% jump on a large one.',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice — Same mean, different stories: compute IQR',
            title: 'Use interquartile range to describe spread when the mean alone is misleading',
            content:
              'Goal: take two datasets with the same mean and use the interquartile range (IQR) to describe how different their stories are.\n\nDataset A — Sales rep weekly closes: 8, 9, 10, 10, 11, 12, 12 (n=7).\nDataset B — Different rep weekly closes: 2, 5, 9, 10, 11, 17, 18 (n=7).\n\nStep 1 — Compute mean for each:\nA: sum = 8+9+10+10+11+12+12 = 72 ÷ 7 = 10.29.\nB: sum = 2+5+9+10+11+17+18 = 72 ÷ 7 = 10.29.\nSame mean, identical headline.\n\nStep 2 — Sort each and find the median (middle value, position (n+1)/2 = 4th of 7):\nA sorted: 8, 9, 10, **10**, 11, 12, 12 → median = 10.\nB sorted: 2, 5, 9, **10**, 11, 17, 18 → median = 10.\nSame median too.\n\nStep 3 — Compute the quartiles. With n=7, Q1 = median of the lower 3 values, Q3 = median of the upper 3 values:\nA: lower {8, 9, 10} → Q1 = 9; upper {11, 12, 12} → Q3 = 12. IQR = Q3 − Q1 = 12 − 9 = 3.\nB: lower {2, 5, 9} → Q1 = 5; upper {11, 17, 18} → Q3 = 17. IQR = 17 − 5 = 12.\n\nStep 4 — Interpret: A\'s middle 50% of weeks all close between 9 and 12 — tight, predictable. B\'s middle 50% spans 5 to 17 — four times more volatile despite the same mean.\n\nStep 5 — Range comparison: A range = 12 − 8 = 4. B range = 18 − 2 = 16. Range exaggerates outliers; IQR is more robust because it ignores the extremes.\n\nReasonableness: a manager comparing the two reps on mean alone would call them equivalent. With IQR, A is clearly the more reliable producer; B has both very weak weeks (2, 5) and very strong weeks (17, 18) — investigate whether B has a skill gap, a pipeline problem, or external lumpy demand.',
            learnerTask:
              'For these test scores from two classes (n=7 each), compute mean, median, Q1, Q3, and IQR for each. State which class has the more consistent performance and one specific action a teacher might take.\nClass X: 60, 68, 72, 75, 78, 82, 85.\nClass Y: 45, 55, 70, 75, 80, 95, 95.',
            answerKey:
              'Class X: sum = 520, mean = 74.3. Sorted middle (4th) = 75. Q1 = median of {60, 68, 72} = 68; Q3 = median of {78, 82, 85} = 82; IQR = 14. Class Y: sum = 515, mean = 73.6. Sorted middle (4th) = 75. Q1 = median of {45, 55, 70} = 55; Q3 = median of {80, 95, 95} = 95; IQR = 40. Class X has tighter spread (IQR 14 vs 40). Action for class Y: investigate the bottom-quartile students (45, 55, 70) for a skill gap, AND ask whether the top-quartile (95, 95) are receiving enough challenge. Same mean, very different teaching priorities. Strong answer cites both the IQR difference AND the action; weak answer only computes IQR without naming what the teacher should do.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Spot the spread',
            content:
              'A: 95–105/wk. B: 50/wk then 150/wk. A stable, B volatile.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Variability traps',
            content: 'Reporting only the mean for an inconsistent series.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'QC, sales pipelines, education',
            content: 'A QC report flags batches outside ±2 SD.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Two reps',
            content: '(1) Mean and range of 60,75,80,85,90,95. (2) A stable vs B volatile.',
            answerKey: '(1) ≈80.8; range 35. (2) B variable; investigate.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 9.3 summary',
            title: 'Average + spread + outliers',
            content: 'Match denominators and windows; flag outliers.',
          },
        ],
      },
      {
        lessonNumber: '9.4',
        title: 'Percentages, Rates, and Misleading Statistics',
        estimatedMinutes: 35,
        learnerGoal: 'Distinguish percentage points from percentage change and recognise misleading patterns.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: "Two flavours of 'percentage'",
            title: 'Percentage points vs percentage change',
            content:
              '5% → 8% is +3 percentage points and +60% change. Both are correct; they answer different questions.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'Rate, ratio, and per-unit comparisons',
            content: '"2 per 1,000 hours worked" is a rate; "14 accidents this year" is not without a base.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Misleading-statistic patterns',
            title: 'Five things to look for',
            content:
              '1) Truncated y-axes. 2) Cherry-picked windows. 3) Mixed bases. 4) Small samples. 5) Correlation as causation.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'Truncated-axis trick',
            content: 'Bars 51% vs 53%, y-axis at 50%, looks like 100%+ increase.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Spot the trick',
            content:
              "'Defects fell 50%' — from 4/1,000 to 2/1,000 = 50% change but 0.2 percentage points.",
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Percentage and rate traps',
            content: 'Percent change without absolute count. Count without denominator.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'News, marketing, surveys',
            content: 'Health news reports relative risk; absolute risk is often a smaller story.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Three reps',
            content:
              '(1) 4% → 6% pp and %. (2) 8 → 10 per 100k = ?%. (3) "70% prefer" from 10 — questions?',
            answerKey:
              '(1) +2 pp absolute; relative change (6−4)/4 = +50%. (2) Rate rises from 8/100k to 10/100k → +2 events/100k; relative change vs old rate (10−8)/8 = +25%. (3) Ask n, sampling frame, question wording, margin of error; 7/10 is not the same as “70%” without context.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 9.4 summary',
            title: 'Always ask for the base',
            content: 'Distinguish percentage points from percentage change.',
          },
        ],
      },
      {
        lessonNumber: '9.5',
        title: 'Writing a Data-Driven Recommendation',
        estimatedMinutes: 30,
        learnerGoal: 'Turn data into a short, defensible written recommendation.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Recommendation structure',
            title: 'Question, finding, recommendation, caveat',
            content:
              'Question. Finding (1–2 sentences). Recommendation (specific action). Caveat (limits).',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 1 — Region performance recommendation',
            title: 'Q/F/R/C in four sentences',
            content:
              'Given: quarterly sales by region — North $480k, South $550k, East $510k, West $620k. Year-over-year growth — North +4%, South +5%, East +7%, West +12%. Company average growth 6%.\n\nFormula: rank regions by both level and growth; identify outperformer.\n\nQ: should we reweight marketing spend toward West for the next quarter?\n\nF: West leads on absolute sales ($620k, +12.7% above next-best South at $550k) AND on growth (+12% vs company average +6%, double the rate).\n\nR: shift 15% of next-quarter marketing budget from underperforming North to West; track monthly West revenue and conversion as KPI.\n\nC: only 2 quarters of data; West may have a one-off promotional driver; verify with sales pipeline and channel mix before locking in.\n\nReasonableness: the recommendation is bounded (15%, not 50%) and time-boxed (next quarter); the caveat names the specific risk (small sample, one-off effect).',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 2 — Customer churn recommendation',
            title: 'Q/F/R/C from a survey',
            content:
              'Given: 1,200 customers surveyed. Churn rate Q3 = 8%; Q4 = 11%. Top reasons cited by churned customers: "pricing" 42%, "service quality" 31%, "feature gaps" 18%, "other" 9%.\n\nQ: should we reduce price to slow churn?\n\nF: churn rose 3 percentage points (8% → 11%, a 37.5% relative increase) Q3-to-Q4; pricing was the single most-cited reason at 42% of churned customers, but service quality + feature gaps together are 49% — actually larger.\n\nR: do NOT cut price as the primary intervention. Run two parallel pilots: (a) tier the existing pricing with a value-add bundle for high-touch customers; (b) targeted outreach + service-quality investigation for the 31% who cited service. Re-survey in 6 weeks.\n\nC: 1,200 respondents is a healthy sample but skews toward already-engaged users; non-respondents may be different. Pricing reason is often inflated when given as a multiple-choice; in open-text, the share is typically 25–30%.\n\nReasonableness: data showed pricing was top-cited at 42%, but the recommendation pushed back because service + features together are larger and a price cut is hard to reverse. Strong recommendation engages the bigger total signal, not just the loudest single reason.',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice',
            title: 'Write Q/F/R/C for a real metric',
            content:
              'Goal: pick a real or realistic metric — your team\'s output, a cost, a sales figure, a customer-feedback score. Write four sentences.\n\nQ — Phrase the question precisely. Avoid "should we improve X?" Use "should we move from A to B given Y data?"\n\nF — State the data finding in 1–2 sentences. Always quote a number with its denominator and time window.\n\nR — Specific action with size and timing ("shift 15% over Q1"), not vague intent ("explore alternatives").\n\nC — Name two limitations: data quality, sample size, definition uncertainty, possible confounders, or window of applicability.\n\nSanity checklist before sending: right average for skewed data? Consistent denominators across compared groups? Outliers flagged? Percentage points vs percentage distinguished? Action specific and bounded?',
            learnerTask:
              'Write Q/F/R/C for: a small business notices its average customer order value rose from $42 to $51 over 3 months. Should they raise advertised prices? Use real numbers.',
            answerKey:
              'Q: should we raise advertised prices given the +21% rise in average order value (AOV)?\nF: AOV moved from $42 to $51 over 3 months (+21.4%); however, total orders fell 8% over the same window (40 → 37/week), so revenue grew only 11.7% — driven by larger baskets, not more customers.\nR: do NOT raise advertised prices. Instead, run a 30-day test of bundled offers ("buy 3, save 10%") to push AOV further while protecting order count.\nC: 3 months is short; AOV may rise from a few large outlier orders rather than a structural shift; segment AOV by customer type before committing.\nStrong answer always quotes the number AND the denominator/window; weak answer drops one of the two.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Sanity checks before sending',
            title: 'Five quick questions',
            content:
              'Right average for the data shape? (mean for symmetric, median for skewed). Consistent denominators across compared groups? Outliers flagged or removed honestly? Percentage points vs percentage change distinguished? Action specific and time-bounded?',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'One question, one finding, one action',
            content: 'Write Q/F/R/C for a real metric.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Recommendation traps',
            content: 'Burying findings. Recommending more analysis instead of action.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Memos, slack, board notes',
            content: 'A monthly variance memo is exactly this template.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'One real recommendation',
            content: 'Pick a real dataset; write a one-page Q/F/R/C.',
            answerKey:
              'Mirror lesson worked example: Q: shift budget to West? F: West $620k vs South $550k; West +12% YoY vs company +6%. R: pilot +15% spend next quarter with weekly KPI. C: only 2 quarters of data; check seasonality and definitions.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 9.5 summary',
            title: 'Four sentences, one decision',
            content: 'Data without recommendation is a dashboard; recommendation without data is opinion.',
          },
        ],
      },
    ],
    practiceLab: {
      title: 'Module 9 Practice Lab — Read, Compute, Recommend',
      durationMinutes: 35,
      learnerGoal: 'Apply averaging, variability, and rate interpretation; write a recommendation.',
      scenarios: [
        {
          id: 'm09-lab-1',
          prompt: '$40k, $42k, $45k, $43k, $200k. Mean and median.',
          answerKey: 'Mean $74k; median $43k; median is better.',
        },
        {
          id: 'm09-lab-2',
          prompt: '30%×85 + 30%×78 + 40%×92.',
          answerKey: '85.7.',
        },
        {
          id: 'm09-lab-3',
          prompt: 'Rate moves 4% → 6%. Pp and percentage change.',
          answerKey: '+2 pp; +50%.',
        },
        {
          id: 'm09-lab-4',
          prompt: 'A $950–$1,050; B $200–$1,800; both mean $1,000. Variability and what to investigate?',
          answerKey: 'B much more variable; investigate seasonality, marketing, recording errors.',
        },
        {
          id: 'm09-lab-5',
          prompt: 'Write a 4-sentence recommendation comparing two suppliers (cheaper but defective vs reliable).',
          answerKey:
            'Q: which next year? F: A 12% cheaper, defect 3% vs B 0.8%; rework wipes 8% of savings. R: continue with B; pilot A on low-risk SKUs. C: data 1 quarter; revisit.',
        },
      ],
    },
    moduleQuiz: [
      {
        id: 'm09-q1',
        question:
          '$40k, $42k, $43k, $45k, $200k. Best "typical"?',
        type: 'multiple_choice',
        options: ['Mean ($74k)', 'Median ($43k)', 'Mode (none)', 'Range ($160k)'],
        correctAnswer: 'Median ($43k)',
        explanation: 'Mean skewed by outlier; median robust.',
        relatedLesson: '9.2',
        difficulty: 'medium',
      },
      {
        id: 'm09-q2',
        question: 'Weighted average 30%×85 + 30%×78 + 40%×92.',
        type: 'calculation',
        correctAnswer: '85.7',
        explanation: '25.5 + 23.4 + 36.8.',
        relatedLesson: '9.2',
        difficulty: 'medium',
      },
      {
        id: 'm09-q3',
        question: 'Rate 5% → 8%. Pp and % change.',
        type: 'short_answer',
        correctAnswer: '+3 pp; +60%',
        explanation: '3 = pp; 3/5 = 60%.',
        relatedLesson: '9.4',
        difficulty: 'medium',
      },
      {
        id: 'm09-q4',
        question: 'Scores 60,75,80,85,90,95. Range?',
        type: 'calculation',
        correctAnswer: '35',
        explanation: '95 − 60.',
        relatedLesson: '9.3',
        difficulty: 'easy',
      },
      {
        id: 'm09-q5',
        question:
          'Region A $950k–$1.05M, B $200k–$1.8M, both mean $1M. Most accurate?',
        type: 'scenario',
        options: [
          'Both equally healthy.',
          'B healthier — bigger peaks.',
          'A more stable; B variability needs investigation.',
          'Cannot compare without quarterly data.',
        ],
        correctAnswer: 'A more stable; B variability needs investigation.',
        explanation: 'Variability is leading indicator of risk.',
        relatedLesson: '9.3',
        difficulty: 'hard',
      },
      {
        id: 'm09-q6',
        question:
          'Bar chart 51% vs 53% with y-axis starting at 50%. Issue?',
        type: 'scenario',
        options: [
          'No issue.',
          'Truncated y-axis exaggerates difference.',
          'Pie would be clearer.',
          'Should be percentage points.',
        ],
        correctAnswer: 'Truncated y-axis exaggerates difference.',
        explanation: 'Always check axis baseline.',
        relatedLesson: '9.4',
        difficulty: 'medium',
      },
      {
        id: 'm09-q7',
        question:
          'Defects fell from 4 per 1,000 to 2 per 1,000. State both pp and % change.',
        type: 'short_answer',
        correctAnswer: '−50% change; −0.2 pp (0.4% → 0.2%)',
        explanation: 'Both true; pp keeps absolute scale honest.',
        relatedLesson: '9.4',
        difficulty: 'hard',
      },
      {
        id: 'm09-q8',
        question:
          '"70% prefer our product" from 10 surveyed. First reaction?',
        type: 'scenario',
        options: [
          'Accept it.',
          'Ask sample size, who, how phrased.',
          'Multiply by 10.',
          "Round to '7 of 10'.",
        ],
        correctAnswer: 'Ask sample size, who, how phrased.',
        explanation: 'Small samples and bias undermine claims.',
        relatedLesson: '9.4',
        difficulty: 'medium',
      },
      {
        id: 'm09-q9',
        question: 'Best for shoe sizes 7,8,8,8,9,9,10,11?',
        type: 'multiple_choice',
        options: ['Mean', 'Median', 'Mode', 'Weighted'],
        correctAnswer: 'Mode',
        explanation: 'Mode (8) describes most-frequent.',
        relatedLesson: '9.2',
        difficulty: 'easy',
      },
      {
        id: 'm09-q10',
        question:
          'East $450k, West $620k, North $380k, South $550k. By what % does West outsell North?',
        type: 'calculation',
        correctAnswer: '≈63%',
        explanation: '($620 − $380) / $380.',
        relatedLesson: '9.1',
        difficulty: 'medium',
      },
      {
        id: 'm09-q11',
        question:
          'A team report says: "average response time fell from 8.2 hours to 6.5 hours." What additional information would you ask for before believing the team has improved? Name at least three.',
        type: 'short_answer',
        correctAnswer:
          'Median response time, sample size for each period, distribution shape (was the change in the long tail or in the typical case), and the time window of measurement.',
        explanation:
          'Mean is sensitive to outliers — a single fast response can drag the mean down even if typical responses didn\'t change. Always ask for median + sample size + distribution before celebrating a mean shift.',
        relatedLesson: '9.2',
        difficulty: 'hard',
      },
    ],
    moduleSummary:
      'You can read every common chart, compute and choose the right average, describe variability, distinguish percentage points from change, recognise misleading statistics, and write a four-sentence recommendation.',
    completionChecklist: [
      'I can name the right chart type for a given message.',
      'I can compute mean, median, mode, and weighted average.',
      'I can describe spread and flag outliers.',
      'I can distinguish percentage points from percentage change.',
      'I can recognise the five common misleading patterns.',
      'I can write a four-sentence data-driven recommendation.',
    ],
  },

  // ============================================================
  // MODULE 10 — Time Management and Scheduling Math
  // ============================================================
  {
    moduleNumber: 10,
    slug: 'time-management-scheduling-math',
    title: 'Time Management and Scheduling Math',
    durationMinutes: 145,
    level: 'Intermediate',
    prerequisites: ['data-interpretation-statistics'],
    overview:
      'The math of time management: durations and conversions, task estimation with realistic buffers, daily and weekly schedules built from real capacity, project timelines using critical-path thinking, time-zone coordination, and a small set of optimisation moves.',
    whyThisMatters: [
      'Most missed deadlines come from optimistic estimates with no buffer.',
      'Scheduling without knowing real capacity leads to chronic overcommitment.',
      'Critical-path thinking turns a list of tasks into a defensible deadline.',
      'Time-zone math is now a daily reality for many adult learners.',
      'Tracking time honestly is more valuable than reading another productivity book.',
    ],
    learningObjectives: [
      'Calculate elapsed time, durations, and overnight intervals',
      'Convert decimal hours, hours-and-minutes, days, weeks',
      'Estimate tasks with three-point estimation and realistic buffers',
      'Build a daily schedule from real available time and prioritisation',
      'Plan a project timeline using simple critical-path thinking and buffers',
      'Coordinate meetings across time zones',
      'Track time honestly and apply two or three optimisation moves',
    ],
    lessons: [
      {
        lessonNumber: '10.1',
        title: 'Time Calculations and Conversions',
        estimatedMinutes: 25,
        learnerGoal:
          'Compute durations, add hours and minutes, convert formats, handle overnight intervals.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Two formats',
            title: 'Hours-and-minutes vs decimal hours',
            content: '45 ÷ 60 = 0.75. 0.25 × 60 = 15 minutes.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'Compute elapsed time across noon and midnight',
            content:
              '9:15 AM → 2:45 PM: 2:45 + 2:45 = 5:30. 10 PM Mon → 2 AM Tue: 4 h.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Adding durations',
            title: 'Hours and minutes separately, then carry',
            content: '2:30 + 1:45 + 3:15 → 6 h, 90 min → 7 h 30 min = 7.5 h.',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice — Five real time problems with cross-day cases',
            title: 'Add durations, convert formats, handle midnight crossings',
            content:
              'Goal: practise the four moves: hours-and-minutes ↔ decimal, adding durations, computing elapsed time across noon, and computing elapsed time across midnight.\n\n(1) A nurse\'s shift runs 7:00 PM Tuesday to 7:30 AM Wednesday with a 30-minute unpaid break. Hours worked?\nStep 1 — Total elapsed: 7:00 PM to midnight = 5 hours; midnight to 7:30 AM = 7.5 hours; total = 12.5 hours.\nStep 2 — Subtract unpaid break: 12.5 − 0.5 = 12.0 hours.\nAnswer: 12.0 hours paid.\n\n(2) A consultant logs three client meetings: 1:15, 0:45, 2:30. Total billable hours?\nStep 1 — Convert each to decimal: 1.25 + 0.75 + 2.5 = 4.5 hours.\nStep 2 — Verify in h+m: 1h 15m + 0h 45m = 2h 0m; + 2h 30m = 4h 30m = 4.5 hours ✓.\n\n(3) A bakery opens 5:30 AM and closes 8:45 PM. Total operating hours per day?\nStep 1 — Elapsed AM to noon: 6 hours 30 minutes.\nStep 2 — Elapsed noon to PM close: 8 hours 45 minutes.\nStep 3 — Sum: 14 hours 75 minutes = 15 hours 15 minutes = 15.25 hours.\n\n(4) A factory shift starts 11:00 PM Friday and ends 7:00 AM Saturday. Hours worked, no breaks?\nStep 1 — 11:00 PM to midnight = 1 hour; midnight to 7:00 AM = 7 hours; total = 8 hours.\n\n(5) A freelancer\'s timesheet for the week: Mon 8.5, Tue 7.75, Wed 9.0, Thu 8.5, Fri 6.25. Total weekly hours and overtime if standard week is 40?\nStep 1 — Sum: 8.5 + 7.75 + 9.0 + 8.5 + 6.25 = 40.0 hours.\nStep 2 — Overtime: 40.0 − 40 = 0 hours.\nVerdict: exactly at standard week, no overtime.\n\nReasonableness: cross-midnight shifts are where most timesheet errors live — the trick is to count to midnight first, then count from midnight. Treat them as two pieces; never try to subtract clock times directly when the day boundary is in between.',
            learnerTask:
              'Compute each: (a) elapsed time from 9:45 PM Monday to 6:30 AM Tuesday with a 30-minute unpaid break. (b) Convert 8h 20m to decimal. (c) Sum: 2h 50m + 1h 35m + 3h 15m. (d) Three days of work: 9.25 + 8.75 + 10.5 — total hours, and overtime above 24-hour expectation?',
            answerKey:
              '(a) 9:45 PM to midnight = 2h 15m; midnight to 6:30 AM = 6h 30m; total elapsed = 8h 45m. Subtract 30-min break = 8h 15m = 8.25 hours paid. (b) 8h 20m → 20/60 = 0.333 → 8.333 hours decimal. (c) 2h 50m + 1h 35m = 4h 25m; + 3h 15m = 7h 40m = 7.667 hours decimal. (d) 9.25 + 8.75 + 10.5 = 28.5 hours; overtime above 24h expectation = 4.5 hours. Strong answer keeps clock-time and decimal-time separate; weak answer mixes formats in one column and produces ~10% errors.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Two reps',
            content: '3 h 45 min = 3.75 h. 2:50 + 1:35 = 4:25.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Time-format traps',
            content: 'Mixing decimals and h/m in one column.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Timesheets and shift handovers',
            content: 'Payroll normalises to decimal hours.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Three time conversions',
            content:
              '(1) 7:45 AM → 4:15 PM with 45-min lunch. (2) 7.25 h → clock. (3) 3:50 + 2:35 + 1:45.',
            answerKey: '7.75 h; 7:15; 8 h 10 min.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 10.1 summary',
            title: 'Pick a format and stick to it',
            content: 'Decimal for math; clock for humans.',
          },
        ],
      },
      {
        lessonNumber: '10.2',
        title: 'Task Estimation with Honest Buffers',
        estimatedMinutes: 30,
        learnerGoal: 'Estimate task durations using three-point estimation and add realistic buffers.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Three-point estimation',
            title: 'Best, most likely, worst',
            content: 'Weighted ≈ (best + 4×likely + worst) ÷ 6.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 1 — Writing a report',
            title: 'Three-point estimate with PERT formula',
            content:
              'Given: best-case 2 hours; most-likely 3 hours; worst-case 5 hours.\n\nFormula: PERT-weighted estimate = (best + 4 × likely + worst) ÷ 6.\n\nEstimate: weighted ≈ (2 + 12 + 5) / 6 = 19/6 ≈ 3.17.\n\nCalculate: (2 + 4 × 3 + 5) ÷ 6 = (2 + 12 + 5) ÷ 6 = 19 ÷ 6 = 3.167 hours → round to 3.25 h for clean scheduling.\n\nAnswer: planned duration 3.25 hours.\n\nReasonableness: the weighted estimate sits between most-likely (3) and worst-case (5), pulled slightly above 3 by the worst-case tail. Pure most-likely (3) ignores the risk of the 5-hour tail; pure average (3.33) over-weights the tails.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 2 — Project with multiple tasks and a buffer',
            title: 'Sum estimates, add buffer, convert to calendar time',
            content:
              'Given: project with 4 tasks, three-point estimates each:\nT1: best 4, likely 6, worst 10 → weighted (4+24+10)/6 = 6.33 h.\nT2: best 2, likely 3, worst 6 → (2+12+6)/6 = 3.33 h.\nT3: best 3, likely 5, worst 8 → (3+20+8)/6 = 5.17 h.\nT4: best 1, likely 2, worst 4 → (1+8+4)/6 = 2.17 h.\n\nFocused work total: 6.33 + 3.33 + 5.17 + 2.17 = 17.0 hours.\n\nAdd 20% buffer for re-work, integration, surprises: 17.0 × 1.20 = 20.4 hours.\n\nConvert to calendar time at 60% focus rate (typical for a busy office): 20.4 ÷ 0.60 = 34 calendar hours ≈ 4–5 working days.\n\nAnswer: project takes ~17 focused hours, ~20 with buffer, ~34 calendar hours — about 4.5 work days.\n\nReasonableness: rule of thumb "double your gut estimate and add 20%" lands close to 34 from a gut estimate of ~14 hours. The math version is more defensible to a stakeholder.',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice',
            title: 'Estimate a real task end-to-end',
            content:
              'Goal: a freelance designer must estimate a logo project for a client.\n\nStep 1 — Decompose into subtasks: discovery 1.5h; sketch 3h; vector mockups 4h; client review 1h; revisions 4h; final delivery 1h.\n\nStep 2 — Three-point each subtask. For revisions: best 2, likely 4, worst 8 → (2+16+8)/6 = 4.33 h. (Other tasks similar; revisions has biggest tail because clients vary.)\n\nStep 3 — Sum weighted: 1.5 + 3 + 4 + 1 + 4.33 + 1 = 14.83 → ~15 h focused.\n\nStep 4 — Add 25% buffer (creative work has more rework): 15 × 1.25 = 18.75 → 19 h focused.\n\nStep 5 — Calendar conversion at 70% focus: 19 ÷ 0.70 = 27 calendar hours ≈ 3.5 days. With morning admin and other clients, plan 1 calendar week.\n\nStep 6 — Quote at $80/hour billable: 19 × 80 = $1,520. Or fixed-fee with 25% safety: $1,900.\n\nReasonableness: 15-hour focused on a logo aligns with mid-tier freelance rates ($1,200–$2,500). The buffer protects against unforeseen revision rounds.',
            learnerTask:
              'Estimate a real task you have this week. Use 3-point estimation, decompose into 3+ subtasks, add a 20% buffer, and convert to calendar time at 60% focus rate. Compare to your gut estimate.',
            answerKey:
              'Sample (writing a 2,000-word article): research 1/2/3, draft 2/3/5, edit 1/2/3, polish 0.5/1/2. Weighted: research 2.0; draft 3.17; edit 2.0; polish 1.08 → total 8.25 h focused. +20% buffer = 9.9 h. Calendar at 60% focus = 16.5 hours ≈ 2 work days. Gut estimate often lands at 4–5 hours (likely-only), which is 50% short. Strong answer cites the gap between gut and math; weak answer just reports the number.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Decompose and buffer',
            title: 'Break into subtasks; add 15–25% buffer',
            content:
              'Decomposition: any task longer than 4 hours should be split into subtasks of 1–4 hours each. Sum the subtask estimates, then add a 15–25% buffer for integration, re-work, and unknown unknowns. Example: 6 hours estimated × 1.20 = 7.2 hours planned. The buffer is not optional padding — it is the cost of being honest about variance.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Account for interruptions',
            title: 'Calendar time vs focused time',
            content: '4 h focused ≈ 6 h calendar (emails, calls, breaks).',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Three-point one task',
            content: 'Pick a recurring task. Compute weighted estimate; compare to gut.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Estimation traps',
            content: 'Using only "most likely." Adding zero buffer to large tasks.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Quotes, project plans, personal commitments',
            content: 'Freelancer quotes use three-point + buffer.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Estimate one real task',
            content: 'Pick one. Compute weighted; add 20% buffer; track actual; refine.',
            answerKey:
              'Lesson report task: best 2, likely 3, worst 5 → (2+4×3+5)/6 ≈ 3.17 h expected; +20% buffer ≈ 3.8 h calendar. Compare to actual hours logged; adjust worst-case upward if you always exceed likely.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 10.2 summary',
            title: 'Estimate three numbers, buffer once, round up',
            content: 'Three-point + small buffer beats single optimistic guess.',
          },
        ],
      },
      {
        lessonNumber: '10.3',
        title: 'Daily and Weekly Scheduling',
        estimatedMinutes: 30,
        learnerGoal: 'Build daily and weekly schedules grounded in real capacity.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Available time',
            title: '168 h minus what is committed',
            content:
              '168 − sleep 56 − work 40 − commute 5 − meals 14 − care 7 = 46 h discretionary.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'An 8-hour workday block',
            content:
              '8–9 admin; 9–12 Project A; 12–13 lunch; 13–15 meetings; 15–17 Project B.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Time blocking',
            title: 'Protect deep work',
            content: 'Deep 20 h / meetings 10 / collaboration 6 / admin 4 = 40 h.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Prioritisation math',
            title: 'Eisenhower-style sorting',
            content:
              'High urgency + high importance: do now. High importance/low urgency: schedule blocks.',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice — Build a real working week against real capacity',
            title: 'Discretionary hours, time blocks, one explicit no',
            content:
              'Goal: build a defensible weekly schedule for a knowledge worker who is working 40 hours and has personal commitments.\n\nStarting capacity: 168 hours/week. Subtract:\nSleep (8 h × 7 nights): 56.\nWork (40 h Mon–Fri): 40.\nCommute (1 h × 5 days): 5.\nMeals + admin (2 h × 7): 14.\nChildcare / family (1 h × 7): 7.\nSubtotal committed: 122.\nDiscretionary remaining: 168 − 122 = 46 hours.\n\nStep 1 — Build the work-week (40 hours) with realistic block sizes:\nDeep work: 4 days × 2.5 h morning blocks = 10 h.\nMeetings: avg 1.5 h × 5 days = 7.5 h.\nEmail/admin: 1 h × 5 days = 5 h.\nCollaboration / pairing: 1 h × 5 days = 5 h.\nDocumentation / writing: 2 h × 3 days = 6 h.\nBuffer for surprises: 6.5 h.\nTotal: 40 h ✓.\n\nStep 2 — Build the discretionary 46 hours:\nExercise: 4 sessions × 1 h = 4 h.\nSide learning (course, reading): 5 h.\nHobby project: 3 h.\nSocial: 6 h.\nHousehold maintenance: 6 h.\nRest / unstructured: 22 h.\nTotal: 46 h ✓.\n\nStep 3 — Stress test. If a recurring 1-h status meeting is added without removing anything else, the work week becomes 41 h. If it stays at 40 h, something must come out — most likely buffer (6.5 → 5.5) or one of the 2 h documentation blocks. Naming the trade-off explicitly is the whole point of capacity-based scheduling.\n\nStep 4 — One explicit "no". To keep the week from drifting back to 50+ hours, choose ONE recurring item to decline this week: e.g. "I will not accept a new recurring meeting before reviewing the schedule;" or "I will decline non-essential travel during the next 3-month deep-work push." Write it down.\n\nReasonableness: most knowledge workers report "no time" but never compute the 168-minus-committed math. The 46 discretionary hours is a real number — it shows that "no time" is usually code for "no plan." Build the plan against real numbers, then defend it.',
            learnerTask:
              'Do this for your real week. Compute (a) your committed hours (sleep, work, commute, meals, family, etc.), (b) your discretionary hours, (c) one specific block in your work week that is over-allocated, (d) one specific "no" you will say this week to protect the schedule.',
            answerKey:
              'Sample done well: (a) Committed 132 h (8.5 h sleep, 45 h work + commute, 14 h meals, 14 h family). (b) Discretionary 36 h. (c) Friday afternoons routinely over-run because all the "small admin" piles up — currently 4 h, often runs 6 h. (d) "I will not accept any new recurring meeting before next Friday — any request goes into the next-week review queue." Strong answer names a specific over-allocation AND a specific no; weak answer says "I have no time" without computing the 168-minus-committed number.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Compute discretionary hours',
            content: 'Subtract from 168.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Schedule traps',
            content: 'Planning eight hours of focused work over a calendar with four meetings.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Knowledge work, parenting, side projects',
            content: 'Knowledge workers protect deep work blocks.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Build next week',
            content: 'Block deep work / meetings / admin / breaks; one task to say no to.',
            answerKey:
              'Lesson capacity sketch: 168 − 56 sleep − 40 work − 5 commute − 14 meals − 7 care = 46 h discretionary. Allocate into blocks that sum to ≤46; if plan >46, move or drop one recurring meeting (name it explicitly).',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 10.3 summary',
            title: 'Plan against real capacity',
            content: 'Real available hours, weighted blocks, small set of priorities.',
          },
        ],
      },
      {
        lessonNumber: '10.4',
        title: 'Project Timelines and Critical Path',
        estimatedMinutes: 35,
        learnerGoal: 'Plan a multi-task project using critical-path thinking and buffers.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Critical path',
            title: 'The longest dependency chain sets the duration',
            content: 'List tasks, durations, dependencies; longest chain = duration.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 1 — A four-task project',
            title: 'Find the critical path',
            content:
              'Given: tasks A (4 hrs), B (6 hrs, requires A), C (3 hrs, requires A), D (5 hrs, requires B AND C).\n\nFormula: project duration = longest path from start to finish.\n\nPath 1 (A→B→D): 4 + 6 + 5 = 15 hours.\nPath 2 (A→C→D): 4 + 3 + 5 = 12 hours.\n\nCritical path = Path 1 at 15 hours. C has 3 hours of slack (it could finish 3 hours later than B without delaying D).\n\nAnswer: project duration = 15 hours; critical chain A-B-D; C is non-critical.\n\nReasonableness: project duration must be ≥ longest single task (B at 6) and ≤ sum of all tasks (4+6+3+5=18). 15 sits comfortably inside that range, confirming we found a real path.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 2 — Adding buffers to critical path only',
            title: 'A six-task launch',
            content:
              'Given: launch project — Discovery D (5 hrs), Design DS (8 hrs after D), Dev FE (12 hrs after DS), Dev BE (10 hrs after DS, parallel to FE), QA (6 hrs after both FE and BE), Launch L (2 hrs after QA).\n\nPath 1 (D→DS→FE→QA→L): 5 + 8 + 12 + 6 + 2 = 33 hours.\nPath 2 (D→DS→BE→QA→L): 5 + 8 + 10 + 6 + 2 = 31 hours.\n\nCritical path = Path 1 at 33 hours; BE has 2 hours of slack (could finish 2 hours after FE without delaying QA).\n\nAdd 15% buffer to critical path only: 33 × 1.15 = 38 hours total project duration.\n\nNon-critical tasks (BE) absorb their own variance using the 2 hours of slack already in the schedule.\n\nAnswer: planned duration 38 hours including critical-path buffer.\n\nReasonableness: buffer applied to all tasks (4+6+5+8+10+12+2 = 47 × 1.15 = 54) over-estimates because non-critical tasks can finish late within their slack without delaying the project. Buffer the critical path; the rest is already cushioned by parallelism.',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice',
            title: 'Map a real upcoming project',
            content:
              'Goal: a small kitchen renovation. Tasks:\nA: design + permits (3 days).\nB: order materials, after A (5 days lead time, you wait passively).\nC: demo old kitchen, after A (1 day).\nD: rough plumbing + electric, after C (2 days).\nE: install new cabinets, after B and D (2 days).\nF: countertops + tiling, after E (3 days).\nG: paint + finish, after F (1 day).\n\nStep 1 — Find paths:\nPath 1 (A→B→E→F→G): 3 + 5 + 2 + 3 + 1 = 14 days.\nPath 2 (A→C→D→E→F→G): 3 + 1 + 2 + 2 + 3 + 1 = 12 days.\n\nStep 2 — Critical path = Path 1 (the wait for materials). 14 days.\n\nStep 3 — Slack on Path 2: 14 − 12 = 2 days. Demo + plumbing crew has 2 days of float.\n\nStep 4 — Compress option: if you can pre-order materials before demo (move B to start of project, parallel to A), you save the 5-day wait that\'s on the critical path. New duration: longest path becomes A→C→D→E→F→G = 12 days. Big win for one organising change.\n\nReasonableness: critical-path analysis often reveals a "wait for materials" or "wait for approval" hidden in the project — moving these earlier in time is the single biggest schedule lever.',
            learnerTask:
              'Map any real upcoming project (work, home, study) with at least 5 tasks and 2 paths. Identify critical path, slack on non-critical, and one compression idea. State the duration.',
            answerKey:
              'Sample (writing a research paper): A literature review 8h; B outline (after A) 2h; C survey participants (after A) 12h; D draft (after B and C) 6h; E revise (after D) 3h. Path A-B-D-E: 8+2+6+3=19h. Path A-C-D-E: 8+12+6+3=29h → critical path. Slack on B: 29 − 19 = 10h. Compression: parallelise survey (C) with outline (B) by starting C immediately after A while B is in progress. New critical path = A → max(B, C) → D → E = 8 + 12 + 6 + 3 = 29h (no change because C was already the longest). Better compression: split C into 6h batches and start one before A finishes the lit review on the topic — saves ~4h. Strong answer identifies a real compression idea and states the saving.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Slack',
            title: 'Time you can spend without affecting deadline',
            content:
              'Slack (or float) on a task = (latest acceptable finish) − (earliest possible finish). In Worked Example 1, C must finish before D starts; D starts when B finishes (10h in); C\'s earliest finish is 7h in (after the 4h A + 3h C). C has 10 − 7 = 3 hours of slack. Tasks on the critical path have ZERO slack.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Dependencies and parallel work',
            title: 'Identify what truly waits',
            content: 'Mapping dependencies makes hidden parallelism visible.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Map a small project',
            content: 'Pick a real upcoming project; identify critical path and slack.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Project-planning traps',
            content: 'Estimating each task optimistically and ignoring buffers.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Launches, builds, events',
            content: 'Product launches use Gantt charts visualising critical paths.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Build a 5-task plan',
            content: 'Sketch durations, dependencies, critical path, buffer, parallel tasks.',
            answerKey:
              'Lesson chain A(4)→B(6)→D(5) with C(3) parallel to B: critical path 15 h; C finishes before D needs both B and C — slack on C = 15 − (4+3+5) if C on separate path — use your sketch to read slack; add 10–20% buffer on critical path only.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 10.4 summary',
            title: 'Map dependencies, then duration',
            content: 'Critical path tells the deadline; slack and parallelism tell where to compress.',
          },
        ],
      },
      {
        lessonNumber: '10.5',
        title: 'Time Zones, Meetings, and Optimisation',
        estimatedMinutes: 25,
        learnerGoal: 'Coordinate meetings across time zones and apply honest optimisation moves.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Time zones',
            title: 'UTC offsets and DST',
            content:
              'Nairobi UTC+3, NY UTC−5/−4, London UTC+0/+1, Mumbai UTC+5:30. Convert via UTC.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'Meeting across three zones',
            content:
              '13:00 UTC = 16:00 Nairobi / 14:00 London / 9:00 NY (during DST).',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Meeting hygiene',
            title: 'Math of fewer, shorter meetings',
            content:
              '10-person 1-hour meeting at $50/h loaded ≈ $500. Trim attendees, shorten to 30 min.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Honest optimisation',
            title: 'Three moves that work',
            content:
              'Track time honestly for one week; batch similar tasks; protect one deep-work block per day.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Schedule one cross-zone slot',
            content: 'Pick three zones; find one slot in business hours for all.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Coordination and optimisation traps',
            content: 'Forgetting DST in one region but not another.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Distributed teams and personal weeks',
            content: 'Every distributed team has a tax on time-zone coordination.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'One-week time audit',
            content: 'Log every 30 min for a week in 4–6 categories; compute percentages.',
            answerKey:
              'Example: 40 blocks deep work = 20 h → 20/112 ≈17.9% of waking work-week hours (112 ≈ 16×7). Meetings 25%, admin 15% — totals should sum to 100% of tracked time; if not, find missing category.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 10.5 summary',
            title: 'Math, not magic',
            content: 'Time-zone math, meeting cost, weekly audit beat any productivity system.',
          },
        ],
      },
    ],
    practiceLab: {
      title: 'Module 10 Practice Lab — Build a Working Week',
      durationMinutes: 35,
      learnerGoal:
        'Apply duration math, three-point estimation, scheduling, critical path, time-zone coordination.',
      scenarios: [
        {
          id: 'm10-lab-1',
          prompt: 'Working hours of a day starting 7:45 AM, ending 4:15 PM, 45-min lunch.',
          answerKey: '7.75 h.',
        },
        {
          id: 'm10-lab-2',
          prompt:
            'Three-point estimate: best 2, likely 4, worst 7; 20% buffer.',
          answerKey: '4.17 h × 1.20 ≈ 5 h.',
        },
        {
          id: 'm10-lab-3',
          prompt:
            'Daily 8 h schedule: 1 h admin, 3 h Project A, 2 h meetings, 2 h Project B.',
          answerKey: '8–9 admin; 9–12 A; 12–13 lunch; 13–15 meetings; 15–17 B.',
        },
        {
          id: 'm10-lab-4',
          prompt:
            'A(3), B(5 after A), C(2 after A), D(4 after B and C). Critical path and buffered.',
          answerKey: 'A→B→D = 12 h; with 20% buffer ≈ 14.4 h.',
        },
        {
          id: 'm10-lab-5',
          prompt: 'Slot for Nairobi (UTC+3), London (UTC+1 DST), NY (UTC−4 DST) in business hours.',
          answerKey: '13:00 UTC = 16:00 Nairobi / 14:00 London / 9:00 NY.',
        },
      ],
    },
    moduleQuiz: [
      {
        id: 'm10-q1',
        question: 'Convert 3 h 45 min to decimal hours.',
        type: 'calculation',
        correctAnswer: '3.75 h',
        explanation: '45 ÷ 60 = 0.75.',
        relatedLesson: '10.1',
        difficulty: 'easy',
      },
      {
        id: 'm10-q2',
        question: '9:15 AM to 2:45 PM. Hours worked?',
        type: 'calculation',
        correctAnswer: '5.5 h',
        explanation: '2:45 + 2:45.',
        relatedLesson: '10.1',
        difficulty: 'easy',
      },
      {
        id: 'm10-q3',
        question: 'Three-point: best 2, likely 3, worst 5. Weighted estimate?',
        type: 'calculation',
        correctAnswer: '≈3.17 h',
        explanation: '(2 + 12 + 5) / 6.',
        relatedLesson: '10.2',
        difficulty: 'medium',
      },
      {
        id: 'm10-q4',
        question:
          '6 h focused + 30 + 20 + 40 + 30 minutes interruptions. Total calendar?',
        type: 'calculation',
        correctAnswer: '8 h',
        explanation: '6 + 2 = 8.',
        relatedLesson: '10.2',
        difficulty: 'medium',
      },
      {
        id: 'm10-q5',
        question:
          'Sleep 56, work 40, commute 5, meals 14, care 7. Discretionary?',
        type: 'calculation',
        correctAnswer: '46 h',
        explanation: '168 − 122.',
        relatedLesson: '10.3',
        difficulty: 'medium',
      },
      {
        id: 'm10-q6',
        question: 'A(4) B(6 after A) C(3 after A) D(5 after B and C). Critical path?',
        type: 'calculation',
        correctAnswer: '15 h (A→B→D)',
        explanation: 'Longest chain.',
        relatedLesson: '10.4',
        difficulty: 'hard',
      },
      {
        id: 'm10-q7',
        question: 'Project task with slack means?',
        type: 'scenario',
        options: [
          'Task is unimportant.',
          'Can start later or finish later without delaying project.',
          'On critical path.',
          'Should be deleted.',
        ],
        correctAnswer:
          'Can start later or finish later without delaying project.',
        explanation: 'Float around non-critical-path tasks.',
        relatedLesson: '10.4',
        difficulty: 'medium',
      },
      {
        id: 'm10-q8',
        question:
          '10 people × 1 h × $50/h. Approximate cost?',
        type: 'calculation',
        correctAnswer: '≈$500',
        explanation: '10 person-hours × $50.',
        relatedLesson: '10.5',
        difficulty: 'easy',
      },
      {
        id: 'm10-q9',
        question: 'Nairobi (UTC+3) at 13:00 UTC?',
        type: 'calculation',
        correctAnswer: '16:00 Nairobi',
        explanation: '13 + 3 = 16.',
        relatedLesson: '10.5',
        difficulty: 'easy',
      },
      {
        id: 'm10-q10',
        question:
          'Deep 20 h / meetings 10 / collab 6 / admin 4. Deep work share?',
        type: 'calculation',
        correctAnswer: '50%',
        explanation: '20 / 40.',
        relatedLesson: '10.3',
        difficulty: 'easy',
      },
      {
        id: 'm10-q11',
        question:
          'A project manager estimates a new feature will take "2 weeks." Name three follow-up questions that would improve that estimate.',
        type: 'short_answer',
        correctAnswer:
          'Best/likely/worst case (3-point), assumptions about dependencies and team availability, and the definition of "done" (acceptance criteria).',
        explanation:
          'Single-point estimates hide variance and dependency risk. Three-point + dependencies + definition-of-done turn an estimate into a defensible commitment.',
        relatedLesson: '10.2',
        difficulty: 'hard',
      },
      {
        id: 'm10-q12',
        question:
          'You schedule a 60-minute meeting with 8 attendees at an average loaded cost of $75/hour. State the meeting cost AND name two ways to cut it.',
        type: 'short_answer',
        correctAnswer:
          'Cost = 8 × 1 × $75 = $600. Cuts: (1) trim attendees to those who must decide, (2) shorten to 30 min and require a written agenda + pre-read.',
        explanation:
          'Meeting cost = attendees × hours × loaded rate. The two highest-leverage cuts are reducing attendees and shortening duration; both require an agenda.',
        relatedLesson: '10.5',
        difficulty: 'medium',
      },
    ],
    moduleSummary:
      'You can compute durations, estimate tasks honestly, build schedules around real capacity, plan a project with critical path and slack, coordinate meetings across zones, and run a time audit.',
    completionChecklist: [
      'I can compute elapsed time across noon and midnight.',
      'I can convert decimal hours and clock time.',
      'I can run three-point estimation with a buffer.',
      'I can build a daily schedule that adds up.',
      'I can identify a critical path on a small project.',
      'I can find a meeting slot across three time zones.',
    ],
  },

  // ============================================================
  // MODULE 11 — Project Planning and Resource Allocation
  // ============================================================
  {
    moduleNumber: 11,
    slug: 'project-planning-resource-allocation',
    title: 'Project Planning and Resource Allocation',
    durationMinutes: 140,
    level: 'Intermediate',
    prerequisites: ['time-management-scheduling-math'],
    overview:
      'Estimate cost three ways, build a project budget with overhead and contingency, allocate labour and material resources, track progress with cost and schedule variance, and run a cost-benefit summary.',
    whyThisMatters: [
      'Most projects fail at the budget stage.',
      'A contingency not in the budget is paid out of profit.',
      'Resource overloading kills morale and slips deadlines silently.',
      'Variance analysis tells you whether the plan is still real.',
      'Cost-benefit analysis turns "should we do this?" into a defensible number.',
    ],
    learningObjectives: [
      'Estimate project costs using bottom-up, analogous, parametric, and three-point methods',
      'Build a project budget with labour, direct, overhead, and contingency line items',
      'Allocate team and material resources, recognise overload, and level the workload',
      'Compute labour cost including loaded rates and overhead',
      'Track project progress using cost variance and schedule variance',
      'Compute project ROI and a clean cost-benefit summary',
    ],
    lessons: [
      {
        lessonNumber: '11.1',
        title: 'Project Cost Estimation',
        estimatedMinutes: 35,
        learnerGoal:
          'Estimate project costs four ways: bottom-up, analogous, parametric, three-point.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Four estimation methods',
            title: 'Bottom-up, analogous, parametric, three-point',
            content:
              'Bottom-up most accurate. Analogous compares to past project. Parametric: cost per unit × quantity. Three-point combines optimistic/likely/pessimistic.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'Bottom-up estimate for a website',
            content:
              'Design 20×$75; Frontend 40×$85; Backend 30×$90; Content 15×$60; Testing 10×$75; PM 15×$100. Subtotal $10,750. Materials $1,000. Total $11,750.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'Parametric and three-point',
            content:
              'Parametric: 2,500 sq ft × $150 × 1.25 = $468,750. PERT (25, 40, 70): (25 + 160 + 70)/6 = 42.5; spread (70−25)/6 = 7.5.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Loaded labour rate',
            title: 'Why $50/hr costs more than $50',
            content: 'Base + benefits + payroll + overhead. $50 fully loaded is often $70–$90.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Three-point one project',
            content: 'Pick a project; estimate optimistic/likely/pessimistic; compute PERT.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Estimation traps',
            content: 'Estimating hours but ignoring loaded rates.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Quotes, budgets, board approvals',
            content: 'Client quote uses bottom-up.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Three-method estimate',
            content: 'Estimate one project bottom-up, parametric, three-point.',
            answerKey:
              'Lesson website bottom-up = $10,750 labour + $1,000 materials = $11,750. Parametric example: 2,500×$150×1.25 = $468,750. PERT (25,40,70) → (25+160+70)/6 = $42.5k expected with spread (70−25)/6 ≈ $7.5k.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 11.1 summary',
            title: 'Honest range beats false precision',
            content: 'Pick whichever method fits; load your rates.',
          },
        ],
      },
      {
        lessonNumber: '11.2',
        title: 'Budget Development with Overhead and Contingency',
        estimatedMinutes: 35,
        learnerGoal:
          'Build a project budget across four cost families (labour, direct, overhead, contingency), tier contingency by risk, and produce a defensible total a reviewer can audit.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Budget anatomy',
            title: 'Four families plus a risk-tiered safety net',
            content:
              'Every project budget contains four cost families. Labour: hours × loaded rate. Direct: materials, vendor fees, travel, software, anything tied directly to the project. Overhead: an allocation of shared cost — often expressed as a percent of labour or of subtotal (10–20% is common for small projects). Contingency: a deliberate buffer for unknown unknowns, sized by risk tier. Total = labour + direct + overhead + contingency. Always show the four lines separately so a reviewer can challenge each one.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Risk-tiered contingency',
            title: 'Match buffer to uncertainty',
            content:
              'Low-risk lines (familiar tasks, fixed-price quotes) carry 5% contingency. Medium-risk lines (estimated effort, vendor TBD) carry 10%. High-risk lines (research, novel scope, regulatory unknowns) carry 20% or more. Apply the right tier to each line, then sum — do not just slap a flat 10% on the bottom line and hope. The honest version exposes which parts of the project are risky.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 1 — Marketing campaign',
            title: 'Six-week launch campaign',
            content:
              'Given: 90 hr design + 60 hr account at $80 and $95/hr respectively; direct media $30,000; production photography $7,000 + travel $4,500; overhead 15% of labour; contingency 10% blended.\n\nFormula: total = labour + direct + overhead + contingency.\n\nLabour: 90 × 80 = 7,200; 60 × 95 = 5,700; subtotal labour = 12,900. Add 5% loaded rate buffer → labour = 13,550.\n\nDirect: media 30,000 + photo 7,000 + travel 4,500 = 41,500. (We treat photo + travel = 11,500.)\n\nOverhead: 15% × 13,550 = 2,032.50.\n\nSubtotal before contingency: 13,550 + 41,500 + 2,032.50 = 57,082.50.\n\nContingency: 10% × 57,082.50 = 5,708.25.\n\nAnswer: Total ≈ 62,791 → round to $63,000.\n\nReasonableness: media is by far the biggest line (~48%); if media drops 20%, total drops about $6,300 — sensitivity is bounded by the largest direct line.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 2 — Tiered contingency',
            title: 'Three lines, three risk tiers',
            content:
              'Given: line A $30,000 low-risk (fixed-price vendor); line B $15,000 medium-risk (estimated hours); line C $5,000 high-risk (R&D).\n\nFormula: contingency = Σ (line × tier rate).\n\nEstimate: weighted ≈ 5% × 30k + 10% × 15k + 20% × 5k.\n\nCalculate: 30,000 × 0.05 = 1,500; 15,000 × 0.10 = 1,500; 5,000 × 0.20 = 1,000. Sum = 4,000.\n\nAnswer: tiered contingency = $4,000, which is 8% of the $50,000 base — honest middle compared to a flat 10% ($5,000) or flat 5% ($2,500).\n\nReasonableness: the high-risk line carries the biggest buffer in percent terms (20%) but the smallest in dollar terms because the line itself is small. That is the right shape: risk priced where it lives.',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice',
            title: 'Build a tiered budget for a 4-week dashboard project',
            content:
              'Step 1 — Labour: 80 hr design + 40 hr engineering at $85 and $115/hr → 80 × 85 + 40 × 115 = 6,800 + 4,600 = 11,400.\nStep 2 — Direct: data subscription $3,000 + cloud $1,200 + licences $800 = 5,000.\nStep 3 — Overhead: 12% × labour = 0.12 × 11,400 = 1,368.\nStep 4 — Subtotal: 11,400 + 5,000 + 1,368 = 17,768.\nStep 5 — Tiered contingency: low-risk lines (data sub, licences = 3,800) × 5% = 190; medium-risk (engineering labour 4,600 + cloud 1,200 = 5,800) × 10% = 580; high-risk (design labour 6,800 — open scope discovery) × 20% = 1,360. Sum contingency = 2,130 (about 12% of subtotal).\nStep 6 — Total: 17,768 + 2,130 = 19,898 → round to $20,000.\nReasonableness: contingency 12% is justified because the largest line (design) is open-scope; flat 10% would underprice the real risk.',
            learnerTask:
              'Build a four-family budget for a real or realistic 4–6 week project: list labour, direct, overhead, tiered contingency, and total. Justify each tier in one sentence.',
            answerKey:
              'Sample: home renovation small bath, 3 weeks. Labour: 50 hr × $75 = $3,750. Direct: tile $1,400 + fixtures $900 + plumbing supplies $400 = $2,700. Overhead 10% labour = $375. Subtotal = $6,825. Contingency: low-risk fixtures $900 × 5% = 45; medium-risk tile $1,400 × 10% = 140; high-risk plumbing labour & supplies $4,150 (rip-out unknowns) × 20% = 830. Total contingency = 1,015 (15% of subtotal — honest because plumbing rip-out reveals unknown rot or pipe runs). Grand total ≈ $7,840. Justifications: fixtures fixed-price → 5%; tile cuts can yield waste → 10%; plumbing has unknown rot → 20%. Weak answer: flat 10% across all lines hides where the real risk lives.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Read this contingency',
            content:
              '$30,000 × 5% + $15,000 × 10% + $5,000 × 20% = 1,500 + 1,500 + 1,000 = $4,000. That is 8% of the $50,000 base — honest because it is high where risk is high.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Budget traps',
            content:
              'Forgetting overhead entirely (which makes the subtotal look lean and the post-mortem painful); flat-rating contingency on the bottom line instead of risk-tiering by line; double-counting (e.g. including travel in both direct and overhead); padding labour rates without disclosing the buffer.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Quotes, grant proposals, capex',
            content:
              'Client quotes need clear lines so the buyer can challenge each. Grant proposals require itemised budgets with labour-rate documentation. Capex requests need overhead and contingency lines that match company policy. Tiered contingency is the honest version of "we built in some buffer."',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Build a real budget',
            content:
              'Take a real or realistic project and build a four-family budget with tiered contingency. Show the four families, the contingency by tier, and the total. Add one paragraph naming the riskiest line and how you priced it.',
            answerKey:
              'Continuing the marketing campaign: labour $13,550 + direct $41,500 + overhead 15% × labour = $2,032.50; subtotal = $57,082.50. Tiered contingency: low-risk media buy at fixed CPM ($25,000) × 5% = 1,250; medium-risk creative labour ($13,550) × 10% = 1,355; high-risk performance media ($5,000 untested channels) × 20% = 1,000; medium-risk photo + travel ($11,500) × 10% = 1,150. Total contingency = 4,755 (8.3% of subtotal). Grand total ≈ $61,838 → round $62,000. Riskiest line: untested performance channels — 20% buffer because we have no historical CTR data; if that channel exceeds budget, we will pause it before adding more.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 11.2 summary',
            title: 'Four families, tiered safety net',
            content:
              'Labour + direct + overhead + tiered contingency = a budget a reviewer can challenge line by line. Risk-tier the buffer where it lives instead of flat-rating the bottom line.',
          },
        ],
      },
      {
        lessonNumber: '11.3',
        title: 'Resource Loading, Levelling, and Material Planning',
        estimatedMinutes: 35,
        learnerGoal: 'Allocate team capacity, level overloads, plan material requirements.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Resource loading',
            title: 'Total available vs planned work',
            content: '5 people × 40 h × 12 wks = 2,400 h capacity.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 1 — Resource levelling',
            title: 'Smooth a 4-week overload',
            content:
              'Given: planned hours per week — Week 1: 200, Week 2: 150, Week 3: 300, Week 4: 100. Capacity = 200/week.\n\nProblem: Week 3 has 100 hours of overload (300 vs 200). Other weeks are under capacity.\n\nFormula: total demand = 200+150+300+100 = 750 hours. Total capacity over 4 weeks = 800 hours. Total demand fits within total capacity, so leveling can solve without overtime.\n\nLevelling moves: shift 50 hours from Week 3 forward to Week 2 (uses Week 2\'s slack of 50). Shift 50 hours from Week 3 backward to Week 4 (uses Week 4\'s slack of 100, leaving 50 still available).\n\nResult: 200 / 200 / 200 / 150 = 750 hours total, all weeks within capacity.\n\nReasonableness: total demand ≤ total capacity is the necessary condition for levelling without overtime. If demand had exceeded capacity, the excess must be handed to overtime, contractors, or scope cuts.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 2 — Material planning',
            title: 'BOM × quantity + reorder point',
            content:
              'Given: a small assembly line builds 50 widgets per day. Each widget requires 2 motors, 4 screws, 1 housing. Lead times: motors 5 days; screws 1 day; housings 7 days.\n\nFormula: daily usage per part = widgets per day × parts per widget. Reorder point = (daily usage × lead time) + safety stock. Safety stock = ~2 days of usage for safe parts; 5 days for risky lead times.\n\nMotors: 50 × 2 = 100/day. Lead 5 days. Safety = 5 days × 100 = 500. ROP = (100 × 5) + 500 = 1,000 motors.\nScrews: 50 × 4 = 200/day. Lead 1 day. Safety = 2 days × 200 = 400. ROP = (200 × 1) + 400 = 600 screws.\nHousings: 50 × 1 = 50/day. Lead 7 days. Safety = 5 days × 50 = 250. ROP = (50 × 7) + 250 = 600 housings.\n\nAnswer: place orders when motor stock hits 1,000; screws at 600; housings at 600.\n\nReasonableness: longer lead times require larger reorder points (more on-hand) to avoid stockouts. Risky parts deserve bigger safety stock relative to lead time; commodity parts (screws) need less.',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice',
            title: 'Level a 5-week sprint and plan supplies',
            content:
              'Goal: a software team has 5 developers × 40 hr/wk capacity = 200 hr/wk. Sprint demand:\nWeek 1: 180 hrs; Week 2: 220 hrs; Week 3: 260 hrs; Week 4: 150 hrs; Week 5: 190 hrs.\n\nTotal demand: 180 + 220 + 260 + 150 + 190 = 1,000 hours.\nTotal capacity: 5 weeks × 200 = 1,000 hours.\n\nLevelling moves:\nWeek 2 (220 → 200): move 20 hrs to Week 1 (now 200) — no spare to Week 1 ✓.\nWeek 3 (260 → 200): move 60 hrs to Week 4 (now 210) and 10 to Week 5 (now 200), but Week 4 went over. Try: move 50 to Week 4 (now 200) and 10 to Week 5 (now 200). Week 3 reduces to 200 ✓.\n\nResult: 200/200/200/200/200 = 1,000. Sprint level loaded.\n\nMaterial planning: this team consumes 1 GitHub seat per dev = 5 seats; 1 CI minute per build × 80 builds/wk = 80 min/wk; 1 cloud GB per build × 80 builds × 0.5 GB = 40 GB/wk. Order seats annually (long lead); CI/cloud is metered (instant), no reorder point — just budget.\n\nReasonableness: total demand exactly matched capacity; in practice, leave 10–15% buffer for unplanned work. Always model the buffer; don\'t plan to 100% utilisation.',
            learnerTask:
              'A small construction team has 4 workers × 40 hr/wk = 160 hrs/wk capacity. Demand over 4 weeks: 140, 200, 180, 100. Total ok? Level the weeks, identify any that need overtime, and propose a fix.',
            answerKey:
              'Total demand: 620 hrs; total capacity: 640 hrs ✓ (within total). Week 2 over by 40 hrs; Week 3 over by 20 hrs. Move 40 from Week 2 to Week 1 (now 180 — over by 20!) — try: move 20 from Week 2 to Week 4 (now 120), move 20 from Week 2 to Week 1 (now 160 ✓), move 20 from Week 3 to Week 4 (now 140). Final: 160/160/160/140 — all within capacity. Strong answer balances by moving smaller amounts to multiple weeks; weak answer pushes large blocks and creates new overloads.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Material planning',
            title: 'Build of materials × quantity, with safety stock',
            content:
              'For each component, daily usage = production rate × parts per finished unit. Reorder point = (daily usage × lead time) + safety stock. Safety stock sizes to lead-time variance — long lead times deserve more buffer. Materials with multiple suppliers need less safety; sole-source needs more.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Spot the overload',
            content:
              'Schedule 200/200/280/100 vs 200/week capacity. Week 3 is 80 over capacity. Total demand 780 ≤ total capacity 800 → can level without overtime. Move 50 from Week 3 to Week 4 (Week 4 now 150) and 30 from Week 3 to Week 1 — but Week 1 is at capacity. Better: move 80 from Week 3 to Week 4 (now 180); Week 3 down to 200 ✓. All weeks within capacity.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Resource traps',
            content: 'Planning to 100% utilisation with no buffer.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Sprints, builds, events',
            content: 'Software sprints level work.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: "Level one team's week",
            content: 'Allocate planned hours across 4 weeks; if any exceeds capacity, propose levelling.',
            answerKey:
              'Lesson levelling: demand 200/150/300/100 vs cap 200 → move 50 from week 3 to weeks 2 and 4 → 200/200/200/150. Show before/after table and note remaining 50 overload in week 4 if you need zero overtime.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 11.3 summary',
            title: 'Capacity is real, even when calendars hide it',
            content: 'Plan against actual hours; level overloads; add buffers.',
          },
        ],
      },
      {
        lessonNumber: '11.4',
        title: 'Tracking, Variance, and Cost-Benefit',
        estimatedMinutes: 35,
        learnerGoal: 'Track planned vs actual cost and schedule, compute simple variance, run cost-benefit.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Cost variance and schedule variance',
            title: 'Two simple checks',
            content:
              'CV = BCWP − ACWP (negative = over budget). SV = BCWP − BCWS (negative = behind schedule).',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'Halfway through a $20,000 project',
            content:
              'BCWS $10k, BCWP $9k, ACWP $11.5k. CV −$2,500 (over budget); SV −$1,000 (slightly behind).',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Cost-benefit logic',
            title: 'Quantified pros and cons',
            content: 'Net benefit = total benefit − total cost. Ratio > 1 means it pays for itself.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'Equipment upgrade',
            content:
              '$50k cost. Year savings $20k × 5 = $100k. Ratio 2.0; payback 2.5 years.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Read project status',
            content: 'CV +$3k, SV −$2k → under budget for work done, but behind schedule.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Tracking traps',
            content: 'Tracking cost only, missing schedule slip.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Status reports, board reports, vendor reviews',
            content: 'Weekly status uses CV and SV.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Run a status check',
            content: 'For a real project, compute CV and SV at recent checkpoint; corrective action.',
            answerKey:
              'Lesson checkpoint: BCWS $10k, BCWP $9k, ACWP $11.5k → CV = 9−11.5 = −$2.5k (over budget); SV = 9−10 = −$1k (behind schedule). Action: freeze scope or recover schedule on parallel tasks; control spend on remaining work packages.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 11.4 summary',
            title: 'Two variances, one ratio',
            content: 'CV/SV for tracking; benefit-cost for decisions.',
          },
        ],
      },
    ],
    practiceLab: {
      title: 'Module 11 Practice Lab — End-to-End Project Plan',
      durationMinutes: 40,
      learnerGoal: 'Estimate, budget, allocate, track, and justify a small project end-to-end.',
      scenarios: [
        {
          id: 'm11-lab-1',
          prompt:
            'Estimate website: design 20×$75; FE 40×$85; BE 30×$90; content 15×$60; testing 10×$75; PM 15×$100; materials $1,000.',
          answerKey: 'Labour $10,750 + materials $1,000 = $11,750.',
        },
        {
          id: 'm11-lab-2',
          prompt:
            '15% overhead on labour + tiered contingency (5% on $8k, 10% on $3k, 20% on $750). Total budget?',
          answerKey:
            'Overhead $1,613; contingency $400+$300+$150=$850. Total $14,213 → $14,250.',
        },
        {
          id: 'm11-lab-3',
          prompt:
            'Allocate 2,400 h × 12 weeks: dev 50, test 20, docs 15, meetings 10, buffer 5.',
          answerKey: '1,200 / 480 / 360 / 240 / 120.',
        },
        {
          id: 'm11-lab-4',
          prompt:
            'Halfway: BCWS $10k, BCWP $9k, ACWP $11.5k. CV and SV?',
          answerKey: 'CV −$2,500; SV −$1,000.',
        },
        {
          id: 'm11-lab-5',
          prompt:
            'Cost-benefit: $50k equipment, $15k+$5k/yr benefits. 5-year ratio and payback?',
          answerKey: 'Annual $20k; 5-yr $100k; ratio 2.0; payback 2.5 years.',
        },
      ],
    },
    moduleQuiz: [
      {
        id: 'm11-q1',
        question: 'PERT for opt $25k, likely $40k, pess $70k.',
        type: 'calculation',
        correctAnswer: '$42,500',
        explanation: '(25 + 160 + 70)/6.',
        relatedLesson: '11.1',
        difficulty: 'medium',
      },
      {
        id: 'm11-q2',
        question: 'Marketing labour $13,550. 15% overhead?',
        type: 'calculation',
        correctAnswer: '≈$2,032.50',
        explanation: '13,550 × 0.15.',
        relatedLesson: '11.2',
        difficulty: 'easy',
      },
      {
        id: 'm11-q3',
        question:
          'Tiered contingency: $30k×5% + $15k×10% + $5k×20%.',
        type: 'calculation',
        correctAnswer: '$4,000 (8% of base)',
        explanation: '$1,500 + $1,500 + $1,000.',
        relatedLesson: '11.2',
        difficulty: 'medium',
      },
      {
        id: 'm11-q4',
        question: '5 × 40 × 12 capacity.',
        type: 'calculation',
        correctAnswer: '2,400 h',
        explanation: '5 × 40 × 12.',
        relatedLesson: '11.3',
        difficulty: 'easy',
      },
      {
        id: 'm11-q5',
        question:
          'Demand 200/150/300/100 vs 200/wk. How would you level?',
        type: 'scenario',
        options: [
          'Move 50 from Wk3 to Wk2 and 50 to Wk4.',
          '300 Wk3 with 50 OT.',
          'Cut Wk3 scope 33%.',
          'Cancel Wks 1, 2, 4.',
        ],
        correctAnswer: 'Move 50 from Wk3 to Wk2 and 50 to Wk4.',
        explanation: 'Smooths to 200/200/200/150.',
        relatedLesson: '11.3',
        difficulty: 'medium',
      },
      {
        id: 'm11-q6',
        question:
          'Wk6: planned $10k, performed $9k, actual $11.5k. CV and SV?',
        type: 'scenario',
        options: [
          'CV −$2,500; SV −$1,000',
          'CV +$2,500; SV +$1,000',
          'CV +$1,500; SV +$1,000',
          'CV −$1,000; SV −$2,500',
        ],
        correctAnswer: 'CV −$2,500; SV −$1,000',
        explanation: 'BCWP − ACWP and BCWP − BCWS.',
        relatedLesson: '11.4',
        difficulty: 'hard',
      },
      {
        id: 'm11-q7',
        question: '$50k equipment saves $20k/yr. Payback?',
        type: 'calculation',
        correctAnswer: '2.5 years',
        explanation: '$50/$20.',
        relatedLesson: '11.4',
        difficulty: 'easy',
      },
      {
        id: 'm11-q8',
        question: '5-year benefit $100k, cost $50k. Ratio?',
        type: 'calculation',
        correctAnswer: '2.0',
        explanation: '$100k / $50k.',
        relatedLesson: '11.4',
        difficulty: 'easy',
      },
      {
        id: 'm11-q9',
        question: '$150/sq ft × 2,500 × 1.25. Base estimate?',
        type: 'calculation',
        correctAnswer: '$468,750',
        explanation: '$150 × 2,500 × 1.25.',
        relatedLesson: '11.1',
        difficulty: 'medium',
      },
      {
        id: 'm11-q10',
        question: 'Why is 100% utilisation risky?',
        type: 'scenario',
        options: [
          'No buffer for sick days, surprises, rework.',
          '100% = 50% mathematically.',
          '100% always reduces cost.',
          'No risk; 100% is the goal.',
        ],
        correctAnswer: 'No buffer for sick days, surprises, rework.',
        explanation: 'Aim ~85–90%.',
        relatedLesson: '11.3',
        difficulty: 'medium',
      },
    ],
    moduleSummary:
      'You can estimate four ways, build four-family budget with overhead and risk-tiered contingency, level resources, track CV and SV, and run cost-benefit summary.',
    completionChecklist: [
      'I can estimate bottom-up, parametrically, and three-point.',
      'I can build a budget with labour, direct, overhead, contingency.',
      'I can allocate team-hours and level overloads.',
      'I can compute CV and SV.',
      'I can run a cost-benefit summary with payback and ratio.',
    ],
  },

  // ============================================================
  // MODULE 12 — Advanced Business Math
  // ============================================================
  {
    moduleNumber: 12,
    slug: 'advanced-business-math',
    title: 'Advanced Business Math',
    durationMinutes: 160,
    level: 'Intermediate',
    prerequisites: ['project-planning-resource-allocation'],
    safetyNote:
      'These advanced business calculations — including depreciation, time-value of money, NPV, IRR, loan amortization, and valuation — are educational examples only. They do not constitute financial, tax, accounting, investment, valuation, or fundraising advice. Real-world rates, discount rates, accounting standards, depreciation methods, and tax treatment differ by country, industry, and year. Validate any financial decision based on these calculations with qualified accountants, tax professionals, financial advisors, or licensed bankers, and use audited or live figures rather than illustrative examples.',
    overview:
      'Bridge between everyday business math and finance literacy. Compute depreciation three ways, work with present and future value, build amortisation schedules, evaluate investments using NPV and IRR, and read basic ratios used in valuation and lending.',
    whyThisMatters: [
      'Time-value of money is the single most important idea in finance.',
      'Depreciation schedules drive both tax outcomes and asset replacement timing.',
      'NPV and IRR turn "is this a good investment?" into a number.',
      'Amortisation schedules expose the real cost of long loans.',
      'Working capital and leverage ratios are how lenders and investors read a business.',
    ],
    learningObjectives: [
      'Calculate straight-line, double-declining-balance, and units-of-production depreciation',
      'Compute future and present value with simple, periodic, and annuity formulas',
      'Build a loan amortisation schedule and explain principal-vs-interest split',
      'Compute NPV and IRR and interpret reject below cost of capital',
      'Read working-capital, current ratio, debt-to-equity, and times-interest-earned',
      'Reason about lease vs buy at an advanced level using NPV',
    ],
    lessons: [
      {
        lessonNumber: '12.1',
        title: 'Depreciation Methods',
        estimatedMinutes: 30,
        learnerGoal:
          'Compute depreciation three ways (straight-line, double-declining balance, units-of-production) and choose the method that honestly matches how an asset loses value.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Why depreciation exists',
            title: 'Spreading the cost over useful life',
            content:
              'Depreciation matches the expense of an asset to the years that asset actually creates value. Without it, a $100,000 truck purchase would crush this year\'s books and disappear from next year\'s — even though the truck still does work. Three methods cover most adult business decisions: straight-line (steady), double-declining balance (front-loaded), and units-of-production (usage-based).',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Three formulas',
            title: 'Pick the shape, then plug in',
            content:
              'Straight-line: annual = (cost − salvage) ÷ useful life in years. Double-declining balance: annual rate = 2 ÷ life; year-N depreciation = rate × beginning book value; never let book value drop below salvage. Units-of-production: per-unit = (cost − salvage) ÷ total expected units; year-N depreciation = per-unit × units used in year N.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 1 — Straight-line',
            title: 'Office equipment, $50k cost, $5k salvage, 10 years',
            content:
              'Given: cost = 50,000; salvage = 5,000; life = 10 years.\n\nFormula: annual = (cost − salvage) ÷ life.\n\nEstimate: 45,000 over 10 years → 4,500/yr.\n\nSubstitute: annual = (50,000 − 5,000) ÷ 10.\n\nCalculate: 45,000 ÷ 10 = 4,500.\n\nAnswer: $4,500 per year for 10 years.\n\nReasonableness: total deduction = 4,500 × 10 = 45,000 = cost − salvage. Books balance.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 2 — Double-declining balance',
            title: 'Delivery truck, $100k cost, 5-year life, $10k salvage',
            content:
              'Given: cost = 100,000; salvage = 10,000; life = 5 years.\n\nFormula: rate = 2 ÷ 5 = 40%; year-N depreciation = rate × beginning book value, capped so book value never drops below salvage.\n\nYear 1: 40% × 100,000 = 40,000 → book value 60,000.\nYear 2: 40% × 60,000 = 24,000 → book value 36,000.\nYear 3: 40% × 36,000 = 14,400 → book value 21,600.\nYear 4: 40% × 21,600 = 8,640 → book value 12,960.\nYear 5: 40% × 12,960 = 5,184, but that would push book value below salvage 10,000. Cap to 12,960 − 10,000 = 2,960. Final book value 10,000.\n\nAnswer: 40,000 / 24,000 / 14,400 / 8,640 / 2,960. Total depreciation = 90,000 = cost − salvage. ✓\n\nReasonableness: front-loading is visible — 64% of total in the first two years. Matches how trucks lose resale value early.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 3 — Units of production',
            title: 'Production press, $80k cost, $5k salvage, 150,000 units',
            content:
              'Given: cost = 80,000; salvage = 5,000; expected lifetime output = 150,000 units.\n\nFormula: per-unit = (cost − salvage) ÷ total units; year-N expense = per-unit × units used in N.\n\nPer-unit: (80,000 − 5,000) ÷ 150,000 = 75,000 ÷ 150,000 = $0.50/unit.\n\nYear 1 used 35,000 units: 35,000 × 0.50 = 17,500.\nYear 2 used 28,000 units: 28,000 × 0.50 = 14,000.\n\nAnswer: depreciation tracks actual usage instead of clock time.\n\nReasonableness: a busy year costs more depreciation; a slow year costs less — matches how the press wears out.',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice',
            title: 'Match the asset to the method',
            content:
              'Three assets are bought this year. For each, pick a method and compute year-1 depreciation.\n\n(1) Office furniture, $14,000 cost, $1,000 salvage, 8-year life — Straight-line: (14,000 − 1,000) ÷ 8 = 13,000 ÷ 8 = $1,625/yr. Reason: furniture loses value steadily.\n\n(2) Salesperson laptop fleet, $30,000 cost, 4-year life, no salvage — Double-declining balance: rate = 2 ÷ 4 = 50%; year-1 = 50% × 30,000 = $15,000. Reason: laptops lose value fast.\n\n(3) Manufacturing mold, $60,000 cost, $0 salvage, 200,000 expected units — Units-of-production: per-unit = 60,000 ÷ 200,000 = $0.30; year-1 with 45,000 units = 45,000 × 0.30 = $13,500. Reason: wear scales with usage.',
            learnerTask:
              'Pick a real-or-realistic asset from your situation. State cost, salvage, life or expected units, and method, then compute year-1 depreciation. Justify your method choice in one sentence.',
            answerKey:
              'Sample: Espresso machine for a small café, cost $4,500, salvage $500, life 6 years. Method: straight-line, because it gets used roughly the same amount each year. Year-1 = (4,500 − 500) ÷ 6 = 4,000 ÷ 6 = $667/yr. A weaker answer would pick DDB for a steady-use kitchen item or skip salvage. The check: total deductions over 6 years = 667 × 6 = 4,002 ≈ 4,000 = cost − salvage. ✓',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Pick the method',
            content:
              'Office furniture (7-year life, steady use) → straight-line. Truck (rapid early loss) → double-declining balance. Production press (uneven usage by year) → units-of-production. The wrong match still gives a number — it just tells a misleading story.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Depreciation traps',
            content:
              'Forgetting salvage value (over-depreciates the asset); letting DDB push book value below salvage (must be capped); applying units-of-production with a guess at total units (large guess error → large depreciation error in early years); switching methods mid-life without disclosure.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Capex decisions and tax filings',
            content:
              'Capex requests use depreciation to project earnings impact. Tax filings allow specific methods (consult a tax professional). Lease vs buy decisions compare lease cost to buy cost + depreciation tax shield.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Three depreciation problems',
            content:
              '(1) Straight-line: cost 30,000, salvage 3,000, 6 years — find annual.\n(2) Double-declining balance: cost 50,000, 5-year life, no salvage — find year-2 depreciation.\n(3) Units-of-production: cost 40,000, salvage 4,000, 100,000 expected units — find year-1 expense if 25,000 units were used.\n\nShow each calculation and a one-line reasonableness check.',
            answerKey:
              '(1) (30,000 − 3,000) ÷ 6 = 27,000 ÷ 6 = $4,500/yr. Total over 6 yr = 27,000 = cost − salvage ✓.\n(2) Rate = 2/5 = 40%. Year-1 = 40% × 50,000 = 20,000 → book value 30,000. Year-2 = 40% × 30,000 = $12,000.\n(3) Per-unit = (40,000 − 4,000) ÷ 100,000 = 36,000 ÷ 100,000 = $0.36/unit. Year-1 = 25,000 × 0.36 = $9,000. Reasonableness: 25% of expected lifetime use → 25% of 36,000 depreciable base = 9,000 ✓.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 12.1 summary',
            title: 'Three honest stories about one asset',
            content:
              'Pick the method that matches how the asset actually loses value: steady (SL), front-loaded (DDB), or usage-driven (units). Document your choice and salvage value so the math is auditable later.',
          },
        ],
      },
      {
        lessonNumber: '12.2',
        title: 'Time Value of Money: PV, FV, and Annuities',
        estimatedMinutes: 35,
        learnerGoal:
          'Compute future value, present value, and the value of an annuity stream using clear formulas, and explain why the discount rate matters.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'TVM',
            title: 'A dollar today is worth more than a dollar later',
            content:
              'A dollar you hold now can earn a return; a dollar you receive in five years cannot earn that return for you. The discount rate r reflects the opportunity cost — what you could have earned safely on the same money. The bigger r is and the longer the wait t, the more a future amount must be discounted to be comparable to money you have today.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Three formulas',
            title: 'FV, PV, and annuity',
            content:
              'Future value: FV = PV × (1 + r)^t. Present value: PV = FV ÷ (1 + r)^t. Future value of an annuity (equal payments PMT at the end of each period for t periods): FV_a = PMT × ((1 + r)^t − 1) ÷ r. The rate r and the period t must use the same time unit (both annual, or both monthly).',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 1 — FV',
            title: '$10,000 at 6% for 5 years',
            content:
              'Given: PV = $10,000; r = 6% per year; t = 5 years.\n\nFormula: FV = PV × (1 + r)^t.\n\nEstimate: at 6% for 5 yr, money grows roughly 1.06^5 ≈ 1.34, so FV ≈ 10,000 × 1.34 = 13,400.\n\nSubstitute: FV = 10,000 × 1.06^5.\n\nCalculate: 1.06^5 = 1.3382 → FV = 10,000 × 1.3382 = 13,382.\n\nAnswer: FV ≈ $13,382.\n\nReasonableness: 13,382 is within 0.2% of the 13,400 estimate — accept.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 2 — PV',
            title: '$50,000 needed in 10 years at 7%',
            content:
              'Given: FV target = $50,000; r = 7% per year; t = 10 years.\n\nFormula: PV = FV ÷ (1 + r)^t.\n\nEstimate: 1.07^10 ≈ 2 (the rule of 72: 72/7 ≈ 10 years to double), so PV ≈ 50,000 ÷ 2 = 25,000.\n\nSubstitute: PV = 50,000 ÷ 1.07^10.\n\nCalculate: 1.07^10 = 1.9672 → PV = 50,000 ÷ 1.9672 = 25,418.\n\nAnswer: PV ≈ $25,418 today funds $50,000 in 10 years at 7%.\n\nReasonableness: 25,418 is within 1.7% of the 25,000 rule-of-72 estimate — accept.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 3 — Annuity FV',
            title: 'Saving $5,000 a year for 10 years at 6%',
            content:
              'Given: PMT = $5,000 per year; r = 6%; t = 10 years (end-of-year payments).\n\nFormula: FV_a = PMT × ((1 + r)^t − 1) ÷ r.\n\nEstimate: 10 deposits of 5,000 = 50,000 of contributions, plus growth ≈ 30%, so FV ≈ 65,000.\n\nSubstitute: FV_a = 5,000 × (1.06^10 − 1) ÷ 0.06 = 5,000 × (1.7908 − 1) ÷ 0.06.\n\nCalculate: (0.7908 ÷ 0.06) = 13.181; 5,000 × 13.181 = 65,904.\n\nAnswer: FV_a ≈ $65,904.\n\nReasonableness: 65,904 vs estimate 65,000 is a 1.4% gap — accept.',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice',
            title: 'Walk a PV problem with a twist',
            content:
              'Goal: how much do I need today to have $20,000 ready in 8 years if I can earn 5% per year safely?\n\nStep 1 — Identify: FV = 20,000; r = 0.05; t = 8.\n\nStep 2 — Formula: PV = FV ÷ (1 + r)^t.\n\nStep 3 — Estimate: 1.05^8 ≈ 1.48 (rule of 72: 72/5 ≈ 14 years to double; 8 years is roughly half of that, so factor ≈ 1.5). PV ≈ 20,000 ÷ 1.5 ≈ 13,300.\n\nStep 4 — Calculate: 1.05^8 = 1.4775 → PV = 20,000 ÷ 1.4775 = 13,537.\n\nStep 5 — Verify: 13,537 vs 13,300 estimate is a 1.8% gap — accept.',
            learnerTask:
              'Now do it for FV = $40,000, r = 6%, t = 12 years. Show all five steps and a one-line reasonableness verdict.',
            answerKey:
              '1.06^12 = 2.0122. PV = 40,000 ÷ 2.0122 = $19,879. Estimate using rule of 72: 72/6 = 12 years to double → factor ≈ 2 → PV ≈ 20,000. Verdict: 19,879 is within 0.6% of the 20,000 estimate — accept. A weaker answer would skip the estimate or substitute the wrong rate (e.g. 0.6 instead of 0.06). The check that catches this is the doubling-time intuition: at 6% the money should double in ~12 years, so PV should be roughly half of FV.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Quick check',
            title: 'Match rate to period',
            content:
              'A 6% annual rate compounded monthly: r per month = 6%/12 = 0.5%; t in months. For monthly contributions of $200 over 30 years at 6% annual: r_m = 0.005, t = 360. FV_a = 200 × ((1.005^360 − 1) ÷ 0.005) ≈ 200 × 1004.5 ≈ $200,900. The classic mistake is to leave r at 0.06 with t = 360 — that compounds annually 360 times and balloons absurdly.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'TVM traps',
            content:
              'Wrong rate for the period (annual r with monthly t, or vice versa); confusing FV with FV_a (single lump vs stream of payments); forgetting whether payments are at start of period (annuity-due) or end (ordinary annuity) — start-of-period adds one extra compounding step.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Retirement, leases, capital decisions',
            content:
              'Retirement projections use FV of annuities (regular contributions). Pension lump-sum vs monthly check decisions use PV. Lease-vs-buy and refinance break-even use both. Reasonable discount rates: long-term safe ≈ 4–6%; equity-like ≈ 8–10%; project hurdle rates ≈ 10–15%.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Three TVM problems',
            content:
              '(1) FV of $5,000 at 6% for 10 years. (2) PV of $30,000 in 6 years at 4%. (3) FV of $2,000/yr at 5% for 15 years (end-of-year). Show estimate, calculation, and verification for each.',
            answerKey:
              '(1) FV = 5,000 × 1.06^10 = 5,000 × 1.7908 = $8,954. Estimate: doubles in ~12 yr → factor ≈ 1.79 at 10 yr → ≈ 8,950. Accept. (2) PV = 30,000 ÷ 1.04^6 = 30,000 ÷ 1.2653 = $23,711. Estimate: 1.04^6 ≈ 1.27 → PV ≈ 23,600. Accept. (3) FV_a = 2,000 × (1.05^15 − 1) ÷ 0.05 = 2,000 × (2.0789 − 1) ÷ 0.05 = 2,000 × 21.578 = $43,156. Estimate: 15 deposits of 2,000 = 30,000 contributions; growth ≈ 40% → FV ≈ 42,000. Accept.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 12.2 summary',
            title: 'TVM is the gateway',
            content:
              'Right rate, right period, right formula, right shape. Anchor every TVM answer to a rule-of-72 sanity estimate before trusting the calculator.',
          },
        ],
      },
      {
        lessonNumber: '12.3',
        title: 'Loan Amortisation',
        estimatedMinutes: 30,
        learnerGoal: 'Build amortisation schedule and explain principal-vs-interest split.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Amortisation',
            title: 'Equal payments, shifting composition',
            content: 'Early payments mostly interest; later mostly principal.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 1 — $200k/5%/30 yr mortgage',
            title: 'First three months of the schedule',
            content:
              'Given: principal $200,000; APR 5%; 30-year term.\n\nFormula: monthly r = APR/12; monthly payment M = P × r ÷ (1 − (1+r)^(−n)). Each month: interest = balance × r; principal = M − interest; new balance = balance − principal.\n\nMonthly r: 0.05 ÷ 12 = 0.004167.\nM: 200,000 × 0.004167 ÷ (1 − 1.004167^(−360)) = 833.33 ÷ 0.77614 = $1,073.64.\n\nMonth 1: interest = 200,000 × 0.004167 = $833.33; principal = 1,073.64 − 833.33 = $240.31; balance = 200,000 − 240.31 = $199,759.69.\n\nMonth 2: interest = 199,759.69 × 0.004167 = $832.33; principal = $241.31; balance = $199,518.38.\n\nMonth 3: interest = $831.33; principal = $242.31; balance = $199,276.07.\n\nReasonableness: each month, interest drops by ~$1 (because balance is shrinking) and principal grows by ~$1. The crossover where principal exceeds interest in this loan happens around month 196 — about 16 years into a 30-year loan.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 2 — Extra principal payments',
            title: 'Pay an extra $100/month, save how much?',
            content:
              'Given: same loan ($200k, 5%, 30 yr, $1,073.64/mo). Now pay $1,173.64/mo (extra $100 toward principal).\n\nFormula: each month, after computing interest, the principal payment = (M + extra) − interest. The extra accelerates payoff because every dollar of extra principal saves all future interest on that dollar.\n\nMonth 1 with extra: interest $833.33; principal = 1,173.64 − 833.33 = $340.31; balance = $199,659.69.\n\nLong-term effect (using a spreadsheet or formula): payoff in ~278 months instead of 360. Savings: original total interest = 1,073.64 × 360 − 200,000 = $186,510. New total interest = 1,173.64 × 278 − 200,000 = $126,272. Savings ≈ $60,238.\n\nAnswer: $100/month extra saves ~$60,000 over the loan life and shortens by ~7 years.\n\nReasonableness: extra principal is most powerful early, when the original schedule is mostly interest. The same $100/month added in year 25 saves only a few hundred dollars. The "extra payments hit hardest early" rule is real and quantifiable.',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice',
            title: 'Build the first 3 rows of an amortisation table',
            content:
              'Goal: $50,000 auto loan at 6% APR for 5 years. Build the first 3 months of the amortisation schedule.\n\nStep 1 — Monthly rate: 0.06 / 12 = 0.005.\nStep 2 — n = 60. Monthly payment: 50,000 × 0.005 ÷ (1 − 1.005^(−60)) = 250 ÷ 0.25884 = $966.64.\nStep 3 — Month 1: interest = 50,000 × 0.005 = $250.00; principal = 966.64 − 250.00 = $716.64; balance = 50,000 − 716.64 = $49,283.36.\nStep 4 — Month 2: interest = 49,283.36 × 0.005 = $246.42; principal = 966.64 − 246.42 = $720.22; balance = $48,563.14.\nStep 5 — Month 3: interest = 48,563.14 × 0.005 = $242.82; principal = 966.64 − 242.82 = $723.82; balance = $47,839.32.\n\nReasonableness: each month, interest falls by $3-4 (balance shrinking by ~$720), principal rises by the same. By month 30 (halfway), principal portion noticeably exceeds interest. Total interest paid = $966.64 × 60 − 50,000 = $7,998.40 — about 16% of the loan amount, which is the cost of borrowing at 6% over 5 years.',
            learnerTask:
              'Build the first 2 months of an amortisation for $25,000 / 7% / 4 years. Compute monthly payment, then month 1 and month 2 interest/principal/balance.',
            answerKey:
              'Monthly r: 0.07/12 ≈ 0.005833. n: 48. M = 25,000 × 0.005833 ÷ (1 − 1.005833^(−48)) = 145.83 ÷ 0.24361 = $598.64. M1: interest = 25,000 × 0.005833 = $145.83; principal = 598.64 − 145.83 = $452.81; balance = $24,547.19. M2: interest = 24,547.19 × 0.005833 = $143.19; principal = 598.64 − 143.19 = $455.45; balance = $24,091.74. Strong answer shows formula and verifies inverse: M × 48 = 28,734.72, less 25,000 = $3,734.72 total interest (~14.9% of loan).',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Total interest',
            title: 'Pay attention to total cost',
            content:
              'Total cost of a loan = monthly payment × number of payments. Total interest = total cost − principal. For the $200k/5%/30 yr example: total = 1,073.64 × 360 = $386,510; interest = 386,510 − 200,000 = $186,510 — almost as much as the original principal. Always compute total interest before signing; the sticker rate alone doesn\'t convey the lifetime cost.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Early payoff',
            title: 'Where extra payments hit hardest',
            content:
              'Extra principal payments save the most money when made early in the schedule. Each dollar of extra principal eliminates all future interest on that dollar; early dollars have many more years of compounding to skip. Late-life extra payments save very little because most of the interest has already accrued. Practical rule: throw windfalls at the loan in years 1–10 of a 30-year mortgage; year-25 extra payments do almost nothing.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Read the schedule',
            content:
              'On $200k/5%/30yr, principal portion of the monthly payment exceeds the interest portion around month 196 (≈16.3 years in). If you assume the loan is "half paid" at year 15, you are wrong — only about 30% of principal has been retired by then.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Amortisation traps',
            content: 'Assuming half the loan is paid off at half the term.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Mortgages, auto loans, business loans',
            content: 'Most amortising loans.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Build a tiny amortisation',
            content:
              '$50k loan at 6% for 5 years; first 6 months. Verify M1 ≈ $966.64.',
            answerKey:
              'Monthly rate 0.5%; n=60; payment ≈$966.64. M1 interest $50,000×0.005=$250; principal $716.64; balance $49,283.36. M2 interest $246.42; principal $720.22 — interest share falls each month as scheduled.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 12.3 summary',
            title: 'Front-loaded interest, back-loaded principal',
            content: 'Early prepayments powerful; late mild.',
          },
        ],
      },
      {
        lessonNumber: '12.4',
        title: 'Investment Analysis: NPV, IRR, and Lease vs Buy',
        estimatedMinutes: 35,
        learnerGoal:
          'Compute net present value (NPV) of a project at a learner level, interpret internal rate of return (IRR), and apply both to a lease-vs-buy decision.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'NPV',
            title: 'Discount each year, sum, subtract investment',
            content:
              'Net present value adds up all future cash flows, each discounted to today, and subtracts the upfront investment. Formula: NPV = Σ (CF_t ÷ (1 + r)^t) for t = 1..n, minus the initial investment at t = 0. If NPV > 0 the project creates value above your discount rate; if NPV < 0 it destroys value relative to that rate. Pick a discount rate that reflects the riskiness and opportunity cost of the cash flows — long-term safe ≈ 5–7%; corporate hurdle rate ≈ 10–15%.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'IRR',
            title: 'The discount rate where NPV = 0',
            content:
              'Internal rate of return is the discount rate at which NPV equals zero — the project\'s effective annualised return. Decision rule: invest if IRR > cost of capital; reject if IRR < cost of capital. IRR is interpretable ("this project earns ~12%/year"), but it can mislead with non-conventional cash flows or mutually exclusive projects of different scale. Use it alongside NPV, not instead of it.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 1 — NPV',
            title: 'Equipment with steady 5-year cash flows',
            content:
              'Given: investment $100,000 today; cash flow $30,000/yr for 5 years; discount rate 8%.\n\nFormula: NPV = Σ CF_t ÷ (1.08)^t − 100,000.\n\nEstimate: at 8%, the present-value-annuity factor for 5 yr is ≈ 4.0; so PV of inflows ≈ 30,000 × 4 = 120,000; NPV ≈ 20,000.\n\nCalculate: PV factor for 5-yr annuity at 8% = (1 − 1.08^(−5)) ÷ 0.08 = (1 − 0.6806) ÷ 0.08 = 0.3194 ÷ 0.08 = 3.9927. PV of inflows = 30,000 × 3.9927 = 119,782. NPV = 119,782 − 100,000 = 19,782.\n\nAnswer: NPV ≈ +$19,782 → accept.\n\nReasonableness: 19,782 vs $20,000 estimate → 1% gap. Accept. The project creates ~$19.8k of value beyond its 8% hurdle.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 2 — Lease vs buy with NPV',
            title: 'Five-year equipment decision',
            content:
              'Given: option A buy now for $50,000, opex $3,000/yr, salvage $5,000 at year 5. Option B lease for $12,000/yr (operating costs included). Discount rate 8%.\n\nFormula: compute PV of cash outflows for each option.\n\nBuy: upfront 50,000 + PV of 3,000/yr × 5 yr − PV of 5,000 salvage in year 5. PV factor 3.9927 from worked example 1; 1.08^5 = 1.4693. PV opex = 3,000 × 3.9927 = 11,978. PV salvage = 5,000 ÷ 1.4693 = 3,403. PV(buy) = 50,000 + 11,978 − 3,403 = 58,575.\n\nLease: PV of 12,000/yr × 5 yr = 12,000 × 3.9927 = 47,912.\n\nAnswer: lease costs $47,912 in PV; buy costs $58,575 in PV. Lease is cheaper by $10,663.\n\nReasonableness: 5 years × 12,000 lease = $60,000 nominal vs $50,000 buy + $15,000 opex − $5,000 salvage = $60,000 nominal — almost identical undiscounted. Discounting tilts toward lease because lease pays later in nominal terms. If you keep the asset >5 years, buy can win.',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice',
            title: 'Run a 5-year NPV with non-uniform cash flows',
            content:
              'Goal: a $80,000 equipment investment generates the following cash flows: year 1 $20,000; year 2 $25,000; year 3 $25,000; year 4 $20,000; year 5 $15,000. Discount rate 10%.\n\nStep 1 — Discount each year:\nYear 1: 20,000 ÷ 1.10 = 18,182\nYear 2: 25,000 ÷ 1.21 = 20,661\nYear 3: 25,000 ÷ 1.331 = 18,783\nYear 4: 20,000 ÷ 1.4641 = 13,660\nYear 5: 15,000 ÷ 1.6105 = 9,314\n\nStep 2 — Sum PV inflows: 18,182 + 20,661 + 18,783 + 13,660 + 9,314 = 80,600.\n\nStep 3 — NPV = 80,600 − 80,000 = +$600. Just barely positive.\n\nStep 4 — Verify with IRR intuition: NPV ≈ 0 at the discount rate ≈ 10.2%. So IRR is just above hurdle — accept, but the project has thin safety margin. A 1-percentage-point hurdle increase flips the verdict.',
            learnerTask:
              'Run an NPV for: investment $120,000; cash flows year 1 $30,000, year 2 $35,000, year 3 $40,000, year 4 $35,000, year 5 $25,000; discount rate 12%. Show every year, the sum, and your accept/reject verdict with one caveat.',
            answerKey:
              'Year 1: 30,000 ÷ 1.12 = 26,786. Year 2: 35,000 ÷ 1.2544 = 27,902. Year 3: 40,000 ÷ 1.4049 = 28,471. Year 4: 35,000 ÷ 1.5735 = 22,243. Year 5: 25,000 ÷ 1.7623 = 14,186. Sum PV = 119,588. NPV = 119,588 − 120,000 = −$412. Verdict: reject at 12% (NPV ≈ 0 → IRR ≈ 11.95% < hurdle). Caveat: very close to break-even — sensitivity-test by reducing year 1 cash by 10% and verify; consider whether non-financial value (strategic positioning, customer retention) tips the call. Otherwise pass.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'NPV vs cost of capital',
            content:
              'A project has IRR = 8% and the company\'s cost of capital is 10%. Decision: reject — the project earns less than the cost of the money required to fund it. Same project at a 7% cost of capital would be accepted.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Investment-analysis traps',
            content:
              'Picking a discount rate too low (overstates NPV); ignoring tax effects on cash flow; forgetting working-capital changes; using IRR alone on mutually exclusive projects of different scale (NPV is the tie-breaker); failing to sensitivity-test cash-flow assumptions when NPV is near zero.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Capital budgeting, M&A, real estate',
            content:
              'Boards approve capex on positive NPV / IRR > hurdle. M&A deals model target cash flows with WACC discount. Real estate uses NPV to compare buy-vs-rent and rental cap rate. Verify rates and tax assumptions with the appropriate professional before committing capital.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Two NPV reps',
            content:
              '(1) $100k project, $25k/yr cash for 6 years at 9% discount. Compute NPV. State invest decision if cost of capital is 12%.\n(2) Lease A: $14k/yr × 4 yr; Buy B: $45k upfront + $2.5k opex/yr − $4k salvage at year 4; discount 8%. Compute PV of each and pick.',
            answerKey:
              '(1) Annuity factor at 9% for 6 yr = (1 − 1.09^(−6)) ÷ 0.09 = 4.4859. PV inflows = 25,000 × 4.4859 = 112,148. NPV at 9% = 112,148 − 100,000 = +$12,148 → accept at 9%. At 12%: factor = (1 − 1.12^(−6)) ÷ 0.12 = 4.1114; PV = 25,000 × 4.1114 = 102,785; NPV = +$2,785 → accept barely. Sensitivity-test the cash flows.\n(2) Lease A: factor at 8% × 4 yr = 3.3121; PV = 14,000 × 3.3121 = $46,370. Buy B: 45,000 + 2,500 × 3.3121 − 4,000 ÷ 1.08^4 = 45,000 + 8,280 − 2,940 = $50,340. Pick lease A — cheaper by $3,970 in PV terms over 4 years. Verify if the asset is needed past year 4; longer hold tilts toward buy.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 12.4 summary',
            title: 'Discount future cash, then decide',
            content:
              'Use NPV as your primary decision metric and IRR as a sanity-check on returns. Always sensitivity-test when NPV is close to zero — small assumption changes can flip the call.',
          },
        ],
      },
      {
        lessonNumber: '12.5',
        title: 'Working Capital, Leverage, and Valuation Basics',
        estimatedMinutes: 30,
        learnerGoal: 'Read working-capital, current ratio, D/E, TIE, and basic valuation lenses.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Working capital',
            title: 'Short-term financial buffer',
            content: 'WC = current assets − current liabilities. Current ratio ≥ 1.5 healthy.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Leverage',
            title: 'D/E and TIE',
            content: 'D/E = total debt ÷ equity. TIE = EBIT ÷ interest. > 3 healthy.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Valuation lenses',
            title: 'Multiples and DCF',
            content: 'Earnings multiple, revenue multiple, DCF.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 1 — Small business snapshot',
            title: 'Five ratios from one balance sheet',
            content:
              'Given: a small business has current assets $200k, current liabilities $120k, total debt $300k, equity $500k, EBIT $90k, interest expense $20k, annual earnings $120k.\n\nFormulas: WC = CA − CL; current ratio = CA ÷ CL; D/E = debt ÷ equity; TIE = EBIT ÷ interest; earnings multiple valuation = earnings × multiple.\n\nWorking capital: 200,000 − 120,000 = $80,000 cushion.\nCurrent ratio: 200,000 ÷ 120,000 = 1.67 (healthy: ≥1.5).\nD/E: 300,000 ÷ 500,000 = 0.6 (moderate: under 1.0).\nTIE: 90,000 ÷ 20,000 = 4.5 (healthy: above 3.0).\nValuation: earnings × industry multiple. At 5× (typical small private business): 120,000 × 5 = $600k. At 4×: $480k. At 6×: $720k.\n\nReasonableness: current ratio 1.67, D/E 0.6, TIE 4.5 all in healthy bands → loan application would likely succeed; valuation in $480k-$720k range gives a defensible asking price for sale.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 2 — Stress test the same business',
            title: 'What happens if EBIT halves?',
            content:
              'Given: same business, but EBIT drops from $90k to $45k (50% earnings stress test).\n\nNew TIE: 45,000 ÷ 20,000 = 2.25 (was 4.5; now slightly below the healthy 3.0 threshold).\n\nNew valuation impact: if earnings track EBIT, earnings drop to $60k. At 5× multiple: 60,000 × 5 = $300k (was $600k — half).\n\nLoan implication: TIE 2.25 makes lenders nervous; they may require additional collateral or a higher interest rate.\n\nWorking capital and current ratio unchanged (those depend on the balance sheet, not on EBIT).\n\nAnswer: profitability stress halves valuation but doesn\'t directly hit liquidity ratios.\n\nReasonableness: ratios that depend on flow (EBIT, earnings) move with profitability; ratios that depend on stock (CA, CL, debt, equity) don\'t move with a single year\'s EBIT change. Always run a stress test before assuming today\'s ratios persist.',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice',
            title: 'Diagnose a struggling business from three ratios',
            content:
              'Goal: a business shows current ratio 0.9, D/E 1.8, TIE 1.4. Diagnose the health and recommend three actions.\n\nStep 1 — Liquidity: current ratio 0.9 means current liabilities exceed current assets — immediate cash crunch risk. Below the 1.5 healthy floor.\n\nStep 2 — Leverage: D/E 1.8 means $1.80 of debt for every $1 of equity — heavily leveraged. Above 1.0 is risky for most industries.\n\nStep 3 — Coverage: TIE 1.4 means EBIT covers interest only 1.4 times — very thin. Healthy is ≥3.\n\nDiagnosis: triple stress — cannot pay short-term bills, owes too much, barely earning enough to cover interest. Without intervention, this business is on a path to default within 12 months.\n\nRecommended actions:\n(1) Liquidity: collect outstanding receivables aggressively; defer non-essential capex; negotiate vendor payment extensions to lift current ratio above 1.0 in 60 days.\n(2) Leverage: do not take on new debt; explore refinancing existing debt to a longer term to lower interest expense.\n(3) Earnings: review pricing and cost structure to lift EBIT — even a 20% improvement bumps TIE from 1.4 to 1.7, buying time.\n\nReasonableness: actions are prioritised by urgency. Liquidity in days, leverage in months, earnings in quarters. Strong recommendation always names the time horizon.',
            learnerTask:
              'A business has current ratio 2.5, D/E 0.3, TIE 8.0. Diagnose its health and identify two strategic moves it could make. State whether the picture is too conservative, just right, or aggressive.',
            answerKey:
              'Liquidity 2.5: above healthy 1.5 — comfortable cash cushion; possibly excess (cash earning nothing). D/E 0.3: low leverage — under-using debt as a financing tool when borrowing is cheap. TIE 8.0: very strong; significant earnings buffer over interest. Diagnosis: too conservative. Strategic moves: (1) deploy excess cash — invest in growth, R&D, equipment, or pay a dividend; (2) consider modest debt to fund expansion — at TIE 8, the business can comfortably take on 2× current debt without crossing the danger zone. The picture is too conservative; the business is leaving growth on the table.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Read these ratios',
            content:
              'Current ratio 0.9 (below 1) + TIE 1.4 (well below 3) → thin liquidity AND tight interest coverage. The business cannot easily pay short-term bills AND has barely enough earnings to cover the interest on its debt. High default risk.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Ratio traps',
            content: 'Comparing across very different industries.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Loans, M&A, board reviews',
            content: 'Loan applications include current and quick ratios.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Three ratio reads',
            content:
              '(1) CA $400k, CL $250k. (2) Debt $600k, equity $400k. (3) EBIT $200k, interest $40k.',
            answerKey: '$150k; 1.6; 1.5; 5.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 12.5 summary',
            title: 'Liquidity, leverage, value',
            content: 'Three ratio families read together.',
          },
        ],
      },
    ],
    practiceLab: {
      title: 'Module 12 Practice Lab — Capital Decision',
      durationMinutes: 45,
      learnerGoal:
        'Apply depreciation, TVM, amortisation, NPV, and ratio analysis to one capital decision.',
      scenarios: [
        {
          id: 'm12-lab-1',
          prompt:
            '$80k machine, $5k salvage, 5 yr, 100,000 expected units, 25k Y1. SL annual / DDB Y1 / units Y1.',
          answerKey: '$15,000 / $32,000 / $18,750.',
        },
        {
          id: 'm12-lab-2',
          prompt: 'FV of $25,000 at 6% over 8 years.',
          answerKey: '≈$39,846.',
        },
        {
          id: 'm12-lab-3',
          prompt:
            'First 3 months of amortisation: $100k at 6% for 10 yr.',
          answerKey:
            'Payment ≈ $1,110.21. M1: int $500, prin $610.21, bal $99,389.79. Continue.',
        },
        {
          id: 'm12-lab-4',
          prompt: 'NPV $100k project, $25k/yr × 6 yr at 9%.',
          answerKey: 'PV ≈ $112,148; NPV ≈ $12,148.',
        },
        {
          id: 'm12-lab-5',
          prompt:
            'CA $400k, CL $250k; debt $600k, equity $400k; EBIT $200k, interest $40k. WC, current, D/E, TIE; comment.',
          answerKey: 'WC $150k; 1.6; 1.5 (moderate-high); 5 (healthy).',
        },
      ],
    },
    moduleQuiz: [
      {
        id: 'm12-q1',
        question: '$50k − $5k salvage, 10 yr. SL annual?',
        type: 'calculation',
        correctAnswer: '$4,500',
        explanation: '$45,000 / 10.',
        relatedLesson: '12.1',
        difficulty: 'easy',
      },
      {
        id: 'm12-q2',
        question: 'DDB on $100k, 5 yr life. Y2?',
        type: 'calculation',
        correctAnswer: '$24,000',
        explanation: '40% × $60k.',
        relatedLesson: '12.1',
        difficulty: 'medium',
      },
      {
        id: 'm12-q3',
        question: 'FV of $10k at 6% for 5 yr.',
        type: 'calculation',
        correctAnswer: '≈$13,382',
        explanation: '$10k × 1.06⁵.',
        relatedLesson: '12.2',
        difficulty: 'medium',
      },
      {
        id: 'm12-q4',
        question: 'PV of $50k in 10 yr at 7%.',
        type: 'calculation',
        correctAnswer: '≈$25,418',
        explanation: '$50k / 1.07¹⁰.',
        relatedLesson: '12.2',
        difficulty: 'medium',
      },
      {
        id: 'm12-q5',
        question: 'FV annuity $5k/yr at 6% for 10 yr.',
        type: 'calculation',
        correctAnswer: '≈$65,900',
        explanation: '$5k × 13.18.',
        relatedLesson: '12.2',
        difficulty: 'hard',
      },
      {
        id: 'm12-q6',
        question: '30-yr fixed mortgage early payments are mostly:',
        type: 'scenario',
        options: [
          'Principal',
          'Interest',
          'Equal halves',
          'Cannot tell without amount',
        ],
        correctAnswer: 'Interest',
        explanation: 'Interest is on current balance, highest at start.',
        relatedLesson: '12.3',
        difficulty: 'medium',
      },
      {
        id: 'm12-q7',
        question:
          'Project IRR 8%, cost of capital 10%. Accept?',
        type: 'scenario',
        options: ['Yes — IRR positive.', 'No — IRR < cost of capital.', 'Yes — only NPV matters.', 'Cannot tell.'],
        correctAnswer: 'No — IRR < cost of capital.',
        explanation: 'IRR below hurdle.',
        relatedLesson: '12.4',
        difficulty: 'hard',
      },
      {
        id: 'm12-q8',
        question:
          'NPV $100k project, $25k/yr × 6 yr at 9%.',
        type: 'scenario',
        options: ['≈ −$13k', '≈ +$12k', '≈ $0', '≈ +$50k'],
        correctAnswer: '≈ +$12k',
        explanation: 'PV ≈ $112,148; NPV ≈ $12,148.',
        relatedLesson: '12.4',
        difficulty: 'hard',
      },
      {
        id: 'm12-q9',
        question: 'CA $400k, CL $250k. WC and current ratio?',
        type: 'calculation',
        correctAnswer: '$150k; 1.6',
        explanation: '$400 − $250; $400/$250.',
        relatedLesson: '12.5',
        difficulty: 'medium',
      },
      {
        id: 'm12-q10',
        question:
          'Debt $600k, equity $400k, EBIT $200k, interest $40k. D/E and TIE?',
        type: 'calculation',
        correctAnswer: 'D/E 1.5; TIE 5.0',
        explanation: '$600/$400; $200/$40.',
        relatedLesson: '12.5',
        difficulty: 'medium',
      },
    ],
    moduleSummary:
      'You can compute depreciation three ways, work with PV/FV/annuities, build amortisation schedules, evaluate investments using NPV and IRR, and read working-capital, leverage, and valuation ratios.',
    completionChecklist: [
      'I can choose between SL, DDB, and units of production.',
      'I can compute FV, PV, and annuity values.',
      'I can build an amortisation schedule and explain principal/interest.',
      'I can compute NPV and explain accept/reject vs cost of capital.',
      'I can read WC, current, D/E, TIE.',
    ],
  },
]
