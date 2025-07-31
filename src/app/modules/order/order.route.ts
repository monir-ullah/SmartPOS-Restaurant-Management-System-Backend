import express from 'express'

import { OrderController } from './order.controller'
import { OrderValidation } from './order.zod.validation'
import { validateZodRequest } from '../../middlewares/validateZodRequest'
import { CompletedOrderController } from '../completedOrder/completedOrder.controller'
import { auth } from '../../utilities/auth'
import { USER_ROLE } from '../../constants/userRole'

const router = express.Router()

router.post(
  '/create-order',
  auth(
    USER_ROLE.WAITER,
    USER_ROLE.CHEF,
    USER_ROLE.CASHIER,
    USER_ROLE.ADMIN,
    USER_ROLE.MANAGER,
    USER_ROLE.OWNER,
    USER_ROLE.ADMINISTRATOR
  ),
  validateZodRequest(OrderValidation.createOrderZodSchema),
  OrderController.createOrder
)

router.get(
  '/get-all-orders',
  auth(
    USER_ROLE.ADMIN,
    USER_ROLE.MANAGER,
    USER_ROLE.CHEF,
    USER_ROLE.WAITER,
    USER_ROLE.CASHIER,
    USER_ROLE.OWNER,
    USER_ROLE.ADMINISTRATOR
  ),
  OrderController.getAllOrders
)

router.get(
  '/get-signle-order/:orderId',
  auth(
    USER_ROLE.ADMIN,
    USER_ROLE.MANAGER,
    USER_ROLE.CHEF,
    USER_ROLE.WAITER,
    USER_ROLE.CASHIER
  ),
  OrderController.getSingleOrder
)

router.patch(
  '/:orderId/status',
  auth(
    USER_ROLE.CHEF,
    USER_ROLE.WAITER,
    USER_ROLE.CASHIER,
    USER_ROLE.MANAGER,
    USER_ROLE.ADMIN,
    USER_ROLE.OWNER,
    USER_ROLE.ADMINISTRATOR
  ),
  validateZodRequest(OrderValidation.updateOrderStatusZodSchema),
  OrderController.updateOrderStatus
)

router.patch(
  '/:orderId/payment',
  auth(
    USER_ROLE.CASHIER,
    USER_ROLE.MANAGER,
    USER_ROLE.ADMIN,
    USER_ROLE.OWNER,
    USER_ROLE.ADMINISTRATOR
  ),
  validateZodRequest(OrderValidation.updatePaymentStatusZodSchema),
  OrderController.updatePaymentStatus
)

router.delete(
  '/delete-signle-order/:orderId',
  auth(
    USER_ROLE.ADMIN,
    USER_ROLE.MANAGER,
    USER_ROLE.OWNER,
    USER_ROLE.ADMINISTRATOR
  ),
  OrderController.deleteOrder
)

export const orderRoutes = router
