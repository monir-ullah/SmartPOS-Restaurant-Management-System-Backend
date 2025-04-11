import express from 'express'
import { TableController } from './table.controller'
import { TableValidation } from './table.zod.validation'
import { validateZodRequest } from '../../middlewares/validateZodRequest'
import { auth } from '../../utilities/auth'
import { USER_ROLE } from '../../constants/userRole'

const router = express.Router()

router.post(
  '/create-table',
  auth(USER_ROLE.ADMIN, USER_ROLE.MANAGER),
  validateZodRequest(TableValidation.createTableValidationSchema),
  TableController.createTable
)

router.get(
  '/get-all-tables',
  // auth(
  //   USER_ROLE.ADMIN,
  //   USER_ROLE.MANAGER,
  //   USER_ROLE.CHEF,
  //   USER_ROLE.WAITER,
  //   USER_ROLE.CASHIER
  // ),
  TableController.getAllTables
)

router.get(
  '/get-single-table/:id',
  auth(
    USER_ROLE.ADMIN,
    USER_ROLE.MANAGER,
    USER_ROLE.CHEF,
    USER_ROLE.WAITER,
    USER_ROLE.CASHIER
  ),
  TableController.getSingleTable
)

router.patch(
  '/update-table/:id',
  auth(
    USER_ROLE.ADMIN,
    USER_ROLE.MANAGER,
    USER_ROLE.CHEF,
    USER_ROLE.WAITER,
    USER_ROLE.CASHIER
  ),
  validateZodRequest(TableValidation.updateTableValidationSchema),
  TableController.updateTable
)

router.delete(
  '/delete-table/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.MANAGER),
  TableController.deleteTable
)

export const tableRoutes = router
