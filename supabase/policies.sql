-- Row Level Security setup for CivicChai

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.departments enable row level security;
alter table public.issues enable row level security;
alter table public.issue_comments enable row level security;
alter table public.issue_supports enable row level security;
alter table public.audit_logs enable row level security;

create policy "profiles_are_viewable_by_authenticated_users"
on public.profiles for select
using (auth.uid() is not null);

create policy "profiles_can_update_own_record"
on public.profiles for update
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "profiles_can_insert_own_record"
on public.profiles for insert
with check (auth.uid() = id);

create policy "public_categories_are_readable"
on public.categories for select
using (true);

create policy "public_departments_are_readable"
on public.departments for select
using (true);

create policy "issues_are_viewable_by_authenticated_users"
on public.issues for select
using (auth.uid() is not null);

create policy "issues_can_be_inserted_by_authenticated_users"
on public.issues for insert
with check (auth.uid() is not null);

create policy "issues_can_be_updated_by_owners_or_admins"
on public.issues for update
using (
  auth.uid() = created_by
  or auth.jwt() ->> 'role' = 'service_role'
)
with check (
  auth.uid() = created_by
  or auth.jwt() ->> 'role' = 'service_role'
);

create policy "comments_are_viewable_by_authenticated_users"
on public.issue_comments for select
using (auth.uid() is not null);

create policy "comments_can_be_inserted_by_authenticated_users"
on public.issue_comments for insert
with check (auth.uid() is not null);

create policy "comments_can_be_updated_by_owner"
on public.issue_comments for update
using (auth.uid() = author_id)
with check (auth.uid() = author_id);

create policy "supports_are_viewable_by_authenticated_users"
on public.issue_supports for select
using (auth.uid() is not null);

create policy "supports_can_be_managed_by_authenticated_users"
on public.issue_supports for insert
with check (auth.uid() is not null);

create policy "supports_can_be_deleted_by_owner"
on public.issue_supports for delete
using (auth.uid() = user_id);

create policy "audit_logs_are_viewable_by_authenticated_users"
on public.audit_logs for select
using (auth.uid() is not null);

create policy "audit_logs_can_be_inserted_by_service_role_only"
on public.audit_logs for insert
with check (auth.jwt() ->> 'role' = 'service_role');
