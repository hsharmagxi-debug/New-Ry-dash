-- RYDASH — Supabase schema. Run this in your project's SQL Editor.

create table if not exists public.scores (
  id uuid primary key default gen_random_uuid(),
  driver_name text not null check (char_length(driver_name) between 1 and 20),
  time_ms integer not null check (time_ms > 0),
  car text not null default 'apex-r9',
  livery text not null default 'plasma',
  created_at timestamptz not null default now()
);

create index if not exists scores_time_ms_idx on public.scores (time_ms asc);

alter table public.scores enable row level security;

-- Anyone (anon key) can read the leaderboard.
create policy "Public read access" on public.scores
  for select using (true);

-- Anyone (anon key) can submit a score. For a stricter setup, require auth.uid() is not null.
create policy "Public insert access" on public.scores
  for insert with check (true);

-- Optional: profile table to store driver preferences per signed-in user.
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  favorite_car text default 'apex-r9',
  favorite_livery text default 'plasma',
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users manage their own profile" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);
