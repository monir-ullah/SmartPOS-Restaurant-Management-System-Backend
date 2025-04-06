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
const router = express_1.default.Router();
router.post('/create-order', (0, validateZodRequest_1.validateZodRequest)(order_zod_validation_1.OrderValidation.createOrderZodSchema), order_controller_1.OrderController.createOrder);
router.get('/get-all-orders', order_controller_1.OrderController.getAllOrders);
router.get('/:orderId', order_controller_1.OrderController.getSingleOrder);
router.patch('/:orderId/status', (0, validateZodRequest_1.validateZodRequest)(order_zod_validation_1.OrderValidation.updateOrderStatusZodSchema), order_controller_1.OrderController.updateOrderStatus);
router.patch('/:orderId/payment', (0, validateZodRequest_1.validateZodRequest)(order_zod_validation_1.OrderValidation.updatePaymentStatusZodSchema), order_controller_1.OrderController.updatePaymentStatus);
router.delete('/:orderId', order_controller_1.OrderController.deleteOrder);
exports.orderRoutes = router;
