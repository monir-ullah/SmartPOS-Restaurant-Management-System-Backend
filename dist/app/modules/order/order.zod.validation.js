"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidation = void 0;
const zod_1 = require("zod");
const createOrderItemZodSchema = zod_1.z.object({
    foodId: zod_1.z.string(),
    name: zod_1.z.string(),
    quantity: zod_1.z.number().min(1),
    price: zod_1.z.number().min(0),
    specialInstructions: zod_1.z.string().optional(),
});
const createOrderZodSchema = zod_1.z.object({
    tableId: zod_1.z.string(),
    customerName: zod_1.z.string(),
    items: zod_1.z.array(createOrderItemZodSchema).min(1),
    orderType: zod_1.z.enum(['dine-in', 'takeaway']),
});
const updateOrderStatusZodSchema = zod_1.z.object({
    status: zod_1.z.enum([
        'pending',
        'cooking',
        'ready',
        'served',
        'pay',
        'completed',
        'cancelled',
    ]),
});
const updatePaymentStatusZodSchema = zod_1.z.object({
    paymentStatus: zod_1.z.enum(['unpaid', 'paid']),
});
exports.OrderValidation = {
    createOrderZodSchema,
    updateOrderStatusZodSchema,
    updatePaymentStatusZodSchema,
};
