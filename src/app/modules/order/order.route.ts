import express from 'express'

import { OrderController } from './order.controller'
import { OrderValidation } from './order.zod.validation'
import { validateZodRequest } from '../../middlewares/validateZodRequest'

const router = express.Router()

router.post(
  '/create-order',
  validateZodRequest(OrderValidation.createOrderZodSchema),
  OrderController.createOrder
)

router.get('/', OrderController.getAllOrders)

router.get('/:orderId', OrderController.getSingleOrder)

router.patch(
  '/:orderId/status',
  validateZodRequest(OrderValidation.updateOrderStatusZodSchema),
  OrderController.updateOrderStatus
)

router.patch(
  '/:orderId/payment',
  validateZodRequest(OrderValidation.updatePaymentStatusZodSchema),
  OrderController.updatePaymentStatus
)

router.delete('/:orderId', OrderController.deleteOrder)

export const orderRoutes = router
