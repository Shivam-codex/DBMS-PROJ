'use client'

import { useState } from "react"
import { ShoppingCart, Filter, Search, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/contexts/cart-context"

// Mock products data
const products = [
  {
    id: 1,
    name: "Fresh Eggs",
    price: 119,
    unit: "dozen",
    farm: "Sunny Meadow Farm",
    image: "https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "dairy"



    
  },
  {
    id: 2,

    name: "Organic Tomatoes",
    price: 60,
    unit: "kg",
    farm: "Green Valley Organics",
    image: "https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "vegetables"
  },
  {
    id: 3,
    name: "Fresh Carrots",
    price: 40,
    unit: "kg",
    farm: "Harvest Fields",
    image: "https://images.pexels.com/photos/1306559/pexels-photo-1306559.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "vegetables"
  },
  {
    id: 4,
    name: "Organic Potatoes",
    price: 45,
    unit: "kg",
    farm: "Green Valley Organics",
    image: "https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "vegetables"
  },
  {
    id: 5,
    name: "Fresh Milk",
    price: 55,
    unit: "liter",
    farm: "Sunny Meadow Farm",
    image: "https://images.pexels.com/photos/5946717/pexels-photo-5946717.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "dairy"
  },
  {
    id: 6,
    name: "Organic Onions",
    price: 35,
    unit: "kg",
    farm: "Harvest Fields",
    image: "https://images.pexels.com/photos/7129153/pexels-photo-7129153.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "vegetables"
  },
  {
    id: 7,
    name: "Organic Garlic",
    price: 135,
    unit: "kg",
    farm: "Harvest Fields",
    image: "https://images.pexels.com/photos/1638522/pexels-photo-1638522.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "vegetables"
  },
  {
    id: 8,
    name: "Green Peas",
    price: 95,
    unit: "kg",
    farm: "Harvest Fields",
    image: "https://images.pexels.com/photos/255469/pexels-photo-255469.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "vegetables"
  },
  {
    id: 9,
    name: "Green Cabbage",
    price: 40,
    unit: "piece",
    farm: "Harvest Fields",
    image: "https://images.pexels.com/photos/209482/pexels-photo-209482.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "vegetables"
  },
  {
    id: 10,
    name: "Ladies' fingers",
    price: 30,
    unit: "kg",
    farm: "Harvest Fields",
    image: "https://images.pexels.com/photos/2583187/pexels-photo-2583187.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "vegetables"
  },
  {
    id: 11,
    name: "Green Apple",
    price: 105,
    unit: "kg",
    farm: "Harvest Fields",
    image: "https://images.pexels.com/photos/693794/pexels-photo-693794.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "fruits"
  },
  {
    id: 12,
    name: "Apple",
    price: 125,
    unit: "kg",
    farm: "Harvest Fields",
    image: "https://images.pexels.com/photos/326005/pexels-photo-326005.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "fruits"
  },
  {
    id: 13,
    name: "Green Piled Watermelon",
    price: 25,
    unit: "kg",
    farm: "Harvest Fields",
    image: "https://images.pexels.com/photos/59830/melons-water-melons-fruit-green-59830.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "fruits"
  },
  {
    id: 14,
    name: "Red Strawberry",
    price: 95,
    unit: "500gm",
    farm: "Harvest Fields",
    image: "https://images.pexels.com/photos/429807/pexels-photo-429807.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "fruits"
  },
  {
    id: 15,
    name: "Banana",
    price: 45,
    unit: "dozen",
    farm: "Harvest Fields",
    image: "https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "fruits"
  },
  {
    id: 16,
    name: "Black Grapes",
    price: 80,
    unit: "kg",
    farm: "Harvest Fields",
    image: "https://images.pexels.com/photos/39351/purple-grapes-vineyard-napa-valley-napa-vineyard-39351.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "fruits"
  },
  {
    id: 17,
    name: "Mango(Hapus)",
    price: 450,
    unit: "dozen",
    farm: "Harvest Fields",
    image: "https://images.pexels.com/photos/2294471/pexels-photo-2294471.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "fruits"
  },
  {
    id: 18,
    name: "Green Mango(Hapus)",
    price: 350,
    unit: "dozen",
    farm: "Harvest Fields",
    image: "https://images.pexels.com/photos/2667738/pexels-photo-2667738.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "fruits"
  },
  {
    id: 19,
    name: "Green Grapes",
    price: 70,
    unit: "kg",
    farm: "Harvest Fields",
    image: "https://images.pexels.com/photos/60021/grapes-wine-fruit-vines-60021.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "fruits"
  },
  {
    id: 20,
    name: "Paneer",
    price: 435,
    unit: "kg",
    farm: "Harvest Fields",
    image: "https://imgs.search.brave.com/tP5c6K4pnRfO44WrEUwPB_7CpnQnEPT6lyftyguGAsk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tYXVu/aWthZ293YXJkaGFu/LmNvLnVrL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDE0LzAyL0hv/dy10by1tYWtlLVBh/bmVlcjEtMTAyNHg2/ODMuanBn",
    category: "dairy"
  },
  {
    id: 21,
    name: "Yoghurt",
    price: 100,
    unit: "kg",
    farm: "Harvest Fields",
    image: "https://imgs.search.brave.com/h1Hu8J-o1z6vzX3U_UXw8dYPAWztHno3SD6BiHvblPA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by90/b3Atdmlldy13b21h/bi1lYXRpbmcteW9n/dXJ0LWJvd2wtd2l0/aC13b29kZW4tc3Bv/b24tb2xpdmVzLWJs/YWNrLWJyZWFkLXdv/b2Rlbi1iYWNrZ3Jv/dW5kXzE0MTc5My01/MjEyMy5qcGc_c2Vt/dD1haXNfaHlicmlk/Jnc9NzQw",
    category: "dairy"
  },
  {
    id: 22,
    name: "Basmati Rice",
    price: 92,
    unit: "kg",
    farm: "Harvest Fields",
    image: "https://images.pexels.com/photos/4187621/pexels-photo-4187621.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "grains"
  },
  {
    id: 23,
    name: "Wheat",
    price: 35,
    unit: "kg",
    farm: "Harvest Fields",
    image: "https://images.pexels.com/photos/54084/wheat-grain-agriculture-seed-54084.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "grains"
  },
  {
    id: 24,
    name: "Moong daal",
    price: 160,
    unit: "kg",
    farm: "Harvest Fields",
    image: "https://images.pexels.com/photos/7334141/pexels-photo-7334141.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "grains"
  },
  {
    id: 25,
    name: "Chana Daal",
    price: 85,
    unit: "kg",
    farm: "Harvest Fields",
    image: "https://media.istockphoto.com/id/1314543375/photo/indian-chana-dal-or-yellow-split-gram-lentils.jpg?b=1&s=612x612&w=0&k=20&c=HJIkbwKB7SHyWRYoSrQbO6jM-BN4N99eChvIWiZJj4w=",
    category: "grains"
  },
  {
    id: 26,
    name: "Bajara",
    price: 31,
    unit: "kg",
    farm: "Harvest Fields",
    image: "https://imgs.search.brave.com/NFu2ZZVl7BjRAaIroeYKAyQ-6zZR_m0CWuQOfNJj2_Y/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTFleTNWVHI1clMu/anBn",
    category: "grains"
  }
]

const categories = [
  { id: "all", name: "All Products" },
  { id: "vegetables", name: "Vegetables" },
  { id: "fruits", name: "Fruits" },
  { id: "dairy", name: "Dairy & Eggs" },
  { id: "grains", name: "Grains" }
]

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const { items, addItem } = useCart()

  // Filter products based on category and search query
  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === "all" || product.category === activeCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.farm.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with search and cart */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold">Farm Fresh Products</h1>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          
          <Link
            href="/cart"
            className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Cart ({items.length})</span>
          </Link>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${activeCategory === category.id
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <Link href={`/products/${product.id}`}>
              <div className="relative h-48">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            </Link>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <Link href={`/products/${product.id}`}>
                  <h3 className="text-lg font-semibold hover:text-green-600">{product.name}</h3>
                </Link>
                <Link 
                  href={`/products/${product.id}#reviews`}
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-green-600"
                >
                  <Star className="h-4 w-4" />
                  <span>Review</span>
                </Link>
              </div>
              <p className="text-gray-600 text-sm mb-2">{product.farm}</p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-bold text-green-600">₹{product.price}</p>
                  <p className="text-sm text-gray-500">per {product.unit}</p>
                </div>
                <button
                  onClick={() => addItem({
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    unit: product.unit,
                    farm: product.farm,
                    quantity: 1
                  })}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No products found. Try a different search or category.</p>
        </div>
      )}
    </div>
  )
}