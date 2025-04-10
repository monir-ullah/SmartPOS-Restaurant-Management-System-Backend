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
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const AppError_1 = require("../errors/AppError");
const http_status_1 = __importDefault(require("http-status"));
const catchAsyncFunc_1 = require("../utilities/catchAsyncFunc");
const user_interface_1 = require("../modules/user/user.interface");
const auth = (...userRoles) => {
    return (0, catchAsyncFunc_1.catchAsyncFunc)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        if (!token) {
            throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'You are not authorized!');
        }
        // Verify token
        const decode = jsonwebtoken_1.default.verify(token, config_1.default.secret);
        const { role, username, exp } = decode;
        // Check token expiration
        const currentTime = Math.floor(Date.now() / 1000);
        if (exp <= currentTime) {
            throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'Token has expired!');
        }
        // Check if user exists
        const user = yield user_interface_1.MUser.findOne({ username, role });
        if (!user) {
            throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'This user is not found');
        }
        // Check role authorization
        // Example usage in auth middleware
        if (userRoles && !userRoles.includes(role)) {
            throw new AppError_1.AppError(http_status_1.default.FORBIDDEN, `You are not authorized for this action! . Allowed roles for this operation: ${userRoles.join(', ')}. Your role: ${role}`);
        }
        // Add user info to request
        req.user = user;
        next();
    }));
};
exports.auth = auth;
