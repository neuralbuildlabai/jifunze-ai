/**
 * Host-side mirror of `LEARNER_MONETIZATION_UI_DISABLED` in `src/learner/learnerCommerceConstants.ts`
 * (`import.meta.env.VITE_LEARNER_MONETIZATION_UI_DISABLED !== 'false'`).
 *
 * Playwright's `webServer.env` must pass the same value to Vite so UI and assertions stay aligned.
 */
export function isLearnerMonetizationUiDisabled(): boolean {
  return process.env.VITE_LEARNER_MONETIZATION_UI_DISABLED !== 'false'
}
