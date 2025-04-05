import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from 'date-fns'
import {
  TCompletedOrder,
  TCompletedOrderFilters,
  TIncomeReport,
} from './completedOrder.interface'
import { MCompletedOrder } from './completedOrder.model'
import { TPaginationOptions } from '../food/food.interface'
import { ClientSession, Document, Types } from 'mongoose'
import { TOrder } from '../order/order.interface'
import { NotFoundError } from '../../errors/notFoundError'

/**
 * Moves a completed order from the order collection to completed orders
 */
const moveToCompletedOrders = async (order: TCompletedOrder, session: ClientSession) => {
  // Pass the order as an array when using session
  const result = await MCompletedOrder.create([order], { session })
  return result[0] // Return the first (and only) created document
}

/**
 * Retrieves completed orders with filtering and pagination
 */
const getCompletedOrders = async (
  filters: TCompletedOrderFilters,
  paginationOptions: TPaginationOptions
) => {
  const {
    searchTerm,
    tableId,
    paymentStatus,
    orderType,
    startDate,
    endDate,
    ...filterData
  } = filters
  const { page = 1, limit = 10 } = paginationOptions
  const skip = (page - 1) * limit
  const conditions = []

  console.log("Here")
  // Build search conditions
  if (searchTerm) {
    conditions.push({
      $or: [
        { orderId: { $regex: searchTerm, $options: 'i' } },
        { customerName: { $regex: searchTerm, $options: 'i' } },
      ],
    })
  }

  // Add filter conditions
  if (tableId) conditions.push({ tableId })
  if (paymentStatus) conditions.push({ paymentStatus })
  if (orderType) conditions.push({ orderType })

  // Add date range filter
  if (startDate && endDate) {
    conditions.push({
      completedAt: {
        $gte: startDate,
        $lte: endDate,
      },
    })
  }

  // Add additional filters
  if (Object.keys(filterData).length) {
    conditions.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  
  // Execute query with conditions
  const whereConditions = conditions.length > 0 ? { $and: conditions } : {}

  const result = await MCompletedOrder.find(whereConditions)
    .skip(skip)
    .limit(limit)
    .lean()

  const total = await MCompletedOrder.countDocuments(whereConditions)

  return {
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    data: result,
  }
}

/**
 * Calculates income report for a specific date range
 */
const getIncomeReport = async (
  startDate: Date,
  endDate: Date
): Promise<TIncomeReport> => {
  const result = await MCompletedOrder.aggregate([
    {
      $match: {
        completedAt: { $gte: startDate, $lte: endDate },
        paymentStatus: 'paid',
      },
    },
    {
      $group: {
        _id: null,
        totalIncome: { $sum: '$totalAmount' },
        orderCount: { $sum: 1 },
        averageOrderValue: { $avg: '$totalAmount' },
      },
    },
  ])

  return {
    totalIncome: result[0]?.totalIncome || 0,
    orderCount: result[0]?.orderCount || 0,
    averageOrderValue: result[0]?.averageOrderValue || 0,
    period: { start: startDate, end: endDate },
  }
}

/**
 * Gets daily income report
 */
const getDailyIncome = async (
  date: Date = new Date()
): Promise<TIncomeReport> => {
  return getIncomeReport(startOfDay(date), endOfDay(date))
}

/**
 * Gets weekly income report
 */
const getWeeklyIncome = async (
  date: Date = new Date()
): Promise<TIncomeReport> => {
  return getIncomeReport(startOfWeek(date), endOfWeek(date))
}

/**
 * Gets monthly income report
 */
const getMonthlyIncome = async (
  date: Date = new Date()
): Promise<TIncomeReport> => {
  return getIncomeReport(startOfMonth(date), endOfMonth(date))
}

/**
 * Gets yearly income report
 */
const getYearlyIncome = async (
  date: Date = new Date()
): Promise<TIncomeReport> => {
  return getIncomeReport(startOfYear(date), endOfYear(date))
}

export const CompletedOrderService = {
  moveToCompletedOrders,
  getCompletedOrders,
  getIncomeReport,
  getDailyIncome,
  getWeeklyIncome,
  getMonthlyIncome,
  getYearlyIncome,
}
