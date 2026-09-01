'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { SiteNav } from '@/components/landing/site-nav'
import { SiteFooter } from '@/components/landing/site-footer'
import { Composer } from './composer'
import {
  LocalChaiView,
  ChaiTapriView,
  MyCharchaView,
  ProfileView,
} from './views'
import { Home, Flame, ScrollText, User, Plus, WifiOff, ArrowRight } from 'lucide-react'
import { LOCALITY } from '@/lib/demo-data'
import { ChaiHeatMeter } from '@/components/brand/chai-heat-meter'
import { MapPin } from 'lucide-react'
import type { IssueRecord } from '@/lib/types'
import { useLanguage } from '@/components/language-provider'

type Tab = 'home' | 'tapri' | 'charcha' | 'profile'

export function CitizenApp() {
  const { t } = useLanguage()
  const NAV: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: 'home', label: t.citizenApp.tabs[0], icon: Home },
    { key: 'tapri', label: t.citizenApp.tabs[1], icon: Flame },
    { key: 'charcha', label: t.citizenApp.tabs[2], icon: ScrollText },
    { key: 'profile', label: t.citizenApp.tabs[3], icon: User },
  ]

  const [tab, setTab] = useState<Tab>('home')
  const [composerOpen, setComposerOpen] = useState(false)
  const [localHeat, setLocalHeat] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false

    fetch('/api/issues')
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('Failed'))))
      .then((payload) => {
        if (cancelled) return
        const issues: IssueRecord[] = Array.isArray(payload?.issues) ? payload.issues : []
        const topIssue = [...issues].sort((a, b) => (b.chaiHeat ?? 0) - (a.chaiHeat ?? 0))[0]
        setLocalHeat(topIssue ? topIssue.chaiHeat : 82)
      })
      .catch(() => {
        if (!cancelled) setLocalHeat(82)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <main className="min-h-dvh bg-background text-charcoal">
      <SiteNav />

      {/* Hero banner */}
      <section className="paper-grain border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-leaf/40 bg-leaf/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-leaf">
                <WifiOff className="h-3 w-3" />
                {t.citizenApp.offline}
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-charcoal sm:text-5xl lg:text-6xl">
                {t.citizenApp.title}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-charcoal/75">
                {t.citizenApp.subtitle}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => setComposerOpen(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-terracotta px-5 py-3 text-sm font-semibold text-cream shadow-sm transition-transform hover:-translate-y-0.5"
                >
                  <Plus className="h-4 w-4" />
                  {t.citizenApp.primary}
                </button>
                <Link
                  href="/chai-tapri"
                  className="inline-flex items-center gap-2 rounded-xl border border-chai/30 bg-cream px-5 py-3 text-sm font-semibold text-chai transition-colors hover:bg-chai/5"
                >
                  {t.citizenApp.secondary}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-lg">
              <div className="rounded-2xl border border-border bg-chai p-5 text-cream">
                <p className="text-xs uppercase tracking-widest text-cream/60">{t.citizenApp.yourChai}</p>
                <div className="mt-2 flex items-center justify-between">
                  <div>
                    <p className="font-display text-3xl font-extrabold">PIN {LOCALITY.pin}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-cream/75">
                      <MapPin className="h-3.5 w-3.5" />
                      {LOCALITY.name}
                    </p>
                  </div>
                  <ChaiHeatMeter heat={localHeat ?? 82} size="md" showLabel={false} className="text-cream" />
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-charcoal/65">
                {t.citizenApp.feedText} — {t.citizenApp.subtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Desktop tab navigation */}
      <section className="sticky top-16 z-40 border-b border-border bg-cream/90 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex items-center gap-1 overflow-x-auto py-2">
            {NAV.map((n) => {
              const Icon = n.icon
              return (
                <button
                  key={n.key}
                  onClick={() => setTab(n.key)}
                  aria-current={tab === n.key ? 'page' : undefined}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors whitespace-nowrap',
                    tab === n.key
                      ? 'bg-chai text-cream shadow-sm'
                      : 'text-charcoal/60 hover:bg-chai/10 hover:text-chai',
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {n.label}
                </button>
              )
            })}

            <div className="ml-auto">
              <button
                onClick={() => setComposerOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-terracotta px-4 py-2.5 text-sm font-semibold text-cream shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <Plus className="h-4 w-4" />
                {t.citizenApp.primary}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tab content */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {tab === 'home' && <LocalChaiDesktopView />}
          {tab === 'tapri' && <ChaiTapriDesktopView />}
          {tab === 'charcha' && <MyCharchaDesktopView />}
          {tab === 'profile' && <ProfileDesktopView />}
        </div>
      </section>

      <SiteFooter />

      {composerOpen && <Composer onClose={() => setComposerOpen(false)} />}
    </main>
  )
}

/* ---- Desktop wrapper views that use existing view components in full-width layouts ---- */

function LocalChaiDesktopView() {
  const { t } = useLanguage()

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
          {t.citizenApp.feed}
        </span>
        <h2 className="mt-2 font-display text-2xl font-bold text-charcoal sm:text-3xl">
          {t.citizenApp.feedText}
        </h2>
        <p className="mt-1 text-sm text-charcoal/60">
          Browse, support and discuss civic issues around PIN {LOCALITY.pin}
        </p>
      </div>
      <LocalChaiView />
    </div>
  )
}

function ChaiTapriDesktopView() {
  const { t } = useLanguage()

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-heat">
          {t.citizenApp.trending}
        </span>
        <h2 className="mt-2 font-display text-2xl font-bold text-charcoal sm:text-3xl">
          {t.citizenApp.trendingText}
        </h2>
        <p className="mt-1 text-sm text-charcoal/60">
          Dekho kis mudde ki chai sabse garam hai.
        </p>
      </div>
      <ChaiTapriView />
    </div>
  )
}

function MyCharchaDesktopView() {
  const { t } = useLanguage()

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-chai">
          {t.citizenApp.discussions}
        </span>
        <h2 className="mt-2 font-display text-2xl font-bold text-charcoal sm:text-3xl">
          {t.citizenApp.tabs[2]}
        </h2>
        <p className="mt-1 text-sm text-charcoal/60">
          Track issues you've filed, are watching or have supported.
        </p>
      </div>
      <MyCharchaView />
    </div>
  )
}

function ProfileDesktopView() {
  const { t } = useLanguage()

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
          Account
        </span>
        <h2 className="mt-2 font-display text-2xl font-bold text-charcoal sm:text-3xl">
          {t.citizenApp.profile}
        </h2>
        <p className="mt-1 text-sm text-charcoal/60">
          {t.citizenApp.profileText}
        </p>
      </div>
      <ProfileView />
    </div>
  )
}
