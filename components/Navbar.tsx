"use client"

import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { ShoppingCart, User, LogOut } from "lucide-react"
import { useState } from "react"

export default function Navbar() {
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-green-600">
            FarmFresh
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className="text-gray-700 hover:text-green-600">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-green-600">
              Products
            </Link>
            <Link href="/farmers" className="text-gray-700 hover:text-green-600">
              Farmers
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-green-600">
              About
            </Link>
            <Link href="/cart" className="text-gray-700 hover:text-green-600 flex items-center">
              <ShoppingCart className="h-5 w-5 mr-1" />
              Cart
            </Link>
            <Link href="/join-farmer" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
              Join as a Farmer
            </Link>
            
            {user ? (
              <>
                <Link href="/profile" className="text-gray-700 hover:text-green-600 flex items-center">
                  <User className="h-5 w-5 mr-1" />
                  Profile
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-green-600 flex items-center"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-green-600">
                  Login
                </Link>
                <Link href="/signup" className="text-gray-700 hover:text-green-600">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-green-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-2">
            <Link 
              href="/" 
              className="block py-2 text-gray-700 hover:text-green-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/products" 
              className="block py-2 text-gray-700 hover:text-green-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link 
              href="/farmers" 
              className="block py-2 text-gray-700 hover:text-green-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Farmers
            </Link>
            <Link 
              href="/about" 
              className="block py-2 text-gray-700 hover:text-green-600"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/cart" 
              className="block py-2 text-gray-700 hover:text-green-600 flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <ShoppingCart className="h-5 w-5 mr-1" />
              Cart
            </Link>
            <Link 
              href="/join-farmer" 
              className="block py-2 text-gray-700 hover:text-green-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Join as a Farmer
            </Link>
            
            {user ? (
              <>
                <Link 
                  href="/profile" 
                  className="block py-2 text-gray-700 hover:text-green-600 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-5 w-5 mr-1" />
                  Profile
                </Link>
                <button 
                  onClick={() => {
                    handleLogout()
                    setIsMenuOpen(false)
                  }}
                  className="block w-full text-left py-2 text-gray-700 hover:text-green-600 flex items-center"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="block py-2 text-gray-700 hover:text-green-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className="block py-2 text-gray-700 hover:text-green-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
} 