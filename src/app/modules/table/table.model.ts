import { Schema, model } from 'mongoose'
import { TTable } from './table.interface'

const tableSchema = new Schema<TTable>(
  {
    tableId: {
      type: String,
      required: true,
      unique: true,
    },
    tableNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    seatCapacity: {
      type: Number,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ['available', 'occupied', 'reserved', 'maintenance'],
      default: 'available',
    },
  },
  {
    timestamps: true,
  }
)

export const MTableModel = model<TTable>('Table', tableSchema)
