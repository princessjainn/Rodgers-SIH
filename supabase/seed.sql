-- Seed data for CivicChai demo issues
-- Run this in the Supabase SQL editor after creating the schema.

insert into public.issues (
  document_id,
  title,
  description,
  category,
  department,
  pin,
  locality,
  status,
  priority,
  trust,
  chai_heat,
  supporters,
  reports,
  comments,
  days_unresolved,
  officer,
  hub,
  created_at
)
values
  (
    'CC-SEED-001',
    'Streetlight outage near market square',
    'Several streetlights near the market square have been non-functional for more than a week, creating unsafe conditions after sunset.',
    'Public Lighting',
    'Municipal Public Lighting',
    '401208',
    'Market Square',
    'In Progress',
    'High',
    84,
    86,
    1432,
    26,
    41,
    8,
    'Electrical Supervisor',
    'Ward Operations Hub',
    now() - interval '8 days'
  ),
  (
    'CC-SEED-002',
    'Garbage pile blocking a residential lane',
    'A large pile of mixed waste is accumulated in the residential lane and attracting pests, creating hygiene concerns.',
    'Sanitation',
    'Solid Waste Management',
    '401209',
    'Residential Lane',
    'Assigned',
    'Moderate',
    77,
    69,
    946,
    19,
    28,
    5,
    'Sanitary Inspector',
    'Ward Operations Hub',
    now() - interval '5 days'
  ),
  (
    'CC-SEED-003',
    'Pothole near school boundary road',
    'A deep pothole at the school boundary is causing risk to children and two-wheeler riders during the morning commute.',
    'Roads & Potholes',
    'PWD — Roads Division',
    '401208',
    'School Boundary Road',
    'Community Verified',
    'Critical',
    92,
    94,
    2130,
    41,
    52,
    12,
    'Junior Engineer',
    'Ward Operations Hub',
    now() - interval '12 days'
  ),
  (
    'CC-SEED-004',
    'Water supply interruption in apartment cluster',
    'Residents have had no consistent water supply for the last two days, affecting daily needs and sanitation.',
    'Water Supply',
    'Water Works Department',
    '401210',
    'Apartment Cluster',
    'Filed',
    'High',
    79,
    76,
    1210,
    22,
    31,
    2,
    'Operations Engineer',
    'Ward Operations Hub',
    now() - interval '2 days'
  );

insert into public.issue_comments (issue_id, body, created_at)
select id, 'This needs urgent attention before the evening commute.', now() - interval '3 days'
from public.issues where document_id = 'CC-SEED-001';

insert into public.issue_supports (issue_id, user_id, created_at)
select id, '00000000-0000-0000-0000-000000000001', now() - interval '2 days'
from public.issues where document_id = 'CC-SEED-001';
