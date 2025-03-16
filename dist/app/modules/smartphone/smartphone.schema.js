"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MSmartphone = exports.smartphoneSchema = void 0;
const mongoose_1 = require("mongoose");
// This is smartphone info schema
exports.smartphoneSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    releaseDate: {
        type: Date,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    operatingSystem: {
        type: String,
        required: true,
    },
    storageCapacity: {
        type: String,
        required: true,
    },
    screenSize: {
        type: Number,
        required: true,
    },
    batteryLife: {
        type: String,
        required: true,
    },
}, { versionKey: false });
// this is smartphone Model
exports.MSmartphone = (0, mongoose_1.model)('smartphone', exports.smartphoneSchema);
