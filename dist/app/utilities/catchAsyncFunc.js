"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsyncFunc = void 0;
// handling try catch with this function
const catchAsyncFunc = (functionAsParameter) => {
    return (req, res, next) => {
        Promise.resolve(functionAsParameter(req, res, next)).catch(error => next(error));
    };
};
exports.catchAsyncFunc = catchAsyncFunc;
