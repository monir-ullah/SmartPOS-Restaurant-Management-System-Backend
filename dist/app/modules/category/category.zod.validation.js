"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryParamsZodSchema = exports.updateCategoryZodSchema = exports.categoryZodSchema = void 0;
const zod_1 = require("zod");
// Category zod Schema for create and update
exports.categoryZodSchema = zod_1.z.object({
    categoryId: zod_1.z
        .string({
        invalid_type_error: 'categoryId must be a string',
    })
        .regex(/^cat-\d+$/, 'categoryId must be in the format cat-XXXX where X is a number')
        .optional(),
    name: zod_1.z.string({
        required_error: 'name is required',
        invalid_type_error: 'name must be a string',
    }),
    description: zod_1.z
        .string({
        invalid_type_error: 'description must be a string',
    })
        .optional(),
    isActive: zod_1.z.boolean().default(true),
});
// Category zod Schema for  update
exports.updateCategoryZodSchema = zod_1.z.object({
    name: zod_1.z
        .string({
        required_error: 'name is required',
        invalid_type_error: 'name must be a string',
    })
        .optional(),
    description: zod_1.z
        .string({
        invalid_type_error: 'description must be a string',
    })
        .optional(),
    isActive: zod_1.z.boolean().optional(),
});
// Category params validation schema for GET, DELETE, and PATCH operations
exports.categoryParamsZodSchema = zod_1.z.object({
    id: zod_1.z
        .string({
        required_error: 'Category id is required',
        invalid_type_error: 'Category id must be a string',
    })
        .regex(/^cat-\d+$/, 'Category id must be in the format cat-XXXX where X is a number'),
});
