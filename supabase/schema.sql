-- CivicChai master schema
-- Import this single file in Supabase SQL editor.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  city text,
  ward text,
  pin text,
  preferred_language text default 'en',
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.departments (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.issues (
  id uuid primary key default gen_random_uuid(),
  document_id text not null unique,
  title text not null,
  description text not null,
  category text not null,
  department text not null,
  pin text not null,
  locality text not null,
  status text not null check (
    status in (
      'Filed',
      'AI Classified',
      'Assigned',
      'Acknowledged',
      'In Progress',
      'Resolved',
      'Community Verified'
    )
  ),
  priority text not null check (priority in ('Critical', 'High', 'Moderate', 'Low')),
  trust integer not null default 0 check (trust between 0 and 100),
  chai_heat integer not null default 0 check (chai_heat between 0 and 100),
  supporters integer not null default 0,
  reports integer not null default 0,
  comments integer not null default 0,
  days_unresolved integer not null default 0,
  officer text,
  hub text,
  image_url text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.issue_comments (
  id uuid primary key default gen_random_uuid(),
  issue_id uuid not null references public.issues(id) on delete cascade,
  author_id uuid references public.profiles(id) on delete set null,
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.issue_supports (
  id uuid primary key default gen_random_uuid(),
  issue_id uuid not null references public.issues(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (issue_id, user_id)
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  issue_id uuid references public.issues(id) on delete cascade,
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  details jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.officer_registry (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  department text not null,
  pin text not null,
  hub text not null,
  contact text,
  created_at timestamptz not null default now()
);

create table if not exists public.official_documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  authority text not null,
  document_number text,
  source_url text,
  published_at timestamptz not null default now(),
  version text default '1.0',
  checksum text,
  created_at timestamptz not null default now()
);

create index if not exists idx_issues_status_priority on public.issues(status, priority);
create index if not exists idx_issues_pin_locality on public.issues(pin, locality);
create index if not exists idx_issues_created_at on public.issues(created_at desc);
create index if not exists idx_issue_comments_issue_id on public.issue_comments(issue_id, created_at desc);
create index if not exists idx_issue_supports_issue_id on public.issue_supports(issue_id);
create index if not exists idx_audit_logs_issue_id on public.audit_logs(issue_id, created_at desc);
create index if not exists idx_officer_registry_pin on public.officer_registry(pin, department);

create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_profiles_updated_at
before update on public.profiles
for each row execute function public.handle_updated_at();

create trigger trg_issues_updated_at
before update on public.issues
for each row execute function public.handle_updated_at();

create or replace function public.update_issue_counts()
returns trigger as $$
begin
  if tg_table_name = 'issue_comments' then
    update public.issues
    set comments = (
      select count(*) from public.issue_comments where issue_id = new.issue_id
    )
    where id = new.issue_id;
  end if;

  if tg_table_name = 'issue_supports' then
    update public.issues
    set supporters = (
      select count(*) from public.issue_supports where issue_id = new.issue_id
    )
    where id = new.issue_id;
  end if;

  return null;
end;
$$ language plpgsql;

create trigger trg_issue_comments_count
after insert or delete on public.issue_comments
for each row execute function public.update_issue_counts();

create trigger trg_issue_supports_count
after insert or delete on public.issue_supports
for each row execute function public.update_issue_counts();

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.departments enable row level security;
alter table public.issues enable row level security;
alter table public.issue_comments enable row level security;
alter table public.issue_supports enable row level security;
alter table public.audit_logs enable row level security;
alter table public.officer_registry enable row level security;
alter table public.official_documents enable row level security;

create policy "Profiles are viewable by owner or authenticated user"
on public.profiles for select
using (auth.uid() = id or auth.uid() is not null);

create policy "Users can insert own profile"
on public.profiles for insert
with check (auth.uid() = id);

create policy "Users can update own profile"
on public.profiles for update
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Public categories are readable"
on public.categories for select
using (true);

create policy "Public departments are readable"
on public.departments for select
using (true);

create policy "Issues are viewable by anyone"
on public.issues for select
using (true);

create policy "Authenticated users can insert issues"
on public.issues for insert
with check (auth.role() = 'authenticated');

create policy "Authenticated users can update issues"
on public.issues for update
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

create policy "Issue comments are viewable by anyone"
on public.issue_comments for select
using (true);

create policy "Authenticated users can create comments"
on public.issue_comments for insert
with check (auth.role() = 'authenticated');

create policy "Users can update own comments"
on public.issue_comments for update
using (auth.uid() = author_id)
with check (auth.uid() = author_id);

create policy "Issue supports are viewable by anyone"
on public.issue_supports for select
using (true);

create policy "Authenticated users can manage supports"
on public.issue_supports for insert
with check (auth.role() = 'authenticated');

create policy "Users can delete own support"
on public.issue_supports for delete
using (auth.uid() = user_id);

create policy "Audit logs are readable for authenticated users"
on public.audit_logs for select
using (auth.role() = 'authenticated');

create policy "Service role can insert audit logs"
on public.audit_logs for insert
with check (auth.jwt() ->> 'role' = 'service_role');

create policy "Officer registry is readable by all"
on public.officer_registry for select
using (true);

create policy "Authenticated users can manage registry"
on public.officer_registry for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

create policy "Official documents are readable by all"
on public.official_documents for select
using (true);

create policy "Authenticated users can manage official documents"
on public.official_documents for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

insert into public.categories (name)
values
  ('Roads & Potholes'),
  ('Public Lighting'),
  ('Sanitation'),
  ('Water Supply'),
  ('Drainage'),
  ('Traffic'),
  ('Streetlight'),
  ('Waste Management'),
  ('Public Health')
on conflict (name) do nothing;

insert into public.departments (slug, name)
values
  ('roads', 'PWD — Roads Division'),
  ('lighting', 'Municipal Public Lighting'),
  ('solid-waste', 'Solid Waste Management'),
  ('water-works', 'Water Works Department'),
  ('drainage', 'Drainage & Sewerage'),
  ('traffic', 'Traffic Police / PWD'),
  ('public-lighting', 'Municipal Public Lighting'),
  ('water-supply', 'Water Supply Department'),
  ('health', 'Public Health Office')
on conflict (slug) do nothing;

insert into public.officer_registry (name, role, department, pin, hub, contact)
values
  ('R. Kulkarni', 'Ward Officer', 'Municipal Public Lighting', '401208', 'Station Road Hub', '+91 98765 43210'),
  ('S. Mehta', 'Sanitary Inspector', 'Solid Waste Management', '401209', 'Market Square Hub', '+91 98765 43211'),
  ('P. Joshi', 'Junior Engineer', 'Roads & Infrastructure', '401208', 'School Boundary Hub', '+91 98765 43212')
on conflict do nothing;

insert into public.official_documents (title, authority, document_number, source_url, published_at, version)
values
  ('Streetlight maintenance SOP', 'Municipal Works Department', 'MWD-2026-14', 'https://example.gov.in/docs/streetlight-sop', now(), 'v1.0'),
  ('Solid waste complaint escalation policy', 'Civic Services Office', 'CSO-2026-07', 'https://example.gov.in/docs/waste-policy', now(), 'v1.0')
on conflict do nothing;
