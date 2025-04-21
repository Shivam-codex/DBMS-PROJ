import { NextResponse } from 'next/server'
import { Cart } from '@/models/Cart'
import connectDB from '@/lib/mongodb'

interface CartItem {
  productId: number
  name: string
  price: number
  quantity: number
  image: string
  unit: string
  farm: string
}

export async function GET(request: Request) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const cart = await Cart.findOne({ userId })
    return NextResponse.json(cart || { items: [] })
  } catch (error) {
    console.error('Error fetching cart:', error)
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()
    const { userId, item } = await request.json()

    if (!userId || !item) {
      return NextResponse.json({ error: 'User ID and item are required' }, { status: 400 })
    }

    // Convert productId to number if it's a string
    const productId = typeof item.productId === 'string' ? parseInt(item.productId, 10) : item.productId

    // Validate required fields
    if (!productId || isNaN(productId)) {
      return NextResponse.json({ error: 'Valid product ID is required' }, { status: 400 })
    }

    let cart = await Cart.findOne({ userId })

    if (!cart) {
      cart = new Cart({ 
        userId, 
        items: [{
          productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity || 1,
          image: item.image,
          unit: item.unit,
          farm: item.farm
        }]
      })
    } else {
      const existingItem = cart.items.find((i: CartItem) => i.productId === productId)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        cart.items.push({
          productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity || 1,
          image: item.image,
          unit: item.unit,
          farm: item.farm
        })
      }
    }

    await cart.save()
    return NextResponse.json(cart)
  } catch (error) {
    console.error('Error adding to cart:', error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Failed to add to cart' 
    }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB()
    const { userId, productId, quantity } = await request.json()

    if (!userId || !productId || quantity === undefined) {
      return NextResponse.json({ error: 'User ID, product ID, and quantity are required' }, { status: 400 })
    }

    const cart = await Cart.findOne({ userId })
    if (!cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 })
    }

    const item = cart.items.find((i: CartItem) => i.productId === productId)
    if (!item) {
      return NextResponse.json({ error: 'Item not found in cart' }, { status: 404 })
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter((i: CartItem) => i.productId !== productId)
    } else {
      item.quantity = quantity
    }

    await cart.save()
    return NextResponse.json(cart)
  } catch (error) {
    console.error('Error updating cart:', error)
    return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const productId = searchParams.get('productId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const cart = await Cart.findOne({ userId })
    if (!cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 })
    }

    if (productId) {
      cart.items = cart.items.filter((i: CartItem) => i.productId !== Number(productId))
    } else {
      cart.items = []
    }

    await cart.save()
    return NextResponse.json(cart)
  } catch (error) {
    console.error('Error clearing cart:', error)
    return NextResponse.json({ error: 'Failed to clear cart' }, { status: 500 })
  }
} 