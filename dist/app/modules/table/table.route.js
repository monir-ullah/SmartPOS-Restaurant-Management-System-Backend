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
const auth_1 = require("../../utilities/auth");
const userRole_1 = require("../../constants/userRole");
const router = express_1.default.Router();
router.post('/create-table', (0, auth_1.auth)(userRole_1.USER_ROLE.ADMIN, userRole_1.USER_ROLE.MANAGER), (0, validateZodRequest_1.validateZodRequest)(table_zod_validation_1.TableValidation.createTableValidationSchema), table_controller_1.TableController.createTable);
router.get('/get-all-tables', (0, auth_1.auth)(userRole_1.USER_ROLE.ADMIN, userRole_1.USER_ROLE.MANAGER, userRole_1.USER_ROLE.CHEF, userRole_1.USER_ROLE.WAITER, userRole_1.USER_ROLE.CASHIER), table_controller_1.TableController.getAllTables);
router.get('/get-single-table/:id', (0, auth_1.auth)(userRole_1.USER_ROLE.ADMIN, userRole_1.USER_ROLE.MANAGER, userRole_1.USER_ROLE.CHEF, userRole_1.USER_ROLE.WAITER, userRole_1.USER_ROLE.CASHIER), table_controller_1.TableController.getSingleTable);
router.patch('/update-table/:id', (0, auth_1.auth)(userRole_1.USER_ROLE.ADMIN, userRole_1.USER_ROLE.MANAGER, userRole_1.USER_ROLE.CHEF, userRole_1.USER_ROLE.WAITER, userRole_1.USER_ROLE.CASHIER), (0, validateZodRequest_1.validateZodRequest)(table_zod_validation_1.TableValidation.updateTableValidationSchema), table_controller_1.TableController.updateTable);
router.delete('/delete-table/:id', (0, auth_1.auth)(userRole_1.USER_ROLE.ADMIN, userRole_1.USER_ROLE.MANAGER), table_controller_1.TableController.deleteTable);
exports.tableRoutes = router;
