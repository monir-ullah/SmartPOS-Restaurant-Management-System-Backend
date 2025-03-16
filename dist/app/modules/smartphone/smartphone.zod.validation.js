"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkDeleteSmartphoneZod = exports.smartphoneId = exports.smartphoneZodSchema = void 0;
const zod_1 = require("zod");
// smartphone zod schema
exports.smartphoneZodSchema = zod_1.z.object({
    name: zod_1.z.string(),
    price: zod_1.z.number(),
    quantity: zod_1.z.number(),
    releaseDate: zod_1.z.date(),
    brand: zod_1.z.string(),
    model: zod_1.z.string(),
    operatingSystem: zod_1.z.string(),
    storageCapacity: zod_1.z.string(),
    screenSize: zod_1.z.number(),
    batteryLife: zod_1.z.string(),
});
// smartphone id zod
exports.smartphoneId = zod_1.z.object({
    key: zod_1.z.string(),
});
// bulk delete smartphone zod
exports.bulkDeleteSmartphoneZod = zod_1.z.object({
    smartphoneIds: zod_1.z.string().array(),
});
