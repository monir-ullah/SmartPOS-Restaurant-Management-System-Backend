"use strict";
/**
 * Order Service Module
 * Handles all business logic related to restaurant orders including creation,
 * retrieval, status updates, and deletion.
 */
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const essentials_1 = require("../../utilities/essentials");
const order_model_1 = require("./order.model");
const food_model_1 = require("../food/food.model");
const notFoundError_1 = require("../../errors/notFoundError");
const table_model_1 = require("../table/table.model");
const completedOrder_services_1 = require("../completedOrder/completedOrder.services");
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * Creates a new order in the system
 * @param payload - Partial order data containing table, customer, and items information
 * @throws NotFoundError if table is not available or food items are not found
 * @throws Error if order contains no items
 * @returns Created order document
 */
const createOrder = async (payload) => {
    // Validate table availability
    if (!payload.tableId) {
        throw new notFoundError_1.NotFoundError('Please Select a table is not found.');
    }
    const isTableExist = await table_model_1.MTableModel.findOne({
        tableId: payload.tableId,
    });
    if (!isTableExist) {
        throw new notFoundError_1.NotFoundError('Table is not found.');
    }
    // Validate and process order items
    if (payload.items && payload.items.length > 0) {
        for (const item of payload.items) {
            const foodItem = await food_model_1.MFoodItem.findOne({
                foodId: item.foodId,
                name: item.name,
                isAvailable: true,
            }).lean();
            if (!foodItem) {
                throw new notFoundError_1.NotFoundError(`Food item with ID ${item.foodId} not found or not available`);
            }
            // Update item details from database to ensure accuracy
            item.price = foodItem.price;
            item.name = foodItem.name;
        }
    }
    else {
        throw new Error('Order must contain at least one food item');
    }
    // Generate unique order ID
    const orderId = await (0, essentials_1.generateId)({
        model: order_model_1.MOrderModel,
        prefix: 'order',
        fieldName: 'orderId',
    });
    // Calculate total order amount
    const totalAmount = payload.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    // Create and return the new order
    const result = await order_model_1.MOrderModel.create(Object.assign(Object.assign({}, payload), { orderId,
        totalAmount }));
    return result;
};
/**
 * Retrieves orders based on filters and pagination options
 * @param filters - Search and filter criteria for orders
 * @param paginationOptions - Page number and limit for pagination
 * @returns Paginated list of orders with metadata
 */
const getAllOrders = async (filters, paginationOptions) => {
    const { searchTerm, tableId, status, paymentStatus, orderType, startDate, endDate } = filters, filterData = __rest(filters, ["searchTerm", "tableId", "status", "paymentStatus", "orderType", "startDate", "endDate"]);
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
    if (status)
        conditions.push({ status });
    if (paymentStatus)
        conditions.push({ paymentStatus });
    if (orderType)
        conditions.push({ orderType });
    // Add date range filter
    if (startDate && endDate) {
        conditions.push({
            createdAt: {
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
    const result = await order_model_1.MOrderModel.find(whereConditions)
        .populate('items.foodId')
        .skip(skip)
        .limit(limit)
        .lean();
    const total = await order_model_1.MOrderModel.countDocuments(whereConditions);
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
 * Retrieves a single order by its ID
 * @param orderId - Unique identifier of the order
 * @returns Order document with populated food items
 */
const getSingleOrder = async (orderId) => {
    const result = await order_model_1.MOrderModel.findOne({ orderId }).populate('items.foodId');
    return result;
};
/**
 * Updates the status of an order
 * @param orderId - Unique identifier of the order
 * @param status - New status to be set
 * @returns Updated order document
 */
const updateOrderStatus = async (orderId, status) => {
    // Validate current status and allowed transitions
    const order = await order_model_1.MOrderModel.findOne({ orderId }).lean();
    if (!order) {
        throw new notFoundError_1.NotFoundError('Order not found');
    }
    const statusFlow = {
        pending: ['cooking', 'cancelled'],
        cooking: ['ready', 'cancelled'],
        ready: ['served', 'cancelled'],
        served: ['pay', 'completed'],
        pay: ['completed'],
        completed: [],
        cancelled: [],
    };
    // Check if the status transition is allowed
    // @ts-ignore
    if (!statusFlow[order.status].includes(status)) {
        throw new Error(`Invalid status transition from ${order.status} to ${status}. Allowed transitions: ${statusFlow[order.status].join(', ')}`);
    }
    // If status is completed, move to completed orders and delete from orders
    if (status === 'completed') {
        const session = await mongoose_1.default.startSession();
        try {
            await session.startTransaction();
            // Get the full order data with populated fields
            const fullOrder = await order_model_1.MOrderModel.findOne({ orderId }).lean();
            if (!fullOrder) {
                throw new notFoundError_1.NotFoundError('Order not found');
            }
            // Ensure all required fields are present with proper validation
            const completedOrder = {
                orderId: fullOrder.orderId,
                tableId: fullOrder.tableId,
                customerName: fullOrder.customerName,
                items: fullOrder.items,
                totalAmount: fullOrder.totalAmount,
                status: 'completed',
                paymentStatus: fullOrder.paymentStatus || 'paid',
                orderType: fullOrder.orderType || 'dine-in',
                completedAt: new Date(),
            };
            // Move to completed orders with session
            const result = await completedOrder_services_1.CompletedOrderService.moveToCompletedOrders(completedOrder, session);
            // Delete from orders collection
            await order_model_1.MOrderModel.findOneAndDelete({ orderId }).session(session);
            await session.commitTransaction();
            return result;
        }
        catch (error) {
            await session.abortTransaction();
            throw error;
        }
        finally {
            session.endSession();
        }
    }
    // For other status updates
    const result = await order_model_1.MOrderModel.findOneAndUpdate({ orderId }, { status }, {
        new: true,
        runValidators: true,
    });
    return result;
};
/**
 * Updates the payment status of an order
 * @param orderId - Unique identifier of the order
 * @param paymentStatus - New payment status to be set
 * @returns Updated order document
 */
const updatePaymentStatus = async (orderId, paymentStatus) => {
    const result = await order_model_1.MOrderModel.findOneAndUpdate({ orderId }, { paymentStatus }, {
        new: true,
        runValidators: true,
    });
    return result;
};
/**
 * Deletes an order from the system
 * @param orderId - Unique identifier of the order to be deleted
 * @returns Deleted order document
 */
const deleteOrder = async (orderId) => {
    const result = await order_model_1.MOrderModel.findOneAndDelete({ orderId });
    return result;
};
exports.OrderService = {
    createOrder,
    getAllOrders,
    getSingleOrder,
    updateOrderStatus,
    updatePaymentStatus,
    deleteOrder,
};
