import express from 'express'
import { CompletedOrderController } from './completedOrder.controller'
import { auth } from '../../utilities/auth'
import { USER_ROLE } from '../../constants/userRole'

const router = express.Router()

router.get(
  '/get-complete-order-report',
  auth(
    USER_ROLE.ADMIN,
    USER_ROLE.MANAGER,
    USER_ROLE.OWNER,
    USER_ROLE.ADMINISTRATOR
  ),
  CompletedOrderController.getCompletedOrders
)
router.get(
  '/get-income',
  auth(
    USER_ROLE.ADMIN,
    USER_ROLE.MANAGER,
    USER_ROLE.OWNER,
    USER_ROLE.ADMINISTRATOR
  ),
  CompletedOrderController.getIncome
)

export const completedOrderRoutes = router
