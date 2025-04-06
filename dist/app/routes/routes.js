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
// all routes
const moduleRoutes = [
    {
        route: user_route_1.userRoute,
    },
    {
        route: category_route_1.categoryRoute,
    },
    {
        route: food_route_1.foodItemRoutes,
    },
    {
        route: table_route_1.tableRoutes,
    },
    {
        route: order_route_1.orderRoutes,
    },
    {
        route: completedOrder_route_1.completedOrderRoutes,
    },
];
// handling all routes with forEach
moduleRoutes.forEach(route => router.use('/api/v1/auth', route.route));
exports.mainRoutes = router;
