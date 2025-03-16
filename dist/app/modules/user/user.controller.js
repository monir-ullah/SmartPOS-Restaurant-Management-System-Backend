"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsyncFunc_1 = require("../../utilities/catchAsyncFunc");
const sendResponse_1 = __importDefault(require("../../utilities/sendResponse"));
const user_services_1 = require("./user.services");
// user registration
const userRegistration = (0, catchAsyncFunc_1.catchAsyncFunc)(async (req, res) => {
    const userRegistration = req.body;
    const registrationResult = await user_services_1.UserServices.userRegistrationIntoDB(userRegistration);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'User Register Successfully',
        data: registrationResult,
    });
});
// user login function
const userLogin = (0, catchAsyncFunc_1.catchAsyncFunc)(async (req, res) => {
    const loginBOdy = req.body;
    const registrationResult = await user_services_1.UserServices.loginUserFromDB(loginBOdy);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'User Register Successfully',
        data: registrationResult,
    });
});
// exporting functions
exports.UserController = { userRegistration, userLogin };
