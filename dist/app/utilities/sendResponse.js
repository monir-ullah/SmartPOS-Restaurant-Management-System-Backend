"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// send Response function for client
const sendResponse = (res, data) => {
    return res.status(data === null || data === void 0 ? void 0 : data.statusCode).json({
        success: data.success,
        message: data.message,
        data: data.data,
    });
};
exports.default = sendResponse;
