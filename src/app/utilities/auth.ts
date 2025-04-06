import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config'
import { AppError } from '../errors/AppError'
import httpStatus from 'http-status'
import { catchAsyncFunc } from '../utilities/catchAsyncFunc'
import { MUser } from '../modules/user/user.interface'

export const auth = (...userRoles: string[]) => {
  return catchAsyncFunc(
    async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization

      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!')
      }

      // Verify token
      const decode = jwt.verify(token, config.secret as string) as JwtPayload

      const { role, username, exp } = decode

      // Check token expiration
      const currentTime = Math.floor(Date.now() / 1000)
      if ((exp as number) <= currentTime) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Token has expired!')
      }

      // Check if user exists
      const user = await MUser.findOne({ username, role })

      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found')
      }

      // Check role authorization
      if (userRoles && !userRoles.includes(role)) {
        throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized for this action!')
      }

      // Add user info to request
      req.user = user
      next()
    }
  )
}

// Add type declaration for Request
declare global {
  namespace Express {
    interface Request {
      user: any
    }
  }
}