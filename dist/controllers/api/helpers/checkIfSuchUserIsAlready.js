"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfSuchUserIsAlready = void 0;
const searchForUser_1 = require("./searchForUser");
exports.checkIfSuchUserIsAlready = (rows, user) => {
    const usersFromDB = Object.values(JSON.parse(JSON.stringify(rows)));
    const userFound = usersFromDB.some(item => searchForUser_1.searchForUser(item, user));
    return userFound;
};
