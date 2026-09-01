'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useMap as useMapHook } from 'react-leaflet'
import { cn } from '@/lib/utils'
import type { IssueRecord } from '@/lib/types'
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
const MapContainer = dynamic(
  async () => (await import('react-leaflet')).MapContainer,
  { ssr: false },
)
const TileLayer = dynamic(
  async () => (await import('react-leaflet')).TileLayer,
  { ssr: false },
)
const Circle = dynamic(
  async () => (await import('react-leaflet')).Circle,
  { ssr: false },
)
const Popup = dynamic(
  async () => (await import('react-leaflet')).Popup,
  { ssr: false },
)

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
  const [issues, setIssues] = useState<IssueRecord[]>([])

  useEffect(() => {
    let cancelled = false

    fetch('/api/issues')
      .then((res) => res.ok ? res.json() : Promise.reject(new Error('Failed')))
      .then((payload) => {
        if (!cancelled && Array.isArray(payload?.issues)) {
          setIssues(payload.issues)
          if (payload.issues[0]) setSelected(payload.issues[0].id)
        }
      })
      .catch(() => {
        if (!cancelled) setIssues([])
      })

    return () => {
      cancelled = true
    }
  }, [])

  const rows = issues.filter((i) =>
    i.title.toLowerCase().includes(query.toLowerCase()),
  )
  const active = issues.find((i) => i.id === selected)

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
  issue: IssueRecord
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
          <ChaiHeatMeter heat={issue.chaiHeat ?? 0} size="md" className="text-cream" />
          <p className="mt-1 text-xs text-cream/60">
            {issue.supporters.toLocaleString('en-IN')} supporters ·{' '}
            {issue.reports} independent reports
          </p>
        </Section>
        <Section title="Officer / Hub">
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
  {
    pin: '401208',
    level: 'Critical',
    tone: 'bg-heat',
    issues: 214,
    heat: 88,
    label: 'Station Road',
    position: [18.5305, 73.8533] as [number, number],
    intensity: 0.92,
  },
  {
    pin: '401209',
    level: 'High',
    tone: 'bg-terracotta',
    issues: 132,
    heat: 71,
    label: 'Market Square',
    position: [18.5342, 73.8671] as [number, number],
    intensity: 0.74,
  },
  {
    pin: '401107',
    level: 'Moderate',
    tone: 'bg-gold',
    issues: 76,
    heat: 52,
    label: 'School Boundary',
    position: [18.5213, 73.8442] as [number, number],
    intensity: 0.54,
  },
  {
    pin: '401303',
    level: 'Low',
    tone: 'bg-leaf',
    issues: 28,
    heat: 33,
    label: 'Riverside',
    position: [18.5429, 73.8755] as [number, number],
    intensity: 0.35,
  },
]

function MapFocus({ center }: { center: [number, number] }) {
  const map = useMapHook()

  useEffect(() => {
    map.setView(center, 13)
  }, [center, map])

  return null
}

export function GISView() {
  const [active, setActive] = useState(HOTSPOTS[0])

  return (
    <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
      <div className="overflow-hidden rounded-lg border border-sidebar-border bg-sidebar-accent">
        <div className="flex items-center justify-between border-b border-sidebar-border px-3 py-2 text-xs font-medium text-cream/70">
          <span>Chai Heat Map — privacy-preserving</span>
          <span>Live ward view</span>
        </div>
        <div className="h-[460px] w-full">
          <MapContainer
            center={active.position}
            zoom={13}
            scrollWheelZoom
            className="h-full w-full"
            style={{ background: '#201c1a' }}
          >
            <MapFocus center={active.position} />
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {HOTSPOTS.map((hotspot) => {
              const isActive = hotspot.pin === active.pin
              const color =
                hotspot.level === 'Critical'
                  ? '#F25A4C'
                  : hotspot.level === 'High'
                    ? '#e67b59'
                    : hotspot.level === 'Moderate'
                      ? '#e0a23e'
                      : '#52b57d'

              return (
                <Circle
                  key={hotspot.pin}
                  center={hotspot.position}
                  radius={hotspot.intensity * 1000}
                  pathOptions={{
                    color,
                    fillColor: color,
                    fillOpacity: isActive ? 0.38 : 0.2,
                    weight: isActive ? 2 : 1,
                  }}
                  eventHandlers={{ click: () => setActive(hotspot) }}
                >
                  <Popup>
                    <div className="text-xs text-charcoal">
                      <strong>{hotspot.label}</strong>
                      <div>PIN {hotspot.pin}</div>
                      <div>{hotspot.level} • {hotspot.issues} issues</div>
                    </div>
                  </Popup>
                </Circle>
              )
            })}
          </MapContainer>
        </div>
      </div>

      <div className="rounded-lg border border-sidebar-border bg-sidebar-accent p-5">
        <div className="flex items-center gap-2">
          <span className={cn('h-3 w-3 rounded-full', active.tone)} />
          <h3 className="font-display text-lg font-extrabold text-cream">
            PIN {active.pin}
          </h3>
          <span className="text-xs text-cream/50">{active.level}</span>
        </div>

        <div className="mt-3 rounded-md border border-sidebar-border bg-sidebar/60 px-3 py-2 text-xs text-cream/60">
          {active.label}
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

export function RegistryView() {
  const officers = [
    { name: 'R. Kulkarni', role: 'Ward Officer', department: 'Public Lighting', pin: '401208', hub: 'Station Road Hub', contact: '+91 98765 43210' },
    { name: 'S. Mehta', role: 'Sanitary Inspector', department: 'Solid Waste Management', pin: '401209', hub: 'Market Square Hub', contact: '+91 98765 43211' },
    { name: 'P. Joshi', role: 'Junior Engineer', department: 'PWD — Roads Division', pin: '401208', hub: 'School Boundary Hub', contact: '+91 98765 43212' },
  ]

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-sidebar-border bg-sidebar-accent p-5">
        <h3 className="text-sm font-semibold text-cream">Officer / Hub registry</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm text-cream/80">
            <thead className="text-xs uppercase tracking-wide text-cream/50">
              <tr>
                <th className="px-3 py-2">Officer</th>
                <th className="px-3 py-2">Role</th>
                <th className="px-3 py-2">Department</th>
                <th className="px-3 py-2">PIN</th>
                <th className="px-3 py-2">Hub</th>
                <th className="px-3 py-2">Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sidebar-border">
              {officers.map((officer) => (
                <tr key={officer.name} className="text-cream/75">
                  <td className="px-3 py-2 font-medium text-cream">{officer.name}</td>
                  <td className="px-3 py-2">{officer.role}</td>
                  <td className="px-3 py-2">{officer.department}</td>
                  <td className="px-3 py-2">{officer.pin}</td>
                  <td className="px-3 py-2">{officer.hub}</td>
                  <td className="px-3 py-2">{officer.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export function AuditView() {
  const events = [
    { time: '01 Sep 2026, 14:10', actor: 'Citizen', action: 'Complaint filed', detail: 'Streetlights not working near Station Road' },
    { time: '01 Sep 2026, 14:22', actor: 'AI Engine', action: 'Auto classified', detail: 'Public Lighting • High priority • Duplicate check suggested' },
    { time: '01 Sep 2026, 15:10', actor: 'Ward Officer', action: 'Assigned to team', detail: 'Electric maintenance team route set' },
    { time: '01 Sep 2026, 16:15', actor: 'Moderator', action: 'Duplicate reviewed', detail: 'Related issue confirmed, not auto-merged' },
  ]

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-sidebar-border bg-sidebar-accent p-5">
        <h3 className="text-sm font-semibold text-cream">Audit & compliance trail</h3>
        <div className="mt-4 space-y-3">
          {events.map((event) => (
            <div key={`${event.time}-${event.action}`} className="rounded-md border border-sidebar-border bg-sidebar p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium text-cream">{event.action}</p>
                <span className="text-[10px] uppercase tracking-wide text-cream/50">{event.time}</span>
              </div>
              <p className="mt-1 text-xs text-cream/60">Actor: {event.actor}</p>
              <p className="mt-2 text-sm text-cream/75">{event.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
