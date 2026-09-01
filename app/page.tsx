import { SiteNav } from '@/components/landing/site-nav'
import { Hero } from '@/components/landing/hero'
import { WhatIs, HowItWorks, Channels, GovPreview, FinalCTA } from '@/components/landing/sections'
import { LocalChai, ChaiTapri } from '@/components/landing/trending'
import { AIShowcase } from '@/components/landing/ai-showcase'
import { ReportPreview } from '@/components/landing/report-preview'
import { SiteFooter } from '@/components/landing/site-footer'

export default function LandingPage() {
  return (
    <main className="min-h-dvh bg-background">
      <SiteNav />
      <Hero />
      <WhatIs />
      <HowItWorks />
      <LocalChai />
      <ChaiTapri />
      <AIShowcase />
      <ReportPreview />
      <Channels />
      <GovPreview />
      <FinalCTA />
      <SiteFooter />
    </main>
  )
}
