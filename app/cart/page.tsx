"use client"

import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"
import { Trash2, Plus, Minus, Loader2 } from "lucide-react"
import { useState } from "react"
import { QRModal } from "@/components/qr-modal"

export default function CartPage() {
  const { state, removeItem, updateQuantity, isLoading, error } = useCart()
  const [isQRModalOpen, setIsQRModalOpen] = useState(false)

  const handleCheckout = () => {
    const upiId = "shindeshivam7661-2@okaxis"
    const merchantName = "Shivam Shinde"
    const amount = (state.total + 50).toFixed(2)
    const paymentUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&am=${amount}`
    setIsQRModalOpen(true)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-green-600" />
          <h1 className="text-2xl font-bold mb-4">Loading your cart...</h1>
          <p className="text-gray-600">Please wait while we fetch your cart items.</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-600">Error loading cart</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Add some products to your cart to see them here.</p>
          <Link
            href="/products"
            className="inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {state.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow"
              >
                <div className="relative w-24 h-24">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">{item.farmer}</p>
                  <p className="text-green-600 font-semibold">
                    ₹{item.price.toFixed(2)} / {item.unit}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, (item.quantity || 0) - 1)}
                    className="p-1 hover:bg-gray-100 rounded-full"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, (item.quantity || 0) + 1)}
                    className="p-1 hover:bg-gray-100 rounded-full"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1 hover:bg-gray-100 rounded-full text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{state.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>₹50.00</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{(state.total + 50).toFixed(2)}</span>
              </div>
            </div>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-green-600 text-white py-3 rounded-md mt-6 hover:bg-green-700"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>

      <QRModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        paymentUrl={`upi://pay?pa=shindeshivam7661-2@okaxis&pn=${encodeURIComponent("Shivam Shinde")}&am=${(state.total + 50).toFixed(2)}`}
      />
    </div>
  )
} 