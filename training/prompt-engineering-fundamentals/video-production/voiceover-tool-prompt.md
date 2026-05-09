# Voiceover Tool Prompts

Copy-paste prompts and configuration guidance for the four most common AI narration / video tools. Pick whichever fits your existing workflow — the voice direction is the same across all of them.

---

## Voice direction (use this everywhere)

> **Voice style:** Warm, clear, confident, instructional. The narrator sounds like a knowledgeable friend who's done this work, not a marketer or announcer. Use natural contractions throughout. Short sentences mixed with longer ones. Half-beat pauses where the script marks them.
>
> **What to avoid:** Hype-heavy language ("amazing!", "incredible!"). Robotic or stiff cadence. Corporate-promo energy. Reading bullet points like a list — the script is conversational prose.
>
> **Pace:** 130–145 words per minute. Aim for 140. Slow down on technical terms (zero-shot, chain-of-thought, meta-prompting). Speed up slightly during recap or transitional phrases.
>
> **Audience:** Adult learners. Mix of non-technical and lightly-technical. Many are non-native English speakers — over-articulate consonants slightly, but don't sound exaggerated.

---

## Tool 1 — ElevenLabs (recommended for highest voice quality)

**Best for:** AI narration with the most natural, expressive voice quality. Free tier supports short sessions; paid tiers needed for the full course.

### Voice selection

Choose a voice that fits these tags:

- Gender: **either** (course is intentionally voice-neutral)
- Style: **conversational** or **narrative**, NOT "newscaster" or "promotional"
- Accent: **neutral US English** or **neutral UK English** (decide once and stick with it across all six sessions)
- Recommended starter voices: *Rachel* (warm, even-paced), *Daniel* (clear UK), *Adam* (relaxed US)

### Voice settings

- Stability: **0.50** (moderate — keeps consistent feel without sounding robotic)
- Similarity Boost: **0.75**
- Style Exaggeration: **0.20** (subtle expressiveness — avoid 0.5+ which sounds dramatic)
- Speaker Boost: **on**

### Generation prompt for each session

Paste the session text directly. ElevenLabs handles plain prose well — no special markup needed. **Strip the stage directions** (`[SLIDE: …]`, `[pause]`, `[demo opt: …]`) before generating, then re-add `<break time="0.5s" />` for `[pause]` markers if you want explicit pauses in the audio:

```
<break time="0.5s" />
```

### Workflow

1. Open `voiceover-script.md`.
2. Copy Session 1's narration text only — strip stage directions.
3. Paste into ElevenLabs, generate.
4. Listen back, regenerate any sentences that sound off (one sentence at a time costs less credit than full session).
5. Export as WAV (highest quality).
6. Repeat for sessions 2–6.

---

## Tool 2 — Descript (recommended for end-to-end production)

**Best for:** Producers who want voice generation, editing, screen recording, and video assembly in one tool. Slightly less natural voice quality than ElevenLabs, but the integrated workflow saves hours.

### Voice selection

Use **Descript Overdub** with one of these stock voices:

- *Sara* (warm, instructional)
- *Charlie* (clear, friendly)
- *Anika* (neutral, conversational)

If you have a clone of your own voice, that beats stock voices for this kind of content.

### Per-session prompt

Open a new Descript composition. Paste the session narration with stage directions stripped. Descript reads inline `[pause]` markers as actual pauses if you replace them with `[1s]`:

```
…what you actually need. [1s] I want you to think of it…
```

### Workflow

1. Create a Descript project: "Prompt Engineering Fundamentals — Session N".
2. Paste cleaned session narration.
3. Generate Overdub audio.
4. Drop slide screenshots into the timeline at the slide-change cues from `slide-to-voiceover-map.md`.
5. Add the session title card at the start.
6. Export as MP4 with embedded SRT.

---

## Tool 3 — HeyGen / Synthesia (avatar-narrated)

**Best for:** Courses that benefit from a visible human-presented feel without hiring a presenter.

### Avatar selection

- Choose a **business casual** avatar — not formal corporate, not too casual
- Background: **neutral solid color** matching the deck gradient (deep purple #4a3b8c works well), not a fake office set
- Position: avatar in lower-right corner, sized to about 20% of frame, so the slide stays the focal point

### Voice + script

- Use the same voice direction as ElevenLabs (warm, clear, conversational, 140 wpm)
- Paste the session narration *without* stage directions
- HeyGen and Synthesia both interpret natural punctuation as pauses — you don't need to add `[break]` markers

### Workflow

1. Create one project per session.
2. Paste narration into the script field.
3. Set avatar position and background.
4. Generate.
5. Download MP4.
6. Composite with the slide deck in your editor — usually picture-in-picture with the slide as the main video and the avatar as the inset.

---

## Tool 4 — Eleven Studios / generic TTS pipeline

**Best for:** Producers comfortable with command-line / API workflows, or generating narration in bulk.

### API-style prompt template

If using the ElevenLabs API directly:

```bash
curl -X POST "https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}/stream" \
  -H "xi-api-key: $ELEVEN_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "<SESSION NARRATION HERE — STRIP STAGE DIRECTIONS>",
    "model_id": "eleven_turbo_v2_5",
    "voice_settings": {
      "stability": 0.50,
      "similarity_boost": 0.75,
      "style": 0.20,
      "use_speaker_boost": true
    }
  }' \
  --output session-01-narration.mp3
```

Repeat for each session, then composite with slides in your editor of choice.

---

## Cleanup before generating

Before passing any session to a TTS tool, run this find-and-replace on the narration text:

| Find (regex) | Replace with | Why |
|---|---|---|
| `\[SLIDE:[^\]]*\]` | _(empty)_ | Strip slide cues |
| `\[pause\]` | `<break time="0.5s" />` _or_ `[1s]` _or_ blank | Convert pause markers per tool |
| `\[demo[^\]]*\]` | _(empty)_ | Strip demo cues |
| `\*\*[^*]+\*\*` | _(unwrap to plain text)_ | Strip bold markers |
| `\*([^*]+)\*` | `$1` | Strip italic emphasis (some TTS reads asterisks aloud) |
| `\b150 wpm\b` | `one hundred fifty words per minute` | Spell out abbreviations TTS may misread |

---

## Quality check before committing to a full session

Before generating all six sessions:

1. Generate **just the first 90 seconds of Session 1** with your chosen tool and voice settings.
2. Listen on **headphones, then laptop speakers, then phone speaker**.
3. Confirm the voice sounds natural at all three.
4. Confirm the technical terms (zero-shot, chain-of-thought, prompt engineering) are pronounced correctly.
5. Confirm the pace lands at 130–145 wpm — time the 90-second sample, count the words.
6. If anything sounds off, adjust voice settings *now*, before committing.

Once Session 1's first 90 seconds passes the listen-test, generate the rest with confidence.

---

## Recommended choice for Jifunze

For this course specifically, the recommended stack is:

- **ElevenLabs** for narration (highest voice quality, $5 starter tier covers the full course at ~30 minutes of audio)
- **DaVinci Resolve** (free) or **Descript** for video assembly
- **OpenAI Whisper** (free) for first-pass SRT generation, then manual correction

If your team already uses Descript, stay with Descript end-to-end — the slight voice-quality trade-off is worth the workflow integration.
