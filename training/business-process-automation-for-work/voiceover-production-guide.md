# Business Process Automation for Work — voiceover production guide

This guide supports turning `voiceover-script.md` into module-level (or full-course) MP3 narration for the Jifunze slide course.

## Recommended tools

| Tool | Role |
|------|------|
| [ElevenLabs](https://elevenlabs.io) | High-quality TTS, studio export |
| [PlayHT](https://play.ht) | TTS with pacing control |
| [Descript](https://www.descript.com) | Record, overdub, or generate; easy edits |
| Canva (voiceover) | Simple voiceover on a timeline if you also use Canva for visuals |
| CapCut (desktop) | Assemble slides + audio if you later export video |
| [VEED](https://www.veed.io) | Light online edit and export |
| Synthesia / HeyGen | Optional avatar-led video if you want presenter-style delivery |

## Recommended workflow

1. Read `voiceover-script.md` end to end once for tone (warm professional instructor, medium-slow pace, no hype).
2. Generate **module-level** MP3s first (easier to re-record one chapter than the full hour).
3. Save files under `public/course-assets/business-process-automation-for-work/audio/` using the filenames in `public/.../audio/README.md`.
4. In `src/data/courses/businessProcessAutomationNarration.ts`, set `status` to `'ready'` only after you have verified each file exists and plays in Chrome/Safari/Firefox.
5. The slide player reads `audioSrc` only when status is `ready` (via `getBpaAudioSrcWhenReady`), so incomplete batches should stay on `'planned'`.
6. Test `/learn/business-process-automation-for-work` and each module route with DevTools Network tab: no 404 on audio.
7. Run validation: `npm run verify:business-process-automation`, `npm run verify:course-slide-player`, `npm run lint`, `npx tsc -b --force`, `npm run build`.

## Target filenames (module MP3s)

- `module-1-automation-foundations.mp3`
- `module-2-current-workflow-analysis.mp3`
- `module-3-automation-opportunity-scoring.mp3`
- `module-4-future-workflow-design.mp3`
- `module-5-business-value-risk-roadmap.mp3`

Optional single file: `full-course-voiceover.mp3` (set `fullCourseAudioSrc` in the manifest if you use this instead of per-module tracks).

## Validation note

`npm run verify:business-process-automation` checks that when narration `status` is `'ready'`, every configured audio URL resolves to a real file under `public/`. Do not flip to `'ready'` until then.
