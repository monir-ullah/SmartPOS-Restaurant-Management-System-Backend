import { Router } from 'express'
import { userRoute } from '../modules/user/user.route'
import { categoryRoute } from '../modules/category/category.route'
import { foodItemRoutes } from '../modules/food/food.route'
import { tableRoutes } from '../modules/table/table.route'
import { ro } from 'date-fns/locale'
import { orderRoutes } from '../modules/order/order.route'

const router = Router()

// all routes
const moduleRoutes = [
  {
    route: userRoute,
  },
  {
    route: categoryRoute,
  },
  {
    route: foodItemRoutes,
  },
  {
    route: tableRoutes,
  },
  {
    route: orderRoutes,
  },
]

// handling all routes with forEach
moduleRoutes.forEach(route => router.use('/api/v1/auth', route.route))

export const mainRoutes = router
