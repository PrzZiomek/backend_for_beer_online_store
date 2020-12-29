"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registration = exports.validationMessage = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const check_1 = require("express-validator/check");
const User_1 = require("../../models/users/User");
const errorHandle_1 = require("../errors/errorHandle");
const validationMessage = async (req, res, next) => {
    const user = req.body;
    const validationErrors = check_1.validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(422).json({
            message: validationErrors.array(),
        });
    }
    else {
        req.app.locals.user = user;
        next();
    }
};
exports.validationMessage = validationMessage;
const registration = async (req, res, next) => {
    const user = req.app.locals.user;
    const hashedPswd = await bcryptjs_1.default.hash(user.password, 12).catch(err => next(errorHandle_1.errorHandle(err, 500)));
    if (!hashedPswd)
        return;
    User_1.User.saveUser({
        ...user,
        password: hashedPswd
    });
    res.status(200).json({
        message: "Rejestracja się udała"
    });
};
exports.registration = registration;
