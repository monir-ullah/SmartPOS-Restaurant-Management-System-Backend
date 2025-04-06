"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableValidation = void 0;
const zod_1 = require("zod");
const createTableValidationSchema = zod_1.z.object({
    tableNumber: zod_1.z.number({
        required_error: 'Table number is required',
    }),
    seatCapacity: zod_1.z.number({
        required_error: 'Seat capacity is required',
    }),
    status: zod_1.z
        .enum(['available', 'occupied', 'reserved', 'maintenance'])
        .optional(),
});
const updateTableValidationSchema = zod_1.z.object({
    tableNumber: zod_1.z.number().optional(),
    seatCapacity: zod_1.z.number().optional(),
    isOccupied: zod_1.z.boolean().optional(),
    status: zod_1.z
        .enum(['available', 'occupied', 'reserved', 'maintenance'])
        .optional(),
});
exports.TableValidation = {
    createTableValidationSchema,
    updateTableValidationSchema,
};
