import { z } from 'zod'

// Category zod Schema for create and update
export const categoryZodSchema = z.object({
  categoryId: z.string({
    invalid_type_error: 'categoryId must be a string',
  }).regex(/^cat-\d+$/, 'categoryId must be in the format cat-XXXX where X is a number').optional(),
  name: z.string({
    required_error: 'name is required',
    invalid_type_error: 'name must be a string',
  }),
  description: z.string({
    invalid_type_error: 'description must be a string',
  }).optional(),
  isActive: z.boolean().default(true),
})

// Category zod Schema for  update
export const updateCategoryZodSchema = z.object({
  name: z.string({
    required_error: 'name is required',
    invalid_type_error: 'name must be a string',
  }).optional(),
  description: z.string({
    invalid_type_error: 'description must be a string',
  }).optional(),
  isActive: z.boolean().optional(),
})

// Category params validation schema for GET, DELETE, and PATCH operations
export const categoryParamsZodSchema = z.object({
  id: z.string({
    required_error: 'Category id is required',
    invalid_type_error: 'Category id must be a string',
  }).regex(/^cat-\d+$/, 'Category id must be in the format cat-XXXX where X is a number'),
})
