"use strict";
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartphoneServices = void 0;
const notFoundError_1 = require("../../errors/notFoundError");
const smartphone_schema_1 = require("./smartphone.schema");
const dayjs_1 = __importDefault(require("dayjs"));
// Add smartphone into db
const addSmartphoneIntoDB = async (smartphone) => {
    const smartphoneDataIntoDB = await smartphone_schema_1.MSmartphone.create(smartphone);
    return smartphoneDataIntoDB.toObject();
};
// Getting data smartphone data from mongodb
const getSmartphoneIntoDB = async (query) => {
    const smartphoneDataIntoDB = await smartphone_schema_1.MSmartphone.find(query)
        .select({
        _id: 1,
        name: 1,
        price: 1,
        quantity: 1,
        brand: 1,
        model: 1,
        storageCapacity: 1,
        operatingSystem: 1,
        releaseDate: 1,
    })
        .sort({
        name: 1,
        releaseDate: 1,
    });
    const formattedDataForClient = smartphoneDataIntoDB.map((smartphone) => ({
        key: smartphone._id,
        name: smartphone.name,
        price: smartphone.price,
        quantity: smartphone.quantity,
        brand: smartphone.brand,
        model: smartphone.model,
        operatingSystem: smartphone.operatingSystem,
        storageCapacity: smartphone.storageCapacity,
        releaseDate: (0, dayjs_1.default)(smartphone.releaseDate).format('DD-MM-YYYY'),
    }));
    return formattedDataForClient;
};
// Delete one smartphone from db
const deleteOneSmartphoneIntoDB = async (id) => {
    const smartphoneDataIntoDB = await smartphone_schema_1.MSmartphone.findOneAndDelete({ _id: id });
    if (!smartphoneDataIntoDB) {
        throw new notFoundError_1.NotFoundError(`Item with this '${id}' is not found.`);
    }
    return smartphoneDataIntoDB;
};
// Handling bulk delete smartphone from database
const bulkDeleteSmartphoneIntoDB = async (smartphoneIdsBody) => {
    const { smartphoneIds } = smartphoneIdsBody;
    const smartphoneDataIntoDB = await smartphone_schema_1.MSmartphone.deleteMany({
        _id: { $in: [...smartphoneIds] },
    });
    if (!smartphoneDataIntoDB) {
        throw new notFoundError_1.NotFoundError(`Can't Delete smartphone's`);
    }
    return smartphoneDataIntoDB;
};
// getting single smartphone from database
const getSingleSmartphoneIntoDB = async (id) => {
    const smartphoneDataIntoDB = await smartphone_schema_1.MSmartphone.findOne({ _id: id });
    if (!smartphoneDataIntoDB) {
        throw new notFoundError_1.NotFoundError(`Item with this '${id}' is not found.`);
    }
    return smartphoneDataIntoDB;
};
// updating smartphone data in the database
const updateSmartphoneIntoDB = async (id, updateBody) => {
    const smartphoneDataIntoDB = await smartphone_schema_1.MSmartphone.findOneAndUpdate({ _id: id }, updateBody);
    if (!smartphoneDataIntoDB) {
        throw new notFoundError_1.NotFoundError(`Item with this '${id}' is not found.`);
    }
    return smartphoneDataIntoDB;
};
// exporting functions
exports.SmartphoneServices = {
    addSmartphoneIntoDB,
    getSmartphoneIntoDB,
    deleteOneSmartphoneIntoDB,
    getSingleSmartphoneIntoDB,
    updateSmartphoneIntoDB,
    bulkDeleteSmartphoneIntoDB,
};
