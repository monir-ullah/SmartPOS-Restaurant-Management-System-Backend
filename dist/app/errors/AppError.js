"use strict";
// this is for any kind of error.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
const http_status_1 = __importDefault(require("http-status"));
class AppError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode ? statusCode : http_status_1.default.FORBIDDEN;
        this.name = 'AppError';
    }
}
exports.AppError = AppError;
