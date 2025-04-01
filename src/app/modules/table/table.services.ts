import { generateId } from '../../utilities/essentials';
import { TTable, TTableFilters } from './table.interface';
import { MTableModel } from './table.model';


const createTable = async (payload: Partial<TTable>) => {
  const tableId = await generateId({
    model: MTableModel,
    prefix: 'table',
    fieldName: 'tableId'
  });
  const result = await MTableModel.create({ ...payload, tableId });
  return result;
};

const getAllTables = async (filters: TTableFilters) => {
  const { searchTerm, ...filterData } = filters;
  const conditions = [];

  if (searchTerm) {
    conditions.push({
      $or: [
        { tableId: { $regex: searchTerm, $options: 'i' } },
        { status: { $regex: searchTerm, $options: 'i' } },
      ],
    });
  }

  if (Object.keys(filterData).length) {
    conditions.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereConditions = conditions.length > 0 ? { $and: conditions } : {};
  const result = await MTableModel.find(whereConditions);
  return result;
};

const getSingleTable = async (tableId: string) => {
  const result = await MTableModel.findOne({ tableId });
  return result;
};

const updateTable = async (tableId: string, payload: Partial<TTable>) => {
  const result = await MTableModel.findOneAndUpdate({ tableId }, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteTable = async (tableId: string) => {
  const result = await MTableModel.findOneAndUpdate({ tableId,isOccupied: false });
  return result;
};

export const TableService = {
  createTable,
  getAllTables,
  getSingleTable,
  updateTable,
  deleteTable,
};