"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableController = void 0;
const table_services_1 = require("./table.services");
const createTable = async (req, res) => {
    try {
        const result = await table_services_1.TableService.createTable(req.body);
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
};
const getAllTables = async (req, res) => {
    try {
        const { page, limit, searchTerm, isOccupied } = req.query;
        const filters = {
            searchTerm: searchTerm,
            isOccupied: isOccupied ? isOccupied === 'true' : undefined,
        };
        const result = await table_services_1.TableService.getAllTables(filters, {
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
};
const getSingleTable = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await table_services_1.TableService.getSingleTable(id);
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
};
const updateTable = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await table_services_1.TableService.updateTable(id, req.body);
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
};
const deleteTable = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await table_services_1.TableService.deleteTable(id);
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
};
exports.TableController = {
    createTable,
    getAllTables,
    getSingleTable,
    updateTable,
    deleteTable,
};
