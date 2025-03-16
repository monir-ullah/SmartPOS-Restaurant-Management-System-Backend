"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MSmartphoneSellsManagement = exports.smartphoneSellsManagementSchema = void 0;
const mongoose_1 = require("mongoose");
// This is sells management info schema
exports.smartphoneSellsManagementSchema = new mongoose_1.Schema({
    productName: {
        type: String,
        required: true,
    },
    productId: {
        type: String,
        required: true,
    },
    buyerName: {
        type: String,
        required: true,
    },
    quantitySold: {
        type: Number,
        required: true,
    },
    unitPrice: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    soldDate: {
        type: Date,
        required: true,
    },
}, { versionKey: false });
// this is smartphone sells management model
exports.MSmartphoneSellsManagement = (0, mongoose_1.model)('smartphoneSellsManagement', exports.smartphoneSellsManagementSchema);
