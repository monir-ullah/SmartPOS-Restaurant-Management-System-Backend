import { Schema, model } from 'mongoose'
import { TOrder, TOrderItem } from './order.interface'

const orderItemSchema = new Schema<TOrderItem>(
  {
    foodId: {
      type: String,
      ref: 'FoodItem',
      required: true,
      validate: {
        validator: function (v: string) {
          return /^food-\d{3,}$/.test(v)
        },
        message: props =>
          `${props.value} is not a valid category ID. It must be in the format food-XXX where X is at least 3 digits`,
      },
    },
    name: {
      type: String,
      required: true,
      min: 1,
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
    specialInstructions: {
      type: String,
    },
  },
  {
    _id: false,
  }
)

const orderSchema = new Schema<TOrder>(
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
    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: function (items: TOrderItem[]) {
          return items.length > 0
        },
        message: 'Order must have at least one item',
      },
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: [
        'pending',
        'cooking',
        'ready',
        'served',
        'completed',
        'pay',
        'canceled',
      ],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'paid'],
      default: 'unpaid',
    },
    orderType: {
      type: String,
      enum: ['dine-in', 'takeaway'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export const MOrderModel = model<TOrder>('Order', orderSchema)
