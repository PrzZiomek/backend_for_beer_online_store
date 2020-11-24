"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchForUser = void 0;
exports.searchForUser = (item, user) => {
    const { name, surname, email } = user;
    let userInDB = item;
    return (name === userInDB.name &&
        surname === userInDB.surname ||
        email === userInDB.email);
};
