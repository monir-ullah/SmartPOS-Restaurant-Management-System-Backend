import { Types } from 'mongoose'
import { TFoodItem, TFoodItemFilters, TPaginationOptions } from './food.interface'
import { MFoodItem } from './food.model'
import { generateId } from '../../utilities/essentials'
import { NotFoundError } from '../../errors/notFoundError'
import { MCategory } from '../category/category.interface'



// Create food item
const createFoodItemIntoDB = async (payload: TFoodItem) => {

  // First Check if the category exists
  const isCategoryExists = await MCategory.findOne({ categoryId: payload.categoryId, isActive: true })

  if (!isCategoryExists) {
    throw new NotFoundError('Category not found. For that reason you cannot create food item.Please create a category first and try again.')
  }

  // In your createFoodItemIntoDB function
  const foodId = await generateId({
    model: MFoodItem,
    prefix: 'food',
    fieldName: 'foodId'
  })

  const result = await MFoodItem.create({ ...payload, foodId })
  return result
}

// Get all food items with filters and pagination
const getAllFoodItemsFromDB = async (
  filters: TFoodItemFilters,
  paginationOptions: TPaginationOptions,
) => {
  const { searchTerm, categoryId, minPrice, maxPrice, isAvailable } = filters
  const { page = 1, limit = 10 } = paginationOptions

  const skip = (page - 1) * limit
  const query: Record<string, any> = {}

  if (searchTerm) {
    query.name = { $regex: searchTerm, $options: 'i' }
  }

  if (categoryId) {
    query.categoryId = categoryId;
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    query.price = {}
    if (minPrice !== undefined) query.price.$gte = minPrice
    if (maxPrice !== undefined) query.price.$lte = maxPrice
  }

  if (isAvailable !== undefined) {
    query.isAvailable = isAvailable
  }

  const result = await MFoodItem.find(query)
    .skip(skip)
    .limit(limit)
    .lean()

  const total = await MFoodItem.countDocuments(query)

  return {
    meta: {
      page: page? page : 1,
      limit: limit? limit : 10,
      total,
      totalPages: (page && limit)? Math.ceil(total / limit) : 1,
    },
    data: result,
  }
}

// Get single food item
const getSingleFoodItemFromDB = async (id: string) => {
  const result = await MFoodItem.findById(id).populate('category').lean()
  return result
}

// Update food item
const updateFoodItemInDB = async (id: string, payload: Partial<TFoodItem>) => {
  
  // First Check if the category exists
  const isCategoryExists = await MCategory.findOne({ categoryId: payload.categoryId, isActive: true })

  if (!isCategoryExists) {
    throw new NotFoundError('Category not found. For that reason you cannot create food item.Please create a category first and try again.')
  }
  
  const result = await MFoodItem.findOneAndUpdate(
    { foodId: id }, 
    payload, 
    { new: true, runValidators: true }
  ).populate({
    path: 'categoryId',
    localField: 'categoryId',
    foreignField: 'categoryId',
    select: 'categoryId name description isActive'
  }).lean()
  return result
}

// Delete food item
const deleteFoodItemFromDB = async (id: string) => {
  const result = await MFoodItem.findOneAndUpdate({foodId: id, isActive: false})
    .populate('category')
    .lean()
  return result
}

export const FoodItemServices = {
  createFoodItemIntoDB,
  getAllFoodItemsFromDB,
  getSingleFoodItemFromDB,
  updateFoodItemInDB,
  deleteFoodItemFromDB,
}