"use client"

import { useRouter } from "next/navigation"
import { CheckCircle, Truck, ArrowRight } from "lucide-react"

export default function OrderSuccessPage() {
  const router = useRouter()

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-lg mx-auto text-center">
        <div className="mb-8">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for your order. We'll send you a confirmation email with your order details.
        </p>

        <div className="bg-white rounded-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Truck className="h-5 w-5 text-green-600" />
            <h2 className="font-semibold">Delivery Information</h2>
          </div>
          <p className="text-gray-600 text-sm">
            Your order will be delivered within 2-3 business days. You'll receive updates about your delivery via email and SMS.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => router.push('/orders')}
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            View Order
            <ArrowRight className="h-4 w-4" />
          </button>
          
          <button
            onClick={() => router.push('/products')}
            className="w-full text-green-600 py-2 hover:text-green-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  )
} 