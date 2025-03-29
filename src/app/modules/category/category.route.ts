import { Router } from 'express'
import { CategoryController } from './category.controller'
import { validateZodRequest } from '../../middlewares/validateZodRequest'
import { categoryParamsZodSchema, categoryZodSchema, updateCategoryZodSchema } from './category.zod.validation'

const router = Router()

// Route to create a new category
router.post('/category/create', validateZodRequest(categoryZodSchema), CategoryController.createCategory)

// Route to get all categories
router.get('/category', CategoryController.getAllCategories)

// Route to get a single category by ID
router.get('/category/:id', CategoryController.getSingleCategory)

// Route to update a category by ID
router.patch('/category/:id', validateZodRequest(updateCategoryZodSchema), CategoryController.updateCategory)

// Route to delete a category by ID
router.delete('/category/:id', CategoryController.deleteCategory)

export const categoryRoute = router
