import express from 'express'

import { FoodItemController } from './food.controller'
import { FoodItemValidation } from './food.zod.validation'
import { validateZodRequest } from '../../middlewares/validateZodRequest'

const router = express.Router()

router.post(
  '/create-food',
  validateZodRequest(FoodItemValidation.createFoodItemValidationSchema),
  FoodItemController.createFoodItem
)

router.get('/get-all-food-items', FoodItemController.getAllFoodItems)

router.get('/get-single-food-item/:id', FoodItemController.getSingleFoodItem)

router.patch(
  '/update-single-fodd-item/:id',
  validateZodRequest(FoodItemValidation.updateFoodItemValidationSchema),
  FoodItemController.updateFoodItem
)

router.delete('/delete-single-food-itme/:id', FoodItemController.deleteFoodItem)

export const foodItemRoutes = router
