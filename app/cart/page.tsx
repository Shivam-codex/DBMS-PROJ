"use client"

import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"
import { Trash2, Plus, Minus, Loader2, ArrowLeft } from "lucide-react"
import { useState } from "react"
import { QRModal } from "@/components/qr-modal"

export default function CartPage() {
  const { items, removeItem, updateQuantity, isLoading, error } = useCart()
  const [isQRModalOpen, setIsQRModalOpen] = useState(false)
  const [showBill, setShowBill] = useState(false)

  const handleCheckout = () => {
    setShowBill(true)
  }

  const handleProceedToPayment = () => {
    const upiId = "shindeshivam7661-2@okaxis"
    const merchantName = "Shivam Shinde"
    const amount = (items.reduce((sum, item) => sum + item.price * item.quantity, 0) + 50).toFixed(2)
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

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
          <Link
            href="/products"
            className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = 50
  const gstRate = 0.18 // 18% GST
  const gstAmount = subtotal * gstRate
  const total = subtotal + deliveryFee + gstAmount

  if (showBill) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <button
              onClick={() => setShowBill(false)}
              className="text-gray-600 hover:text-gray-800 mr-4"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <h1 className="text-2xl font-bold">Order Summary</h1>
          </div>

          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center space-x-4">
                  <div className="relative w-16 h-16">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600 text-sm">{item.farm}</p>
                    <p className="text-gray-600 text-sm">{item.quantity} x ₹{item.price}</p>
                  </div>
                </div>
                <p className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="space-y-2 border-t pt-4">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery Fee</span>
              <span>₹{deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>GST (18%)</span>
              <span>₹{gstAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2">
              <span>Total Amount</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={handleProceedToPayment}
              className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors"
            >
              Proceed to Payment
            </button>
          </div>
        </div>

        <QRModal
          isOpen={isQRModalOpen}
          onClose={() => setIsQRModalOpen(false)}
          paymentUrl={`upi://pay?pa=shindeshivam7661-2@okaxis&pn=${encodeURIComponent("Shivam Shinde")}&am=${total.toFixed(2)}`}
        />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      <div className="grid gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm"
          >
            <div className="relative w-20 h-20">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600 text-sm">{item.farm}</p>
              <p className="text-green-600 font-semibold">
                ₹{item.price} per {item.unit}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="bg-gray-100 px-2 py-1 rounded hover:bg-gray-200"
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="bg-gray-100 px-2 py-1 rounded hover:bg-gray-200"
              >
                +
              </button>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Delivery Fee</span>
            <span className="font-semibold">₹{deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">GST (18%)</span>
            <span className="font-semibold">₹{gstAmount.toFixed(2)}</span>
          </div>
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total</span>
              <span className="text-green-600 font-bold">₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <button
          onClick={handleCheckout}
          className="w-full mt-4 bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  )
} 