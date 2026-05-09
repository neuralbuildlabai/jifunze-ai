/**
 * Practical Mathematics — Modules 1–4 (foundations).
 * Internal split for readability; all modules combined in `practicalMathematicsCourse.ts`.
 */

import type { StandaloneCourseModule } from './practicalMathematicsCourseTypes'

export const PRACTICAL_MATH_MODULES_01_04: StandaloneCourseModule[] = [
  // ============================================================
  // MODULE 1 — Math Confidence and Number Sense
  // ============================================================
  {
    moduleNumber: 1,
    slug: 'math-confidence-number-sense',
    title: 'Math Confidence and Number Sense',
    durationMinutes: 150,
    level: 'Foundational',
    prerequisites: [],
    overview:
      'This opening module helps you reset your relationship with numbers. You name what math anxiety actually feels like in adult life, build a working growth mindset, develop number sense for money, time, and quantities you actually deal with, and learn the mental-math and verification habits that make every later module easier. By the end you have a personal math toolkit, a small set of estimation moves you can use in real situations, and a checklist that catches the most common calculation mistakes.',
    whyThisMatters: [
      'Confidence with numbers is the difference between guessing in important moments and deciding clearly.',
      'Real-world math rewards accuracy and verification — not speed alone.',
      'Strong number sense protects you from sales tricks, billing errors, and bad estimates.',
      'Mental math and rounding let you sanity-check anything a calculator or spreadsheet hands you.',
      'Every module that follows assumes the verification habits you build here.',
    ],
    learningObjectives: [
      'Name your math anxiety triggers and replace them with a growth-mindset response',
      'Distinguish school math from real-world math and choose the right tool for each task',
      'Estimate amounts, totals, and percentages quickly with simple mental-math moves',
      'Verify calculator and spreadsheet results using estimation and inverse operations',
      'Recognise the five most common calculation errors and prevent them with a short checklist',
    ],
    lessons: [
      {
        lessonNumber: '1.1',
        title: 'Building Math Confidence',
        estimatedMinutes: 35,
        learnerGoal:
          'Use a repeatable estimate → calculate → verify habit and a small written toolkit so you can work numbers calmly and accurately.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'What this means',
            title: 'Anxiety signals risk — reduce it with process',
            content:
              'When stakes feel high, write one estimate before you touch a calculator. That single line tells you if the final answer is in the right neighbourhood.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Rule',
            title: 'Estimate → calculate → verify',
            content:
              'Let E be your estimate and C your calculated value. If |C − E| is huge relative to |E| (when E ≠ 0), assume a wrong unit, misplaced decimal, or wrong operation until proven otherwise.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 1',
            title: 'Subtotal check (two items)',
            content:
              'Given: two grocery items at KES 480 and KES 720.\n\nFormula: total T = A + B.\n\nEstimate: round to nearest 100 → 500 + 700 = 1,200. Final answer should land near 1,200.\n\nSubstitute: T = 480 + 720.\n\nCalculate: T = 1,200.\n\nAnswer: T = KES 1,200; a wallet with KES 1,250 is enough.\n\nReasonableness check: estimate 1,200 matches the calculated 1,200 exactly — confidence is high. If the calculator had shown 12,000, the estimate would have caught a missing decimal or extra zero.',
            examples: [
              'Mental: grocery running totals, tips, change owed.',
              'Written + calculator: invoices with tax lines.',
            ],
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 2',
            title: 'Invoice multiplication sanity check',
            content:
              'Given: 18 hours of consulting at $42/hour, plus a flat $35 setup fee.\n\nFormula: invoice total I = (hours × rate) + setup.\n\nEstimate: 20 × 40 = 800; plus 35 ≈ 835. Final answer should land near 800–850.\n\nSubstitute: I = (18 × 42) + 35.\n\nCalculate: 18 × 42 = (18 × 40) + (18 × 2) = 720 + 36 = 756. Then 756 + 35 = 791.\n\nAnswer: I = $791.\n\nReasonableness check: 791 is inside the 800–850 estimate band (within ~7% of the rounded value). If the calculator had shown 7,910 or 79.10, the estimate would have flagged a decimal-place error before sending the invoice.',
            examples: [
              'Use this for any “rate × quantity + fee” line: hourly billing, freelance work, materials + delivery.',
              'When the estimate and calculation differ by more than ~10%, recheck the numbers before you commit.',
            ],
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice',
            title: 'Estimate first, calculate second',
            content:
              'Walk this in three steps for a small purchase total of 6 items at $7.85 each, plus 8% sales tax.\n\nStep 1 — Estimate: round 7.85 ≈ 8; 6 × 8 = 48 subtotal; tax ≈ 10% of 48 = 4.80, then trim a bit since real tax is 8% not 10% → ≈ 4. Final estimate ≈ 48 + 4 = 52.\n\nStep 2 — Calculate exactly: subtotal = 6 × 7.85 = 47.10. Tax = 47.10 × 0.08 = 3.768 ≈ 3.77. Total = 47.10 + 3.77 = 50.87.\n\nStep 3 — Verify: 50.87 vs estimate 52. Difference is 1.13, about 2.2% of the estimate — well inside the “within 10%” band. Accept the answer.',
            learnerTask:
              'Re-do this with your own example: pick a quantity, a unit price, and a tax rate. Write the estimate line, the calculation line, and a one-sentence reasonableness verdict.',
            answerKey:
              'Sample: 4 items at $12.50 each plus 7% tax. Estimate: 4 × 13 = 52; tax ≈ 7% of 52 ≈ 3.50; total ≈ 55–56. Calculate: 4 × 12.50 = 50.00; tax = 50.00 × 0.07 = 3.50; total = 53.50. Verdict: 53.50 is within 5% of estimate 55 → accept. Strong answers always show all three lines (estimate / calculate / verify) and name the percentage gap, not just the absolute difference.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Quick check 1',
            title: 'Multiply estimate',
            content:
              'Estimate 37 × 22 in one line (hint: 40 × 20 = 800). Then compute 37 × 22 = 814. Does the estimate land near 814? Difference 14 / 800 ≈ 1.75% — well inside band, accept.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Quick check 2',
            title: 'Decimal-place trap',
            content:
              'A calculator shows 0.0782 for the cost of one paperclip when you expected ~$0.08. Estimate first: a box of 100 clips at $7.99 → per-clip ≈ 8 cents = $0.08. Calculator: 7.99 / 100 = 0.0799. The display 0.0782 is close but off — likely a typo. Re-enter and confirm. The verify habit caught a wrong digit, not a wrong method.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Common mistakes',
            title: 'What trips adults up',
            content:
              'Skipping the estimate line and trusting whatever the calculator displays; rounding every intermediate step instead of keeping precision until the end; mixing units (per-item vs per-box, hours vs minutes); copying a partial number from a screen and missing a decimal or trailing digit.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Real-world use',
            title: 'Where this shows up',
            content:
              'Quotes, invoices, payslips, receipts, expense reports, contractor bids, and lab schedules all reward the same three-step habit. Anywhere a wrong number costs you time or money, the estimate line is your insurance.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Verify a small receipt or quote',
            content:
              'Pick a real receipt, invoice, or quote from this week. Cover the total with your finger. (1) Write a one-line estimate using rounded numbers. (2) Compute the exact total on paper or with a calculator. (3) Compare the two — is the calculated value within ~10% of your estimate? If yes, accept. If not, find the source of the gap (wrong unit, missed line, rounding, decimal-place error) and re-verify.',
            learnerTask:
              'Submit your three lines: estimate, calculation, verdict. Include the receipt total you were checking.',
            answerKey:
              'Sample done well: Receipt total shown $63.42. (1) Estimate: 4 items ≈ $15 each → 60; plus tax ≈ 5 → ≈ 65. (2) Calculate: 14.99 + 14.99 + 16.49 + 12.99 = 59.46; tax 8% = 4.76; total = 64.22. (3) Verdict: 64.22 is within 1.3% of my estimate 65, but the receipt shows 63.42 — gap is small but non-zero, so check whether one item was on sale (line item differs from listed price). The verify step caught a small discount the receipt did include.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson wrap-up',
            title: 'Lesson 1.1',
            content:
              'You now have a concrete verification habit (estimate → calculate → verify) plus a small written toolkit. Every later module assumes this habit; carry it forward into Lesson 1.2 on number sense and magnitude.',
          },
        ],
      },
      {
        lessonNumber: '1.2',
        title: 'Number Sense and Magnitude',
        estimatedMinutes: 35,
        learnerGoal:
          'Develop a feel for the size of numbers in money, measurements, and everyday contexts so you can spot when an answer is wildly off.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: "What 'number sense' really is",
            title: 'Knowing roughly what numbers mean',
            content:
              "Number sense is the felt understanding of how big or small a number is and how it relates to the situation. People with strong number sense rarely accept an answer that is off by a factor of ten — they notice. You build it by anchoring numbers to things you can picture: 25 students fit in a typical classroom; 1,000 people fit in a small concert venue; 1,000,000 is roughly the population of a mid-sized city; 1,000,000,000 (one billion) is one thousand of those cities.",
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Place value, contextually',
            title: 'Where the digits live',
            content:
              "In 1,234,567.89, the 1 is the millions digit, 234 sits in thousands, 567 is the units block, and 89 is hundredths. In money: $1 million, $234 thousand, $567, and 89 cents. In measurement: kilometres, hectometres, dekametres, metres, decimetres, centimetres. Every step left is ten times bigger; every step right is ten times smaller. If your answer is in the wrong place-value column, you are off by a factor of ten or a hundred — usually a decimal-point error.",
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'Comparing two prices in your head',
            content:
              "Compare $1,847 vs $1,923. Look at the highest place value where they differ: hundreds (8 vs 9). The second is larger. Round if it helps: $1,800 vs $1,900. The difference is about $100, or roughly 5% of the smaller amount. That single move — line up the place values, compare from the left, round if useful — works for almost any quick price or quantity comparison.",
            examples: [
              '$847 vs $1,234 → thousands digit: 0 vs 1, second is larger.',
              '$2.49/litre vs $2.62/litre → hundredths place: 49 vs 62, second is larger by about 13 cents per litre.',
              '8,000 vs 11,500 → thousands digit: 8 vs 11, second is roughly 1.4× the first.',
            ],
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Read these aloud',
            content:
              'Say each of these out loud the way you would in conversation: 1,234.56 dollars, 12,005 people, 1,500,000 shillings, 0.075. If any of them feels awkward, that is a clue to where your place-value reading needs practice.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Rounding for real life',
            title: 'Round to a level that matches the decision',
            content:
              'Round to the nearest dollar or shilling for casual estimates. Round to the nearest cent for invoices and receipts. Round to two decimal places for percentages in finance. Round to whatever your tool can actually measure for physical work. Rounding too early in a multi-step calculation is one of the most common adult mistakes; keep full precision while you calculate, and round once at the end.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Magnitude traps',
            content:
              "Confusing a thousand and a million in a hurry; reading 0.075 as 'seventy-five' instead of 'seven and a half hundredths'; trusting a long decimal answer because it looks precise; rounding too aggressively at the start of a calculation and getting nonsense at the end.",
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'From shopping to salary',
            content:
              'A grocery total of $48 is reasonable for ten items; $480 is not. A salary quote of $50,000 a year is roughly $24/hour at full time; $500/hour is suspicious. A bid of KES 1,200,000 vs KES 1,200 differs by a factor of one thousand and changes the conversation entirely. Magnitude awareness is a quiet, daily protection.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Five magnitude reads',
            content:
              "Pick five numbers from your week (a bill, an invoice, a paycheck line, a distance, a count). For each, write where the leading digit lives (ones, tens, hundreds, thousands, etc.) and a one-sentence comparison: 'about half of X' or 'roughly twice Y.'",
            answerKey:
              'Sample: $47.83 → tens place; about half of $100; roughly the cost of a full grocery basket for two.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 1.2 summary',
            title: 'Numbers have neighbourhoods',
            content:
              "Strong number sense is recognising where a number lives and what 'too big' and 'too small' look like in that situation.",
          },
        ],
      },
      {
        lessonNumber: '1.3',
        title: 'Mental Math Strategies',
        estimatedMinutes: 40,
        learnerGoal:
          'Use four reliable mental-math moves — decomposition, friendly numbers, doubling/halving, and quick percentages — for everyday calculations.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Why mental math still matters',
            title: 'Speed and confidence with small calculations',
            content:
              'Mental math is not a substitute for a calculator on important work — it is a sanity-check, a confidence-builder, and a way to make small decisions without slowing down. Four moves cover most adult situations: break numbers apart (decomposition), round to nearby friendly numbers (compensation), use doubling and halving for tricky multiplication, and use 10% as a stepping stone for any percentage.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Move 1 · Decomposition',
            title: 'Break the number into easier parts',
            content:
              '47 + 38 = (40 + 7) + (30 + 8) = (40 + 30) + (7 + 8) = 70 + 15 = 85. The trick is splitting at the place-value line so each part is easy to add. The same move works for subtraction (83 - 47 = 83 - 40 - 7 = 43 - 7 = 36) and multiplication (15 × 12 = 15 × 10 + 15 × 2 = 150 + 30 = 180).',
            examples: [
              '67 + 29 = 60 + 30 + 7 + (-1) = 96',
              '104 - 38 = 104 - 40 + 2 = 66',
              '12 × 14 = 12 × 10 + 12 × 4 = 120 + 48 = 168',
            ],
          },
          {
            type: 'worked_example',
            eyebrow: 'Move 2 · Friendly numbers',
            title: 'Round, calculate, then adjust',
            content:
              '47 + 38 — round to 50 + 40 = 90; you added 3 and 2 extra (5 total), so the real answer is 90 - 5 = 85. 19 × 5 — round to 20 × 5 = 100; you used one extra 5, so subtract 5: 95.',
            examples: [
              '98 + 47 ≈ 100 + 47 = 147; subtract 2 → 145.',
              '63 - 28 ≈ 63 - 30 = 33; add back 2 → 35.',
              '21 × 9 ≈ 21 × 10 = 210; subtract one 21 → 189.',
            ],
          },
          {
            type: 'worked_example',
            eyebrow: 'Move 3 · Doubling and halving',
            title: 'Make multiplication friendlier',
            content:
              'Double one factor and halve the other; the answer stays the same. 14 × 50 = 7 × 100 = 700. Practise on multiplications by 5, 25, and 50.',
            examples: ['16 × 25 = 8 × 50 = 4 × 100 = 400', '18 × 5 = 9 × 10 = 90', '22 × 50 = 11 × 100 = 1,100'],
          },
          {
            type: 'worked_example',
            eyebrow: 'Move 4 · 10% as a stepping stone',
            title: 'Build any percentage from 10%',
            content:
              '10% of any number = move the decimal one place left. From 10% you can build the rest: 5% half of 10%; 20% double 10%; 15% = 10% + 5%; 25% divide by 4; 50% divide by 2. Example: 18% tip on $73.25 — 10% is $7.33, doubled is $14.66, then trim about 2% (≈$1.50) to get roughly $13.20. The exact answer is $13.19.',
            examples: [
              '15% of $80: 10% = $8, 5% = $4, total $12.',
              '8% sales tax on $125: 10% = $12.50, subtract 2% ($2.50) → $10.',
              '20% off $45: 10% = $4.50, doubled is $9, sale price = $36.',
            ],
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Two quick mental moves',
            content:
              'Without writing anything down, find: (a) a 15% tip on $60, and (b) the sale price of an $80 item at 25% off. Confirm: $9; $60.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Where mental math breaks',
            content:
              'Trying to do too many steps in your head — write down the running total when it gets messy. Rounding both numbers in the same direction without adjusting (always track which way you rounded). Using mental math for high-stakes calculations where a small error costs real money.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Tips, tax, and quick comparisons',
            content:
              'Restaurant tipping, sales-tax estimates at the till, comparing the per-litre price of two fuel options, deciding whether a "buy 2 get 1 free" deal beats a 30% discount, sanity-checking a payslip line.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Five real mental-math problems',
            content:
              'From your day: estimate (1) tax on a $60 purchase at 8%, (2) a 20% tip on a $42 bill, (3) the per-unit cost of a 12-pack at $15.99, (4) a 30% discount on $120, (5) the difference in two prices: KES 2,490 vs KES 2,150.',
            answerKey:
              '(1) ≈$4.80; (2) ≈$8.40; (3) ≈$1.33/unit; (4) sale ≈$84; (5) difference ≈KES 340 (about 14% of the cheaper one).',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 1.3 summary',
            title: 'Four moves, every day',
            content:
              'Decompose, use friendly numbers, double/halve, and build from 10%. These four moves cover most everyday math and turn the calculator from a crutch into a verifier.',
          },
        ],
      },
      {
        lessonNumber: '1.4',
        title: 'Checking Your Work',
        estimatedMinutes: 40,
        learnerGoal:
          'Use estimation, inverse operations, and a short error checklist to catch the five most common adult calculation mistakes.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Why verification beats speed',
            title: 'Estimate, calculate, verify',
            content:
              'Three steps prevent most adult calculation errors: (1) before you reach for the calculator, write a one-line estimate; (2) calculate precisely; (3) compare your precise answer to your estimate. If the two disagree by more than a small margin, recalculate.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 1',
            title: 'An invoice line that fails the estimate test',
            content:
              'Given: invoice line "47 units × $23 each = $1,081".\n\nFormula: line total = quantity × unit price.\n\nEstimate: 50 × 20 = 1,000. The final answer should land near 1,000.\n\nSubstitute: 47 × 23.\n\nCalculate: 47 × 23 = (47 × 20) + (47 × 3) = 940 + 141 = 1,081.\n\nAnswer: $1,081, matching the invoice. Reasonableness: 1,081 is within 8% of the 1,000 estimate. Accept.\n\nReasonableness fail-mode: had the line read $10,810 or $108, the estimate would have flagged a 10× decimal-place error in five seconds.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 2',
            title: 'Inverse operation catches a typo',
            content:
              'Given: bookkeeper enters "salary $52,000/year ÷ 2,080 hours = $20/hour".\n\nFormula: hourly = annual ÷ 2,080.\n\nEstimate: 50,000 ÷ 2,000 = 25/hour. Final answer should be near $25.\n\nSubstitute and calculate: 52,000 ÷ 2,080 = 25.00.\n\nThe stated $20 fails the estimate (off by 25%). Run the inverse: 20 × 2,080 = 41,600 — not $52,000. The right answer: $25/hour. The bookkeeper used 2,600 hours by mistake.\n\nReasonableness rule: every multiplication should pass its inverse division and vice-versa. If both directions don\'t agree to within rounding, one of them has a typo.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Inverse operations',
            title: 'Run the calculation backwards',
            content:
              'Addition checks with subtraction. Multiplication checks with division. If 47 × 23 = 1,081, then 1,081 ÷ 23 should give 47. If 52,000 ÷ 2,080 = 25.00, then 25.00 × 2,080 should give 52,000. The inverse always reproduces the original input within rounding; if it doesn\'t, you have a typo, an order-of-operations slip, or a unit-of-measure mismatch.',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice',
            title: 'Verify three lines on a small business invoice',
            content:
              'A small invoice arrives. Verify each line in three steps: (1) one-line estimate, (2) precise calculation, (3) inverse-operation check.\n\nLine A — 8 hours × $115/hour = stated $920. Estimate: 10 × 100 = 1,000 → final near 900–1,000. Calculate: 8 × 115 = 920 ✓. Inverse: 920 ÷ 115 = 8 ✓.\n\nLine B — 12 cases × $34.50 = stated $414.00. Estimate: 12 × 35 = 420 → near 410–420. Calculate: 12 × 34.50 = 414 ✓. Inverse: 414 ÷ 12 = 34.50 ✓.\n\nLine C — Subtotal = 920 + 414 = stated $1,344. Tax 8% = stated $107.52. Total = stated $1,441.52. Estimate tax: 10% of 1,344 = 134.4; 8% ≈ 107 → near 107. Calculate: 1,344 × 0.08 = 107.52 ✓. Inverse on total: 1,441.52 − 107.52 = 1,334.00 — but subtotal was stated $1,344.00. Gap of $10. Recheck.\n\nVerification finds the inconsistency: the stated subtotal $1,344, stated tax $107.52, and stated total $1,441.52 don\'t reconcile. Total minus tax = 1,441.52 − 107.52 = $1,334.00, but the stated subtotal is $1,344.00 — a $10 gap. Either the subtotal is mis-summed (920 + 414 = $1,334, not $1,344), the tax was computed on the wrong base, or the printed total is off by $10. Recompute every line before paying. The inverse-operation check found what individual line checks missed.',
            learnerTask:
              'Take this stated invoice — quantity 14 × unit price $42.50 = $595, plus 9% tax stated at $53.55, total stated at $648.55. Run estimate, calculate, and inverse check on each line. State whether the invoice is consistent.',
            answerKey:
              'Line: 14 × 42.50. Estimate 14 × 40 = 560 → near 560–600. Calculate 14 × 42.50 = 595 ✓. Inverse 595 ÷ 14 = 42.50 ✓. Tax: 595 × 0.09 = 53.55 ✓. Total: 595 + 53.55 = 648.55 ✓. Inverse on total: 648.55 − 53.55 = 595 ✓. All three checks agree → invoice is consistent. Strong answers always run the inverse on at least one line; weak answers only check forward.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Five common adult errors',
            title: 'Memorise this list',
            content:
              '1) Decimal-point shifts (12.5 × 4 = 50, not 500). 2) Order of operations ignored (10 + 5 × 2 = 20, not 30). 3) Sign errors with negative numbers (-5 - (-3) = -2, not -8). 4) Unit confusion (2.5 hours = 150 minutes, not 25). 5) Rounding too early in a multi-step calculation.',
          },
          {
            type: 'concept_explanation',
            eyebrow: "Recognising 'this can't be right'",
            title: 'When the answer fails common sense',
            content:
              'Some mistakes show up not as a calculation error but as a result that cannot be true. A discount that produces a sale price higher than the original. A loan repayment lower than the principal alone. An hourly rate that implies $500/hour for an entry-level role. When the answer offends common sense, recheck which formula you used.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Three reasonableness checks',
            content:
              'Decide quickly whether each is reasonable: (a) MPG of 25 for a typical car driving 300 miles on 12 gallons; (b) hourly rate of $500 implied by a $50,000 annual salary; (c) sale price $90 after 25% off an original $120.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Common mistakes',
            title: 'Verification skips',
            content:
              'Checking only the final total (misses a duplicated line). Using gross pay in a budget line that should use net. Dividing in the wrong direction on unit price (total ÷ units vs units ÷ total).',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Receipts, payslips, quotes',
            content:
              'Most adult calculation errors live in receipts (item scanned twice, sale price not applied), payslips (deduction calculated on the wrong base), and quotes (unit price multiplied wrong). The estimate-and-verify habit catches them before they cost you money.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Verify a real document',
            content:
              'Take one real receipt, payslip, or invoice from this week. Re-do the totals using estimation first, then a calculator, then check at least one line with the inverse operation.',
            answerKey:
              'Sample: subtotal lines 12.99 + 8.47 + 23.50 = 44.96; inverse 44.96 − 23.50 = 21.46 then 21.46 − 8.47 = 12.99 ✓. If a line were 129.9 instead of 12.99, estimate 10× too high would flag it before you pay.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 1.4 summary',
            title: 'A 30-second habit',
            content:
              'Estimate, calculate, verify — and run inverse operations on anything that matters.',
          },
        ],
      },
    ],
    practiceLab: {
      title: 'Module 1 Practice Lab — Confidence and Sanity Checks',
      durationMinutes: 30,
      learnerGoal:
        'Apply estimation, mental math, and verification to four real-world micro-scenarios.',
      scenarios: [
        {
          id: 'm01-lab-1',
          prompt:
            'Grocery estimate: ten items priced (in any currency) 3.79, 2.49, 12.47, 8.23, 1.99, 3.49, 5.99, 7.82, 4.29, 6.75. Round each to the nearest whole unit and produce a quick running estimate of the total.',
          answerKey:
            'Rounded estimate ≈ 4 + 2.5 + 12 + 8 + 2 + 3.5 + 6 + 8 + 4 + 7 = 57. Actual = 57.31. Difference < 1%, well within budget signal.',
        },
        {
          id: 'm01-lab-2',
          prompt:
            'Restaurant tip: bill 73.25, target tip 18%. Estimate first using 10% × 2 minus 2%, then calculate precisely.',
          answerKey:
            '10% of 73.25 ≈ 7.33. Doubled: 14.66. Subtract about 2% (≈1.50): 13.20. Precise: 73.25 × 0.18 = 13.185 ≈ 13.19.',
        },
        {
          id: 'm01-lab-3',
          prompt:
            'Receipt verification: items 12.99, 8.47, 23.50; subtotal stated 44.96; tax 8% stated 3.60; total stated 48.56. Verify each line.',
          answerKey:
            'Subtotal: 12.99 + 8.47 + 23.50 = 44.96 ✓. Tax: 44.96 × 0.08 = 3.5968 → 3.60 ✓. Total: 44.96 + 3.60 = 48.56 ✓.',
        },
        {
          id: 'm01-lab-4',
          prompt:
            "Sanity-check a payslip claim: an annual salary of 50,000 is described as '500/hour.' Decide whether this can be true and produce the correct hourly rate assuming 2,080 working hours per year.",
          answerKey:
            'Cannot be true: 500 × 2,080 = 1,040,000. Correct hourly: 50,000 ÷ 2,080 ≈ 24.04. The stated rate is off by roughly a factor of 20.',
        },
      ],
    },
    moduleQuiz: [
      {
        id: 'm01-q1',
        question: "Which mindset statement reflects how this course wants you to handle a math mistake?",
        type: 'multiple_choice',
        options: [
          "'I'm just not a math person.'",
          "'I don't understand this yet — which step needs more practice?'",
          "'Mistakes mean I should stop and try a different career.'",
          "'I'll guess and hope no one checks.'",
        ],
        correctAnswer:
          "'I don't understand this yet — which step needs more practice?'",
        explanation:
          'Growth mindset treats a mistake as data about which step needs work, not as a verdict on identity.',
        relatedLesson: '1.1',
        difficulty: 'easy',
      },
      {
        id: 'm01-q2',
        question: 'Estimate first: roughly how much is 47 × 23?',
        type: 'multiple_choice',
        options: ['About 100', 'About 1,000', 'About 10,000', 'About 50,000'],
        correctAnswer: 'About 1,000',
        explanation: '50 × 20 = 1,000. The exact answer is 1,081.',
        relatedLesson: '1.2',
        difficulty: 'easy',
      },
      {
        id: 'm01-q3',
        question: 'Use the 10% method to find a 15% tip on a $60 bill.',
        type: 'calculation',
        correctAnswer: '$9',
        explanation: '10% of $60 = $6; 5% = $3; 15% = $6 + $3 = $9.',
        relatedLesson: '1.3',
        difficulty: 'easy',
      },
      {
        id: 'm01-q4',
        question:
          'A receipt shows: subtotal $44.96, tax 8%, stated tax $3.60, stated total $48.56. Are the numbers consistent?',
        type: 'scenario',
        options: [
          'Yes — every line is consistent within rounding.',
          'No — the tax line should be roughly $7.20.',
          'No — the total should be $44.96 + $3.60 + $44.96.',
          'Cannot be determined without more information.',
        ],
        correctAnswer: 'Yes — every line is consistent within rounding.',
        explanation: '44.96 × 0.08 ≈ 3.60; 44.96 + 3.60 = 48.56. All three lines verify.',
        relatedLesson: '1.4',
        difficulty: 'medium',
      },
      {
        id: 'm01-q5',
        question:
          'An annual salary of $50,000, full time, is closest to which hourly rate? Use 2,080 hours/year.',
        type: 'calculation',
        correctAnswer: 'About $24.04/hour',
        explanation: '$50,000 ÷ 2,080 ≈ $24.04/hour.',
        relatedLesson: '1.4',
        difficulty: 'medium',
      },
      {
        id: 'm01-q6',
        question: 'Apply order of operations: 10 + 5 × 2 = ?',
        type: 'calculation',
        correctAnswer: '20',
        explanation: 'Multiplication before addition: 5 × 2 = 10, then 10 + 10 = 20.',
        relatedLesson: '1.4',
        difficulty: 'easy',
      },
      {
        id: 'm01-q7',
        question:
          'A spreadsheet shows the cost per unit of a 12-pack at $1.99 each is $2.388 for the case. What is likely wrong?',
        type: 'scenario',
        options: [
          'Nothing — that is the correct case price.',
          'A decimal-point error — the case should be about $23.88.',
          'Rounding — the precise figure should be $2.39.',
          'Sales tax was not applied to the case.',
        ],
        correctAnswer: 'A decimal-point error — the case should be about $23.88.',
        explanation: 'Estimate: 12 × $2 = $24. The stated $2.388 is off by a factor of ten.',
        relatedLesson: '1.4',
        difficulty: 'medium',
      },
      {
        id: 'm01-q8',
        question:
          'You estimate a project will cost about $1,800 in materials. The supplier quote arrives at $1,803.47. Best response?',
        type: 'scenario',
        options: [
          "Reject the quote — it doesn't match your estimate exactly.",
          'Accept the quote without further checks since you already estimated.',
          'Accept the quote as reasonable based on the estimate, and verify one line item with an inverse operation before signing.',
          'Re-estimate using a completely different method to get a third number.',
        ],
        correctAnswer:
          'Accept the quote as reasonable based on the estimate, and verify one line item with an inverse operation before signing.',
        explanation:
          'Estimation tells you the quote is in the right neighbourhood; an inverse-operation check on one line catches transposition or unit errors.',
        relatedLesson: '1.4',
        difficulty: 'hard',
      },
    ],
    moduleSummary:
      'You reset your math identity, built a personal toolkit, learned to read place value contextually, drilled four mental-math moves, and adopted the estimate-calculate-verify habit. Every later module relies on these four lessons.',
    completionChecklist: [
      'I can describe my math anxiety triggers and a growth-mindset response to each.',
      'I can choose calculator vs mental math based on the stakes of the calculation.',
      'I can estimate any everyday total or percentage in under ten seconds.',
      'I can verify a calculation using an inverse operation.',
      'I can name and prevent the five common adult calculation errors.',
    ],
  },

  // ============================================================
  // MODULE 2 — Fractions, Decimals, Percentages, and Estimation
  // ============================================================
  {
    moduleNumber: 2,
    slug: 'fractions-decimals-percentages-estimation',
    title: 'Fractions, Decimals, Percentages, and Estimation',
    durationMinutes: 180,
    level: 'Foundational',
    prerequisites: ['math-confidence-number-sense'],
    overview:
      'Fractions, decimals, and percentages are three different ways of saying the same thing. This module makes you fluent in moving between them, calculating with each, and using estimation to keep your answers honest. You leave with a small, memorised table of common conversions, a reliable method for percentage problems, and confidence in fraction operations for measurements and scaling.',
    whyThisMatters: [
      'Discounts, markups, taxes, tips, interest rates, completion rates, and growth rates are all percentages.',
      'Fractions show up in measurements, recipes, time, and trades.',
      'Decimals show up wherever you are dealing with money or precision tools.',
      'Mixing the three forms is one of the most common adult math frustrations — fluency removes it.',
      'Percentages are easy to misread; the percentage-points distinction alone catches many real-world mistakes.',
    ],
    learningObjectives: [
      'Convert fluently between fractions, decimals, and percentages',
      'Calculate any percentage of an amount using three different methods',
      'Find what percentage one number is of another',
      'Calculate percentage increases and decreases, and apply them in either direction',
      'Add, subtract, multiply, and divide fractions, including mixed numbers',
      'Round decimals appropriately for money, measurements, and intermediate calculations',
      'Estimate percentages and fractions quickly using benchmark values',
      'Distinguish percentage points from percentage change',
    ],
    lessons: [
      {
        lessonNumber: '2.1',
        title: 'Understanding the Three Forms',
        estimatedMinutes: 35,
        learnerGoal:
          'Memorise common equivalents and convert fluently between fractions, decimals, and percentages.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Same idea, different clothes',
            title: 'Why three forms exist',
            content:
              'Fractions are convenient when something is split into named parts (1/2 a cake, 3/4 of an hour). Decimals are convenient for money and precise measurement ($12.50, 2.5 metres). Percentages are convenient for comparisons and rates (25% off, 15% tip, 5% interest). All three describe the same underlying relationship: a part of a whole.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Memorise this table',
            title: 'Common equivalents to learn cold',
            content:
              '1/2 = 0.5 = 50%. 1/4 = 0.25 = 25%. 3/4 = 0.75 = 75%. 1/3 = 0.333… = 33.3%. 2/3 = 0.667… = 66.7%. 1/5 = 0.2 = 20%. 1/8 = 0.125 = 12.5%. 1/10 = 0.1 = 10%. 1/100 = 0.01 = 1%. Memorising these takes one focused sitting and pays off forever.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 1 — Conversion methods',
            title: 'Five conversions you will actually do',
            content:
              'Given: convert 3/4, 0.75, 45%, 3/8, and 75% across forms.\n\nFraction → decimal: divide top by bottom. 3/4 = 3 ÷ 4 = 0.75.\nDecimal → percentage: multiply by 100 (move decimal two places right). 0.75 → 75%.\nPercentage → decimal: divide by 100 (move decimal two places left). 45% → 0.45.\nFraction → percentage: convert to decimal first, then multiply by 100. 3/8 → 0.375 → 37.5%.\nPercentage → fraction: write over 100, then simplify. 75% → 75/100 → 3/4.\n\nReasonableness: 3/4 lies between 1/2 (50%) and 1 (100%); 75% sits sensibly in the middle. 3/8 is just under 1/2; 37.5% is just under 50%. Both pass the magnitude check.',
            examples: [
              '5/8 = 0.625 = 62.5%',
              '8.5% = 0.085',
              '0.4 = 4/10 = 2/5 = 40%',
              '60% = 60/100 = 3/5',
            ],
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 2 — Conversions in real prices',
            title: 'Translate a discount label three ways',
            content:
              'Given: a tag reads "1/3 off". The original price is $90.\n\nFormula: discount amount = price × fraction; sale price = price × (1 − fraction).\n\nStep 1 — Express the fraction three ways for clarity. 1/3 = 0.333… = 33.3%.\n\nStep 2 — Compute the discount. 90 × 1/3 = 30. Equivalently, 90 × 0.333… = 30. Equivalently, 90 × 33.3% = 90 × 0.333 = 29.97 ≈ $30 (the small gap is rounding the repeating decimal).\n\nStep 3 — Compute the sale price. 90 − 30 = $60. Equivalently, 90 × (1 − 1/3) = 90 × 2/3 = 60. Equivalently, 90 × 0.667 = $60.03 ≈ $60.\n\nAnswer: $30 off → $60 sale price. All three forms agree to within rounding; if any disagrees, you have a typo.\n\nReasonableness: 1/3 off should leave 2/3 standing; 2/3 of 90 is 60 — confirmed.',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice',
            title: 'Convert and apply across forms',
            content:
              'Walk through three real-life conversions.\n\n(1) A receipt shows tax 0.085. Convert to percentage: 0.085 × 100 = 8.5%. Apply to a $46 purchase: 46 × 0.085 = $3.91 tax.\n\n(2) A bank quotes 5/8 of a percent monthly fee. Convert: 5/8 = 0.625; as a percentage of the deposit, 0.625% = 0.00625 in calculation form. On $1,200, fee = 1,200 × 0.00625 = $7.50.\n\n(3) A pay raise of 0.04 means 4% raise. On a $52,000 salary: 52,000 × 0.04 = $2,080 raise → new salary $54,080.\n\nVerify with fractions: 4% = 4/100 = 1/25; 52,000 ÷ 25 = $2,080 ✓.',
            learnerTask:
              'Convert and apply: a deal advertises 3/8 off a $144 jacket. Compute the discount, sale price, and equivalent decimal/percentage. Verify with the inverse view (2/3 of the original is 96 — but 5/8 of 144 = …) and reconcile.',
            answerKey:
              '3/8 = 0.375 = 37.5%. Discount = 144 × 3/8 = 54. Sale price = 144 − 54 = $90. Equivalent: 144 × 0.375 = $54 ✓; 144 × 37.5% = $54 ✓. Reverse view: 5/8 standing = 144 × 5/8 = $90 ✓ (matches sale price). Conversions all agree → calculation passes. Strong answers reconcile across all three forms; weak answers only show one form.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Cover the page',
            content:
              "Without looking, write the decimal and percentage equivalents of 1/2, 1/4, 3/4, 1/3, 2/3, 1/5, 1/8, 1/10. Anything you missed goes on the day's flashcards.",
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Conversion traps',
            content:
              "Forgetting that 'percent' means 'per hundred' (5% is 0.05, not 0.5). Reading 0.625 as 6.25% instead of 62.5%. Writing 1/3 as 0.33 and losing precision in long calculations.",
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Tags, labels, statements',
            content:
              "A '25% off' tag is the same as '1/4 off' is the same as 'multiply by 0.75 to find the sale price.' A bank rate of 5.25% APR is the same as 0.0525 in a calculation.",
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Ten quick conversions',
            content:
              'Convert each: 3/4 to decimal; 0.625 to percentage; 45% to decimal; 2/5 to percentage; 75% to fraction; 0.4 to fraction; 1/8 to percentage; 0.125 to fraction; 60% to fraction; 5/8 to decimal.',
            answerKey: '0.75; 62.5%; 0.45; 40%; 3/4; 2/5; 12.5%; 1/8; 3/5; 0.625.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 2.1 summary',
            title: 'Three names, one idea',
            content:
              'Memorise the common equivalents and know the five conversion rules.',
          },
        ],
      },
      {
        lessonNumber: '2.2',
        title: 'Working with Percentages',
        estimatedMinutes: 45,
        learnerGoal:
          'Calculate percentages of amounts, find what percentage one number is of another, and apply percentage increases and decreases — including the percentage-points trap.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Three reliable methods',
            title: 'Pick the method that fits the numbers',
            content:
              'Method 1 — convert and multiply: 25% of $80 = 0.25 × $80 = $20. Method 2 — use 10% as a stepping stone: 10% of $80 = $8, so 25% = $8 + $8 + half of $8 = $20. Method 3 — use the fraction equivalent: 25% = 1/4, so $80 ÷ 4 = $20.',
            examples: [
              '15% of $60: $6 + $3 = $9.',
              '30% of $250: $25 + $25 + $25 = $75.',
              '12.5% of $200: 1/8 × $200 = $25.',
            ],
          },
          {
            type: 'concept_explanation',
            eyebrow: 'What percentage is X of Y?',
            title: '(Part ÷ Whole) × 100',
            content:
              '15 out of 60 is 15 ÷ 60 = 0.25 = 25%. Sales of $2M in an $8M market is 2 ÷ 8 = 0.25 = 25% market share.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 1 — Increase and decrease',
            title: 'Both directions, both methods',
            content:
              'Given: price moves from $50 to $60; another item moves from $80 to $60. Compute percentage change for each.\n\nFormula: % change = ((new − old) ÷ old) × 100.\n\nCase A ($50 → $60): (60 − 50) ÷ 50 × 100 = 10/50 × 100 = 20% increase.\nCase B ($80 → $60): (60 − 80) ÷ 80 × 100 = −20/80 × 100 = −25%, i.e. 25% decrease.\n\nApplying changes the other way: 20% increase on $150 → 150 × 1.20 = $180. 25% off $80 → 80 × 0.75 = $60. Reasonableness: 25% is 1/4, so 1/4 off $80 = $20 off → $60 ✓.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 2 — Stacked discounts',
            title: 'Two successive 10% discounts on a $200 jacket',
            content:
              'Given: jacket priced $200; first 10% discount, then a 10% loyalty discount on the already-reduced price.\n\nFormula: final = original × (1 − r₁) × (1 − r₂).\n\nStep 1 — Apply first 10%: 200 × 0.90 = 180. (10% of 200 is 20; 200 − 20 = 180.)\n\nStep 2 — Apply second 10% on the new $180: 180 × 0.90 = 162. (10% of 180 is 18; 180 − 18 = 162.)\n\nFinal: $162. Total discount: 200 − 162 = $38, which is 19% of the original — not 20%.\n\nLesson: stacked 10% + 10% ≠ 20%. The combined effective discount is 1 − 0.90 × 0.90 = 0.19 = 19%.\n\nReasonableness: each 10% removes a slice; the second slice is from a smaller pie, so the combined discount is always less than the simple sum.',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice',
            title: 'Salary uplift with percentage-points trap',
            content:
              'Goal: a worker on $48,000 receives a 4% raise this year and then a 3% raise next year. Compute the final salary and the total percentage change.\n\nStep 1 — First raise: 48,000 × 1.04 = $49,920.\nStep 2 — Second raise: 49,920 × 1.03 = $51,417.60.\nStep 3 — Total change: (51,417.60 − 48,000) ÷ 48,000 × 100 = 3,417.60 / 48,000 × 100 = 7.12%.\n\nNotice: 4% + 3% ≠ 7%; the compounded effect is 7.12% because the second raise was applied to the larger $49,920 base.\n\nVerify with the formula: (1.04 × 1.03) − 1 = 1.0712 − 1 = 0.0712 = 7.12% ✓.',
            learnerTask:
              'A bond yields 5%; later it is "raised by 3 percentage points." Compute the new yield, the percentage change, and explain in one sentence why the two numbers differ.',
            answerKey:
              'New yield = 5% + 3 percentage points = 8%. Percentage change = (8 − 5) ÷ 5 × 100 = 60% increase. The two numbers differ because "percentage points" measures the absolute gap between two rates; "percentage change" measures the relative change as a fraction of the starting rate. A jump from 5% to 8% is 3 percentage points but a 60% increase. Strong answer reconciles both with the formulas; weak answer reports only one.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Successive percentages',
            title: 'They do not simply add',
            content:
              'Two 10% increases on $100 give $121, not $120 (10% of 100 = 10 → $110; 10% of 110 = 11 → $121). The second 10% is calculated on the new $110, not on the original $100.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Percentage points vs percentage change',
            title: 'Two completely different things',
            content:
              'An interest rate going from 5% to 8% is a 3 percentage-point increase. As a percentage change, that is (3 ÷ 5) × 100 = 60% increase.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Three quick reads',
            content:
              '(a) Salary $50,000 → $54,000 — what is the percentage increase? (b) Discount rate moves from 12% to 15% — by how many percentage points? (c) Two successive 10% discounts on a $100 item — what is the final price?',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Percentage traps',
            content:
              'Adding successive percentages (20% + 10% ≠ 30%). Calculating a discount and forgetting to subtract from the original.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Pricing, payslips, performance',
            content:
              'A 5% raise on top of a 3% prior raise compounds. A 30% discount stacked on a 20% sale is not 50% off.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Eight percentage reps',
            content:
              '(1) 25% of $80; (2) 15% of $60; (3) 15 out of 60 as percentage; (4) 30 out of 120 as percentage; (5) increase from $50 to $60; (6) decrease from $80 to $60; (7) apply 20% off to $150; (8) two successive 10% increases on $100.',
            answerKey: '$20; $9; 25%; 25%; 20%; 25%; $120; $121.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 2.2 summary',
            title: 'One formula, many uses',
            content:
              'Three methods for percentage of an amount; one formula for what-percentage-is-X-of-Y; one for percentage change; one rule for successive percentages: do not add them.',
          },
        ],
      },
      {
        lessonNumber: '2.3',
        title: 'Practical Fraction Skills',
        estimatedMinutes: 40,
        learnerGoal:
          'Add, subtract, multiply, and divide fractions for measurements, scaling, and trade contexts.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Where fractions live',
            title: 'Recipes, time, trades, and parts',
            content:
              'Fractions are the language of cooking (1/2 cup, 3/4 teaspoon), time (1/4 hour = 15 minutes; 1 1/2 hours = 90 minutes), and trades (3/4 inch, 5/8 inch).',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 1 — Scaling recipes',
            title: 'Multiply each ingredient by the scaling factor',
            content:
              'Given: a recipe for 4 servings calls for 2 cups flour, 3 eggs, and 1 1/2 cups milk. Scale to 6 servings.\n\nFormula: scale factor = target servings ÷ original servings; new amount = original × scale.\n\nStep 1 — Scale: 6 ÷ 4 = 1.5 (or 3/2).\nStep 2 — Apply to each ingredient.\nFlour: 2 × 1.5 = 3 cups.\nEggs: 3 × 1.5 = 4.5 → round up to 5 (you can\'t use half an egg cleanly without splitting).\nMilk: 1 1/2 × 1.5 = 1.5 × 1.5 = 2.25 → 2 1/4 cups.\n\nReasonableness: 6 servings is 1.5× of 4, so each ingredient should grow by ~50%. Flour 2 → 3 (50% up ✓). Milk 1.5 → 2.25 (50% up ✓). Eggs round up because you can\'t split an egg neatly.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 2 — Trade fractions',
            title: 'Cutting lumber with mixed-number arithmetic',
            content:
              'Given: a board is 8 1/2 feet long. You need three pieces: 2 3/4 ft, 1 7/8 ft, and 3 1/4 ft. Will the cuts fit, and what scrap remains?\n\nFormula: total cut = sum of pieces; scrap = board − total cut.\n\nStep 1 — Find a common denominator for 1/2, 3/4, 7/8, 1/4. LCD = 8.\n8 1/2 = 8 4/8; 2 3/4 = 2 6/8; 1 7/8 = 1 7/8; 3 1/4 = 3 2/8.\n\nStep 2 — Sum the cuts: 2 6/8 + 1 7/8 + 3 2/8 = (2 + 1 + 3) + (6 + 7 + 2)/8 = 6 + 15/8 = 6 + 1 7/8 = 7 7/8 ft.\n\nStep 3 — Scrap: 8 4/8 − 7 7/8 = 8 4/8 − 7 7/8 = 7 12/8 − 7 7/8 = 5/8 ft (borrowed 1 = 8/8 from the whole).\n\nAnswer: cuts fit; scrap remaining = 5/8 ft.\n\nReasonableness: rough check 8.5 − 2.75 − 1.875 − 3.25 = 0.625 ft = 5/8 ft ✓. Decimal verifies the fraction work.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Add and subtract',
            title: 'Same denominator, then add or subtract numerators',
            content:
              'Same denominator: 2/5 + 1/5 = 3/5. Different denominators: find a common denominator first. 1/3 + 1/4 — common denominator 12, so 1/3 = 4/12 and 1/4 = 3/12, total 7/12.',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice',
            title: 'Scale and add fractions on a real budget',
            content:
              'Goal: a project budget allocates 1/3 to labour, 1/4 to materials, 1/6 to overhead, and the rest to contingency. Total budget $48,000. Compute each line.\n\nStep 1 — Common denominator 12. Labour 1/3 = 4/12; materials 1/4 = 3/12; overhead 1/6 = 2/12. Sum = 9/12 = 3/4 of the budget.\n\nStep 2 — Contingency = 1 − 3/4 = 1/4 of budget.\n\nStep 3 — Apply to $48,000.\nLabour: 48,000 × 4/12 = 48,000 ÷ 3 = $16,000.\nMaterials: 48,000 × 3/12 = 48,000 ÷ 4 = $12,000.\nOverhead: 48,000 × 2/12 = 48,000 ÷ 6 = $8,000.\nContingency: 48,000 × 3/12 = 48,000 ÷ 4 = $12,000.\n\nStep 4 — Verify: 16,000 + 12,000 + 8,000 + 12,000 = 48,000 ✓.\n\nReasonableness: the largest line is labour (1/3) and it is the largest dollar value; contingency (1/4) and materials (1/4) tie at $12,000.',
            learnerTask:
              'Allocate a $90,000 grant: 2/5 to programme delivery, 1/5 to evaluation, 1/10 to admin, the rest to reserves. Compute each, verify the sum, and state the largest and smallest line.',
            answerKey:
              'Common denom 10. Programme 2/5 = 4/10 → 90,000 × 4/10 = $36,000. Evaluation 1/5 = 2/10 → $18,000. Admin 1/10 → $9,000. Allocated = 4/10 + 2/10 + 1/10 = 7/10 → $63,000. Reserves = 3/10 → $27,000. Verify sum: 36 + 18 + 9 + 27 = $90,000 ✓. Largest line: programme delivery ($36,000). Smallest: admin ($9,000). Strong answers find LCD first; weak answers convert each fraction to decimal and lose precision.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Multiply and divide',
            title: 'Multiply straight across; divide by flipping',
            content:
              'Multiplication: 2/3 × 3/4 = 6/12 = 1/2. Division: multiply by the reciprocal. 3/4 ÷ 1/2 = 3/4 × 2/1 = 6/4 = 3/2 = 1 1/2.',
            examples: [
              '1/2 × 2/5 = 2/10 = 1/5',
              '5/6 ÷ 2/3 = 5/6 × 3/2 = 15/12 = 5/4 = 1 1/4',
              '1/4 + 1/3 + 1/6 = 3/12 + 4/12 + 2/12 = 9/12 = 3/4',
            ],
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Three reps without a calculator',
            content:
              '(a) 1/3 + 1/4 = ? (b) 2/3 × 3/4 = ? (c) 3/4 ÷ 1/2 = ? Confirm: 7/12; 1/2; 1 1/2.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Fraction traps',
            content:
              'Adding numerators and denominators (1/2 + 1/3 ≠ 2/5). Forgetting to find a common denominator.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Construction, cooking, scheduling',
            content:
              'A trade quote calls for thirty 5/8-inch fasteners — total length is 30 × 5/8 = 18.75 inches. A scheduler books eight 1/4-hour appointments = 2 hours.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Ten fraction operations',
            content:
              '(1) 1/3 + 1/4; (2) 2/3 × 3/4; (3) 3/4 ÷ 1/2; (4) 2/5 + 3/5; (5) 1/2 − 1/4; (6) 2 1/2 + 1 3/4; (7) 3/4 × 2/3; (8) 5/6 ÷ 2/3; (9) 1/4 + 1/3 + 1/6; (10) 2/3 − 1/4.',
            answerKey: '7/12; 1/2; 1 1/2; 1; 1/4; 4 1/4; 1/2; 1 1/4; 3/4; 5/12.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 2.3 summary',
            title: 'Fluent in parts of a whole',
            content:
              'Add and subtract by aligning denominators. Multiply straight across. Divide by flipping.',
          },
        ],
      },
      {
        lessonNumber: '2.4',
        title: 'Decimal Precision and Rounding',
        estimatedMinutes: 30,
        learnerGoal:
          'Choose appropriate precision for money, measurements, and intermediate calculations, and avoid compound rounding errors.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'How precise is precise enough?',
            title: 'Match precision to the decision',
            content:
              'Money is almost always two decimal places. Finance percentages often use two decimals (5.25% APR). Physical measurements use whatever your tool can measure. Intermediate calculations should keep full precision; round only the final answer.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 1 — Compound rounding error',
            title: 'Why early rounding goes wrong',
            content:
              'Given: split $100 evenly into 3 shares.\n\nFormula: share = total ÷ 3.\n\nWrong path (rounded too early): 100 ÷ 3 ≈ 33.33 per share; 33.33 × 3 = 99.99 — total is one cent off.\n\nCorrect path: keep 33.333… in memory; 33.333… × 3 = 100.00 ✓.\n\nFix in practice: round only at the final step. Two of three shares get $33.33 and one gets $33.34 to make the total $100.00 exactly.\n\nReasonableness: tiny early rounds compound. A penny here, a penny there, and a 50-line invoice can be off by 50 cents — small enough to miss but big enough to flag in audit.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 2 — Sales-tax precision',
            title: 'Where to round on a multi-line bill',
            content:
              'Given: three items at $4.95, $7.79, $12.50 plus 6.5% sales tax.\n\nFormula: subtotal = sum; tax = subtotal × rate; total = subtotal + tax. Round the subtotal and the tax to two decimals once at the end.\n\nStep 1 — Subtotal exact: 4.95 + 7.79 + 12.50 = 25.24.\n\nStep 2 — Tax exact: 25.24 × 0.065 = 1.6406. Round to two decimals: $1.64.\n\nStep 3 — Total: 25.24 + 1.64 = $26.88.\n\nWrong path: rounding tax per line (e.g. 4.95 × 0.065 = 0.32 each) and summing rounded lines often disagrees with the all-at-once method by 1–3 cents on a multi-line bill — that\'s why retailers compute tax on the subtotal, not per item.\n\nReasonableness: estimate tax 25 × 0.07 = 1.75 → $1.64 lands close enough; total ≈ 26.88 ≈ 27 ✓.',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice',
            title: 'Pick the right precision per context',
            content:
              'Walk through three real precision calls.\n\n(1) Project hours: 137.6 hours billed at $112.50/hour. Where to round?\nKeep full precision while computing: 137.6 × 112.50 = 15,480.00 — clean cent. No rounding needed.\n\n(2) Lab measurement: 0.4827 g recorded by a scale that reads to 0.01 g. The 4th digit is noise; report 0.48 g.\n\n(3) Survey result: 142 of 250 respondents = 0.568 = 56.8%. Headlines round to whole percent (57%); methodology footnote keeps one decimal (56.8%); raw counts (142/250) preserve everything.\n\nGeneral rule: keep maximum precision in calculations; match displayed precision to the smallest meaningful step in the situation.',
            learnerTask:
              'Compute the total for 7 items at $14.85 each plus 7.25% sales tax. Show the unrounded subtotal, unrounded tax, and final rounded total. Then explain in one sentence why rounding at the end matters.',
            answerKey:
              'Subtotal exact: 7 × 14.85 = 103.95. Tax exact: 103.95 × 0.0725 = 7.5364 (full precision); rounded $7.54. Total: 103.95 + 7.54 = $111.49. If you had rounded each item\'s tax separately (14.85 × 0.0725 = 1.076625 → 1.08 per item × 7 = 7.56), you would over-collect by 2 cents. Rounding once at the end avoids cumulative bias.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Standard rounding',
            title: 'Round half up',
            content:
              'If the next digit is 5 or more, round up; otherwise round down. 12.4 → 12; 12.5 → 13; 12.6 → 13. Banker\'s rounding (used in some financial software) rounds half-to-even — 12.5 → 12 and 13.5 → 14 — to avoid bias on long sums; check which mode your tool uses.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Round each correctly',
            content:
              'Round to two decimal places: 12.345; 12.344; 12.999. Confirm: 12.35; 12.34; 13.00.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Rounding traps',
            content:
              'Rounding intermediate results, especially in a chain of multiplications.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Invoices, lab results, surveys',
            content:
              'An invoice rounded to two decimals is industry standard.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Three real-precision calls',
            content:
              'Pick three numbers from a recent document. For each, decide what precision is appropriate and why.',
            answerKey:
              'Sample: (1) Bank balance 1,247.83 → two decimals (money). (2) Room width 3.482 m from a laser tape → one decimal cm (3.48 m) unless spec demands more. (3) Survey “62% agree” → whole percent for headline, note sample size in footnote.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 2.4 summary',
            title: 'Round late, round once',
            content: 'Keep full precision while you calculate; round once at the end.',
          },
        ],
      },
      {
        lessonNumber: '2.5',
        title: 'Estimation Techniques',
        estimatedMinutes: 30,
        learnerGoal:
          'Use front-end estimation, friendly numbers, compatible numbers, and benchmark fractions to get a quick honest answer.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Estimation is a skill, not a guess',
            title: 'Four moves you can practise',
            content:
              'Front-end estimation: keep only the leading digits (847 + 1,234 ≈ 800 + 1,200 = 2,000). Friendly numbers: round each value, calculate, adjust. Compatible numbers: change numbers slightly so the calculation is easier. Benchmark fractions: 3/8 ≈ 1/3; 47% ≈ 1/2.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 1 — Five real estimates',
            title: 'Front-end + friendly + compatible + benchmark in action',
            content:
              'Given: five computations to estimate before exact calc.\n\n(1) 847 + 1,234. Front-end: keep leading digits → 800 + 1,200 = 2,000. Precise: 2,081. Gap: 81/2,081 ≈ 3.9%. Accept.\n\n(2) 47 × 23. Friendly: 50 × 20 = 1,000. Precise: 1,081. Gap: 8.1%. Accept.\n\n(3) 15% of $47. Compatible: round to $50 → 15% × 50 = 7.50. Precise: 47 × 0.15 = 7.05. Gap: 6.4%. Accept.\n\n(4) 3/8 of 80. Benchmark: 3/8 ≈ 0.375 ≈ 1/3 → 80/3 ≈ 27. Precise: 80 × 3/8 = 30. Gap: 10%. Accept (just at threshold; tighter benchmark 3/8 = 0.375 gives exact).\n\n(5) 37% of 80. Benchmark: 37% ≈ 1/3 → 80/3 ≈ 27. Precise: 80 × 0.37 = 29.6. Gap: 8.8%. Accept.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 2 — Big-receipt estimate',
            title: 'A grocery run before reaching the till',
            content:
              'Given: cart contents: bread 4.79, milk 5.49, eggs 4.29, cheese 12.49, apples 3.89, pasta 2.39, sauce 4.99, chicken 14.99, juice 6.79, biscuits 3.49.\n\nFront-end estimate (round to nearest dollar, sum quickly):\n5 + 5 + 4 + 12 + 4 + 2 + 5 + 15 + 7 + 3 = 62.\n\nPrecise sum: 4.79 + 5.49 + 4.29 + 12.49 + 3.89 + 2.39 + 4.99 + 14.99 + 6.79 + 3.49 = 63.60.\n\nGap: 1.60 / 63.60 ≈ 2.5%.\n\nAnswer: estimate $62, actual $63.60. Add 8% sales tax in head: 0.08 × 63 ≈ 5 → with-tax estimate ~$68. Precise: 63.60 × 1.08 = 68.69. Estimate held within $1.\n\nReasonableness: the estimate stayed honest because the rounding directions roughly cancelled (some up, some down). When all numbers happen to round the same way (e.g. all "round up to nearest dollar"), expect the estimate to drift in that direction by a few percent.',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice',
            title: 'Estimate four real numbers from this week',
            content:
              'Pick four real situations and estimate each with one of the four moves before calculating exactly.\n\n(1) Tip 18% on a $73.25 dinner. Friendly + benchmark: 10% = 7.33; double = 14.66; subtract about 2% (≈ 1.50) → ~13.20. Precise: 73.25 × 0.18 = 13.19. Within 0.5%.\n\n(2) Sale price of an $85 item at 30% off. Friendly: 30% = 1/3 ≈ 28; sale ~57. Precise: 85 × 0.70 = 59.50. Within 4%.\n\n(3) Fraction of a stockpile: 5/8 of 240 lb of rice. Benchmark: 5/8 ≈ 0.625; 240 × 0.6 = 144. Precise: 240 × 5/8 = 150. Within 4%.\n\n(4) Annual salary $51,500 → monthly. Compatible: 51,500 ≈ 52,000 ÷ 12 = 4,333. Precise: 4,291.67. Within 1%.\n\nIn each case the estimate landed within ~5% of the precise answer — the goal of estimation, not an exact match.',
            learnerTask:
              'Estimate three real numbers from your week using exactly one move per number. State the move, the estimate, the precise calculation, and the gap as a percentage.',
            answerKey:
              'Sample: (1) Coffee bill 4.79 + 3.85 + 2.99 = ?. Front-end: 5 + 4 + 3 = 12. Precise: 11.63. Gap 3.2%. (2) Bus pass cost 137 days × 2.50. Friendly: 140 × 2.50 = 350. Precise: 342.50. Gap 2.2%. (3) Tax 8.5% on $189. Compatible: 10% of 189 = 18.9; subtract 1.5% ≈ 2.8 → 16.1. Precise: 189 × 0.085 = 16.07. Gap 0.2%. Strong answers always state the move name; weak answers report only the numbers.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'One pass without a calculator',
            content:
              'Estimate: (a) 18% tip on a $73 bill; (b) sale price of an $85 item at 30% off; (c) 5/8 of 240. Sanity-check against precise values 13.14, 59.50, 150.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Estimation traps',
            content:
              'Rounding both numbers in the same direction without adjusting. Using estimation as if it were precision.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Quoting, budgeting, sanity checks',
            content:
              'A site visit quote starts with estimation. A monthly budget estimate tells you whether the precise number is plausible.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Five estimates this week',
            content:
              'Pick five real numbers. Estimate each before you calculate. Note where your estimate was off enough to need a second look.',
            answerKey:
              'Lesson anchors: 18% of $73.25 ≈ $13.19 (pause check). 30% off $85 → $59.50. 5/8 of 240 = 150. Your five entries should each show estimate → exact → |error| as % of exact.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 2.5 summary',
            title: 'Estimate first, always',
            content:
              'Front-end, friendly, compatible, benchmark — four moves that protect you from any single calculation going badly wrong.',
          },
        ],
      },
    ],
    practiceLab: {
      title: 'Module 2 Practice Lab — Pricing, Tipping, and Scaling',
      durationMinutes: 35,
      learnerGoal:
        'Use the three forms in real-world pricing, tipping, recipe scaling, and margin calculations.',
      scenarios: [
        {
          id: 'm02-lab-1',
          prompt:
            'Retail pricing: an item lists at $85 with 30% off. Find the sale price using both methods.',
          answerKey:
            'Method 1: 30% of $85 = $25.50; sale = $85 − $25.50 = $59.50. Method 2: $85 × 0.70 = $59.50.',
        },
        {
          id: 'm02-lab-2',
          prompt:
            'Tip: 18% on a $73.25 dinner bill. Estimate first using 10% × 2 minus 2%, then calculate precisely.',
          answerKey:
            'Estimate: $7.33 × 2 = $14.66; subtract about 2% (≈$1.50) → $13.20. Precise: $73.25 × 0.18 = $13.185 ≈ $13.19.',
        },
        {
          id: 'm02-lab-3',
          prompt:
            'Recipe scaling from 4 to 6 servings, where the original calls for 2 cups flour, 3 eggs, 1 1/2 cups milk.',
          answerKey:
            'Scale = 1.5. Flour: 3 cups. Eggs: 4.5 → round to 5 eggs. Milk: 2 1/4 cups.',
        },
        {
          id: 'm02-lab-4',
          prompt:
            'Margin: a product costs $60 to make and sells for $100. Express the gross profit as a percentage of revenue.',
          answerKey: 'Profit = $40. Margin = ($40 ÷ $100) × 100 = 40%.',
        },
        {
          id: 'm02-lab-5',
          prompt:
            "Successive percentage trap: a $100 item is discounted 20% and then a further 10%. Calculate the final price and show why it isn't $70.",
          answerKey:
            'After 20% off: $80. After a further 10% off: $80 × 0.90 = $72. Adding 20% + 10% gives $70 and is wrong because the second discount is calculated on $80, not $100.',
        },
      ],
    },
    moduleQuiz: [
      {
        id: 'm02-q1',
        question: 'Convert 3/4 to a decimal.',
        type: 'calculation',
        correctAnswer: '0.75',
        explanation: '3 ÷ 4 = 0.75.',
        relatedLesson: '2.1',
        difficulty: 'easy',
      },
      {
        id: 'm02-q2',
        question: 'What is 0.625 as a percentage?',
        type: 'multiple_choice',
        options: ['6.25%', '62.5%', '625%', '0.625%'],
        correctAnswer: '62.5%',
        explanation: 'Move the decimal two places right: 0.625 → 62.5%.',
        relatedLesson: '2.1',
        difficulty: 'easy',
      },
      {
        id: 'm02-q3',
        question: 'Find 25% of $80 using any method.',
        type: 'calculation',
        correctAnswer: '$20',
        explanation: '25% = 1/4; $80 ÷ 4 = $20.',
        relatedLesson: '2.2',
        difficulty: 'easy',
      },
      {
        id: 'm02-q4',
        question: 'What percentage is 15 out of 60?',
        type: 'calculation',
        correctAnswer: '25%',
        explanation: '(15 ÷ 60) × 100 = 25%.',
        relatedLesson: '2.2',
        difficulty: 'easy',
      },
      {
        id: 'm02-q5',
        question: 'A price increased from $50 to $60. What is the percentage increase?',
        type: 'calculation',
        correctAnswer: '20%',
        explanation: '((60 − 50) ÷ 50) × 100 = 20%.',
        relatedLesson: '2.2',
        difficulty: 'medium',
      },
      {
        id: 'm02-q6',
        question: 'Add: 1/3 + 1/4 = ?',
        type: 'calculation',
        correctAnswer: '7/12',
        explanation: 'Common denominator 12: 4/12 + 3/12 = 7/12.',
        relatedLesson: '2.3',
        difficulty: 'easy',
      },
      {
        id: 'm02-q7',
        question:
          'A $100 item gets a 20% discount, then an additional 10% discount on the new price. Final price?',
        type: 'scenario',
        options: ['$70.00', '$72.00', '$80.00', '$90.00'],
        correctAnswer: '$72.00',
        explanation: '$100 × 0.80 = $80; then $80 × 0.90 = $72.',
        relatedLesson: '2.2',
        difficulty: 'medium',
      },
      {
        id: 'm02-q8',
        question:
          'An interest rate moves from 5% to 8%. By how many percentage points, and what is the percentage change?',
        type: 'short_answer',
        correctAnswer: '3 percentage points; 60% increase',
        explanation: 'Difference 3 percentage points; (3 ÷ 5) × 100 = 60% increase.',
        relatedLesson: '2.2',
        difficulty: 'hard',
      },
      {
        id: 'm02-q9',
        question:
          'A recipe for 4 servings uses 2 cups flour and 3 eggs. Scale it to 10 servings. Round eggs sensibly.',
        type: 'calculation',
        correctAnswer: '5 cups flour; 8 eggs (rounded from 7.5)',
        explanation:
          'Scale factor 2.5. Flour: 5 cups. Eggs: 7.5 → round up to 8.',
        relatedLesson: '2.3',
        difficulty: 'medium',
      },
      {
        id: 'm02-q10',
        question:
          'A product costs $60 to make and sells for $100. What is the gross margin as a percentage of revenue?',
        type: 'scenario',
        options: ['40%', '60%', '67%', '166%'],
        correctAnswer: '40%',
        explanation: 'Profit $40; margin $40 ÷ $100 = 40%.',
        relatedLesson: '2.2',
        difficulty: 'hard',
      },
    ],
    moduleSummary:
      'You can now move between fractions, decimals, and percentages without friction; calculate any percentage of an amount; find what percentage one number is of another; apply increases and decreases; add, subtract, multiply, and divide fractions; round appropriately; and estimate any of the above quickly.',
    completionChecklist: [
      'I can recall the common conversions cold.',
      'I can calculate any percentage of an amount three different ways.',
      'I can compute percentage change in either direction and apply it forward.',
      'I distinguish percentage points from percentage change.',
      'I can add, subtract, multiply, and divide fractions, including mixed numbers.',
      'I keep full precision in intermediate calculations and round once at the end.',
      'I can estimate any tip, discount, or scaling problem in under 15 seconds.',
    ],
  },

  // ============================================================
  // MODULE 3 — Ratios, Proportions, Unit Rates, and Comparisons
  // ============================================================
  {
    moduleNumber: 3,
    slug: 'ratios-proportions-unit-rates-comparisons',
    title: 'Ratios, Proportions, Unit Rates, and Comparisons',
    durationMinutes: 155,
    level: 'Foundational',
    prerequisites: ['math-confidence-number-sense', 'fractions-decimals-percentages-estimation'],
    overview:
      'Ratios, proportions, and unit rates are the toolkit for fair comparisons and clean scaling. In this module you express relationships between quantities, set up and solve proportions with confidence, calculate unit rates and unit prices to find the genuinely better deal, and scale recipes, production runs, and mixtures without distorting the result.',
    whyThisMatters: [
      'Unit pricing is the single most reliable way to compare value across package sizes and currencies.',
      'Proportions let you scale recipes, production batches, mixes, and quotes without rebuilding from scratch.',
      'Ratios drive staffing, financial health, and quality metrics.',
      'Annualised vs hourly comparisons stop job offers from looking deceptively similar.',
      'Most "this looks like a good deal" moments are actually unit-rate problems in disguise.',
    ],
    learningObjectives: [
      'Express relationships using ratios in colon, fraction, and word form, and simplify to lowest terms',
      'Distinguish part-to-part from part-to-whole ratios and choose the right one for the question',
      'Set up and solve proportions using cross-multiplication',
      'Calculate unit rates for speed, productivity, wages, and cost-per-unit',
      'Use unit pricing to choose between package sizes and service tiers',
      'Scale recipes, production runs, and mixtures up and down accurately',
      'Compare job offers expressed as hourly, annual, weekly, or biweekly figures',
      'Apply ratios to common business metrics (margin, turnover, debt-to-equity, staffing)',
    ],
    lessons: [
      {
        lessonNumber: '3.1',
        title: 'Understanding Ratios',
        estimatedMinutes: 35,
        learnerGoal:
          'Read and write ratios in three forms, simplify them, and tell part-to-part apart from part-to-whole.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'What a ratio actually is',
            title: 'A comparison of two or more quantities',
            content:
              'A ratio expresses how much of one quantity there is compared to another, in the same units. A recipe with 2 cups flour to 1 cup sugar has a 2:1 ratio.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Three ways to write the same ratio',
            title: 'Colon, fraction, words',
            content:
              'Colon form is the most common in business and trades: 2:1, 3:4. Fraction form is used when calculating: 3/4. Word form: "three to four."',
          },
          {
            type: 'worked_example',
            eyebrow: 'Simplifying ratios',
            title: 'Divide all parts by the greatest common factor',
            content:
              '6:8 → 3:4. 12:18 → 2:3. 15:25:35 → 3:5:7.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Part-to-part vs part-to-whole',
            title: 'The single most important distinction',
            content:
              'A class with 12 boys and 18 girls (30 total) has a part-to-part boys-to-girls ratio of 12:18 = 2:3. The part-to-whole ratio of boys to total is 12:30 = 2:5 (or 40%).',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice — Read four real ratios honestly',
            title: 'Simplify, classify part-to-part vs part-to-whole, and interpret',
            content:
              'Goal: walk four real-world ratios through three steps each — write in colon form, simplify, classify as part-to-part or part-to-whole, and state what the ratio answers.\n\n(1) Staff-to-customer ratio: a small clinic has 3 nurses and 24 scheduled patients per shift.\nColon: 3:24 → simplified 1:8.\nType: part-to-part (nurses vs patients are two distinct groups).\nAnswers: "for every nurse on shift, there are 8 patients to attend." Used in staffing decisions.\n\n(2) Salt-to-sugar mix in a baking recipe: 1 tsp salt to 8 tsp sugar.\nColon: 1:8.\nType: part-to-part.\nAnswers: "for every 1 tsp of salt, use 8 tsp of sugar." Scale up by multiplying both sides.\n\n(3) Defect rate at a small bakery: 5 burnt loaves out of 200 produced.\nColon: 5:200 → simplified 1:40.\nType: part-to-whole (5 defects are part of the 200 total).\nEquivalent percentage: 5 ÷ 200 = 2.5%.\nAnswers: "2.5% of loaves are defective." Used in quality reporting.\n\n(4) Equity-to-debt structure of a small business: $300k equity, $200k debt.\nColon: 300:200 → simplified 3:2.\nType: part-to-part (equity and debt are two distinct sources of capital).\nAnswers: "for every $3 of equity, there is $2 of debt." Lenders read this as a leverage signal.\n\nReasonableness: confusing part-to-part with part-to-whole is the #1 ratio error. The clinic\'s 1:8 nurse-to-patient ratio is NOT "1 of every 8 staff is a nurse" — it is "1 nurse for every 8 patients." Two completely different statements share the same colon notation depending on what you put on each side.',
            learnerTask:
              'For each, write the simplified colon form, classify part-to-part vs part-to-whole, and state what the ratio answers in one sentence. (a) A class has 12 boys and 18 girls; girls-to-total ratio. (b) Office supplies cost $400 of an $1,800 budget; supplies-to-budget ratio. (c) Concrete mix: 2 parts sand to 5 parts gravel; sand-to-gravel ratio. (d) Investment portfolio: $40k stocks, $20k bonds, $40k cash; stock-to-total ratio.',
            answerKey:
              '(a) 18:30 → 3:5; part-to-whole; "3 of every 5 students are girls" (60%). (b) 400:1,800 → 2:9; part-to-whole; "supplies are 2/9 of the budget" (≈22%). (c) 2:5; part-to-part; "for every 2 parts sand, use 5 parts gravel." (d) 40:100 → 2:5; part-to-whole; "stocks are 2/5 of the portfolio" (40%). Strong answer always names the ratio TYPE before computing percentages; weak answer skips classification and risks calling a part-to-part ratio "40% of something" it isn\'t.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Read the ratio out loud',
            content:
              'A portfolio holds $30,000 in stocks and $20,000 in bonds. Write (a) part-to-part stock-to-bond simplified, (b) part-to-whole stock-to-total simplified and as percentage. Confirm: 3:2; 3:5 = 60%.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Ratio traps',
            content:
              "Comparing units that don't match. Forgetting to simplify. Treating part-to-part ratios as percentages.",
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Staffing, mixes, and metrics',
            content:
              'A retail manager keeps a 1:10 staff-to-customer ratio at peak hours. A concrete supplier mixes 1:2:3 cement-sand-gravel.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Five real ratios from your context',
            content:
              'Pick five real ratios. Write each in colon form, simplify, and label part-to-part or part-to-whole.',
            answerKey:
              'Sample (pause numbers): stocks $30k, bonds $20k, total $50k → part-to-part 30:20 = 3:2; part-to-whole stocks:total 30:50 = 3:5 = 60%. Another: 12 boys / 18 girls → 2:3 part-to-part; boys:total 12:30 = 2:5 = 40%.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 3.1 summary',
            title: 'Three forms, two flavours',
            content:
              'Ratios live in colon, fraction, or word form. They come in two flavours: part-to-part and part-to-whole.',
          },
        ],
      },
      {
        lessonNumber: '3.2',
        title: 'Working with Proportions',
        estimatedMinutes: 40,
        learnerGoal:
          'Set up and solve proportion problems using cross-multiplication for scaling, pricing, and unknown quantities.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'What a proportion is',
            title: 'Two ratios set equal',
            content:
              'A proportion is an equation that says two ratios are equal: 2:3 = 4:6, or 2/3 = 4/6.',
          },
          {
            type: 'worked_example',
            eyebrow: 'The setup that prevents most errors',
            title: 'Keep the same kind of thing on top, the same kind on the bottom',
            content:
              'Recipe for 4 servings uses 2 cups flour. How much flour for 10? 4/2 = 10/x → 4x = 20 → x = 5 cups.',
            examples: [
              'Map: 1 inch = 50 miles → 1/50 = 3.5/x → x = 175 miles.',
              'Pricing: 3 lb cost $12 → 3/12 = 5/x → 3x = 60 → $20 for 5 lb.',
              'Staffing: 1 server per 15 customers → 1/15 = 4/x → x = 60.',
            ],
          },
          {
            type: 'worked_example',
            eyebrow: 'Cross-multiplication',
            title: 'The mechanical step that finds the unknown',
            content:
              'Production: 150 units in 3 hours; how many in 8 hours? 3/150 = 8/x → x = 400 units. Mixture: 1:4 cleaner-to-water; water for 2 cups cleaner? 1/4 = 2/x → x = 8 cups.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Are these two ratios proportional?',
            title: 'Three ways to check',
            content:
              'Cross-multiply, simplify both, or convert to decimals. Example: are 2:3 and 8:12 the same ratio? Cross-multiply: 2 × 12 = 24 and 3 × 8 = 24 ✓. Simplify: 8/12 = 2/3 ✓. Decimals: 2/3 = 0.667 and 8/12 = 0.667 ✓. Three independent checks should all agree; if any one disagrees, you have a typo.',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice',
            title: 'Catering scale-up with cross-multiplication',
            content:
              'Goal: a salad recipe for 8 people uses 600 g greens, 240 g feta, 12 olives. Scale to 22 guests for an event.\n\nStep 1 — Set up the proportion using consistent units. People-to-greens: 8/600 = 22/x → cross-multiply: 8x = 600 × 22 = 13,200 → x = 13,200 / 8 = 1,650 g greens.\n\nStep 2 — Feta: 8/240 = 22/y → 8y = 240 × 22 = 5,280 → y = 660 g feta.\n\nStep 3 — Olives: 8/12 = 22/z → 8z = 12 × 22 = 264 → z = 33 olives.\n\nStep 4 — Sanity check: scale factor = 22/8 = 2.75. Greens 600 × 2.75 = 1,650 ✓; feta 240 × 2.75 = 660 ✓; olives 12 × 2.75 = 33 ✓.\n\nReasonableness: 22 is roughly 3× of 8 (actually 2.75×); each ingredient should be ~3× larger. All three confirm.',
            learnerTask:
              'A construction crew lays 75 m² of tile in 5 hours. How many m² in a 12-hour day? Set up the proportion, cross-multiply, and verify with the scale factor.',
            answerKey:
              'Set up: 5/75 = 12/x → 5x = 75 × 12 = 900 → x = 180 m². Verify: scale factor = 12/5 = 2.4; 75 × 2.4 = 180 ✓. Strong answer cross-multiplies AND verifies via scale factor; weak answer only does one of the two and risks a setup error.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'One scaling rep',
            content:
              'A 1:4 cleaner-to-water mix; you have 750 mL of cleaner. Set up: 1/4 = 750/x → x = 4 × 750 = 3,000 mL = 3 L of water. Verify: 750 + 3,000 = 3,750 mL of solution at the right ratio.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Proportion traps',
            content:
              'Mixing units across the proportion. Treating part-to-part ratios as if they were the whole.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Catering, construction, currency',
            content:
              'Catering: scale 8 to 20. Construction: 100 units to 1,000. Currency: 1 USD = 130 KES, 425 USD → 55,250 KES.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Five proportion problems',
            content:
              '(1) 4 servings → 10, 2 cups flour scaled. (2) 1 inch = 50 miles, 3.5 inches. (3) 3 lb $12, 5 lb cost. (4) 1:4 cleaner-water, 2 cups cleaner. (5) 150 units in 3 h → 8 h.',
            answerKey: '5 cups; 175 miles; $20; 8 cups; 400 units.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 3.2 summary',
            title: 'Set it up, cross-multiply, solve',
            content: 'Almost every scaling, pricing, and staffing question is a proportion.',
          },
        ],
      },
      {
        lessonNumber: '3.3',
        title: 'Unit Rates and Unit Pricing',
        estimatedMinutes: 40,
        learnerGoal:
          'Calculate unit rates and unit prices to compare value across package sizes, service tiers, and pay structures.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'What a unit rate is',
            title: 'Per one of something',
            content:
              'A unit rate is a ratio whose denominator is 1: miles per hour, dollars per pound, units per hour, words per minute.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Unit pricing in the aisle',
            title: 'Two products, one fair comparison',
            content:
              'Option A: 12 oz for $3.60 → $0.30/oz. Option B: 16 oz for $4.48 → $0.28/oz. B wins per oz.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Wage comparisons',
            title: 'Annualise everything before comparing',
            content:
              'Job A: $60,000/year. Job B: $30/hour × 2,080 = $62,400/year. Job C: $2,500 biweekly × 26 = $65,000/year.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Cost per unit in business',
            title: 'The number that should sit next to every product',
            content:
              'Manufacturing cost per unit: total cost ÷ units produced. Example: $50,000 of materials and labour to produce 2,000 widgets → $25/unit. Services cost per hour: total fixed cost ÷ billable hours. Example: $8,000 monthly rent + insurance + tools ÷ 160 billable hours = $50/hour. Knowing per-unit cost lets you set price floors honestly: a $25 unit cannot be sold sustainably at $19.99 even on promotion.',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice',
            title: 'Compare three real shopping options',
            content:
              'Goal: choose the best per-unit deal for olive oil.\n\nOption A: 750 mL bottle for $14.99.\nOption B: 1 L bottle for $18.49.\nOption C: 3 L tin for $48.99.\n\nStep 1 — Convert all to same unit (per 100 mL).\nA: 14.99 ÷ 7.5 = $2.00 per 100 mL.\nB: 18.49 ÷ 10 = $1.85 per 100 mL.\nC: 48.99 ÷ 30 = $1.633 per 100 mL.\n\nStep 2 — Rank: C ($1.63) < B ($1.85) < A ($2.00). C wins per unit.\n\nStep 3 — Sanity check ranking via scale: A is the smallest and most expensive per unit (typical retail); C is largest and cheapest (bulk discount). Ranking matches expectation.\n\nStep 4 — Decide whether bulk wins for YOU. C saves $0.37/100 mL but requires you to actually use 3 L before it goes off (12-month shelf life typical). If you cook 100 mL/week, that\'s 30 weeks — fits inside shelf life. If you cook 20 mL/week, you\'d throw out half. Cheapest per unit ≠ best value for you if you waste it.',
            learnerTask:
              'A coffee shop is comparing two bean suppliers. Supplier X: 5-lb bag at $86. Supplier Y: 12-lb bag at $192. Which is cheaper per pound, and by how much?',
            answerKey:
              'X: 86 ÷ 5 = $17.20/lb. Y: 192 ÷ 12 = $16.00/lb. Y is cheaper by $1.20/lb (about 7% lower). Verify with scale: per 12 lb, X would cost 12 × 17.20 = $206.40 vs Y at $192 → save $14.40 per 12 lb. Strong answers always include the per-unit difference AND the dollar impact at a meaningful scale; weak answers only state which is cheaper.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Pick the better deal',
            content:
              'Internet plans: A $50/100 Mbps → $0.50/Mbps. B $70/200 Mbps → $0.35/Mbps. C $90/300 Mbps → $0.30/Mbps. Plan C wins per Mbps. But ask: do you need 300 Mbps? Cheapest per unit isn\'t always best value if you don\'t use the units.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Unit-rate traps',
            content:
              'Comparing prices without normalising to the same unit. Confusing cheapest per unit with best value.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Shopping, hiring, freelancing',
            content:
              'Grocery aisles often print unit prices. A freelancer setting hourly rates needs to know cost per billable hour.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Five unit-rate calculations',
            content:
              '(1) 240 units in 8 hours. (2) $52,000/year → $/hour at 2,080. (3) 12 oz $3.60 vs 16 oz $4.48. (4) 450 words in 5 minutes. (5) Annualise three offers.',
            answerKey:
              '30 units/hour; $25/hour; B wins; 90 wpm; $60,000, $62,400, $65,000.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 3.3 summary',
            title: 'Per one — always',
            content: 'Convert any quantity to a per-one rate and you can compare anything to anything.',
          },
        ],
      },
      {
        lessonNumber: '3.4',
        title: 'Practical Scaling and Comparisons',
        estimatedMinutes: 40,
        learnerGoal:
          'Scale recipes, production runs, and mixtures up and down, and use ratios to make business and lifestyle comparisons.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Scaling is multiplication',
            title: 'Find the scaling factor, multiply each ingredient',
            content:
              'Scaling factor = desired ÷ original. To go from 4 servings to 10, factor = 2.5.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 1 — Recipe scale-up',
            title: 'From 8 servings to 20',
            content:
              'Given: original recipe (serves 8) uses 2 cups flour, 3 eggs, 1.5 cups milk. Scale to 20 servings.\n\nFormula: scaling factor = target ÷ original; scaled amount = original × factor.\n\nFactor: 20 ÷ 8 = 2.5.\n\nFlour: 2 × 2.5 = 5 cups.\nEggs: 3 × 2.5 = 7.5 → round up to 8 (you can\'t use half an egg cleanly).\nMilk: 1.5 × 2.5 = 3.75 cups (3 cups + 12 tablespoons, since 1 cup = 16 tbsp).\n\nReasonableness: 20 is 2.5× of 8, so each ingredient should grow ~2.5×. Flour 2 → 5 ✓; eggs round up; milk 1.5 → 3.75 ✓. Bakery rule: round eggs up, never down.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 2 — Mixture ratio at scale',
            title: 'Concrete batch with parts arithmetic',
            content:
              'Given: 1:2:3 cement:sand:gravel mix needed for 60 wheelbarrows of concrete.\n\nFormula: total parts = sum of ratio terms; amount per part = total ÷ total parts; each component = parts × amount per part.\n\nStep 1 — Total parts: 1 + 2 + 3 = 6.\n\nStep 2 — Amount per part: 60 ÷ 6 = 10 wheelbarrows per part.\n\nStep 3 — Each component:\nCement: 1 × 10 = 10 wheelbarrows.\nSand: 2 × 10 = 20 wheelbarrows.\nGravel: 3 × 10 = 30 wheelbarrows.\n\nVerify: 10 + 20 + 30 = 60 ✓.\n\nReasonableness: gravel is the largest share (3/6 = half the mix); sand is one-third; cement is one-sixth. Mix proportions match expected concrete profile.',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice',
            title: 'Scale a production run with mixed units',
            content:
              'Goal: a paint factory produces 1,000 liters of mid-blue paint using 600 L white base, 300 L blue tint, 100 L conditioner. Scale down to a 250-L test batch.\n\nStep 1 — Factor: 250 ÷ 1,000 = 0.25 (or 1/4).\n\nStep 2 — Each component:\nWhite base: 600 × 0.25 = 150 L.\nBlue tint: 300 × 0.25 = 75 L.\nConditioner: 100 × 0.25 = 25 L.\n\nStep 3 — Verify: 150 + 75 + 25 = 250 L ✓. Ratio check: 150 : 75 : 25 simplifies to 6:3:1 = original 600:300:100 ratio ✓.\n\nStep 4 — Real-world caveat: physical mixing of paint loses ~2% to equipment surfaces, so the test batch should target ~2% extra of each component to actually deliver 250 L of usable paint. That is a process consideration on top of the math.',
            learnerTask:
              'A 5-acre farm uses 800 lb seed, 1,200 lb fertilizer, and 200 lb soil amendment. The neighbour has 12 acres. How much of each does the neighbour need? Show factor, each component, and verification.',
            answerKey:
              'Factor: 12/5 = 2.4. Seed: 800 × 2.4 = 1,920 lb. Fertilizer: 1,200 × 2.4 = 2,880 lb. Soil amendment: 200 × 2.4 = 480 lb. Verify: total per acre on 5-acre = (800+1200+200)/5 = 440 lb/acre; on 12-acre = 12 × 440 = 5,280 lb total. Sum of scaled = 1,920 + 2,880 + 480 = 5,280 ✓. Strong answer verifies via two routes (component-by-component AND total-per-acre); weak answer only does one and risks an arithmetic slip.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Mixtures must keep the ratio',
            title: 'Concrete, cleaner, fertiliser, paint',
            content:
              'For any 1:2:3 mixture wanted in 30 units total: total parts = 6; per part = 30 ÷ 6 = 5; cement = 5, sand = 10, gravel = 15. Verify by summing: 5 + 10 + 15 = 30 ✓.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Comparison ratios in business',
            title: 'Margin, turnover, debt-to-equity',
            content:
              'Margin: $40 ÷ $100 = 40%. Inventory turnover: $500k ÷ $50k = 10:1. Debt/equity: $200k ÷ $300k = 2:3.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Scale a real recipe',
            content:
              'Take a recipe. Choose a target serving count. Compute the scaling factor and scaled quantities.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Scaling traps',
            content:
              'Scaling only some ingredients. Rounding eggs the wrong direction in baking. Assuming overhead scales linearly.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Catering, manufacturing, finance',
            content:
              'Catering scales family-style to event-style. A factory scales test batches.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Three scaling problems',
            content:
              '(1) Scale 4-serving recipe (2 cups flour, 3 eggs, 1.5 cups milk) to 12. (2) Scale 1,000-unit run with 500 lb material A to 250 units. (3) 1:2:3 cement-sand-gravel for 60 units of mix.',
            answerKey:
              '(1) 6 cups, 9 eggs, 4.5 cups milk. (2) 125 lb A. (3) cement 10, sand 20, gravel 30.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 3.4 summary',
            title: 'Find the factor, multiply, sanity-check',
            content:
              'Scaling and comparison ratios are the daily moves of catering, manufacturing, and business reporting.',
          },
        ],
      },
    ],
    practiceLab: {
      title: 'Module 3 Practice Lab — Compare and Scale',
      durationMinutes: 30,
      learnerGoal:
        'Use ratios, proportions, and unit rates on five real-world micro-scenarios.',
      scenarios: [
        {
          id: 'm03-lab-1',
          prompt:
            'Unit price comparison: 750 mL cooking oil for KES 360 vs 1.5 L for KES 690. Which is the better unit price?',
          answerKey:
            '750 mL: KES 0.48/mL. 1.5 L: KES 0.46/mL. The 1.5 L is better per mL.',
        },
        {
          id: 'm03-lab-2',
          prompt: 'Proportion: a recipe for 6 servings calls for 2 cups rice. Scale to 15 servings.',
          answerKey: 'Factor 2.5. Rice: 5 cups.',
        },
        {
          id: 'm03-lab-3',
          prompt:
            'Job offers: $58,000/year vs $29/hour at 40 hrs/week vs $2,300 biweekly. Annualise each and rank.',
          answerKey:
            '(a) $58,000; (b) $60,320; (c) $59,800. Hourly job > biweekly > annual.',
        },
        {
          id: 'm03-lab-4',
          prompt:
            'Mix: a 1:2:3 cement-sand-gravel ratio is used for 24 wheelbarrows of mix. How many of each?',
          answerKey: 'Per part 4. Cement 4, sand 8, gravel 12.',
        },
        {
          id: 'm03-lab-5',
          prompt:
            'Business: a small shop has annual sales of $400,000 and average inventory of $50,000. Compute and interpret turnover.',
          answerKey:
            '$400,000 ÷ $50,000 = 8:1. Inventory turns over 8 times a year.',
        },
      ],
    },
    moduleQuiz: [
      {
        id: 'm03-q1',
        question: 'Simplify the ratio 12:18 to lowest terms.',
        type: 'calculation',
        correctAnswer: '2:3',
        explanation: '12 ÷ 6 = 2; 18 ÷ 6 = 3.',
        relatedLesson: '3.1',
        difficulty: 'easy',
      },
      {
        id: 'm03-q2',
        question:
          'A class has 12 boys and 18 girls. What is the part-to-whole ratio of boys to total students?',
        type: 'multiple_choice',
        options: ['2:3', '2:5', '3:5', '12:30'],
        correctAnswer: '2:5',
        explanation: 'Total = 30. 12:30 = 2:5 = 40%.',
        relatedLesson: '3.1',
        difficulty: 'easy',
      },
      {
        id: 'm03-q3',
        question:
          'Recipe for 4 servings uses 2 cups flour. Flour for 10 servings (proportion)?',
        type: 'calculation',
        correctAnswer: '5 cups',
        explanation: '4/2 = 10/x → x = 5 cups.',
        relatedLesson: '3.2',
        difficulty: 'easy',
      },
      {
        id: 'm03-q4',
        question: 'Map: 1 inch = 50 miles. Distance for 3.5 inches?',
        type: 'calculation',
        correctAnswer: '175 miles',
        explanation: '1/50 = 3.5/x → x = 175.',
        relatedLesson: '3.2',
        difficulty: 'easy',
      },
      {
        id: 'm03-q5',
        question: 'Better unit price: 12 oz for $3.60 vs 16 oz for $4.48?',
        type: 'scenario',
        options: ['12 oz at $0.30/oz', '16 oz at $0.28/oz', 'Both equal', 'Cannot tell'],
        correctAnswer: '16 oz at $0.28/oz',
        explanation: '$3.60/12 = $0.30; $4.48/16 = $0.28.',
        relatedLesson: '3.3',
        difficulty: 'medium',
      },
      {
        id: 'm03-q6',
        question:
          'Annualise the higher offer: $30/hour at 40 hrs/week vs $2,500 biweekly (26 periods).',
        type: 'calculation',
        correctAnswer: '$2,500 biweekly = $65,000/year > $30/hour = $62,400/year',
        explanation: '$30 × 2,080 = $62,400; $2,500 × 26 = $65,000.',
        relatedLesson: '3.3',
        difficulty: 'medium',
      },
      {
        id: 'm03-q7',
        question:
          'A 1:4 cleaner-to-water ratio is used. You pour 750 mL cleaner. Water needed?',
        type: 'calculation',
        correctAnswer: '3,000 mL (3 L)',
        explanation: '1/4 = 750/x → x = 3,000 mL.',
        relatedLesson: '3.2',
        difficulty: 'medium',
      },
      {
        id: 'm03-q8',
        question:
          'A machine produces 150 units in 3 hours. Units in 8 hours?',
        type: 'calculation',
        correctAnswer: '400 units',
        explanation: 'Unit rate 50/hour; 50 × 8 = 400.',
        relatedLesson: '3.2',
        difficulty: 'medium',
      },
      {
        id: 'm03-q9',
        question:
          'Annual sales $400,000, average inventory $50,000. Inventory turnover ratio?',
        type: 'scenario',
        options: ['8:1', '1:8', '10:1', '5:1'],
        correctAnswer: '8:1',
        explanation: '$400,000 ÷ $50,000 = 8:1.',
        relatedLesson: '3.4',
        difficulty: 'hard',
      },
      {
        id: 'm03-q10',
        question:
          'A 1:2:3 cement-sand-gravel mix for 30 wheelbarrows of mix. Cement wheelbarrows?',
        type: 'calculation',
        correctAnswer: '5 wheelbarrows',
        explanation: 'Total parts 6; per part 5; cement = 1 part = 5.',
        relatedLesson: '3.4',
        difficulty: 'hard',
      },
    ],
    moduleSummary:
      'You can read and write ratios in three forms, distinguish part-to-part from part-to-whole, set up and solve proportions reliably, calculate unit rates and unit prices to compare value across sizes and pay structures, and scale recipes, mixes, production runs, and business metrics.',
    completionChecklist: [
      'I can write the same ratio in colon, fraction, and word form, simplified.',
      'I can decide whether a question needs a part-to-part or part-to-whole ratio.',
      'I can set up a proportion with consistent units and solve by cross-multiplication.',
      'I can compute a unit price and use it to compare two package sizes.',
      'I can annualise an hourly, weekly, biweekly, or monthly pay quote.',
      'I can scale a recipe, batch, or mix up or down without distorting the ratio.',
      'I can interpret common business ratios (margin, turnover, debt-to-equity) at a learner level.',
    ],
  },

  // ============================================================
  // MODULE 4 — Measurement, Units, Conversions, and Precision
  // ============================================================
  {
    moduleNumber: 4,
    slug: 'measurement-units-conversions-precision',
    title: 'Measurement, Units, Conversions, and Precision',
    durationMinutes: 160,
    level: 'Foundational',
    prerequisites: [
      'math-confidence-number-sense',
      'fractions-decimals-percentages-estimation',
      'ratios-proportions-unit-rates-comparisons',
    ],
    overview:
      'Measurement is where math touches the physical world. This module makes you fluent in the two main systems (US customary and metric / SI), confident in converting within and between them, and careful with the precision your tool and your decision actually require.',
    whyThisMatters: [
      'International work, recipes, and shipping all live across measurement systems.',
      'Construction, manufacturing, and trades depend on accurate area, perimeter, and volume calculations.',
      'Tolerance and significant figures separate professional measurement from guesswork.',
      'Time conversions (hourly to annual, elapsed time, billable hours) underpin pay and project work.',
      'Most measurement errors are unit errors — getting units right is half the calculation.',
    ],
    learningObjectives: [
      'Identify when to use US customary vs metric (SI) units',
      'Convert within US customary units (length, weight, volume) and within metric units',
      'Convert between systems using standard conversion factors',
      'Calculate perimeter, area, and basic volume for rectangles, squares, triangles, and circles',
      'Convert time units and apply hourly-to-annual conversions',
      'Apply appropriate precision to money, measurements, and intermediate calculations',
      'Read and apply tolerance ranges in quality and safety contexts',
      'Avoid the most common measurement and unit-conversion errors',
    ],
    lessons: [
      {
        lessonNumber: '4.1',
        title: 'Measurement Systems Overview',
        estimatedMinutes: 25,
        learnerGoal: 'Understand the two main measurement systems and when to use each.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'US customary',
            title: 'Inches, pounds, gallons, Fahrenheit',
            content:
              '12 in/ft, 16 oz/lb, 8 fl oz/cup. Internal conversions are not based on tens — you have to memorise them.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Metric / SI',
            title: 'Millimetres, grams, litres, Celsius',
            content:
              'Everything is based on tens: 1,000 g = 1 kg, 100 cm = 1 m, 1,000 mL = 1 L. Prefixes (kilo ×1,000, centi ÷100, milli ÷1,000) reusable across length, mass, and volume.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'When to use each',
            title: 'Pick the system your audience and tool use',
            content:
              'US customary in domestic US construction, manufacturing, recipes, and road signs. Metric in international business, science, medicine, and most countries.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'cm → inches',
            content:
              'Given: shelf length 96 cm.\n\nFormula: inches = cm ÷ 2.54.\n\nSubstitute: 96 ÷ 2.54.\n\nCalculate: ≈ 37.795…\n\nAnswer: about 37.8 in (round to what your tape shows).\n\nReasonableness: 2.54 × 38 ≈ 96.5 ✓',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice — Pick the system, then convert',
            title: 'Three real conversions across systems',
            content:
              'Goal: practise picking the right system for the audience, then converting cleanly.\n\n(1) A US-based baker is sourcing flour from a French supplier whose price is "€1.20 per kg." How much flour should the baker order if the recipe calls for 8 lb? Convert to kg first.\nConversion: 1 kg ≈ 2.205 lb → 8 ÷ 2.205 = 3.628 kg.\nRound up to 3.7 kg for a clean order.\nCost: 3.7 × €1.20 = €4.44.\n\n(2) A Kenyan freight company quoting a US client gives a package size in cm: 60 × 40 × 30 cm. Convert to inches for the US waybill.\n60 cm ÷ 2.54 = 23.62 in → round up to 24 in.\n40 cm ÷ 2.54 = 15.75 in → round up to 16 in.\n30 cm ÷ 2.54 = 11.81 in → round up to 12 in.\nWaybill reads ~24 × 16 × 12 in. (Rounding up favours the carrier; rounding down can cause re-grading at intake.)\n\n(3) A recipe says "1 cup of milk." A learner only has a 250 mL measuring jug. How much should they pour?\n1 US cup ≈ 237 mL → pour to about the 240 mL line on the 250 mL jug. (Close enough for cooking.)\nNote: the UK / Commonwealth "metric cup" is 250 mL exactly — if the recipe is from a UK source, use the full jug. Always confirm the recipe\'s system of origin before converting.\n\nReasonableness in each case: the US baker doesn\'t reorder in pounds because the supplier prices in kg — convert ONCE at the order, then keep using kg in the bakery; the freight company rounds in the direction the carrier expects; the recipe pour is "close enough" because 13 mL out of 240 mL is ~5% — well inside cooking tolerance.',
            learnerTask:
              'Convert each, naming the conversion factor and the rounding direction. (a) A road trip of 350 mi to km. (b) A package weighing 22 lb to kg, for an international waybill. (c) A patient\'s height of 5 ft 10 in to cm, for a metric medical form.',
            answerKey:
              '(a) 350 mi × 1.609 km/mi = 563.15 km. Round to 563 km for a trip plan; round up to 565 km for fuel-budgeting safety. (b) 22 lb × 0.4536 kg/lb = 9.98 kg ≈ 10 kg. Round up to 10 kg for the waybill (carriers grade upward). (c) 5 ft 10 in = 70 in × 2.54 cm/in = 177.8 cm. Round to 178 cm for the form (medical forms typically take whole cm). Strong answer always names the rounding direction and why; weak answer just reports the converted number with no rounding intent.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Match the prefix',
            content: 'kilo-, centi-, milli- → ×1,000, ÷100, ÷1,000.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Suppliers, recipes, shipping',
            content:
              'A US baker importing French ingredients sees grams. A Kenyan exporter quoting a US client is asked for pounds and inches.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Build a one-page reference',
            content:
              'Write a one-page reference with the seven most common conversions you use: in/cm, ft/m, mi/km, oz/g, lb/kg, cup/mL, gal/L.',
            answerKey:
              'Include at least these factors: 1 in = 2.54 cm; 1 m = 3.281 ft; 1 mi ≈ 1.609 km; 1 oz ≈ 28.35 g; 1 kg ≈ 2.205 lb; 1 US cup ≈ 237 mL; 1 US gal ≈ 3.785 L. Test: 96 cm ÷ 2.54 ≈ 37.8 in (matches lesson 4.1 worked example).',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 4.1 summary',
            title: 'Two systems, one habit',
            content: 'Know which system your work is in, and use the right unit on the page.',
          },
        ],
      },
      {
        lessonNumber: '4.2',
        title: 'Length, Weight, and Volume Conversions',
        estimatedMinutes: 40,
        learnerGoal:
          'Convert within and between systems for length, weight, and volume using standard conversion factors.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Within US customary',
            title: 'Memorise the small set',
            content:
              '12 in = 1 ft; 3 ft = 1 yd; 5,280 ft = 1 mi. 16 oz = 1 lb; 2,000 lb = 1 ton. 8 fl oz = 1 cup; 4 quarts = 1 gallon (1 gal = 128 fl oz).',
          },
          {
            type: 'worked_example',
            eyebrow: 'Within metric',
            title: 'Move the decimal three places',
            content:
              '2.5 m × 100 = 250 cm. 3.5 km × 1,000 = 3,500 m. 2,500 g ÷ 1,000 = 2.5 kg.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Between systems',
            title: 'Conversion factors you actually need',
            content:
              '1 in = 2.54 cm; 1 mi ≈ 1.609 km. 1 lb ≈ 0.4536 kg; 1 kg ≈ 2.205 lb. 1 cup ≈ 237 mL; 1 gal ≈ 3.785 L.',
            examples: [
              '50 mi × 1.609 = 80.45 km.',
              '150 lb × 0.4536 ≈ 68 kg.',
              '20 L ÷ 3.785 ≈ 5.28 gal.',
            ],
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice',
            title: 'Three conversions, narrated',
            content:
              '(1) 5 ft 8 in = 68 in. (2) 150 cm = 1.5 m. (3) 75 kg ≈ 165 lb.',
            answerKey:
              '(1) 5×12+8 = 68 in. (2) 150 ÷ 100 = 1.5 m. (3) 75 × 2.205 ≈ 165.4 lb (or 75 ÷ 0.4536).',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Three quick conversions',
            content:
              '(a) 36 in to ft; (b) 2,500 g to kg; (c) 1 gal to litres. Confirm: 3 ft; 2.5 kg; 3.785 L.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Conversion traps',
            content:
              'Using the conversion factor in the wrong direction. Forgetting unit cancellation.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Recipes, shipping, travel',
            content:
              '250 mL milk converts to roughly 1 cup. A 15 lb shipping package is 6.8 kg. A 450 km road trip is about 280 mi.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Eight conversion reps',
            content:
              '(1) 36 in → ft; (2) 5 ft → in; (3) 2.5 m → cm; (4) 3 km → m; (5) 2.5 lb → oz; (6) 1.5 kg → g; (7) 8 fl oz → mL; (8) 1 gal → L.',
            answerKey:
              '3 ft; 60 in; 250 cm; 3,000 m; 40 oz; 1,500 g; ≈237 mL; ≈3.785 L.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 4.2 summary',
            title: 'Factors and direction',
            content: 'Pick the right factor; pick the right direction; write units beside numbers.',
          },
        ],
      },
      {
        lessonNumber: '4.3',
        title: 'Area, Perimeter, and Material Estimation',
        estimatedMinutes: 35,
        learnerGoal:
          'Calculate perimeter, area, and basic volume for everyday shapes and use them to estimate materials.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Formulas to know cold',
            title: 'Five shapes, five formulas',
            content:
              'Rectangle: P = 2(L + W); A = L × W. Square: P = 4 × side; A = side². Triangle: A = (base × height) ÷ 2. Circle: A = πr². 1 sq yd = 9 sq ft; 1 acre = 43,560 sq ft.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'Flooring with a waste allowance',
            content:
              '12 ft × 15 ft = 180 ft². With 10% waste: 198 ft². Order 200. Painter: 1,200 ft² ÷ 400 ft²/gallon = 3 gallons.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Mixed-shape area',
            title: 'Break it into rectangles',
            content:
              'L-shaped office 14×20 with 4×6 alcove subtracted: 280 − 24 = 256 ft²; with 10% waste 282.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Two area calculations',
            content:
              'Square 8 ft sides: 64 ft². Circle r=5 ft: 78.5 ft².',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Area traps',
            content:
              'Confusing perimeter with area. Forgetting waste allowance. Using wrong triangle formula.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Home projects and quotes',
            content: 'Flooring quote starts with a square-foot calculation.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Five real estimates',
            content:
              '(1) Perimeter 12×15. (2) Area 12×15. (3) sq yd in 180 ft². (4) Paint for 1,200 ft² at 400 ft²/gal. (5) Flooring 12×15 with 10% waste.',
            answerKey: '54 ft; 180 ft²; 20 yd²; 3 gallons; 198 ft².',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 4.3 summary',
            title: 'Five shapes, real material',
            content: 'Always include the waste allowance.',
          },
        ],
      },
      {
        lessonNumber: '4.4',
        title: 'Time Conversions and Scheduling Math',
        estimatedMinutes: 30,
        learnerGoal:
          'Convert between time units, calculate elapsed time, and apply hourly-to-annual conversions.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Basic time conversions',
            title: 'Memorise the small chain',
            content:
              '60 s = 1 min; 60 min = 1 h; 24 h = 1 d; 7 d = 1 wk; 52 wk ≈ 1 yr. Standard work year 2,080 h.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example',
            title: 'Hours, minutes, and decimals',
            content:
              '2.5 h = 150 min. 135 min = 2.25 h. 3 h 45 min = 3.75 h. 8.5 h × $18/h = $153.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Elapsed time',
            title: 'Cross noon carefully',
            content: '9:15 AM to 2:45 PM: 2 h 45 min + 2 h 45 min = 5 h 30 min = 5.5 h.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Hourly to annual and back',
            title: 'The 2,080 number',
            content: '$25/hr × 2,080 = $52,000. $60,000/year ÷ 2,080 = $28.85/hr.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Two time conversions',
            content: '90 min = 1.5 h. $32.50/hr × 2,080 = $67,600.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Time traps',
            content:
              'Treating 2.5 hours as 2 hours 50 minutes. Annualising at 2,080 when actual contract is 35-hour weeks.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'Timesheets, billing, scheduling',
            content: 'Freelancer billing uses decimal hours. Payroll uses h-and-min or decimal.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Five time problems',
            content:
              '(1) 2.5 h → min. (2) 180 min → h. (3) 7:30 AM to 4:15 PM. (4) Annualise $25/hr at 2,080. (5) 8.5 h × $18/h.',
            answerKey: '150 min; 3 h; 8 h 45 min; $52,000; $153.',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 4.4 summary',
            title: 'Time is just another unit',
            content: 'Convert decimal hours and h-and-min carefully.',
          },
        ],
      },
      {
        lessonNumber: '4.5',
        title: 'Precision and Tolerance',
        estimatedMinutes: 30,
        learnerGoal:
          'Choose appropriate precision, work within tolerance ranges, and avoid measurement errors that compound.',
        blocks: [
          {
            type: 'concept_explanation',
            eyebrow: 'Match precision to purpose',
            title: 'Where two decimals matter and where they do not',
            content:
              'High precision: money, legal, manufacturing, medication, safety. Medium: cooking, home projects. Low: quick estimates.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Tolerance',
            title: 'Target ± tolerance',
            content:
              'A spec of 10.0 cm ± 0.1 cm means acceptable range 9.9 to 10.1 cm. 500 g ± 5 g: range 495–505; 508 g rejected.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 1 — Tolerance on a nominal weight',
            title: 'Three bags, one spec',
            content:
              'Given: nominal weight 500 g, tolerance ±5 g. Three bags measure 497 g, 503 g, 508 g.\n\nFormula: acceptable if (nominal − tolerance) ≤ measured ≤ (nominal + tolerance).\n\nBand: 495 ≤ m ≤ 505.\n\nTest each:\n497 g — within band ✓.\n503 g — within band ✓.\n508 g — exceeds upper limit by 3 g → ✗ reject.\n\nAnswer: reject the 508 g bag.\n\nReasonableness: tolerance ±1% (5/500) is tight; 508 is +1.6% above nominal — clearly outside band. Bag should be opened, contents weighed precisely, and either rejected or repacked.',
          },
          {
            type: 'worked_example',
            eyebrow: 'Worked example 2 — Stacking tolerances',
            title: 'When two measurements add',
            content:
              'Given: a shelf is built from a 36 in ± 0.5 in plank and a 12 in ± 0.25 in extension piece. What is the combined length and combined tolerance?\n\nFormula: combined nominal = sum of nominals; combined tolerance = sum of tolerances (worst case for additive errors).\n\nNominal length: 36 + 12 = 48 in.\n\nTolerance: 0.5 + 0.25 = 0.75 in.\n\nAcceptable range: 47.25 to 48.75 in.\n\nAnswer: 48 in ± 0.75 in (range 47.25–48.75).\n\nReasonableness: tolerances always grow when you add measurements. Two pieces each within ±1% can together drift up to ±1.5% if both errors point the same way. For tight builds, demand tighter tolerance per piece; for casual, the loose band is fine. Statistical view (root-sum-square, used when errors are independent and random): √(0.5² + 0.25²) = √0.3125 = 0.559 → tighter than 0.75 worst-case but never exceeded.',
          },
          {
            type: 'guided_practice',
            eyebrow: 'Guided practice',
            title: 'Reading a real spec sheet',
            content:
              'Goal: a printed circuit board specifies trace width 0.20 mm ± 0.02 mm. A QC scan finds traces measuring 0.18 mm, 0.205 mm, 0.225 mm, 0.193 mm. Decide accept/reject for each.\n\nStep 1 — Compute band: 0.20 − 0.02 = 0.18; 0.20 + 0.02 = 0.22. Band: 0.18 ≤ m ≤ 0.22.\n\nStep 2 — Test each:\n0.18 mm — at the lower limit, accept (boundary inclusive by convention; some specs use strict < which would reject, so always confirm the spec\'s convention).\n0.205 mm — within band ✓.\n0.225 mm — exceeds upper by 0.005 mm → ✗ reject.\n0.193 mm — within band ✓.\n\nStep 3 — Decision: reject 1 of 4 (the 0.225 mm trace). Note the boundary case (0.18) for QC review.\n\nReasonableness: rejection rate 1/4 = 25% on a small sample is high; alert process engineer and run a larger sample before accepting the lot.',
            learnerTask:
              'A pharmaceutical tablet must weigh 250 mg ± 10 mg. Test these five tablets: 248, 252, 261, 245, 240. State accept/reject for each, the rejection rate, and whether the lot passes a 95% acceptance threshold.',
            answerKey:
              'Band: 240 ≤ m ≤ 260. Tests: 248 ✓; 252 ✓; 261 ✗ (above by 1 mg); 245 ✓; 240 ✓ (boundary). Rejected 1/5 = 20% rejection rate. Lot does NOT pass 95% acceptance (95% threshold means ≤5% can fail; we have 20% failing). Action: hold lot, investigate cause, either rework or destroy. A weak answer would miss the boundary case at 240; a strong answer flags it as boundary and treats it cautiously.',
          },
          {
            type: 'concept_explanation',
            eyebrow: 'Significant figures',
            title: 'How many digits the measurement actually carries',
            content:
              'All non-zero digits are significant. Leading zeros are NOT significant. Trailing zeros after a decimal point ARE significant. 123 has 3 sig figs; 0.0123 has 3; 1.230 has 4 (the trailing zero is real precision); 1,200 is ambiguous (write 1.2 × 10³ for 2 sig figs or 1.200 × 10³ for 4). Reporting more sig figs than your tool measured is a common honesty error in lab and field work.',
          },
          {
            type: 'pause_and_check',
            eyebrow: 'Pause and check',
            title: 'Tolerance check',
            content:
              '500 g ± 5 g. Three bags: 497, 503, 508. Acceptable? Confirm: 497 ✓, 503 ✓, 508 ✗.',
          },
          {
            type: 'common_mistakes',
            eyebrow: 'Watch for these',
            title: 'Precision traps',
            content: 'Rounding intermediate results. Reporting more decimals than data supports.',
          },
          {
            type: 'real_world_application',
            eyebrow: 'Where this shows up',
            title: 'QC, prescriptions, surveys',
            content:
              'QC teams reject batches outside tolerance. Surveys reported with one decimal feel honest.',
          },
          {
            type: 'practice_task',
            eyebrow: 'Practice task',
            title: 'Three precision calls',
            content:
              'Pick three numbers from a recent document. Decide what precision is appropriate.',
            answerKey:
              'Use lesson tolerance drill: 500 g ± 5 g → band 495–505 g. Bags 497 ✓, 503 ✓, 508 ✗. For each of your three numbers, state decimal places kept and one sentence why that matches the decision (money vs measure vs headline %).',
          },
          {
            type: 'summary',
            eyebrow: 'Lesson 4.5 summary',
            title: 'Honest precision',
            content: 'Match precision to the decision; respect tolerance bands.',
          },
        ],
      },
    ],
    practiceLab: {
      title: 'Module 4 Practice Lab — Real Conversions',
      durationMinutes: 30,
      learnerGoal:
        'Apply length, weight, volume, area, and time conversions to four realistic micro-scenarios.',
      scenarios: [
        {
          id: 'm04-lab-1',
          prompt:
            'Convert a European recipe to US measurements: 250 mL milk, 200 g flour, 100 g sugar.',
          answerKey:
            'Milk: 250 ÷ 237 ≈ 1 cup. Flour: 200 ÷ 28.35 ≈ 7 oz. Sugar: 100 ÷ 28.35 ≈ 3.5 oz.',
        },
        {
          id: 'm04-lab-2',
          prompt:
            'International shipping: 18 in × 12 in × 10 in, 15 lb. Convert to metric for the waybill.',
          answerKey:
            '46 × 30 × 25 cm, 6.8 kg.',
        },
        {
          id: 'm04-lab-3',
          prompt:
            'Deck materials: 12 ft × 16 ft deck, 6 in × 12 ft boards, 10% waste allowance.',
          answerKey:
            'Deck area 192 ft²; with 10% waste 211.2 ft². Each board 6 ft²; need 35.2 → order 36 boards.',
        },
        {
          id: 'm04-lab-4',
          prompt:
            'Travel: 450 km trip, 8 L/100 km, 60 L tank. Compute fuel needed and convert to US units.',
          answerKey:
            'Fuel: 36 L ≈ 9.5 gal. Tank 60 L ≈ 15.85 gal — one tank is enough.',
        },
      ],
    },
    moduleQuiz: [
      {
        id: 'm04-q1',
        question: 'How many feet are in 1 mile?',
        type: 'multiple_choice',
        options: ['1,000', '5,280', '10,000', '1,760'],
        correctAnswer: '5,280',
        explanation: '1 mile = 5,280 feet.',
        relatedLesson: '4.2',
        difficulty: 'easy',
      },
      {
        id: 'm04-q2',
        question: 'Convert 5 ft 8 in to total inches.',
        type: 'calculation',
        correctAnswer: '68 inches',
        explanation: '60 + 8 = 68.',
        relatedLesson: '4.2',
        difficulty: 'easy',
      },
      {
        id: 'm04-q3',
        question: '1 kilogram is approximately how many pounds?',
        type: 'multiple_choice',
        options: ['1.5 lb', '2.2 lb', '3.5 lb', '4.5 lb'],
        correctAnswer: '2.2 lb',
        explanation: '1 kg ≈ 2.205 lb.',
        relatedLesson: '4.2',
        difficulty: 'easy',
      },
      {
        id: 'm04-q4',
        question: 'Calculate the area of a room that is 12 ft × 15 ft.',
        type: 'calculation',
        correctAnswer: '180 ft²',
        explanation: '12 × 15 = 180.',
        relatedLesson: '4.3',
        difficulty: 'easy',
      },
      {
        id: 'm04-q5',
        question: 'A floor 12 ft × 15 ft. With 10% waste allowance, order quantity?',
        type: 'calculation',
        correctAnswer: '198 ft² (order 200 ft²)',
        explanation: '180 × 1.10 = 198 ft².',
        relatedLesson: '4.3',
        difficulty: 'medium',
      },
      {
        id: 'm04-q6',
        question: 'Convert 75 kg to pounds (use 1 kg = 2.205 lb).',
        type: 'calculation',
        correctAnswer: '≈165 lb',
        explanation: '75 × 2.205 ≈ 165.4.',
        relatedLesson: '4.2',
        difficulty: 'medium',
      },
      {
        id: 'm04-q7',
        question: 'Convert $25/hour to annual salary at 2,080 working hours.',
        type: 'calculation',
        correctAnswer: '$52,000',
        explanation: '$25 × 2,080 = $52,000.',
        relatedLesson: '4.4',
        difficulty: 'easy',
      },
      {
        id: 'm04-q8',
        question:
          'Spec 500 g ± 5 g. Sample weighs 508 g. Within tolerance?',
        type: 'scenario',
        options: [
          'Yes — within ±10% of target.',
          'No — acceptable range 495–505 g.',
          'Yes — usually rounded to ±10 g.',
          'Cannot tell without rest of batch.',
        ],
        correctAnswer: 'No — acceptable range 495–505 g.',
        explanation: 'Tolerance ±5 g; 508 g outside spec.',
        relatedLesson: '4.5',
        difficulty: 'medium',
      },
      {
        id: 'm04-q9',
        question: 'Calculate elapsed time from 9:15 AM to 2:45 PM.',
        type: 'calculation',
        correctAnswer: '5 hr 30 min (5.5 hours)',
        explanation: '2:45 + 2:45 = 5:30.',
        relatedLesson: '4.4',
        difficulty: 'medium',
      },
      {
        id: 'm04-q10',
        question: 'How many 8 fl oz servings in 1 US gallon?',
        type: 'calculation',
        correctAnswer: '16 servings',
        explanation: '128 ÷ 8 = 16.',
        relatedLesson: '4.2',
        difficulty: 'medium',
      },
      {
        id: 'm04-q11',
        question:
          'A package 18×12×10 in, 15 lb. For an international waybill in metric (cm and kg, rounded), what should you record?',
        type: 'scenario',
        options: [
          '≈46 × 30 × 25 cm; ≈6.8 kg',
          '≈18 × 12 × 10 cm; ≈15 kg',
          '≈46 × 30 × 25 m; ≈6.8 g',
          '≈180 × 120 × 100 mm; ≈15 kg',
        ],
        correctAnswer: '≈46 × 30 × 25 cm; ≈6.8 kg',
        explanation: 'Inches × 2.54 → cm; pounds × 0.4536 → kg.',
        relatedLesson: '4.2',
        difficulty: 'hard',
      },
    ],
    moduleSummary:
      'You can now move between US customary and metric units in all the contexts an adult learner faces, calculate perimeter and area for everyday shapes, plan materials with a waste allowance, run elapsed-time and pay-rate conversions, and choose precision that matches the decision in front of you.',
    completionChecklist: [
      'I can name when to use US customary vs metric.',
      'I can convert within US customary and within metric without a chart.',
      'I can convert between systems for length, weight, and volume.',
      'I can compute perimeter and area for rectangles, squares, triangles, and circles.',
      'I can plan materials including a waste allowance.',
      'I can convert decimal hours, hours-and-minutes, and elapsed time without errors.',
      'I can apply tolerance ranges and refuse false precision.',
    ],
  },
]
