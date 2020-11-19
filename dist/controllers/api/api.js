"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.registration = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const saveUser_1 = require("../../models/users/saveUser");
const checkIfUserAlreadyRegistered_1 = require("./helpers/checkIfUserAlreadyRegistered");
const promiseWrapper_1 = require("./helpers/promiseWrapper");
exports.registration = (req, res) => {
    const user = req.body.user;
    checkIfUserAlreadyRegistered_1.checkIfUserAlreadyRegistered(user, (userFound) => {
        if (userFound) {
            res.redirect("/events"); //"/to-client/user-already-exists"  
        }
        else {
            promiseWrapper_1.promiseWrapper(() => bcryptjs_1.default.hash(user.password, 12), (res) => {
                let password = res;
                saveUser_1.saveUser({ ...user, password });
            });
            res.redirect("/user");
        }
    });
};
exports.logout = (req, res) => {
    req.session.destroy((err) => err && console.log(err));
};
