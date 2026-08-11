create table if not exists public.medicines (
  id integer primary key,
  brand text not null,
  composition text not null,
  segment text not null,
  packing text default '-',
  mrp text default '-',
  updated_at timestamptz default now()
);

create table if not exists public.presets (
  id bigint primary key,
  doctor_name text not null unique,
  medicine_ids integer[] not null default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.medicines enable row level security;
alter table public.presets enable row level security;

drop policy if exists "Public read medicines" on public.medicines;
create policy "Public read medicines"
on public.medicines for select
using (true);

drop policy if exists "Public write medicines" on public.medicines;
create policy "Public write medicines"
on public.medicines for all
using (true)
with check (true);

drop policy if exists "Public read presets" on public.presets;
create policy "Public read presets"
on public.presets for select
using (true);

drop policy if exists "Public write presets" on public.presets;
create policy "Public write presets"
on public.presets for all
using (true)
with check (true);
