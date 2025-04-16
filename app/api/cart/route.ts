import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Cart, { CartDocument } from '@/models/Cart';

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const cart = await Cart.findOne({ userId });
    
    if (!cart) {
      return NextResponse.json({ items: [], total: 0 });
    }
    
    return NextResponse.json({
      items: cart.items,
      total: cart.total
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { userId, items, total } = body;

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    if (!Array.isArray(items)) {
      return NextResponse.json({ error: 'Items must be an array' }, { status: 400 });
    }

    if (typeof total !== 'number') {
      return NextResponse.json({ error: 'Total must be a number' }, { status: 400 });
    }

    const cart = await Cart.findOneAndUpdate(
      { userId },
      { 
        items, 
        total, 
        updatedAt: new Date() 
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({
      items: cart.items,
      total: cart.total
    });
  } catch (error) {
    console.error('Error saving cart:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 