import type { IssuePriority, IssueRecord, IssueStatus } from '@/lib/types'

export type { IssueStatus, IssuePriority, IssueRecord, CreateIssueInput } from '@/lib/types'
export type Issue = IssueRecord
export type Priority = IssuePriority

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

export { TIMELINE_STEPS, heatLabel } from '@/lib/issue-helpers'
