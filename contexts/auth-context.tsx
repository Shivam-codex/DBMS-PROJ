"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  error: string | null
  signup: (name: string, email: string, password: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        const response = await fetch('/api/auth/me')
        
        if (response.ok) {
          const userData = await response.json()
          setUser(userData)
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Auth check error:', error)
        setError('Failed to check authentication status')
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }
    
    checkAuth()
  }, [])

  const signup = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Signup failed')
      }
      
      setUser(data)
      router.push('/')
    } catch (error) {
      console.error('Signup error:', error)
      setError(error instanceof Error ? error.message : 'Signup failed')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Login failed')
      }
      
      setUser(data)
      router.push('/')
    } catch (error) {
      console.error('Login error:', error)
      setError(error instanceof Error ? error.message : 'Login failed')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      await fetch('/api/auth/logout', {
        method: 'POST',
      })
      
      setUser(null)
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
      setError(error instanceof Error ? error.message : 'Logout failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 