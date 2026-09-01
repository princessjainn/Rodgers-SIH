import type { IssuePriority, IssueStatus, IssueRecord } from '@/lib/types'

export type { IssueStatus, IssuePriority, IssueRecord, CreateIssueInput } from '@/lib/types'
export type Issue = IssueRecord
export type Priority = IssuePriority

export { fallbackIssues as ISSUES } from '@/lib/fallback-data'
export const LOCALITY = {
  pin: '401208',
  name: 'Market Square, civic zone',
}

export const CATEGORIES = [
  'Roads & Potholes',
  'Public Lighting',
  'Sanitation',
  'Water Supply',
  'Drainage',
  'Traffic',
] as const

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
