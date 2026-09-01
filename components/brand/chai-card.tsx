'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { Issue } from '@/lib/demo-data'
import { ChaiHeatMeter } from './chai-heat-meter'
import { StatusBadge, DepartmentBadge } from './badges'
import { MapPin, MessageCircle, Users, Flame } from 'lucide-react'

export function ChaiCard({ issue }: { issue: Issue }) {
  const [supported, setSupported] = useState(false)
  const supporters = issue.supporters + (supported ? 1 : 0)

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3 p-4 pb-3">
        <div className="min-w-0">
          <div className="mb-1.5 flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 text-terracotta" />
            <span className="font-medium text-foreground">{issue.pin}</span>
            <span>&middot;</span>
            <span className="truncate">{issue.locality}</span>
          </div>
          <h3 className="font-display text-base font-bold leading-snug text-foreground">
            {issue.title}
          </h3>
        </div>
        <StatusBadge status={issue.status} />
      </div>

      <p className="px-4 text-sm leading-relaxed text-muted-foreground">
        {issue.description}
      </p>

      <div className="flex flex-wrap items-center gap-2 px-4 pt-3">
        <DepartmentBadge department={issue.department} />
        <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
          {issue.category}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 border-t border-border bg-secondary/40 px-4 py-3">
        <ChaiHeatMeter heat={issue.chaiHeat} size="sm" />
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {supporters.toLocaleString('en-IN')}
          </span>
          <span className="inline-flex items-center gap-1">
            <MessageCircle className="h-3.5 w-3.5" />
            {issue.comments}
          </span>
          <span>{issue.daysUnresolved > 0 ? `${issue.daysUnresolved}d open` : 'Resolved'}</span>
        </div>
      </div>

      <div className="flex gap-2 p-3">
        <button
          onClick={() => setSupported((s) => !s)}
          aria-pressed={supported}
          className={cn(
            'flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold transition-colors',
            supported
              ? 'bg-heat text-heat-foreground'
              : 'bg-heat/10 text-heat hover:bg-heat/20',
          )}
        >
          <Flame className={cn('h-4 w-4', supported && 'animate-heat')} />
          {supported ? 'Supported' : 'Support'}
        </button>
        <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-chai/10 px-3 py-2 text-sm font-semibold text-chai transition-colors hover:bg-chai/20">
          <MessageCircle className="h-4 w-4" />
          Charcha
        </button>
      </div>
    </article>
  )
}
