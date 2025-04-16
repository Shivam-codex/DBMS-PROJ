import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/farmers-market"

export async function connectDB() {
  try {
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection
    }

    const db = await mongoose.connect(MONGODB_URI)
    console.log("Connected to MongoDB")
    return db
  } catch (error) {
    console.error("Error connecting to MongoDB:", error)
    throw error
  }
} 