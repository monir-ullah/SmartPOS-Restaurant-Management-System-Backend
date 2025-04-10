"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../utilities/sendResponse"));
const order_services_1 = require("./order.services");
const catchAsyncFunc_1 = require("../../utilities/catchAsyncFunc");
const createOrder = (0, catchAsyncFunc_1.catchAsyncFunc)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_services_1.OrderService.createOrder(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Order created successfully',
        data: result,
    });
}));
const getAllOrders = (0, catchAsyncFunc_1.catchAsyncFunc)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = req.query;
    const paginationOptions = {
        page: Number(req.query.page),
        limit: Number(req.query.limit),
    };
    const result = yield order_services_1.OrderService.getAllOrders(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Orders retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleOrder = (0, catchAsyncFunc_1.catchAsyncFunc)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    const result = yield order_services_1.OrderService.getSingleOrder(orderId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order retrieved successfully',
        data: result,
    });
}));
const updateOrderStatus = (0, catchAsyncFunc_1.catchAsyncFunc)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    const { status } = req.body;
    const result = yield order_services_1.OrderService.updateOrderStatus(orderId, status);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order status updated successfully',
        data: result,
    });
}));
const updatePaymentStatus = (0, catchAsyncFunc_1.catchAsyncFunc)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    const { paymentStatus } = req.body;
    const result = yield order_services_1.OrderService.updatePaymentStatus(orderId, paymentStatus);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Payment status updated successfully',
        data: result,
    });
}));
const deleteOrder = (0, catchAsyncFunc_1.catchAsyncFunc)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    const result = yield order_services_1.OrderService.deleteOrder(orderId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order deleted successfully',
        data: result,
    });
}));
exports.OrderController = {
    createOrder,
    getAllOrders,
    getSingleOrder,
    updateOrderStatus,
    updatePaymentStatus,
    deleteOrder,
};
