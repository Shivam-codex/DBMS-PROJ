"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const { signup, isLoading, error } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    // Clear error when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const errors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
    let isValid = true

    if (!formData.name.trim()) {
      errors.name = "Name is required"
      isValid = false
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid"
      isValid = false
    }

    if (!formData.password) {
      errors.password = "Password is required"
      isValid = false
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters"
      isValid = false
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
      isValid = false
    }

    setFormErrors(errors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    try {
      await signup(formData.name, formData.email, formData.password)
      router.push("/profile")
    } catch (error) {
      // Error is handled by the auth context
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Create an Account</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Name
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
            />
            {formErrors.name && (
              <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                formErrors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                formErrors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formErrors.password && (
              <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
            )}
          </div>
          
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                formErrors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formErrors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{formErrors.confirmPassword}</p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Creating account...
              </span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-green-600 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  )
} 