"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formateDateWithDayJS = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
// formate Date with day js . middleware
const formateDateWithDayJS = (req, res, next) => {
    const { releaseDate } = req.body;
    const dateFormat = (0, dayjs_1.default)(releaseDate).format('YYYY-MM-DD');
    req.body.releaseDate = new Date(dateFormat);
    next();
};
exports.formateDateWithDayJS = formateDateWithDayJS;
