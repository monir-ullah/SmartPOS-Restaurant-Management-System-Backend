import { Schema, model } from 'mongoose'

// TCategory Type
export type TCategory = {
  categoryId: string
  name: string
  description?: string
  isActive: boolean
}

// categorySchema
const categorySchema = new Schema<TCategory>(
  {
    categoryId: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v: string) {
          return /^cat-\d{3,}$/.test(v)
        },
        message: props =>
          `${props.value} is not a valid category ID. It must be in the format cat-XXX where X is at least 3 digits`,
      },
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { versionKey: false }
)

// Category Model
export const MCategory = model<TCategory>('category', categorySchema)
