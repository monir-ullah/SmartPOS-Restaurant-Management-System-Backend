"use strict";
// this is for any kind of error.
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AppError';
    }
}
exports.AppError = AppError;
