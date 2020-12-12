"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const express_validator_1 = require("express-validator");
const token_1 = require("../../models/token/token");
exports.login = async (req, res, next) => {
    const user = req.body;
    const validationErrors = express_validator_1.validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(422).json({
            message: validationErrors.array(),
        });
    }
    else {
        res.status(200).json({
            message: "Jesteś zalogowany",
            token: token_1.token,
        });
    }
};
