"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompletedOrderController = void 0;
const completedOrder_services_1 = require("./completedOrder.services");
const catchAsyncFunc_1 = require("../../utilities/catchAsyncFunc");
const sendResponse_1 = __importDefault(require("../../utilities/sendResponse"));
/**
 * Retrieves completed orders with pagination and filtering
 */
const getCompletedOrders = (0, catchAsyncFunc_1.catchAsyncFunc)(async (req, res) => {
    const filters = req.query;
    const paginationOptions = {
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
    };
    const result = await completedOrder_services_1.CompletedOrderService.getCompletedOrders(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Completed orders retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
});
/**
 * Gets income report based on report type and date parameters
 */
const getIncome = (0, catchAsyncFunc_1.catchAsyncFunc)(async (req, res) => {
    const { reportType = 'daily', date, startDate, endDate } = req.query;
    let result;
    let message;
    const baseDate = date ? new Date(date) : new Date();
    switch (reportType) {
        case 'daily':
            result = await completedOrder_services_1.CompletedOrderService.getDailyIncome(baseDate);
            message = 'Daily income report retrieved successfully';
            break;
        case 'weekly':
            result = await completedOrder_services_1.CompletedOrderService.getWeeklyIncome(baseDate);
            message = 'Weekly income report retrieved successfully';
            break;
        case 'monthly':
            result = await completedOrder_services_1.CompletedOrderService.getMonthlyIncome(baseDate);
            message = 'Monthly income report retrieved successfully';
            break;
        case 'yearly':
            result = await completedOrder_services_1.CompletedOrderService.getYearlyIncome(baseDate);
            message = 'Yearly income report retrieved successfully';
            break;
        case 'custom':
            if (!startDate || !endDate) {
                throw new Error('Start date and end date are required for custom range');
            }
            result = await completedOrder_services_1.CompletedOrderService.getIncomeReport(new Date(startDate), new Date(endDate));
            message = 'Custom range income report retrieved successfully';
            break;
        default:
            throw new Error('Invalid report type');
    }
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message,
        data: result,
    });
});
exports.CompletedOrderController = {
    getCompletedOrders,
    getIncome,
};
