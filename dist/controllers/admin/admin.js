"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = exports.main = exports.registrationData = void 0;
const user_1 = require("../../models/users/user");
exports.registrationData = (req, res) => {
    const user = req.body.user;
    user_1.saveUser(user)
        .then(() => res.redirect("/user"))
        .catch((err) => console.log(err));
};
exports.main = (_, res) => {
    res.send("<h3>Welcome to Node.js server!!!</h3>");
};
exports.user = (_, res) => {
    res.send("<p>user data logged</p>");
    user_1.fetchAllUsers()
        .then(res => {
        const [rows, field] = res;
        console.log(rows);
    })
        .catch(err => console.log(err));
};
