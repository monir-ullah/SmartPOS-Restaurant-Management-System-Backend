"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRoutes = void 0;
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const category_route_1 = require("../modules/category/category.route");
const food_route_1 = require("../modules/food/food.route");
const table_route_1 = require("../modules/table/table.route");
const order_route_1 = require("../modules/order/order.route");
const completedOrder_route_1 = require("../modules/completedOrder/completedOrder.route");
const router = (0, express_1.Router)();
// Auth related routes
const authRoutes = [
    {
        route: user_route_1.userRoute,
    },
];
// Non-auth routes
const applicationRoutes = [
    {
        path: '/api/v1/category',
        route: category_route_1.categoryRoute,
    },
    {
        path: '/api/v1/foods',
        route: food_route_1.foodItemRoutes,
    },
    {
        path: '/api/v1/tables',
        route: table_route_1.tableRoutes,
    },
    {
        path: '/api/v1/orders',
        route: order_route_1.orderRoutes,
    },
    {
        path: '/api/v1/completed-orders',
        route: completedOrder_route_1.completedOrderRoutes,
    },
];
// Register auth routes
authRoutes.forEach(route => router.use('/api/v1/auth', route.route));
// Register application routes
applicationRoutes.forEach(route => router.use(route.path, route.route));
exports.mainRoutes = router;
