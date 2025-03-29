/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express'

type TResponse<T1> = {
  success: boolean
  statusCode: number
  message?: string
  data: T1
  meta?: {
    page: number
    limit: number
    total: number
    totalPage: number
  }
}

// Pagination Type
export type TPaginationOptions = {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export type TPaginationResult<T> = {
  data: T[]
  meta: {
    page: number
    limit: number
    total: number
    totalPage: number
  }
}

// send Response function for client
const sendResponse = <T1>(res: Response, data: TResponse<T1>) => {
  const responseData = {
    success: data.success,
    message: data.message,
    data: data.data,
  }

  // Add meta information if pagination data exists
  if (data.meta) {
    Object.assign(responseData, { meta: data.meta })
  }

  return res.status(data?.statusCode).json(responseData)
}

export default sendResponse
