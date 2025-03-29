import { TPaginationOptions } from '../../utilities/sendResponse'
import { MCategory, TCategory } from './category.interface'

// Generate next category ID
const generateNextCategoryId = async (): Promise<string> => {
  const lastCategory = await MCategory.findOne({}, { categoryId: 1 })
    .sort({ categoryId: -1 })
    .lean()

  if (!lastCategory) {
    return 'cat-001'
  }

  const lastId = parseInt(lastCategory.categoryId.split('-')[1])
  const nextId = lastId + 1

  let categoryNumberId: string
  if (nextId >= 100) {
    categoryNumberId = nextId.toString()
  } else if (nextId >= 10) {
    categoryNumberId = '0' + nextId
  } else {
    categoryNumberId = '00' + nextId
  }

  return `cat-${categoryNumberId}`
}
// Create category in database
const createCategoryIntoDB = async (categoryData: TCategory) => {
  const categoryId = await generateNextCategoryId()
  const result = await MCategory.create({ ...categoryData, categoryId })
  return result
}

// Get all categories from database
const getAllCategoriesFromDB = async (options: TPaginationOptions) => {
  // Convert page and limit to numbers with defaults
  const page = Number(options?.page) || 1
  const limit = Number(options?.limit) || 10
  const skip = (page - 1) * limit

  // Create sort condition
  const sortCondition: { [key: string]: 'asc' | 'desc' } = {}
  const sortBy = options?.sortBy || 'createdAt'
  const sortOrder = options?.sortOrder || 'desc'
  sortCondition[sortBy] = sortOrder

  // Get paginated data
  const result = await MCategory.find({ isActive: true })
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
    .lean()

  // Get total count for pagination
  const total = await MCategory.countDocuments({ isActive: true })
  const totalPage = Math.ceil(total / limit)

  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    data: result,
  }
}

// Get single category from database
const getSingleCategoryFromDB = async (id: string) => {
  const result = await MCategory.findOne({ categoryId: id, isActive: true })
  return result
}

// Update category in database
const updateCategoryInDB = async (id: string, payload: Partial<TCategory>) => {
  const result = await MCategory.findOneAndUpdate(
    { categoryId: id, isActive: true },
    payload,
    { new: true }
  )
  return result
}

// Delete category from database
const deleteCategoryFromDB = async (id: string) => {
  const result = await MCategory.findOneAndUpdate(
    { categoryId: id, isActive: true },
    { isActive: false },
    { new: true }
  )
  return result
}

// exporting functions
export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
  getSingleCategoryFromDB,
  updateCategoryInDB,
  deleteCategoryFromDB,
}
