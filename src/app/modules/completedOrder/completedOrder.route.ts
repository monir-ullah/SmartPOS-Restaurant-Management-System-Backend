import express from 'express'
import { CompletedOrderController } from './completedOrder.controller'

const router = express.Router()

// Route for retrieving completed orders with pagination and filtering
router.get(
  '/get-complete-order-report',()=>{console.log("Here")},
  CompletedOrderController.getCompletedOrders
)

router.get(
  '/hello', ()=>{console.log("Hello")},
)
// Unified route for income reports
router.get('/get-income', CompletedOrderController.getIncome)

export const completedOrderRoutes = router
