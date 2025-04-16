import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { Product } from "@/models/Product"
import { verify } from "jsonwebtoken"
import { cookies } from "next/headers"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(request: Request) {
  try {
    // Get the auth token from cookies
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      )
    }

    // Verify the token and get the user ID
    const decoded = verify(token, JWT_SECRET) as { id: string }
    const userId = decoded.id

    // Get the request body
    const body = await request.json()
    const { name, price, unit, description, stock, image, farmer, farmerId } = body

    // Validate required fields
    if (!name || !price || !unit || !stock || !image) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      )
    }

    // Connect to the database
    await connectDB()

    // Create the product
    const product = await Product.create({
      name,
      price: Number(price),
      unit,
      description,
      stock: Number(stock),
      image,
      farmer,
      farmerId,
      userId, // This is the authenticated user's ID
    })

    return NextResponse.json(
      { message: "Product added successfully", product },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error adding product:", error)
    return NextResponse.json(
      { message: "Failed to add product" },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    // Get the auth token from cookies
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      )
    }

    // Verify the token and get the user ID
    const decoded = verify(token, JWT_SECRET) as { id: string }
    const userId = decoded.id

    // Connect to the database
    await connectDB()

    // Get all products for the authenticated farmer
    const products = await Product.find({ userId })

    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    )
  }
} 