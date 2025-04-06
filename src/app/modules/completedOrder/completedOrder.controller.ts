import { Request, Response } from 'express'
import { CompletedOrderService } from './completedOrder.services'

import { TCompletedOrder } from './completedOrder.interface'
import { catchAsyncFunc } from '../../utilities/catchAsyncFunc'
import sendResponse from '../../utilities/sendResponse'

/**
 * Retrieves completed orders with pagination and filtering
 */
const getCompletedOrders = catchAsyncFunc(
  async (req: Request, res: Response) => {
    const filters = req.query
    const paginationOptions = {
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,
    }

    const result = await CompletedOrderService.getCompletedOrders(
      filters,
      paginationOptions
    )

    sendResponse<TCompletedOrder[]>(res, {
      statusCode: 200,
      success: true,
      message: 'Completed orders retrieved successfully',
      meta: result.meta,
      data: result.data,
    })
  }
)

/**
 * Gets income report based on report type and date parameters
 */
const getIncome = catchAsyncFunc(async (req: Request, res: Response) => {
  const { reportType = 'daily', date, startDate, endDate } = req.query
  let result
  let message

  try {
    // Parse the date string to Date object
    const baseDate = date ? new Date(date as string) : new Date()

    switch (reportType) {
      case 'daily':
        result = await CompletedOrderService.getDailyIncome(baseDate)
        message = 'Daily income report retrieved successfully'
        break
      case 'weekly':
        result = await CompletedOrderService.getWeeklyIncome(baseDate)
        message = 'Weekly income report retrieved successfully'
        break
      case 'monthly':
        result = await CompletedOrderService.getMonthlyIncome(baseDate)
        message = 'Monthly income report retrieved successfully'
        break
      case 'yearly':
        result = await CompletedOrderService.getYearlyIncome(baseDate)
        message = 'Yearly income report retrieved successfully'
        break
      case 'custom':
        if (!startDate || !endDate) {
          throw new Error(
            'Start date and end date are required for custom range'
          )
        }
        const parsedStartDate = new Date(startDate as string)
        const parsedEndDate = new Date(endDate as string)

        // Validate dates
        if (
          isNaN(parsedStartDate.getTime()) ||
          isNaN(parsedEndDate.getTime())
        ) {
          throw new Error('Invalid date format. Use YYYY-MM-DD')
        }

        // Set time to start and end of day
        parsedStartDate.setHours(0, 0, 0, 0)
        parsedEndDate.setHours(23, 59, 59, 999)

        result = await CompletedOrderService.getIncomeReport(
          parsedStartDate,
          parsedEndDate
        )
        message = 'Custom range income report retrieved successfully'
        break
      default:
        throw new Error('Invalid report type')
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message,
      data: result,
    })
  } catch (error) {
    sendResponse(res, {
      statusCode: 400,
      data: null,
      success: false,
      message:
        error instanceof Error ? error.message : 'Failed to get income report',
    })
  }
})

export const CompletedOrderController = {
  getCompletedOrders,
  getIncome,
}
