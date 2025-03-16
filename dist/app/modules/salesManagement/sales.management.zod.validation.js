"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.salesManagementZod = void 0;
const zod_1 = require("zod");
// Sales management zod
exports.salesManagementZod = zod_1.z.object({
    productName: zod_1.z.string(),
    productId: zod_1.z.string(),
    buyerName: zod_1.z.string(),
    quantitySold: zod_1.z.number(),
    unitPrice: zod_1.z.number(),
    totalPrice: zod_1.z.number(),
    soldDate: zod_1.z.string(),
});
