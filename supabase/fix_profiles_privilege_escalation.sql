-- Security fix: "profiles: update own" (schema.sql) only checks auth.uid() = id via
-- USING, with no WITH CHECK - Postgres reuses USING as the check on UPDATE when WITH CHECK
-- is omitted, so it never inspects which columns changed. Any authenticated user could run
-- supabase.from('profiles').update({ role: 'admin' }).eq('id', myId) via the public anon
-- key and self-elevate to admin (which gates reading every user's PII and approving/
-- rejecting portfolio submissions), or set plan to 'pro'. Nothing in this codebase
-- currently needs to update role/plan via a client-facing update, so this trigger pins
-- both to their existing values on every update, closing the gap without weakening the
-- policy itself or risking a recursive RLS subquery.
create or replace function public.prevent_profile_privilege_escalation()
returns trigger as $$
begin
  new.role := old.role;
  new.plan := old.plan;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_profile_update_lock_privilege on public.profiles;
create trigger on_profile_update_lock_privilege
  before update on public.profiles
  for each row execute procedure public.prevent_profile_privilege_escalation();
