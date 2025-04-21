import mongoose from "mongoose"

const reviewSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: [true, "Product ID is required"],
  },
  userId: {
    type: String,
    required: [true, "User ID is required"],
  },
  userName: {
    type: String,
    required: [true, "User name is required"],
  },
  rating: {
    type: Number,
    required: [true, "Rating is required"],
    min: [1, "Rating must be at least 1"],
    max: [5, "Rating cannot exceed 5"],
  },
  comment: {
    type: String,
    required: [true, "Comment is required"],
    trim: true,
  },
}, {
  timestamps: true,
})

export const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema) 