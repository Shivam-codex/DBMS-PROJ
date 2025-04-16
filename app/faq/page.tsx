"use client"

import { useState } from "react"
import { ChevronDown, Mail, Phone, MapPin } from "lucide-react"

// FAQ data
const faqs = [
  {
    question: "How does FarmDirect work?",
    answer: "FarmDirect connects local farmers directly with consumers through our online platform. Farmers can list their products, and consumers can browse and purchase fresh, local produce. We handle the logistics to ensure smooth delivery or pickup."
  },
  {
    question: "How do I become a farmer on FarmDirect?",
    answer: "To become a farmer on FarmDirect, click the 'Join as a Farmer' button and fill out our application form. We'll review your application and get back to you within 3-5 business days. You'll need to provide information about your farm, products, and farming practices."
  },
  {
    question: "What types of products can I sell on FarmDirect?",
    answer: "FarmDirect accepts a wide range of farm products including fresh produce, dairy products, eggs, meat, honey, and value-added products like jams and preserves. All products must meet our quality and safety standards."
  },
  {
    question: "How are prices determined on FarmDirect?",
    answer: "Farmers set their own prices on FarmDirect. We encourage fair pricing that covers production costs while remaining competitive. Our platform provides market insights to help farmers make informed pricing decisions."
  },
  {
    question: "What are the delivery options?",
    answer: "FarmDirect offers multiple delivery options including home delivery, pickup points, and farm pickup. Delivery fees and options vary by location and are clearly displayed during checkout."
  },
  {
    question: "How do I handle returns or issues with orders?",
    answer: "If you have any issues with your order, please contact our customer support team within 24 hours of delivery. We'll work with you and the farmer to resolve any quality or delivery concerns."
  }
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Find answers to common questions about FarmDirect and how our platform works.
        </p>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto mb-16">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4 border-b">
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full py-4 text-left"
            >
              <h3 className="text-lg font-semibold">{faq.question}</h3>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${
                  openIndex === index ? "transform rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="pb-4 text-gray-600">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div className="bg-green-50 rounded-lg p-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Still Have Questions?</h2>
          <p className="text-gray-600 mb-8">
            Contact us directly and our team will be happy to help you.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center justify-center gap-2">
              <MapPin className="h-5 w-5 text-green-600" />
              <p className="text-gray-600">23 Farm Lane<br />Pune City, Maharashtra 414305</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Mail className="h-5 w-5 text-green-600" />
              <p className="text-gray-600">info@farmdirect.com</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Phone className="h-5 w-5 text-green-600" />
              <p className="text-gray-600">+91 9011967964</p>
            </div>
          </div>

          <button
            onClick={() => window.location.href = "mailto:info@farmdirect.com"}
            className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-2 mx-auto"
          >
            <Mail className="h-5 w-5" />
            Contact Us
          </button>
        </div>
      </div>
    </div>
  )
} 