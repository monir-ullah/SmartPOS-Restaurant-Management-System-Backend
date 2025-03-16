import httpStatus from 'http-status'
import { catchAsyncFunc } from '../../utilities/catchAsyncFunc'
import sendResponse from '../../utilities/sendResponse'
import { UserServices } from './user.services'

// user registration
const userRegistration = catchAsyncFunc(async (req, res) => {
  const userRegistration = req.body

  const registrationResult =
    await UserServices.userRegistrationIntoDB(userRegistration)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User Register Successfully',
    data: registrationResult,
  })
})

// user login function
const userLogin = catchAsyncFunc(async (req, res) => {
  const loginBOdy = req.body

  const registrationResult = await UserServices.loginUserFromDB(loginBOdy)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User Login Successfully',
    data: registrationResult,
  })
})

// exporting functions
export const UserController = { userRegistration, userLogin }
