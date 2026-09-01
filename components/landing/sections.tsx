import Link from 'next/link'
import {
  Camera,
  MessageSquare,
  Brain,
  CopyCheck,
  Users,
  Flame,
  Building2,
  Activity,
  Mic,
  Phone,
  Keyboard,
  Globe,
  ArrowRight,
} from 'lucide-react'

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-widest text-terracotta">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-2 text-balance font-display text-3xl font-extrabold tracking-tight text-charcoal sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-pretty text-base leading-relaxed text-charcoal/70">
          {subtitle}
        </p>
      )}
    </div>
  )
}

export function WhatIs() {
  return (
    <section id="about" className="border-y border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="What is CivicChai?"
          title="CivicChai turns everyday civic problems into community discussions."
          subtitle="It is not just a complaint portal. It is the tapri where your mohalla gathers — report an issue, discuss it, support it, and follow it all the way to government action."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: MessageSquare,
              t: 'Charcha, not complaints',
              d: 'Every issue is a conversation your neighbours can join, support and shape.',
            },
            {
              icon: Brain,
              t: 'AI that understands you',
              d: 'Type or speak in Hindi, Marathi, English or Hinglish — the AI gets it.',
            },
            {
              icon: Building2,
              t: 'Straight to the right desk',
              d: 'Issues are routed to the correct department, officer and municipal hub.',
            },
          ].map((c) => (
            <div
              key={c.t}
              className="rounded-2xl border border-border bg-background p-6"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-chai/10 text-chai">
                <c.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-charcoal">
                {c.t}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-charcoal/70">
                {c.d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const FLOW = [
  { icon: Camera, label: 'Scan' },
  { icon: MessageSquare, label: 'Report' },
  { icon: Brain, label: 'AI understands' },
  { icon: CopyCheck, label: 'Duplicate check' },
  { icon: Users, label: 'Community votes' },
  { icon: Flame, label: 'Chai gets hotter' },
  { icon: Building2, label: 'Department action' },
  { icon: Activity, label: 'Track resolution' },
]

export function HowItWorks() {
  return (
    <section id="how" className="paper-grain">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="How CivicChai works"
          title="Se ek cup chai se civic action tak."
          subtitle="From a social post to an official civic case file — here is the journey every Charcha takes."
        />
        <ol className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {FLOW.map((step, i) => (
            <li
              key={step.label}
              className="relative flex flex-col items-start gap-3 rounded-2xl border border-border bg-card p-4"
            >
              <div className="flex w-full items-center justify-between">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-terracotta/10 text-terracotta">
                  <step.icon className="h-5 w-5" />
                </span>
                <span className="font-display text-sm font-bold text-charcoal/30">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <p className="text-sm font-semibold text-charcoal">{step.label}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function Channels() {
  const items = [
    {
      icon: Mic,
      t: 'Smartphone',
      d: 'Speak your problem — voice becomes a structured complaint.',
    },
    {
      icon: Phone,
      t: 'Keypad phone',
      d: 'Just call CivicChai. A voice agent files it for you, DTMF fallback included.',
    },
    {
      icon: Keyboard,
      t: 'Web',
      d: 'Type it out in your language on any browser, even a shared device.',
    },
  ]
  return (
    <section className="border-y border-border bg-chai text-cream">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold">
            Works even without a smartphone
          </span>
          <h2 className="mt-2 text-balance font-display text-3xl font-extrabold sm:text-4xl">
            Har awaaz maayne rakhti hai.
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-cream/75">
            Smartphone, keypad phone ya web — a voice agent and AI turn every
            channel into the same civic issue.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {items.map((c) => (
            <div
              key={c.t}
              className="rounded-2xl border border-cream/15 bg-cream/5 p-6"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gold/20 text-gold">
                <c.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold">{c.t}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-cream/70">
                {c.d}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-cream/70">
          <Globe className="h-4 w-4 text-gold" />
          Voice Agent &rarr; AI &rarr; Complaint, in your language.
        </div>
      </div>
    </section>
  )
}

export function GovPreview() {
  return (
    <section className="paper-grain">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-terracotta">
            From Charcha to Action
          </span>
          <h2 className="mt-2 text-balance font-display text-3xl font-extrabold tracking-tight text-charcoal sm:text-4xl">
            The CivicChai Control Room.
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-charcoal/70">
            Authorities get a clean, dense operations dashboard — priority that
            combines severity, persistence, evidence and community support, not
            just raw votes. Every sensitive action is auditable.
          </p>
          <Link
            href="/control-room"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-charcoal px-5 py-3 text-sm font-semibold text-cream transition-transform hover:-translate-y-0.5"
          >
            Open the Control Room
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { k: 'Total Issues', v: '4,218', c: 'text-charcoal' },
            { k: 'Critical', v: '46', c: 'text-heat' },
            { k: 'Overdue', v: '112', c: 'text-terracotta' },
            { k: 'Resolved', v: '3,006', c: 'text-leaf' },
          ].map((s) => (
            <div
              key={s.k}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-charcoal/50">
                {s.k}
              </p>
              <p className={`mt-1 font-display text-3xl font-extrabold ${s.c}`}>
                {s.v}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FinalCTA() {
  return (
    <section className="border-t border-border bg-card">
      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
        <p className="mx-auto max-w-2xl text-balance font-display text-2xl font-bold leading-snug text-charcoal sm:text-3xl">
          Har mohalla ki ek Chai hoti hai. Har Chai ki ek Charcha hoti hai. Aur
          har Charcha se badlav shuru ho sakta hai.
        </p>
        <p className="mt-6 text-lg font-semibold text-terracotta">
          Chai thandi hone se pehle, baat ko aage badhao.
        </p>
        <Link
          href="/citizen"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-chai px-6 py-3.5 text-sm font-semibold text-cream shadow-sm transition-transform hover:-translate-y-0.5"
        >
          Start Your Charcha
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}
