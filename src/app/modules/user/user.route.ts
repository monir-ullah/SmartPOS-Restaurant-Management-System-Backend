import { Router } from 'express'
import { validateZodRequest } from '../../middlewares/validateZodRequest'
import { userZodSchema } from './user.zod.validation'
import { UserController } from './user.controller'
import { auth } from '../../utilities/auth'
import { USER_ROLE } from '../../constants/userRole'

const router = Router()

// Registration route
router.post(
  '/user/registration',
  auth(USER_ROLE.ADMIN, USER_ROLE.MANAGER),
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
