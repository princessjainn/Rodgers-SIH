'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/brand/logo'
import { Composer } from './composer'
import {
  LocalChaiView,
  ChaiTapriView,
  MyCharchaView,
  ProfileView,
} from './views'
import { Home, Flame, ScrollText, User, Plus, WifiOff } from 'lucide-react'

type Tab = 'home' | 'tapri' | 'charcha' | 'profile'

const NAV: { key: Tab; label: string; icon: React.ElementType }[] = [
  { key: 'home', label: 'Local Chai', icon: Home },
  { key: 'tapri', label: 'Chai Tapri', icon: Flame },
  { key: 'charcha', label: 'My Charcha', icon: ScrollText },
  { key: 'profile', label: 'Profile', icon: User },
]

export function CitizenApp() {
  const [tab, setTab] = useState<Tab>('home')
  const [composerOpen, setComposerOpen] = useState(false)

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col bg-background paper-grain">
      {/* top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/90 px-4 py-3 backdrop-blur">
        <Link href="/" aria-label="CivicChai home">
          <Logo />
        </Link>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-leaf/40 bg-leaf/10 px-2.5 py-1 text-xs font-medium text-leaf">
          <WifiOff className="h-3 w-3" />
          Offline ready
        </span>
      </header>

      {/* views */}
      <main className="flex-1 px-4 pb-28 pt-4">
        {tab === 'home' && <LocalChaiView />}
        {tab === 'tapri' && <ChaiTapriView />}
        {tab === 'charcha' && <MyCharchaView />}
        {tab === 'profile' && <ProfileView />}
      </main>

      {/* bottom navigation */}
      <nav className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-md border-t border-border bg-card/95 px-2 backdrop-blur">
        <div className="relative flex items-center justify-between px-2 py-2">
          {NAV.slice(0, 2).map((n) => (
            <NavButton
              key={n.key}
              label={n.label}
              icon={n.icon}
              active={tab === n.key}
              onClick={() => setTab(n.key)}
            />
          ))}

          {/* center Pour a Chai */}
          <div className="flex w-16 shrink-0 flex-col items-center">
            <button
              onClick={() => setComposerOpen(true)}
              aria-label="Pour a Chai — start your Charcha"
              className="-mt-8 flex h-16 w-16 items-center justify-center rounded-full border-4 border-background bg-terracotta text-cream shadow-lg transition-transform hover:-translate-y-0.5 active:scale-95"
            >
              <Plus className="h-7 w-7" />
            </button>
            <span className="mt-0.5 text-[10px] font-semibold text-terracotta">
              Pour a Chai
            </span>
          </div>

          {NAV.slice(2).map((n) => (
            <NavButton
              key={n.key}
              label={n.label}
              icon={n.icon}
              active={tab === n.key}
              onClick={() => setTab(n.key)}
            />
          ))}
        </div>
      </nav>

      {composerOpen && <Composer onClose={() => setComposerOpen(false)} />}
    </div>
  )
}

function NavButton({
  label,
  icon: Icon,
  active,
  onClick,
}: {
  label: string
  icon: React.ElementType
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'flex flex-1 flex-col items-center gap-0.5 rounded-lg py-1.5 text-[10px] font-medium transition-colors',
        active ? 'text-chai' : 'text-charcoal/50',
      )}
    >
      <Icon className={cn('h-5 w-5', active && 'text-chai')} />
      {label}
    </button>
  )
}
