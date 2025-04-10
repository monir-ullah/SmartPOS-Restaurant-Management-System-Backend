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
exports.CategoryServices = void 0;
const essentials_1 = require("../../utilities/essentials");
const category_interface_1 = require("./category.interface");
// Generate next category ID
const generateNextCategoryId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastCategory = yield category_interface_1.MCategory.findOne({}, { categoryId: 1 })
        .sort({ categoryId: -1 })
        .lean();
    if (!lastCategory) {
        return 'cat-001';
    }
    const lastId = parseInt(lastCategory.categoryId.split('-')[1]);
    const nextId = lastId + 1;
    let categoryNumberId;
    if (nextId >= 100) {
        categoryNumberId = nextId.toString();
    }
    else if (nextId >= 10) {
        categoryNumberId = '0' + nextId;
    }
    else {
        categoryNumberId = '00' + nextId;
    }
    return `cat-${categoryNumberId}`;
});
// Create category in database
const createCategoryIntoDB = (categoryData) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryId = yield (0, essentials_1.generateId)({
        model: category_interface_1.MCategory,
        prefix: 'cat',
        fieldName: 'categoryId',
    });
    const result = yield category_interface_1.MCategory.create(Object.assign(Object.assign({}, categoryData), { categoryId }));
    return result;
});
// Get all categories from database
const getAllCategoriesFromDB = (options) => __awaiter(void 0, void 0, void 0, function* () {
    // Convert page and limit to numbers with defaults
    const page = Number(options === null || options === void 0 ? void 0 : options.page) || 1;
    const limit = Number(options === null || options === void 0 ? void 0 : options.limit) || 10;
    const skip = (page - 1) * limit;
    // Create sort condition
    const sortCondition = {};
    const sortBy = (options === null || options === void 0 ? void 0 : options.sortBy) || 'createdAt';
    const sortOrder = (options === null || options === void 0 ? void 0 : options.sortOrder) || 'desc';
    sortCondition[sortBy] = sortOrder;
    // Get paginated data
    const result = yield category_interface_1.MCategory.find({ isActive: true })
        .sort(sortCondition)
        .skip(skip)
        .limit(limit)
        .lean();
    // Get total count for pagination
    const total = yield category_interface_1.MCategory.countDocuments({ isActive: true });
    const totalPages = Math.ceil(total / limit);
    return {
        meta: {
            page,
            limit,
            total,
            totalPages,
        },
        data: result,
    };
});
// Get single category from database
const getSingleCategoryFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_interface_1.MCategory.findOne({ categoryId: id, isActive: true });
    return result;
});
// Update category in database
const updateCategoryInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_interface_1.MCategory.findOneAndUpdate({ categoryId: id, isActive: true }, payload, { new: true });
    return result;
});
// Delete category from database
const deleteCategoryFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_interface_1.MCategory.findOneAndUpdate({ categoryId: id, isActive: true }, { isActive: false }, { new: true });
    return result;
});
// exporting functions
exports.CategoryServices = {
    createCategoryIntoDB,
    getAllCategoriesFromDB,
    getSingleCategoryFromDB,
    updateCategoryInDB,
    deleteCategoryFromDB,
};
