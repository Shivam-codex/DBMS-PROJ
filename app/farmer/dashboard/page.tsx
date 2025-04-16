"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { Loader2, Plus, Edit2, Trash2, Package } from "lucide-react"
import Link from "next/link"

interface Product {
  id: string
  name: string
  price: number
  unit: string
  image: string
  farmer: string
  description: string
  stock: number
}

export default function FarmerDashboard() {
  const { user, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
      return
    }

    // Fetch farmer's products
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/farmer/products?farmerId=${user?.id}`)
        
        if (!response.ok) {
          throw new Error("Failed to fetch products")
        }
        
        const data = await response.json()
        setProducts(data)
      } catch (err) {
        setError("Failed to load your products. Please try again later.")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      fetchProducts()
    }
  }, [user, authLoading, router])

  const handleDelete = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) {
      return
    }

    try {
      const response = await fetch(`/api/farmer/products/${productId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete product")
      }

      // Remove the deleted product from the state
      setProducts(products.filter(product => product.id !== productId))
    } catch (err) {
      alert("Failed to delete product. Please try again.")
      console.error(err)
    }
  }

  if (authLoading || isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-green-600" />
          <h1 className="text-2xl font-bold mb-4">Loading dashboard...</h1>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-600">Error loading dashboard</h1>
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Farmer Dashboard</h1>
        <Link 
          href="/farmer/products/new" 
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Product
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Your Products</h2>
          
          {products.length === 0 ? (
            <div className="text-center py-8">
              <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 mb-4">You haven't added any products yet.</p>
              <Link 
                href="/farmer/products/new" 
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 inline-flex items-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Your First Product
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img 
                              className="h-10 w-10 rounded-full object-cover" 
                              src={product.image} 
                              alt={product.name} 
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {product.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {product.unit}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">₹{product.price.toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.stock}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-3">
                          <Link 
                            href={`/farmer/products/${product.id}/edit`}
                            className="text-green-600 hover:text-green-900"
                          >
                            <Edit2 className="h-5 w-5" />
                          </Link>
                          <button 
                            onClick={() => handleDelete(product.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 