import { Router } from 'express'
import { validateZodRequest } from '../../middlewares/validateZodRequest'
import { useZodSchema } from './user.zod.validation'
import { UserController } from './user.controller'

const router = Router()

// Registration route
router.post(
  '/user/registration',
  validateZodRequest(useZodSchema),
  UserController.userRegistration,
)

// Login route
router.post(
  '/user/login',
  validateZodRequest(useZodSchema),
  UserController.userLogin,
)

export const userRoute = router
