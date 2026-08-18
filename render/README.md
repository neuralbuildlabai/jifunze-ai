# Faceless video render pipeline

Turns a **production brief** (hook + caption segments + topic) into a vertical
1080×1920 MP4 with on-screen captions and background music — **no voiceover, no
manual work**. This is the `render` stage that sits between the autonomy
pipeline's `draft` and `publish-instagram`.

## Cost posture (this is the money-sensitive part)

| Piece | Cost |
|---|---|
| FFmpeg render | Free (runs in GitHub Actions free minutes) |
| Captions | Free (drawn by FFmpeg/ASS) |
| Music | Free (royalty-free tracks bundled in `assets/music/`) |
| **Stock visuals (Pexels)** | **Free** — default provider |
| **AI visuals** | **Paid — OFF by default.** Only bills when `VISUAL_PROVIDER=ai` |
| Storage of the finished MP4 | Supabase Storage free tier |

**Default configuration bills $0.** The only line that ever costs money is
switching the visual provider to `ai`.

## Pluggable visual providers

Mirrors the repo's existing `SignalSourceProvider` pattern. A provider returns a
local path to a vertical background clip for a given brief.

- `providers/stockProvider.ts` — Pexels API (free key). Searches by the brief's
  topic tags, picks a portrait clip, caches by query. **Default.**
- `providers/generatedProvider.ts` — zero-dependency animated gradient rendered
  by FFmpeg. No API, no key, truly $0. Fallback when stock returns nothing.
- `providers/aiProvider.ts` — STUB. Opt-in paid text-to-video. Disabled unless
  `VISUAL_PROVIDER=ai` and a key is set. Documented, not wired to spend.

Select with `VISUAL_PROVIDER=stock|generated|ai` (default `stock`, falls back to
`generated` on any failure so a render never hard-fails on a missing clip).

## Flow

```
brief (Supabase queue)
  → pick visual (stock | generated | ai)
  → FFmpeg: crop 1080×1920, burn animated captions, mix music bed, trim
  → upload MP4 to Supabase Storage (public URL)
  → POST /functions/v1/publish-instagram { video_url, caption, idempotency_key }
```

`publish-instagram` still honours its `IG_PUBLISH_ENABLED` kill switch, so the
whole chain can run end-to-end in rehearsal without anything going public.

## Not built yet (next steps)
- The GitHub Actions cron workflow that runs this on schedule
- Supabase Storage bucket + upload helper
- Server-side scoring feeding the brief queue
