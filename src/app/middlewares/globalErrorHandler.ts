/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction } from 'express'
import { IncorrectUsernamePassword } from '../errors/incorrectUsernamePassword'
import httpStatus from 'http-status'
import { NotFoundError } from '../errors/notFoundError'
import { AppError } from '../errors/AppError'

// handling global Error handling
const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next: NextFunction
) => {
  let statusCode = 500
  let message = 'Something went wrong'
  let errorDetails = error

  // Handle different types of errors
  if (error instanceof Error) {
    // Handle Mongoose validation errors
    if (error?.name === 'ValidationError') {
      statusCode = httpStatus.BAD_REQUEST
      message = 'Validation Error'
      const errors = Object.values((error as any).errors || {}).map(
        (err: any) => err.message
      )
      errorDetails = { errors }
    }

    // Handle Mongoose CastError (invalid ObjectId)
    if (error?.name === 'CastError') {
      statusCode = httpStatus.BAD_REQUEST
      message = 'Invalid ID format'
      errorDetails = { path: (error as any).path, value: (error as any).value }
    }

    // Handle Mongoose duplicate key error
    if ((error as any)?.code === 11000) {
      statusCode = httpStatus.CONFLICT
      message = 'Duplicate entry'
      errorDetails = (error as any).keyValue
    }

    // Handle ZodError (validation)
    if (error?.name === 'ZodError') {
      statusCode = httpStatus.BAD_REQUEST
      message = 'Validation Error'
      errorDetails = {
        errors: (error as any)?.issues?.map((issue: any) => ({
          path: issue?.path?.join('.'),
          message: issue?.message,
        })),
      }
    }

    // Handle NotFoundError
    if (error instanceof NotFoundError) {
      statusCode = httpStatus.NOT_FOUND
      message = error.message
    }

    // Handle IncorrectUsernamePassword
    if (error instanceof IncorrectUsernamePassword) {
      statusCode = httpStatus.UNAUTHORIZED
      message = error.message
    }

    // Handle AppError
    // Temporarily commenting out AppError check until AppError class is imported
    if (error instanceof AppError) {
      statusCode = httpStatus.BAD_REQUEST
      message = error.message
    }

    // Handle other Error instances
    if (message === 'Something went wrong') {
      message = error.message
    }
  }

  const errorResponse = {
    success: false,
    message,
    statusCode,
    error: {
      name: error instanceof Error ? error.name : 'UnknownError',
      details: errorDetails,
    },
  }

// Add stack trace and additional details in development mode
if (process.env.NODE_ENV === 'development' && errorResponse.error) {
  Object.assign(errorResponse.error, {
    stack: error instanceof Error ? error.stack : undefined,
    timestamp: new Date().toISOString(),
    path: req.originalUrl || req.url,
    method: req.method
  });
}

  return res.status(statusCode).json(errorResponse)
}

export default globalErrorHandler
