"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = require("express");
const validateZodRequest_1 = require("../../middlewares/validateZodRequest");
const user_zod_validation_1 = require("./user.zod.validation");
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
// Registration route
router.post('/user/registration', (0, validateZodRequest_1.validateZodRequest)(user_zod_validation_1.userZodSchema), user_controller_1.UserController.userRegistration);
// Login route
router.post('/user/login', (0, validateZodRequest_1.validateZodRequest)(user_zod_validation_1.userZodSchema), user_controller_1.UserController.userLogin);
exports.userRoute = router;
