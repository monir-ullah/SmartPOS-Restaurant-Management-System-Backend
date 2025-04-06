"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.completedOrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const completedOrder_controller_1 = require("./completedOrder.controller");
const router = express_1.default.Router();
router.get('/get-complete-order-report', completedOrder_controller_1.CompletedOrderController.getCompletedOrders);
router.get('/get-income', completedOrder_controller_1.CompletedOrderController.getIncome);
exports.completedOrderRoutes = router;
