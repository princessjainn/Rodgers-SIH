'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { LOCALITY } from '@/lib/demo-data'
import type { IssueRecord } from '@/lib/types'
import { fetchIssuesWithCache } from '@/lib/offline-cache'
import { ChaiCard } from '@/components/brand/chai-card'
import { ChaiHeatMeter } from '@/components/brand/chai-heat-meter'
import { CivicTimeline } from '@/components/brand/civic-timeline'
import { StatusBadge, PriorityBadge } from '@/components/brand/badges'
import {
  MapPin,
  Bell,
  Globe,
  Shield,
  Accessibility,
  HelpCircle,
  ChevronRight,
} from 'lucide-react'

/* ---------------- Local Chai (Home feed) ---------------- */
export function LocalChaiView() {
  const [issues, setIssues] = useState<IssueRecord[]>([])

  useEffect(() => {
    let cancelled = false

    fetchIssuesWithCache(async () => {
      const res = await fetch('/api/issues')
      if (!res.ok) throw new Error('Failed')
      return res.json()
    }).then((cachedIssues) => {
      if (!cancelled && Array.isArray(cachedIssues) && cachedIssues.length > 0) {
        setIssues(cachedIssues as IssueRecord[])
      }
    }).catch(() => {
      if (!cancelled) setIssues([])
    })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {issues.map((issue) => (
          <ChaiCard key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  )
}

/* ---------------- Chai Tapri (trending) ---------------- */
const TABS = ['Hottest', 'Rising', 'Nearby', 'Unresolved'] as const

export function ChaiTapriView() {
  const [tab, setTab] = useState<(typeof TABS)[number]>('Hottest')
  const [issues, setIssues] = useState<IssueRecord[]>([])

  useEffect(() => {
    let cancelled = false

    fetchIssuesWithCache(async () => {
      const res = await fetch('/api/issues')
      if (!res.ok) throw new Error('Failed')
      return res.json()
    }).then((cachedIssues) => {
      if (!cancelled && Array.isArray(cachedIssues) && cachedIssues.length > 0) {
        setIssues(cachedIssues as IssueRecord[])
      }
    }).catch(() => {
      if (!cancelled) setIssues([])
    })

    return () => {
      cancelled = true
    }
  }, [])

  const ranked = [...issues].sort((a, b) => (b.chaiHeat ?? 0) - (a.chaiHeat ?? 0))
  return (
    <div className="space-y-5">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              'shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
              tab === t
                ? 'border-heat bg-heat text-heat-foreground'
                : 'border-border bg-card text-charcoal/70',
            )}
          >
            {t}
          </button>
        ))}
      </div>
      <ol className="space-y-3">
        {ranked.map((issue, i) => (
          <li
            key={issue.id}
            className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm md:flex-row md:items-center"
          >
            <div className="flex min-w-[56px] items-center justify-center">
              <span className="font-display text-3xl font-extrabold text-charcoal/20">
                {i + 1}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="truncate font-display text-xl font-bold text-charcoal">
                  {issue.title}
                </p>
                <PriorityBadge priority={issue.priority} />
              </div>
              <p className="mt-1 text-sm text-charcoal/60">
                {issue.department} · PIN {issue.pin} · {issue.locality}
              </p>
            </div>
            <div className="flex items-center gap-3 md:justify-end">
              <div className="text-right">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-charcoal/45">
                  Heat
                </p>
                <p className="font-display text-xl font-extrabold text-heat">{issue.chaiHeat}</p>
              </div>
              <ChaiHeatMeter heat={issue.chaiHeat ?? 0} size="sm" showLabel={false} />
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

/* ---------------- My Charcha ---------------- */
const MY_TABS = ['Filed', 'Tracking', 'Upvoted', 'Resolved'] as const

export function MyCharchaView() {
  const [tab, setTab] = useState<(typeof MY_TABS)[number]>('Tracking')
  const [issues, setIssues] = useState<IssueRecord[]>([])
  const [active, setActive] = useState<IssueRecord | null>(null)

  useEffect(() => {
    let cancelled = false

    fetchIssuesWithCache(async () => {
      const res = await fetch('/api/issues')
      if (!res.ok) throw new Error('Failed')
      return res.json()
    }).then((cachedIssues) => {
      if (!cancelled && Array.isArray(cachedIssues) && cachedIssues.length > 0) {
        setIssues(cachedIssues as IssueRecord[])
        setActive((cachedIssues as IssueRecord[])[1] ?? (cachedIssues as IssueRecord[])[0])
      }
    }).catch(() => {
      if (!cancelled) setIssues([])
    })

    return () => {
      cancelled = true
    }
  }, [])

  const activeIssue = active ?? issues[0] ?? null

  return (
    <div className="space-y-5">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {MY_TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              'shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
              tab === t
                ? 'border-chai bg-chai text-cream'
                : 'border-border bg-card text-charcoal/70',
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-2">
          {issues.slice(0, 3).map((issue) => (
            <button
              key={issue.id}
              onClick={() => setActive(issue)}
              className={cn(
                'flex w-full items-center gap-3 rounded-2xl border bg-card p-4 text-left transition-colors',
                activeIssue?.id === issue.id ? 'border-chai shadow-sm' : 'border-border',
              )}
            >
              <div className="min-w-0 flex-1">
                <p className="font-mono text-xs text-charcoal/50">{issue.id}</p>
                <p className="truncate font-display font-bold text-charcoal">
                  {issue.title}
                </p>
                <div className="mt-1">
                  <StatusBadge status={issue.status} />
                </div>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-charcoal/40" />
            </button>
          ))}
        </div>

        {activeIssue ? (
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <p className="font-mono text-xs text-charcoal/50">{activeIssue.id}</p>
            <p className="mt-1 font-display text-xl font-bold text-charcoal">{activeIssue.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{activeIssue.description}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <StatusBadge status={activeIssue.status} />
              <PriorityBadge priority={activeIssue.priority} />
            </div>
            <div className="mt-6">
              <CivicTimeline status={activeIssue.status} />
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-card p-6 text-sm text-charcoal/60">
            No issues are available in the live feed yet.
          </div>
        )}
      </div>
    </div>
  )
}

/* ---------------- Profile ---------------- */
export function ProfileView() {
  const rows = [
    [Bell, 'Notifications'],
    [Globe, 'Language'],
    [Shield, 'Privacy'],
    [Accessibility, 'Accessibility'],
    [HelpCircle, 'Help & support'],
  ] as const
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-5 rounded-2xl border border-border bg-card p-6">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-terracotta/15 font-display text-2xl font-extrabold text-terracotta">
          RK
        </span>
        <div>
          <p className="font-display text-xl font-extrabold text-charcoal">
            Riya K.
          </p>
          <p className="mt-0.5 flex items-center gap-1.5 text-sm text-charcoal/60">
            <MapPin className="h-3.5 w-3.5" /> {LOCALITY.name}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-chai p-6 text-cream">
        <p className="text-xs uppercase tracking-widest text-cream/60">
          Your Civic Impact
        </p>
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          {[
            ['12', 'Reports filed'],
            ['48', 'Issues supported'],
            ['7', 'Issues resolved'],
          ].map(([v, k]) => (
            <div key={k} className="rounded-xl bg-cream/10 p-3">
              <p className="font-display text-3xl font-extrabold text-gold">{v}</p>
              <p className="mt-1 text-xs text-cream/70">{k}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        {rows.map(([Icon, label], i) => (
          <button
            key={label}
            className={cn(
              'flex w-full items-center gap-3 px-6 py-4 text-left text-sm font-medium text-charcoal hover:bg-muted transition-colors',
              i !== rows.length - 1 && 'border-b border-border',
            )}
          >
            <Icon className="h-4 w-4 text-chai" />
            <span className="flex-1">{label}</span>
            <ChevronRight className="h-4 w-4 text-charcoal/40" />
          </button>
        ))}
      </div>
    </div>
  )
}
