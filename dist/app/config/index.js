"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join((process.cwd(), '.env')) });
// exporting config file
exports.default = {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    dev_environment: process.env.DEV_ENVIRONMENT,
    saltRounds: process.env.Salt_Rounds,
    secret: process.env.SECRET,
};
