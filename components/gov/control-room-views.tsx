'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ISSUES } from '@/lib/demo-data'
import { PriorityBadge, StatusBadge, TrustBadge } from '@/components/brand/badges'
import { ChaiHeatMeter } from '@/components/brand/chai-heat-meter'
import { CivicTimeline } from '@/components/brand/civic-timeline'
import {
  TriangleAlert,
  Clock,
  CircleCheck,
  Layers,
  Search,
  MapPin,
  ShieldCheck,
  History,
} from 'lucide-react'

/* ---------------- Overview ---------------- */
const STATS = [
  { k: 'Total Issues', v: '4,218', icon: Layers, tone: 'text-cream' },
  { k: 'Critical', v: '46', icon: TriangleAlert, tone: 'text-heat' },
  { k: 'High Priority', v: '318', icon: TriangleAlert, tone: 'text-terracotta' },
  { k: 'Unassigned', v: '204', icon: Clock, tone: 'text-gold' },
  { k: 'In Progress', v: '844', icon: Clock, tone: 'text-gold' },
  { k: 'Overdue', v: '112', icon: Clock, tone: 'text-heat' },
  { k: 'Resolved', v: '3,006', icon: CircleCheck, tone: 'text-leaf' },
  { k: 'Duplicate Reduction', v: '31%', icon: Layers, tone: 'text-leaf' },
]

const DEPT_LOAD = [
  ['PWD — Roads', 92],
  ['Public Lighting', 74],
  ['Solid Waste', 61],
  ['Water Works', 48],
  ['Drainage', 39],
  ['Traffic', 22],
] as const

export function OverviewView() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {STATS.map((s) => (
          <div
            key={s.k}
            className="rounded-lg border border-sidebar-border bg-sidebar-accent p-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wide text-cream/50">
                {s.k}
              </span>
              <s.icon className={cn('h-4 w-4', s.tone)} />
            </div>
            <p className={cn('mt-2 font-display text-2xl font-extrabold', s.tone)}>
              {s.v}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-sidebar-border bg-sidebar-accent p-5">
          <h3 className="text-sm font-semibold text-cream">
            Department load (open issues)
          </h3>
          <ul className="mt-4 space-y-3">
            {DEPT_LOAD.map(([name, pct]) => (
              <li key={name}>
                <div className="mb-1 flex items-center justify-between text-xs text-cream/70">
                  <span>{name}</span>
                  <span className="font-semibold text-cream">{pct}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-sidebar-border">
                  <div
                    className="h-full rounded-full bg-gold"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-sidebar-border bg-sidebar-accent p-5">
          <h3 className="text-sm font-semibold text-cream">
            Priority model — how it&apos;s scored
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-cream/60">
            Priority is never raw votes. It combines severity, community support
            (Chai Heat), persistence, geographic impact, evidence confidence and
            SLA factors.
          </p>
          <div className="mt-4 space-y-2 text-xs">
            {[
              ['Severity', 30],
              ['Chai Heat (support)', 20],
              ['Persistence / age', 18],
              ['Geographic impact', 14],
              ['Evidence confidence', 12],
              ['SLA breach risk', 6],
            ].map(([label, w]) => (
              <div key={label as string} className="flex items-center gap-3">
                <span className="w-40 shrink-0 text-cream/70">{label}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-sidebar-border">
                  <div
                    className="h-full bg-terracotta"
                    style={{ width: `${(w as number) * 2.6}%` }}
                  />
                </div>
                <span className="w-8 text-right text-cream/60">{w as number}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------------- Complaints table ---------------- */
export function ComplaintsView() {
  const [selected, setSelected] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const rows = ISSUES.filter((i) =>
    i.title.toLowerCase().includes(query.toLowerCase()),
  )
  const active = ISSUES.find((i) => i.id === selected)

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search issues..."
            className="w-full rounded-md border border-sidebar-border bg-sidebar-accent py-2 pl-9 pr-3 text-sm text-cream outline-none placeholder:text-cream/40 focus:border-gold"
          />
        </div>
        {['Department', 'Category', 'PIN', 'Priority', 'Status'].map((f) => (
          <button
            key={f}
            className="rounded-md border border-sidebar-border bg-sidebar-accent px-3 py-2 text-xs font-medium text-cream/70 hover:text-cream"
          >
            {f}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-lg border border-sidebar-border">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="bg-sidebar-accent text-xs uppercase tracking-wide text-cream/50">
            <tr>
              {['Issue ID', 'Issue', 'PIN', 'Dept', 'Priority', 'Trust', 'Heat', 'Reports', 'Status', 'Age'].map(
                (h) => (
                  <th key={h} className="whitespace-nowrap px-3 py-2.5 font-medium">
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-sidebar-border bg-sidebar">
            {rows.map((i) => (
              <tr
                key={i.id}
                onClick={() => setSelected(i.id)}
                className="cursor-pointer text-cream/80 transition-colors hover:bg-sidebar-accent"
              >
                <td className="whitespace-nowrap px-3 py-2.5 font-mono text-xs text-cream/60">
                  {i.id}
                </td>
                <td className="px-3 py-2.5 font-medium text-cream">{i.title}</td>
                <td className="px-3 py-2.5">{i.pin}</td>
                <td className="whitespace-nowrap px-3 py-2.5 text-xs">{i.department}</td>
                <td className="px-3 py-2.5">
                  <PriorityBadge priority={i.priority} />
                </td>
                <td className="px-3 py-2.5">{i.trust}%</td>
                <td className="px-3 py-2.5 font-semibold text-heat">{i.chaiHeat}&deg;</td>
                <td className="px-3 py-2.5">{i.reports}</td>
                <td className="px-3 py-2.5">
                  <StatusBadge status={i.status} />
                </td>
                <td className="whitespace-nowrap px-3 py-2.5 text-xs">
                  {i.daysUnresolved}d
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {active && (
        <IssueDetail issue={active} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}

function IssueDetail({
  issue,
  onClose,
}: {
  issue: (typeof ISSUES)[number]
  onClose: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-charcoal/60 backdrop-blur-sm">
      <div className="h-full w-full max-w-md overflow-y-auto border-l border-sidebar-border bg-sidebar p-5 text-cream/85">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-mono text-xs text-cream/50">{issue.documentId}</p>
            <h3 className="font-display text-lg font-extrabold text-cream">
              {issue.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-md border border-sidebar-border px-2 py-1 text-xs text-cream/60"
          >
            Close
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <PriorityBadge priority={issue.priority} />
          <StatusBadge status={issue.status} />
          <TrustBadge trust={issue.trust} />
        </div>

        <Section title="Original citizen complaint">
          <p className="text-sm text-cream/70">{issue.description}</p>
        </Section>
        <Section title="AI normalized">
          <dl className="space-y-1.5 text-sm">
            {[
              ['Category', issue.category],
              ['Department', issue.department],
              ['AI confidence', '82%'],
              ['Location', `PIN ${issue.pin} · ${issue.locality}`],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4">
                <dt className="text-cream/50">{k}</dt>
                <dd className="text-right font-medium text-cream">{v}</dd>
              </div>
            ))}
          </dl>
        </Section>
        <Section title="Community & heat">
          <ChaiHeatMeter heat={issue.chaiHeat} size="md" className="text-cream" />
          <p className="mt-1 text-xs text-cream/60">
            {issue.supporters.toLocaleString('en-IN')} supporters ·{' '}
            {issue.reports} independent reports
          </p>
        </Section>
        <Section title="Officer / Hub (Demo data)">
          <p className="flex items-center gap-2 text-sm">
            <ShieldCheck className="h-4 w-4 text-gold" /> {issue.officer}
          </p>
          <p className="mt-1 flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-gold" /> {issue.hub}
          </p>
        </Section>
        <Section title="Status history">
          <div className="rounded-lg bg-sidebar-accent p-3">
            <CivicTimeline status={issue.status} />
          </div>
        </Section>

        <div className="mt-5 grid grid-cols-2 gap-2">
          {['Assign', 'Reassign', 'Change status', 'Merge', 'Request info', 'Mark resolved'].map(
            (a) => (
              <button
                key={a}
                className="rounded-md border border-sidebar-border bg-sidebar-accent px-3 py-2 text-xs font-medium text-cream hover:border-gold"
              >
                {a}
              </button>
            ),
          )}
        </div>
        <p className="mt-3 flex items-center gap-1.5 text-xs text-cream/40">
          <History className="h-3.5 w-3.5" />
          Every sensitive action is written to the audit log.
        </p>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5 border-t border-sidebar-border pt-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-cream/50">
        {title}
      </p>
      {children}
    </div>
  )
}

/* ---------------- GIS Hotspots ---------------- */
const HOTSPOTS = [
  { pin: '401208', level: 'Critical', tone: 'bg-heat', issues: 214, heat: 88, top: '18%', left: '32%' },
  { pin: '401209', level: 'High', tone: 'bg-terracotta', issues: 132, heat: 71, top: '44%', left: '58%' },
  { pin: '401107', level: 'Moderate', tone: 'bg-gold', issues: 76, heat: 52, top: '62%', left: '24%' },
  { pin: '401303', level: 'Low', tone: 'bg-leaf', issues: 28, heat: 33, top: '30%', left: '74%' },
]

export function GISView() {
  const [active, setActive] = useState(HOTSPOTS[0])
  return (
    <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-sidebar-border bg-sidebar-accent">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(var(--sidebar-border) 1px, transparent 1px), linear-gradient(90deg, var(--sidebar-border) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
          aria-hidden
        />
        <span className="absolute left-3 top-3 rounded bg-sidebar px-2 py-1 text-xs font-medium text-cream/70">
          Chai Heat Map — privacy-preserving
        </span>
        {HOTSPOTS.map((h) => (
          <button
            key={h.pin}
            onClick={() => setActive(h)}
            style={{ top: h.top, left: h.left }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            aria-label={`Hotspot ${h.pin}, ${h.level}`}
          >
            <span
              className={cn(
                'block rounded-full opacity-70',
                h.tone,
                active.pin === h.pin ? 'h-10 w-10 animate-heat' : 'h-7 w-7',
              )}
            />
          </button>
        ))}
      </div>

      <div className="rounded-lg border border-sidebar-border bg-sidebar-accent p-5">
        <div className="flex items-center gap-2">
          <span className={cn('h-3 w-3 rounded-full', active.tone)} />
          <h3 className="font-display text-lg font-extrabold text-cream">
            PIN {active.pin}
          </h3>
          <span className="text-xs text-cream/50">{active.level}</span>
        </div>
        <dl className="mt-4 space-y-2 text-sm">
          {[
            ['Number of issues', String(active.issues)],
            ['Average Chai Heat', `${active.heat}°`],
            ['Resolution rate', '62%'],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between">
              <dt className="text-cream/50">{k}</dt>
              <dd className="font-semibold text-cream">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-cream/50">
          Top issues
        </p>
        <ul className="mt-2 space-y-1 text-sm text-cream/75">
          <li>Road damage</li>
          <li>Streetlights</li>
          <li>Garbage collection</li>
        </ul>
      </div>
    </div>
  )
}

/* ---------------- Analytics ---------------- */
const TREND = [40, 55, 48, 70, 62, 84, 78, 92, 88, 74, 96, 90]
const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']

export function AnalyticsView() {
  const max = Math.max(...TREND)
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-sidebar-border bg-sidebar-accent p-5">
        <h3 className="text-sm font-semibold text-cream">
          Issues filed vs resolved (12 months)
        </h3>
        <div className="mt-6 flex h-48 items-end gap-2">
          {TREND.map((v, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-t bg-gold/80"
                style={{ height: `${(v / max) * 100}%` }}
              />
              <span className="text-[10px] text-cream/50">{MONTHS[i]}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          ['Avg. resolution', '6.4 days'],
          ['SLA compliance', '81%'],
          ['Citizen re-open rate', '4.2%'],
        ].map(([k, v]) => (
          <div
            key={k}
            className="rounded-lg border border-sidebar-border bg-sidebar-accent p-5"
          >
            <p className="text-xs uppercase tracking-wide text-cream/50">{k}</p>
            <p className="mt-1 font-display text-2xl font-extrabold text-cream">
              {v}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
