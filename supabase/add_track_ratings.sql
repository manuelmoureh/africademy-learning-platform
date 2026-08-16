-- Star ratings students submit per system, one per user per track. Placeholder ratings
-- shown on cards today (courses.ts) are hardcoded, not yet computed from this table -
-- this just gets the submission mechanic live before real usage starts.

create table if not exists public.track_ratings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  track_id text not null references public.tracks(id) on delete cascade,
  rating smallint not null check (rating >= 1 and rating <= 5),
  created_at timestamptz not null default now(),
  unique (user_id, track_id)
);

alter table public.track_ratings enable row level security;

create policy "track_ratings: public read" on public.track_ratings for select using (true);
create policy "track_ratings: insert own" on public.track_ratings for insert to authenticated with check (auth.uid() = user_id);
create policy "track_ratings: update own" on public.track_ratings for update to authenticated using (auth.uid() = user_id);
