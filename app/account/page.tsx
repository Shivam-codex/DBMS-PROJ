// contexts/auth-context.tsx

"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"

interface UserType {
  name: string
  email: string
  phone: string
  address: string
  avatar: string
}

interface AuthContextType {
  user: UserType | null
  isAuthenticated: boolean
  login: (credentials: any) => void
  logout: () => void
  updateProfile: (data: Partial<UserType>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }
  }, [])

  const login = (credentials: any) => {
    // Dummy login logic (replace with real one)
    const dummyUser = {
      name: "Shivam Shinde",
      email: "shivamshinde25@gmail.com",
      phone: "9011967964",
      address: "13 Main St,Pune City, Maharashtra, 411048",
      avatar: "/placeholder-avatar.jpg"
    }
    setUser(dummyUser)
    setIsAuthenticated(true)
    localStorage.setItem("user", JSON.stringify(dummyUser))
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("user")
  }

  const updateProfile = (data: Partial<UserType>) => {
    if (!user) return
    const updatedUser = { ...user, ...data }
    setUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
