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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodItemController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsyncFunc_1 = require("../../utilities/catchAsyncFunc");
const sendResponse_1 = __importDefault(require("../../utilities/sendResponse"));
const food_services_1 = require("./food.services");
// Create food item function
const createFoodItem = (0, catchAsyncFunc_1.catchAsyncFunc)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foodItemData = req.body;
    const result = yield food_services_1.FoodItemServices.createFoodItemIntoDB(foodItemData);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Food item created successfully',
        data: result,
    });
}));
// Get all food items function
const getAllFoodItems = (0, catchAsyncFunc_1.catchAsyncFunc)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, searchTerm, category, minPrice, maxPrice, isAvailable } = req.query;
    const filters = {
        searchTerm: searchTerm,
        category: category,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        isAvailable: isAvailable ? isAvailable === 'true' : undefined,
    };
    const result = yield food_services_1.FoodItemServices.getAllFoodItemsFromDB(filters, {
        page: Number(page),
        limit: Number(limit),
    });
    if (!result.data || result.data.length === 0) {
        return (0, sendResponse_1.default)(res, {
            success: false,
            statusCode: http_status_1.default.NOT_FOUND,
            message: 'No food items found',
            data: null,
        });
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Food items retrieved successfully',
        data: result.data,
        meta: result.meta,
    });
}));
// Get single food item function
const getSingleFoodItem = (0, catchAsyncFunc_1.catchAsyncFunc)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield food_services_1.FoodItemServices.getSingleFoodItemFromDB(id);
    if (!result) {
        return (0, sendResponse_1.default)(res, {
            success: false,
            statusCode: http_status_1.default.NOT_FOUND,
            message: 'Food item not found',
            data: null,
        });
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Food item retrieved successfully',
        data: result,
    });
}));
// Update food item function
const updateFoodItem = (0, catchAsyncFunc_1.catchAsyncFunc)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updateData = req.body;
    const result = yield food_services_1.FoodItemServices.updateFoodItemInDB(id, updateData);
    if (!result) {
        return (0, sendResponse_1.default)(res, {
            success: false,
            statusCode: http_status_1.default.NOT_FOUND,
            message: 'Food item not found',
            data: null,
        });
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Food item updated successfully',
        data: result,
    });
}));
// Delete food item function
const deleteFoodItem = (0, catchAsyncFunc_1.catchAsyncFunc)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield food_services_1.FoodItemServices.deleteFoodItemFromDB(id);
    if (!result) {
        return (0, sendResponse_1.default)(res, {
            success: false,
            statusCode: http_status_1.default.NOT_FOUND,
            message: 'Food item not found',
            data: null,
        });
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Food item deleted successfully',
        data: result,
    });
}));
// exporting functions
exports.FoodItemController = {
    createFoodItem,
    getAllFoodItems,
    getSingleFoodItem,
    updateFoodItem,
    deleteFoodItem,
};
