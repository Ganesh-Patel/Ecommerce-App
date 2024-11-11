// models/order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  discountedPrice: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['Paid Online', 'Cash on Delivery'],
    required: true
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  addressId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'address',
    required: true
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true
      },
      productName: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      discountedPrice: {
        type: Number,
        required: true
      },
      total: {
        type: Number,
        required: true
      },
      deliveryDate: {
        type: Date,
        required: true
      }
    }
  ],
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Canceled'],
    default: 'Pending'
  }
});

export const addressModel = mongoose.model("Order", orderSchema);
