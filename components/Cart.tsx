"use client"

import { useState } from "react"
import { Minus, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useCart } from "@/contexts/cart-context"

export default function Cart() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const { items, updateQuantity, removeItem, subtotal, deliveryFee, total, isLoading, error } = useCart()

  const handleCheckout = async () => {
    if (items.length === 0) {
      alert("Your cart is empty!")
      return
    }

    try {
      setIsProcessing(true)
      
      // Here you would typically:
      // 1. Validate cart items
      // 2. Check item availability
      // 3. Create an order in your backend
      // 4. Redirect to payment page
      
      // For now, we'll simulate a process and redirect to checkout
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      router.push('/checkout')
    } catch (error) {
      console.error('Checkout error:', error)
      alert('There was an error processing your order. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-600">Loading your cart...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 text-green-600 hover:text-green-700 font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
      
      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">Your cart is empty</p>
          <button 
            onClick={() => router.push('/products')}
            className="mt-4 text-green-600 hover:text-green-700 font-medium"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="bg-white rounded-lg p-4 flex items-center gap-4">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-600">{item.farm}</p>
                    <p className="text-green-600">₹{item.price.toFixed(2)} / {item.unit}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 rounded-full hover:bg-gray-100"
                      disabled={isProcessing}
                    >
                      <Minus className="h-5 w-5" />
                    </button>
                    <span className="w-8 text-center text-lg">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded-full hover:bg-gray-100"
                      disabled={isProcessing}
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 rounded-full hover:bg-gray-100 text-red-500"
                      disabled={isProcessing}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-4 space-y-6">
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                {items.map(item => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="flex-grow">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span>₹{deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-medium pt-2 border-t">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                disabled={isProcessing || items.length === 0}
                className={`w-full bg-green-600 text-white py-3 rounded-md mt-6 hover:bg-green-700 transition-colors
                  ${(isProcessing || items.length === 0) ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
              </button>
              <button 
                onClick={() => router.push('/products')}
                className="w-full text-green-600 py-2 mt-2 hover:text-green-700 transition-colors text-sm"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 