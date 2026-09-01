import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  showWordmark?: boolean
  variant?: 'default' | 'inverted'
}

/**
 * CivicChai logo — a kulhad / chai cup fused with a speech bubble (charcha)
 * and a subtle civic signal (the rising steam doubling as a broadcast mark).
 */
export function Logo({
  className,
  showWordmark = true,
  variant = 'default',
}: LogoProps) {
  const wordColor =
    variant === 'inverted' ? 'text-cream' : 'text-chai'
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-chai text-cream shadow-sm">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5"
          aria-hidden="true"
        >
          {/* steam / civic signal */}
          <path
            d="M9 3.2c-.7.8-.7 1.6 0 2.4M12 2.6c-.8 1-.8 2 0 3M15 3.2c.7.8.7 1.6 0 2.4"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            className="text-gold"
          />
          {/* cup body doubling as a speech bubble */}
          <path
            d="M5 8.5h12.5a0 0 0 0 1 0 0l-1 8.2A3 3 0 0 1 13.5 19.4H8.9a3 3 0 0 1-3-2.7L5 8.5Z"
            fill="currentColor"
          />
          <path
            d="M17.5 10.2h1.6a2.2 2.2 0 0 1 0 4.4h-1.1"
            stroke="currentColor"
            strokeWidth="1.4"
            fill="none"
          />
          {/* speech-bubble tail */}
          <path
            d="M9.2 19.4 8 22l3-2.4"
            fill="currentColor"
          />
        </svg>
      </span>
      {showWordmark && (
        <span className={cn('font-display text-lg font-extrabold tracking-tight', wordColor)}>
          Civic<span className="text-terracotta">Chai</span>
        </span>
      )}
    </div>
  )
}
