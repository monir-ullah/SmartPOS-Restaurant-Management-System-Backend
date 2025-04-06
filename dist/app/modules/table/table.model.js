"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MTableModel = void 0;
const mongoose_1 = require("mongoose");
const tableSchema = new mongoose_1.Schema({
    tableId: {
        type: String,
        required: true,
        unique: true,
    },
    tableNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    seatCapacity: {
        type: Number,
        required: true,
    },
    isOccupied: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ['available', 'occupied', 'reserved', 'maintenance'],
        default: 'available',
    },
}, {
    timestamps: true,
});
exports.MTableModel = (0, mongoose_1.model)('Table', tableSchema);
