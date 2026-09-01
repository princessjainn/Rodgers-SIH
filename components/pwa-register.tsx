'use client'

import { useEffect, useState } from 'react'

export function PwaRegister() {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
          // service worker is optional and should not block app usage
        })
      })
    }

    const beforeInstall = () => setIsReady(true)
    window.addEventListener('beforeinstallprompt', beforeInstall)

    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstall)
    }
  }, [])

  if (!isReady) return null

  return (
    <div className="sr-only" aria-live="polite">
      Install CivicChai to keep your community updates available offline.
    </div>
  )
}
