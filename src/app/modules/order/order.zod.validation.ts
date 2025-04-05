import { z } from 'zod'

const createOrderItemZodSchema = z.object({
  foodId: z.string(),
  name: z.string(),
  quantity: z.number().min(1),
  price: z.number().min(0),
  specialInstructions: z.string().optional(),
})

const createOrderZodSchema = z.object({
  tableId: z.string(),
  customerName: z.string(),
  items: z.array(createOrderItemZodSchema).min(1),
  orderType: z.enum(['dine-in', 'takeaway']),
})

const updateOrderStatusZodSchema = z.object({
  status: z.enum([
    'pending',
    'cooking',
    'ready',
    'served',
    'completed',
    'cancelled',
  ]),
})

const updatePaymentStatusZodSchema = z.object({
  paymentStatus: z.enum(['unpaid', 'paid']),
})

export const OrderValidation = {
  createOrderZodSchema,
  updateOrderStatusZodSchema,
  updatePaymentStatusZodSchema,
}
