import { z } from 'zod'

const createFoodItemValidationSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string',
  }),
  price: z.number({
    required_error: 'Price is required',
    invalid_type_error: 'Price must be a number',
  }),
  description: z.string({
    required_error: 'Description is required',
    invalid_type_error: 'Description must be a string',
  }),
  categoryId: z.string({
    required_error: 'Category ID is required',
    invalid_type_error: 'Category ID must be a string',
  }),
  imageUrl: z.string({
    required_error: 'Image URL is required',
    invalid_type_error: 'Image URL must be a string',
  }),
  isAvailable: z.boolean().default(true),
})

const updateFoodItemValidationSchema = z.object({
  name: z.string().optional(),
  price: z.number().optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  imageUrl: z.string().optional(),
  isAvailable: z.boolean().optional(),
})

export const FoodItemValidation = {
  createFoodItemValidationSchema,
  updateFoodItemValidationSchema,
}