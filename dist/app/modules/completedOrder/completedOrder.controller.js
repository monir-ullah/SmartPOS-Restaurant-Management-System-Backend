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
exports.CompletedOrderController = void 0;
const completedOrder_services_1 = require("./completedOrder.services");
const catchAsyncFunc_1 = require("../../utilities/catchAsyncFunc");
const sendResponse_1 = __importDefault(require("../../utilities/sendResponse"));
/**
 * Retrieves completed orders with pagination and filtering
 */
const getCompletedOrders = (0, catchAsyncFunc_1.catchAsyncFunc)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = req.query;
    const paginationOptions = {
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
    };
    const result = yield completedOrder_services_1.CompletedOrderService.getCompletedOrders(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Completed orders retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
}));
/**
 * Gets income report based on report type and date parameters
 */
const getIncome = (0, catchAsyncFunc_1.catchAsyncFunc)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { reportType = 'daily', date, startDate, endDate } = req.query;
    let result;
    let message;
    try {
        // Parse the date string to Date object
        const baseDate = date ? new Date(date) : new Date();
        switch (reportType) {
            case 'daily':
                result = yield completedOrder_services_1.CompletedOrderService.getDailyIncome(baseDate);
                message = 'Daily income report retrieved successfully';
                break;
            case 'weekly':
                result = yield completedOrder_services_1.CompletedOrderService.getWeeklyIncome(baseDate);
                message = 'Weekly income report retrieved successfully';
                break;
            case 'monthly':
                result = yield completedOrder_services_1.CompletedOrderService.getMonthlyIncome(baseDate);
                message = 'Monthly income report retrieved successfully';
                break;
            case 'yearly':
                result = yield completedOrder_services_1.CompletedOrderService.getYearlyIncome(baseDate);
                message = 'Yearly income report retrieved successfully';
                break;
            case 'custom':
                if (!startDate || !endDate) {
                    throw new Error('Start date and end date are required for custom range');
                }
                const parsedStartDate = new Date(startDate);
                const parsedEndDate = new Date(endDate);
                // Validate dates
                if (isNaN(parsedStartDate.getTime()) ||
                    isNaN(parsedEndDate.getTime())) {
                    throw new Error('Invalid date format. Use YYYY-MM-DD');
                }
                // Set time to start and end of day
                parsedStartDate.setHours(0, 0, 0, 0);
                parsedEndDate.setHours(23, 59, 59, 999);
                result = yield completedOrder_services_1.CompletedOrderService.getIncomeReport(parsedStartDate, parsedEndDate);
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
    }
    catch (error) {
        (0, sendResponse_1.default)(res, {
            statusCode: 400,
            data: null,
            success: false,
            message: error instanceof Error ? error.message : 'Failed to get income report',
        });
    }
}));
exports.CompletedOrderController = {
    getCompletedOrders,
    getIncome,
};
