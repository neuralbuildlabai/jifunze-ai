# Training ops triage (support / on-call)

When users hit training errors in production, UI alerts include a **`Ref:`** line with the classified error kind from `TrainingError.kind`.

| Kind | Typical cause | First step |
|------|----------------|------------|
| `schema_missing` | Training migrations not applied to this Supabase project | Confirm project ref matches deployment; apply `supabase/migrations/*training*` per `docs/TRAINING_SCHEMA_DEPLOYMENT.md` |
| `constraint` | DB CHECK rejects payload (e.g. unknown `asset_type`) | Deploy latest migrations; align app version with DB |
| `permission` | RLS / auth / JWT | Refresh session; verify workspace membership |
| `network` | Offline / transient | Retry; check Supabase status |
| `not_configured` | Missing Supabase env in client | Configure env or use demo workspace |
| `validation` | Client-side validation | User fixes input |
| `unknown` | Unclassified PostgREST / JS error | Capture message + `Ref` + time; avoid sharing raw tokens |

**Do not** ask users to paste full network payloads or secrets. `Ref` + approximate time + URL is enough for initial triage.
