"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesManagementController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsyncFunc_1 = require("../../utilities/catchAsyncFunc");
const sendResponse_1 = __importDefault(require("../../utilities/sendResponse"));
const sales_management_services_1 = require("./sales.management.services");
const essentials_1 = require("../../utilities/essentials");
// Sells management
const smartphoneSalesManagement = (0, catchAsyncFunc_1.catchAsyncFunc)(async (req, res) => {
    const { soldDate } = req.body;
    const smartphoneSalesManagementData = await sales_management_services_1.SalesManagementService.smartphoneSalesManagementIntoDB(Object.assign(Object.assign({}, req.body), { soldDate: new Date(soldDate) }));
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Sales information stored in the database Successfully',
        data: smartphoneSalesManagementData,
    });
});
// Get Sells History
const getSalesHistoryList = (0, catchAsyncFunc_1.catchAsyncFunc)(async (req, res) => {
    const reqQuery = req.query;
    if (Object.keys(reqQuery).length === 0 || !reqQuery.type)
        return;
    const salesHistoryQuery = {};
    if (reqQuery.type === essentials_1.dateObject.date) {
        salesHistoryQuery.soldDate = {
            $eq: new Date(reqQuery.selectedDate),
        };
    }
    else {
        salesHistoryQuery.soldDate = {
            $gte: new Date(reqQuery.startDate),
            $lte: new Date(reqQuery.endDate),
        };
    }
    const getSalesHistoryData = await sales_management_services_1.SalesManagementService.getSalesHistoryDataFromDatabase(salesHistoryQuery);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Sales History Generate Successfully',
        data: getSalesHistoryData,
    });
});
// Exporting functions
exports.SalesManagementController = {
    smartphoneSalesManagement,
    getSalesHistoryList,
};
