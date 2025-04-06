"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MCategory = void 0;
const mongoose_1 = require("mongoose");
// categorySchema
const categorySchema = new mongoose_1.Schema({
    categoryId: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^cat-\d{3,}$/.test(v);
            },
            message: props => `${props.value} is not a valid category ID. It must be in the format cat-XXX where X is at least 3 digits`,
        },
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, { versionKey: false });
// Category Model
exports.MCategory = (0, mongoose_1.model)('category', categorySchema);
