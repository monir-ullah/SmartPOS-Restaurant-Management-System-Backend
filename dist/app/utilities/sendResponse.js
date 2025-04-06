"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// send Response function for client
const sendResponse = (res, data) => {
    const responseData = {
        success: data.success,
        message: data.message,
        data: data.data,
    };
    // Add meta information if pagination data exists
    if (data.meta) {
        Object.assign(responseData, { meta: data.meta });
    }
    return res.status(data === null || data === void 0 ? void 0 : data.statusCode).json(responseData);
};
exports.default = sendResponse;
