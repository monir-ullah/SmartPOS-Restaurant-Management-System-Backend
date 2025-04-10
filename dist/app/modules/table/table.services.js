"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableService = void 0;
const essentials_1 = require("../../utilities/essentials");
const table_model_1 = require("./table.model");
const createTable = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const tableId = yield (0, essentials_1.generateId)({
        model: table_model_1.MTableModel,
        prefix: 'table',
        fieldName: 'tableId',
    });
    const result = yield table_model_1.MTableModel.create(Object.assign(Object.assign({}, payload), { tableId }));
    return result;
});
const getAllTables = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const { page = 1, limit = 10 } = paginationOptions;
    const skip = (page - 1) * limit;
    const conditions = [];
    if (searchTerm) {
        conditions.push({
            $or: [
                { tableId: { $regex: searchTerm, $options: 'i' } },
                { status: { $regex: searchTerm, $options: 'i' } },
            ],
        });
    }
    if (Object.keys(filterData).length) {
        conditions.push({
            $and: Object.entries(filterData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const whereConditions = conditions.length > 0 ? { $and: conditions } : {};
    const result = yield table_model_1.MTableModel.find(whereConditions)
        .skip(skip)
        .limit(limit)
        .lean();
    const total = yield table_model_1.MTableModel.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
        data: result,
    };
});
const getSingleTable = (tableId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield table_model_1.MTableModel.findOne({ tableId });
    return result;
});
const updateTable = (tableId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield table_model_1.MTableModel.findOneAndUpdate({ tableId }, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteTable = (tableId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield table_model_1.MTableModel.findOneAndUpdate({
        tableId,
        isOccupied: false,
    });
    return result;
});
exports.TableService = {
    createTable,
    getAllTables,
    getSingleTable,
    updateTable,
    deleteTable,
};
