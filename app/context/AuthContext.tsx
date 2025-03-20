'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface User {
  id: string
  email: string
  isPremium: boolean
  aiCallEnabled: boolean
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  register: (email: string, password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = async (email: string, password: string) => {
    // TODO: Implement actual login logic
    setUser({
      id: '1',
      email,
      isPremium: true,
      aiCallEnabled: true,
    })
  }

  const logout = async () => {
    // TODO: Implement actual logout logic
    setUser(null)
  }

  const register = async (email: string, password: string) => {
    // TODO: Implement actual registration logic
    setUser({
      id: '1',
      email,
      isPremium: false,
      aiCallEnabled: false,
    })
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 