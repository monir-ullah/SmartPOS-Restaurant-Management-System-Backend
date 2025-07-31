import { Router } from 'express'
import { userRoute } from '../modules/user/user.route'
import { categoryRoute } from '../modules/category/category.route'
import { foodItemRoutes } from '../modules/food/food.route'
import { tableRoutes } from '../modules/table/table.route'
import { orderRoutes } from '../modules/order/order.route'
import { completedOrderRoutes } from '../modules/completedOrder/completedOrder.route'
import { chatAppRoutes } from '../modules/chat/chat.route'

const router = Router()

// Auth related routes
const authRoutes = [
  {
    route: userRoute,
  },
]

// Non-auth routes
const applicationRoutes = [
  {
    path: '/api/v1/category',
    route: categoryRoute,
  },
  {
    path: '/api/v1/foods',
    route: foodItemRoutes,
  },
  {
    path: '/api/v1/tables',
    route: tableRoutes,
  },
  {
    path: '/api/v1/orders',
    route: orderRoutes,
  },
  {
    // path: '/chat',
    path: '/api/v1/chat-app',
    route: chatAppRoutes,
  },
  {
    path: '/api/v1/completed-orders',
    route: completedOrderRoutes,
  },
]

// Register auth routes
authRoutes.forEach(route => router.use('/api/v1/auth', route.route))

// Register application routes
applicationRoutes.forEach(route => router.use(route.path, route.route))

export const mainRoutes = router
