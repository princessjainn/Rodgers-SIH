-- Initial migration for CivicChai application data.
-- This file mirrors the schema in supabase/schema.sql and is intended for migration-based workflows.

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

create index if not exists idx_issues_status_priority on public.issues(status, priority);
create index if not exists idx_issues_pin_locality on public.issues(pin, locality);
create index if not exists idx_issues_created_at on public.issues(created_at desc);
create index if not exists idx_issue_comments_issue_id on public.issue_comments(issue_id, created_at desc);
create index if not exists idx_issue_supports_issue_id on public.issue_supports(issue_id);
create index if not exists idx_audit_logs_issue_id on public.audit_logs(issue_id, created_at desc);

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
