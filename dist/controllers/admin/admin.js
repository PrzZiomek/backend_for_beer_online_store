"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = exports.main = void 0;
const fetchAllUsers_1 = require("../../models/users/fetchAllUsers");
exports.main = (_, res) => {
    res.send("<h3>Welcome to Node.js server!!!</h3>");
};
exports.user = (req, res) => {
    res.send("<p>user data registered</p>");
    req.session.save((err) => console.log(err));
    req.session.registered = true;
    fetchAllUsers_1.fetchAllUsers()
        .then(res => {
        const rows = res[0];
        const field = res[1];
        // console.log(rows);        
    })
        .catch(err => console.log(err));
};
