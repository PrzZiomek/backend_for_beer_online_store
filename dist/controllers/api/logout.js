"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
exports.logout = (req, res) => {
    req.session.destroy((err) => err && console.log(err));
};
