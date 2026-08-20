# Instagram profile — @jifunze.ai

Everything needed to make Instagram match the Facebook Page (`Jifunze.ai`, ID `61593186673039`).
Copy the fields verbatim; upload the images from the folders beside this file.

_Generated 2026-08-19 from `brand-assets/facebook/` — same mark, same palette, same typeface._

---

## 1. Profile fields — paste these exactly

| Field | Value | Limit |
|---|---|---|
| **Username** | `jifunze.ai` | already correct — do not change |
| **Name** | `Jifunze.AI · AI Career Skills` | 29/30 chars |
| **Pronouns** | *(leave blank)* | |
| **Bio** | see below | 107/150 chars |
| **Link** | `https://jifunze.ai` | |
| **Category** | `Education` | must match the FB Page category |
| **Contact — email** | `neuralbuild.ai@gmail.com` | same as the Meta app contact |
| **Profile picture** | `profile/jifunze_ig_profile_1080.png` | |

### Bio (recommended — matches the FB cover tagline)

```
Practical AI & career skills for the next billion online.
Short lessons. Real tools. No fluff.
Start free ↓
```

### Bio (alternative, if you want the emoji convention)

```
Practical AI & career skills for the next billion online.
📚 Short lessons · 🛠 Real tools · 🚫 No fluff
👇 Start free
```

> Instagram strips line breaks if you type the bio in the mobile app. Edit the bio from
> **instagram.com → Edit profile** in a desktop browser so the three lines survive.

---

## 2. Uniformity checklist across all four handles

| Platform | Handle | Display name | Profile image |
|---|---|---|---|
| Facebook Page | Jifunze.ai | Jifunze.ai | `jifunze_profile_500_centered.png` |
| Instagram | `@jifunze.ai` | Jifunze.AI · AI Career Skills | `jifunze_ig_profile_1080.png` |
| TikTok | `@jifunze_ai` | Jifunze.AI | `jifunze_ig_profile_1080.png` |
| X | `@JifunzeAI` | Jifunze.AI | `jifunze_ig_profile_1080.png` |

Same bio line everywhere: **Practical AI & career skills for the next billion online.**
Same link everywhere: **https://jifunze.ai**

`jifunze_profile_500_centered.png` is optional — it is the existing Facebook profile picture
with the mark optically centred (the live one sits ~14 px off-centre). Swapping it makes the
FB and IG avatars pixel-identical.

---

## 3. Brand values (do not drift)

| Token | Hex | Use |
|---|---|---|
| Navy | `#0b0d14` | every background |
| White | `#ffffff` | logo card, headlines |
| Ink | `#010101` | logo bar |
| Blue | `#a8bfd5` | logo panel |
| Accent | `#a0b9dc` | `.AI`, rules, glyphs |
| Muted | `#c4cbd6` | body copy |
| Dim | `#788498` | footers |

Typeface: **DejaVu Sans Bold** for headings, **DejaVu Sans** for body — the same faces used on
the existing Facebook cover, so nothing shifts between platforms.

---

## 4. Story Highlights

Five covers in `highlights/` (1080×1920, safe inside Instagram's circular crop):

| File | Highlight name | Holds |
|---|---|---|
| `highlight_start-here` | Start Here | what Jifunze is, who it's for |
| `highlight_courses` | Courses | course walkthroughs |
| `highlight_ai-tips` | AI Tips | the weekly tip reels |
| `highlight_free` | Free | free starter courses, link |
| `highlight_wins` | Wins | learner outcomes, certificates |

Create the highlight, then **Edit Highlight → Edit Cover → upload** the matching file.
Use the exact names above so the row reads as one set.

---

## 5. Grid starter posts

Six 1080×1080 posts in `grid/`. Post them **in numbered order** (01 first) — Instagram fills the
grid newest-first, so posting 01→06 leaves the brand card at bottom-right of the first block.

| File | Card |
|---|---|
| `post_01_brand` | Logo + tagline |
| `post_02_what` | "Learn the AI skills employers are actually hiring for." |
| `post_03_skills` | 5 AI skills worth learning this year |
| `post_04_free` | Start free |
| `post_05_who` | Who it's built for |
| `post_06_follow` | Follow for weekly AI & career skills |

### Captions

**01 —**
```
Jifunze means "learn" in Swahili.
Practical AI and career skills for the next billion people coming online.
Start free → jifunze.ai
```

**02 —**
```
Not theory. Not hype. The AI skills that show up in real job descriptions.
Short lessons, real tools, and a tutor on every lesson.
```

**03 —**
```
Five AI skills worth learning this year:
1. Prompting that gets usable output
2. Automating the boring 40% of your job
3. Reading data without a data team
4. Using AI without leaking company info
5. Saying what AI did — and what you did

Which one are you weakest at?
```

**04 —**
```
Free starter courses. No card, no trial countdown.
Link in bio → jifunze.ai
```

**05 —**
```
Built for students, career switchers, small business owners, and teams with no L&D budget.
If that's you, you're in the right place.
```

**06 —**
```
New AI and career skills every week. Follow so you don't miss them.
```

Hashtags to reuse (keep the same set on FB and IG):
`#AISkills #CareerSkills #LearnAI #UpskillNow #AIForWork #Jifunze`

---

## 6. Two things to verify on the Facebook Page

The Page's own copy was not readable from this repo — open the Page and confirm these match:

1. **Category** — set Instagram to the same one (recommended: Education).
2. **Page short description / bio** — it should read
   "Practical AI & career skills for the next billion online." If it says something else,
   change the Page to this line rather than changing Instagram, so the cover image and the
   bio agree.

---

## 7. Do not break the publishing pipeline

`@jifunze.ai` is the Business account wired to the autonomous publisher
(IG Business Account ID `17841433836747759`, token in Supabase secret `IG_ACCESS_TOKEN`).

- **Do not** switch the account to Personal or Creator — Reels publishing via the Graph API
  requires Business, and unlinking from the Page invalidates the token.
- Changing the profile picture, name, bio, link, or category is safe and does not affect the token.
