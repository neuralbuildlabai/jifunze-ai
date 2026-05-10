# Business Analytics Decision-Making — slide images

PNG slide exports are **not** in this repository yet. When you export the deck (for example via `scripts/export-course-slides.sh` or your own pipeline), place files here as:

`slide-01.png` … `slide-40.png` (zero-padded to two digits), matching the slide manifest in `src/data/courses/businessAnalyticsDecisionMakingSlides.ts`.

After images exist:

1. Set `assetStatus` to `'ready'` in that manifest.
2. Populate the `slides` array with `imageSrc` paths under `/course-assets/business-analytics-decision-making/slides/`.
3. Run `npm run verify:business-analytics`.

Until then, the app shows a calm “planned” panel and the downloadable PowerPoint only—no fake slide images.
