"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandle = void 0;
const extendedErrorClass_1 = require("./extendedErrorClass");
const errorHandle = (err, statusCode) => {
    const error = new extendedErrorClass_1.ExtendedError(err);
    error.httpStatusCode = statusCode;
    return error;
};
exports.errorHandle = errorHandle;
