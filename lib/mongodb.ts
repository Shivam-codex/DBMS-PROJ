import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/farmers-market';

if (!process.env.MONGODB_URI) {
  console.warn('MONGODB_URI is not defined in environment variables. Using default local connection.');
}

let isConnected = false;

export async function connectDB() {
  if (isConnected) {
    console.log('Using existing database connection');
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export default connectDB; 