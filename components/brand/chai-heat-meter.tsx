import { cn } from '@/lib/utils'
import { heatLabel } from '@/lib/demo-data'

interface ChaiHeatMeterProps {
  heat: number
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  className?: string
}

/** Visual "Chai Heat" indicator — community support temperature. */
export function ChaiHeatMeter({
  heat,
  size = 'md',
  showLabel = true,
  className,
}: ChaiHeatMeterProps) {
  const flames = Math.max(1, Math.round(heat / 25))
  const dims = {
    sm: { cup: 'h-6 w-6', text: 'text-xs', deg: 'text-sm' },
    md: { cup: 'h-9 w-9', text: 'text-xs', deg: 'text-lg' },
    lg: { cup: 'h-14 w-14', text: 'text-sm', deg: 'text-3xl' },
  }[size]

  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <div className="relative">
        <span
          className={cn(
            'flex items-center justify-center rounded-full bg-heat/10 text-heat',
            dims.cup,
          )}
          aria-hidden
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-1/2 w-1/2">
            <path
              d="M5 9h11l-.9 7.4A2.6 2.6 0 0 1 12.5 18.8H9a2.6 2.6 0 0 1-2.6-2.3L5 9Z"
              fill="currentColor"
            />
            <path
              d="M16 10.5h1.4a1.9 1.9 0 0 1 0 3.8H15.6"
              stroke="currentColor"
              strokeWidth="1.4"
              fill="none"
            />
          </svg>
        </span>
      </div>
      <div className="leading-tight">
        <div className="flex items-baseline gap-1.5">
          <span className={cn('font-display font-extrabold text-heat', dims.deg)}>
            {heat}&deg;
          </span>
          <span aria-hidden className="flex items-center gap-0.5">
            {Array.from({ length: flames }).map((_, i) => (
              <svg
                key={i}
                viewBox="0 0 24 24"
                className="h-3 w-3 text-heat"
                fill="currentColor"
              >
                <path d="M12 2c1 3-1 4-1 6a3 3 0 0 0 3 3c0-1 1-2 1-3 2 2 3 4 3 6a6 6 0 1 1-12 0c0-3 2-5 4-7 1-1 2-3 2-5Z" />
              </svg>
            ))}
          </span>
        </div>
        {showLabel && (
          <span className={cn('font-medium text-muted-foreground', dims.text)}>
            Chai Heat &middot; {heatLabel(heat)}
          </span>
        )}
      </div>
    </div>
  )
}
