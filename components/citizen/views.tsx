'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { ISSUES, LOCALITY } from '@/lib/demo-data'
import type { IssueRecord } from '@/lib/types'
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
  const [issues, setIssues] = useState<IssueRecord[]>(ISSUES)

  useEffect(() => {
    let cancelled = false

    fetch('/api/issues')
      .then((res) => res.ok ? res.json() : Promise.reject(new Error('Failed')))
      .then((payload) => {
        if (!cancelled && Array.isArray(payload?.issues)) {
          setIssues(payload.issues)
        }
      })
      .catch(() => {
        if (!cancelled) setIssues(ISSUES)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border bg-chai p-4 text-cream">
        <p className="text-xs uppercase tracking-widest text-cream/60">Your Chai</p>
        <div className="mt-1 flex items-center justify-between">
          <div>
            <p className="font-display text-2xl font-extrabold">PIN {LOCALITY.pin}</p>
            <p className="flex items-center gap-1 text-sm text-cream/75">
              <MapPin className="h-3.5 w-3.5" />
              {LOCALITY.name}
            </p>
          </div>
          <ChaiHeatMeter heat={82} size="md" showLabel={false} className="text-cream" />
        </div>
      </div>
      {issues.map((issue) => (
        <ChaiCard key={issue.id} issue={issue} />
      ))}
    </div>
  )
}

/* ---------------- Chai Tapri (trending) ---------------- */
const TABS = ['Hottest', 'Rising', 'Nearby', 'Unresolved'] as const

export function ChaiTapriView() {
  const [tab, setTab] = useState<(typeof TABS)[number]>('Hottest')
  const [issues, setIssues] = useState<IssueRecord[]>(ISSUES)

  useEffect(() => {
    let cancelled = false

    fetch('/api/issues')
      .then((res) => res.ok ? res.json() : Promise.reject(new Error('Failed')))
      .then((payload) => {
        if (!cancelled && Array.isArray(payload?.issues)) {
          setIssues(payload.issues)
        }
      })
      .catch(() => {
        if (!cancelled) setIssues(ISSUES)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const ranked = [...issues].sort((a, b) => (b.chaiHeat ?? 0) - (a.chaiHeat ?? 0))
  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-charcoal">
          Chai Tapri
        </h1>
        <p className="text-sm text-charcoal/60">
          Dekho kis mudde ki chai sabse garam hai.
        </p>
      </div>
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
            className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4"
          >
            <span className="font-display text-xl font-extrabold text-charcoal/25">
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-display font-bold text-charcoal">
                {issue.title}
              </p>
              <div className="mt-1 flex items-center gap-2">
                <PriorityBadge priority={issue.priority} />
                <span className="truncate text-xs text-charcoal/55">
                  {issue.reports} reports
                </span>
              </div>
            </div>
            <ChaiHeatMeter heat={issue.chaiHeat ?? 0} size="sm" showLabel={false} />
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
  const [issues, setIssues] = useState<IssueRecord[]>(ISSUES)
  const [active, setActive] = useState<IssueRecord>(ISSUES[1] ?? ISSUES[0])

  useEffect(() => {
    let cancelled = false

    fetch('/api/issues')
      .then((res) => res.ok ? res.json() : Promise.reject(new Error('Failed')))
      .then((payload) => {
        if (!cancelled && Array.isArray(payload?.issues) && payload.issues.length > 0) {
          setIssues(payload.issues)
          setActive(payload.issues[1] ?? payload.issues[0])
        }
      })
      .catch(() => {
        if (!cancelled) setIssues(ISSUES)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="space-y-4">
      <h1 className="font-display text-2xl font-extrabold text-charcoal">
        My Charcha
      </h1>
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

      <div className="space-y-2">
        {issues.slice(0, 3).map((issue) => (
          <button
            key={issue.id}
            onClick={() => setActive(issue)}
            className={cn(
              'flex w-full items-center gap-3 rounded-2xl border bg-card p-4 text-left transition-colors',
              active.id === issue.id ? 'border-chai' : 'border-border',
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

      <div className="rounded-2xl border border-border bg-card p-5">
        <p className="font-mono text-xs text-charcoal/50">{active.id}</p>
        <p className="font-display font-bold text-charcoal">{active.title}</p>
        <div className="mt-4">
          <CivicTimeline status={active.status} />
        </div>
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
    <div className="space-y-4">
      <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-terracotta/15 font-display text-xl font-extrabold text-terracotta">
          RK
        </span>
        <div>
          <p className="font-display text-lg font-extrabold text-charcoal">
            Riya K.
          </p>
          <p className="flex items-center gap-1 text-sm text-charcoal/60">
            <MapPin className="h-3.5 w-3.5" /> {LOCALITY.name}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-chai p-5 text-cream">
        <p className="text-xs uppercase tracking-widest text-cream/60">
          Your Civic Impact
        </p>
        <div className="mt-3 grid grid-cols-3 gap-3 text-center">
          {[
            ['12', 'Reports filed'],
            ['48', 'Issues supported'],
            ['7', 'Issues resolved'],
          ].map(([v, k]) => (
            <div key={k}>
              <p className="font-display text-2xl font-extrabold text-gold">{v}</p>
              <p className="text-xs text-cream/70">{k}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        {rows.map(([Icon, label], i) => (
          <button
            key={label}
            className={cn(
              'flex w-full items-center gap-3 px-5 py-3.5 text-left text-sm font-medium text-charcoal hover:bg-muted',
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
