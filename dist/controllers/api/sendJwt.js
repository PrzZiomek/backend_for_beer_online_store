"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendJwt = void 0;
const token_1 = require("../../models/token/token");
exports.sendJwt = (req, res) => {
    res.status(200).json({
        token: token_1.token
    });
};
