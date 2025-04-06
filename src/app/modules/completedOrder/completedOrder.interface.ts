import { Types } from 'mongoose'

export type TCompletedOrder = {
  orderId: string
  tableId: string
  customerName: string
  items: Array<{
    foodId: string
    name: string
    quantity: number
    price: number
    specialInstructions?: string
  }>
  totalAmount: number
  orderType: 'dine-in' | 'takeaway'
  completedAt: Date
  paymentStatus: 'unpaid' | 'paid'
  _id?: Types.ObjectId
}

export type TCompletedOrderFilters = {
  searchTerm?: string
  tableId?: string
  paymentStatus?: 'unpaid' | 'paid'
  startDate?: Date
  endDate?: Date
  orderType?: 'dine-in' | 'takeaway'
}

export type TIncomeReport = {
  totalIncome: number
  orderCount: number
  averageOrderValue: number
  orders: Array<{
    orderId: string
    customerName: string
    items: Array<{
      foodId: string
      name: string
      quantity: number
      price: number
      specialInstructions?: string
    }>
    totalAmount: number
    orderType: 'dine-in' | 'takeaway'
    completedAt: Date
  }>
  period?: {
    start: Date
    end: Date
  }
}
