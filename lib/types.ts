export type IssueStatus =
  | 'Filed'
  | 'AI Classified'
  | 'Assigned'
  | 'Acknowledged'
  | 'In Progress'
  | 'Resolved'
  | 'Community Verified'

export type IssuePriority = 'Critical' | 'High' | 'Moderate' | 'Low'

export interface IssueRecord {
  id: string
  document_id?: string
  documentId: string
  title: string
  description: string
  category: string
  department: string
  pin: string
  locality: string
  status: IssueStatus
  priority: IssuePriority
  trust: number
  chai_heat?: number
  chaiHeat: number
  supporters: number
  reports: number
  comments: number
  days_unresolved?: number
  daysUnresolved: number
  officer: string
  hub: string
  image_url?: string
  image?: string
  created_at?: string
  createdAt: string
  updated_at?: string
}

export interface CreateIssueInput {
  title: string
  description: string
  category: string
  department: string
  pin: string
  locality: string
  status?: IssueStatus
  priority?: IssuePriority
  officer?: string
  hub?: string
  image_url?: string
  image_urls?: string[]
  evidence?: string[]
}
