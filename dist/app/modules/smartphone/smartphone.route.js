"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.smartphoneRoute = void 0;
const express_1 = require("express");
const validateZodRequest_1 = require("../../middlewares/validateZodRequest");
const smartphone_zod_validation_1 = require("./smartphone.zod.validation");
const smartphone_controller_1 = require("./smartphone.controller");
const formateDateWithDayJs_1 = require("../../utilities/formateDateWithDayJs");
const router = (0, express_1.Router)();
// add new smartphone
router.post('/add-smartphone', formateDateWithDayJs_1.formateDateWithDayJS, (0, validateZodRequest_1.validateZodRequest)(smartphone_zod_validation_1.smartphoneZodSchema), smartphone_controller_1.SmartphoneController.addSmartphone);
// Finding smartphone routes
router.get('/get-smartphone', smartphone_controller_1.SmartphoneController.getSmartphone);
// Delete smartphone routes
router.delete('/delete-one-smartphone', (0, validateZodRequest_1.validateZodRequest)(smartphone_zod_validation_1.smartphoneId), smartphone_controller_1.SmartphoneController.deleteOneSmartphone);
// Finding one smartphone routes
router.patch('/get-single-smartphone', (0, validateZodRequest_1.validateZodRequest)(smartphone_zod_validation_1.smartphoneId), smartphone_controller_1.SmartphoneController.getSingleSmartphone);
// Bulk Delete Smartphone Routes
router.delete('/bulk-delete-smartphone', (0, validateZodRequest_1.validateZodRequest)(smartphone_zod_validation_1.bulkDeleteSmartphoneZod), smartphone_controller_1.SmartphoneController.bulkDeleteSmartphone);
// Update one smartphone routes
router.put('/update-smartphone/:id', formateDateWithDayJs_1.formateDateWithDayJS, (0, validateZodRequest_1.validateZodRequest)(smartphone_zod_validation_1.smartphoneZodSchema), smartphone_controller_1.SmartphoneController.updateSmartphone);
exports.smartphoneRoute = router;
