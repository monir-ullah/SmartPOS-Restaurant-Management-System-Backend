"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodItemValidation = void 0;
const zod_1 = require("zod");
const createFoodItemValidationSchema = zod_1.z.object({
    name: zod_1.z.string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be a string',
    }),
    price: zod_1.z.number({
        required_error: 'Price is required',
        invalid_type_error: 'Price must be a number',
    }),
    description: zod_1.z.string({
        required_error: 'Description is required',
        invalid_type_error: 'Description must be a string',
    }),
    categoryId: zod_1.z.string({
        required_error: 'Category ID is required',
        invalid_type_error: 'Category ID must be a string',
    }),
    imageUrl: zod_1.z.string({
        required_error: 'Image URL is required',
        invalid_type_error: 'Image URL must be a string',
    }),
    isAvailable: zod_1.z.boolean().default(true),
});
const updateFoodItemValidationSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    price: zod_1.z.number().optional(),
    description: zod_1.z.string().optional(),
    category: zod_1.z.string().optional(),
    imageUrl: zod_1.z.string().optional(),
    isAvailable: zod_1.z.boolean().optional(),
});
exports.FoodItemValidation = {
    createFoodItemValidationSchema,
    updateFoodItemValidationSchema,
};
