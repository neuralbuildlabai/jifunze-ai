# Incident response and kill switches

## The switches, in the order you would reach for them

| # | Switch | Where | Effect | Time to take effect |
|---|---|---|---|---|
| 1 | `IG_PUBLISH_ENABLED` | Supabase secret | Nothing posts publicly unless it is exactly `"true"` | Next call |
| 2 | `SOCIAL_SYNC_ENABLED` | GH repo variable | The two-hour sync short-circuits | Next scheduled run |
| 3 | `DRY_RUN` | GH repo variable | The autonomous loop renders but never publishes | Next run |
| 4 | `PUBLISH_SECRET` | Supabase secret | Unset it and `publish-instagram` refuses every caller | Next call |
| 5 | Disable the workflow | GitHub Actions UI | Nothing scheduled runs at all | Immediate |
| 6 | Revoke the platform token | The platform's own settings | Kills anything holding a copy of that token | Immediate |

**None of these is reachable from a browser.** `/admin/social-ops/safety` shows their state and the
exact command to change each one; it has no button that acts. That is deliberate.

## Playbooks

### Something wrong was published
1. Delete or hide the post on the platform.
2. `supabase secrets unset IG_PUBLISH_ENABLED` — stop the next one before investigating.
3. Set `correction_note` on the `content_items` row. It renders on the public lesson page, so the
   correction is visible where the content is, not only in a log.
4. Set `publication_status = 'retracted'` if the item should leave the public site.
5. Write down what let it through, and add the regression test before re-enabling.

### A token expired or leaked
1. Revoke it at the platform first. Deleting the secret alone does not invalidate a leaked copy.
2. Issue a new credential; `supabase secrets set` / update the Actions secret.
3. `npm run social:sync:dry-run -- --platform=<id>` to confirm.
4. If it leaked: work out how. Nothing in this codebase writes a token to a log, a database column
   or an error message — `safeErrorSummary()` redacts token-shaped substrings, and tests assert it.
   A leak therefore means something outside these paths, and that is what to look for.

### The sync is failing
1. `/admin/social-ops` → Pipeline → recent runs, and the open alerts on the overview.
2. Remember that **skipped ≠ failed**. Skipped is the expected state for a platform with no
   credentials and never raises an alert.
3. Reproduce locally: `npm run social:sync:dry-run -- --platform=<id>`.
4. If one platform is failing, the others are unaffected by design — there is no rush to disable
   the whole job.

### A platform account is compromised
1. Change the password and re-issue MFA **on the platform** — never from this codebase, and never
   by anyone acting on its behalf.
2. Revoke every connected app for that account.
3. Set `enabled = false` on its `social_accounts` row so the sync stops touching it.
4. Audit `content_publications` for that platform for anything the codebase did not create.

### Something claims to be Jifunze.ai and is not
The complete official list is `/social` on the website and `src/social/socialAccounts.ts` in the
repository. Anything not on it is not us. Report it through the platform's impersonation flow.

## What must never happen during an incident

- Do not paste a token, password or MFA code into a chat, an issue or a commit.
- Do not "temporarily" flip `IG_PUBLISH_ENABLED` to test something. Use `DRY_RUN`.
- Do not disable a quality gate to get a post out. The gate is the thing that was right.
- Do not delete a `content_items` row to make a problem disappear. Retract it — the ledger is the
  record of what happened, including the mistakes.
