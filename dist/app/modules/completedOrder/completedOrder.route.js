"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.completedOrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const completedOrder_controller_1 = require("./completedOrder.controller");
const auth_1 = require("../../utilities/auth");
const userRole_1 = require("../../constants/userRole");
const router = express_1.default.Router();
router.get('/get-complete-order-report', (0, auth_1.auth)(userRole_1.USER_ROLE.ADMIN, userRole_1.USER_ROLE.MANAGER), completedOrder_controller_1.CompletedOrderController.getCompletedOrders);
router.get('/get-income', (0, auth_1.auth)(userRole_1.USER_ROLE.ADMIN, userRole_1.USER_ROLE.MANAGER), completedOrder_controller_1.CompletedOrderController.getIncome);
exports.completedOrderRoutes = router;
