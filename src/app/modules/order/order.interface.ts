import { Types } from 'mongoose'

export type TOrderItem = {
  foodId: string // add a validation of the id;
  name: string
  quantity: number
  price: number
  specialInstructions?: string
}

export type TOrder = {
  orderId: string
  tableId: string
  customerName: string
  items: TOrderItem[]
  totalAmount: number
  status:
    | 'pending'
    | 'cooking'
    | 'ready'
    | 'served'
    | 'pay'
    | 'completed'
    | 'canceled'
  paymentStatus: 'unpaid' | 'paid'
  orderType: 'dine-in' | 'takeaway'
  createdAt: Date
  updatedAt: Date
}

export type TOrderFilters = {
  searchTerm?: string
  tableId?: string
  status?: TOrder['status']
  paymentStatus?: TOrder['paymentStatus']
  orderType?: TOrder['orderType']
  startDate?: Date
  endDate?: Date
}
