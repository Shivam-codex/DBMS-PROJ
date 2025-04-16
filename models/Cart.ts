import mongoose, { Schema, Document } from 'mongoose';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  unit: string;
  farmer: string;
  image: string;
  quantity: number;
}

export interface CartDocument extends Document {
  userId: string;
  items: CartItem[];
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

const CartItemSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  unit: { type: String, required: true },
  farmer: { type: String, required: true },
  image: { type: String, required: true },
  quantity: { type: Number, default: 1 },
});

const CartSchema = new Schema({
  userId: { type: String, required: true },
  items: [CartItemSchema],
  total: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Cart || mongoose.model<CartDocument>('Cart', CartSchema); 