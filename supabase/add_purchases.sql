-- Real, paid course unlocks. Replaces the client-side-only purchasedTrackIds stub in
-- App.tsx. Rows here are the actual source of truth for "did this user pay for this
-- track" - written only by the server (webhook/verify endpoints using the service role
-- key), never directly by an authenticated client, so a user can never mark their own
-- purchase as successful from the browser.

create table if not exists public.purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  track_id text not null references public.tracks(id) on delete cascade,
  reference text not null unique,
  amount numeric not null,
  currency text not null default 'KES',
  status text not null default 'pending' check (status in ('pending', 'success', 'failed')),
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

alter table public.purchases enable row level security;

create policy "purchases: read own" on public.purchases for select using (auth.uid() = user_id);
-- Deliberately no insert/update policy for the `authenticated` role. Writes only happen
-- server-side via the service role key (api/payments/initialize.ts, verify.ts,
-- webhook.ts), which bypasses RLS entirely.
