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
const moveToCompletedOrders = async (
  order: TCompletedOrder,
  session: ClientSession
) => {
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

  if (result.length === 0) {
    throw new NotFoundError('Completed orders not found')
  }

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
        completedAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
        paymentStatus: 'paid',
      },
    },
    {
      $facet: {
        summary: [
          {
            $group: {
              _id: null,
              totalIncome: {
                $sum: { $toDouble: '$totalAmount' },
              },
              orderCount: { $sum: 1 },
              averageOrderValue: {
                $avg: { $toDouble: '$totalAmount' },
              },
            },
          },
          {
            $project: {
              _id: 0,
              totalIncome: { $round: ['$totalIncome', 2] },
              orderCount: 1,
              averageOrderValue: { $round: ['$averageOrderValue', 2] },
            },
          },
        ],
        orders: [
          {
            $project: {
              _id: 0,
              orderId: 1,
              customerName: 1,
              items: 1,
              totalAmount: 1,
              orderType: 1,
              completedAt: 1,
            },
          },
          { $sort: { completedAt: -1 } },
        ],
      },
    },
  ])

  // Return default values if no results
  const summary = result[0]?.summary[0] || {
    totalIncome: 0,
    orderCount: 0,
    averageOrderValue: 0,
  }

  return {
    ...summary,
    orders: result[0]?.orders || [],
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
