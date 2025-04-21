'use client'

import { useState, useEffect } from "react"
import { Star, StarHalf, StarOff } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface Review {
  _id: string
  userName: string
  rating: number
  comment: string
  createdAt: string
}

interface ReviewSectionProps {
  productId: string
}

export function ReviewSection({ productId }: ReviewSectionProps) {
  const { user } = useAuth()
  const [reviews, setReviews] = useState<Review[]>([])
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchReviews()
  }, [productId])

  const fetchReviews = async () => {
    try {
      const response = await fetch(`/api/reviews?productId=${productId}`)
      if (!response.ok) throw new Error("Failed to fetch reviews")
      const data = await response.json()
      setReviews(data)
    } catch (err) {
      console.error("Error fetching reviews:", err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      setError("Please login to submit a review")
      return
    }
    if (rating === 0) {
      setError("Please select a rating")
      return
    }
    if (!comment.trim()) {
      setError("Please write a comment")
      return
    }

    try {
      setIsSubmitting(true)
      setError("")

      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          rating,
          comment,
        }),
      })

      if (!response.ok) throw new Error("Failed to submit review")

      setRating(0)
      setComment("")
      fetchReviews()
    } catch (err) {
      setError("Failed to submit review. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => {
        const starValue = index + 1
        return (
          <button
            key={index}
            onClick={() => setRating(starValue)}
            className="focus:outline-none hover:scale-110 transition-transform"
            aria-label={`Rate ${starValue} out of 5 stars`}
          >
            {starValue <= rating ? (
              <Star className="h-8 w-8 text-yellow-400 fill-current" />
            ) : (
              <Star className="h-8 w-8 text-gray-300 hover:text-yellow-400" />
            )}
          </button>
        )
      })
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

      {/* Review Form */}
      {user ? (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col space-y-2 mb-4">
              <span className="text-gray-600 font-medium">Your Rating:</span>
              <div className="flex items-center space-x-2">
                {renderStars(rating)}
                <span className="ml-2 text-gray-500">
                  {rating > 0 ? `${rating} star${rating > 1 ? 's' : ''}` : 'Select rating'}
                </span>
              </div>
            </div>
            <div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience with this product..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                rows={4}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 font-medium text-lg shadow-md hover:shadow-lg"
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Please{" "}
              <a href="/login" className="text-green-600 hover:underline font-medium">
                login
              </a>{" "}
              to write a review.
            </p>
            <a
              href="/login"
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors font-medium text-lg shadow-md hover:shadow-lg"
            >
              Login to Review
            </a>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review._id} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <Star
                      key={index}
                      className={`h-5 w-5 ${
                        index < review.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
              </div>
              <span className="text-sm text-gray-500">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="font-semibold mb-1">{review.userName}</p>
            <p className="text-gray-600">{review.comment}</p>
          </div>
        ))}

        {reviews.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">No reviews yet. Be the first to review!</p>
          </div>
        )}
      </div>
    </div>
  )
} 