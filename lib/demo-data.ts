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
  trust: number
  chaiHeat: number
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
  pin: '',
  name: 'Your city feed',
}

export const CATEGORIES = [
  'Roads & Potholes',
  'Public Lighting',
  'Sanitation',
  'Water Supply',
  'Drainage',
  'Traffic',
] as const

export const ISSUES: Issue[] = []

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
