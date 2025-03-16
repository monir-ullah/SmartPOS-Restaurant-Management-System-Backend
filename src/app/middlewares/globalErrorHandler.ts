/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction } from 'express'
import { IncorrectUsernamePassword } from '../errors/incorrectUsernamePassword'
import httpStatus from 'http-status'

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
