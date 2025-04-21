"use client"

import { createContext, useContext, useEffect, useState } from "react"

interface CartItem {
  productId: string | number
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

  // Load cart from database on mount
  useEffect(() => {
    const loadCart = async () => {
      try {
        const response = await fetch('/api/cart?userId=1') // Replace with actual user ID
        if (!response.ok) throw new Error('Failed to load cart')
        const data = await response.json()
        setItems(data.items || [])
      } catch (err) {
        console.error('Failed to load cart:', err)
        setError('Failed to load your cart. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    loadCart()
  }, [])

  // Calculate totals whenever items change
  useEffect(() => {
    const newSubtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    setSubtotal(newSubtotal)
    setTotal(newSubtotal + DELIVERY_FEE)
  }, [items])

  const addItem = async (item: CartItem) => {
    try {
      // Convert productId to number if it's a string
      const productId = typeof item.productId === 'string' ? parseInt(item.productId, 10) : item.productId

      if (isNaN(productId) || productId <= 0) {
        console.error('Invalid product ID:', item.productId)
        throw new Error('Invalid product ID')
      }

      const cartItem = {
        productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
        image: item.image,
        unit: item.unit,
        farm: item.farm
      }

      console.log('Adding to cart:', cartItem) // Debug log

      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: '1', // Replace with actual user ID
          item: cartItem
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to add item to cart')
      }

      const data = await response.json()
      setItems(data.items)
    } catch (err) {
      console.error('Failed to add item to cart:', err)
      setError(err instanceof Error ? err.message : 'Failed to add item to cart. Please try again.')
    }
  }

  const removeItem = async (id: number) => {
    try {
      const response = await fetch(`/api/cart?userId=1&productId=${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to remove item from cart')
      const data = await response.json()
      setItems(data.items)
    } catch (err) {
      console.error('Failed to remove item from cart:', err)
      setError('Failed to remove item from cart. Please try again.')
    }
  }

  const updateQuantity = async (id: number, quantity: number) => {
    if (quantity < 1) return
    
    try {
      const response = await fetch('/api/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: '1', // Replace with actual user ID
          productId: id,
          quantity
        }),
      })

      if (!response.ok) throw new Error('Failed to update cart')
      const data = await response.json()
      setItems(data.items)
    } catch (err) {
      console.error('Failed to update cart:', err)
      setError('Failed to update cart. Please try again.')
    }
  }

  const clearCart = async () => {
    try {
      const response = await fetch('/api/cart?userId=1', {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to clear cart')
      setItems([])
    } catch (err) {
      console.error('Failed to clear cart:', err)
      setError('Failed to clear cart. Please try again.')
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