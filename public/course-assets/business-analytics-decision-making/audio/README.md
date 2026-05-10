# Business Analytics Decision-Making — audio

Place generated narration MP3 files here after production. Do not commit placeholder MP3s.

## Expected module filenames

- `module-1-business-analytics-foundations.mp3`
- `module-2-understanding-business-performance-data.mp3`
- `module-3-trend-and-variance-analysis.mp3`
- `module-4-channel-product-customer-analysis.mp3`
- `module-5-diagnosing-the-business-problem.mp3`
- `module-6-turning-analytics-into-action.mp3`

Paths resolve as `/course-assets/business-analytics-decision-making/audio/<filename>`.

## When audio is ready

1. Add the MP3 files under this directory.
2. In `src/data/courses/businessAnalyticsDecisionMakingNarration.ts`, set `status` to `'ready'` only after every referenced file exists and plays in the browser.
3. Run `npm run verify:business-analytics`.

Keep `status` as `'planned'` until then so the UI shows a small “Voiceover coming soon” badge and does not attach broken `<audio src>` URLs.
