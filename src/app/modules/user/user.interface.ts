import { Schema, model } from 'mongoose'

// TUser Type
export type TUser = {
  username: string
  password: string
  role?: 'owner' | 'manager' | 'waiter' | 'cashier' | 'chef' | 'administrator'
}

// userSchema
const userSchema = new Schema<TUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: {
        values: [
          'owner',
          'manager',
          'waiter',
          'cashier',
          'chef',
          'administrator',
        ],
        message: 'enum validator failed for path `{PATH} with value `{VALUE}`',
      },
      default: 'administrator',
    },
  },
  { versionKey: false }
)

// User Model
export const MUser = model<TUser>('user', userSchema)
