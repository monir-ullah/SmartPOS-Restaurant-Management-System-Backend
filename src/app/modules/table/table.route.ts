import express from 'express'
import { TableController } from './table.controller'
import { TableValidation } from './table.zod.validation'
import { validateZodRequest } from '../../middlewares/validateZodRequest'

const router = express.Router()

router.post(
  '/create-table',
  validateZodRequest(TableValidation.createTableValidationSchema),
  TableController.createTable
)

router.get('/get-all-tables', TableController.getAllTables)

router.get('/get-single-table/:id', TableController.getSingleTable)

router.patch(
  '/update-table/:id',
  validateZodRequest(TableValidation.updateTableValidationSchema),
  TableController.updateTable
)

router.delete('/delete-table/:id', TableController.deleteTable)

export const tableRoutes = router
