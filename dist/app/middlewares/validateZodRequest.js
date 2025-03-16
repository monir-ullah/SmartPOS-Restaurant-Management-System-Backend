"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateZodRequest = void 0;
// Zod validation middleware
const validateZodRequest = (dataSchema) => {
    return async (req, res, next) => {
        try {
            await dataSchema.parseAsync(req.body);
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.validateZodRequest = validateZodRequest;
