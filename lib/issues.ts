import { getSupabaseClient } from '@/lib/supabase'
import { fallbackIssues } from '@/lib/fallback-data'
import { seedIssues } from '@/lib/seed-data'
import type { CreateIssueInput, IssueRecord } from '@/lib/types'

const ISSUE_FALLBACK_STORE_KEY = '__civicchai_issue_store__'

function getFallbackIssueStore(): IssueRecord[] {
  const globalScope = globalThis as typeof globalThis & {
    [ISSUE_FALLBACK_STORE_KEY]?: IssueRecord[]
  }

  if (!globalScope[ISSUE_FALLBACK_STORE_KEY]) {
    globalScope[ISSUE_FALLBACK_STORE_KEY] = [...seedIssues, ...fallbackIssues]
  }

  return globalScope[ISSUE_FALLBACK_STORE_KEY]!
}

function normalizeIssue(row: Record<string, any>): IssueRecord {
  const chaiHeat = Number(row.chai_heat ?? row.chaiHeat ?? 0)
  const daysUnresolved = Number(row.days_unresolved ?? row.daysUnresolved ?? 0)

  return {
    id: String(row.id),
    documentId: String(row.document_id ?? row.documentId ?? `CC-${String(row.id).slice(0, 6)}`),
    title: String(row.title ?? 'Untitled issue'),
    description: String(row.description ?? 'No description provided.'),
    category: String(row.category ?? 'General'),
    department: String(row.department ?? 'Municipal operations'),
    pin: String(row.pin ?? '000000'),
    locality: String(row.locality ?? 'Locality not provided'),
    status: (row.status ?? 'Filed') as IssueRecord['status'],
    priority: (row.priority ?? 'Moderate') as IssueRecord['priority'],
    trust: Number(row.trust ?? 0),
    chaiHeat,
    supporters: Number(row.supporters ?? 0),
    reports: Number(row.reports ?? 0),
    comments: Number(row.comments ?? 0),
    daysUnresolved,
    officer: String(row.officer ?? 'Unassigned'),
    hub: String(row.hub ?? 'Ward Operations Hub'),
    image: row.image_url ?? row.image,
    image_url: row.image_url ?? row.image,
    createdAt: String(row.created_at ?? row.createdAt ?? new Date().toISOString()),
  }
}

export async function getIssues(): Promise<IssueRecord[]> {
  const supabase = getSupabaseClient()

  if (!supabase) {
    const fallback = getFallbackIssueStore()
    return [...fallback].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  const { data, error } = await supabase.from('issues').select('*').order('created_at', { ascending: false })

  if (error) {
    console.error('getIssues error:', error)
    return getFallbackIssueStore()
  }

  const rows = (data ?? []).map(normalizeIssue)
  if (!rows.length) {
    return getFallbackIssueStore()
  }

  return rows
}

export async function getIssueById(id: string): Promise<IssueRecord | null> {
  const supabase = getSupabaseClient()

  if (!supabase) {
    return null
  }

  const { data, error } = await supabase.from('issues').select('*').eq('id', id).single()

  if (error) {
    console.error('getIssueById error:', error)
    return null
  }

  return normalizeIssue(data)
}

export async function createIssue(input: CreateIssueInput): Promise<IssueRecord> {
  const supabase = getSupabaseClient()

  const payload = {
    title: input.title,
    description: input.description,
    category: input.category,
    department: input.department,
    pin: input.pin,
    locality: input.locality,
    status: input.status ?? 'Filed',
    priority: input.priority ?? 'Moderate',
    officer: input.officer ?? 'Unassigned',
    hub: input.hub ?? 'Ward Operations Hub',
    document_id: `CC-${Date.now()}`,
    image_url: input.image_url ?? input.image_urls?.[0] ?? null,
    evidence_urls: input.image_urls ?? input.evidence ?? [],
    trust: 0,
    chai_heat: 0,
    supporters: 0,
    reports: 1,
    comments: 0,
    days_unresolved: 0,
  }

  if (!supabase) {
    const issue: IssueRecord = {
      id: `fallback-${Date.now()}`,
      documentId: payload.document_id,
      title: payload.title,
      description: payload.description,
      category: payload.category,
      department: payload.department,
      pin: payload.pin,
      locality: payload.locality,
      status: payload.status,
      priority: payload.priority,
      trust: 0,
      chaiHeat: 0,
      supporters: 0,
      reports: 1,
      comments: 0,
      daysUnresolved: 0,
      officer: payload.officer,
      hub: payload.hub,
      image: payload.image_url ?? undefined,
      image_url: payload.image_url ?? undefined,
      createdAt: new Date().toISOString(),
    }

    const store = getFallbackIssueStore()
    store.unshift(issue)

    return issue
  }

  const { data, error } = await supabase
    .from('issues')
    .insert(payload)
    .select()
    .single()

  if (error) {
    throw error
  }

  return normalizeIssue(data)
}
