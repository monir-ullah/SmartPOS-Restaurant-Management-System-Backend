"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useZodSchema = void 0;
const zod_1 = require("zod");
// User zod Schema
exports.useZodSchema = zod_1.z.object({
    username: zod_1.z.string({
        required_error: 'username is required',
        invalid_type_error: 'username must be a string',
    }),
    password: zod_1.z.string({
        required_error: 'password is required',
        invalid_type_error: 'password must be a string',
    }),
    role: zod_1.z.enum(['admin', 'user']).default('admin'),
});
