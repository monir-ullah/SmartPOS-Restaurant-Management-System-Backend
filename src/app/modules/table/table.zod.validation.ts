import { z } from 'zod'

const createTableValidationSchema = z.object({
  tableNumber: z.number({
    required_error: 'Table number is required',
  }),
  seatCapacity: z.number({
    required_error: 'Seat capacity is required',
  }),
  status: z
    .enum(['available', 'occupied', 'reserved', 'maintenance'])
    .optional(),
})

const updateTableValidationSchema = z.object({
  tableNumber: z.number().optional(),
  seatCapacity: z.number().optional(),
  isOccupied: z.boolean().optional(),
  status: z
    .enum(['available', 'occupied', 'reserved', 'maintenance'])
    .optional(),
})

export const TableValidation = {
  createTableValidationSchema,
  updateTableValidationSchema,
}
