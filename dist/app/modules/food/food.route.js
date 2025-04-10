"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.foodItemRoutes = void 0;
const express_1 = __importDefault(require("express"));
const food_controller_1 = require("./food.controller");
const food_zod_validation_1 = require("./food.zod.validation");
const validateZodRequest_1 = require("../../middlewares/validateZodRequest");
const auth_1 = require("../../utilities/auth");
const userRole_1 = require("../../constants/userRole");
const router = express_1.default.Router();
router.post('/create-food', (0, auth_1.auth)(userRole_1.USER_ROLE.ADMIN, userRole_1.USER_ROLE.MANAGER), (0, validateZodRequest_1.validateZodRequest)(food_zod_validation_1.FoodItemValidation.createFoodItemValidationSchema), food_controller_1.FoodItemController.createFoodItem);
router.get('/get-all-food-items', food_controller_1.FoodItemController.getAllFoodItems);
router.get('/get-single-food-item/:id', food_controller_1.FoodItemController.getSingleFoodItem);
router.patch('/update-single-fodd-item/:id', (0, auth_1.auth)(userRole_1.USER_ROLE.ADMIN, userRole_1.USER_ROLE.MANAGER), (0, validateZodRequest_1.validateZodRequest)(food_zod_validation_1.FoodItemValidation.updateFoodItemValidationSchema), food_controller_1.FoodItemController.updateFoodItem);
router.delete('/delete-single-food-itme/:id', (0, auth_1.auth)(userRole_1.USER_ROLE.ADMIN, userRole_1.USER_ROLE.MANAGER), food_controller_1.FoodItemController.deleteFoodItem);
exports.foodItemRoutes = router;
