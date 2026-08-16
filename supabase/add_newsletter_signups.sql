-- Newsletter/waitlist signups from the homepage footer. Public, unauthenticated insert
-- (no login required to subscribe), no read access from the client.

create table if not exists public.newsletter_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.newsletter_signups enable row level security;

create policy "newsletter: anyone can subscribe" on public.newsletter_signups
  for insert
  to anon, authenticated
  with check (true);
