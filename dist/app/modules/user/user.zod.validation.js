"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userZodSchema = void 0;
const zod_1 = require("zod");
// User zod Schema
exports.userZodSchema = zod_1.z.object({
    username: zod_1.z.string({
        required_error: 'username is required',
        invalid_type_error: 'username must be a string',
    }),
    password: zod_1.z.string({
        required_error: 'password is required',
        invalid_type_error: 'password must be a string',
    }),
    role: zod_1.z
        .enum(['owner', 'manager', 'waiter', 'cashier', 'chef', 'administrator'])
        .default('administrator'),
});
