"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const incorrectUsernamePassword_1 = require("../errors/incorrectUsernamePassword");
const http_status_1 = __importDefault(require("http-status"));
const notFoundError_1 = require("../errors/notFoundError");
const AppError_1 = require("../errors/AppError");
// handling global Error handling
const globalErrorHandler = (error, req, res, next) => {
    var _a;
    let statusCode = 500;
    let message = 'Something went wrong';
    let errorDetails = error;
    // Handle different types of errors
    if (error instanceof Error) {
        // Handle Mongoose validation errors
        if ((error === null || error === void 0 ? void 0 : error.name) === 'ValidationError') {
            statusCode = http_status_1.default.BAD_REQUEST;
            message = 'Validation Error';
            const errors = Object.values(error.errors || {}).map((err) => ({
                message: err.message,
                path: err.path,
                value: err.value,
                kind: err.kind,
                location: err.stack, // This will show where the validation failed
            }));
            errorDetails = { errors };
        }
        // Handle Mongoose CastError (invalid ObjectId)
        if ((error === null || error === void 0 ? void 0 : error.name) === 'CastError') {
            statusCode = http_status_1.default.BAD_REQUEST;
            message = 'Invalid ID format';
            errorDetails = { path: error.path, value: error.value };
        }
        // Handle Mongoose duplicate key error
        if ((error === null || error === void 0 ? void 0 : error.code) === 11000) {
            statusCode = http_status_1.default.CONFLICT;
            message = 'Duplicate entry';
            errorDetails = error.keyValue;
        }
        // Handle ZodError (validation)
        if ((error === null || error === void 0 ? void 0 : error.name) === 'ZodError') {
            statusCode = http_status_1.default.BAD_REQUEST;
            message = 'Validation Error';
            errorDetails = {
                errors: (_a = error === null || error === void 0 ? void 0 : error.issues) === null || _a === void 0 ? void 0 : _a.map((issue) => {
                    var _a;
                    return ({
                        path: (_a = issue === null || issue === void 0 ? void 0 : issue.path) === null || _a === void 0 ? void 0 : _a.join('.'),
                        message: issue === null || issue === void 0 ? void 0 : issue.message,
                    });
                }),
            };
        }
        // Handle NotFoundError
        if (error instanceof notFoundError_1.NotFoundError) {
            statusCode = http_status_1.default.NOT_FOUND;
            message = error.message;
        }
        // Handle IncorrectUsernamePassword
        if (error instanceof incorrectUsernamePassword_1.IncorrectUsernamePassword) {
            statusCode = http_status_1.default.UNAUTHORIZED;
            message = error.message;
        }
        // Handle AppError
        // Temporarily commenting out AppError check until AppError class is imported
        if (error instanceof AppError_1.AppError) {
            statusCode = http_status_1.default.BAD_REQUEST;
            message = error.message;
        }
        // Handle other Error instances
        if (message === 'Something went wrong') {
            message = error.message;
        }
    }
    const errorResponse = {
        success: false,
        message,
        statusCode,
        error: {
            name: error instanceof Error ? error.name : 'UnknownError',
            details: errorDetails,
        },
    };
    // Add stack trace and additional details in development mode
    if (process.env.NODE_ENV === 'development' && errorResponse.error) {
        Object.assign(errorResponse.error, {
            stack: error instanceof Error ? error.stack : undefined,
            timestamp: new Date().toISOString(),
            path: req.originalUrl || req.url,
            method: req.method,
        });
    }
    return res.status(statusCode).json(errorResponse);
};
exports.default = globalErrorHandler;
