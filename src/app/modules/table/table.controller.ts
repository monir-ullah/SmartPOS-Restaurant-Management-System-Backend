import { Request, Response } from 'express'
import { TableService } from './table.services'
import { TTableFilters } from './table.interface'

const createTable = async (req: Request, res: Response) => {
  try {
    const result = await TableService.createTable(req.body)
    res.status(201).json({
      success: true,
      message: 'Table created successfully',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create table',
      data: error,
    })
  }
}

const getAllTables = async (req: Request, res: Response) => {
  try {
    const { page, limit, searchTerm, isAvailable = true } = req.query

    const filters = {
      searchTerm: searchTerm as string,
      isAvailable: isAvailable as boolean,
    }

    const result = await TableService.getAllTables(filters, {
      page: Number(page),
      limit: Number(limit),
    })

    res.status(200).json({
      success: true,
      message: 'Tables retrieved successfully',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve tables',
      data: error,
    })
  }
}

const getSingleTable = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const result = await TableService.getSingleTable(id)
    res.status(200).json({
      success: true,
      message: 'Table retrieved successfully',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve table',
      data: error,
    })
  }
}

const updateTable = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const result = await TableService.updateTable(id, req.body)
    res.status(200).json({
      success: true,
      message: 'Table updated successfully',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update table',
      data: error,
    })
  }
}

const deleteTable = async (req: Request, res: Response) => {
  try {
    const { tableId } = req.params
    const result = await TableService.deleteTable(tableId)
    res.status(200).json({
      success: true,
      message: 'Table deleted successfully',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete table',
      data: error,
    })
  }
}

export const TableController = {
  createTable,
  getAllTables,
  getSingleTable,
  updateTable,
  deleteTable,
}
