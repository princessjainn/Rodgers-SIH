const ISSUE_CACHE_KEY = 'civicchai:issues'

export function readCachedIssues() {
  if (typeof window === 'undefined') return []

  try {
    const raw = window.localStorage.getItem(ISSUE_CACHE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function writeCachedIssues(issues: unknown[]) {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(ISSUE_CACHE_KEY, JSON.stringify(issues))
  } catch {
    // ignore quota errors; app remains usable
  }
}

export async function fetchIssuesWithCache(fetcher: () => Promise<{ issues?: unknown[] } | unknown[]>) {
  try {
    const response = await fetcher()
    const issues = Array.isArray(response) ? response : response?.issues

    if (Array.isArray(issues)) {
      writeCachedIssues(issues)
      return issues
    }

    return readCachedIssues()
  } catch {
    return readCachedIssues()
  }
}
