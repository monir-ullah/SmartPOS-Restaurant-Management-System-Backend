"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryServices = void 0;
const essentials_1 = require("../../utilities/essentials");
const category_interface_1 = require("./category.interface");
// Generate next category ID
const generateNextCategoryId = async () => {
    const lastCategory = await category_interface_1.MCategory.findOne({}, { categoryId: 1 })
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
};
// Create category in database
const createCategoryIntoDB = async (categoryData) => {
    const categoryId = await (0, essentials_1.generateId)({
        model: category_interface_1.MCategory,
        prefix: 'cat',
        fieldName: 'categoryId',
    });
    const result = await category_interface_1.MCategory.create(Object.assign(Object.assign({}, categoryData), { categoryId }));
    return result;
};
// Get all categories from database
const getAllCategoriesFromDB = async (options) => {
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
    const result = await category_interface_1.MCategory.find({ isActive: true })
        .sort(sortCondition)
        .skip(skip)
        .limit(limit)
        .lean();
    // Get total count for pagination
    const total = await category_interface_1.MCategory.countDocuments({ isActive: true });
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
};
// Get single category from database
const getSingleCategoryFromDB = async (id) => {
    const result = await category_interface_1.MCategory.findOne({ categoryId: id, isActive: true });
    return result;
};
// Update category in database
const updateCategoryInDB = async (id, payload) => {
    const result = await category_interface_1.MCategory.findOneAndUpdate({ categoryId: id, isActive: true }, payload, { new: true });
    return result;
};
// Delete category from database
const deleteCategoryFromDB = async (id) => {
    const result = await category_interface_1.MCategory.findOneAndUpdate({ categoryId: id, isActive: true }, { isActive: false }, { new: true });
    return result;
};
// exporting functions
exports.CategoryServices = {
    createCategoryIntoDB,
    getAllCategoriesFromDB,
    getSingleCategoryFromDB,
    updateCategoryInDB,
    deleteCategoryFromDB,
};
