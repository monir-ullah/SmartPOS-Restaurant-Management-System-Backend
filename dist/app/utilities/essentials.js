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
exports.generateId = exports.dateObject = void 0;
// Date object
exports.dateObject = {
    date: 'date',
    week: 'date',
    month: 'date',
    range: 'date',
};
const generateId = ({ model, prefix, fieldName, }) => __awaiter(void 0, void 0, void 0, function* () {
    const lastDocument = yield model
        .findOne({}, { [fieldName]: 1 })
        .sort({ [fieldName]: -1 })
        .lean();
    if (!lastDocument) {
        return `${prefix}-001`;
    }
    const lastId = parseInt(lastDocument[fieldName].split('-')[1]);
    const nextId = lastId + 1;
    let numberPart;
    if (nextId >= 100) {
        numberPart = nextId.toString();
    }
    else if (nextId >= 10) {
        numberPart = '0' + nextId;
    }
    else {
        numberPart = '00' + nextId;
    }
    return `${prefix}-${numberPart}`;
});
exports.generateId = generateId;
