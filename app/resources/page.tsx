"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Book, Leaf, Droplets, Sun, Calendar, ArrowRight, BookOpen, Video, FileText, Users, Mail } from "lucide-react"

// Sample resources data
const resources = [
  {
    id: 1,
    title: "Organic Farming Basics",
    category: "Farming Techniques",
    description: "Learn the fundamentals of organic farming practices and how to implement them on your farm.",
    image: "/images/resources/organic-farming.jpg",
    date: "May 15, 2023",
    readTime: "8 min read",
    icon: <Leaf className="h-6 w-6 text-green-600" />
  },
  {
    id: 2,
    title: "Water Conservation Methods",
    category: "Sustainability",
    description: "Discover effective techniques for conserving water on your farm while maintaining crop health.",
    image: "/images/resources/water-conservation.jpg",
    date: "June 2, 2023",
    readTime: "6 min read",
    icon: <Droplets className="h-6 w-6 text-blue-600" />
  },
  {
    id: 3,
    title: "Seasonal Planting Guide",
    category: "Planning",
    description: "A comprehensive guide to what to plant and when throughout the growing season.",
    image: "/images/resources/seasonal-planting.jpg",
    date: "April 10, 2023",
    readTime: "10 min read",
    icon: <Calendar className="h-6 w-6 text-orange-600" />
  },
  {
    id: 4,
    title: "Sustainable Pest Management",
    category: "Farming Techniques",
    description: "Natural and eco-friendly approaches to managing pests without harmful chemicals.",
    image: "/images/resources/pest-management.jpg",
    date: "July 18, 2023",
    readTime: "7 min read",
    icon: <Leaf className="h-6 w-6 text-green-600" />
  },
  {
    id: 5,
    title: "Soil Health Improvement",
    category: "Sustainability",
    description: "Techniques to improve soil quality and fertility for better crop yields.",
    image: "/images/resources/soil-health.jpg",
    date: "March 5, 2023",
    readTime: "9 min read",
    icon: <Droplets className="h-6 w-6 text-blue-600" />
  },
  {
    id: 6,
    title: "Greenhouse Management",
    category: "Planning",
    description: "Tips for maintaining optimal conditions in your greenhouse for year-round growing.",
    image: "/images/resources/greenhouse.jpg",
    date: "August 22, 2023",
    readTime: "8 min read",
    icon: <Sun className="h-6 w-6 text-yellow-600" />
  }
]

// Categories for filtering
const categories = [
  { id: "all", name: "All Resources", icon: <Book className="h-5 w-5" /> },
  { id: "farming-techniques", name: "Farming Techniques", icon: <Leaf className="h-5 w-5" /> },
  { id: "sustainability", name: "Sustainability", icon: <Droplets className="h-5 w-5" /> },
  { id: "planning", name: "Planning", icon: <Calendar className="h-5 w-5" /> }
]

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  // Filter resources based on search term and category
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = activeCategory === "all" || 
                           resource.category.toLowerCase().replace(/\s+/g, '-') === activeCategory
    
    return matchesSearch && matchesCategory
  })

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Farmer Resources</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Access valuable resources to help you grow your farming business and connect with consumers.
        </p>
      </div>

      {/* Resource Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {/* Organic Farming */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="bg-green-100 p-3 rounded-full mb-4 inline-block">
            <Leaf className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Organic Farming</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Organic certification process</li>
            <li>• Natural pest control methods</li>
            <li>• Soil health management</li>
            <li>• Composting techniques</li>
            <li>• Crop rotation guides</li>
          </ul>
        </div>

        {/* Business Management */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="bg-green-100 p-3 rounded-full mb-4 inline-block">
            <BookOpen className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Business Management</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Financial planning templates</li>
            <li>• Market analysis tools</li>
            <li>• Pricing strategies</li>
            <li>• Inventory management</li>
            <li>• Business plan templates</li>
          </ul>
        </div>

        {/* Marketing & Sales */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="bg-green-100 p-3 rounded-full mb-4 inline-block">
            <Users className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Marketing & Sales</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Social media marketing guides</li>
            <li>• Product photography tips</li>
            <li>• Customer engagement strategies</li>
            <li>• Brand building resources</li>
            <li>• Sales funnel templates</li>
          </ul>
        </div>

        {/* Training Videos */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="bg-green-100 p-3 rounded-full mb-4 inline-block">
            <Video className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Training Videos</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Farming techniques tutorials</li>
            <li>• Equipment maintenance guides</li>
            <li>• Harvesting best practices</li>
            <li>• Post-harvest handling</li>
            <li>• Quality control procedures</li>
          </ul>
        </div>

        {/* Legal & Compliance */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="bg-green-100 p-3 rounded-full mb-4 inline-block">
            <FileText className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Legal & Compliance</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Food safety regulations</li>
            <li>• Licensing requirements</li>
            <li>• Insurance guidelines</li>
            <li>• Contract templates</li>
            <li>• Compliance checklists</li>
          </ul>
        </div>

        {/* Community Support */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="bg-green-100 p-3 rounded-full mb-4 inline-block">
            <Users className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Community Support</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Farmer forums</li>
            <li>• Mentorship programs</li>
            <li>• Local farming groups</li>
            <li>• Cooperative resources</li>
            <li>• Networking events</li>
          </ul>
        </div>
      </div>

     
    </div>
  )
} 