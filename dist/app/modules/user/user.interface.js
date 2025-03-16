"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MUser = void 0;
const mongoose_1 = require("mongoose");
// userSchema
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: {
            values: ['admin', 'user'],
            message: 'enum validator  failed for path `{PATH} with value `{VALUE}`',
        },
        default: 'admin',
    },
}, { versionKey: false });
// User Model
exports.MUser = (0, mongoose_1.model)('user', userSchema);
