"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewProductPage() {
  const { user, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    unit: "kg",
    description: "",
    stock: "",
    image: "",
  })
  const [formErrors, setFormErrors] = useState({
    name: "",
    price: "",
    stock: "",
    image: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const errors = {
      name: "",
      price: "",
      stock: "",
      image: "",
    }
    let isValid = true

    if (!formData.name.trim()) {
      errors.name = "Product name is required"
      isValid = false
    }

    if (!formData.price) {
      errors.price = "Price is required"
      isValid = false
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      errors.price = "Price must be a positive number"
      isValid = false
    }

    if (!formData.stock) {
      errors.stock = "Stock quantity is required"
      isValid = false
    } else if (isNaN(Number(formData.stock)) || Number(formData.stock) < 0) {
      errors.stock = "Stock must be a non-negative number"
      isValid = false
    }

    if (!formData.image.trim()) {
      errors.image = "Image URL is required"
      isValid = false
    }

    setFormErrors(errors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    try {
      setIsSubmitting(true)
      setError("")
      
      const response = await fetch("/api/farmer/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock),
          farmer: user?.name || "Unknown Farmer",
          farmerId: user?.id,
        }),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to add product")
      }
      
      router.push("/farmer/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while adding the product")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (authLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-green-600" />
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        </div>
      </div>
    )
  }

  if (!user) {
    router.push("/login")
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link 
            href="/farmer/dashboard" 
            className="text-green-600 hover:text-green-700 flex items-center"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back to Dashboard
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    formErrors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="e.g., Fresh Tomatoes"
                />
                {formErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price" className="block text-gray-700 font-medium mb-1">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className={`w-full px-3 py-2 border rounded-md ${
                      formErrors.price ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="e.g., 45.99"
                  />
                  {formErrors.price && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.price}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="unit" className="block text-gray-700 font-medium mb-1">
                    Unit
                  </label>
                  <select
                    id="unit"
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="kg">Kilogram (kg)</option>
                    <option value="g">Gram (g)</option>
                    <option value="l">Liter (L)</option>
                    <option value="ml">Milliliter (mL)</option>
                    <option value="piece">Piece</option>
                    <option value="dozen">Dozen</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="stock" className="block text-gray-700 font-medium mb-1">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  min="0"
                  className={`w-full px-3 py-2 border rounded-md ${
                    formErrors.stock ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="e.g., 100"
                />
                {formErrors.stock && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.stock}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="image" className="block text-gray-700 font-medium mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    formErrors.image ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="e.g., https://example.com/image.jpg"
                />
                {formErrors.image && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.image}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="description" className="block text-gray-700 font-medium mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Describe your product..."
                />
              </div>
            </div>
            
            <div className="mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Adding Product...
                  </span>
                ) : (
                  "Add Product"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 