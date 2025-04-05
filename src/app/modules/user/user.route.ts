import { Router } from 'express'
import { validateZodRequest } from '../../middlewares/validateZodRequest'
import { userZodSchema } from './user.zod.validation'
import { UserController } from './user.controller'

const router = Router()

// Registration route
router.post(
  '/user/registration',
  validateZodRequest(userZodSchema),
  UserController.userRegistration
)

// Login route
router.post(
  '/user/login',
  validateZodRequest(userZodSchema),
  UserController.userLogin
)

export const userRoute = router
