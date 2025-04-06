"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompletedOrderService = void 0;
const date_fns_1 = require("date-fns");
const completedOrder_model_1 = require("./completedOrder.model");
/**
 * Moves a completed order from the order collection to completed orders
 */
const moveToCompletedOrders = async (order, session) => {
    // Pass the order as an array when using session
    const result = await completedOrder_model_1.MCompletedOrder.create([order], { session });
    return result[0]; // Return the first (and only) created document
};
/**
 * Retrieves completed orders with filtering and pagination
 */
const getCompletedOrders = async (filters, paginationOptions) => {
    const { searchTerm, tableId, paymentStatus, orderType, startDate, endDate } = filters, filterData = __rest(filters, ["searchTerm", "tableId", "paymentStatus", "orderType", "startDate", "endDate"]);
    const { page = 1, limit = 10 } = paginationOptions;
    const skip = (page - 1) * limit;
    const conditions = [];
    // Build search conditions
    if (searchTerm) {
        conditions.push({
            $or: [
                { orderId: { $regex: searchTerm, $options: 'i' } },
                { customerName: { $regex: searchTerm, $options: 'i' } },
            ],
        });
    }
    // Add filter conditions
    if (tableId)
        conditions.push({ tableId });
    if (paymentStatus)
        conditions.push({ paymentStatus });
    if (orderType)
        conditions.push({ orderType });
    // Add date range filter
    if (startDate && endDate) {
        conditions.push({
            completedAt: {
                $gte: startDate,
                $lte: endDate,
            },
        });
    }
    // Add additional filters
    if (Object.keys(filterData).length) {
        conditions.push({
            $and: Object.entries(filterData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    // Execute query with conditions
    const whereConditions = conditions.length > 0 ? { $and: conditions } : {};
    const result = await completedOrder_model_1.MCompletedOrder.find(whereConditions)
        .skip(skip)
        .limit(limit)
        .lean();
    const total = await completedOrder_model_1.MCompletedOrder.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
        data: result,
    };
};
/**
 * Calculates income report for a specific date range
 */
const getIncomeReport = async (startDate, endDate) => {
    var _a, _b, _c;
    const result = await completedOrder_model_1.MCompletedOrder.aggregate([
        {
            $match: {
                completedAt: { $gte: startDate, $lte: endDate },
                paymentStatus: 'paid',
            },
        },
        {
            $group: {
                _id: null,
                totalIncome: { $sum: '$totalAmount' },
                orderCount: { $sum: 1 },
                averageOrderValue: { $avg: '$totalAmount' },
            },
        },
    ]);
    return {
        totalIncome: ((_a = result[0]) === null || _a === void 0 ? void 0 : _a.totalIncome) || 0,
        orderCount: ((_b = result[0]) === null || _b === void 0 ? void 0 : _b.orderCount) || 0,
        averageOrderValue: ((_c = result[0]) === null || _c === void 0 ? void 0 : _c.averageOrderValue) || 0,
        period: { start: startDate, end: endDate },
    };
};
/**
 * Gets daily income report
 */
const getDailyIncome = async (date = new Date()) => {
    return getIncomeReport((0, date_fns_1.startOfDay)(date), (0, date_fns_1.endOfDay)(date));
};
/**
 * Gets weekly income report
 */
const getWeeklyIncome = async (date = new Date()) => {
    return getIncomeReport((0, date_fns_1.startOfWeek)(date), (0, date_fns_1.endOfWeek)(date));
};
/**
 * Gets monthly income report
 */
const getMonthlyIncome = async (date = new Date()) => {
    return getIncomeReport((0, date_fns_1.startOfMonth)(date), (0, date_fns_1.endOfMonth)(date));
};
/**
 * Gets yearly income report
 */
const getYearlyIncome = async (date = new Date()) => {
    return getIncomeReport((0, date_fns_1.startOfYear)(date), (0, date_fns_1.endOfYear)(date));
};
exports.CompletedOrderService = {
    moveToCompletedOrders,
    getCompletedOrders,
    getIncomeReport,
    getDailyIncome,
    getWeeklyIncome,
    getMonthlyIncome,
    getYearlyIncome,
};
