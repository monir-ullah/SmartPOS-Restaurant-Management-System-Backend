"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const incorrectUsernamePassword_1 = require("../errors/incorrectUsernamePassword");
const http_status_1 = __importDefault(require("http-status"));
// handling global Error handling
const globalErrorHandler = (error, req, res, next) => {
    let statusCode = 500;
    let message = 'Something Went Wrong';
    const errorDetails = error;
    const stack = error === null || error === void 0 ? void 0 : error.stack;
    // handling incorrect Username password error.
    if (error instanceof incorrectUsernamePassword_1.IncorrectUsernamePassword) {
        statusCode = http_status_1.default.UNAUTHORIZED;
        message = error.message;
    }
    return res.status(statusCode).json({
        success: false,
        message,
        errorDetails,
        stack,
    });
};
exports.default = globalErrorHandler;
