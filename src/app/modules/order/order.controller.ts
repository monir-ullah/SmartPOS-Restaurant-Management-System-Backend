import { Request, Response } from 'express'
import httpStatus from 'http-status'
import sendResponse from '../../utilities/sendResponse'
import { OrderService } from './order.services'
import { catchAsyncFunc } from '../../utilities/catchAsyncFunc'

const createOrder = catchAsyncFunc(async (req: Request, res: Response) => {
  const result = await OrderService.createOrder(req.body)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Order created successfully',
    data: result,
  })
})

const getAllOrders = catchAsyncFunc(async (req: Request, res: Response) => {
  const filters = req.query
  const paginationOptions = {
    page: Number(req.query.page),
    limit: Number(req.query.limit),
  }

  const result = await OrderService.getAllOrders(filters, paginationOptions)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders retrieved successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleOrder = catchAsyncFunc(async (req: Request, res: Response) => {
  const { orderId } = req.params
  const result = await OrderService.getSingleOrder(orderId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order retrieved successfully',
    data: result,
  })
})

const updateOrderStatus = catchAsyncFunc(
  async (req: Request, res: Response) => {
    const { orderId } = req.params
    const { status } = req.body

    const result = await OrderService.updateOrderStatus(orderId, status)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order status updated successfully',
      data: result,
    })
  }
)

const updatePaymentStatus = catchAsyncFunc(
  async (req: Request, res: Response) => {
    const { orderId } = req.params
    const { paymentStatus } = req.body

    const result = await OrderService.updatePaymentStatus(
      orderId,
      paymentStatus
    )

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Payment status updated successfully',
      data: result,
    })
  }
)

const deleteOrder = catchAsyncFunc(async (req: Request, res: Response) => {
  const { orderId } = req.params
  const result = await OrderService.deleteOrder(orderId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order deleted successfully',
    data: result,
  })
})

export const OrderController = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrderStatus,
  updatePaymentStatus,
  deleteOrder,
}
