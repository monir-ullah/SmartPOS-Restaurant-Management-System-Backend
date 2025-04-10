import express from 'express'
import { CompletedOrderController } from './completedOrder.controller'
import { auth } from '../../utilities/auth'
import { USER_ROLE } from '../../constants/userRole'

const router = express.Router()

router.get(
  '/get-complete-order-report',
  auth(USER_ROLE.ADMIN, USER_ROLE.MANAGER),
  CompletedOrderController.getCompletedOrders
)
router.get(
  '/get-income',
  auth(USER_ROLE.ADMIN, USER_ROLE.MANAGER),
  CompletedOrderController.getIncome
)

export const completedOrderRoutes = router
