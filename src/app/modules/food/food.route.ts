import express from 'express'

import { FoodItemController } from './food.controller'
import { FoodItemValidation } from './food.zod.validation'
import { validateZodRequest } from '../../middlewares/validateZodRequest'
import { auth } from '../../utilities/auth'
import { USER_ROLE } from '../../constants/userRole'

const router = express.Router()

router.post(
  '/create-food',
  auth(USER_ROLE.ADMIN, USER_ROLE.MANAGER),
  validateZodRequest(FoodItemValidation.createFoodItemValidationSchema),
  FoodItemController.createFoodItem
)

router.get('/get-all-food-items', FoodItemController.getAllFoodItems)

router.get('/get-single-food-item/:id', FoodItemController.getSingleFoodItem)

router.patch(
  '/update-single-fodd-item/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.MANAGER),
  validateZodRequest(FoodItemValidation.updateFoodItemValidationSchema),
  FoodItemController.updateFoodItem
)

router.delete(
  '/delete-single-food-itme/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.MANAGER),
  FoodItemController.deleteFoodItem
)

export const foodItemRoutes = router
