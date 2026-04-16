-- Adjacent workspace tables used on the same screen as Learning Lab / trend preview.
-- Base migration (20260414000000) defines RLS but does not grant table privileges; some hosted
-- projects rely on implicit defaults while others surface 403 on PostgREST. Align with the
-- explicit GRANT pattern used for learning_snapshots / caches / performance / lab_runs.

grant select, insert, update, delete on table public.brands to authenticated;
grant select, insert, update, delete on table public.content_items to authenticated;
grant select, insert, update, delete on table public.social_accounts to authenticated;
