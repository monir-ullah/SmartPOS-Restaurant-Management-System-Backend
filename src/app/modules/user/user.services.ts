/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import config from '../../config'
import { IncorrectUsernamePassword } from '../../errors/incorrectUsernamePassword'
import { MUser, TUser } from './user.interface'
import jwt from 'jsonwebtoken'

// This is for user Registration

const userRegistrationIntoDB = async (userRegistrationBody: TUser) => {
  const userRegistrationIntoDB = await MUser.create(userRegistrationBody)

  const { password, ...restUserFromDB } = userRegistrationIntoDB.toObject()

  return restUserFromDB
}

// This is for user login
const loginUserFromDB = async (userRegistrationBody: TUser) => {
  const { username: usernameForDB, password } = userRegistrationBody
  const userRegistrationIntoDB = await MUser.findOne({
    username: usernameForDB,
    password: password,
  })
  if (!userRegistrationIntoDB) {
    throw new IncorrectUsernamePassword(
      `incorrect username: '${usernameForDB}'  and password: '${password}  `,
    )
  }

  const dbObjectResult = userRegistrationIntoDB!.toObject()

  const { username, role } = dbObjectResult

  // Sign in new token is user name and password match.
  const jwtToken = jwt.sign({ username, role }, config.secret as string, {
    expiresIn: '1h',
  })

  return jwtToken
}

// exporting function so that other file can use.
export const UserServices = { userRegistrationIntoDB, loginUserFromDB }
