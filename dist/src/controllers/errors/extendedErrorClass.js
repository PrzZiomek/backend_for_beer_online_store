"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedError = void 0;
class ExtendedError extends Error {
    constructor(message) {
        super(message);
        this.name = "extendedError";
        Object.setPrototypeOf(this, ExtendedError.prototype);
    }
}
exports.ExtendedError = ExtendedError;
