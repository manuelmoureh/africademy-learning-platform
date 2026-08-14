-- Afridemy core schema
-- Run this once in the Supabase SQL Editor (Dashboard > SQL Editor > New query)
-- Covers: real accounts, real enrollment/progress persistence, real verification queue.
-- Course/lesson CONTENT stays in src/data/courses.ts for now (no video, no CMS yet) —
-- tracks/steps here just need to exist as rows so enrollments/progress can reference them.

create extension if not exists "pgcrypto";

do $$ begin
  create type user_role as enum ('student', 'admin');
exception when duplicate_object then null; end $$;

do $$ begin
  create type user_plan as enum ('free', 'pro');
exception when duplicate_object then null; end $$;

do $$ begin
  create type submission_status as enum ('pending', 'verified', 'rejected');
exception when duplicate_object then null; end $$;

-- One row per authenticated user, mirrors auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text not null,
  role user_role not null default 'student',
  plan user_plan not null default 'free',
  location text,
  initials text,
  created_at timestamptz not null default now()
);

-- Auto-create a profile row whenever someone signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, email, initials)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.email,
    upper(left(coalesce(new.raw_user_meta_data->>'name', new.email), 1)) ||
      upper(left(split_part(coalesce(new.raw_user_meta_data->>'name', new.email), ' ', 2), 1))
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Mirrors the track ids in src/data/courses.ts
create table if not exists public.tracks (
  id text primary key,
  title text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  track_id text not null references public.tracks(id) on delete cascade,
  enrolled_at timestamptz not null default now(),
  unique (user_id, track_id)
);

-- Mirrors Step.id per track in src/data/courses.ts (e.g. 'step-1')
create table if not exists public.progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  track_id text not null references public.tracks(id) on delete cascade,
  step_id text not null,
  is_completed boolean not null default false,
  completed_at timestamptz,
  unique (user_id, track_id, step_id)
);

create table if not exists public.portfolio_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  track_id text not null references public.tracks(id) on delete cascade,
  project_url text not null,
  demo_video_url text,
  notes text,
  status submission_status not null default 'pending',
  submitted_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references public.profiles(id)
);

-- Row Level Security: everyone only sees/edits their own rows; admins see everything.
alter table public.profiles enable row level security;
alter table public.tracks enable row level security;
alter table public.enrollments enable row level security;
alter table public.progress enable row level security;
alter table public.portfolio_submissions enable row level security;

create policy "profiles: read own" on public.profiles for select using (auth.uid() = id);
create policy "profiles: update own" on public.profiles for update using (auth.uid() = id);
create policy "profiles: admin read all" on public.profiles for select using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

create policy "tracks: public read" on public.tracks for select using (true);

create policy "enrollments: read own" on public.enrollments for select using (auth.uid() = user_id);
create policy "enrollments: insert own" on public.enrollments for insert with check (auth.uid() = user_id);

create policy "progress: read own" on public.progress for select using (auth.uid() = user_id);
create policy "progress: insert own" on public.progress for insert with check (auth.uid() = user_id);
create policy "progress: update own" on public.progress for update using (auth.uid() = user_id);

create policy "submissions: read own" on public.portfolio_submissions for select using (auth.uid() = user_id);
create policy "submissions: insert own" on public.portfolio_submissions for insert with check (auth.uid() = user_id);
create policy "submissions: admin read all" on public.portfolio_submissions for select using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);
create policy "submissions: admin update" on public.portfolio_submissions for update using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

-- Seed the 10 tracks so enrollments/progress have something to reference.
-- IDs/titles must match src/data/courses.ts INITIAL_TRACKS — keep in sync if courses.ts changes.
insert into public.tracks (id, title) values
  ('whatsapp-retail-agent', 'WhatsApp AI Agent for Kenyan Retail'),
  ('lead-capture-bot', 'Lead Qualification Agent for Real Estate'),
  ('invoicing-assistant', 'Invoicing & Receipt AI Assistant'),
  ('support-ticketing-agent', 'AI Customer Support & Ticketing Agent'),
  ('booking-scheduler-agent', 'AI Booking & Appointment Scheduler'),
  ('social-content-agent', 'AI Social Media Content Assistant'),
  ('inventory-restock-agent', 'AI Inventory & Restock Alert Agent'),
  ('hr-screening-agent', 'AI Hiring & CV Screening Agent'),
  ('payment-collections-agent', 'AI Overdue Payment Follow-Up Agent'),
  ('food-ordering-agent', 'AI Food Ordering & Delivery Agent')
on conflict (id) do nothing;
