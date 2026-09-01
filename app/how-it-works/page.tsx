'use client'

import Link from 'next/link'
import { ArrowRight, Brain, Building2, Camera, CopyCheck, Flame, MessageSquare, Users } from 'lucide-react'
import { SiteFooter } from '@/components/landing/site-footer'
import { SiteNav } from '@/components/landing/site-nav'
import { useLanguage } from '@/components/language-provider'

const stepIcons = [Camera, MessageSquare, Brain, CopyCheck, Users, Flame, Building2, ArrowRight]

export default function HowItWorksPage() {
  const { t } = useLanguage()
  const steps = t.howPage.stepTitles.map((title, index) => ({
    icon: stepIcons[index] ?? Camera,
    title,
    description: t.howPage.stepDescriptions[index],
  }))

  return (
    <main className="min-h-dvh bg-background text-charcoal">
      <SiteNav />

      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:py-20">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-terracotta">
            {t.howPage.eyebrow}
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-charcoal sm:text-5xl">
            {t.howPage.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-charcoal/75">
            {t.howPage.subtitle}
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
                {t.howPage.civicIntelligence}
              </span>
              <h2 className="mt-3 font-display text-3xl font-extrabold text-cream sm:text-4xl">
                {t.howPage.civicIntelligenceTitle}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-cream/75">
                {t.howPage.civicIntelligenceText}
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
            {t.howPage.summary}
          </p>
          <Link
            href="/citizen"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-chai px-6 py-3.5 text-sm font-semibold text-cream transition-transform hover:-translate-y-0.5"
          >
            {t.howPage.summaryCta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
