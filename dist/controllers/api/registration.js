"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registration = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const saveUser_1 = require("../../models/users/saveUser");
const checkIfSuchUserAlreadyRegistered_1 = require("./helpers/checkIfSuchUserAlreadyRegistered");
const promiseWrapper_1 = require("./helpers/promiseWrapper");
exports.registration = (req, res) => {
    const user = req.body.user;
    checkIfSuchUserAlreadyRegistered_1.checkIfSuchUserAlreadyRegistered(user, (userFound) => {
        if (userFound) {
            res.status(200).json({
                message: "Istnieje juz konto z takimi danymi"
            });
        }
        else {
            promiseWrapper_1.promiseWrapper(() => bcryptjs_1.default.hash(user.password, 12), (hashedPswd) => {
                let password = hashedPswd;
                saveUser_1.saveUser({ ...user, password });
                res.status(200).json({
                    message: "Rejestracja się udała"
                });
            });
        }
    });
};
