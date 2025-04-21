'use client'

import { ReviewSection } from "@/components/ReviewSection"
import { Star, ShoppingCart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/contexts/cart-context"
import { use } from 'react'

interface PageParams {
  id: string
}

interface ProductPageProps {
  params: Promise<PageParams>
}

// Mock product data - in a real app, this would come from an API
const products = [
  {
    id: "1",
    name: "Fresh Eggs",
    price: 119,
    unit: "dozen",
    farm: "Sunny Meadow Farm",
    image: "https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Fresh, free-range eggs from happy chickens. Our eggs are rich in nutrients and flavor, coming from chickens fed a natural diet.",
    category: "dairy"
  },
  {
    id: "2",
    name: "Organic Tomatoes",
    price: 60,
    unit: "kg",
    farm: "Green Valley Organics",
    image: "https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Naturally grown tomatoes, rich in flavor and nutrients. Grown using organic farming practices without any chemical pesticides.",
    category: "vegetables"
  },
  {
    id: "3",
    name: "Fresh Carrots",
    price: 40,
    unit: "kg",
    farm: "Harvest Fields",
    image: "https://images.pexels.com/photos/1306559/pexels-photo-1306559.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Naturally grown carrots, rich in flavor and nutrients. Grown using organic farming practices without any chemical pesticides.",
    category: "vegetables"
  },
  {
    id: "4",
    name: "Organic Potatoes",
    price: 45,
    unit: "kg",
    farm: "Green Valley Organics",
    image: "https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Naturally grown potatoes free from chemicals and synthetic fertilizers.",
    category: "vegetables"
  },
  {
    id: "5",
    name: "Fresh Milk",
    price: 55,
    unit: "liter",
    farm: "Sunny Meadow Farm",
    image: "https://images.pexels.com/photos/5946717/pexels-photo-5946717.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Pure and unprocessed milk rich in calcium and nutrients. ",
    category: "dairy"
  },
  {
    id: "6",
    name: "Organic Onions",
    price: 35,
    unit: "kg",
    farm: "Harvest Fields",
    image: "https://images.pexels.com/photos/7129153/pexels-photo-7129153.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: " Fresh, pungent bulbs ideal for enhancing flavor in dishes.",
    category: "vegetables"
  },
  {
    id: "7",
    name: "Organic Garlic",
    price: 135,
    unit: "kg",
    farm: "Harvest Fields",
    image: "https://images.pexels.com/photos/1638522/pexels-photo-1638522.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Aromatic cloves known for their bold taste and health benefits.",
    category: "vegetables"
  },
  {
    id: "8",
    name: "Green Peas",
    price: 95,
    unit: "kg",
    farm: "Harvest Fields",
    image: "Sweet and tender peas packed with protein and fiber.",
    description: "Naturally grown carrots, rich in flavor and nutrients. Grown using organic farming practices without any chemical pesticides.",
    category: "vegetables"
  },
  {
    id: "9",
    name: "Green Cabbage",
    price: 40,
    unit: "piece",
    farm: "Harvest Fields",
    image: "https://images.pexels.com/photos/209482/pexels-photo-209482.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Crisp and leafy vegetable great for salads and stir-fries.",
    category: "vegetables"
  },
  {
    id: "10",
    name: "Ladies' fingers",
    price: 30,
    unit: "kg",
    farm: "Harvest Fields",
    image: " Slim, green pods perfect for curries and fries.",
    description: "Naturally grown carrots, rich in flavor and nutrients. Grown using organic farming practices without any chemical pesticides.",
    category: "vegetables"
  },
  {
    id: "11",
    name: "Green Apple",
    price: 105,
    unit: "kg",
    farm: "Harvest Fields",
    image: "https://images.pexels.com/photos/693794/pexels-photo-693794.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Tart and crunchy apples loaded with antioxidants.",
    category: "fruits"
  },
  {
    id: "12",
    name: "Apple",
    price: 125,
    unit: "kg",
    farm: "Harvest Fields",
    image: "https://images.pexels.com/photos/326005/pexels-photo-326005.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: " Juicy and sweet red apples for a refreshing snack.",
    category: "fruits"
  },
  {
    id: "13",
    name: "Green Piled Watermelon",
    price: 25,
    unit: "kg",
    farm: "Harvest Fields",
    image: "https://images.pexels.com/photos/59830/melons-water-melons-fruit-green-59830.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: " Large, juicy fruit with a crisp green rind and red flesh.",
    category: "fruits"
  },
  {
    id: "14",
    name: "Red Strawberry",
    price: 95,
    unit: "500gm",
    farm: "Harvest Fields",
    image: "https://images.pexels.com/photos/429807/pexels-photo-429807.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Sweet and tangy berries rich in vitamin C and flavor.",
    category: "fruits"
  },
  {
    id: "15",
    name: "Banana",
    price: 45,
    unit: "dozen",
    farm: "Harvest Fields",
    image: "https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Soft, energy-rich fruit perfect for snacking or smoothies",
    category: "fruits"
  },
  {
    id: "16",
    name: "Black Grapes",
    price: 80,
    unit: "kg",
    farm: "Harvest Fields",
    image: "https://images.pexels.com/photos/39351/purple-grapes-vineyard-napa-valley-napa-vineyard-39351.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Juicy, dark grapes with a sweet and tangy taste.",
    category: "fruits"
  },
  {
    id: "17",
    name: "Mango(Hapus)",
    price: 450,
    unit: "dozen",
    farm: "Harvest Fields",
    image: "https://images.pexels.com/photos/2294471/pexels-photo-2294471.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Succulent tropical fruit loved for its rich, sweet flavor.",
    category: "fruits"
  },
  {
    id: "18",
    name: "Green Mango(Hapus)",
    price: 350,
    unit: "dozen",
    farm: "Harvest Fields",
    image: "https://images.pexels.com/photos/2667738/pexels-photo-2667738.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: " Raw mangoes with a tangy taste, perfect for pickles and salads",
    category: "fruits"
  },
  {
    id: "19",
    name: "Green Grapes",
    price: 70,
    unit: "kg",
    farm: "Harvest Fields",
    image: "https://images.pexels.com/photos/60021/grapes-wine-fruit-vines-60021.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: " Crisp and refreshing grapes ideal for snacking.",
    category: "fruits"
  },
  {
    id: "20",
    name: "Paneer",
    price: 435,
    unit: "kg",
    farm: "Harvest Fields",
    image: "https://imgs.search.brave.com/tP5c6K4pnRfO44WrEUwPB_7CpnQnEPT6lyftyguGAsk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tYXVu/aWthZ293YXJkaGFu/LmNvLnVrL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDE0LzAyL0hv/dy10by1tYWtlLVBh/bmVlcjEtMTAyNHg2/ODMuanBn",
    description: "Soft Indian cottage cheese made from fresh milk.",
    category: "dairy"
  },
  {
    id: "21",
    name: "Yoghurt",
    price: 100,
    unit: "kg",
    farm: "Harvest Fields",
    image: "https://imgs.search.brave.com/h1Hu8J-o1z6vzX3U_UXw8dYPAWztHno3SD6BiHvblPA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by90/b3Atdmlldy13b21h/bi1lYXRpbmcteW9n/dXJ0LWJvd2wtd2l0/aC13b29kZW4tc3Bv/b24tb2xpdmVzLWJs/YWNrLWJyZWFkLXdv/b2Rlbi1iYWNrZ3Jv/dW5kXzE0MTc5My01/MjEyMy5qcGc_c2Vt/dD1haXNfaHlicmlk/Jnc9NzQw",
    description: "Creamy and nutritious fermented milk rich in probiotics.",
    category: "dairy"
  },
  {
    id: "22",
    name: "Basmati Rice",
    price: 92,
    unit: "kg",
    farm: "Harvest Fields",
    image: "https://images.pexels.com/photos/4187621/pexels-photo-4187621.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Long-grain aromatic rice known for its fluffy texture.",
    category: "grains"
  },
  {
    id: "23",
    name: "Wheat",
    price: 35,
    unit: "kg",
    farm: "Harvest Fields",
    image: "https://images.pexels.com/photos/54084/wheat-grain-agriculture-seed-54084.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: " Staple grain used for flour and whole grain cooking.",
    category: "grains"
  },
  {
    id: "24",
    name: "Moong daal",
    price: 160,
    unit: "kg",
    farm: "Harvest Fields",
    image: "https://images.pexels.com/photos/7334141/pexels-photo-7334141.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: " Protein-rich green gram used in dals and sprouts.",
    category: "grains"
  },
  {
    id: "25",
    name: "Chana Daal",
    price: 85,
    unit: "kg",
    farm: "Harvest Fields",
    image: "https://media.istockphoto.com/id/1314543375/photo/indian-chana-dal-or-yellow-split-gram-lentils.jpg?b=1&s=612x612&w=0&k=20&c=HJIkbwKB7SHyWRYoSrQbO6jM-BN4N99eChvIWiZJj4w=",
    description: "Split chickpeas known for their nutty flavor and high protein.",
    category: "grains"
  },
  {
    id: "26",
    name: "Bajara",
    price: 31,
    unit: "kg",
    farm: "Harvest Fields",
    image: "https://imgs.search.brave.com/NFu2ZZVl7BjRAaIroeYKAyQ-6zZR_m0CWuQOfNJj2_Y/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTFleTNWVHI1clMu/anBn",
    description: " Nutritious millet grain ideal for flatbreads and porridge.",
    category: "grains"
  }
]

export default function ProductPage({ params }: ProductPageProps) {
  const { addItem } = useCart()
  const { id } = use(params)
  const product = products.find(p => p.id === id)

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link href="/products" className="text-green-600 hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Product Details */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8 relative">
        {/* Review Button - Top Right */}
        <Link 
          href="#reviews" 
          className="absolute top-4 right-4 flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
        >
          <Star className="h-5 w-5" />
          <span>Rate & Review</span>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative h-96">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          {/* Product Info */}
          <div>
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl font-bold">{product.name}</h1>
            </div>

            <p className="text-gray-600 mb-2">by {product.farm}</p>
            <p className="text-2xl font-bold text-green-600 mb-4">₹{product.price}</p>
            <p className="text-gray-500 mb-4">per {product.unit}</p>
            
            <p className="text-gray-700 mb-6">{product.description}</p>

            <button
              onClick={() => addItem({...product, id: Number(product.id), quantity: 1})}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div id="reviews" className="scroll-mt-20">
        <ReviewSection productId={id} />
      </div>
    </div>
  )
} 