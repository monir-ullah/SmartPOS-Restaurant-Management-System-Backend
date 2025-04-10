"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const order_zod_validation_1 = require("./order.zod.validation");
const validateZodRequest_1 = require("../../middlewares/validateZodRequest");
const auth_1 = require("../../utilities/auth");
const userRole_1 = require("../../constants/userRole");
const router = express_1.default.Router();
router.post('/create-order', (0, auth_1.auth)(userRole_1.USER_ROLE.WAITER, userRole_1.USER_ROLE.CHEF), (0, validateZodRequest_1.validateZodRequest)(order_zod_validation_1.OrderValidation.createOrderZodSchema), order_controller_1.OrderController.createOrder);
router.get('/get-all-orders', (0, auth_1.auth)(userRole_1.USER_ROLE.ADMIN, userRole_1.USER_ROLE.MANAGER, userRole_1.USER_ROLE.CHEF, userRole_1.USER_ROLE.WAITER, userRole_1.USER_ROLE.CASHIER), order_controller_1.OrderController.getAllOrders);
router.get('/:orderId', (0, auth_1.auth)(userRole_1.USER_ROLE.ADMIN, userRole_1.USER_ROLE.MANAGER, userRole_1.USER_ROLE.CHEF, userRole_1.USER_ROLE.WAITER, userRole_1.USER_ROLE.CASHIER), order_controller_1.OrderController.getSingleOrder);
router.patch('/:orderId/status', (0, auth_1.auth)(userRole_1.USER_ROLE.CHEF, userRole_1.USER_ROLE.WAITER, userRole_1.USER_ROLE.CASHIER, userRole_1.USER_ROLE.MANAGER, userRole_1.USER_ROLE.ADMIN), (0, validateZodRequest_1.validateZodRequest)(order_zod_validation_1.OrderValidation.updateOrderStatusZodSchema), order_controller_1.OrderController.updateOrderStatus);
router.patch('/:orderId/payment', (0, auth_1.auth)(userRole_1.USER_ROLE.CASHIER, userRole_1.USER_ROLE.MANAGER, userRole_1.USER_ROLE.ADMIN), (0, validateZodRequest_1.validateZodRequest)(order_zod_validation_1.OrderValidation.updatePaymentStatusZodSchema), order_controller_1.OrderController.updatePaymentStatus);
router.delete('/:orderId', (0, auth_1.auth)(userRole_1.USER_ROLE.ADMIN, userRole_1.USER_ROLE.MANAGER), order_controller_1.OrderController.deleteOrder);
exports.orderRoutes = router;
