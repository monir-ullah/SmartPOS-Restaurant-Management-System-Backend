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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodItemServices = void 0;
const food_model_1 = require("./food.model");
const essentials_1 = require("../../utilities/essentials");
const notFoundError_1 = require("../../errors/notFoundError");
const category_interface_1 = require("../category/category.interface");
// Create food item
const createFoodItemIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // First Check if the category exists
    const isCategoryExists = yield category_interface_1.MCategory.findOne({
        categoryId: payload.categoryId,
        isActive: true,
    });
    if (!isCategoryExists) {
        throw new notFoundError_1.NotFoundError('Category not found. For that reason you cannot create food item.Please create a category first and try again.');
    }
    // In your createFoodItemIntoDB function
    const foodId = yield (0, essentials_1.generateId)({
        model: food_model_1.MFoodItem,
        prefix: 'food',
        fieldName: 'foodId',
    });
    const result = yield food_model_1.MFoodItem.create(Object.assign(Object.assign({}, payload), { foodId }));
    return result;
});
// Get all food items with filters and pagination
const getAllFoodItemsFromDB = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, categoryId, minPrice, maxPrice, isAvailable } = filters;
    const { page = 1, limit = 10 } = paginationOptions;
    const skip = (page - 1) * limit;
    const query = {};
    if (searchTerm) {
        query.name = { $regex: searchTerm, $options: 'i' };
    }
    if (categoryId) {
        query.categoryId = categoryId;
    }
    if (minPrice !== undefined || maxPrice !== undefined) {
        query.price = {};
        if (minPrice !== undefined)
            query.price.$gte = minPrice;
        if (maxPrice !== undefined)
            query.price.$lte = maxPrice;
    }
    if (isAvailable !== undefined) {
        query.isAvailable = isAvailable;
    }
    const result = yield food_model_1.MFoodItem.find(query).skip(skip).limit(limit).lean();
    const total = yield food_model_1.MFoodItem.countDocuments(query);
    return {
        meta: {
            page: page ? page : 1,
            limit: limit ? limit : 10,
            total,
            totalPages: page && limit ? Math.ceil(total / limit) : 1,
        },
        data: result,
    };
});
// Get single food item
const getSingleFoodItemFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield food_model_1.MFoodItem.findById(id).populate('category').lean();
    return result;
});
// Update food item
const updateFoodItemInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // First Check if the category exists
    const isCategoryExists = yield category_interface_1.MCategory.findOne({
        categoryId: payload.categoryId,
        isActive: true,
    });
    if (!isCategoryExists) {
        throw new notFoundError_1.NotFoundError('Category not found. For that reason you cannot create food item.Please create a category first and try again.');
    }
    const result = yield food_model_1.MFoodItem.findOneAndUpdate({ foodId: id }, payload, {
        new: true,
        runValidators: true,
    })
        .populate({
        path: 'categoryId',
        localField: 'categoryId',
        foreignField: 'categoryId',
        select: 'categoryId name description isActive',
    })
        .lean();
    return result;
});
// Delete food item
const deleteFoodItemFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield food_model_1.MFoodItem.findOneAndUpdate({
        foodId: id,
        isActive: false,
    })
        .populate('category')
        .lean();
    return result;
});
exports.FoodItemServices = {
    createFoodItemIntoDB,
    getAllFoodItemsFromDB,
    getSingleFoodItemFromDB,
    updateFoodItemInDB,
    deleteFoodItemFromDB,
};
