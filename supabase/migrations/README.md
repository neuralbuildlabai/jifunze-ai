# Migrations

Supabase applies migrations in **lexicographic filename order** (the timestamp prefix).

## Ordering rules

1. Filenames must stay strictly sortable as strings. The project uses synthetic dates in the prefix; keep newer work **after** older work in sort order (e.g. `20260440163000_*` runs after `20260440160000_*`).
2. Dependencies: if migration B alters objects created in A, B’s prefix must sort **after** A. Example: `20260440163000_learning_access_expand.sql` alters Stripe tables from `20260440160000_stripe_billing_entitlements.sql`.
3. **Review** before production: training, access tier, teaching events, Stripe, and learning access form a chain — apply the full chain to the same project referenced in app and UAT guards.

See `docs/TRAINING_SCHEMA_DEPLOYMENT.md` for applying training-related SQL to your project.
