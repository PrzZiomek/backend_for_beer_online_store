"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapPromise = void 0;
exports.wrapPromise = (fn, cb) => {
    Promise.resolve(fn())
        .then(res => cb(res))
        .catch(err => console.log(err));
};
