"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("./app/config"));
const app_1 = __importDefault(require("./app"));
// Starting the server
async function serverStart() {
    try {
        await (0, mongoose_1.connect)(config_1.default.database_url);
        app_1.default.listen(config_1.default.port, () => {
            console.log(`Server is Running on port ${config_1.default.port}`);
        });
    }
    catch (error) {
        console.log(error);
        return error;
    }
}
serverStart();
