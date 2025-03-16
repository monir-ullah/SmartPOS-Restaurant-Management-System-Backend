"use strict";
//  this is for custom incorrect username and password error.
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncorrectUsernamePassword = void 0;
class IncorrectUsernamePassword extends Error {
    constructor(message) {
        super(message);
        this.name = 'IncorrectUsernamePassword';
    }
}
exports.IncorrectUsernamePassword = IncorrectUsernamePassword;
