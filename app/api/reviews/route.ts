import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { Review } from "@/models/Review"
import { verify } from "jsonwebtoken"
import { cookies } from "next/headers"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      )
    }

    const decoded = verify(token, JWT_SECRET) as { id: string; name: string }
    const userId = decoded.id
    const userName = decoded.name

    const body = await request.json()
    const { productId, rating, comment } = body

    if (!productId || !rating || !comment) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      )
    }

    await connectDB()

    const review = await Review.create({
      productId,
      userId,
      userName,
      rating,
      comment,
    })

    return NextResponse.json(
      { message: "Review added successfully", review },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error adding review:", error)
    return NextResponse.json(
      { message: "Failed to add review" },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get("productId")

    if (!productId) {
      return NextResponse.json(
        { message: "Product ID is required" },
        { status: 400 }
      )
    }

    await connectDB()

    const reviews = await Review.find({ productId }).sort({ createdAt: -1 })

    return NextResponse.json(reviews)
  } catch (error) {
    console.error("Error fetching reviews:", error)
    return NextResponse.json(
      { message: "Failed to fetch reviews" },
      { status: 500 }
    )
  }
} 