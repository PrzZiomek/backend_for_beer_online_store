"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareUserEmail = exports.searchForUser = void 0;
const searchForUser = (item, user) => {
    const { name, surname, email } = user;
    let userInDB = item;
    return (name === userInDB.name &&
        surname === userInDB.surname ||
        email === userInDB.email);
};
exports.searchForUser = searchForUser;
const compareUserEmail = (item, user) => {
    const { email } = user;
    let userInDB = item;
    return email === userInDB.email;
};
exports.compareUserEmail = compareUserEmail;
