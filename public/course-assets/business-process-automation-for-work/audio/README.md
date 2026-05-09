# Business Process Automation for Work — audio

Place generated narration MP3 files in this directory after production. Do not commit placeholder or silent MP3s.

## Expected filenames

**Full course (optional single file):**

- `full-course-voiceover.mp3`

**Module tracks (recommended for updates and caching):**

- `module-1-automation-foundations.mp3`
- `module-2-current-workflow-analysis.mp3`
- `module-3-automation-opportunity-scoring.mp3`
- `module-4-future-workflow-design.mp3`
- `module-5-business-value-risk-roadmap.mp3`

Paths in the app resolve as `/course-assets/business-process-automation-for-work/audio/<filename>`.

## Wiring audio when files exist

1. Copy or move the final MP3s into this folder (this repo’s `public/` tree).
2. Open `src/data/courses/businessProcessAutomationNarration.ts`.
3. Set `status` to `'ready'` **only** after every referenced file exists and plays in a browser.
4. Confirm `fullCourseAudioSrc` and/or `moduleAudio` URLs match the filenames above.
5. Run `npm run verify:business-process-automation` — it will fail if `status` is `ready` but files are missing.

## Important

- Keep `status` as `'planned'` until real files exist. The UI shows a small “Voiceover coming soon” badge and does not attach `<audio src>` until narration is ready, so learners are not misled.
