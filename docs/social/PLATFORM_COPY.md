# Final platform copy

Approved wording, adapted to each platform's limits and conventions. Character counts are shown so
nothing needs to be re-measured before pasting.

**Machine-readable source:** `src/social/brand.ts`. A test asserts none of the approved copy
contains a prohibited claim.

## The three canonical descriptions

**Core short** (85)
> Career, income and practical AI skills for job seekers, students and new freelancers.

**Standard** (267)
> Jifunze.ai shares practical career, income and AI skills for job seekers, students and new
> freelancers in Kenya and other emerging markets. Explore useful guidance on CVs, interviews,
> applications, practical AI, money skills and professional growth.

**Extended** (391)
> Jifunze.ai is a career-skills media brand helping job seekers, students and new freelancers build
> practical skills for work, income and opportunity. Our content covers CVs, interviews, job
> applications, practical AI, money skills and professional growth, with a focus on Kenya and other
> emerging markets. Your idea never sleeps.

**Tagline, exactly:** `Your idea never sleeps.` — singular "idea", sentence case, full stop
retained, kept separate from the logo symbol.

## Per platform

| Platform | Display name | Handle | Website | Category | Copy to use |
|---|---|---|---|---|---|
| Instagram | `Jifunze.AI` *(pending — app only)* | `@jifunze.ai` keep | `https://www.jifunze.ai` *(pending — app only)* | Education | 3-line bio below |
| TikTok | `Jifunze.AI` ✅ | `@jifunze_ai` keep | not eligible under 1,000 followers | — | 77-char bio below |
| Threads | `Jifunze.AI` ✅ | inherits `@jifunze.ai` | `https://www.jifunze.ai` ✅ | — | bio below |
| YouTube | `Jifunze.AI` *(pending — 24h rate limit)* | `@jifunze-ai` keep | `https://www.jifunze.ai` ✅ | — | description below |
| Facebook | `Jifunze.AI` *(pending approval — 60-day lock)* | vanity `jifunze.ai` *(pending approval)* | `jifunze.ai` ✅ | Education | Standard description |
| X | `Jifunze.AI` ✅ | `@JifunzeAI` keep | `https://jifunze.ai` ✅ | — | 119-char bio below |
| LinkedIn | `Jifunze.AI` ✅ | `jifunze-ai` keep | `jifunze.ai` ✅ | Education | tagline + overview below |
| Pinterest | `Jifunze.AI` ✅ | `@jifunzeai` keep | `jifunze.ai` ✅ | Publisher/media · Education | About below |

### Instagram bio (106/150)
```
Career, income & practical AI skills
For job seekers, students & new freelancers
Kenya & emerging markets
```

### TikTok bio (77/80) — **not yet applied, blocked on sign-in**
```
Career, income & practical AI skills for job seekers, students & freelancers.
```
If TikTok rejects the length, use (67/80):
```
Career, income & AI skills for job seekers, students & freelancers.
```

### Threads bio (106/150)
```
Career, income & practical AI skills for job seekers, students and new freelancers. Your idea never sleeps.
```

### YouTube channel description (277/1000)
```
Jifunze.ai shares practical career, income and AI skills for job seekers, students and new freelancers in Kenya and other emerging markets.

Expect useful Shorts on CVs, interviews, job applications, practical AI, money skills and professional growth.

Your idea never sleeps.
```

### X bio (119/160)
```
Practical career, income and AI skills for job seekers, students and new freelancers in Kenya and other emerging markets.
```

### LinkedIn tagline (84/120)
```
Career, income and practical AI skills for job seekers, students and new freelancers.
```

### LinkedIn overview (493/2000)
```
Jifunze.ai is a career-skills media brand helping job seekers, students and new freelancers build practical skills for work, income and opportunity.

Our content covers CVs, interviews, job applications, practical AI, money skills and professional growth, with a focus on Kenya and other emerging markets.

We publish short, specific lessons you can act on the same day — no jargon, nothing to buy, and no promises about outcomes we cannot control.

Your idea never sleeps.
```
Specialties: career skills · CV writing · interview preparation · job applications · practical AI ·
freelancing · money skills · professional development

### Pinterest About (108/500)
```
Practical career, income and AI skills for job seekers, students and new freelancers. Your idea never sleeps.
```

### Facebook bio (202/255)
```
Practical career, income and AI skills for job seekers, students and new freelancers in Kenya and other emerging markets. CVs, interviews, applications, practical AI, money skills and professional growth.
```

## Never use

These are enforced in code by `findProhibitedClaims()` (`src/social/brand.ts`), checked by every
adapter before a post is prepared and asserted by the test suite:

- Create smarter social content in seconds
- Try our content generator
- AI social-content generator
- Social-media publishing platform
- Generate content for brands and creators
- Academic-grade courses
- Accredited training
- Guaranteed jobs
- Guaranteed income
- Any "link in bio" promise, and any `/generate` link

## Never invent

Audience numbers · partnerships · accreditations · courses · certificates · instructors ·
employment outcomes · income outcomes.

## A note on CTAs

There is no call to action on any profile until there is a destination worth sending people to. The
Kazi Kit does not exist; `ctaEligible()` only adds a link when it resolves to a live
`https://www.jifunze.ai/` URL, and the quality gate rejects any caption promising a link in bio.
When the Kazi Kit is live and verified, that is the moment to revisit this — not before.
