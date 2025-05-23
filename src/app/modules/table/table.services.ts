import { generateId } from '../../utilities/essentials'
import { TPaginationOptions } from '../food/food.interface'
import { TTable, TTableFilters } from './table.interface'
import { MTableModel } from './table.model'

const createTable = async (payload: Partial<TTable>) => {
  const tableId = await generateId({
    model: MTableModel,
    prefix: 'table',
    fieldName: 'tableId',
  })
  const result = await MTableModel.create({ ...payload, tableId })
  return result
}

const getAllTables = async (
  filters: TTableFilters,
  paginationOptions: TPaginationOptions
) => {
  const { searchTerm, ...filterData } = filters || {}  // Add default empty object
  const { page = 1, limit = 10 } = paginationOptions || {} // Add default empty object
  const skip = (Number(page) - 1) * Number(limit)  // Convert to numbers
  const conditions = []

  if (searchTerm) {
    conditions.push({
      $or: [
        { tableId: { $regex: searchTerm, $options: 'i' } },
        { status: { $regex: searchTerm, $options: 'i' } },
      ],
    })
  }

  if (Object.keys(filterData).length) {
    conditions.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const whereConditions = conditions.length > 0 ? { $and: conditions } : {}
  const result = await MTableModel.find(whereConditions)
    .skip(skip)
    .limit(Number(limit))  // Convert limit to number
    .lean()

  const total = await MTableModel.countDocuments(whereConditions)

  return {
    meta: {
      page: Number(page),  // Convert to number
      limit: Number(limit),  // Convert to number
      total,
      totalPages: Math.ceil(total / Number(limit))  // Convert limit to number
    },
    data: result,
  }
}

const getSingleTable = async (tableId: string) => {
  const result = await MTableModel.findOne({ tableId })
  return result
}

const updateTable = async (tableId: string, payload: Partial<TTable>) => {
  const result = await MTableModel.findOneAndUpdate({ tableId }, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteTable = async (tableId: string) => {
  const result = await MTableModel.findOneAndUpdate(
    { tableId },
    { 
      isAvailable: false,
    },
    { new: true }
  )
  return result
}

export const TableService = {
  createTable,
  getAllTables,
  getSingleTable,
  updateTable,
  deleteTable,
}
