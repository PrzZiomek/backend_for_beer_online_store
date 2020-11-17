"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.registrationData = void 0;
const saveUser_1 = require("../../models/users/saveUser");
exports.registrationData = (req, res) => {
    const user = req.body.user;
    saveUser_1.saveUser(user)
        .then(() => res.redirect("/user"))
        .catch((err) => console.log(err));
};
exports.logout = (req, res) => {
    req.session.destroy((err) => console.log(err));
};
