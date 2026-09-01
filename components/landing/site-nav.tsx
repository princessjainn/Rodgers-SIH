'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/brand/logo'
import { Menu, X } from 'lucide-react'

const LINKS = [
  { label: 'Local Chai', href: '/citizen' },
  { label: 'How it Works', href: '/how-it-works' },
  { label: 'Chai Tapri', href: '/chai-tapri' },
  { label: 'For Authorities', href: '/control-room' },
  { label: 'About', href: '/about' },
]

export function SiteNav() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-cream/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" aria-label="CivicChai home">
          <Logo />
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-charcoal/70 transition-colors hover:text-chai"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/control-room"
            className="rounded-lg px-3 py-2 text-sm font-semibold text-chai transition-colors hover:bg-chai/10"
          >
            Authority Login
          </Link>
          <Link
            href="/citizen"
            className="rounded-lg bg-chai px-4 py-2 text-sm font-semibold text-cream shadow-sm transition-colors hover:bg-chai/90"
          >
            Start a Charcha
          </Link>
        </div>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-chai md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-cream px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-charcoal/80 hover:bg-chai/10"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/citizen"
              className="mt-2 rounded-lg bg-chai px-4 py-2.5 text-center text-sm font-semibold text-cream"
            >
              Start a Charcha
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
