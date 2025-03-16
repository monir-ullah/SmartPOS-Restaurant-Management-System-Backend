"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesManagementService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = require("../../errors/AppError");
const smartphone_schema_1 = require("../smartphone/smartphone.schema");
const sales_management_schema_1 = require("./sales.management.schema");
// Smartphone Sales management Features, writing the data in the mongodb database
const smartphoneSalesManagementIntoDB = async (smartphoneSaleManagement) => {
    const soldDateFormat = smartphoneSaleManagement.soldDate;
    smartphoneSaleManagement.soldDate = new Date(soldDateFormat);
    const session = await mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const smartphoneSalesManagementDataIntoDB = await sales_management_schema_1.MSmartphoneSellsManagement.create([smartphoneSaleManagement], {
            session,
        });
        const findSmartphoneData = await smartphone_schema_1.MSmartphone.findById({
            _id: smartphoneSaleManagement.productId,
        }, null, { session });
        if (!findSmartphoneData) {
            throw new AppError_1.AppError('User smartphone not found');
        }
        // Update the quantity of the found smartphone
        await smartphone_schema_1.MSmartphone.updateOne({ _id: smartphoneSaleManagement.productId }, {
            quantity: (findSmartphoneData === null || findSmartphoneData === void 0 ? void 0 : findSmartphoneData.quantity) - smartphoneSaleManagement.quantitySold,
        }, { session });
        // Deleting data from the smartphone management inventory which is out of stock
        await smartphone_schema_1.MSmartphone.deleteMany({
            quantity: { $lte: 0 },
        }, { session });
        await session.commitTransaction();
        await session.endSession();
        return smartphoneSalesManagementDataIntoDB;
    }
    catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError_1.AppError('Can not store the sold data');
    }
};
// Getting Sales History From Database
const getSalesHistoryDataFromDatabase = async (query) => {
    const smartphoneDataIntoDB = await sales_management_schema_1.MSmartphoneSellsManagement.aggregate([
        { $match: { soldDate: query.soldDate } },
        {
            $group: {
                _id: {
                    productName: '$productName',
                    productId: '$productId',
                },
                totalQuantitySold: { $sum: '$quantitySold' },
                totalSoldPrice: { $sum: '$totalPrice' },
            },
        },
        {
            $group: {
                _id: null,
                finalTotalQuantitySold: { $sum: '$totalQuantitySold' },
                finalTotalPrice: { $sum: '$totalSoldPrice' },
                data: { $push: '$$ROOT' },
            },
        },
    ]);
    return smartphoneDataIntoDB;
};
// exporting functions
exports.SalesManagementService = {
    smartphoneSalesManagementIntoDB,
    getSalesHistoryDataFromDatabase,
};
