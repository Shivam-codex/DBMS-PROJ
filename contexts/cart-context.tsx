"use client"

import { createContext, useContext, useReducer, ReactNode, useEffect, useState } from "react"

interface CartItem {
  id: string
  name: string
  price: number
  unit: string
  farmer: string
  image: string
  quantity?: number
}

interface CartState {
  items: CartItem[]
  total: number
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "SET_CART"; payload: CartState }

const CartContext = createContext<{
  state: CartState
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  isLoading: boolean
  error: string | null
} | null>(null)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find((item) => item.id === action.payload.id)
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: (item.quantity || 0) + 1 }
              : item
          ),
          total: state.total + action.payload.price,
        }
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
        total: state.total + action.payload.price,
      }
    }

    case "REMOVE_ITEM": {
      const item = state.items.find((item) => item.id === action.payload)
      if (!item) return state
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
        total: state.total - item.price * (item.quantity || 0),
      }
    }

    case "UPDATE_QUANTITY": {
      const item = state.items.find((item) => item.id === action.payload.id)
      if (!item) return state

      const quantityDiff = action.payload.quantity - (item.quantity || 0)
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        total: state.total + item.price * quantityDiff,
      }
    }

    case "CLEAR_CART":
      return {
        items: [],
        total: 0,
      }

    case "SET_CART":
      return action.payload

    default:
      return state
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load cart from MongoDB on mount
  useEffect(() => {
    const loadCart = async () => {
      try {
        setIsLoading(true)
        setError(null)
        // For demo purposes, using a fixed userId. In a real app, this would come from authentication
        const userId = "demo-user"
        const response = await fetch(`/api/cart?userId=${userId}`)
        
        if (!response.ok) {
          throw new Error(`Failed to load cart: ${response.statusText}`)
        }
        
        const data = await response.json()
        if (data.items) {
          dispatch({ type: "SET_CART", payload: { items: data.items, total: data.total } })
        }
      } catch (error) {
        console.error("Failed to load cart:", error)
        setError(error instanceof Error ? error.message : "Failed to load cart")
      } finally {
        setIsLoading(false)
      }
    }
    loadCart()
  }, [])

  // Save cart to MongoDB whenever it changes
  useEffect(() => {
    const saveCart = async () => {
      try {
        setError(null)
        const userId = "demo-user" // Same as above
        const response = await fetch("/api/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            items: state.items,
            total: state.total,
          }),
        })
        
        if (!response.ok) {
          throw new Error(`Failed to save cart: ${response.statusText}`)
        }
      } catch (error) {
        console.error("Failed to save cart:", error)
        setError(error instanceof Error ? error.message : "Failed to save cart")
      }
    }
    
    // Only save if we've already loaded the cart (to avoid unnecessary saves)
    if (!isLoading) {
      saveCart()
    }
  }, [state, isLoading])

  const addItem = (item: CartItem) => {
    dispatch({ type: "ADD_ITEM", payload: item })
  }

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id)
    } else {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
    }
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isLoading,
        error
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
} 