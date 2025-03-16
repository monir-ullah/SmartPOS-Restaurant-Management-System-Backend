"use strict";
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const config_1 = __importDefault(require("../../config"));
const incorrectUsernamePassword_1 = require("../../errors/incorrectUsernamePassword");
const user_interface_1 = require("./user.interface");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// This is for user Registration
const userRegistrationIntoDB = async (userRegistrationBody) => {
    const userRegistrationIntoDB = await user_interface_1.MUser.create(userRegistrationBody);
    const _a = userRegistrationIntoDB.toObject(), { password } = _a, restUserFromDB = __rest(_a, ["password"]);
    return restUserFromDB;
};
// This is for user login
const loginUserFromDB = async (userRegistrationBody) => {
    const { username: usernameForDB, password } = userRegistrationBody;
    const userRegistrationIntoDB = await user_interface_1.MUser.findOne({
        username: usernameForDB,
        password: password,
    });
    if (!userRegistrationIntoDB) {
        throw new incorrectUsernamePassword_1.IncorrectUsernamePassword(`incorrect username: '${usernameForDB}'  and password: '${password}  `);
    }
    const dbObjectResult = userRegistrationIntoDB.toObject();
    const { username, role } = dbObjectResult;
    // Sign in new token is user name and password match.
    const jwtToken = jsonwebtoken_1.default.sign({ username, role }, config_1.default.secret, {
        expiresIn: '1h',
    });
    return jwtToken;
};
// exporting function so that other file can use.
exports.UserServices = { userRegistrationIntoDB, loginUserFromDB };
