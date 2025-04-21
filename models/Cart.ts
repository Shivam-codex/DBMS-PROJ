import mongoose from 'mongoose'

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  },
  image: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  farm: {
    type: String,
    required: true
  }
})

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  items: [cartItemSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

// Update the updatedAt timestamp before saving
cartSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

export const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema) 