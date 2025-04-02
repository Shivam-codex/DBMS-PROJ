'use client'

import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"

const products = [
  {
    id: 1,
    name: "Organic Tomatoes",
    price: 35,
    unit: "Kg",
    farmer: "Green Valley Farm",
    image: "https://images.pexels.com/photos/27643476/pexels-photo-27643476/free-photo-of-red-tomatoes-in-nature.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Vegetables",
  },
  {
    id: 2,
    name: "Fresh Eggs",
    price: 119,
    unit: "dozen",
    farmer: "Sunny Meadow Farm",
    image: "https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Dairy and Eggs",
  },
  {
    id: 3,
    name: "Honey",
    price: 99,
    unit: "250 ml jar",
    farmer: "Bee Happy Apiaries",
    image: "https://media.istockphoto.com/id/598241944/photo/honey-in-jar-and-bunch-of-dry-lavender.jpg?b=1&s=612x612&w=0&k=20&c=dFdIOtzku7KAwjVjRKVxB7fXu2vdxDXkgGU5JMPE9UA=",
    category: "Speciality",
  },
  {
    id: 4,
    name: "Organic brinjal",
    price: 29,
    unit: "Kg",
    farmer: "Green Valley Farm",
    image: "https://images.pexels.com/photos/5529588/pexels-photo-5529588.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Vegetables",
  },
  {
    id: 5,
    name: "Green Chilli",
    price: 49,
    unit: "Kg",
    farmer: "Green Valley Farm",
    image: "https://media.istockphoto.com/id/529807197/photo/chili-peppers.jpg?b=1&s=612x612&w=0&k=20&c=ZM5xo9XJL5tecPJ8NaXq2T0bgxEZpFn1kefWH2gNOUo=",
    category: "Vegetables",
  },
  {
    id: 6,
    name: "Artisan Cheese",
    price: 129,
    unit: "250gm",
    farmer: "Dairy Delights",
    image: "https://images.pexels.com/photos/5732760/pexels-photo-5732760.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Dairy and Eggs",
  },
  {
    id: 7,
    name: "Fresh Apples",
    price: 129,
    unit: "Kg",
    farmer: "Green Valley Farm",
    image: "https://images.pexels.com/photos/2487443/pexels-photo-2487443.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Fruits",
  },
  {
    id: 8,
    name: "Fresh Carrots",
    price: 49,
    unit: "kg",
    farmer: "Green Valley Farm",
    image: "https://images.pexels.com/photos/6631952/pexels-photo-6631952.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Vegetables",
  },
  {
    id: 9,
    name: "Unripe Mangoes",
    price: 79,
    unit: "piece",
    farmer: "Green Valley Farm",
    image: "https://images.pexels.com/photos/31331940/pexels-photo-31331940/free-photo-of-cluster-of-unripe-mangoes-on-a-tree-branch.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Fruits",
  },
  {
    id: 10,
    name: "Fresh Beetroot",
    price: 39,
    unit: "2 piece",
    farmer: "Green Valley Farm",
    image: "https://images.pexels.com/photos/29436276/pexels-photo-29436276/free-photo-of-fresh-organic-beetroots-on-wooden-surface.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Vegetables",
  },
  {
    id: 11,
    name: "Green Piece",
    price: 79,
    unit: "Kg",
    farmer: "Green Valley Farm",
    image: "https://images.pexels.com/photos/255469/pexels-photo-255469.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Vegetables",
  },
  {
    id: 12,
    name: "Fresh Cabbage",
    price: 39,
    unit: "piece",
    farmer: "Green Valley Farm",
    image: "https://images.pexels.com/photos/134877/pexels-photo-134877.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Vegetables",
  },
  {
    id: 13,
    name: "Onion",
    price: 49,
    unit: "Kg",
    farmer: "Green Valley Farm",
    image: "https://images.pexels.com/photos/7129153/pexels-photo-7129153.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Vegetables",
  },
  {
    id: 14,
    name: "Cow Milk",
    price: 49,
    unit: "Litre",
    farmer: "Dairy Delights",
    image: "https://files.oaiusercontent.com/file-DaYorJAj3jCmfFE26WN2ar?se=2025-03-27T10%3A06%3A10Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D89db60ac-b405-4f0b-b22e-15ae4f3ac028.webp&sig=kQ9J7Tut2HI2LIQT5O2tqHO%2BhR1PABVRbgvdf3%2BKUUA%3D",
    category: "Dairy and Eggs",
  },
  {
    id: 15,
    name: "Buffalo Milk",
    price: 79,
    unit: "Litre",
    farmer: "Dairy Delights",
    image: "https://files.oaiusercontent.com/file-5K6QE9r1tPyeUXpMqcUhDW?se=2025-03-27T10%3A09%3A49Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Dbeccd615-2526-4577-b14b-4c8a711e325e.webp&sig=xlWUTcgjDLUCZZF562nT6GnXz%2BM34RrIxqITJdV1WZk%3D",
    category: "Dairy and Eggs",
  },
  {
    id: 16,
    name: "Paneer",
    price: 199,
    unit: "Kg",
    farmer: "Dairy Delights",
    image: "https://tiimg.tistatic.com/fp/1/007/777/good-in-taste-and-rich-in-nutrients-soft-spongy-textured-fresh-white-paneer-549.jpg",
    category: "Dairy and Eggs",
  },
  {
    id: 17,
    name: "Mango Pickle",
    price: 99,
    unit: "250gm",
    farmer: "Green Valley Farm",
    image: "https://media.istockphoto.com/id/1338328945/photo/full-frame-image-of-green-mango-chutney-recipe-in-stainless-steel-mixing-bowl-chopped-raw.webp?a=1&b=1&s=612x612&w=0&k=20&c=C6DYo_Dfd__tcXMv2Lzxh8OMllnWNWuQCJFuey6i6Dw=",
    category: "Speciality",
  },
  {
    id: 18,
    name: "Green Coconut",
    price: 59,
    unit: "piece",
    farmer: "Green Valley Farm",
    image: "https://images.unsplash.com/photo-1537191072641-5e19cc173c6a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29jb251dHxlbnwwfHwwfHx8MA%3D%3D",
    category: "Fruits",
  },
  {
    id: 19,
    name: "Watermelon",
    price: 39,
    unit: "piece",
    farmer: "Green Valley Farm",
    image: "https://media.istockphoto.com/id/157198799/photo/watermelons.webp?a=1&b=1&s=612x612&w=0&k=20&c=DvL6g3mT52P4An5LUC8f9hPX-mVZy3BhPPQPymzukyE=",
    category: "Fruits",
  },
  {
    id: 20,
    name: "Papaya",
    price: 49,
    unit: "piece",
    farmer: "Green Valley Farm",
    image: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFwYXlhfGVufDB8fDB8fHww",
    category: "Fruits",
  },
  {
    id: 21,
    name: "Dragon Fruit",
    price: 189,
    unit: "kg",
    farmer: "Green Valley Farm",
    image: "https://images.unsplash.com/photo-1607532668400-f162fce11d06?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fERyYWdvbiUyMGZydWl0fGVufDB8fDB8fHww",
    category: "Speciality",
  },
  {
    id: 22,
    name: "Yoghurt",
    price: 39,
    unit: "250gm",
    farmer: "Dairy Delights",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVDTLK8xM7S1jYwWsLvQoBXY_cJPbWsw1CpA&s",
    category: "Dairy and Eggs",
  },
  {
    id: 23,
    name: "Guava",
    price: 79,
    unit: "Kg",
    farmer: "Green Valley Farm",
    image: "https://media.istockphoto.com/id/2164439202/photo/close-up-of-guava-in-basket.webp?a=1&b=1&s=612x612&w=0&k=20&c=VkzhcK0fvnIbgs___KhRcETIAWS7Eu3hmfP7scdpnUs=",
    category: "Fruits",
  },
  {
    id: 24,
    name: "Maple Syrup",
    price: 99,
    unit: "bottle",
    farmer: "Forest Sweets",
    image: "https://images.pexels.com/photos/2516025/pexels-photo-2516025.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Speciality",
  }
];

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  
  // Get all unique categories
  const categories = [...new Set(products.map((product) => product.category))]
  
  // Filter products based on the selected category
  const filteredProducts = category 
    ? products.filter(product => product.category === category)
    : products

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {category ? `${category} Products` : "All Products"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <div className="sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Categories</h2>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/products" 
                  className={`${!category ? 'text-green-600 font-medium' : 'hover:text-green-600'}`}
                >
                  All Products
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat}>
                  <Link 
                    href={`/products?category=${cat}`} 
                    className={`${category === cat ? 'text-green-600 font-medium' : 'hover:text-green-600'}`}
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="md:col-span-3">
          {filteredProducts.length === 0 ? (
            <p className="text-center py-8">No products found in this category.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`} className="group">
                  <div className="border rounded-lg overflow-hidden transition-all hover:shadow-lg">
                    <div className="relative h-48">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-4">
                      <span className="text-xs text-gray-500">{product.category}</span>
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <p className="text-sm text-gray-500">by {product.farmer}</p>
                      <p className="mt-2 font-bold">
                        ₹{product.price} / {product.unit}
                      </p>
                      <button 
                        className="mt-3 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
                        onClick={(e) => e.preventDefault()}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}