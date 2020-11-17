"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = exports.main = void 0;
const saveUser_1 = require("../../models/users/saveUser");
exports.main = (_, res) => {
    res.send("<h3>Welcome to Node.js server!!!</h3>");
};
exports.user = (req, res) => {
    res.send("<p>user data logged</p>");
    //console.log(req.get("Cookie"));  registered=true
    //console.log(req.session); Session { cookie: {...}}
    req.session.save((err) => console.log(err));
    req.session.registered = true;
    saveUser_1.fetchAllUsers()
        .then(res => {
        const [rows, field] = res;
        //console.log(rows);     
    })
        .catch(err => console.log(err));
};
