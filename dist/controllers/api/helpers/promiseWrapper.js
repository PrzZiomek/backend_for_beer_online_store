"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promiseWrapper = void 0;
const promiseWrapper = (fn, cb) => {
    Promise.resolve(fn())
        .then(res => cb(res))
        .catch(err => console.log(err));
};
exports.promiseWrapper = promiseWrapper;
