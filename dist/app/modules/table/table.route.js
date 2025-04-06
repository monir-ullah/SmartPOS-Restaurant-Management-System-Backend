"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tableRoutes = void 0;
const express_1 = __importDefault(require("express"));
const table_controller_1 = require("./table.controller");
const table_zod_validation_1 = require("./table.zod.validation");
const validateZodRequest_1 = require("../../middlewares/validateZodRequest");
const router = express_1.default.Router();
router.post('/create-table', (0, validateZodRequest_1.validateZodRequest)(table_zod_validation_1.TableValidation.createTableValidationSchema), table_controller_1.TableController.createTable);
router.get('/get-all-tables', table_controller_1.TableController.getAllTables);
router.get('/get-single-table/:id', table_controller_1.TableController.getSingleTable);
router.patch('/update-table/:id', (0, validateZodRequest_1.validateZodRequest)(table_zod_validation_1.TableValidation.updateTableValidationSchema), table_controller_1.TableController.updateTable);
router.delete('/delete-table/:id', table_controller_1.TableController.deleteTable);
exports.tableRoutes = router;
