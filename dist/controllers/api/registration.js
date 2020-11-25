"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registration = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = require("../../models/users/User");
const errorHandle_1 = require("../errors/errorHandle");
exports.registration = (req, res, next) => {
    const user = req.body.user;
    (async () => {
        const matchedUser = await User_1.User.findUser(user).catch(err => next(errorHandle_1.errorHandle(err, 500)));
        if (matchedUser) {
            res.status(200).json({
                message: "Istnieje juz konto z takimi danymi"
            });
        }
        else {
            const hashedPswd = await bcryptjs_1.default.hash(user.password, 12).catch(err => next(errorHandle_1.errorHandle(err, 500)));
            if (!hashedPswd)
                return;
            let password = hashedPswd;
            User_1.User.saveUser({ ...user, password });
            res.status(200).json({
                message: "Rejestracja się udała"
            });
        }
    })();
};
