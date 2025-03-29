/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction } from 'express'
import { IncorrectUsernamePassword } from '../errors/incorrectUsernamePassword'
import httpStatus from 'http-status'
import { NotFoundError } from '../errors/notFoundError'

// handling global Error handling
const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next: NextFunction,
) => {
  let statusCode = 500
  let message = 'Something Went Wrong'
  const errorDetails = error
  const stack = error?.stack

  // ZodError
  if (error?.name === 'ZodError') {
    statusCode = httpStatus.BAD_REQUEST
    message = error?.issues[0]?.message  
  }

  // handle add for not found error. it should be NotFoundError

  if (error instanceof NotFoundError) {
    statusCode = httpStatus.NOT_FOUND
    message = error.message
  }

  // handling incorrect Username password error.
  if (error instanceof IncorrectUsernamePassword) {
    statusCode = httpStatus.UNAUTHORIZED
    message = error.message
  }

  

  return res.status(statusCode).json({
    success: false,
    message,
    errorDetails,
    stack,
  })
}

export default globalErrorHandler
