"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { User, Mail, Phone, MapPin, Leaf, FileText, AlertCircle } from "lucide-react"

export default function JoinFarmerPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    farmName: "",
    farmLocation: "",
    farmSize: "",
    products: "",
    experience: "",
    certification: ""
  })
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    try {
      // In a real application, this would make an API call to register the farmer
      // For now, we'll just simulate a successful registration
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsSuccess(true)
      
      // Redirect to a thank you page after 3 seconds
      setTimeout(() => {
        router.push("/")
      }, 3000)
    } catch (err) {
      setError("There was an error submitting your application. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Join Our Farmer Network</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Become a partner farmer and connect directly with consumers. Sell your fresh produce, 
            build your brand, and grow your business with our platform.
          </p>
        </div>

        {isSuccess ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-green-700 mb-2">Application Submitted!</h2>
            <p className="text-green-600 mb-4">
              Thank you for your interest in joining our farmer network. Our team will review your application 
              and contact you within 3-5 business days.
            </p>
            <Link 
              href="/"
              className="inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
            >
              Return to Home
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="pl-10 w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="pl-10 w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="pl-10 w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                            className="pl-10 w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Farm Information */}
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-medium mb-4">Farm Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Farm Name
                        </label>
                        <div className="relative">
                          <Leaf className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <input
                            type="text"
                            name="farmName"
                            value={formData.farmName}
                            onChange={handleInputChange}
                            required
                            className="pl-10 w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Farm Location
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <input
                            type="text"
                            name="farmLocation"
                            value={formData.farmLocation}
                            onChange={handleInputChange}
                            required
                            className="pl-10 w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Farm Size (acres)
                        </label>
                        <div className="relative">
                          <Leaf className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <input
                            type="text"
                            name="farmSize"
                            value={formData.farmSize}
                            onChange={handleInputChange}
                            required
                            className="pl-10 w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Years of Experience
                        </label>
                        <div className="relative">
                          <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <input
                            type="text"
                            name="experience"
                            value={formData.experience}
                            onChange={handleInputChange}
                            required
                            className="pl-10 w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Products and Certification */}
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-medium mb-4">Products and Certification</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Products You Grow
                        </label>
                        <textarea
                          name="products"
                          value={formData.products}
                          onChange={handleInputChange}
                          required
                          rows={3}
                          className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="List the main products you grow (e.g., tomatoes, cucumbers, lettuce)"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Certifications (if any)
                        </label>
                        <textarea
                          name="certification"
                          value={formData.certification}
                          onChange={handleInputChange}
                          rows={2}
                          className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="List any organic or other certifications you have"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="flex items-center text-red-600 text-sm">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {error}
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Why Join Our Platform?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium mb-2">Direct to Consumer</h3>
              <p className="text-gray-600">
                Sell directly to consumers and get better prices for your produce without middlemen.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Market Access</h3>
              <p className="text-gray-600">
                Reach thousands of customers in urban areas who value fresh, local produce.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Support & Resources</h3>
              <p className="text-gray-600">
                Access marketing support, logistics assistance, and farming best practices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 