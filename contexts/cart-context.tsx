"use client"

import { createContext, useContext, useEffect, useState } from "react"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  unit: string
  farm: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  isLoading: boolean
  error: string | null
  subtotal: number
  deliveryFee: number
  total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const DELIVERY_FEE = 50 // ₹50 delivery fee

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [subtotal, setSubtotal] = useState(0)
  const [total, setTotal] = useState(0)

  // Load cart from local storage on mount
  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem('cart')
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart)
          setItems(parsedCart)
        }
      } catch (err) {
        console.error('Failed to load cart from localStorage:', err)
        setError('Failed to load your cart. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    loadCart()
  }, [])

  // Save cart to local storage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(items))
    } catch (err) {
      console.error('Failed to save cart to localStorage:', err)
    }
  }, [items])

  // Calculate totals whenever items change
  useEffect(() => {
    const newSubtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    setSubtotal(newSubtotal)
    setTotal(newSubtotal + DELIVERY_FEE)
  }, [items])

  const addItem = (item: CartItem) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(i => i.id === item.id)
      
      if (existingItem) {
        return currentItems.map(i =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }
      
      return [...currentItems, { ...item, quantity: 1 }]
    })
  }

  const removeItem = (id: number) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return
    
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
    try {
      localStorage.removeItem('cart')
    } catch (err) {
      console.error('Failed to clear cart from localStorage:', err)
    }
  }

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isLoading,
    error,
    subtotal,
    deliveryFee: DELIVERY_FEE,
    total
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
} 