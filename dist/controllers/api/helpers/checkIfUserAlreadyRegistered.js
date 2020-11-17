"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfUserAlreadyRegistered = exports.wrapPromise = void 0;
const fetchAllUsers_1 = require("../../../models/users/fetchAllUsers");
const searchForUser_1 = require("./searchForUser");
exports.wrapPromise = (fn, cb) => {
    Promise.resolve(fn())
        .then(res => cb(res))
        .catch(err => console.log(err));
};
exports.checkIfUserAlreadyRegistered = (user, cb) => {
    exports.wrapPromise(fetchAllUsers_1.fetchAllUsers, (res) => {
        const rows = res[0];
        const usersFromDB = Object.values(JSON.parse(JSON.stringify(rows)));
        const userFound = usersFromDB.some(item => searchForUser_1.searchForUser(item, user));
        cb(userFound);
    });
};
/*
export const checkIfUserAlreadyRegistered = (user: User, cb: Function) => {
    fetchAllUsers()
      .then(res => {
         const rows = res[0];
         const usersFromDB = Object.values(JSON.parse(JSON.stringify(rows)));
         const userFound = usersFromDB.some(item => searchForUser(item, user))
       cb(userFound)
      })
      .catch(err => console.log(err))

}*/ 
