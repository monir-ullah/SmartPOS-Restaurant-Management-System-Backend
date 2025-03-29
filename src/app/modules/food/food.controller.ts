import httpStatus from 'http-status'
import { catchAsyncFunc } from '../../utilities/catchAsyncFunc'
import sendResponse from '../../utilities/sendResponse'
import { FoodItemServices } from './food.services'

// Create food item function
const createFoodItem = catchAsyncFunc(async (req, res) => {
  const foodItemData = req.body
  const result = await FoodItemServices.createFoodItemIntoDB(foodItemData)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Food item created successfully',
    data: result,
  })
})

// Get all food items function
const getAllFoodItems = catchAsyncFunc(async (req, res) => {
  const { page, limit, searchTerm, category, minPrice, maxPrice, isAvailable } = req.query

  const filters = {
    searchTerm: searchTerm as string,
    category: category as string,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    isAvailable: isAvailable ? isAvailable === 'true' : undefined,
  }

  const result = await FoodItemServices.getAllFoodItemsFromDB(
    filters,
    {
      page: Number(page),
      limit: Number(limit),
    },
  )

  if (!result.data || result.data.length === 0) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No food items found',
      data: null,
    })
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Food items retrieved successfully',
    data: result.data,
    meta: result.meta ,
  })

  
})

// Get single food item function
const getSingleFoodItem = catchAsyncFunc(async (req, res) => {
  const { id } = req.params
  const result = await FoodItemServices.getSingleFoodItemFromDB(id)

  if (!result) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'Food item not found',
      data: null,
    })
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Food item retrieved successfully',
    data: result,
  })
})

// Update food item function
const updateFoodItem = catchAsyncFunc(async (req, res) => {
  const { id } = req.params
  const updateData = req.body
  const result = await FoodItemServices.updateFoodItemInDB(id, updateData)

  if (!result) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'Food item not found',
      data: null,
    })
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Food item updated successfully',
    data: result,
  })
})

// Delete food item function
const deleteFoodItem = catchAsyncFunc(async (req, res) => {
  const { id } = req.params
  const result = await FoodItemServices.deleteFoodItemFromDB(id)

  if (!result) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'Food item not found',
      data: null,
    })
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Food item deleted successfully',
    data: result,
  })
})

// exporting functions
export const FoodItemController = {
  createFoodItem,
  getAllFoodItems,
  getSingleFoodItem,
  updateFoodItem,
  deleteFoodItem,
}