# Video Production Guide
## Prompt Engineering Fundamentals (30 Minutes)

---

## 📋 Pre-Production Checklist

### Equipment Setup
- [ ] Screen recording software configured (OBS, Camtasia, ScreenFlow)
- [ ] Microphone tested and audio levels checked
- [ ] Screen resolution set to 1920x1080 or higher
- [ ] Browser ready for slide presentation
- [ ] Code editor with readable font (16-18pt)
- [ ] Terminal with clear font
- [ ] OpenAI API access confirmed

### Software Requirements
- [ ] Screen recording software
- [ ] Web browser for slides
- [ ] Python environment with OpenAI library
- [ ] Code editor (VS Code recommended)
- [ ] Terminal application

### Content Preparation
- [ ] Script reviewed and practiced
- [ ] Slides tested in browser (22 slides total)
- [ ] Code examples tested and working
- [ ] API key configured (`.env` from `.env.example`)
- [ ] Demo responses pre-tested
- [ ] Backup examples prepared

---

## 🎬 Recording Structure

### Recording Sessions

Break the recording into manageable segments:

#### Session 1: Introduction & Core Principles (0:00 - 10:00)
- **Slides 1–8:** Title through Constraints & Examples
- **Recording tips:**
  - Speak clearly at ~150 words/min
  - Use enthusiastic but professional tone
  - Emphasize key terms
  - Show before/after comparisons clearly

#### Session 2: Prompting Techniques (10:00 - 22:00)
- **Slides 9–14 + Live Demos:** Zero-shot through Comparative
- **Recording tips:**
  - Show actual API responses
  - Highlight differences between techniques
  - Use live examples when possible
  - Keep code visible while explaining

#### Session 3: Advanced Patterns (22:00 - 27:00)
- **Slides 15–18 + Live Demos:** System/User through Meta Prompting
- **Recording tips:**
  - Demonstrate real-time prompt creation
  - Show how to iterate and improve
  - Explain reasoning behind choices

#### Session 4: Best Practices & Conclusion (27:00 - 30:00)
- **Slides 19–22:** Common Mistakes through Thank You
- **Recording tips:**
  - Maintain energy level
  - Provide actionable takeaways
  - End with encouragement

---

## 🎥 Recording Guidelines

### Visual Best Practices

**Screen Recording:**
- Resolution: 1920x1080 minimum
- Frame rate: 30 FPS
- Bitrate: 8-10 Mbps
- Format: MP4 (H.264)

**Slide Display:**
- Full screen browser mode
- Smooth transitions
- Clear, readable text
- No desktop distractions

**Code Demonstrations:**
- Font: Fira Code or JetBrains Mono
- Size: 16-18pt minimum
- Theme: High contrast (dark recommended)
- Syntax highlighting enabled
- Line numbers visible

**Live API Demos:**
- Show prompts clearly
- Display responses in full
- Highlight key differences
- Use split screen when comparing

### Audio Best Practices

**Recording Quality:**
- Sample rate: 48kHz
- Bit depth: 24-bit
- Format: WAV or high-quality MP3
- Noise floor: -60dB or lower

**Vocal Delivery:**
- Clear enunciation
- Moderate pace (~150 words/min)
- Varied tone for engagement
- Emphasis on key concepts
- Natural enthusiasm

**Environment:**
- Quiet room
- Minimal echo
- No background noise
- Consistent levels

---

## 📝 Script Timing Guide

### Detailed Timing Breakdown

This table is the source of truth — it matches `script.md` exactly. If you change one, change both.

| Section | Time | Slides | Content Type | Notes |
|---|---|---|---|---|
| Introduction | 0:00–3:00 | 1–3 | Slides | Hook viewers, set expectations |
| Core Principles intro | 3:00 | 4 | Slide | Brief overview before deep-dive |
| Clarity | 3:00–4:30 | 5 | Slide + Examples | Show comparisons clearly |
| Context | 4:30–6:00 | 6 | Slide + Examples | |
| Structure | 6:00–7:30 | 7 | Slide + Examples | |
| Constraints & Examples | 7:30–10:00 | 8 | Slide + Examples | Two principles, one slide |
| Techniques intro | 10:00 | 9 | Slide | Quick overview of all 8 |
| Zero-Shot & Few-Shot | 10:00–13:30 | 10 | Slide + Demo | Live API calls |
| Chain-of-Thought | 13:30–15:30 | 11 | Slide + Demo | Show reasoning process |
| Role & Iterative | 15:30–18:30 | 12 | Slide + Demo | Demonstrate refinement |
| Template & Negative | 18:30–21:00 | 13 | Slide + Examples | Show reusability |
| Comparative | 21:00–22:00 | 14 | Slide + Demo | A/B variations |
| System vs User Prompts | 22:00–23:30 | 15 | Slide + Code | API-level pattern |
| Parameter Tuning | 23:30–25:00 | 16 | Slide + Code | Temperature demo |
| Prompt Chaining | 25:00–26:30 | 17 | Slide | Sequential workflows |
| Meta Prompting | 26:30–27:00 | 18 | Slide | AI as prompt coach |
| Common Mistakes | 27:00–28:00 | 19 | Slide | Practical warnings |
| Testing & Iteration | 28:00–28:45 | 20 | Slide | Process discussion |
| Best Practices Checklist | 28:45–29:30 | 20 | Slide | Actionable checklist |
| Key Takeaways | 29:00–29:30 | 21 | Slide | Summary |
| Closing | 29:30–30:00 | 22 | Slide | Next steps |

**Word count target:** ~4,500 words (30 min × 150 wpm). Run `wc -w script.md` and trim if substantially over.

---

## 🎨 Visual Elements

### Screen Layouts

**Slide Presentation:**
```
┌─────────────────────────────────┐
│                                 │
│         SLIDE CONTENT           │
│                                 │
│                                 │
└─────────────────────────────────┘
```

**Live Demo (Split Screen):**
```
┌──────────────────┬──────────────┐
│                  │              │
│   PROMPT INPUT   │   RESPONSE   │
│   (Code Editor)  │   OUTPUT     │
│                  │              │
└──────────────────┴──────────────┘
```

**Comparison View:**
```
┌──────────────────┬──────────────┐
│                  │              │
│   BAD EXAMPLE    │ GOOD EXAMPLE │
│   ❌             │   ✅         │
│                  │              │
└──────────────────┴──────────────┘
```

### Highlighting Techniques

1. **Slide Emphasis:** point at key terms, highlight comparisons, pause on complex concepts.
2. **Code Highlighting:** underline important lines, show before/after versions.
3. **API Response Highlighting:** box key parts, compare multiple responses.

---

## 🎞️ Post-Production

### Editing Checklist

**Video Editing:**
- [ ] Remove long pauses and mistakes
- [ ] Add smooth transitions
- [ ] Insert section title cards
- [ ] Add zoom effects for code details
- [ ] Include lower thirds for key terms
- [ ] Add subtle background music

**Audio Editing:**
- [ ] Normalize audio levels
- [ ] Remove background noise
- [ ] Add fade in/out
- [ ] Balance music with voice
- [ ] Remove clicks and breaths

**Graphics & Overlays:**
- [ ] Opening title (5-10 seconds)
- [ ] Section transitions
- [ ] Key term callouts
- [ ] Technique badges
- [ ] Closing credits

### Quality Control

**Technical Review:**
- [ ] Audio/video sync
- [ ] No visual glitches
- [ ] Consistent volume
- [ ] Readable text throughout
- [ ] Smooth playback

**Content Review:**
- [ ] Accurate information
- [ ] Clear explanations
- [ ] Examples work correctly
- [ ] Timing matches script
- [ ] All sections included

---

## 📤 Export Settings

### Final Video Export

**Recommended Settings:**
```
Format: MP4
Codec: H.264
Resolution: 1920x1080
Frame Rate: 30 FPS
Bitrate: 8-10 Mbps (VBR)
Audio: AAC, 192 kbps, 48kHz
```

**File Naming:**
```
Prompt-Engineering-Fundamentals-30min-v1.mp4
```

### Platform-Specific Exports

**YouTube:**
- Resolution: 1920x1080
- Format: MP4
- Recommended bitrate: 8 Mbps

**Vimeo:**
- Resolution: 1920x1080
- Format: MP4
- Recommended bitrate: 10 Mbps

**Corporate LMS:**
- Resolution: 1920x1080 (downscale only if the LMS requires it)
- Format: MP4
- Lower bitrate option: 4-5 Mbps

---

## 📊 Supplementary Materials

### Create These Assets

1. **Thumbnail Image:**
   - 1280x720 pixels
   - Clear title: "Prompt Engineering Fundamentals"
   - Eye-catching design
   - Professional appearance

2. **Video Description:**
```
Master the art of prompt engineering in 30 minutes! Learn core principles,
advanced techniques, and best practices for communicating effectively with AI.

📚 Timestamps:
0:00 - Introduction
3:00 - Core Principles
10:00 - Prompting Techniques
22:00 - Advanced Patterns
27:00 - Best Practices
29:30 - Closing

🔗 Resources:
- Code examples: <REPLACE: link to your hosted repo or Jifunze resource page>
- Slides + workbook: <REPLACE: link to your hosted slides + learner-workbook.md>
- Next course: AI Agents

Prerequisites: Basic understanding of AI/LLMs
```

3. **Closed Captions:**
   - SRT or VTT format
   - Accurate transcription
   - Proper timing
   - Technical terms correct

4. **Companion Materials:**
   - Prompt template library
   - Quick reference guide
   - Practice exercises
   - Additional examples

---

## 🎯 Success Metrics

### Quality Indicators

**Technical Quality:**
- Clear audio throughout
- Readable text at all times
- Smooth video playback
- Professional appearance

**Educational Quality:**
- Concepts explained clearly
- Logical progression
- Practical examples
- Actionable takeaways

**Engagement:**
- Maintains interest
- Appropriate pacing
- Visual variety
- Clear value

---

## 💡 Demo Best Practices

### Live API Demonstrations

**Preparation:**
- Test all examples beforehand
- Have backup responses ready (the scripts support `--auto` and saved transcripts)
- Prepare for API delays
- Keep prompts visible

**Execution:**
- Show prompt clearly first
- Explain what you expect
- Display full response
- Highlight key parts
- Compare variations

**Common Issues:**
- API rate limits: use pre-recorded backups
- Unexpected responses: explain and iterate
- Long responses: show excerpt with note
- Errors: demonstrate built-in retry/error handling

### Code Examples

**Best Practices:**
- Type slowly and clearly
- Explain as you code
- Use meaningful variable names
- Add helpful comments
- Show output immediately

**What to Show:**
- Basic examples first
- Build complexity gradually
- Demonstrate variations
- Show common mistakes
- Explain fixes

---

## 🔄 Iteration & Improvement

### Feedback Collection

After initial release:
- Monitor viewer comments
- Track completion rates
- Note common questions
- Identify confusing sections
- Gather improvement suggestions

### Version Updates

Consider updates for:
- API changes (model deprecations, new parameters)
- New techniques
- Better examples
- Viewer feedback
- Improved clarity

---

## ✅ Final Checklist

Before publishing:
- [ ] All sections recorded
- [ ] Audio quality verified
- [ ] Examples tested
- [ ] Slides error-free (all 22)
- [ ] Captions added
- [ ] Thumbnail created
- [ ] Description written
- [ ] Materials prepared
- [ ] Test viewing done
- [ ] Backups saved

---

## 🎉 Launch Plan

1. **Upload** to platform
2. **Add metadata** (title, description, tags)
3. **Upload captions** and materials
4. **Set thumbnail**
5. **Schedule or publish**
6. **Share** on channels
7. **Monitor** feedback
8. **Respond** to comments

---

**Good luck with your production! 🚀**

Remember: the goal is to make prompt engineering accessible and practical. Focus on clarity, real examples, and actionable techniques that viewers can use immediately.
