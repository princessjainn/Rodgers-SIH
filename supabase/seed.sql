-- Seed reference data for categories and departments.
-- These are reusable filters for the CivicChai app and may be extended in Supabase.

insert into public.categories (name)
values
  ('Roads & Potholes'),
  ('Public Lighting'),
  ('Sanitation'),
  ('Water Supply'),
  ('Drainage'),
  ('Traffic')
on conflict (name) do nothing;

insert into public.departments (slug, name)
values
  ('roads', 'PWD — Roads Division'),
  ('lighting', 'Municipal Public Lighting'),
  ('solid-waste', 'Solid Waste Management'),
  ('water-works', 'Water Works Department'),
  ('drainage', 'Drainage & Sewerage'),
  ('traffic', 'Traffic Police / PWD')
on conflict (slug) do nothing;
