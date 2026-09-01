import { ISSUES } from '@/lib/demo-data'
import { ChaiHeatMeter } from '@/components/brand/chai-heat-meter'
import { CivicTimeline } from '@/components/brand/civic-timeline'
import { PriorityBadge, TrustBadge } from '@/components/brand/badges'
import { Logo } from '@/components/brand/logo'
import { Building2, MapPin, Phone, ShieldCheck, FileText } from 'lucide-react'

export function ReportPreview() {
  const issue =
    ISSUES[1] ?? {
      documentId: 'CC-READY-000001',
      title: 'Community issue intake',
      locality: 'Your neighbourhood',
      description:
        'This section will display a live civic issue from Supabase once your backend and database are connected.',
      department: 'Municipal operations',
      pin: 'Local feed',
      hub: 'Live system',
      officer: 'Assigned by workflow',
      priority: 'Moderate' as const,
      trust: 0,
      reports: 0,
      supporters: 0,
      daysUnresolved: 0,
      status: 'Filed' as const,
      chaiHeat: 0,
    }

  return (
    <section className="paper-grain">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-terracotta">
            Your complaint becomes a Civic Report
          </span>
          <h2 className="mt-2 text-balance font-display text-3xl font-extrabold tracking-tight text-charcoal sm:text-4xl">
            Social post &rarr; official civic case file.
          </h2>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-card shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-chai px-6 py-4 text-cream">
            <div className="flex items-center gap-3">
              <Logo showWordmark={false} variant="inverted" />
              <div>
                <p className="text-xs uppercase tracking-widest text-cream/60">
                  CivicChai Report
                </p>
                <p className="font-mono text-sm font-semibold">
                  {issue.documentId}
                </p>
              </div>
            </div>
            <PriorityBadge priority={issue.priority} />
          </div>

          <div className="grid gap-6 p-6 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h3 className="font-display text-xl font-extrabold text-charcoal">
                {issue.title} — {issue.locality}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
                {issue.description}
              </p>

              <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
                <Detail icon={Building2} k="Department" v={issue.department} />
                <Detail icon={MapPin} k="PIN Hub" v={`${issue.pin} · ${issue.hub}`} />
                <Detail icon={ShieldCheck} k="Officer / Office" v={issue.officer} />
                <Detail icon={Phone} k="Official Contact" v="Live routing via Supabase" />
              </dl>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <TrustBadge trust={issue.trust} />
                <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-1 text-xs text-charcoal/70">
                  <FileText className="h-3.5 w-3.5" />
                  {issue.reports} independent reports
                </span>
              </div>

              <div className="mt-5 rounded-xl border border-border bg-background p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-charcoal/50">
                  Relevant public reference
                </p>
                <p className="mt-1 text-sm text-charcoal/80">
                  This detail is populated from your live civic workflow once Supabase is connected.
                </p>
                <p className="mt-2 text-xs italic text-charcoal/50">
                  For civic education only — not legal advice.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-background p-5">
              <ChaiHeatMeter heat={issue.chaiHeat} size="lg" />
              <p className="mt-1 text-xs text-charcoal/60">
                {issue.supporters.toLocaleString('en-IN')} supporters &middot;{' '}
                {issue.daysUnresolved} days unresolved
              </p>
              <div className="my-4 h-px bg-border" />
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-charcoal/50">
                Tracking timeline
              </p>
              <CivicTimeline status={issue.status} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Detail({
  icon: Icon,
  k,
  v,
}: {
  icon: React.ElementType
  k: string
  v: string
}) {
  return (
    <div>
      <dt className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-charcoal/50">
        <Icon className="h-3.5 w-3.5" />
        {k}
      </dt>
      <dd className="mt-1 text-sm font-medium text-charcoal">{v}</dd>
    </div>
  )
}
