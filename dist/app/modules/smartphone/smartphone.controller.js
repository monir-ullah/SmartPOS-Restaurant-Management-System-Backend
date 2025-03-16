"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartphoneController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsyncFunc_1 = require("../../utilities/catchAsyncFunc");
const sendResponse_1 = __importDefault(require("../../utilities/sendResponse"));
const smartphone_services_1 = require("./smartphone.services");
// Add smartphone function
const addSmartphone = (0, catchAsyncFunc_1.catchAsyncFunc)(async (req, res) => {
    const smartphone = req.body;
    const smartphoneData = await smartphone_services_1.SmartphoneServices.addSmartphoneIntoDB(smartphone);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Smartphone added Successfully',
        data: smartphoneData,
    });
});
// Getting all smartphone
const getSmartphone = (0, catchAsyncFunc_1.catchAsyncFunc)(async (req, res) => {
    const params = req.query;
    const searchQuery = {};
    if (params.name) {
        searchQuery.name = new RegExp(`${params.name}`, 'i');
    }
    if (params.price) {
        const priceArray = params.price.toString().split(',');
        searchQuery.price = {
            $gte: Number(priceArray[0]),
            $lte: Number(priceArray[1]),
        };
    }
    if (params.releaseDate) {
        const searchQueryDate = params.releaseDate.toString().split(',');
        searchQuery.releaseDate = {
            $gte: new Date(searchQueryDate[0]),
            $lte: new Date(searchQueryDate[1]),
        };
    }
    if (params.storageCapacity) {
        searchQuery.storageCapacity = new RegExp(`${params.storageCapacity}`, 'i');
    }
    if (params.model) {
        searchQuery.model = new RegExp(`${params.model}`, 'i');
    }
    if (params.screenSize) {
        searchQuery.screenSize = params.screenSize;
    }
    if (params.brand) {
        searchQuery.brand = new RegExp(`${params.brand}`, 'i');
    }
    if (params.operatingSystem) {
        let osList = params.operatingSystem.toString().split(',');
        if (Array.isArray(osList))
            osList = osList.map((value) => new RegExp(`${value}`, 'i'));
        searchQuery.operatingSystem = {
            $in: osList,
        };
    }
    const getSmartphone = await smartphone_services_1.SmartphoneServices.getSmartphoneIntoDB(searchQuery);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Smartphone added Successfully',
        data: getSmartphone,
    });
});
// Deleting One Smartphone
const deleteOneSmartphone = (0, catchAsyncFunc_1.catchAsyncFunc)(async (req, res) => {
    const { key: smartphoneId } = req.body;
    const deleteSmartphone = await smartphone_services_1.SmartphoneServices.deleteOneSmartphoneIntoDB(smartphoneId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Smartphone deleted Successfully',
        data: deleteSmartphone,
    });
});
// Handling Bulk Delete
const bulkDeleteSmartphone = (0, catchAsyncFunc_1.catchAsyncFunc)(async (req, res) => {
    const deleteSmartphone = await smartphone_services_1.SmartphoneServices.bulkDeleteSmartphoneIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Bulk Smartphone deleted Successfully',
        data: deleteSmartphone,
    });
});
// Finding One Smartphone
const getSingleSmartphone = (0, catchAsyncFunc_1.catchAsyncFunc)(async (req, res) => {
    const { key: smartphoneId } = req.body;
    const getSingleSmartphone = await smartphone_services_1.SmartphoneServices.getSingleSmartphoneIntoDB(smartphoneId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Smartphone deleted Successfully',
        data: getSingleSmartphone,
    });
});
// Updating Smartphone
const updateSmartphone = (0, catchAsyncFunc_1.catchAsyncFunc)(async (req, res) => {
    const updateSmartphone = await smartphone_services_1.SmartphoneServices.updateSmartphoneIntoDB(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Smartphone Updated Successfully',
        data: updateSmartphone,
    });
});
// exporting functions
exports.SmartphoneController = {
    addSmartphone,
    getSmartphone,
    deleteOneSmartphone,
    getSingleSmartphone,
    updateSmartphone,
    bulkDeleteSmartphone,
};
