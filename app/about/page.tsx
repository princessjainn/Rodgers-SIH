import Link from 'next/link'
import { ArrowRight, Brain, Building2, MessageSquare, ShieldCheck, Users } from 'lucide-react'
import { SiteFooter } from '@/components/landing/site-footer'
import { SiteNav } from '@/components/landing/site-nav'

const pillars = [
  {
    icon: MessageSquare,
    title: 'Charcha-first civic culture',
    description:
      'CivicChai treats everyday problems as public conversations, not just anonymous complaints. Citizens can speak up, support others, and see momentum build around real issues.',
  },
  {
    icon: Brain,
    title: 'AI built for Indian languages',
    description:
      'People report issues in English, Hindi, Marathi, Hinglish, and other natural expressions. The AI understands the intent and turns it into a structured civic case.',
  },
  {
    icon: Building2,
    title: 'A direct line to the right office',
    description:
      'Each issue is mapped to the relevant department and hub, so action happens without losing context or being buried under noise.',
  },
  {
    icon: ShieldCheck,
    title: 'Transparent and accountable',
    description:
      'Every update is traceable. Officials see priority, evidence, and community backing in one place, with a clear audit trail for each decision.',
  },
]

const stats = [
  { label: 'Cities in network', value: '120+' },
  { label: 'Issues resolved', value: '18.4k' },
  { label: 'Public support', value: '6.7M' },
  { label: 'Avg. routing time', value: '< 3 hrs' },
]

export default function AboutPage() {
  return (
    <main className="min-h-dvh bg-background text-charcoal">
      <SiteNav />

      <section className="paper-grain border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="inline-flex items-center rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-chai">
                About CivicChai
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-charcoal sm:text-5xl lg:text-6xl">
                A digital chai tapri for civic life.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-charcoal/75">
                CivicChai is a community-powered civic platform that helps citizens raise issues,
                support the problems that matter, and push them toward resolution without the usual
                confusion and bureaucracy.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/citizen"
                  className="inline-flex items-center gap-2 rounded-xl bg-chai px-5 py-3 text-sm font-semibold text-cream shadow-sm transition-transform hover:-translate-y-0.5"
                >
                  Start a Charcha
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/control-room"
                  className="inline-flex items-center gap-2 rounded-xl border border-chai/30 bg-cream px-5 py-3 text-sm font-semibold text-chai transition-colors hover:bg-chai/5"
                >
                  View Control Room
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-lg">
              <div className="grid gap-4 sm:grid-cols-2">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-border bg-background p-4">
                    <p className="font-display text-3xl font-extrabold text-chai">{stat.value}</p>
                    <p className="mt-1 text-sm text-charcoal/65">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-2xl border border-leaf/30 bg-leaf/10 p-4 text-sm text-charcoal/75">
                <div className="flex items-center gap-2 font-semibold text-leaf">
                  <Users className="h-4 w-4" />
                  Community-driven visibility
                </div>
                <p className="mt-2 leading-relaxed">
                  The more people support a problem, the more heat it gains. That visibility helps
                  communities and officials focus on the issues that matter most in real time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
              Why it exists
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-charcoal sm:text-4xl">
              Civic issues should be visible, understandable, and actionable.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {pillars.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-chai/10 text-chai">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-xl font-bold text-charcoal">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <p className="font-display text-2xl font-bold leading-snug text-charcoal sm:text-3xl">
            We believe every neighborhood should have a simple way to turn concern into action.
          </p>
          <Link
            href="/how-it-works"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-charcoal px-6 py-3.5 text-sm font-semibold text-cream transition-transform hover:-translate-y-0.5"
          >
            See how it works
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
