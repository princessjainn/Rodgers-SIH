'use client'

import { useAuth } from '@/components/auth-provider'
import { ControlRoom } from '@/components/gov/control-room'
import { ControlRoomLogin } from '@/components/gov/control-room-login'
import { useState, useEffect } from 'react'

export function ControlRoomPage() {
  const { isAuthenticated } = useAuth()
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  if (!isHydrated) {
    return null
  }

  if (!isAuthenticated) {
    return <ControlRoomLogin />
  }

  return <ControlRoom />
}
