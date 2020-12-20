"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorPage = exports.user = exports.main = void 0;
const User_1 = require("../../models/users/User");
exports.main = (_, res) => {
    res.send("<h3>Welcome to Node.js server!!!</h3>");
};
exports.user = (req, res) => {
    res.send("<p>user data registered</p>");
    req.session.save((err) => console.log(err));
    req.session.registered = true;
    User_1.User.fetchAllUsers()
        .then(res => {
        const rows = res[0];
        const field = res[1];
        // console.log(rows);        
    })
        .catch(err => console.log(err));
};
exports.errorPage = (_, res) => {
    res.send("<h1>An error occurs!!!</h1>");
};
