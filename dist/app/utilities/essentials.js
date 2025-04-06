"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateId = exports.dateObject = void 0;
// Date object
exports.dateObject = {
    date: 'date',
    week: 'date',
    month: 'date',
    range: 'date',
};
const generateId = async ({ model, prefix, fieldName, }) => {
    const lastDocument = await model
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
};
exports.generateId = generateId;
