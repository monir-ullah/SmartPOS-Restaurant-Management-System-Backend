/**
 * Order Service Module
 * Handles all business logic related to restaurant orders including creation,
 * retrieval, status updates, and deletion.
 */

import { generateId } from '../../utilities/essentials'
import { TPaginationOptions } from '../food/food.interface'
import { TOrder, TOrderFilters } from './order.interface'
import { MOrderModel } from './order.model'
import { MFoodItem } from '../food/food.model'
import { NotFoundError } from '../../errors/notFoundError'
import { MTableModel } from '../table/table.model'
import { CompletedOrderService } from '../completedOrder/completedOrder.services'
import mongoose from 'mongoose'

/**
 * Creates a new order in the system
 * @param payload - Partial order data containing table, customer, and items information
 * @throws NotFoundError if table is not available or food items are not found
 * @throws Error if order contains no items
 * @returns Created order document
 */
const createOrder = async (payload: Partial<TOrder>) => {
  // Validate table availability
  if (!payload.tableId) {
    throw new NotFoundError('Please Select a table is not found.')
  }

  const isTableExist = await MTableModel.findOne({
    tableId: payload.tableId,
  })

  if (!isTableExist) {
    throw new NotFoundError('Table is not found.')
  }

  // Validate and process order items
  if (payload.items && payload.items.length > 0) {
    for (const item of payload.items) {
      const foodItem = await MFoodItem.findOne({
        foodId: item.foodId,
        name: item.name,
        isAvailable: true,
      }).lean()

      if (!foodItem) {
        throw new NotFoundError(
          `Food item with ID ${item.foodId} not found or not available`
        )
      }

      // Update item details from database to ensure accuracy
      item.price = foodItem.price
      item.name = foodItem.name
    }
  } else {
    throw new Error('Order must contain at least one food item')
  }

  // Generate unique order ID
  const orderId = await generateId({
    model: MOrderModel,
    prefix: 'order',
    fieldName: 'orderId',
  })

  // Calculate total order amount
  const totalAmount = payload.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  // Create and return the new order
  const result = await MOrderModel.create({
    ...payload,
    orderId,
    totalAmount,
  })
  return result
}

/**
 * Retrieves orders based on filters and pagination options
 * @param filters - Search and filter criteria for orders
 * @param paginationOptions - Page number and limit for pagination
 * @returns Paginated list of orders with metadata
 */
const getAllOrders = async (
  filters: TOrderFilters,
  paginationOptions: TPaginationOptions
) => {
  const {
    searchTerm,
    tableId,
    status,
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
  if (status) conditions.push({ status })
  if (paymentStatus) conditions.push({ paymentStatus })
  if (orderType) conditions.push({ orderType })

  // Add date range filter
  if (startDate && endDate) {
    conditions.push({
      createdAt: {
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

 

  const result = await MOrderModel.find(whereConditions)
    .populate({
      path: 'items.foodId',
      localField: 'items.foodId',
      foreignField: 'foodId',
      select: 'foodId name price description imageUrl isAvailable'
    })
    .skip(skip)
    .limit(limit)
    .lean()

    
  const total = await MOrderModel.countDocuments(whereConditions)

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
 * Retrieves a single order by its ID
 * @param orderId - Unique identifier of the order
 * @returns Order document with populated food items
 */
const getSingleOrder = async (orderId: string) => {
  const result = await MOrderModel.findOne({ orderId }).populate('items.foodId')
  return result
}

/**
 * Updates the status of an order
 * @param orderId - Unique identifier of the order
 * @param status - New status to be set
 * @returns Updated order document
 */
const updateOrderStatus = async (orderId: string, status: TOrder['status']) => {
  // Validate current status and allowed transitions
  const order = await MOrderModel.findOne({ orderId }).lean()
  if (!order) {
    throw new NotFoundError('Order not found')
  }

  const statusFlow = {
    pending: ['cooking', 'cancelled'],
    cooking: ['ready', 'cancelled'],
    ready: ['served', 'cancelled'],
    served: ['pay', 'completed'],
    pay: ['completed'],
    completed: [],
    cancelled: [],
  }

  // Check if the status transition is allowed
  // @ts-ignore
  if (!statusFlow[order.status].includes(status)) {
    throw new Error(
      `Invalid status transition from ${
        order.status
      } to ${status}. Allowed transitions: ${statusFlow[order.status].join(
        ', '
      )}`
    )
  }

  // If status is completed, move to completed orders and delete from orders
  if (status === 'completed') {
    const session = await mongoose.startSession()
    try {
      await session.startTransaction()

      // Get the full order data with populated fields
      const fullOrder = await MOrderModel.findOne({ orderId }).lean()

      if (!fullOrder) {
        throw new NotFoundError('Order not found')
      }

      // Ensure all required fields are present with proper validation
      const completedOrder = {
        orderId: fullOrder.orderId,
        tableId: fullOrder.tableId,
        customerName: fullOrder.customerName,
        items: fullOrder.items,
        totalAmount: fullOrder.totalAmount,
        status: 'completed',
        paymentStatus: fullOrder.paymentStatus || 'paid',
        orderType: fullOrder.orderType || 'dine-in',
        completedAt: new Date(),
      }

      // Move to completed orders with session
      const result = await CompletedOrderService.moveToCompletedOrders(
        completedOrder,
        session
      )

      // Delete from orders collection
      await MOrderModel.findOneAndDelete({ orderId }).session(session)

      await session.commitTransaction()
      return result
    } catch (error) {
      await session.abortTransaction()
      throw error
    } finally {
      session.endSession()
    }
  }
  // For other status updates
  const result = await MOrderModel.findOneAndUpdate(
    { orderId },
    { status },
    {
      new: true,
      runValidators: true,
    }
  )
  return result
}

/**
 * Updates the payment status of an order
 * @param orderId - Unique identifier of the order
 * @param paymentStatus - New payment status to be set
 * @returns Updated order document
 */
const updatePaymentStatus = async (
  orderId: string,
  paymentStatus: TOrder['paymentStatus']
) => {
  const result = await MOrderModel.findOneAndUpdate(
    { orderId },
    { paymentStatus },
    {
      new: true,
      runValidators: true,
    }
  )
  return result
}

/**
 * Deletes an order from the system
 * @param orderId - Unique identifier of the order to be deleted
 * @returns Deleted order document
 */
const deleteOrder = async (orderId: string) => {
  const result = await MOrderModel.findOneAndDelete({ orderId })
  return result
}

export const OrderService = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrderStatus,
  updatePaymentStatus,
  deleteOrder,
}
