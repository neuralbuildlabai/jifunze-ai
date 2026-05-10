# Business Analytics Decision-Making — voiceover production guide

## 1. Script location

Primary narration text: `training/business-analytics-decision-making/voiceover-script.md`

## 2. Recommended tools

| Tool | Role |
|------|------|
| [ElevenLabs](https://elevenlabs.io) | Studio-grade TTS export |
| [PlayHT](https://play.ht) | TTS with pacing and SSML |
| [Descript](https://www.descript.com) | Edit, overdub, or generate |
| Canva | Simple timeline voiceover if you combine with visuals |
| CapCut (desktop) | Assemble slides + audio if you export video |
| [VEED](https://www.veed.io) | Lightweight online edits |

## 3. Module-level MP3 workflow

1. Record or generate **one MP3 per module** (six files total) using the script as the single source of truth.
2. Normalize loudness lightly (speech around −16 LUFS integrated is a common podcast target).
3. Save files under `public/course-assets/business-analytics-decision-making/audio/` using the filenames listed in `public/.../audio/README.md`.

## 4. Where MP3 files go

`public/course-assets/business-analytics-decision-making/audio/`

The app resolves public URLs as `/course-assets/business-analytics-decision-making/audio/<filename>`.

## 5. Flipping narration from planned to ready

1. Confirm every file exists on disk and plays in Chrome, Safari, or Firefox.
2. Open `src/data/courses/businessAnalyticsDecisionMakingNarration.ts`.
3. Set `status` to `'ready'` **only** after verification.
4. Run `npm run verify:business-analytics` — it asserts non-empty files when status is `ready`.

## 6. Validation commands

```bash
npm run verify:business-analytics
npm run verify:course-slide-player
npm run verify:business-process-automation
npm run lint
npx tsc -b --force
npm run build
```

## 7. Security

Do not commit API keys, ElevenLabs tokens, or service-account JSON into the repository. Keep credentials in your local password manager or CI secrets only.
