// Realistic fictional demo data for CivicChai. No real citizen information.
// All officer / contact details are clearly marked as demo data.

export type IssueStatus =
  | 'Filed'
  | 'AI Classified'
  | 'Assigned'
  | 'Acknowledged'
  | 'In Progress'
  | 'Resolved'
  | 'Community Verified'

export type Priority = 'Critical' | 'High' | 'Moderate' | 'Low'

export interface Issue {
  id: string
  documentId: string
  title: string
  description: string
  category: string
  department: string
  pin: string
  locality: string
  status: IssueStatus
  priority: Priority
  trust: number // report/evidence confidence 0-100
  chaiHeat: number // community support "temperature" 0-100
  supporters: number
  reports: number
  comments: number
  daysUnresolved: number
  officer: string
  hub: string
  image?: string
  createdAt: string
}

export const LOCALITY = {
  pin: '401208',
  name: 'Nallasopara West, Palghar',
}

export const CATEGORIES = [
  'Roads & Potholes',
  'Public Lighting',
  'Sanitation',
  'Water Supply',
  'Drainage',
  'Traffic',
] as const

export const ISSUES: Issue[] = [
  {
    id: 'CC-401208-0001842',
    documentId: 'CC-401208-2026-0001842',
    title: 'Station Road potholes',
    description:
      'The road near Station Road has multiple large potholes causing daily two-wheeler accidents, especially after the monsoon.',
    category: 'Roads & Potholes',
    department: 'PWD — Roads Division',
    pin: '401208',
    locality: 'Station Road',
    status: 'In Progress',
    priority: 'Critical',
    trust: 88,
    chaiHeat: 94,
    supporters: 2431,
    reports: 87,
    comments: 214,
    daysUnresolved: 17,
    officer: 'Junior Engineer, Ward 4 (Demo)',
    hub: 'Nallasopara Municipal Hub',
    createdAt: '2026-08-14',
  },
  {
    id: 'CC-401208-0001731',
    documentId: 'CC-401208-2026-0001731',
    title: 'Streetlight outage on Tulinj Road',
    description:
      'Streetlights have not worked for 15 days on the Tulinj Road stretch. The area is completely dark and unsafe at night.',
    category: 'Public Lighting',
    department: 'Municipal Public Lighting',
    pin: '401208',
    locality: 'Tulinj Road',
    status: 'Assigned',
    priority: 'High',
    trust: 82,
    chaiHeat: 86,
    supporters: 1842,
    reports: 52,
    comments: 138,
    daysUnresolved: 15,
    officer: 'Electrical Supervisor (Demo)',
    hub: 'Nallasopara Municipal Hub',
    createdAt: '2026-08-16',
  },
  {
    id: 'CC-401208-0001655',
    documentId: 'CC-401208-2026-0001655',
    title: 'Garbage not collected for a week',
    description:
      'Garbage collection near the market has stopped for over a week. Waste is piling up and creating a health hazard.',
    category: 'Sanitation',
    department: 'Solid Waste Management',
    pin: '401208',
    locality: 'Central Market',
    status: 'Acknowledged',
    priority: 'High',
    trust: 76,
    chaiHeat: 78,
    supporters: 1204,
    reports: 41,
    comments: 96,
    daysUnresolved: 8,
    officer: 'Sanitary Inspector (Demo)',
    hub: 'Nallasopara Municipal Hub',
    createdAt: '2026-08-23',
  },
  {
    id: 'CC-401208-0001588',
    documentId: 'CC-401208-2026-0001588',
    title: 'Water leakage near Achole Road',
    description:
      'A major pipeline leak is wasting drinking water and flooding the footpath near Achole Road for the last 5 days.',
    category: 'Water Supply',
    department: 'Water Works Department',
    pin: '401208',
    locality: 'Achole Road',
    status: 'In Progress',
    priority: 'Moderate',
    trust: 71,
    chaiHeat: 64,
    supporters: 862,
    reports: 29,
    comments: 54,
    daysUnresolved: 5,
    officer: 'Water Works JE (Demo)',
    hub: 'Nallasopara Municipal Hub',
    createdAt: '2026-08-26',
  },
  {
    id: 'CC-401208-0001490',
    documentId: 'CC-401208-2026-0001490',
    title: 'Drainage overflow in Sopara Gaon',
    description:
      'Open drainage is overflowing onto the main lane. Foul smell and mosquito breeding reported by many residents.',
    category: 'Drainage',
    department: 'Drainage & Sewerage',
    pin: '401208',
    locality: 'Sopara Gaon',
    status: 'Filed',
    priority: 'Moderate',
    trust: 63,
    chaiHeat: 58,
    supporters: 640,
    reports: 22,
    comments: 37,
    daysUnresolved: 3,
    officer: 'Unassigned',
    hub: 'Nallasopara Municipal Hub',
    createdAt: '2026-08-28',
  },
  {
    id: 'CC-401208-0001402',
    documentId: 'CC-401208-2026-0001402',
    title: 'Broken traffic signal at Sriprastha junction',
    description:
      'The traffic signal at Sriprastha junction has been non-functional, causing dangerous jams during peak hours.',
    category: 'Traffic',
    department: 'Traffic Police / PWD',
    pin: '401208',
    locality: 'Sriprastha Junction',
    status: 'Resolved',
    priority: 'Low',
    trust: 69,
    chaiHeat: 41,
    supporters: 388,
    reports: 14,
    comments: 22,
    daysUnresolved: 0,
    officer: 'Traffic Cell (Demo)',
    hub: 'Nallasopara Municipal Hub',
    createdAt: '2026-08-05',
  },
]

export const TIMELINE_STEPS: { label: string; key: IssueStatus }[] = [
  { label: 'Filed', key: 'Filed' },
  { label: 'AI classified', key: 'AI Classified' },
  { label: 'Department assigned', key: 'Assigned' },
  { label: 'Officer acknowledged', key: 'Acknowledged' },
  { label: 'In progress', key: 'In Progress' },
  { label: 'Resolved', key: 'Resolved' },
  { label: 'Community verified', key: 'Community Verified' },
]

export function heatLabel(heat: number): string {
  if (heat >= 85) return 'Very Hot'
  if (heat >= 65) return 'Hot'
  if (heat >= 45) return 'Warm'
  return 'Cooling'
}
