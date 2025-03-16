import { Router } from 'express'
import { userRoute } from '../modules/user/user.route'

const router = Router()

// all routes
const moduleRoutes = [
  {
    route: userRoute,
  },
]

// handling all routes with forEach
moduleRoutes.forEach((route) => router.use('/api/v1/auth', route.route))

export const mainRoutes = router
