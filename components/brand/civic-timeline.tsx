import { cn } from '@/lib/utils'
import type { IssueStatus } from '@/lib/types'
import { TIMELINE_STEPS } from '@/lib/demo-data'
import { Check } from 'lucide-react'

const ORDER: IssueStatus[] = TIMELINE_STEPS.map((s) => s.key)

export function CivicTimeline({
  status,
  className,
}: {
  status: IssueStatus
  className?: string
}) {
  const currentIndex = ORDER.indexOf(status)
  return (
    <ol className={cn('space-y-0', className)}>
      {TIMELINE_STEPS.map((step, i) => {
        const done = i < currentIndex
        const current = i === currentIndex
        const last = i === TIMELINE_STEPS.length - 1
        return (
          <li key={step.key} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold',
                  done && 'border-leaf bg-leaf text-leaf-foreground',
                  current && 'border-terracotta bg-terracotta text-cream animate-heat',
                  !done && !current && 'border-border bg-card text-muted-foreground',
                )}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : current ? '' : ''}
              </span>
              {!last && (
                <span
                  className={cn(
                    'w-px flex-1 min-h-6',
                    done ? 'bg-leaf' : 'bg-border',
                  )}
                  aria-hidden
                />
              )}
            </div>
            <div className={cn('pb-4 pt-0.5', last && 'pb-0')}>
              <p
                className={cn(
                  'text-sm font-medium',
                  done && 'text-foreground',
                  current && 'text-terracotta font-semibold',
                  !done && !current && 'text-muted-foreground',
                )}
              >
                {step.label}
              </p>
              {current && (
                <p className="text-xs text-muted-foreground">In progress now</p>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
