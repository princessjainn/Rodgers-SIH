'use client'

import { ControlRoomPage } from '@/components/gov/control-room-page'
import { AuthProvider } from '@/components/auth-provider'

export const dynamic = 'force-dynamic'

export default function ControlRoomPageWrapper() {
  return (
    <AuthProvider>
      <ControlRoomPage />
    </AuthProvider>
  )
}
