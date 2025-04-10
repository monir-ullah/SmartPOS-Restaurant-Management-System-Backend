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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableController = void 0;
const table_services_1 = require("./table.services");
const createTable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield table_services_1.TableService.createTable(req.body);
        res.status(201).json({
            success: true,
            message: 'Table created successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create table',
            data: error,
        });
    }
});
const getAllTables = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, limit, searchTerm, isOccupied } = req.query;
        const filters = {
            searchTerm: searchTerm,
            isOccupied: isOccupied ? isOccupied === 'true' : undefined,
        };
        const result = yield table_services_1.TableService.getAllTables(filters, {
            page: Number(page),
            limit: Number(limit),
        });
        res.status(200).json({
            success: true,
            message: 'Tables retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve tables',
            data: error,
        });
    }
});
const getSingleTable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield table_services_1.TableService.getSingleTable(id);
        res.status(200).json({
            success: true,
            message: 'Table retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve table',
            data: error,
        });
    }
});
const updateTable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield table_services_1.TableService.updateTable(id, req.body);
        res.status(200).json({
            success: true,
            message: 'Table updated successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update table',
            data: error,
        });
    }
});
const deleteTable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield table_services_1.TableService.deleteTable(id);
        res.status(200).json({
            success: true,
            message: 'Table deleted successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete table',
            data: error,
        });
    }
});
exports.TableController = {
    createTable,
    getAllTables,
    getSingleTable,
    updateTable,
    deleteTable,
};
