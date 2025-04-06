import express from 'express'
import { CompletedOrderController } from './completedOrder.controller'

const router = express.Router()

router.get('/get-complete-order-report', CompletedOrderController.getCompletedOrders)
router.get('/get-income', CompletedOrderController.getIncome)

export const completedOrderRoutes = router
