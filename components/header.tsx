"use client"

import Link from "next/link"
import { ShoppingCart, User, Menu, ChevronDown } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useState } from "react"

export function Header() {
  const { state } = useCart()
  const itemCount = state.items.reduce((total, item) => total + (item.quantity || 0), 0)
  const [isResourcesOpen, setIsResourcesOpen] = useState(false)

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-green-600">
          FarmDirect
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="hover:text-green-600">
            Home
          </Link>
          <Link href="/products" className="hover:text-green-600">
            Products
          </Link>
          <Link href="/farmers" className="hover:text-green-600">
            Farmers
          </Link>
          <Link href="/about" className="hover:text-green-600">
            About
          </Link>
          <div className="relative">
            <button 
              className="flex items-center hover:text-green-600"
              onClick={() => setIsResourcesOpen(!isResourcesOpen)}
            >
              Resources
              <ChevronDown className="h-4 w-4 ml-1" />
            </button>
            {isResourcesOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white border rounded-md shadow-lg py-2 w-48 z-10">
                <Link href="/join-farmer" className="block px-4 py-2 hover:bg-gray-100">
                  Join as a Farmer
                </Link>
                <Link href="/resources" className="block px-4 py-2 hover:bg-gray-100">
                  Resources
                </Link>
                <Link href="/faq" className="block px-4 py-2 hover:bg-gray-100">
                  FAQ
                </Link>
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center space-x-4">
          <Link href="/account" className="p-2 hover:bg-gray-100 rounded-full">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Link>
          <Link href="/cart" className="p-2 hover:bg-gray-100 rounded-full relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Cart</span>
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 bg-green-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          <button className="md:hidden p-2 hover:bg-gray-100 rounded-full">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menu</span>
          </button>
        </div>
      </div>
    </header>
  )
} 