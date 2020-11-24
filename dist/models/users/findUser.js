"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUser = void 0;
const searchForUser_1 = require("./searchForUser");
exports.findUser = (rows, user) => {
    const usersFromDB = Object.values(JSON.parse(JSON.stringify(rows)));
    const userFound = usersFromDB.find(item => searchForUser_1.searchForUser(item, user));
    return userFound;
};
