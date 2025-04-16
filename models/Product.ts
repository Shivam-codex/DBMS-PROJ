import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: [0, "Price cannot be negative"],
  },
  unit: {
    type: String,
    required: [true, "Product unit is required"],
    enum: ["kg", "g", "l", "ml", "piece", "dozen"],
  },
  description: {
    type: String,
    trim: true,
  },
  stock: {
    type: Number,
    required: [true, "Stock quantity is required"],
    min: [0, "Stock cannot be negative"],
  },
  image: {
    type: String,
    required: [true, "Product image is required"],
  },
  farmer: {
    type: String,
    required: [true, "Farmer name is required"],
  },
  farmerId: {
    type: String,
    required: [true, "Farmer ID is required"],
  },
  userId: {
    type: String,
    required: [true, "User ID is required"],
  },
}, {
  timestamps: true,
})

export const Product = mongoose.models.Product || mongoose.model("Product", productSchema) 