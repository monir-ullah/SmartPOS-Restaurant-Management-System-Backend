import { Router } from 'express'
import { userRoute } from '../modules/user/user.route'
import { categoryRoute } from '../modules/category/category.route'

const router = Router()

// all routes
const moduleRoutes = [
  {
    route: userRoute,
  },
  {
    route: categoryRoute,
  },
  
]

// handling all routes with forEach
moduleRoutes.forEach((route) => router.use('/api/v1/auth', route.route))

export const mainRoutes = router
