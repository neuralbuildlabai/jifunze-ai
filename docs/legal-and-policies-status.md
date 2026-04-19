# Legal and policies — implementation status

This document separates **product-boundary copy** (implemented in-app via `src/training/trustCopy.ts` and trust UI components) from **formal legal documents**, which must be drafted and approved by counsel for your jurisdiction(s).

## Implemented in product (not a substitute for counsel)

- **Scoped disclaimers** on public entry, signup/auth, email verification, workspace/dashboard, training, quizzes, readiness, derived content generation, studio, team/facilitator surfaces, and settings/billing-adjacent copy.
- **Draft policy routes** (summary placeholders, not final terms):
  - `/terms` — Terms of Service (placeholder)
  - `/privacy` — Privacy Policy (placeholder)
  - `/refunds` — Refunds / billing policy (placeholder)
- **Support contact** on placeholder pages: `neuralbuildlab.ai@gmail.com` (operational; confirm for production).

## Still required before paid traffic / formal launch

| Item | Status |
|------|--------|
| Counsel-reviewed **Terms of Service** | Not in repo — replace placeholder route content when ready |
| Counsel-reviewed **Privacy Policy** (data categories, subprocessors, regions, retention) | Not in repo |
| **Cookie / analytics** disclosures if tracking is added | Verify against actual telemetry |
| **Refund / subscription** policy tied to real merchant of record & payment provider | Not in repo |
| **Age / minor** policy aligned to regional law (not just in-product guidance) | Legal review |
| **Educational / institutional** use agreements if selling to schools or enterprises | Sales + legal |

## Engineering note

Placeholder pages are intentionally labeled **“Draft — not final legal text”** so users are not misled into thinking the site ships complete counsel-approved policies.
