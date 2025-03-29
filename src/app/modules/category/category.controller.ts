import httpStatus from 'http-status'
import { catchAsyncFunc } from '../../utilities/catchAsyncFunc'
import sendResponse from '../../utilities/sendResponse'
import { CategoryServices } from './category.services'

// Create category function
const createCategory = catchAsyncFunc(async (req, res) => {
  const categoryData = req.body
  const result = await CategoryServices.createCategoryIntoDB(categoryData)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Category created successfully',
    data: result,
  })
})

// Get all categories function
const getAllCategories = catchAsyncFunc(async (req, res) => {
  const { page, limit } = req.query
  const result = await CategoryServices.getAllCategoriesFromDB({
    page: Number(page),
    limit: Number(limit),
  })

  if (!result.data || result.data.length === 0) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No categories found',
      data: null,
    })
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Categories retrieved successfully',
    data: result.data,
    meta: result.meta,
  })
})

// Get single category function
const getSingleCategory = catchAsyncFunc(async (req, res) => {
  const { id } = req.params
  const result = await CategoryServices.getSingleCategoryFromDB(id)

  if (!result) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'Category not found',
      data: null,
    })
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category retrieved successfully',
    data: result,
  })
})

// Update category function
const updateCategory = catchAsyncFunc(async (req, res) => {
  const { id } = req.params
  const updateData = req.body
  const result = await CategoryServices.updateCategoryInDB(id, updateData)

  if (!result) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'Category not found',
      data: null,
    })
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category updated successfully',
    data: result,
  })
})

// Delete category function
const deleteCategory = catchAsyncFunc(async (req, res) => {
  const { id } = req.params
  const result = await CategoryServices.deleteCategoryFromDB(id)

  if (!result) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'Category not found',
      data: null,
    })
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category deleted successfully',
    data: result,
  })
})

// exporting functions
export const CategoryController = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
}
