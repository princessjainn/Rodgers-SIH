import Link from 'next/link'
import { ArrowRight, Flame, TrendingUp } from 'lucide-react'
import { ChaiHeatMeter } from '@/components/brand/chai-heat-meter'
import { PriorityBadge } from '@/components/brand/badges'
import { ISSUES } from '@/lib/demo-data'
import { SiteFooter } from '@/components/landing/site-footer'
import { SiteNav } from '@/components/landing/site-nav'

const ranked = [...ISSUES].sort((a, b) => (b.chaiHeat ?? 0) - (a.chaiHeat ?? 0)).slice(0, 6)

export default function ChaiTapriPage() {
  return (
    <main className="min-h-dvh bg-background text-charcoal">
      <SiteNav />

      <section className="paper-grain border-b border-border">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:py-20">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-heat">
            Chai Tapri
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-charcoal sm:text-5xl">
            Dekho kis mudde ki chai sabse garam hai.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-charcoal/75">
            Issues rise in public visibility based on urgency, recurrence, community support, and the
            intensity of action around them — not just raw votes alone.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
                Trending this week
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold text-charcoal sm:text-3xl">
                Local heat map of reform priorities
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-charcoal/70">
              <TrendingUp className="h-4 w-4 text-heat" />
              Real-time signal
            </div>
          </div>

          <ol className="space-y-4">
            {ranked.map((issue, index) => (
              <li
                key={issue.id}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm md:flex-row md:items-center"
              >
                <div className="flex min-w-[56px] items-center justify-center">
                  <span className="font-display text-3xl font-extrabold text-charcoal/20">
                    {index + 1}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate font-display text-xl font-bold text-charcoal">{issue.title}</p>
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
                  <ChaiHeatMeter heat={issue.chaiHeat} size="sm" showLabel={false} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              { icon: Flame, title: 'Public urgency', text: 'The more people feel the problem, the more visible it becomes.' },
              { icon: TrendingUp, title: 'Actionable momentum', text: 'Repeated reports and support create clarity for authorities.' },
              { icon: ArrowRight, title: 'Follow through', text: 'Issues can be strengthened, resolved, or revisited with full context.' },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-border bg-background p-5">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-heat/10 text-heat">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-charcoal">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/citizen"
              className="inline-flex items-center gap-2 rounded-xl bg-chai px-6 py-3.5 text-sm font-semibold text-cream transition-transform hover:-translate-y-0.5"
            >
              Join the Charcha
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
