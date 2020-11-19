"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.registration = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const saveUser_1 = require("../../models/users/saveUser");
const checkIfSuchUserAlreadyRegistered_1 = require("./helpers/checkIfSuchUserAlreadyRegistered");
const promiseWrapper_1 = require("./helpers/promiseWrapper");
const fetchAllUsers_1 = require("../../models/users/fetchAllUsers");
const searchForUser_1 = require("./helpers/searchForUser");
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
exports.login = (req, res) => {
    const user = req.body.user;
    promiseWrapper_1.promiseWrapper(fetchAllUsers_1.fetchAllUsers, (resDB) => {
        const rows = resDB[0];
        const usersFromDB = Object.values(JSON.parse(JSON.stringify(rows)));
        const matchedUser = usersFromDB.find(item => searchForUser_1.searchForUser(item, user));
        if (matchedUser) {
            bcryptjs_1.default.compare(user.password, matchedUser.password)
                .then(doMatch => {
                res.status(200).json({
                    message: doMatch ? "Jesteś zalogowany!" : "Nieprawidłowe hasło lub login!"
                });
            }).catch(err => console.log(err));
        }
        else {
            res.status(200).json({
                message: "Nieprawidłowe hasło lub login!"
            });
        }
    });
};
exports.logout = (req, res) => {
    req.session.destroy((err) => err && console.log(err));
};
