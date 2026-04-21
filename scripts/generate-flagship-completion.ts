/**
 * Intentionally removed from production workflows.
 *
 * Former bulk generator lives at `scripts/archive/DEPRECATED-generate-flagship-completion.ts`.
 *
 * Editorial policy: flagship session prose is maintained as human-authored TypeScript data under
 * `src/data/learning/` (override maps). After curriculum changes, add or edit those files directly;
 * do not regenerate learner-facing prose from scripts.
 */

console.error(
  '[generate-flagship-completion] This script no longer generates learner-facing prose.\n' +
    'Edit `flagshipSessionContentOverrides*.ts` by hand. Archived tool: scripts/archive/DEPRECATED-generate-flagship-completion.ts\n',
)
process.exit(1)
