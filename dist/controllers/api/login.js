"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const express_validator_1 = require("express-validator");
const bcryptCompare_1 = require("./helpers/bcryptCompare");
const User_1 = require("../../models/users/User");
const errorHandle_1 = require("../errors/errorHandle");
const token_1 = require("../../models/token/token");
exports.login = async (req, res, next) => {
    const user = req.body.user;
    const validationErrors = express_validator_1.validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(422).json({
            message: validationErrors.array(),
        });
    }
    const matchedUser = await User_1.User.findUser(user).catch(err => next(errorHandle_1.errorHandle(err, 500)));
    if (matchedUser) {
        const doMatch = await bcryptCompare_1.bcryptCompare(user.password, matchedUser.password).catch(err => next(errorHandle_1.errorHandle(err, 500)));
        if (doMatch === undefined)
            return;
        res.status(200).json({
            message: doMatch ? "Jesteś zalogowany!" : "Nieprawidłowe hasło lub login!",
            userId: matchedUser.id,
            token: token_1.token,
        });
    }
    else {
        res.status(200).json({
            message: "Nieprawidłowe hasło lub login!",
        });
    }
};
