import { z } from 'zod'

// User zod Schema
export const userZodSchema = z.object({
  username: z.string({
    required_error: 'username is required',
    invalid_type_error: 'username must be a string',
  }),
  password: z.string({
    required_error: 'password is required',
    invalid_type_error: 'password must be a string',
  }),
  role: z
    .enum(['owner', 'manager', 'waiter', 'cashier', 'chef', 'administrator'])
    .default('administrator'),
})
