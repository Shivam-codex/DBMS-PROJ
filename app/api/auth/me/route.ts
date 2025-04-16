import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

// JWT secret key - in production, use environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET() {
  try {
    // Get token from cookie
    const cookieStore = cookies();
    const token = cookieStore.get('auth-token');
    
    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    // Verify token
    const decoded = verify(token.value, JWT_SECRET) as { id: string };
    
    // Connect to database
    await connectDB();
    
    // Find user
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Return user without password
    return NextResponse.json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error('Get current user error:', error);
    return NextResponse.json(
      { error: 'Not authenticated' },
      { status: 401 }
    );
  }
} 