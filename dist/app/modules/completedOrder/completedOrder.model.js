"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MCompletedOrder = void 0;
const mongoose_1 = require("mongoose");
const completedOrderSchema = new mongoose_1.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true,
    },
    tableId: {
        type: String,
        required: true,
    },
    customerName: {
        type: String,
        required: true,
    },
    items: [
        {
            foodId: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
            price: {
                type: Number,
                required: true,
                min: 0,
            },
            specialInstructions: String,
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
        min: 0,
    },
    orderType: {
        type: String,
        enum: ['dine-in', 'takeaway'],
        required: true,
    },
    completedAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    paymentStatus: {
        type: String,
        enum: ['unpaid', 'paid'],
        required: true,
    },
}, {
    timestamps: true,
});
// Create indexes for efficient querying
completedOrderSchema.index({ orderId: 1 });
completedOrderSchema.index({ completedAt: -1 });
completedOrderSchema.index({ tableId: 1, completedAt: -1 });
exports.MCompletedOrder = (0, mongoose_1.model)('CompletedOrder', completedOrderSchema);
