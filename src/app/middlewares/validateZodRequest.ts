/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod'

// Zod validation middleware
export const validateZodRequest = (dataSchema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await dataSchema.parseAsync(req.body)
      next()
    } catch (error) {
      next(error)
    }
  }
}
