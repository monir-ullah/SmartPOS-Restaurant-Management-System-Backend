import { NextFunction, Request, RequestHandler, Response } from 'express'

// handling try catch with this function
export const catchAsyncFunc = (functionAsParameter: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(functionAsParameter(req, res, next)).catch(error =>
      next(error)
    )
  }
}
