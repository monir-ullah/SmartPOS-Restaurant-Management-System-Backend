import { Schema, model } from 'mongoose'
import { TFoodItem } from './food.interface'

const foodItemSchema = new Schema<TFoodItem>(
  {
    foodId: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value: string) {
          return /^food-\d+$/.test(value)
        },
        message: 'foodId must be in the format food-X where X is a number',
      },
    },
    name: {
      type: String,
      required: [true, 'Food item name is required'],
      unique: true,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    categoryId: {
      type: String,
      ref: 'category',
      required: [true, 'Category is required'],
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

export const MFoodItem = model<TFoodItem>('FoodItem', foodItemSchema)