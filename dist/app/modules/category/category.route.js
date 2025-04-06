"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoute = void 0;
const express_1 = require("express");
const category_controller_1 = require("./category.controller");
const validateZodRequest_1 = require("../../middlewares/validateZodRequest");
const category_zod_validation_1 = require("./category.zod.validation");
const router = (0, express_1.Router)();
// Route to create a new category
router.post('/category/create', (0, validateZodRequest_1.validateZodRequest)(category_zod_validation_1.categoryZodSchema), category_controller_1.CategoryController.createCategory);
// Route to get all categories
router.get('/category', category_controller_1.CategoryController.getAllCategories);
// Route to get a single category by ID
router.get('/category/:id', category_controller_1.CategoryController.getSingleCategory);
// Route to update a category by ID
router.patch('/category/:id', (0, validateZodRequest_1.validateZodRequest)(category_zod_validation_1.updateCategoryZodSchema), category_controller_1.CategoryController.updateCategory);
// Route to delete a category by ID
router.delete('/category/:id', category_controller_1.CategoryController.deleteCategory);
exports.categoryRoute = router;
