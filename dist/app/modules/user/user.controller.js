"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const userRegistration = (0, catchAsyncFunc_1.catchAsyncFunc)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRegistration = req.body;
    const registrationResult = yield user_services_1.UserServices.userRegistrationIntoDB(userRegistration);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'User Register Successfully',
        data: registrationResult,
    });
}));
// user login function
const userLogin = (0, catchAsyncFunc_1.catchAsyncFunc)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginBOdy = req.body;
    const registrationResult = yield user_services_1.UserServices.loginUserFromDB(loginBOdy);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'User Login Successfully',
        data: registrationResult,
    });
}));
// exporting functions
exports.UserController = { userRegistration, userLogin };
