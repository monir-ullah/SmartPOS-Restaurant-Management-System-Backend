"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.salesManagementRoute = void 0;
const express_1 = __importDefault(require("express"));
const sales_management_zod_validation_1 = require("./sales.management.zod.validation");
const validateZodRequest_1 = require("../../middlewares/validateZodRequest");
const sales_management_controller_1 = require("./sales.management.controller");
const router = express_1.default.Router();
// Sell management route
router.post('/sell-management', (0, validateZodRequest_1.validateZodRequest)(sales_management_zod_validation_1.salesManagementZod), sales_management_controller_1.SalesManagementController.smartphoneSalesManagement);
// Get Sales history
router.get('/get-sales-history', sales_management_controller_1.SalesManagementController.getSalesHistoryList);
exports.salesManagementRoute = router;
