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
    durationMinutes: 180,
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
        learnerGoal: 'Compute three averages, choose the right one, and use weighted averages.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Three averages, three jobs',
            title: 'Mean, median, mode',
            content: 'Mean uses every value; median ignores extremes; mode reports most frequent.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'Outliers skew the mean',
            content: 'Salaries $40k, $42k, $43k, $45k, $200k. Mean $74k, median $43k.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Choose the right average',
            title: 'When to use each',
            content:
              'Mean for symmetric data. Median for skewed (income, prices). Mode for categorical or repeating.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Weighted average',
            title: 'When some items count more',
            content:
              'Assignments 30%×85, midterm 30%×78, final 40%×92 → 25.5+23.4+36.8=85.7.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Three averages on one dataset',
            content: '78, 82, 85, 85, 88, 90, 92. Mean ≈85.7; median 85; mode 85.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Average traps',
            content: 'Reporting mean on skewed data. Forgetting weights when items not equal.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'HR, real estate, education, surveys',
            content: 'HR reports median salary; real estate reports median price.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Three problems',
            content:
              '(1) Mean and median of $40k, $42k, $43k, $45k, $200k. (2) Weighted grade. (3) Mode of 7,8,8,8,9,9,10,11.',
            answerKey: '(1) Mean $74k, median $43k. (2) 85.7. (3) 8.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 9.2 summary',
            title: 'Pick the average that fits',
            content: 'Mean symmetric; median skewed; mode categorical.',
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
              '+2 pp, +50%; 25%; sample size, who, how phrased.',
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
            eyebrow: 'Worked example',
            title: 'Region performance recommendation',
            content:
              'Q: shift marketing to West? F: West $620k vs next $550k; growth 12% vs co. avg 6%. R: shift 15% next quarter, monthly KPIs. C: data 2 quarters; West may be one-off.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Sanity checks before sending',
            title: 'Five quick questions',
            content:
              'Right average? Consistent denominators? Outliers flagged? Pp vs % distinguished? Action specific?',
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
    durationMinutes: 165,
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
            eyebrow: 'Worked example',
            title: 'Writing a report',
            content: 'Best 2, likely 3, worst 5. (2 + 12 + 5) ÷ 6 ≈ 3.17 → 3.25 h.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Decompose and buffer',
            title: 'Break into subtasks; add 15–25% buffer',
            content: '6 h × 1.20 = 7.2 h. Plan 7–8 hours.',
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
            eyebrow: 'Worked example',
            title: 'A four-task project',
            content: 'A(4) → B(6, after A) → D(5, after B and C). C(3) parallel. Critical path 15 h.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Slack',
            title: 'Time you can spend without affecting deadline',
            content: 'C has 3 h of slack vs B in the example.',
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
    durationMinutes: 180,
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
        learnerGoal: 'Build a comprehensive project budget.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Budget anatomy',
            title: 'Labour, direct, overhead, contingency',
            content: 'Total = sum of four families.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'Marketing campaign budget',
            content:
              'Labour $13,550. Direct $11,500. Media $30,000. Overhead 15% × labour = $2,032.50. Contingency 10% = $5,708. Total ≈$63,000.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Risk-based contingency',
            title: 'Tier the contingency',
            content: 'Low-risk 5%; medium 10%; high 20%.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Allocation',
            title: 'Percentage-based plan',
            content: 'Labour 40%, materials 25%, equipment 15%, overhead 10%, contingency 10% = 100%.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'One contingency calculation',
            content:
              '$30k×5% + $15k×10% + $5k×20% = $4,000 (8% of $50k base).',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Budget traps',
            content: 'Forgetting overhead or contingency.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Quotes, grant proposals, capex',
            content: 'Client quotes need clear lines.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Build a real budget',
            content: 'Take a real project; build four-family budget; tiered contingency.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 11.2 summary',
            title: 'Four families, two safety nets',
            content: 'Labour, direct, overhead, contingency. Plus risk tiering.',
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
            eyebrow: 'Worked example',
            title: 'Resource levelling',
            content:
              'Wks: 200, 150, 300, 100; capacity 200. Move 50 from Wk3 to Wk2 and 50 to Wk4 → 200/200/200/150.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Material planning',
            title: 'Build of materials × quantity, with safety stock',
            content: 'Reorder = average daily × lead-time + buffer.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Spot the overload',
            content:
              'Schedule 200/200/280/100 vs 200/wk capacity. Wk3 is 80 over; move 50 to Wk4, accept 30 OT, or contractor.',
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
    durationMinutes: 180,
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
        learnerGoal: 'Compute depreciation three ways.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Why depreciation exists',
            title: 'Spreading the cost over useful life',
            content: 'Match expense to benefit.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Straight-line',
            title: 'Simplest method',
            content:
              '$50k − $5k salvage = $45k. ÷ 10 yr = $4,500/yr.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Double-declining balance',
            title: 'Accelerated',
            content:
              '$100k, 5 yr life. Rate 40%. Y1 $40k → BV $60k. Y2 $24k → BV $36k. Continue; never below salvage.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Units of production',
            title: 'Tied to actual usage',
            content:
              '$80k − $5k = $75k ÷ 150,000 units = $0.50/unit. Y1 35,000 × $0.50 = $17,500.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Pick the method',
            content:
              'Office furniture (7 yr) → SL. Truck → DDB. Press → units of production.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Depreciation traps',
            content: 'Forgetting salvage value.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Capex decisions and tax filings',
            content: 'Capex requests use depreciation.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Three depreciation problems',
            content:
              '(1) SL $30k − $3k, 6 yr. (2) DDB $50k 5 yr Y2. (3) Units: $40k − $4k, 100k units, 25k Y1.',
            answerKey: '$4,500; $12,000; $9,000.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 12.1 summary',
            title: 'Three honest stories about one asset',
            content: 'Choose method that matches how the asset loses value.',
          },
        ],
      },
      {
        lessonNumber: '12.2',
        title: 'Time Value of Money: PV, FV, and Annuities',
        estimatedMinutes: 35,
        learnerGoal: 'Compute PV, FV, and annuity values.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'TVM',
            title: 'A dollar today is worth more than a dollar later',
            content: 'Discount rate = alternative return.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Future value',
            title: '$10,000 at 6% for 5 years',
            content: '$10,000 × 1.06⁵ ≈ $13,382.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Present value',
            title: '$50,000 in 10 years at 7%',
            content: '$50,000 ÷ 1.07¹⁰ ≈ $25,418.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Annuity',
            title: 'FV of equal payments',
            content:
              '$5k/yr at 6% for 10 yr: $5k × ((1.06¹⁰ − 1)/0.06) ≈ $65,900.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'One PV calculation',
            content:
              "$20,000 in 8 years at 5%: $20,000 ÷ 1.05⁸ ≈ $13,536.",
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'TVM traps',
            content: 'Wrong rate for the period.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Retirement, leases, capital decisions',
            content: 'Retirement projections use FV of annuities.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Three TVM problems',
            content:
              '(1) FV $5k at 6% for 10 yr. (2) PV $30k in 6 yr at 4%. (3) FV $2k/yr at 5% for 15 yr.',
            answerKey: '≈$8,954; ≈$23,710; ≈$43,158.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 12.2 summary',
            title: 'TVM is the gateway',
            content: 'Right rate, right formula, right shape.',
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
            eyebrow: 'Worked example',
            title: '$200k mortgage at 5% for 30 yr',
            content:
              'r = 0.4167%; n = 360. Payment ≈ $1,073.64. M1: int $833.33, prin $240.31, bal $199,759.69.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Total interest',
            title: 'Pay attention to total cost',
            content: 'Total ≈ $386,510. Interest ≈ $186,510.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Early payoff',
            title: 'Where extra payments hit hardest',
            content: 'Early extra payments shorten 5–8 years on a 30-year mortgage.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Read the schedule',
            content:
              'On $200k/5%/30yr, principal portion exceeds interest around month ~196.',
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
        learnerGoal: 'Compute NPV at learner level, interpret IRR, apply both to lease-vs-buy.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'NPV',
            title: 'Discount each year, sum, subtract investment',
            content: 'NPV > 0 = creates value above discount rate.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'Equipment with 5-year cash flows',
            content:
              'Cost $100k. CF $30k/yr. Discount 8%. PV ≈ $119,782. NPV ≈ $19,782.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'IRR',
            title: 'Discount rate where NPV = 0',
            content: 'IRR > cost of capital → creates value.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'Lease vs buy with NPV',
            content:
              'Buy $50k + opex − salvage; Lease $12k/yr × 5. PV lease ≈ $50.5k; PV buy ≈ $63.6k.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'NPV vs cost of capital',
            content: "Cost of capital 10%, IRR 8% → reject (IRR < hurdle).",
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Investment-analysis traps',
            content: 'Discount rate too low overstates NPV.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Capital budgeting, M&A, real estate',
            content: 'Boards approve capex by NPV.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Run one NPV',
            content:
              '$100k project, $25k/yr × 6 yr at 9%. State invest decision at 12% cost of capital.',
            answerKey: 'PV ≈ $112,128; NPV ≈ $12,128. At 12%, recompute — closer to break-even.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 12.4 summary',
            title: 'Discount future cash, then decide',
            content: 'Use both NPV and IRR; accept above your cost of capital.',
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
            eyebrow: 'Worked example',
            title: 'Small business snapshot',
            content:
              'CA $200k, CL $120k → WC $80k, current 1.67. Debt $300k, equity $500k → D/E 0.6. EBIT $90k, interest $20k → TIE 4.5. Earnings $120k × 5 multiple ≈ $600k.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Read these ratios',
            content: 'Current 0.9 + TIE 1.4 → thin liquidity and tight coverage.',
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
