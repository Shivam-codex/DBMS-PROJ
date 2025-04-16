"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Loader2, User, Mail, Phone, MapPin, Calendar, Edit2, Save, X } from "lucide-react"

export default function ProfilePage() {
  const { user, isLoading, error, logout } = useAuth()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    joinDate: new Date().toLocaleDateString(),
  })

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }))
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleLogout = async () => {
    try {
      await logout()
      router.push("/login")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const handleSave = () => {
    // In a real app, you would save this to the backend
    setIsEditing(false)
    // For now, we'll just update the local state
    console.log("Saving profile data:", formData)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-green-600" />
          <h1 className="text-2xl font-bold mb-4">Loading profile...</h1>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-600">Error loading profile</h1>
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

  if (!user) {
    return null // Will be redirected by useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-center">Your Profile</h1>
          {!isEditing ? (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center text-green-600 hover:text-green-700"
            >
              <Edit2 className="h-5 w-5 mr-1" />
              Edit Profile
            </button>
          ) : (
            <div className="flex space-x-2">
              <button 
                onClick={handleSave}
                className="flex items-center text-green-600 hover:text-green-700"
              >
                <Save className="h-5 w-5 mr-1" />
                Save
              </button>
              <button 
                onClick={() => setIsEditing(false)}
                className="flex items-center text-red-600 hover:text-red-700"
              >
                <X className="h-5 w-5 mr-1" />
                Cancel
              </button>
            </div>
          )}
        </div>
        
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="border-b pb-4">
            <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1 flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                ) : (
                  <p className="text-gray-900">{formData.name}</p>
                )}
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-1 flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                ) : (
                  <p className="text-gray-900">{formData.email}</p>
                )}
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-1 flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  Phone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="+91 1234567890"
                  />
                ) : (
                  <p className="text-gray-900">{formData.phone || "Not provided"}</p>
                )}
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-1 flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Join Date
                </label>
                <p className="text-gray-900">{formData.joinDate}</p>
              </div>
            </div>
          </div>
          
          {/* Address Information */}
          <div className="border-b pb-4">
            <h2 className="text-lg font-semibold mb-4">Address Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1 flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Address
                </label>
                {isEditing ? (
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                    rows={3}
                    placeholder="Enter your address"
                  />
                ) : (
                  <p className="text-gray-900">{formData.address || "Not provided"}</p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">City</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.city || "Not provided"}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-1">State</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.state || "Not provided"}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-1">PIN Code</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.zipCode || "Not provided"}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Account Actions */}
          <div className="pt-4">
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 