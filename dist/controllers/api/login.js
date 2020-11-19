"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const promiseWrapper_1 = require("./helpers/promiseWrapper");
const fetchAllUsers_1 = require("../../models/users/fetchAllUsers");
const searchForUser_1 = require("./helpers/searchForUser");
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
