-- Traditional Koothu of Sri Lanka: Supabase schema.
-- Run in the Supabase SQL editor. Editorial content currently lives in src/content;
-- these tables are ready for migrating it to the database.

create table if not exists regions (
  slug text primary key, name text not null, province text, summary text
);
create table if not exists traditions (
  slug text primary key, name text not null, variants text[] default '{}',
  summary text, theme text, verification text not null default 'community-reported'
    check (verification in ('community-reported','terminology-note','verified')),
  period text
);
create table if not exists tradition_regions (
  tradition_slug text references traditions(slug) on delete cascade,
  region_slug text references regions(slug) on delete cascade,
  primary key (tradition_slug, region_slug)
);
create table if not exists sources (
  id bigserial primary key, tradition_slug text references traditions(slug),
  citation text not null, url text
);
create table if not exists events (
  slug text primary key, name text not null, tradition_slug text references traditions(slug),
  starts_at timestamptz not null, venue text, district text, region_slug text references regions(slug),
  organizer text, description text, status text default 'Scheduled'
);
create table if not exists articles (
  slug text primary key, title text not null, category text, author text, published_on date, body jsonb, kind text
);
create table if not exists media (
  id text primary key, kind text, title text, caption text, tradition_slug text references traditions(slug),
  storage_path text, credit text not null, licence text
);

-- Community submissions: write-only from the server, never readable by the public.
create table if not exists submissions (
  id bigserial primary key,
  type text not null check (type in ('event','article','information','media','correction')),
  payload jsonb not null,
  status text not null default 'unverified' check (status in ('unverified','reviewed','published','rejected')),
  created_at timestamptz not null default now()
);

alter table regions enable row level security;
alter table traditions enable row level security;
alter table tradition_regions enable row level security;
alter table sources enable row level security;
alter table events enable row level security;
alter table articles enable row level security;
alter table media enable row level security;
alter table submissions enable row level security;

-- Public read of editorial tables only.
create policy "public read regions" on regions for select using (true);
create policy "public read traditions" on traditions for select using (true);
create policy "public read tradition_regions" on tradition_regions for select using (true);
create policy "public read sources" on sources for select using (true);
create policy "public read events" on events for select using (true);
create policy "public read articles" on articles for select using (true);
create policy "public read media" on media for select using (true);
-- No policies on submissions: only the service-role key (used server-side in /api/contribute) can write or read.
