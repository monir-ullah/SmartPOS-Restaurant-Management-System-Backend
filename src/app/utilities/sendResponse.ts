/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express'

type TResponse<T1> = {
  success: boolean
  statusCode: number
  message?: string
  data: T1
}

// send Response function for client
const sendResponse = <T1>(res: Response, data: TResponse<T1>) => {
  return res.status(data?.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
  })
}

export default sendResponse
