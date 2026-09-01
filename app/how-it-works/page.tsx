import Link from 'next/link'
import { ArrowRight, Brain, Building2, Camera, CopyCheck, Flame, MessageSquare, Users } from 'lucide-react'
import { SiteFooter } from '@/components/landing/site-footer'
import { SiteNav } from '@/components/landing/site-nav'

const steps = [
  { icon: Camera, title: 'Capture', description: 'A resident spots a problem and reports it in a few taps or by voice.' },
  { icon: MessageSquare, title: 'Describe', description: 'The issue is interpreted in natural language, including Hindi, Marathi, Hinglish, and more.' },
  { icon: Brain, title: 'AI inference', description: 'The platform classifies the category, suggests the right department, and flags duplicates.' },
  { icon: CopyCheck, title: 'Validate', description: 'The citizen can confirm the match, strengthen an existing issue, or create a new one.' },
  { icon: Users, title: 'Community support', description: 'Neighbours add signals through comments, support, and shared context that increase visibility.' },
  { icon: Flame, title: 'Heat grows', description: 'The issue gains traction and becomes a visible civic priority across the local network.' },
  { icon: Building2, title: 'Department action', description: 'The municipal team or authority receives a clean, structured case passed through the right workflow.' },
  { icon: ArrowRight, title: 'Resolution', description: 'Status and outcome updates are tracked so citizens can see the issue move from concern to action.' },
]

export default function HowItWorksPage() {
  return (
    <main className="min-h-dvh bg-background text-charcoal">
      <SiteNav />

      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:py-20">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-terracotta">
            How it works
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-charcoal sm:text-5xl">
            From a neighbourhood concern to civic action.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-charcoal/75">
            CivicChai keeps the journey simple: report, understand, validate, support, and resolve.
            The platform is designed to move from local chatter to actual public accountability.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {steps.map(({ icon: Icon, title, description }, index) => (
              <div key={title} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-terracotta/10 text-terracotta">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-display text-sm font-bold text-charcoal/30">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h2 className="mt-4 font-display text-xl font-bold text-charcoal">{title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-chai text-cream">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Civic intelligence
              </span>
              <h2 className="mt-3 font-display text-3xl font-extrabold text-cream sm:text-4xl">
                Smart routing, not chaotic filing.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-cream/75">
                The system uses semantic matching, location signals, and support patterns to decide
                whether a problem is new, already active, or should be merged into an existing community
                report. This reduces duplicate work while still giving people a voice.
              </p>
            </div>

            <div className="rounded-3xl border border-cream/15 bg-cream/5 p-6">
              <div className="space-y-4 text-sm">
                {[
                  ['Input', 'Streetlights not working near Station Road'],
                  ['Language', 'Hindi + English + local context'],
                  ['Intent', 'Public lighting outage'],
                  ['Match', 'Duplicate found · existing issue strengthened'],
                  ['Department', 'Municipal lighting team'],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-start justify-between gap-4 border-b border-cream/10 pb-3 last:border-0 last:pb-0">
                    <span className="text-cream/65">{k}</span>
                    <span className="text-right font-semibold text-cream">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="font-display text-2xl font-bold leading-snug text-charcoal sm:text-3xl">
            The goal is not just reporting. It is movement, visibility, and accountability.
          </p>
          <Link
            href="/citizen"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-chai px-6 py-3.5 text-sm font-semibold text-cream transition-transform hover:-translate-y-0.5"
          >
            Try the civic feed
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
