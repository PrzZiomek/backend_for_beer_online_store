"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfUserAlreadyRegistered = void 0;
const fetchAllUsers_1 = require("../../../models/users/fetchAllUsers");
const searchForUser_1 = require("./searchForUser");
const promiseWrapper_1 = require("./promiseWrapper");
exports.checkIfUserAlreadyRegistered = (user, cb) => {
    promiseWrapper_1.promiseWrapper(fetchAllUsers_1.fetchAllUsers, (res) => {
        const rows = res[0];
        const usersFromDB = Object.values(JSON.parse(JSON.stringify(rows)));
        const userFound = usersFromDB.some(item => searchForUser_1.searchForUser(item, user));
        cb(userFound);
    });
};
