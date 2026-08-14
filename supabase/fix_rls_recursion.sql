-- Fixes infinite recursion in the "admin read all" policies (profiles policy querying
-- profiles from within its own USING clause). One-time fix, already folded into schema.sql
-- for anyone bootstrapping a fresh project from scratch.

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

drop policy if exists "profiles: admin read all" on public.profiles;
create policy "profiles: admin read all" on public.profiles for select using (public.is_admin());

drop policy if exists "submissions: admin read all" on public.portfolio_submissions;
create policy "submissions: admin read all" on public.portfolio_submissions for select using (public.is_admin());

drop policy if exists "submissions: admin update" on public.portfolio_submissions;
create policy "submissions: admin update" on public.portfolio_submissions for update using (public.is_admin());
