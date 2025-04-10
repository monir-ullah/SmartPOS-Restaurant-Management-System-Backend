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
const notFoundError_1 = require("../../errors/notFoundError");
/**
 * Moves a completed order from the order collection to completed orders
 */
const moveToCompletedOrders = (order, session) => __awaiter(void 0, void 0, void 0, function* () {
    // Pass the order as an array when using session
    const result = yield completedOrder_model_1.MCompletedOrder.create([order], { session });
    return result[0]; // Return the first (and only) created document
});
/**
 * Retrieves completed orders with filtering and pagination
 */
const getCompletedOrders = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
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
    const result = yield completedOrder_model_1.MCompletedOrder.find(whereConditions)
        .skip(skip)
        .limit(limit)
        .lean();
    if (result.length === 0) {
        throw new notFoundError_1.NotFoundError('Completed orders not found');
    }
    const total = yield completedOrder_model_1.MCompletedOrder.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
        data: result,
    };
});
/**
 * Calculates income report for a specific date range
 */
const getIncomeReport = (startDate, endDate) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const result = yield completedOrder_model_1.MCompletedOrder.aggregate([
        {
            $match: {
                completedAt: {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate),
                },
                paymentStatus: 'paid',
            },
        },
        {
            $facet: {
                summary: [
                    {
                        $group: {
                            _id: null,
                            totalIncome: {
                                $sum: { $toDouble: '$totalAmount' },
                            },
                            orderCount: { $sum: 1 },
                            averageOrderValue: {
                                $avg: { $toDouble: '$totalAmount' },
                            },
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            totalIncome: { $round: ['$totalIncome', 2] },
                            orderCount: 1,
                            averageOrderValue: { $round: ['$averageOrderValue', 2] },
                        },
                    },
                ],
                orders: [
                    {
                        $project: {
                            _id: 0,
                            orderId: 1,
                            customerName: 1,
                            items: 1,
                            totalAmount: 1,
                            orderType: 1,
                            completedAt: 1,
                        },
                    },
                    { $sort: { completedAt: -1 } },
                ],
            },
        },
    ]);
    // Return default values if no results
    const summary = ((_a = result[0]) === null || _a === void 0 ? void 0 : _a.summary[0]) || {
        totalIncome: 0,
        orderCount: 0,
        averageOrderValue: 0,
    };
    return Object.assign(Object.assign({}, summary), { orders: ((_b = result[0]) === null || _b === void 0 ? void 0 : _b.orders) || [], period: { start: startDate, end: endDate } });
});
/**
 * Gets daily income report
 */
const getDailyIncome = (date = new Date()) => __awaiter(void 0, void 0, void 0, function* () {
    return getIncomeReport((0, date_fns_1.startOfDay)(date), (0, date_fns_1.endOfDay)(date));
});
/**
 * Gets weekly income report
 */
const getWeeklyIncome = (date = new Date()) => __awaiter(void 0, void 0, void 0, function* () {
    return getIncomeReport((0, date_fns_1.startOfWeek)(date), (0, date_fns_1.endOfWeek)(date));
});
/**
 * Gets monthly income report
 */
const getMonthlyIncome = (date = new Date()) => __awaiter(void 0, void 0, void 0, function* () {
    return getIncomeReport((0, date_fns_1.startOfMonth)(date), (0, date_fns_1.endOfMonth)(date));
});
/**
 * Gets yearly income report
 */
const getYearlyIncome = (date = new Date()) => __awaiter(void 0, void 0, void 0, function* () {
    return getIncomeReport((0, date_fns_1.startOfYear)(date), (0, date_fns_1.endOfYear)(date));
});
exports.CompletedOrderService = {
    moveToCompletedOrders,
    getCompletedOrders,
    getIncomeReport,
    getDailyIncome,
    getWeeklyIncome,
    getMonthlyIncome,
    getYearlyIncome,
};
