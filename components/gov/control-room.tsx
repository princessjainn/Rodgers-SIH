'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Logo } from '@/components/brand/logo'
import {
  OverviewView,
  ComplaintsView,
  GISView,
  AnalyticsView,
  RegistryView,
  AuditView,
} from '@/components/gov/control-room-views'
import {
  LayoutDashboard,
  ListChecks,
  Map,
  ChartColumn,
  ShieldCheck,
  Bell,
  ArrowLeft,
} from 'lucide-react'

type Tab = 'overview' | 'complaints' | 'gis' | 'analytics' | 'registry' | 'audit'

const NAV: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'complaints', label: 'Complaints', icon: ListChecks },
  { id: 'gis', label: 'Chai Heat Map', icon: Map },
  { id: 'analytics', label: 'Analytics', icon: ChartColumn },
  { id: 'registry', label: 'Registry', icon: ShieldCheck },
  { id: 'audit', label: 'Audit', icon: Bell },
]

const TITLES: Record<Tab, { title: string; sub: string }> = {
  overview: { title: 'Control Room', sub: 'Live civic operations across the ward' },
  complaints: { title: 'Complaints', sub: 'Normalized, prioritized, de-duplicated' },
  gis: { title: 'Chai Heat Map', sub: 'Privacy-preserving geographic hotspots' },
  analytics: { title: 'Analytics', sub: 'Resolution performance & SLA trends' },
  registry: { title: 'Officer Registry', sub: 'Authority, hub and contact routing' },
  audit: { title: 'Audit & Compliance', sub: 'Status history, access logs and governance trail' },
}

export function ControlRoom() {
  const [tab, setTab] = useState<Tab>('overview')
  const head = TITLES[tab]

  return (
    <div className="flex min-h-screen bg-sidebar font-sans text-cream">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-charcoal p-4 lg:flex">
        <div className="flex items-center gap-2.5 px-2 py-2">
          <Logo showWordmark={false} className="shrink-0" />
          <div>
            <p className="font-display text-sm font-extrabold leading-tight text-cream">
              CivicChai
            </p>
            <p className="text-[11px] text-gold">Control Room</p>
          </div>
        </div>

        <nav className="mt-6 flex flex-col gap-1">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => setTab(n.id)}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                tab === n.id
                  ? 'bg-gold text-charcoal'
                  : 'text-cream/70 hover:bg-sidebar-accent hover:text-cream',
              )}
            >
              <n.icon className="h-4 w-4" />
              {n.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto space-y-3">
          <div className="rounded-lg border border-sidebar-border bg-sidebar-accent p-3">
            <p className="flex items-center gap-2 text-xs font-semibold text-cream">
              <ShieldCheck className="h-4 w-4 text-leaf" /> RBAC active
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-cream/50">
              Ward Officer · scoped to PIN 401208–401303. All actions audited.
            </p>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-xs text-cream/60 hover:text-cream"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-sidebar-border bg-charcoal/90 px-5 py-3.5 backdrop-blur">
          <div>
            <h1 className="font-display text-lg font-extrabold text-cream">
              {head.title}
            </h1>
            <p className="text-xs text-cream/50">{head.sub}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="relative rounded-md border border-sidebar-border p-2 text-cream/70 hover:text-cream"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-heat text-[10px] font-bold text-cream">
                7
              </span>
            </button>
            <div className="flex items-center gap-2 rounded-md border border-sidebar-border px-3 py-1.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold text-xs font-bold text-charcoal">
                RK
              </span>
              <div className="hidden sm:block">
                <p className="text-xs font-semibold text-cream">R. Kulkarni</p>
                <p className="text-[10px] text-cream/50">Ward Officer</p>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile tabs */}
        <div className="flex gap-1 overflow-x-auto border-b border-sidebar-border bg-charcoal px-3 py-2 lg:hidden">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => setTab(n.id)}
              className={cn(
                'flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium',
                tab === n.id
                  ? 'bg-gold text-charcoal'
                  : 'text-cream/70',
              )}
            >
              <n.icon className="h-3.5 w-3.5" />
              {n.label}
            </button>
          ))}
        </div>

        <main className="flex-1 overflow-x-hidden p-5">
          {tab === 'overview' && <OverviewView />}
          {tab === 'complaints' && <ComplaintsView />}
          {tab === 'gis' && <GISView />}
          {tab === 'analytics' && <AnalyticsView />}
          {tab === 'registry' && <RegistryView />}
          {tab === 'audit' && <AuditView />}
        </main>
      </div>
    </div>
  )
}
