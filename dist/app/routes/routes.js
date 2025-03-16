"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRoutes = void 0;
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const smartphone_route_1 = require("../modules/smartphone/smartphone.route");
const sales_management_route_1 = require("../modules/salesManagement/sales.management.route");
const router = (0, express_1.Router)();
// all routes
const moduleRoutes = [
    {
        route: user_route_1.userRoute,
    },
    {
        route: smartphone_route_1.smartphoneRoute,
    },
    {
        route: sales_management_route_1.salesManagementRoute,
    },
];
// handling all routes with forEach
moduleRoutes.forEach((route) => router.use('/', route.route));
exports.mainRoutes = router;
