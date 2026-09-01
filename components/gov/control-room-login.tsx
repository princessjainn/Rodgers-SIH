'use client'

import { useState } from 'react'
import { useAuth } from '@/components/auth-provider'
import { Logo } from '@/components/brand/logo'

export function ControlRoomLogin() {
  const { login } = useAuth()
  const [email, setEmail] = useState('officer@civic.local')
  const [password, setPassword] = useState('demo123')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await login({ email, password })
    } catch (err) {
      setError('Invalid credentials')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-sidebar px-4">
      <div className="w-full max-w-md rounded-2xl border border-sidebar-border bg-sidebar-accent p-8 shadow-2xl">
        <div className="mb-8 flex flex-col items-center gap-3">
          <Logo showWordmark={false} className="shrink-0" />
          <div className="text-center">
            <p className="font-display text-xl font-extrabold text-cream">
              CivicChai Control Room
            </p>
            <p className="text-xs text-gold">Officer Portal</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-cream/70">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-sidebar-border bg-sidebar px-4 py-2.5 text-cream outline-none placeholder:text-cream/40 focus:border-gold"
              placeholder="officer@civic.local"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-cream/70">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-sidebar-border bg-sidebar px-4 py-2.5 text-cream outline-none placeholder:text-cream/40 focus:border-gold"
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="rounded-lg bg-heat/20 p-3 text-sm text-heat">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-charcoal transition-all hover:bg-gold/90 disabled:opacity-50"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 rounded-lg border border-sidebar-border bg-sidebar/50 p-4 text-xs text-cream/60">
          <p className="font-semibold text-cream/80">Demo Credentials:</p>
          <p className="mt-1">Email: officer@civic.local</p>
          <p>Password: demo123</p>
        </div>
      </div>
    </div>
  )
}
