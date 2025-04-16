import Image from "next/image"
import { Leaf, Users, Heart, Target } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">About FarmDirect</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Connecting local farmers with consumers to create a sustainable, transparent, and fair food system.
        </p>
      </div>

      {/* Mission Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-gray-600 mb-4">
            At FarmDirect, we're on a mission to revolutionize the way people access fresh, local produce. We believe in creating a direct connection between farmers and consumers, eliminating unnecessary middlemen, and ensuring fair prices for both parties.
          </p>
          <p className="text-gray-600">
            Our platform empowers local farmers to reach a wider audience while giving consumers access to fresh, seasonal produce straight from the source. We're committed to supporting sustainable farming practices and building a more resilient local food system.
          </p>
        </div>
        <div className="relative h-[400px]">
          <Image
            src="https://images.pexels.com/photos/2280574/pexels-photo-2280574.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Farm field"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-green-100 p-3 rounded-full mb-4 inline-block">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
            <p className="text-gray-600">
              Promoting environmentally conscious farming practices and reducing food miles.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 p-3 rounded-full mb-4 inline-block">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p className="text-gray-600">
              Building strong relationships between farmers and consumers in our local communities.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 p-3 rounded-full mb-4 inline-block">
              <Heart className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Fairness</h3>
            <p className="text-gray-600">
              Ensuring fair prices for farmers and affordable access for consumers.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 p-3 rounded-full mb-4 inline-block">
              <Target className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Transparency</h3>
            <p className="text-gray-600">
              Providing clear information about farming practices and product origins.
            </p>
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="bg-green-50 rounded-lg p-8 mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Our Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
            <p className="text-gray-600">Local Farmers Supported</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">10,000+</div>
            <p className="text-gray-600">Happy Customers</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
            <p className="text-gray-600">Cities Covered</p>
          </div>
        </div>
      </div>

      {/* Join Us Section */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Whether you're a farmer looking to reach more customers or a consumer wanting fresh, local produce, we'd love to have you join our community.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/join-farmer"
            className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors"
          >
            Join as a Farmer
          </a>
          <a
            href="/products"
            className="bg-white text-green-600 border border-green-600 px-6 py-3 rounded-md hover:bg-green-50 transition-colors"
          >
            Start Shopping
          </a>
        </div>
      </div>
    </div>
  )
}
