'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  login: (credentials: { email: string; password: string }) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    // Check localStorage for auth token on mount
    const token = localStorage.getItem('control_room_auth')
    setIsAuthenticated(!!token)
    setIsHydrated(true)
  }, [])

  const login = async (credentials: { email: string; password: string }) => {
    // Dummy authentication - accept any credentials for demo
    if (credentials.email && credentials.password) {
      localStorage.setItem('control_room_auth', 'dummy-token-' + Date.now())
      setIsAuthenticated(true)
    } else {
      throw new Error('Invalid credentials')
    }
  }

  const logout = () => {
    localStorage.removeItem('control_room_auth')
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  // Return a safe default during SSR/build time
  if (context === undefined) {
    return {
      isAuthenticated: false,
      login: async () => {},
      logout: () => {},
    }
  }
  return context
}
