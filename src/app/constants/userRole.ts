export const USER_ROLE = {
  ADMIN: 'admin',
  WAITER: 'waiter',
  CHEF: 'chef',
  CASHIER: 'cashier',
  MANAGER: 'manager',
} as const // as const is used to make the object readonly.

// Type for user roles
export type TUserRole = keyof typeof USER_ROLE
