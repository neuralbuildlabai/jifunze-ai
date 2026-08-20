# Faceless video render pipeline

Turns a **production brief** (hook + caption segments + topic) into a vertical
1080×1920 MP4 with the Jifunze.ai treatment burned in — **no voiceover, no
manual work**. This is the `render` stage that sits between the autonomy
pipeline's `draft` and `publish-instagram`.

Operational guide (commands, tiers, troubleshooting):
[`../docs/video-pipeline.md`](../docs/video-pipeline.md).

## Cost posture (this is the money-sensitive part)

| Piece | Cost |
|---|---|
| FFmpeg render | Free (runs in GitHub Actions free minutes) |
| Captions, brand mark, end card | Free (FFmpeg/ASS + bundled art) |
| Music | Free — **but no bed is committed yet.** Drop a royalty-free track at `assets/music/bed.m4a` and it is mixed in automatically; until then renders are silent. |
| **Designed visuals** | **Free** — bundled art, no API. **Default provider** |
| **Stock visuals (Pexels)** | **Free** — optional API key |
| **AI visuals** | **Paid — OFF by default.** Only bills when `VISUAL_PROVIDER=ai` |
| Storage of the finished MP4 | Supabase Storage free tier |

**Default configuration bills $0.** The only line that ever costs money is
switching the visual provider to `ai`.

## Pluggable visual providers

A provider returns a local path to a vertical background clip for a given brief.
Resolution lives in `providers/registry.ts`:

| `VISUAL_PROVIDER` | Provider | Notes |
|---|---|---|
| *(unset)* / `designed` | `designedProvider.ts` | **Default.** Bundled brand background + Ken Burns push + grain. |
| `stock` | `stockProvider.ts` | Pexels portrait B-roll. **Falls back to `designed` without `PEXELS_API_KEY`.** |
| `fallback` | `fallbackProvider.ts` | Flat gradient, no brand art. **Emergency only, never automatic.** |
| `ai` | `aiProvider.ts` | Opt-in paid stub; not wired to any vendor, falls back to `designed`. |
| `generated` | — | **Deprecated** alias, maps to `designed` with a warning. |
| anything else | — | Warns, uses `designed`. |

Nothing ever silently lands on `fallback`.

## What the designed treatment adds

- brand background at `assets/bg/brand-bg.png` — regenerate with
  `npm run video:brand-bg` (`scripts/generate-brand-bg.mjs`, pure Node, palette
  taken from `src/index.css`)
- corner brand mark and end-card lockup at `assets/brand/` — cropped from
  `src/assets/branding/jifunze-logo-light.png`
- kinetic captions with one accent-coloured keyword per beat, a progress bar,
  and a branded end card in the last ~2.6s (`src/captions.ts`)
- platform safe areas respected: nothing drawn below y≈1600 where the
  TikTok/Reels UI sits

## Flow

```
brief (Supabase queue or content bank)
  → script quality gate (orchestrator/scriptQuality.ts)
  → pick visual (designed | stock | ai | fallback)
  → FFmpeg: crop 1080×1920, overlay brand mark, burn captions, end card, mix music
  → loop-artifacts/ (mp4 + poster.jpg + decision.json)
  → upload MP4 to Supabase Storage (public URL)
  → POST /functions/v1/publish-instagram { video_url, caption, idempotency_key }
```

`publish-instagram` still honours its `IG_PUBLISH_ENABLED` kill switch, so the
whole chain can run end-to-end in rehearsal without anything going public.

## Run it

```bash
npm run video:render:designed     # $0, no keys
npm run video:render:stock        # needs PEXELS_API_KEY, else falls back
tsx render/src/render.ts brief.json out.mp4    # from a hand-written brief
```
