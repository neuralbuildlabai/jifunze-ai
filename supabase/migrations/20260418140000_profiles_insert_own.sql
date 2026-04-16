-- Allow authenticated users to insert their own profile row when needed (e.g. repair paths).
-- Trigger + bootstrap_my_workspace still create profiles with elevated rights; this closes RLS gaps for direct client inserts.

drop policy if exists profiles_insert_own on public.profiles;

create policy profiles_insert_own on public.profiles
  for insert
  to authenticated
  with check (id = auth.uid());
