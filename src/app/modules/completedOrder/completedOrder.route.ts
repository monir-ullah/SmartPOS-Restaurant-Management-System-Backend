import express from 'express'
import { CompletedOrderController } from './completedOrder.controller'

const router = express.Router()

// Route for retrieving completed orders with pagination and filtering
router.get(
  '/get-complete-order-report',
  CompletedOrderController.getCompletedOrders
)

// Unified route for income reports
router.get('/get-income', CompletedOrderController.getIncome)

export const completedOrderRoutes = router
