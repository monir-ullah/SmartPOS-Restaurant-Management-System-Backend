import { Schema, model } from 'mongoose'
import { TCompletedOrder } from './completedOrder.interface'

const completedOrderSchema = new Schema<TCompletedOrder>(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    tableId: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    items: [
      {
        foodId: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
        specialInstructions: String,
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    orderType: {
      type: String,
      enum: ['dine-in', 'takeaway'],
      required: true,
    },
    completedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'paid'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

// Create indexes for efficient querying
completedOrderSchema.index({ orderId: 1 })
completedOrderSchema.index({ completedAt: -1 })
completedOrderSchema.index({ tableId: 1, completedAt: -1 })

export const MCompletedOrder = model<TCompletedOrder>(
  'CompletedOrder',
  completedOrderSchema
)
